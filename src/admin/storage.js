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
  return { url: data.publicUrl, id };
}

async function uploadGalleryBlob(blob, path) {
  const { error } = await supabase.storage
    .from("media")
    .upload(path, blob, { cacheControl: "3600", contentType: blob.type });

  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// Toma un frame de adentro del video (no el primero, que suele salir
// negro) y lo devuelve como imagen, para usar de portada en la galería.
function captureVideoFrame(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = objectUrl;
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => URL.revokeObjectURL(objectUrl);

    video.addEventListener("loadeddata", () => {
      video.currentTime = Math.min(0.5, (video.duration || 1) / 4);
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error("No se pudo generar la portada"));
        },
        "image/jpeg",
        0.85,
      );
    });

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("No se pudo leer el video"));
    });
  });
}

// Sube un video de galería junto con una portada generada automáticamente
// a partir de un frame del propio video. Si la portada falla por algún
// motivo, sigue sin ella (no es crítico).
export async function uploadGalleryVideo(file) {
  const { url, id } = await uploadGalleryFile(file);

  let posterUrl = null;
  try {
    const frame = await captureVideoFrame(file);
    posterUrl = await uploadGalleryBlob(frame, `gallery/${id}-poster.jpg`);
  } catch (err) {
    console.error("No se pudo generar la portada del video:", err);
  }

  return { url, posterUrl };
}
