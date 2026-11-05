import { Video, Image, Circle, FileText, Users, Check } from "lucide-react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import { collaborations, contentCollabImage, contentTypes, profile } from "../content";

const TYPE_ICONS = [Video, Image, Circle, FileText, Users];

export default function ContentCollab() {
  return (
    <section className="bg-cream">
      <div className="flex flex-col lg:flex-row">
        <PlaceholderPhoto
          tone="stone"
          image={contentCollabImage}
          alt={profile.name}
          objectPosition="center 20%"
          className="h-72 w-full lg:h-auto lg:w-[26%]"
        />

        <div className="grid flex-1 grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-2 lg:gap-10 lg:px-14 lg:py-16">
          <div>
            <h3 className="font-serif-display text-3xl italic text-ink">
              Tipos de contenido
            </h3>
            <ul className="mt-7 flex flex-col gap-4">
              {contentTypes.map((item, i) => {
                const Icon = TYPE_ICONS[i % TYPE_ICONS.length];
                return (
                  <li key={item} className="flex items-start gap-3">
                    <Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink/80" />
                    <span className="text-sm font-light leading-relaxed text-ink/90">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            id="colaboraciones"
            className="scroll-mt-24 sm:border-l sm:border-ink/15 sm:pl-10 lg:pl-16"
          >
            <h3 className="font-serif-display text-3xl text-ink">Colaboraciones</h3>
            <ul className="mt-7 flex flex-col gap-4">
              {collaborations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink/80" />
                  <span className="text-sm font-light leading-relaxed text-ink/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
