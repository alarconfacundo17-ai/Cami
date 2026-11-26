import { useMemo, useState } from "react";
import { FolderPlus, ImagePlus, Pencil, Trash2, Play, Check, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { uploadGalleryFile, uploadGalleryVideo } from "./storage";
import { useSiteContent } from "../siteContent/SiteContentContext";
import { groupGalleryByCategory } from "../lib/groupGallery";

const SUGGESTED_CATEGORIES = ["Deporte", "Lifestyle", "Gastronomía", "Experiencias"];

// Sube todos los archivos en paralelo (no uno por uno), así elegir varias
// fotos/videos juntos no suma sus tiempos de espera.
async function uploadFiles(files, category, startPosition) {
  return Promise.all(
    files.map(async (file, i) => {
      const position = startPosition + i;
      if (file.type.startsWith("video")) {
        const { url, posterUrl } = await uploadGalleryVideo(file);
        return { media_type: "video", url, poster_url: posterUrl, category, position };
      }
      const { url } = await uploadGalleryFile(file);
      return { media_type: "image", url, category, position };
    }),
  );
}

function Thumb({ item, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="group relative aspect-square overflow-hidden rounded bg-ink/10">
      {item.media_type === "video" ? (
        <>
          <img src={item.poster_url} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink">
              <Play size={13} fill="currentColor" className="ml-0.5" />
            </span>
          </div>
        </>
      ) : (
        <img src={item.url} alt="" className="h-full w-full object-cover" />
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
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white"
          aria-label="Borrar"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

function FolderBlock({ folder, onRefresh }) {
  const [renaming, setRenaming] = useState(false);
  const [nameInput, setNameInput] = useState(folder.label);
  const [uploading, setUploading] = useState(false);
  const [deletingFolder, setDeletingFolder] = useState(false);

  const handleAddFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const start = folder.items.length
        ? Math.max(...folder.items.map((g) => g.position)) + 1
        : 0;
      const rows = await uploadFiles(files, folder.label === "Sin carpeta" ? null : folder.label, start);
      const { error } = await supabase.from("gallery_items").insert(rows);
      if (error) throw error;
      await onRefresh();
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
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
        {folder.items.map((item) => (
          <Thumb key={item.id} item={item} onDelete={() => deleteItem(item.id)} />
        ))}
      </div>
    </div>
  );
}

export default function GalleryManager() {
  const { gallery, refresh } = useSiteContent();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const folders = useMemo(() => groupGalleryByCategory(gallery), [gallery]);
  const existingNames = useMemo(() => folders.map((f) => f.label), [folders]);

  const handleCreate = async (e) => {
    const files = Array.from(e.target.files || []);
    const name = newName.trim();
    if (files.length === 0 || !name) return;
    setError("");
    setUploading(true);
    try {
      const rows = await uploadFiles(files, name, 0);
      const { error: insertError } = await supabase.from("gallery_items").insert(rows);
      if (insertError) throw insertError;
      await refresh();
      setCreating(false);
      setNewName("");
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la carpeta.");
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {folders.map((folder) => (
        <FolderBlock key={folder.label} folder={folder} onRefresh={refresh} />
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
      </div>

      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  );
}
