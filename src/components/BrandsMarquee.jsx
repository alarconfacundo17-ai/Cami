import { useLayoutEffect, useRef, useState } from "react";
import { useSiteContent } from "../siteContent/SiteContentContext";

// Velocidad fija en píxeles por segundo: así, sin importar cuántas marcas
// haya cargadas, siempre se mueve a un ritmo legible (antes la duración era
// fija y, al crecer la lista, se veía cada vez más rápido).
const SPEED_PX_PER_SEC = 45;

export default function BrandsMarquee() {
  const { content } = useSiteContent();
  const { brands } = content;

  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [{ repeat, duration }, setConfig] = useState({ repeat: 2, duration: 30 });

  useLayoutEffect(() => {
    if (!brands || brands.length === 0) return;
    const setWidth = measureRef.current?.getBoundingClientRect().width;
    const containerWidth = containerRef.current?.getBoundingClientRect().width;
    if (!setWidth || !containerWidth) return;
    // Solo se repite lo necesario para cubrir el doble del ancho visible
    // (mínimo 2, para que el loop sea parejo) — con muchas marcas cargadas
    // no hace falta repetir de más, y eso evita un renglón innecesariamente
    // larguísimo que en algunos celulares no termina de pintarse bien.
    const neededRepeat = Math.max(2, Math.ceil((containerWidth * 2) / setWidth));
    setConfig({ repeat: neededRepeat, duration: setWidth / SPEED_PX_PER_SEC });
  }, [brands]);

  if (!brands || brands.length === 0) return null;

  const items = Array.from({ length: repeat }, () => brands).flat();

  return (
    <div className="bg-ink py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-light uppercase tracking-label text-white/40">
          Marcas con las que trabajé
        </p>
      </div>

      <div
        ref={containerRef}
        className="group relative mt-5 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Medidor invisible: un solo juego de marcas, fuera del flujo, para
            saber cuánto ocupa y calcular cuántas veces repetirlo y a qué
            velocidad animarlo. */}
        <div
          ref={measureRef}
          aria-hidden="true"
          className="invisible absolute flex w-max gap-12 whitespace-nowrap"
        >
          {brands.map((brand, i) => (
            <span key={i} className="text-lg font-semibold uppercase tracking-wide">
              {brand}
            </span>
          ))}
        </div>

        <div
          className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${duration}s`,
            "--marquee-distance": `-${100 / repeat}%`,
            willChange: "transform",
          }}
        >
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
