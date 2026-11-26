-- ─────────────────────────────────────────────────────────────────────────
-- Esquema de Supabase para el panel de edición del portfolio de Camila.
-- Pegar y correr este script completo en: Supabase Dashboard → SQL Editor
-- → "New query" → pegar → Run.
-- ─────────────────────────────────────────────────────────────────────────

-- Contenido del sitio: una sola fila (id = 1) con todo el texto editable
-- como JSON. La app pública lo lee; el panel de admin lo actualiza.
create table if not exists site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

alter table site_content enable row level security;

create policy "site_content is publicly readable"
  on site_content for select
  to anon, authenticated
  using (true);

create policy "site_content is editable by logged-in admin"
  on site_content for update
  to authenticated
  using (true)
  with check (true);

-- El guardado del panel usa upsert (insert con "on conflict"), así que
-- además del permiso de update hace falta este de insert.
create policy "site_content is insertable by logged-in admin"
  on site_content for insert
  to authenticated
  with check (true);

-- Galería libre: fotos/videos que Camila puede agregar o sacar cuando
-- quiera, sin estar atados a un lugar fijo del diseño.
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  media_type text not null check (media_type in ('image', 'video')),
  url text not null,
  poster_url text,
  category text,
  caption text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table gallery_items enable row level security;

create policy "gallery_items is publicly readable"
  on gallery_items for select
  to anon, authenticated
  using (true);

create policy "gallery_items is editable by logged-in admin"
  on gallery_items for all
  to authenticated
  using (true)
  with check (true);

-- Fila inicial de contenido (seed). Si ya existe no la pisa.
insert into site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Bucket de Storage para las fotos/videos subidos desde el panel.
-- (El bucket en sí se crea en Storage → New bucket → nombre "media",
-- marcado como "Public bucket". Estas políticas le dan permisos.)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media is publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "media is editable by logged-in admin"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

-- Los videos de celular pueden pesar varios cientos de MB. Por defecto el
-- bucket no tiene límite propio, pero el proyecto de Supabase sí tiene un
-- límite general (Dashboard → Project Settings → Storage → "Upload file
-- size limit", 50MB en el plan gratis). Esta línea solo sube el límite del
-- bucket; si el límite general del proyecto es menor, ese es el que manda,
-- así que conviene revisarlo y subirlo ahí también si hace falta.
update storage.buckets set file_size_limit = 524288000 -- 500MB
where id = 'media';
