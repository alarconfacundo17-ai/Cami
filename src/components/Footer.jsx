import { Mail, ArrowRight } from "lucide-react";
import { brands, socials } from "../content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
        <div>
          <p className="text-sm font-light text-white/70">Marcas con las que trabajé</p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            {brands.map((brand) => (
              <li
                key={brand}
                className="text-lg font-semibold uppercase tracking-wide text-white/90"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`mailto:${socials.email}`}
          className="group flex w-fit items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm font-light text-white transition-colors hover:border-white hover:bg-white/10"
        >
          <Mail size={17} strokeWidth={1.5} />
          Trabajemos juntos
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs font-light text-white/50 lg:px-10 lg:text-left">
        © {currentYear} Camila Zanon — Todos los derechos reservados.
      </div>
    </footer>
  );
}
