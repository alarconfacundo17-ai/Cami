import { Dumbbell, Apple, Camera, Star } from "lucide-react";
import { useMemo, useState } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import AlbumView from "./AlbumView";
import { useSiteContent } from "../siteContent/SiteContentContext";
import { groupGalleryByCategory } from "../lib/groupGallery";

const ICONS = { dumbbell: Dumbbell, apple: Apple, camera: Camera, star: Star };
const TONES = ["cool", "sunset", "stone", "warm"];

function FolderTile({ folder, tone, onOpen }) {
  const cover = folder.items[0];
  const coverImage = cover && (cover.media_type === "video" ? cover.poster_url : cover.url);
  const hasStack = folder.items.length > 1;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[3/4] w-full text-left"
    >
      {hasStack && (
        <div className="absolute -bottom-2.5 -right-2.5 left-1.5 top-1.5 rounded-sm bg-gold/70 shadow-md transition-all duration-300 ease-out group-hover:-bottom-3.5 group-hover:-right-3.5" />
      )}

      <PlaceholderPhoto
        tone={tone}
        label={folder.label}
        image={coverImage}
        alt={folder.label}
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-105"
        className="relative aspect-[3/4] rounded-sm shadow-md transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl group-active:translate-y-0 group-active:scale-[0.97]"
      >
        <span className="absolute left-3 top-3 rounded-full border border-gold/60 bg-black/50 px-2 py-0.5 text-[11px] font-medium text-gold-light">
          {folder.items.length}
        </span>
      </PlaceholderPhoto>
    </button>
  );
}

export default function About() {
  const { content, gallery } = useSiteContent();
  const { profile, aboutHighlights } = content;
  const [openFolder, setOpenFolder] = useState(null);

  const folders = useMemo(() => groupGalleryByCategory(gallery), [gallery]);

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
              const Icon = ICONS[icon] ?? Star;
              return (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={19} strokeWidth={1.5} className="shrink-0 text-ink" />
                  <span className="text-sm font-light text-ink/90">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="contenido" className="grid flex-1 scroll-mt-24 grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
          {folders.map((folder, i) => (
            <FolderTile
              key={folder.label}
              folder={folder}
              tone={TONES[i % TONES.length]}
              onOpen={() => setOpenFolder(folder)}
            />
          ))}
        </div>
      </div>

      {openFolder && (
        <AlbumView
          category={openFolder.label}
          items={openFolder.items}
          onClose={() => setOpenFolder(null)}
        />
      )}
    </section>
  );
}
