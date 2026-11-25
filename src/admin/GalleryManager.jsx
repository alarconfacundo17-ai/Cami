import { useMemo, useState } from "react";
import { ImagePlus, Pencil, Play, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { uploadGalleryFile, uploadGalleryVideo } from "./storage";
import { useSiteContent } from "../siteContent/SiteContentContext";

const SUGGESTED_CATEGORIES = ["Deporte", "Lifestyle", "Gastronomía", "Experiencias"];

export default function GalleryManager() {
  const { gallery, refresh } = useSiteContent();
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const categoryOptions = useMemo(() => {
    const fromGallery = gallery.map((g) => g.category).filter(Boolean);
    return [...new Set([...SUGGESTED_CATEGORIES, ...fromGallery])];
  }, [gallery]);

  const handleAdd = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const isVideo = file.type.startsWith("video");
      const position = gallery.length
        ? Math.max(...gallery.map((g) => g.position)) + 1
        : 0;
      const categoryValue = category.trim() || null;

      let row;
      if (isVideo) {
        const { url, posterUrl } = await uploadGalleryVideo(file);
        row = { media_type: "video", url, poster_url: posterUrl, category: categoryValue, position };
      } else {
        const { url } = await uploadGalleryFile(file);
        row = { media_type: "image", url, category: categoryValue, position };
      }

      const { error: insertError } = await supabase.from("gallery_items").insert(row);
      if (insertError) throw insertError;
      await refresh();
    } catch (err) {
      console.error(err);
      setError("No se pudo subir el archivo.");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    await refresh();
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingValue(item.category ?? "");
  };

  const saveEditing = async () => {
    const id = editingId;
    setEditingId(null);
    await supabase
      .from("gallery_items")
      .update({ category: editingValue.trim() || null })
      .eq("id", id);
    await refresh();
  };

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-label text-ink/50">
        Galería (fotos y videos sueltos)
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {gallery.map((item) => (
          <div key={item.id} className="group relative aspect-[3/4] overflow-hidden rounded bg-ink/10">
            {item.media_type === "video" ? (
              <>
                <video
                  src={item.url}
                  poster={item.poster_url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </span>
                </div>
              </>
            ) : (
              <img src={item.url} alt="" className="h-full w-full object-cover" />
            )}

            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Borrar"
            >
              <Trash2 size={14} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-5">
              {editingId === item.id ? (
                <input
                  autoFocus
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onBlur={saveEditing}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                  placeholder="Carpeta"
                  className="w-full rounded bg-white/90 px-1.5 py-0.5 text-[11px] text-ink outline-none"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => startEditing(item)}
                  className="flex items-center gap-1 text-[11px] text-white/90 hover:text-white"
                >
                  {item.category || "Sin carpeta"}
                  <Pencil size={10} />
                </button>
              )}
            </div>
          </div>
        ))}

        <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-1 rounded border-2 border-dashed border-ink/20 text-ink/50 hover:border-ink/50">
          <ImagePlus size={20} />
          <span className="text-xs">{uploading ? "Subiendo…" : "Agregar"}</span>
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleAdd}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="mt-4 max-w-xs">
        <p className="text-xs font-medium uppercase tracking-label text-ink/50">
          Carpeta para lo próximo que subas
        </p>
        <input
          list="gallery-categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ej: Deporte, Viajes, Moda…"
          className="mt-2 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/60"
        />
        <datalist id="gallery-categories">
          {categoryOptions.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        <p className="mt-1 text-[11px] text-ink/50">
          Dejalo vacío para que quede sin carpeta. Podés tocar el nombre debajo de
          cada foto/video de arriba para cambiarlo después.
        </p>
      </div>

      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
