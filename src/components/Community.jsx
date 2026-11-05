import { Music2, BarChart3, Play } from "lucide-react";
import { InstagramIcon } from "./doodles";
import { socials, stats } from "../content";

const ICONS = { instagram: InstagramIcon, tiktok: Music2, chart: BarChart3, play: Play };
const LINKS = { instagram: socials.instagram, tiktok: socials.tiktok };

export default function Community() {
  return (
    <section id="metricas" className="scroll-mt-24 bg-ink py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 lg:flex-row lg:gap-14 lg:px-10">
        <h2 className="font-serif-display shrink-0 text-2xl italic">Comunidad</h2>

        <div className="grid w-full grid-cols-2 gap-y-8 sm:grid-cols-4">
          {stats.map(({ icon, value, label }, i) => {
            const Icon = ICONS[icon];
            const href = LINKS[icon];
            const Wrapper = href ? "a" : "div";
            return (
              <Wrapper
                key={label + i}
                {...(href && {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`flex items-center justify-center gap-3 px-4 text-center transition-opacity sm:text-left ${
                  i > 0 ? "sm:border-l sm:border-white/15" : ""
                } ${href ? "hover:opacity-80" : ""}`}
              >
                <Icon size={26} strokeWidth={1.25} className="shrink-0" />
                <div>
                  <p className="font-serif-display text-lg leading-none">
                    {value ?? "+X.XXX"}
                  </p>
                  <p className="mt-1 text-xs font-light text-white/70">{label}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
