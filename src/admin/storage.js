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
// negro) y lo devuelve como imagen chica, para usar de portada. El
// elemento <video> se agrega (oculto) a la página porque en varios
// navegadores de celular (sobre todo iOS) un <video> que nunca se insertó
// en el documento no dispara sus eventos de carga, y la promesa quedaría
// esperando para siempre.
function captureVideoFrame(file, maxDimension = 1280) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(video);

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.remove();
    };

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

    video.src = objectUrl;
  });
}

// Por las dudas de que algún navegador tampoco dispare los eventos de
// arriba, esto pone un límite de tiempo: si a los 8 segundos no hay
// portada, seguimos sin ella en vez de quedarnos esperando para siempre.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

// Sube un video de galería junto con una portada generada automáticamente
// a partir de un frame del propio video. El video se sube igual aunque la
// portada falle o tarde demasiado (no es crítico).
export async function uploadGalleryVideo(file) {
  const id = crypto.randomUUID();
  const ext = file.name.split(".").pop();

  const posterPromise = withTimeout(
    captureVideoFrame(file).catch((err) => {
      console.error("No se pudo generar la portada del video:", err);
      return null;
    }),
    8000,
  );

  const [url, posterBlob] = await Promise.all([
    uploadRaw(file, `gallery/${id}.${ext}`),
    posterPromise,
  ]);

  let posterUrl = null;
  if (posterBlob) {
    try {
      posterUrl = await uploadRaw(posterBlob, `gallery/${id}-poster.jpg`, "image/jpeg");
    } catch (err) {
      console.error("No se pudo subir la portada del video:", err);
    }
  }

  return { url, posterUrl };
}
