// ─────────────────────────────────────────────────────────────────────────
// Todo el contenido editable del sitio vive acá. Para actualizar textos,
// fotos, redes, métricas o marcas, editá este archivo — no hace falta
// tocar los componentes.
// ─────────────────────────────────────────────────────────────────────────

import heroPhoto from "./assets/photos/hero.webp";
import contentCollabPhoto from "./assets/photos/content-collab.webp";
import lifestylePhoto from "./assets/photos/lifestyle.webp";
import experienciasPhoto from "./assets/photos/experiencias.webp";

export const profile = {
  name: "Camila Zanon",
  tagline: "Portfolio creadora de contenido",
  categories: ["Fitness", "Lifestyle", "Deporte", "Bienestar"],
  heroNote: "Contenido real,\nactivo y\ncon propósito.",
  heroImage: heroPhoto,
  aboutTitle: "Sobre mí",
  aboutGreeting: "¡Hola! Soy Camila, creadora de contenido digital.",
  aboutParagraphs: [
    "Soy una persona curiosa, espontánea, activa y apasionada por descubrir cosas nuevas. Me gusta el deporte, el lifestyle, la moda, la gastronomía, el baile y, sobre todo, compartir un poquito de todo lo que forma parte de mi mundo.",
    "Mi contenido refleja quién soy: genuino, natural y sin intentar mostrar una versión perfecta de la realidad. Me gusta mostrarme tal cual soy, con mi personalidad, mis ocurrencias y mi forma de ver las cosas.",
    "Disfruto estar frente a cámara, las sesiones fotográficas y explorar distintas formas de comunicar y crear.",
    "Mi esencia es ser yo misma, y eso es lo que quiero transmitir en cada contenido.",
  ],
};

export const aboutHighlights = [
  { icon: "dumbbell", label: "Entrenamiento & Fitness" },
  { icon: "apple", label: "Bienestar & Nutrición" },
  { icon: "camera", label: "Lifestyle & Vlogs" },
  { icon: "star", label: "Experiencias & Marcas" },
];

// Las fotos sin "image" siguen siendo placeholders — reemplazar por la ruta
// real cuando tengamos más material de Camila para esas categorías.
export const contentGrid = [
  { label: "Deporte", image: null },
  { label: "Gastronomía saludable", image: null },
  { label: "Lifestyle", image: lifestylePhoto },
  { label: "Experiencias & aventuras", image: experienciasPhoto, objectPosition: "22% 30%" },
];

// Foto grande de la sección "Tipos de contenido / Colaboraciones".
export const contentCollabImage = contentCollabPhoto;

// Reemplazar los valores "null" por los números reales cuando los tengamos.
export const stats = [
  { icon: "instagram", value: "+10.000", label: "seguidores" },
  { icon: "tiktok", value: null, label: "seguidores" },
  { icon: "chart", value: null, label: "alcance promedio" },
  { icon: "play", value: null, label: "reproducciones promedio" },
];

export const contentTypes = [
  "Reels (experiencias, entrenamientos, rutinas)",
  "Fotos (estilo de vida, producto, deporte)",
  "Stories (uso en tiempo real, recomendaciones)",
  "Reseñas y unboxings",
  "Coberturas de eventos",
];

export const collaborations = [
  "Marcas de suplementos",
  "Apps de entrenamiento",
  "Indumentaria deportiva",
  "Gastronomía saludable",
  "Experiencias deportivas y outdoor",
  "Bienestar y salud",
];

// Reemplazar por los logos/nombres reales de marcas con las que trabajó.
export const brands = ["Nike", "BeFit", "Ringana", "VentoFit", "BeastLabs"];

export const socials = {
  instagram: "https://instagram.com/camizanon_",
  tiktok: "https://tiktok.com/@camizanon",
  email: "camilitazanoncz@gmail.com",
};

export const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contenido", href: "#contenido" },
  { label: "Métricas", href: "#metricas" },
  { label: "Colaboraciones", href: "#colaboraciones" },
  { label: "Contacto", href: "#contacto" },
];
