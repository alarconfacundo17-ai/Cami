import { useState } from "react";
import { ImagePlus, Play, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { uploadGalleryFile, uploadGalleryVideo } from "./storage";
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
      const isVideo = file.type.startsWith("video");
      const position = gallery.length
        ? Math.max(...gallery.map((g) => g.position)) + 1
        : 0;

      let row;
      if (isVideo) {
        const { url, posterUrl } = await uploadGalleryVideo(file);
        row = { media_type: "video", url, poster_url: posterUrl, position };
      } else {
        const { url } = await uploadGalleryFile(file);
        row = { media_type: "image", url, position };
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
