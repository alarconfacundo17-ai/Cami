import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ item, onClose, onPrev, onNext, direction = 1 }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
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

      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:text-white sm:left-4"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:text-white sm:right-4"
          aria-label="Siguiente"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <div
        key={item.id}
        className={`max-h-full max-w-full ${
          direction === -1 ? "animate-slide-in-left" : "animate-slide-in-right"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
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
