import { useSiteContent } from "../siteContent/SiteContentContext";

export default function Gallery() {
  const { gallery } = useSiteContent();

  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-24 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif-display text-4xl text-ink sm:text-5xl">
          Galería
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="aspect-[3/4] overflow-hidden rounded-sm bg-ink"
            >
              {item.media_type === "video" ? (
                <video
                  src={item.url}
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.caption ?? ""}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
