import { supabase, supabaseUrl, supabaseAnonKey } from "../lib/supabaseClient";
import { resizeImage } from "./imageResize";

// Subida "cruda" al bucket vía XHR en vez del cliente de Supabase: así
// podemos leer el progreso real (xhr.upload.onprogress) y mostrarle a quien
// sube un archivo pesado cuánto falta, en vez de un "Subiendo…" sin info.
async function uploadRaw(blobOrFile, path, contentType, onProgress) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${supabaseUrl}/storage/v1/object/media/${path}`);
    xhr.setRequestHeader("apikey", supabaseAnonKey);
    xhr.setRequestHeader("Authorization", `Bearer ${session?.access_token ?? supabaseAnonKey}`);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.setRequestHeader("x-upsert", "true");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`No se pudo subir el archivo (código ${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Error de red al subir el archivo"));
    xhr.send(blobOrFile);
  });

  onProgress?.(1);
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// Sube una foto al bucket "media" en una ruta fija (pisa lo que ya hubiera
// ahí), comprimiéndola antes para que no viaje el archivo entero del
// celular. Devuelve la URL pública para guardar en el contenido.
export async function uploadToPath(file, path, onProgress) {
  const blob = await resizeImage(file);
  const url = await uploadRaw(blob, `${path}.webp`, "image/webp", onProgress);
  // Cache-busting: la ruta es siempre la misma, así que agregamos un
  // parámetro para que no quede pegada la imagen vieja en el navegador.
  return `${url}?t=${Date.now()}`;
}

// Sube una foto de galería (comprimida) con un nombre único.
export async function uploadGalleryFile(file, onProgress) {
  const blob = await resizeImage(file);
  const id = crypto.randomUUID();
  const url = await uploadRaw(blob, `gallery/${id}.webp`, "image/webp", onProgress);
  return { url, id };
}

// Toma un frame de adentro del video (no el primero, que suele salir
// negro) y lo devuelve como imagen chica, para usar de portada. El
// elemento <video> se agrega a la página (visible, aunque fuera de la
// pantalla) porque varios navegadores de celular pausan la decodificación
// de un <video> que consideran "invisible" (ej. con opacity:0 o 1x1px),
// y entonces nunca llega a dibujar el frame pedido.
function captureVideoFrame(file, maxDimension = 1280) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.style.cssText =
      "position:fixed;left:-9999px;top:0;width:320px;height:180px;pointer-events:none;";
    document.body.appendChild(video);

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.remove();
    };

    let seeked = false;
    const capture = () => {
      if (seeked) return;
      seeked = true;
      let width = video.videoWidth;
      let height = video.videoHeight;
      if (!width || !height) {
        cleanup();
        reject(new Error("No se pudo leer el tamaño del video"));
        return;
      }
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
    };

    video.addEventListener("loadeddata", () => {
      video.currentTime = Math.min(0.5, (video.duration || 1) / 4);
    });
    video.addEventListener("seeked", capture);
    // En algunos navegadores "seeked" no llega a disparar para ciertos
    // formatos; si ya está listo para reproducir, capturamos ese frame.
    video.addEventListener("canplay", capture);

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("No se pudo leer el video"));
    });

    video.src = objectUrl;
  });
}

// Por las dudas de que algún navegador tampoco dispare los eventos de
// arriba, esto pone un límite de tiempo: si a los 15 segundos no hay
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
export async function uploadGalleryVideo(file, onProgress) {
  const id = crypto.randomUUID();
  const ext = file.name.split(".").pop();

  const posterPromise = withTimeout(
    captureVideoFrame(file).catch((err) => {
      console.error("No se pudo generar la portada del video:", err);
      return null;
    }),
    15000,
  );

  const [url, posterBlob] = await Promise.all([
    uploadRaw(file, `gallery/${id}.${ext}`, file.type || "video/mp4", onProgress),
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
