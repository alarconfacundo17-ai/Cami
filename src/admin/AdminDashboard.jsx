import { useEffect, useRef, useState } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useSiteContent } from "../siteContent/SiteContentContext";
import TextListEditor from "./fields/TextListEditor";
import ImageField from "./fields/ImageField";
import GalleryManager from "./GalleryManager";

const HIGHLIGHT_ICONS = ["dumbbell", "apple", "camera", "star"];
const STAT_LABELS = ["Instagram", "TikTok", "Alcance", "Reproducciones"];

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "comunidad", label: "Comunidad" },
  { id: "contenido", label: "Contenido" },
  { id: "marcas", label: "Marcas" },
  { id: "contacto", label: "Contacto" },
  { id: "galeria", label: "Galería" },
];

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
  const { content, loading, refresh } = useSiteContent();
  const [form, setForm] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState("");

  const skipNextSave = useRef(true);
  const saveTimer = useRef(null);

  // El formulario recién se arma cuando terminó de llegar lo guardado de
  // verdad desde Supabase — si se armara antes (con el contenido por
  // defecto, de respaldo), cualquier guardado automático pisaría lo real
  // con esos valores de ejemplo.
  useEffect(() => {
    if (!loading && form === null) {
      skipNextSave.current = true;
      setForm(structuredClone(content));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (form === null) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    setStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: 1, data: form, updated_at: new Date().toISOString() });

      if (error) {
        console.error(error);
        setStatus("error");
        setErrorMsg(error.message);
        return;
      }
      await refresh();
      setStatus("saved");
    }, 700);

    return () => clearTimeout(saveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  if (form === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-ink/50">Cargando…</p>
      </div>
    );
  }

  const setProfile = (patch) =>
    setForm((f) => ({ ...f, profile: { ...f.profile, ...patch } }));

  const setArrayItem = (key, i, patch) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((item, idx) => (idx === i ? { ...item, ...patch } : item)),
    }));

  const statusLabel =
    status === "saving"
      ? "Guardando…"
      : status === "error"
        ? `Error: ${errorMsg}`
        : status === "saved"
          ? "Guardado ✓"
          : "";

  return (
    <div className="min-h-screen bg-cream">
      <div className="sticky top-0 z-10 bg-ink text-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif-display text-lg">Panel de edición</h1>
            <p
              className={`text-xs ${status === "error" ? "text-red-400" : "text-white/50"}`}
            >
              {statusLabel}
            </p>
          </div>
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

        <div className="flex gap-1 overflow-x-auto border-t border-white/10 px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-ink"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {activeTab === "hero" && (
          <div className="flex flex-col gap-6">
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
          </div>
        )}

        {activeTab === "sobre-mi" && (
          <div className="flex flex-col gap-6">
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
          </div>
        )}

        {activeTab === "comunidad" && (
          <div className="flex flex-col gap-4">
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
          </div>
        )}

        {activeTab === "contenido" && (
          <div className="flex flex-col gap-8">
            <ImageField
              label="Foto grande (sección Tipos de contenido)"
              value={form.contentCollabImage}
              path="site/content-collab"
              onChange={(contentCollabImage) => setForm((f) => ({ ...f, contentCollabImage }))}
            />
            <TextListEditor
              label="Tipos de contenido"
              items={form.contentTypes}
              onChange={(contentTypes) => setForm((f) => ({ ...f, contentTypes }))}
            />
            <TextListEditor
              label="Colaboraciones"
              items={form.collaborations}
              onChange={(collaborations) => setForm((f) => ({ ...f, collaborations }))}
            />
          </div>
        )}

        {activeTab === "marcas" && (
          <TextListEditor
            label="Marcas con las que trabajó"
            items={form.brands}
            onChange={(brands) => setForm((f) => ({ ...f, brands }))}
          />
        )}

        {activeTab === "contacto" && (
          <div className="flex flex-col gap-6">
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
          </div>
        )}

        {activeTab === "galeria" && (
          <div>
            <p className="mb-4 text-sm font-light text-ink/70">
              Acá se manejan las carpetas de fotos y videos que se ven en la
              sección "Sobre mí" del sitio (Deporte, Lifestyle, etc.).
            </p>
            <GalleryManager />
          </div>
        )}
      </div>
    </div>
  );
}
