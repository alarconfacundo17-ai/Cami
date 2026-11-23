import { useState } from "react";
import { ImagePlus, Trash2, Video } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { uploadGalleryFile } from "./storage";
import { useSiteContent } from "../siteContent/SiteContentContext";

export default function GalleryManager() {
  const { gallery, refresh } = useSiteContent();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const mediaType = file.type.startsWith("video") ? "video" : "image";
      const url = await uploadGalleryFile(file);
      const position = gallery.length
        ? Math.max(...gallery.map((g) => g.position)) + 1
        : 0;
      const { error: insertError } = await supabase
        .from("gallery_items")
        .insert({ media_type: mediaType, url, position });
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

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-label text-ink/50">
        Galería (fotos y videos sueltos)
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {gallery.map((item) => (
          <div key={item.id} className="group relative aspect-[3/4] overflow-hidden rounded bg-ink/10">
            {item.media_type === "video" ? (
              <div className="flex h-full w-full items-center justify-center text-ink/40">
                <Video size={24} />
              </div>
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

      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
