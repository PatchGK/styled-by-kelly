create extension if not exists moddatetime;

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  first_name text,
  last_name text,
  phone text,
  location text,
  membership_plan text default 'Starter',
  plan_price text,
  next_billing_date text,
  payment_last4 text,
  member_since_months text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger handle_profiles_updated_at
  before update on profiles
  for each row
  execute procedure moddatetime (updated_at);

