with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
)
insert into projects (user_id, name, slug, description, status, progress, designer_name, thumbnail_url)
select
  user_id,
  'Living Room Refresh',
  'living-room-refresh',
  'Brighten up the main living space with layered neutrals and natural texture.',
  'in_progress',
  45,
  'Kelly Martin',
  '/images/projects/living-room-refresh.jpg'
from base_user
where not exists (
  select 1 from projects where slug = 'living-room-refresh'
);

with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
),
base_project as (
  select id as project_id
  from projects
  where slug = 'living-room-refresh'
  limit 1
)
insert into design_boards (user_id, project_id, title, description, visibility, cover_image_url)
select
  bu.user_id,
  bp.project_id,
  'Modern Organic Living',
  'Layered neutrals, natural woods, and sculptural lighting for a cozy living room.',
  'private',
  '/images/boards/modern-organic.jpg'
from base_user bu
join base_project bp on true
where not exists (
  select 1 from design_boards where title = 'Modern Organic Living'
);

with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
),
base_board as (
  select id as board_id
  from design_boards
  where title = 'Modern Organic Living'
  limit 1
)
insert into board_items (board_id, user_id, kind, content, source_url, preview_image_url, sort_order)
select
  bb.board_id,
  bu.user_id,
  'product',
  jsonb_build_object(
    'name', 'Bouclé Lounge Chair',
    'price', '$540',
    'retailer', 'StyledByKelly Market'
  ),
  'https://styledbykelly.com/marketplace/boule-chair',
  '/images/boards/items/boule-chair.jpg',
  1
from base_board bb
join base_user bu on true
where not exists (
  select 1 from board_items where preview_image_url = '/images/boards/items/boule-chair.jpg'
);

with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
),
base_project as (
  select id as project_id
  from projects
  where slug = 'living-room-refresh'
  limit 1
)
insert into ai_outputs (user_id, project_id, tool, input_payload, output_payload, summary)
select
  bu.user_id,
  bp.project_id,
  'color_matcher',
  jsonb_build_object('source', 'uploaded_photo.jpg'),
  jsonb_build_object(
    'palette', array[
      jsonb_build_object('name', 'Warm Linen', 'hex', '#F4E8D7'),
      jsonb_build_object('name', 'Olive Leaf', 'hex', '#7C8A60'),
      jsonb_build_object('name', 'Clay Pot', 'hex', '#B96850')
    ]
  ),
  'Earthy palette balancing warm neutrals with grounded greens.'
from base_user bu
join base_project bp on true
where not exists (
  select 1 from ai_outputs where summary = 'Earthy palette balancing warm neutrals with grounded greens.'
);

with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
),
base_project as (
  select id as project_id
  from projects
  where slug = 'living-room-refresh'
  limit 1
)
insert into project_tasks (project_id, user_id, title, description, status, sort_order, due_date)
select
  bp.project_id,
  bu.user_id,
  'Finalize layout options',
  'Review the two layout variations and confirm the preferred furniture plan.',
  'in_progress',
  1,
  current_date + interval '5 days'
from base_project bp
join base_user bu on true
where not exists (
  select 1 from project_tasks where project_id = bp.project_id and title = 'Finalize layout options'
);

with base_user as (
  select id as user_id
  from profiles
  order by created_at
  limit 1
),
base_project as (
  select id as project_id
  from projects
  where slug = 'living-room-refresh'
  limit 1
)
insert into notifications (user_id, project_id, event_type, payload)
select
  bu.user_id,
  bp.project_id,
  'project.update',
  jsonb_build_object(
    'title', 'Design board refreshed',
    'body', 'Kelly added three new product picks to Modern Organic Living.'
  )
from base_user bu
join base_project bp on true
where not exists (
  select 1 from notifications where event_type = 'project.update' and project_id = bp.project_id
);

