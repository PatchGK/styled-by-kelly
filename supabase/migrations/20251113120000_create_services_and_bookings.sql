create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text,
  price_display text not null,
  base_price numeric,
  currency text default 'usd',
  description text,
  fulfillment_type text default 'virtual', -- virtual | in_person | hybrid
  duration_minutes integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists services_category_idx on services (category);
create index if not exists services_slug_idx on services (slug);

create trigger handle_services_updated_at
  before update on services
  for each row
  execute procedure moddatetime (updated_at);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  service_id uuid references services on delete cascade not null,
  status text default 'pending', -- pending | confirmed | cancelled
  preferred_date date,
  preferred_start_time time,
  preferred_end_time time,
  timezone text,
  location text,
  notes text,
  price_at_booking numeric,
  currency text default 'usd',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_user_id_idx on bookings (user_id);
create index if not exists bookings_service_id_idx on bookings (service_id);
create index if not exists bookings_status_idx on bookings (status);

create trigger handle_bookings_updated_at
  before update on bookings
  for each row
  execute procedure moddatetime (updated_at);

create table if not exists service_availability (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services on delete cascade not null,
  day_of_week integer not null, -- 0-6
  start_time time not null,
  end_time time not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists service_availability_service_idx on service_availability (service_id);

create trigger handle_service_availability_updated_at
  before update on service_availability
  for each row
  execute procedure moddatetime (updated_at);

