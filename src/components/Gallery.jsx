import { useState } from "react";
import { Play } from "lucide-react";
import { useSiteContent } from "../siteContent/SiteContentContext";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const { gallery } = useSiteContent();
  const [active, setActive] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-24 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif-display text-4xl text-ink sm:text-5xl">
          Galería
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
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
                    preload="metadata"
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
