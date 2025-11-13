alter table services
  add column if not exists features text[] default '{}'::text[],
  add column if not exists rating numeric,
  add column if not exists reviews integer,
  add column if not exists image_url text;

update services
set
  rating = 4.9,
  reviews = 127,
  features = array['Custom mood board', 'Shopping list with links', 'Floor plan layout', 'Color palette guide'],
  image_url = '/services/single-room-design.jpg'
where slug = 'single-room-design';

update services
set
  rating = 5.0,
  reviews = 89,
  features = array['Furniture rental', 'Professional styling', 'Photography coordination', 'Quick turnaround'],
  image_url = '/services/home-staging.jpg'
where slug = 'home-staging';

update services
set
  rating = 4.8,
  reviews = 64,
  features = array['Theme consultation', 'Decor setup', 'On-site coordination', 'Breakdown service'],
  image_url = '/services/event-setup.jpg'
where slug = 'event-setup';

update services
set
  rating = 4.9,
  reviews = 201,
  features = array['Video consultation', 'Custom palette', 'Paint recommendations', 'Follow-up support'],
  image_url = '/services/color-consultation.jpg'
where slug = 'color-consultation';

update services
set
  rating = 4.8,
  reviews = 152,
  features = array['In-home walkthrough', 'Measurements and photos', 'Recommendations recap'],
  image_url = '/services/in-home-consultation.jpg'
where slug = 'in-home-consultation';

update services
set
  rating = 4.9,
  reviews = 74,
  features = array['Install day coordination', 'Vendor management', 'Final styling touches'],
  image_url = '/services/installation-oversight.jpg'
where slug = 'installation-oversight';

update services
set
  rating = 5.0,
  reviews = 58,
  features = array['Premium vendor sourcing', 'Quality assurance', 'Budget tracking'],
  image_url = '/services/white-glove-sourcing.jpg'
where slug = 'white-glove-sourcing';

