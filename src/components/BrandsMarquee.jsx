import { useSiteContent } from "../siteContent/SiteContentContext";

export default function BrandsMarquee() {
  const { content } = useSiteContent();
  const { brands } = content;

  if (!brands || brands.length === 0) return null;

  // Se repite varias veces (no solo una) para que, aunque haya pocas marcas
  // cargadas, la cinta no se vea vacía o con huecos al dar la vuelta.
  const items = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="bg-ink py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-light uppercase tracking-label text-white/40">
          Marcas con las que trabajé
        </p>
      </div>

      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]">
          {items.map((brand, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-semibold uppercase tracking-wide text-white/80"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
