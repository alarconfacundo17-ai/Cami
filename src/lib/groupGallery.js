// Agrupa los items de la galería por carpeta (categoría). Se usa tanto en
// el sitio público (About.jsx) como en el panel de admin (GalleryManager).
export function groupGalleryByCategory(gallery) {
  const map = new Map();
  for (const item of gallery) {
    const key = item.category || "Sin carpeta";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return [...map.entries()].map(([label, items]) => ({ label, items }));
}
