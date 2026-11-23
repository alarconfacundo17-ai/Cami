import { supabase } from "../lib/supabaseClient";

// Sube un archivo al bucket "media" en una ruta fija (pisa lo que ya
// hubiera ahí) y devuelve la URL pública para guardar en el contenido.
export async function uploadToPath(file, path) {
  const ext = file.name.split(".").pop();
  const fullPath = `${path}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fullPath, file, { upsert: true, cacheControl: "3600" });

  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(fullPath);
  // Cache-busting: la ruta es siempre la misma, así que agregamos un
  // parámetro para que no quede pegada la imagen vieja en el navegador.
  return `${data.publicUrl}?t=${Date.now()}`;
}

// Sube un archivo de galería con un nombre único (no pisa nada).
export async function uploadGalleryFile(file) {
  const ext = file.name.split(".").pop();
  const id = crypto.randomUUID();
  const fullPath = `gallery/${id}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fullPath, file, { cacheControl: "3600" });

  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(fullPath);
  return data.publicUrl;
}
