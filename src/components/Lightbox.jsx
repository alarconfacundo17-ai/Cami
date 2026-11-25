import { useEffect } from "react";
import { X } from "lucide-react";

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Cerrar"
      >
        <X size={28} />
      </button>

      <div className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        {item.media_type === "video" ? (
          <video
            src={item.url}
            poster={item.poster_url}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-full rounded-sm"
          />
        ) : (
          <img
            src={item.url}
            alt={item.caption ?? ""}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
          />
        )}
      </div>
    </div>
  );
}
