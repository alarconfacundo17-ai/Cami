import PlaceholderPhoto from "./PlaceholderPhoto";
import { DoodleArrow, DoodleHeart } from "./doodles";
import { profile } from "../content";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-ink pt-32 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.5), transparent 35%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.35), transparent 40%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10 lg:pb-12">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-light uppercase tracking-label text-white/60">
            {profile.tagline}
          </p>

          <h1 className="font-serif-display mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-6 text-lg font-light text-white/80 sm:text-xl">
            {profile.categories.join(" · ")}
          </p>

          <DoodleArrow className="mt-8 h-9 w-52 text-white/70" />
        </div>

        <div className="relative order-1 lg:order-2">
          <PlaceholderPhoto
            tone="stone"
            className="aspect-[4/5] w-full rounded-sm lg:aspect-auto lg:h-[480px]"
          >
            <DoodleHeart className="absolute top-8 right-10 hidden h-9 w-9 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] sm:block" />

            <p className="font-hand absolute top-16 right-6 hidden max-w-[8.5rem] whitespace-pre-line text-right text-2xl leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] lg:block">
              {profile.heroNote}
            </p>
          </PlaceholderPhoto>
        </div>
      </div>
    </section>
  );
}
