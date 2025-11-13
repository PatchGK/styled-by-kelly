create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  description text,
  price text,
  duration text,
  price_id text,
  is_in_person boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists services_category_idx on services (category);
create index if not exists services_slug_idx on services (slug);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  service_id uuid references services on delete cascade not null,
  scheduled_for timestamptz not null,
  location text,
  notes text,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_user_id_idx on bookings (user_id);
create index if not exists bookings_service_id_idx on bookings (service_id);
create index if not exists bookings_scheduled_for_idx on bookings (scheduled_for);

create trigger handle_services_updated_at
  before update on services
  for each row
  execute procedure moddatetime (updated_at);

create trigger handle_bookings_updated_at
  before update on bookings
  for each row
  execute procedure moddatetime (updated_at);

alter table profiles
  add column if not exists is_admin boolean default false;

