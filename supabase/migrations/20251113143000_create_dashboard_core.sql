-- Dashboard core tables to support boards, AI outputs, notifications, and project tasks

create type if not exists project_status as enum ('draft', 'in_progress', 'review', 'complete', 'archived');
create type if not exists board_visibility as enum ('private', 'shared');
create type if not exists ai_tool as enum ('style_quiz', 'photo_analysis', 'color_matcher', 'room_generator');
create type if not exists task_status as enum ('backlog', 'in_progress', 'in_review', 'done');

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  slug text unique,
  description text,
  status project_status default 'draft',
  progress integer default 0 check (progress between 0 and 100),
  designer_name text,
  thumbnail_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists projects_user_id_idx on projects (user_id);
create index if not exists projects_status_idx on projects (status);

create trigger handle_projects_updated_at
  before update on projects
  for each row
  execute procedure moddatetime (updated_at);

create table if not exists design_boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  project_id uuid references projects on delete cascade,
  title text not null,
  description text,
  cover_image_url text,
  visibility board_visibility default 'private',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists design_boards_user_idx on design_boards (user_id);
create index if not exists design_boards_project_idx on design_boards (project_id);

create trigger handle_design_boards_updated_at
  before update on design_boards
  for each row
  execute procedure moddatetime (updated_at);

create table if not exists board_items (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references design_boards on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  ai_output_id uuid,
  kind text not null default 'image', -- image | product | note | ai_output
  content jsonb default '{}'::jsonb,
  source_url text,
  preview_image_url text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists board_items_board_idx on board_items (board_id);
create index if not exists board_items_user_idx on board_items (user_id);

create trigger handle_board_items_updated_at
  before update on board_items
  for each row
  execute procedure moddatetime (updated_at);

create table if not exists ai_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  project_id uuid references projects on delete cascade,
  board_id uuid references design_boards on delete set null,
  tool ai_tool not null,
  input_payload jsonb default '{}'::jsonb,
  output_payload jsonb default '{}'::jsonb,
  summary text,
  created_at timestamptz default now()
);

create index if not exists ai_outputs_user_idx on ai_outputs (user_id);
create index if not exists ai_outputs_project_idx on ai_outputs (project_id);
create index if not exists ai_outputs_board_idx on ai_outputs (board_id);

alter table board_items
  add constraint board_items_ai_output_id_fkey
  foreign key (ai_output_id) references ai_outputs on delete set null;

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  project_id uuid references projects on delete cascade,
  event_type text not null,
  payload jsonb default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists notifications_user_idx on notifications (user_id);
create index if not exists notifications_project_idx on notifications (project_id);
create index if not exists notifications_read_idx on notifications (read_at);

create table if not exists project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  status task_status default 'backlog',
  sort_order integer default 0,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists project_tasks_project_idx on project_tasks (project_id);
create index if not exists project_tasks_user_idx on project_tasks (user_id);
create index if not exists project_tasks_status_idx on project_tasks (status);

create trigger handle_project_tasks_updated_at
  before update on project_tasks
  for each row
  execute procedure moddatetime (updated_at);

alter table design_boards enable row level security;
alter table board_items enable row level security;
alter table ai_outputs enable row level security;
alter table notifications enable row level security;
alter table project_tasks enable row level security;
alter table projects enable row level security;

create policy "Projects are viewable by owner" on projects
  for select using (auth.uid() = user_id);

create policy "Projects can be inserted by owner" on projects
  for insert with check (auth.uid() = user_id);

create policy "Projects can be updated by owner" on projects
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Projects can be deleted by owner" on projects
  for delete using (auth.uid() = user_id);

create policy "Design boards are viewable by owner" on design_boards
  for select using (auth.uid() = user_id);

create policy "Design boards can be inserted by owner" on design_boards
  for insert with check (auth.uid() = user_id);

create policy "Design boards can be updated by owner" on design_boards
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Design boards can be deleted by owner" on design_boards
  for delete using (auth.uid() = user_id);

create policy "Board items are accessible by owner" on board_items
  for select using (auth.uid() = user_id);

create policy "Board items can be inserted by owner" on board_items
  for insert with check (auth.uid() = user_id);

create policy "Board items can be updated by owner" on board_items
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Board items can be deleted by owner" on board_items
  for delete using (auth.uid() = user_id);

create policy "AI outputs are accessible by owner" on ai_outputs
  for select using (auth.uid() = user_id);

create policy "AI outputs can be inserted by owner" on ai_outputs
  for insert with check (auth.uid() = user_id);

create policy "AI outputs can be updated by owner" on ai_outputs
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "AI outputs can be deleted by owner" on ai_outputs
  for delete using (auth.uid() = user_id);

create policy "Notifications are accessible by owner" on notifications
  for select using (auth.uid() = user_id);

create policy "Notifications can be inserted by system or owner" on notifications
  for insert with check (auth.uid() = user_id or auth.role() = 'service_role');

create policy "Notifications can be updated by owner" on notifications
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Notifications can be deleted by owner" on notifications
  for delete using (auth.uid() = user_id);

create policy "Project tasks are accessible by owner" on project_tasks
  for select using (auth.uid() = user_id);

create policy "Project tasks can be inserted by owner" on project_tasks
  for insert with check (auth.uid() = user_id);

create policy "Project tasks can be updated by owner" on project_tasks
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Project tasks can be deleted by owner" on project_tasks
  for delete using (auth.uid() = user_id);

