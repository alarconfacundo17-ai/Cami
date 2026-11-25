import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import Lightbox from "./Lightbox";

export default function AlbumView({ category, items, onClose }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && activeIndex === null && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onClose]);

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => i - 1);
  };
  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => i + 1);
  };

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-panel-in flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-md bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 lg:px-8">
          <div>
            <h3 className="font-serif-display text-2xl text-ink sm:text-3xl">{category}</h3>
            <p className="text-xs font-light text-ink/50">
              {items.length} {items.length === 1 ? "archivo" : "archivos"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink/60 transition-colors hover:text-ink"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2 lg:grid-cols-5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setDirection(1);
                  setActiveIndex(i);
                }}
                className="group relative aspect-square overflow-hidden rounded-sm bg-ink/10"
              >
                <img
                  src={item.media_type === "video" ? item.poster_url : item.url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {item.media_type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink">
                      <Play size={12} fill="currentColor" className="ml-0.5" />
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          item={items[activeIndex]}
          direction={direction}
          onClose={() => setActiveIndex(null)}
          onPrev={activeIndex > 0 ? goPrev : undefined}
          onNext={activeIndex < items.length - 1 ? goNext : undefined}
        />
      )}
    </div>
  );
}
