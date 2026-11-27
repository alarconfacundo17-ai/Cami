import { useMemo, useState } from "react";
import { FolderPlus, ImagePlus, Pencil, Trash2, Play, Check, X, Star } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { uploadGalleryFile, uploadGalleryVideo } from "./storage";
import { useSiteContent } from "../siteContent/SiteContentContext";
import { groupGalleryByCategory } from "../lib/groupGallery";
import UploadIssueModal from "./UploadIssueModal";

const SUGGESTED_CATEGORIES = ["Deporte", "Lifestyle", "Gastronomía", "Experiencias"];

// El proyecto de Supabase tiene un límite de tamaño por archivo de 50MB
// (fijo en el plan gratis). Lo chequeamos antes de intentar subir para
// avisar al toque, en vez de esperar a que falle en el servidor.
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const SIZE_LIMIT_MESSAGE = "pesa más de 50MB — hay que comprimirlo o recortarlo antes de subir";

function friendlyError(err) {
  const msg = err?.message || "";
  if (/exceeded the maximum allowed size|payload too large|413/i.test(msg)) {
    return SIZE_LIMIT_MESSAGE;
  }
  return msg || "error desconocido";
}

// Sube todos los archivos en paralelo (no uno por uno), así elegir varias
// fotos/videos juntos no suma sus tiempos de espera. Si alguno falla (por
// ejemplo un video muy pesado) no se pierden los demás: cada archivo se
// resuelve por separado y los que sí se pudieron subir se guardan igual.
// onFileProgress(file, fraction) se llama durante la subida de cada uno
// para poder mostrar una barra de progreso real.
async function uploadFiles(files, category, startPosition, onFileProgress) {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(SIZE_LIMIT_MESSAGE);
      }
      const onProgress = (fraction) => onFileProgress?.(file, fraction);
      if (file.type.startsWith("video")) {
        const { url, posterUrl } = await uploadGalleryVideo(file, onProgress);
        return { media_type: "video", url, poster_url: posterUrl, category };
      }
      const { url } = await uploadGalleryFile(file, onProgress);
      return { media_type: "image", url, category };
    }),
  );

  const rows = [];
  const failures = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      rows.push({ ...result.value, position: startPosition + rows.length });
    } else {
      const reason = friendlyError(result.reason);
      failures.push({ name: files[i].name, reason, isSizeLimit: reason === SIZE_LIMIT_MESSAGE });
    }
  });
  return { rows, failures };
}

function UploadProgressList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map(({ name, progress }) => (
        <div key={name} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] text-ink/60">
            <span className="truncate">{name}</span>
            <span className="shrink-0 tabular-nums">{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(4, Math.round(progress * 100))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Thumb({ item, isCover, onDelete, onSetCover }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="group relative aspect-square overflow-hidden rounded bg-ink/10">
      {item.media_type === "video" ? (
        <>
          {item.poster_url ? (
            <img src={item.poster_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-ink/20" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink">
              <Play size={13} fill="currentColor" className="ml-0.5" />
            </span>
          </div>
        </>
      ) : (
        <img src={item.url} alt="" className="h-full w-full object-cover" />
      )}

      {isCover && (
        <span className="absolute left-1 top-1 flex items-center gap-1 rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-medium text-ink">
          <Star size={10} fill="currentColor" />
          Portada
        </span>
      )}

      {confirming ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/70 px-2 text-center">
          <p className="text-[11px] text-white">¿Borrar?</p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full bg-red-600 p-1.5 text-white"
              aria-label="Confirmar borrado"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-full bg-white/90 p-1.5 text-ink"
              aria-label="Cancelar"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute right-1 top-1 flex gap-1">
          {!isCover && (
            <button
              type="button"
              onClick={onSetCover}
              className="rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Usar como portada"
              title="Usar como portada"
            >
              <Star size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            aria-label="Borrar"
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

function FolderBlock({ folder, onRefresh, onUploadFailures }) {
  const [renaming, setRenaming] = useState(false);
  const [nameInput, setNameInput] = useState(folder.label);
  const [uploading, setUploading] = useState(false);
  const [deletingFolder, setDeletingFolder] = useState(false);
  const [progress, setProgress] = useState([]);

  const handleAddFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setProgress(files.map((f) => ({ name: f.name, progress: 0 })));
    try {
      const start = folder.items.length
        ? Math.max(...folder.items.map((g) => g.position)) + 1
        : 0;
      const { rows, failures } = await uploadFiles(
        files,
        folder.label === "Sin carpeta" ? null : folder.label,
        start,
        (file, fraction) =>
          setProgress((prev) =>
            prev.map((p) => (p.name === file.name ? { ...p, progress: fraction } : p)),
          ),
      );
      if (rows.length > 0) {
        const { error } = await supabase.from("gallery_items").insert(rows);
        if (error) throw error;
        await onRefresh();
      }
      if (failures.length > 0) onUploadFailures(failures);
    } catch (err) {
      console.error(err);
      onUploadFailures([{ name: "", reason: friendlyError(err) }]);
    }
    setUploading(false);
    setProgress([]);
    e.target.value = "";
  };

  const saveRename = async () => {
    const newName = nameInput.trim();
    setRenaming(false);
    if (!newName || newName === folder.label) return;
    await supabase
      .from("gallery_items")
      .update({ category: newName })
      .eq("category", folder.label === "Sin carpeta" ? null : folder.label);
    await onRefresh();
  };

  // Manda el ítem elegido al frente de la carpeta (posición más baja que
  // todas las demás), así es el primero que se ve — sin depender de cuál
  // haya sido el primero en subirse.
  const setCover = async (id) => {
    const minPosition = Math.min(0, ...folder.items.map((g) => g.position));
    await supabase
      .from("gallery_items")
      .update({ position: minPosition - 1 })
      .eq("id", id);
    await onRefresh();
  };

  const deleteFolder = async () => {
    await supabase
      .from("gallery_items")
      .delete()
      .eq("category", folder.label === "Sin carpeta" ? null : folder.label);
    await onRefresh();
  };

  const deleteItem = async (id) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    await onRefresh();
  };

  return (
    <div className="rounded-md border border-ink/10 bg-white/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {renaming ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveRename()}
              className="rounded border border-ink/20 bg-white px-2 py-1 text-sm text-ink outline-none focus:border-ink/60"
            />
            <button type="button" onClick={saveRename} className="text-ink/60 hover:text-ink">
              <Check size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                setRenaming(false);
                setNameInput(folder.label);
              }}
              className="text-ink/40 hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRenaming(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            {folder.label}
            <span className="text-ink/40">({folder.items.length})</span>
            <Pencil size={12} className="text-ink/40" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-ink/70 hover:text-ink">
            <ImagePlus size={14} />
            {uploading ? "Subiendo…" : "Agregar"}
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleAddFiles}
              disabled={uploading}
            />
          </label>

          {deletingFolder ? (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-ink/60">¿Borrar carpeta?</span>
              <button type="button" onClick={deleteFolder} className="font-medium text-red-700">
                Sí
              </button>
              <button
                type="button"
                onClick={() => setDeletingFolder(false)}
                className="text-ink/50"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDeletingFolder(true)}
              className="text-ink/40 hover:text-red-700"
              aria-label="Borrar carpeta"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
        {folder.items.map((item, i) => (
          <Thumb
            key={item.id}
            item={item}
            isCover={i === 0}
            onDelete={() => deleteItem(item.id)}
            onSetCover={() => setCover(item.id)}
          />
        ))}
      </div>

      <UploadProgressList items={progress} />
    </div>
  );
}

export default function GalleryManager() {
  const { gallery, refresh } = useSiteContent();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [issue, setIssue] = useState(null);
  const [createProgress, setCreateProgress] = useState([]);

  const folders = useMemo(() => groupGalleryByCategory(gallery), [gallery]);
  const existingNames = useMemo(() => folders.map((f) => f.label), [folders]);

  const handleCreate = async (e) => {
    const files = Array.from(e.target.files || []);
    const name = newName.trim();
    if (files.length === 0 || !name) return;
    setUploading(true);
    setCreateProgress(files.map((f) => ({ name: f.name, progress: 0 })));
    try {
      const { rows, failures } = await uploadFiles(files, name, 0, (file, fraction) =>
        setCreateProgress((prev) =>
          prev.map((p) => (p.name === file.name ? { ...p, progress: fraction } : p)),
        ),
      );
      if (rows.length > 0) {
        const { error: insertError } = await supabase.from("gallery_items").insert(rows);
        if (insertError) throw insertError;
        await refresh();
        setCreating(false);
        setNewName("");
      }
      if (failures.length > 0) setIssue(failures);
    } catch (err) {
      console.error(err);
      setIssue([{ name: "", reason: friendlyError(err) }]);
    }
    setUploading(false);
    setCreateProgress([]);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {folders.map((folder) => (
        <FolderBlock key={folder.label} folder={folder} onRefresh={refresh} onUploadFailures={setIssue} />
      ))}

      <div className="rounded-md border-2 border-dashed border-ink/20 p-4">
        {creating ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              autoFocus
              list="new-folder-suggestions"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre de la carpeta (ej. Deporte)"
              className="w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/60 sm:w-64"
            />
            <datalist id="new-folder-suggestions">
              {[...new Set([...SUGGESTED_CATEGORIES, ...existingNames])].map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>

            <label
              className={`flex cursor-pointer items-center gap-1.5 rounded border border-ink/20 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-ink/60 ${
                !newName.trim() ? "pointer-events-none opacity-40" : ""
              }`}
            >
              <ImagePlus size={14} />
              {uploading ? "Subiendo…" : "Elegir fotos/videos"}
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleCreate}
                disabled={uploading || !newName.trim()}
              />
            </label>

            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setNewName("");
              }}
              className="text-xs text-ink/50 hover:text-ink"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
          >
            <FolderPlus size={18} />
            Crear carpeta nueva
          </button>
        )}

        <UploadProgressList items={createProgress} />
      </div>

      <UploadIssueModal failures={issue} onClose={() => setIssue(null)} />
    </div>
  );
}
