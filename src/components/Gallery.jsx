import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { useSiteContent } from "../siteContent/SiteContentContext";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const { gallery } = useSiteContent();
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...new Set(gallery.map((g) => g.category).filter(Boolean))],
    [gallery],
  );

  const visible =
    filter === "Todos" ? gallery : gallery.filter((item) => item.category === filter);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-24 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif-display text-4xl text-ink sm:text-5xl">
          Galería
        </h2>

        {categories.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-light transition-colors ${
                  filter === cat
                    ? "border-ink bg-ink text-white"
                    : "border-ink/20 text-ink/70 hover:border-ink/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-ink"
            >
              {item.media_type === "video" ? (
                <>
                  <video
                    src={item.url}
                    poster={item.poster_url}
                    muted
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src={item.url}
                  alt={item.caption ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
