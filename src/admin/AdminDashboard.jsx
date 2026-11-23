import { useState } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useSiteContent } from "../siteContent/SiteContentContext";
import TextListEditor from "./fields/TextListEditor";
import ImageField from "./fields/ImageField";
import GalleryManager from "./GalleryManager";

const HIGHLIGHT_ICONS = ["dumbbell", "apple", "camera", "star"];
const STAT_LABELS = ["Instagram", "TikTok", "Alcance", "Reproducciones"];

function Section({ title, children }) {
  return (
    <section className="rounded-md bg-white/60 p-6">
      <h2 className="font-serif-display text-xl text-ink">{title}</h2>
      <div className="mt-5 flex flex-col gap-6">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-label text-ink/50">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/60";

export default function AdminDashboard() {
  const { content, refresh } = useSiteContent();
  const [form, setForm] = useState(() => structuredClone(content));
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  const setProfile = (patch) =>
    setForm((f) => ({ ...f, profile: { ...f.profile, ...patch } }));

  const setArrayItem = (key, i, patch) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((item, idx) => (idx === i ? { ...item, ...patch } : item)),
    }));

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from("site_content")
      .upsert({ id: 1, data: form, updated_at: new Date().toISOString() });
    await refresh();
    setSaving(false);
    setSavedAt(Date.now());
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-ink px-6 py-4 text-white">
        <h1 className="font-serif-display text-lg">Panel de edición</h1>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            Ver sitio <ExternalLink size={14} />
          </a>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <LogOut size={15} /> Salir
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6 px-6">
        <Section title="Hero">
          <Field label="Nombre">
            <input
              className={inputClass}
              value={form.profile.name}
              onChange={(e) => setProfile({ name: e.target.value })}
            />
          </Field>
          <Field label="Etiqueta (arriba del nombre)">
            <input
              className={inputClass}
              value={form.profile.tagline}
              onChange={(e) => setProfile({ tagline: e.target.value })}
            />
          </Field>
          <TextListEditor
            label="Categorías (Fitness · Lifestyle · ...)"
            items={form.profile.categories}
            onChange={(categories) => setProfile({ categories })}
          />
          <Field label="Nota escrita a mano sobre la foto">
            <textarea
              rows={3}
              className={inputClass}
              value={form.profile.heroNote}
              onChange={(e) => setProfile({ heroNote: e.target.value })}
            />
          </Field>
          <ImageField
            label="Foto principal"
            value={form.profile.heroImage}
            path="site/hero"
            onChange={(heroImage) => setProfile({ heroImage })}
          />
        </Section>

        <Section title="Sobre mí">
          <Field label="Título de la sección">
            <input
              className={inputClass}
              value={form.profile.aboutTitle}
              onChange={(e) => setProfile({ aboutTitle: e.target.value })}
            />
          </Field>
          <Field label="Saludo inicial">
            <input
              className={inputClass}
              value={form.profile.aboutGreeting}
              onChange={(e) => setProfile({ aboutGreeting: e.target.value })}
            />
          </Field>
          <TextListEditor
            label="Párrafos de la bio"
            items={form.profile.aboutParagraphs}
            onChange={(aboutParagraphs) => setProfile({ aboutParagraphs })}
            multiline
          />

          <div>
            <p className="text-xs font-medium uppercase tracking-label text-ink/50">
              Destacados (con ícono)
            </p>
            <div className="mt-2 flex flex-col gap-3">
              {form.aboutHighlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={h.icon}
                    onChange={(e) => setArrayItem("aboutHighlights", i, { icon: e.target.value })}
                    className={`${inputClass} w-36 shrink-0`}
                  >
                    {HIGHLIGHT_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputClass}
                    value={h.label}
                    onChange={(e) => setArrayItem("aboutHighlights", i, { label: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Grid de contenido (4 fotos)">
          {form.contentGrid.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 border-b border-ink/10 pb-5 last:border-0 last:pb-0">
              <Field label={`Etiqueta ${i + 1}`}>
                <input
                  className={inputClass}
                  value={item.label}
                  onChange={(e) => setArrayItem("contentGrid", i, { label: e.target.value })}
                />
              </Field>
              <ImageField
                label="Foto"
                value={item.image}
                path={`site/grid-${i}`}
                onChange={(image) => setArrayItem("contentGrid", i, { image })}
              />
            </div>
          ))}
        </Section>

        <Section title="Foto grande (sección Tipos de contenido)">
          <ImageField
            label="Foto"
            value={form.contentCollabImage}
            path="site/content-collab"
            onChange={(contentCollabImage) => setForm((f) => ({ ...f, contentCollabImage }))}
          />
        </Section>

        <Section title="Comunidad (métricas)">
          {form.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-xs text-ink/50">{STAT_LABELS[i]}</span>
              <input
                className={inputClass}
                placeholder="+10.000"
                value={s.value ?? ""}
                onChange={(e) => setArrayItem("stats", i, { value: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="seguidores"
                value={s.label}
                onChange={(e) => setArrayItem("stats", i, { label: e.target.value })}
              />
            </div>
          ))}
        </Section>

        <Section title="Tipos de contenido">
          <TextListEditor
            label="Lista"
            items={form.contentTypes}
            onChange={(contentTypes) => setForm((f) => ({ ...f, contentTypes }))}
          />
        </Section>

        <Section title="Colaboraciones">
          <TextListEditor
            label="Lista"
            items={form.collaborations}
            onChange={(collaborations) => setForm((f) => ({ ...f, collaborations }))}
          />
        </Section>

        <Section title="Marcas con las que trabajó">
          <TextListEditor
            label="Marcas"
            items={form.brands}
            onChange={(brands) => setForm((f) => ({ ...f, brands }))}
          />
        </Section>

        <Section title="Redes y contacto">
          <Field label="Instagram (link completo)">
            <input
              className={inputClass}
              value={form.socials.instagram}
              onChange={(e) =>
                setForm((f) => ({ ...f, socials: { ...f.socials, instagram: e.target.value } }))
              }
            />
          </Field>
          <Field label="TikTok (link completo)">
            <input
              className={inputClass}
              value={form.socials.tiktok}
              onChange={(e) =>
                setForm((f) => ({ ...f, socials: { ...f.socials, tiktok: e.target.value } }))
              }
            />
          </Field>
          <Field label="Email de contacto">
            <input
              className={inputClass}
              value={form.socials.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, socials: { ...f.socials, email: e.target.value } }))
              }
            />
          </Field>
        </Section>

        <section className="rounded-md bg-white/60 p-6">
          <GalleryManager />
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between bg-ink px-6 py-4 text-white">
        <span className="text-xs text-white/60">
          {savedAt ? "Guardado ✓" : "Los cambios de texto y fotos se guardan al tocar Guardar."}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-white px-6 py-2.5 text-sm font-medium text-ink hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
