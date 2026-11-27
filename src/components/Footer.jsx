import { Mail, ArrowUpRight, Music2 } from "lucide-react";
import { InstagramIcon } from "./doodles";
import { useSiteContent } from "../siteContent/SiteContentContext";

const currentYear = new Date().getFullYear();

const linkClass =
  "group flex items-center justify-between gap-6 rounded-full border border-white/20 px-6 py-3.5 text-sm font-light text-white transition-colors hover:border-gold hover:bg-white/5";

export default function Footer() {
  const { content } = useSiteContent();
  const { socials } = content;

  return (
    <footer id="contacto" className="scroll-mt-24 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <p className="text-xs font-light uppercase tracking-label text-gold-light">
          Contacto
        </p>
        <h2 className="font-statement mt-4 text-6xl leading-[0.95] text-transparent sm:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-br from-gold-light to-gold bg-clip-text">
            TRABAJEMOS
            <br />
            JUNTOS
          </span>
        </h2>

        <p className="mt-6 max-w-md text-base font-light text-white/70">
          ¿Tenés una marca, un producto o una idea? Escribime y charlamos.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:max-w-md">
          <a href={`mailto:${socials.email}`} className={linkClass}>
            <span className="flex items-center gap-3">
              <Mail size={18} strokeWidth={1.5} />
              {socials.email}
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-white/40 transition-colors group-hover:text-gold-light"
            />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span className="flex items-center gap-3">
              <InstagramIcon size={18} strokeWidth={1.5} />
              Instagram
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-white/40 transition-colors group-hover:text-gold-light"
            />
          </a>
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span className="flex items-center gap-3">
              <Music2 size={18} strokeWidth={1.5} />
              TikTok
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-white/40 transition-colors group-hover:text-gold-light"
            />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs font-light text-white/50 lg:px-10 lg:text-left">
        © {currentYear} Camila Zanon — Todos los derechos reservados.
      </div>
    </footer>
  );
}
