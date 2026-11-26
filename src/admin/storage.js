import { supabase } from "../lib/supabaseClient";
import { resizeImage } from "./imageResize";

async function uploadRaw(blobOrFile, path, contentType) {
  const { error } = await supabase.storage
    .from("media")
    .upload(path, blobOrFile, { upsert: true, cacheControl: "3600", contentType });

  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// Sube una foto al bucket "media" en una ruta fija (pisa lo que ya hubiera
// ahí), comprimiéndola antes para que no viaje el archivo entero del
// celular. Devuelve la URL pública para guardar en el contenido.
export async function uploadToPath(file, path) {
  const blob = await resizeImage(file);
  const url = await uploadRaw(blob, `${path}.webp`, "image/webp");
  // Cache-busting: la ruta es siempre la misma, así que agregamos un
  // parámetro para que no quede pegada la imagen vieja en el navegador.
  return `${url}?t=${Date.now()}`;
}

// Sube una foto de galería (comprimida) con un nombre único.
export async function uploadGalleryFile(file) {
  const blob = await resizeImage(file);
  const id = crypto.randomUUID();
  const url = await uploadRaw(blob, `gallery/${id}.webp`, "image/webp");
  return { url, id };
}

// Toma un frame de adentro del video (no el primero, que suele salir
// negro) y lo devuelve como imagen chica, para usar de portada.
function captureVideoFrame(file, maxDimension = 1280) {
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
      let width = video.videoWidth;
      let height = video.videoHeight;
      if (width > maxDimension || height > maxDimension) {
        if (width >= height) {
          height = Math.round((height / width) * maxDimension);
          width = maxDimension;
        } else {
          width = Math.round((width / height) * maxDimension);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error("No se pudo generar la portada"));
        },
        "image/jpeg",
        0.8,
      );
    });

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("No se pudo leer el video"));
    });
  });
}

// Sube un video de galería junto con una portada generada automáticamente
// a partir de un frame del propio video. La portada se genera localmente
// (no necesita red) y se sube en paralelo con el video, no después, para
// no sumar tiempo de espera extra. Si la portada falla, el video se sube
// igual (no es crítico).
export async function uploadGalleryVideo(file) {
  const id = crypto.randomUUID();
  const ext = file.name.split(".").pop();

  let posterBlob = null;
  try {
    posterBlob = await captureVideoFrame(file);
  } catch (err) {
    console.error("No se pudo generar la portada del video:", err);
  }

  const [url, posterUrl] = await Promise.all([
    uploadRaw(file, `gallery/${id}.${ext}`),
    posterBlob ? uploadRaw(posterBlob, `gallery/${id}-poster.jpg`, "image/jpeg") : Promise.resolve(null),
  ]);

  return { url, posterUrl };
}
