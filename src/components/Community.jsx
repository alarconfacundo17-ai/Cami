import { Music2, BarChart3, Play } from "lucide-react";
import { InstagramIcon } from "./doodles";
import { stats } from "../content";

const ICONS = { instagram: InstagramIcon, tiktok: Music2, chart: BarChart3, play: Play };

export default function Community() {
  return (
    <section id="metricas" className="scroll-mt-24 bg-ink py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 lg:flex-row lg:gap-14 lg:px-10">
        <h2 className="font-serif-display shrink-0 text-2xl italic">Comunidad</h2>

        <div className="grid w-full grid-cols-2 gap-y-8 sm:grid-cols-4">
          {stats.map(({ icon, value, label }, i) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={label + i}
                className={`flex items-center justify-center gap-3 px-4 text-center sm:text-left ${
                  i > 0 ? "sm:border-l sm:border-white/15" : ""
                }`}
              >
                <Icon size={26} strokeWidth={1.25} className="shrink-0" />
                <div>
                  <p className="font-serif-display text-lg leading-none">
                    {value ?? "+X.XXX"}
                  </p>
                  <p className="mt-1 text-xs font-light text-white/70">{label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
