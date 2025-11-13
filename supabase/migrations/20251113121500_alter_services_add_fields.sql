alter table services
  add column if not exists rating numeric,
  add column if not exists reviews_count integer,
  add column if not exists features text[] default '{}',
  add column if not exists hero_image text;

create index if not exists services_rating_idx on services (rating desc);

