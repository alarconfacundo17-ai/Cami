# Camila Zanon — Portfolio

Sitio portfolio para Camila Zanon, creadora de contenido (fitness, lifestyle,
deporte y bienestar). Construido con React + Vite + Tailwind CSS, con un
panel de edición (`/admin`) conectado a Supabase para que Camila pueda
actualizar fotos, videos y textos ella misma, sin tocar código.

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

## Panel de edición (`/admin`)

El sitio funciona perfecto sin nada de esto (usa el contenido estático de
`src/content.js`), pero para que Camila pueda entrar a `/admin` y editar
fotos, videos y textos ella misma, hace falta conectar un proyecto gratis
de [Supabase](https://supabase.com) (base de datos + almacenamiento de
archivos + login).

### 1. Crear el proyecto

1. Creá una cuenta gratis en [supabase.com](https://supabase.com) y un
   proyecto nuevo.
2. Andá a **SQL Editor** → "New query", pegá todo el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql) y tocá **Run**. Esto crea
   las tablas, los permisos y el bucket de archivos.
3. Si el bucket `media` no quedó marcado como público, andá a
   **Storage → media → Settings** y activá "Public bucket".

### 2. Crear el usuario de Camila

El panel usa **una sola contraseña** (no un sistema de cuentas): se logra
creando un único usuario fijo en Supabase Auth.

1. Andá a **Authentication → Users → Add user → Create new user**.
2. Como email, poné exactamente:
   `camila@camilazanon-admin.local` (así está escrito en
   `src/admin/adminConfig.js` — si lo cambiás ahí, usá ese mismo acá).
3. Como contraseña, poné la que Camila va a usar para entrar a `/admin`.
4. Marcá **Auto Confirm User** para que no pida verificación por mail.

### 3. Conectar la app

1. En Supabase: **Project Settings → API** → copiá el **Project URL** y la
   **anon public key**.
2. Copiá `.env.example` a `.env` y completá esos dos valores:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```
3. Donde despliegues el sitio (Vercel, Netlify, etc.) agregá esas mismas
   dos variables de entorno en la configuración del proyecto.

Listo — `/admin` ya debería pedir la contraseña y, al entrar, mostrar el
editor completo (textos, fotos de cada sección, y una galería libre donde
Camila puede sumar o sacar fotos/videos cuando quiera).

> La anon key de Supabase es pública por diseño (queda en el código del
> sitio) — lo que protege los datos son los permisos (RLS) del script SQL:
> cualquiera puede *ver* el contenido, pero solo quien inició sesión con la
> contraseña puede *editarlo*.

## Cómo editar el contenido sin el panel

Si todavía no conectaste Supabase, el contenido por defecto vive en
**`src/content.js`** y se puede editar a mano:

- Nombre, bio o categorías → `profile`
- Seguidores / alcance / reproducciones → `stats`
- Tipos de contenido o colaboraciones → `contentTypes`, `collaborations`
- Marcas con las que trabajó → `brands`
- Redes sociales y email de contacto → `socials`
- Fotos de los slots fijos (hero, grid, etc.) → agregá el archivo a
  `src/assets/photos/` e importalo donde corresponda

Una vez que el panel de admin está conectado, cualquier cambio guardado
desde `/admin` tiene prioridad sobre estos valores por defecto.

## Estructura

```
src/
  components/     Secciones del sitio público (Navbar, Hero, About, etc.)
  content.js      Contenido estático por defecto (fallback sin Supabase)
  siteContent/    Contexto que trae el contenido real desde Supabase
  admin/          Panel de edición protegido por contraseña (/admin)
  lib/            Cliente de Supabase
supabase/
  schema.sql      Tablas, permisos y bucket — correr una vez en Supabase
```
