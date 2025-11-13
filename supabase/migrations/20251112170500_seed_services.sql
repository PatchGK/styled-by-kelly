insert into services (id, name, slug, category, description, price, duration, price_id, is_in_person)
values
  (
    gen_random_uuid(),
    'Single Room Design',
    'single-room-design',
    'design',
    'Full room design with custom layout, concept board, and curated shopping list.',
    '$650',
    '2-3 weeks',
    '{{NEXT_PUBLIC_STRIPE_PRICE_SINGLE_ROOM_DESIGN}}',
    false
  ),
  (
    gen_random_uuid(),
    'Home Staging',
    'home-staging',
    'staging',
    'Whole-home staging for listings up to ~2,000 sq ft, styled to sell quickly.',
    '$6,000',
    '3-5 days',
    '{{NEXT_PUBLIC_STRIPE_PRICE_HOME_STAGING}}',
    true
  ),
  (
    gen_random_uuid(),
    'Event Setup',
    'event-setup',
    'events',
    'Décor, layout, and on-site styling to host gatherings without the stress.',
    '$2,400',
    '1-2 days',
    '{{NEXT_PUBLIC_STRIPE_PRICE_EVENT_SETUP}}',
    true
  ),
  (
    gen_random_uuid(),
    'Color Consultation',
    'color-consultation',
    'consultation',
    'Virtual or in-person palette planning with follow-up swatches and notes.',
    '$250',
    '60 minutes',
    '{{NEXT_PUBLIC_STRIPE_PRICE_COLOR_CONSULTATION}}',
    true
  ),
  (
    gen_random_uuid(),
    'In-Home Consultation',
    'in-home-consultation',
    'consultation',
    'Hands-on walkthrough credited toward your project when you move forward.',
    '$200 / hour',
    'Hourly',
    '{{NEXT_PUBLIC_STRIPE_PRICE_IN_HOME_CONSULTATION}}',
    true
  ),
  (
    gen_random_uuid(),
    'Installation Oversight',
    'installation-oversight',
    'implementation',
    'Project management during deliveries and setup to get every detail right.',
    '$1,500',
    '1-2 days',
    '{{NEXT_PUBLIC_STRIPE_PRICE_INSTALLATION_OVERSIGHT}}',
    true
  ),
  (
    gen_random_uuid(),
    'White-Glove Sourcing',
    'white-glove-sourcing',
    'sourcing',
    'Premium vendor search and quality-checked sourcing for elevated pieces.',
    '$3,000',
    '2-4 weeks',
    '{{NEXT_PUBLIC_STRIPE_PRICE_WHITE_GLOVE_SOURCING}}',
    false
  )
on conflict (slug) do update
set
  description = excluded.description,
  price = excluded.price,
  duration = excluded.duration,
  price_id = excluded.price_id,
  is_in_person = excluded.is_in_person,
  updated_at = now();

