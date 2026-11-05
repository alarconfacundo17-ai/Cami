import { Dumbbell, Apple, Camera, Star } from "lucide-react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import { aboutHighlights, contentGrid, profile } from "../content";

const ICONS = { dumbbell: Dumbbell, apple: Apple, camera: Camera, star: Star };
const TONES = ["cool", "sunset", "stone", "warm"];

export default function About() {
  return (
    <section id="sobre-mi" className="bg-cream py-20 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:gap-10 lg:px-10">
        <div className="lg:w-[34%] lg:shrink-0">
          <h2 className="font-serif-display text-4xl text-ink sm:text-5xl">
            {profile.aboutTitle}
          </h2>

          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-ink">
            {profile.aboutGreeting}
          </p>

          <div className="mt-4 flex max-w-md flex-col gap-4">
            {profile.aboutParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base font-light leading-relaxed text-ink/80"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 flex flex-col gap-4">
            {aboutHighlights.map(({ icon, label }) => {
              const Icon = ICONS[icon];
              return (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={19} strokeWidth={1.5} className="shrink-0 text-ink" />
                  <span className="text-sm font-light text-ink/90">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="contenido" className="grid flex-1 scroll-mt-24 grid-cols-2 gap-4 lg:grid-cols-4">
          {contentGrid.map((item, i) => (
            <PlaceholderPhoto
              key={item.label}
              tone={TONES[i % TONES.length]}
              label={item.label}
              image={item.image}
              alt={item.label}
              objectPosition={item.objectPosition ?? "center"}
              className="aspect-[3/4] rounded-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
