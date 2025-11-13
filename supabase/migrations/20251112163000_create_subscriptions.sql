create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  price_id text,
  status text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists subscriptions_user_id_idx on subscriptions (user_id);
create index if not exists subscriptions_stripe_subscription_id_idx on subscriptions (stripe_subscription_id);

create trigger handle_subscriptions_updated_at
  before update on subscriptions
  for each row
  execute procedure moddatetime (updated_at);

alter table profiles
  add column if not exists stripe_customer_id text,
  add column if not exists subscription_status text,
  add column if not exists subscription_price_id text,
  add column if not exists current_period_end timestamptz,
  add column if not exists is_admin boolean default false not null;

