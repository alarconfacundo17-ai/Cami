import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import * as staticContent from "../content.js";

// Todo lo editable, agrupado en un solo objeto. Esto es lo que se guarda
// como "data" en la fila única de la tabla site_content cuando se usa el
// panel de admin.
export const defaultContent = {
  profile: staticContent.profile,
  aboutHighlights: staticContent.aboutHighlights,
  contentCollabImage: staticContent.contentCollabImage,
  stats: staticContent.stats,
  contentTypes: staticContent.contentTypes,
  collaborations: staticContent.collaborations,
  brands: staticContent.brands,
  socials: staticContent.socials,
};

export const nav = staticContent.nav;

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const [{ data: row }, { data: items }] = await Promise.all([
      supabase.from("site_content").select("data").eq("id", 1).maybeSingle(),
      supabase
        .from("gallery_items")
        .select("*")
        .order("position", { ascending: true }),
    ]);

    if (row?.data && Object.keys(row.data).length > 0) {
      // Las claves guardadas pisan el default; lo que no esté guardado
      // sigue viniendo del contenido estático (content.js).
      setContent({ ...defaultContent, ...row.data });
    }
    if (items) setGallery(items);

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ content, gallery, loading, refresh: load }),
    [content, gallery, loading, load],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent debe usarse dentro de SiteContentProvider");
  }
  return ctx;
}
