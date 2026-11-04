# Camila Zanon — Portfolio

Sitio portfolio para Camila Zanon, creadora de contenido (fitness, lifestyle,
deporte y bienestar). Construido con React + Vite + Tailwind CSS.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview   # para previsualizar el build
```

El resultado queda en `dist/`, listo para desplegar en Vercel, Netlify,
GitHub Pages o cualquier hosting estático.

## Cómo editar el contenido

Casi todo el texto, las métricas, las marcas y los links de redes están
centralizados en **`src/content.js`**. No hace falta tocar los componentes
para:

- Cambiar el nombre, bio o categorías → `profile`
- Actualizar seguidores / alcance / reproducciones → `stats`
- Editar la lista de tipos de contenido o colaboraciones → `contentTypes`,
  `collaborations`
- Cambiar marcas con las que trabajó → `brands`
- Actualizar redes sociales y email de contacto → `socials`

## Fotos

Todas las fotos del sitio son **placeholders** (bloques de color con un
ícono de cámara) hechos con el componente `PlaceholderPhoto`, ya que todavía
no tenemos el material real de Camila.

Para reemplazarlas por fotos reales:

1. Agregá las imágenes a `src/assets/` (o `public/`).
2. En `src/content.js`, completá el campo `image` de `contentGrid` con la
   ruta del archivo.
3. En los componentes (`Hero.jsx`, `ContentCollab.jsx`) reemplazá
   `<PlaceholderPhoto ... />` por una etiqueta `<img>` apuntando a la foto,
   manteniendo las mismas clases de tamaño/posición.

## Estructura

```
src/
  components/   Navbar, Hero, About, Community, ContentCollab, Footer, etc.
  content.js    Todo el contenido editable del sitio
  index.css     Tema de Tailwind (colores, tipografías)
```
