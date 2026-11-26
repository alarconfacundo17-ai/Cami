import t1 from "../assets/testimonials/t1.webp";
import t2 from "../assets/testimonials/t2.webp";
import t3 from "../assets/testimonials/t3.webp";
import t4 from "../assets/testimonials/t4.webp";
import t5 from "../assets/testimonials/t5.webp";
import t6 from "../assets/testimonials/t6.webp";
import t7 from "../assets/testimonials/t7.webp";
import t8 from "../assets/testimonials/t8.webp";

const SHOTS = [
  { src: t1, rotate: "-rotate-2" },
  { src: t2, rotate: "rotate-2" },
  { src: t3, rotate: "-rotate-3" },
  { src: t4, rotate: "rotate-1" },
  { src: t5, rotate: "-rotate-1" },
  { src: t6, rotate: "rotate-3" },
  { src: t7, rotate: "-rotate-2" },
  { src: t8, rotate: "rotate-2" },
];

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-cream-dark py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-light uppercase tracking-label text-gold">
          Lo que dicen
        </p>
        <h2 className="font-serif-display mt-2 text-4xl text-ink sm:text-5xl">
          Reseñas reales
        </h2>
      </div>

      <div className="mt-10 flex gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden">
        {SHOTS.map((shot, i) => (
          <div
            key={i}
            className={`w-[220px] shrink-0 rounded-sm bg-white p-2.5 pb-6 shadow-lg transition-transform duration-300 ease-out hover:z-10 hover:rotate-0 hover:scale-105 hover:shadow-xl sm:w-[260px] ${shot.rotate}`}
          >
            <img src={shot.src} alt="Reseña de una clienta" loading="lazy" className="w-full rounded-[2px]" />
          </div>
        ))}
      </div>
    </section>
  );
}
