begin;

insert into public.site_settings (key, value, is_public)
values
  (
    'support_email',
    '{"email":"opensea3987@gmail.com","purpose":"Suggestions, support, app review follow-up"}'::jsonb,
    true
  ),
  (
    'auth_plan',
    '{"guest":true,"google_optional":true,"apple_optional":true,"notes":"Visitors can browse and send suggestions. Google and Apple sign-in are optional for favorites, saves, testing access, and team dashboards."}'::jsonb,
    true
  ),
  (
    'rom_policy',
    '{"public_downloads":false,"allowed_when":["owned_by_us","licensed","public_domain","user_provided"],"default_status":"needs_review"}'::jsonb,
    true
  )
on conflict (key) do update
set value = excluded.value,
    is_public = excluded.is_public,
    updated_at = now();

insert into public.apps (
  slug,
  name,
  short_name,
  category,
  tagline,
  summary,
  description,
  audience,
  logo_path,
  hero_image_path,
  website_path,
  privacy_path,
  is_featured,
  sort_order
)
values
  (
    'pixel-arcade-hub',
    'Pixel Arcade Hub',
    'Arcade Hub',
    'Arcade',
    'A clean web hub for arcade apps, store links, and legally reviewed playable files.',
    'Main arcade portal with app pages, screenshots, download links, and a future legal play area.',
    'Pixel Arcade Hub is the central arcade experience for Art Style Apps. It should present each game clearly, keep downloads organized, and only expose playable files after rights review.',
    'Players, app reviewers, and testers',
    null,
    '/images/1.png',
    '/',
    null,
    true,
    10
  ),
  (
    'arcadiax',
    'ArcadiaX',
    'ArcadiaX',
    'Arcade',
    'Retro-inspired arcade collection with clear store access.',
    'Android production app and iOS review candidate for arcade content.',
    'ArcadiaX groups arcade content, store downloads, and testing activation into one product page.',
    'Retro arcade players and mobile testers',
    null,
    '/images/2.png',
    '/apps/arcadiax',
    null,
    true,
    20
  ),
  (
    'arcadiaxx',
    'ArcadiaXX',
    'ArcadiaXX',
    'Arcade',
    'iOS arcade review build with controller-led branding.',
    'iOS App Store review candidate for the arcade catalog.',
    'ArcadiaXX should get its own page with screenshots, app review status, support links, and download path once approved.',
    'iOS arcade players',
    null,
    '/images/3.png',
    '/apps/arcadiaxx',
    null,
    false,
    30
  ),
  (
    'nanny-abu-dhabi',
    'Nanny Abu Dhabi',
    'Nanny Finder',
    'Social',
    'Find trusted nannies and caregivers in Abu Dhabi.',
    'Caregiver discovery app with iOS submission and Android closed testing.',
    'Nanny Abu Dhabi needs a trustworthy white-background product page with safety copy, app screenshots, support, and store links.',
    'Families and caregivers in Abu Dhabi',
    '/logo/nanny_logo.png',
    '/nanny_1.png',
    '/apps/nanny-abu-dhabi',
    null,
    true,
    40
  ),
  (
    'polarvault-x',
    'PolarVault X',
    'PolarVault',
    'Utilities',
    'Secure and private digital vault for files and data.',
    'iOS app ready for distribution with privacy-first positioning.',
    'PolarVault X should focus on trust, privacy, and simple download steps.',
    'Users who need private file storage',
    '/images/polar_logo.png',
    '/images/polar_1.png',
    '/apps/polarvault-x',
    null,
    true,
    50
  ),
  (
    'reemverse',
    'ReemVerse',
    'ReemVerse',
    'Social',
    'Community app for connecting, sharing, and exploring.',
    'iOS app preparing for submission.',
    'ReemVerse needs final branding, screenshots, page content, and App Store readiness review.',
    'Community users',
    null,
    null,
    '/apps/reemverse',
    null,
    false,
    60
  ),
  (
    'snake-modern-game',
    'Snake Modern Game',
    'Snake Modern',
    'Arcade',
    'Classic snake reimagined with modern graphics and gameplay.',
    'Production Android app and iOS ready-for-distribution game.',
    'Snake Modern Game should include gameplay explanation, controls, screenshots, download links, and support.',
    'Casual arcade players',
    '/images/snake_logo.png',
    '/images/snake_1.png',
    '/apps/snake-modern-game',
    null,
    true,
    70
  ),
  (
    'cube-stack-heroes',
    'CUBE STACK HEROES',
    'Cube Stack',
    'Arcade',
    'Stack cubes, build towers, and chase a clean high score loop.',
    'iOS ready-for-distribution arcade game.',
    'Cube Stack Heroes needs a punchy game page with screenshots, gameplay steps, and store links.',
    'Puzzle and arcade players',
    '/images/cube_logo.png',
    '/images/cube_1.png',
    '/apps/cube-stack-heroes',
    null,
    true,
    80
  ),
  (
    'bricknova',
    'bricknova',
    'Bricknova',
    'Classic',
    'Timeless brick-breaking action with explosive power-ups.',
    'Production Android app and iOS ready-for-distribution game.',
    'Bricknova should present gameplay, screenshots, app store links, and a clean support path.',
    'Brick breaker fans',
    '/images/brick_logo.png',
    '/images/brick_1.png',
    '/apps/bricknova',
    null,
    true,
    90
  ),
  (
    'run-with-us',
    'Run With Us',
    'Run With Us',
    'Social',
    'Social running app to track and compete with friends.',
    'iOS ready-for-distribution app and Android closed testing app.',
    'Run With Us needs a page that feels active but still professional, with app screenshots, privacy copy, and testing links.',
    'Runners and friend groups',
    '/images/run_logo.png',
    '/images/run_1.png',
    '/apps/run-with-us',
    null,
    true,
    100
  ),
  (
    'comics-hero',
    'Comics Hero',
    'Comics Hero',
    'Arcade',
    'Comic-style arcade battles and hero energy.',
    'Existing Flutter build references this app but the expected image assets are missing from the current export.',
    'Comics Hero needs missing assets restored before the page can be production-ready.',
    'Arcade action players',
    null,
    null,
    '/apps/comics-hero',
    '/privacy/comics-hero',
    false,
    110
  )
on conflict (slug) do update
set name = excluded.name,
    short_name = excluded.short_name,
    category = excluded.category,
    tagline = excluded.tagline,
    summary = excluded.summary,
    description = excluded.description,
    audience = excluded.audience,
    logo_path = excluded.logo_path,
    hero_image_path = excluded.hero_image_path,
    website_path = excluded.website_path,
    privacy_path = excluded.privacy_path,
    is_featured = excluded.is_featured,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.app_releases (
  app_id,
  platform,
  store_display_name,
  package_identifier,
  bundle_identifier,
  version,
  release_status,
  install_audience,
  last_updated_on,
  notes
)
select a.id, r.platform, r.store_display_name, r.package_identifier, r.bundle_identifier, r.version,
       r.release_status, r.install_audience, r.last_updated_on, r.notes
from (
  values
    ('arcadiax', 'android'::public.app_platform, 'ArcadiaX', 'com.comixzone.game', null, null, 'production'::public.release_status, 51, date '2026-05-10', 'Google Play Console production app.'),
    ('arcadiax', 'ios'::public.app_platform, 'ARCADIAX2', null, null, '1.0', 'waiting_for_review'::public.release_status, 0, null, 'App Store Connect waiting for review.'),
    ('arcadiaxx', 'ios'::public.app_platform, 'ArcadiaXX', null, null, '1.0.20', 'waiting_for_review'::public.release_status, 0, null, 'App Store Connect waiting for review.'),
    ('pixel-arcade-hub', 'android'::public.app_platform, 'Pixel Arcade Hub', 'com.pixelhub.arcade', null, null, 'production'::public.release_status, 362, date '2026-05-10', 'Google Play Console production app.'),
    ('nanny-abu-dhabi', 'android'::public.app_platform, 'NANNY FINDER', 'com.nannyfinder', null, null, 'closed_testing'::public.release_status, 2, date '2026-04-30', 'Google Play Console closed testing.'),
    ('nanny-abu-dhabi', 'ios'::public.app_platform, 'Nanny Abu Dhabi', null, null, '1.0.2', 'prepare_for_submission'::public.release_status, 0, null, 'App Store Connect prepare for submission.'),
    ('nanny-abu-dhabi', 'ios'::public.app_platform, 'Find nannies in Abu Dhabi', null, null, '1.0', 'prepare_for_submission'::public.release_status, 0, null, 'Likely alternate App Store listing from screenshot; verify before production copy.'),
    ('polarvault-x', 'ios'::public.app_platform, 'PolarVault X', null, null, '1.0', 'ready_for_distribution'::public.release_status, 0, null, 'App Store Connect ready for distribution.'),
    ('reemverse', 'ios'::public.app_platform, 'ReemVerse', null, null, '1.0', 'prepare_for_submission'::public.release_status, 0, null, 'App Store Connect prepare for submission.'),
    ('snake-modern-game', 'android'::public.app_platform, 'Snake Modern', 'com.artstyle.snake', null, null, 'production'::public.release_status, 3, date '2026-04-23', 'Google Play Console production app.'),
    ('snake-modern-game', 'ios'::public.app_platform, 'Snake Modern Game', null, null, '1.0.1 (7)', 'ready_for_distribution'::public.release_status, 0, null, 'App Store Connect ready for distribution.'),
    ('cube-stack-heroes', 'ios'::public.app_platform, 'CUBE STACK HEROES', null, null, '1.0', 'ready_for_distribution'::public.release_status, 0, null, 'App Store Connect ready for distribution.'),
    ('bricknova', 'android'::public.app_platform, 'Bricknova', 'com.bricknova.game', null, null, 'production'::public.release_status, 1, date '2026-04-27', 'Google Play Console production app.'),
    ('bricknova', 'ios'::public.app_platform, 'bricknova', null, null, '1.0.1', 'ready_for_distribution'::public.release_status, 0, null, 'App Store Connect ready for distribution.'),
    ('run-with-us', 'android'::public.app_platform, 'Run With Us', 'com.runwithus.app', null, null, 'closed_testing'::public.release_status, 1, date '2026-04-19', 'Google Play Console closed testing.'),
    ('run-with-us', 'ios'::public.app_platform, 'Run With Us - Social Running', null, null, '1.0.1', 'ready_for_distribution'::public.release_status, 0, null, 'App Store Connect ready for distribution.')
) as r(app_slug, platform, store_display_name, package_identifier, bundle_identifier, version, release_status, install_audience, last_updated_on, notes)
join public.apps a on a.slug = r.app_slug
on conflict do nothing;

insert into public.app_media (app_id, kind, path, alt_text, width, height, sort_order)
select a.id, m.kind, m.path, m.alt_text, m.width, m.height, m.sort_order
from (
  values
    ('nanny-abu-dhabi', 'logo'::public.media_kind, '/logo/nanny_logo.png', 'Nanny Abu Dhabi logo', 512, 512, 10),
    ('nanny-abu-dhabi', 'screenshot'::public.media_kind, '/nanny_1.png', 'Nanny Abu Dhabi screen one', null, null, 20),
    ('nanny-abu-dhabi', 'screenshot'::public.media_kind, '/images/nanny_2.png', 'Nanny Abu Dhabi screen two', 1080, 1920, 30),
    ('polarvault-x', 'logo'::public.media_kind, '/images/polar_logo.png', 'PolarVault X logo', 512, 512, 10),
    ('polarvault-x', 'screenshot'::public.media_kind, '/images/polar_1.png', 'PolarVault X screen one', 1920, 1080, 20),
    ('polarvault-x', 'screenshot'::public.media_kind, '/images/polar_2.png', 'PolarVault X screen two', 1920, 1080, 30),
    ('snake-modern-game', 'logo'::public.media_kind, '/images/snake_logo.png', 'Snake Modern logo', 512, 512, 10),
    ('snake-modern-game', 'screenshot'::public.media_kind, '/images/snake_1.png', 'Snake Modern gameplay one', 1080, 1920, 20),
    ('snake-modern-game', 'screenshot'::public.media_kind, '/images/snake_2.png', 'Snake Modern gameplay two', 1080, 1920, 30),
    ('cube-stack-heroes', 'logo'::public.media_kind, '/images/cube_logo.png', 'Cube Stack Heroes logo', 512, 512, 10),
    ('cube-stack-heroes', 'screenshot'::public.media_kind, '/images/cube_1.png', 'Cube Stack Heroes screen one', 1080, 1920, 20),
    ('cube-stack-heroes', 'screenshot'::public.media_kind, '/images/cube_2.png', 'Cube Stack Heroes screen two', 1080, 1920, 30),
    ('bricknova', 'logo'::public.media_kind, '/images/brick_logo.png', 'Bricknova logo', 512, 512, 10),
    ('bricknova', 'screenshot'::public.media_kind, '/images/brick_1.png', 'Bricknova gameplay one', 1080, 1920, 20),
    ('bricknova', 'screenshot'::public.media_kind, '/images/brick_2.png', 'Bricknova gameplay two', 1080, 1920, 30),
    ('run-with-us', 'logo'::public.media_kind, '/images/run_logo.png', 'Run With Us logo', 512, 512, 10),
    ('run-with-us', 'screenshot'::public.media_kind, '/images/run_1.png', 'Run With Us screen one', 1080, 1920, 20),
    ('run-with-us', 'screenshot'::public.media_kind, '/images/run_2.png', 'Run With Us screen two', 1080, 1920, 30)
) as m(app_slug, kind, path, alt_text, width, height, sort_order)
join public.apps a on a.slug = m.app_slug;

insert into public.app_page_sections (app_id, section_key, title, body, sort_order)
select a.id, s.section_key, s.title, s.body, s.sort_order
from public.apps a
cross join (
  values
    ('overview', 'Overview', 'A focused product page with a white background, clear screenshots, store status, and one support path.', 10),
    ('how-to-use', 'How to use', 'Open the app, follow the first-screen setup, then use the download or testing link shown for your platform.', 20),
    ('downloads', 'Downloads', 'Store links should be managed from app_download_links. Direct downloads stay disabled unless the file is owned, licensed, or public-domain.', 30),
    ('suggestions', 'Suggestions', 'Visitors can send ideas and support notes. Messages route to opensea3987@gmail.com and can be triaged by the team.', 40)
) as s(section_key, title, body, sort_order)
on conflict (app_id, section_key) do update
set title = excluded.title,
    body = excluded.body,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.project_members (display_name, role, title, email, bio, public_profile, is_placeholder, sort_order)
values
  ('Faisal', 'owner'::public.user_role, 'Product Owner', 'opensea3987@gmail.com', 'Owns Art Style Apps product direction, store publishing, and final approvals.', true, false, 10),
  ('Designer TBD', 'designer'::public.user_role, 'Lead Product Designer', null, 'Responsible for white-background UI, screenshots, Figma flows, app pages, and store visuals.', true, true, 20),
  ('Flutter Engineer TBD', 'developer'::public.user_role, 'Flutter Engineer', null, 'Connects Supabase Auth, app catalog pages, and guest flow into the Flutter source project.', true, true, 30),
  ('Backend Engineer TBD', 'developer'::public.user_role, 'Supabase Engineer', null, 'Owns database migrations, RLS policies, storage, email routing, and deployment readiness.', true, true, 40),
  ('QA and Store Ops TBD', 'support'::public.user_role, 'QA / Store Operations', null, 'Checks App Store Connect, Google Play Console, screenshots, privacy text, and release readiness.', true, true, 50)
on conflict do nothing;

insert into public.workstreams (key, name, description, status, target_date, sort_order)
values
  ('product-foundation', 'Product foundation', 'Turn the current build into a structured Art Style Apps product catalog.', 'in_progress'::public.task_status, date '2026-05-18', 10),
  ('design-system', 'Design and content', 'White-background design direction, app pages, screenshots, and copy polish.', 'todo'::public.task_status, date '2026-05-21', 20),
  ('supabase-backend', 'Supabase backend', 'Auth, catalog, team, suggestions, visitor sessions, storage, and RLS.', 'in_progress'::public.task_status, date '2026-05-17', 30),
  ('auth-and-guests', 'Auth and guests', 'Guest browsing first, optional Google and Apple sign-in for saves and team features.', 'todo'::public.task_status, date '2026-05-24', 40),
  ('legal-arcade', 'Arcade legal review', 'Audit ROM binaries and expose only legal public-domain, licensed, owned, or user-provided files.', 'blocked'::public.task_status, date '2026-05-28', 50),
  ('deployment', 'Deployment', 'GitHub cleanup, Vercel setup, Supabase env vars, preview, and production checks.', 'todo'::public.task_status, date '2026-05-25', 60)
on conflict (key) do update
set name = excluded.name,
    description = excluded.description,
    status = excluded.status,
    target_date = excluded.target_date,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.tasks (workstream_id, title, description, status, priority, due_date)
select w.id, t.title, t.description, t.status, t.priority, t.due_date
from (
  values
    ('product-foundation', 'Confirm canonical app list', 'Verify duplicate naming across ArcadiaX, ArcadiaXX, ARCADIAX2, Pixel Arcade Hub, Nanny Abu Dhabi, and Nanny Finder.', 'todo'::public.task_status, 'high'::public.task_priority, date '2026-05-14'),
    ('design-system', 'Create white-background app detail template', 'Hero, screenshots, overview, how-to-use, downloads, suggestions, privacy, and support sections.', 'todo'::public.task_status, 'high'::public.task_priority, date '2026-05-18'),
    ('supabase-backend', 'Apply initial migration', 'Run migrations against a new Supabase project and confirm RLS with anon/authenticated/service_role clients.', 'todo'::public.task_status, 'critical'::public.task_priority, date '2026-05-13'),
    ('auth-and-guests', 'Configure Google and Apple providers', 'Enable providers in Supabase Auth dashboard and add redirect URLs for localhost, Vercel preview, and production.', 'todo'::public.task_status, 'high'::public.task_priority, date '2026-05-20'),
    ('legal-arcade', 'Remove or quarantine commercial ROM binaries before production deploy', 'Current roms/*.md files are binary Sega Genesis ROM images and must not be public downloads without rights.', 'blocked'::public.task_status, 'critical'::public.task_priority, date '2026-05-14'),
    ('deployment', 'Connect Vercel project', 'Import GitHub repository, set Supabase environment variables, and verify SPA rewrites plus ROM redirect.', 'todo'::public.task_status, 'high'::public.task_priority, date '2026-05-22')
) as t(workstream_key, title, description, status, priority, due_date)
join public.workstreams w on w.key = t.workstream_key;

insert into public.services (slug, name, category, description, priority, status, monthly_cost_estimate, sort_order)
values
  ('supabase-auth-db-storage', 'Supabase Auth, Database, and Storage', 'Backend', 'Main backend for app catalog, users, suggestions, team tasks, and protected file storage.', 'critical'::public.task_priority, 'in_progress'::public.task_status, 25, 10),
  ('vercel-hosting', 'Vercel Web Hosting', 'Deployment', 'Static Flutter web hosting with SPA rewrites, preview deployments, environment variables, and production domain.', 'high'::public.task_priority, 'todo'::public.task_status, 20, 20),
  ('email-routing', 'Suggestion Email Routing', 'Operations', 'Send new suggestions and support messages to opensea3987@gmail.com through a Supabase Edge Function or email provider.', 'high'::public.task_priority, 'todo'::public.task_status, 10, 30),
  ('analytics', 'Privacy-friendly Analytics', 'Growth', 'Track app page visits, download clicks, and guest play starts without collecting unnecessary personal data.', 'medium'::public.task_priority, 'todo'::public.task_status, 0, 40),
  ('store-ops', 'App Store and Play Console Operations', 'Release', 'Track app review status, screenshots, privacy policy links, testing groups, and release notes.', 'high'::public.task_priority, 'todo'::public.task_status, 0, 50),
  ('legal-rom-review', 'ROM Rights Review', 'Compliance', 'Classify playable files as owned, licensed, public-domain, user-provided, or blocked before any public access.', 'critical'::public.task_priority, 'blocked'::public.task_status, 0, 60)
on conflict (slug) do update
set name = excluded.name,
    category = excluded.category,
    description = excluded.description,
    priority = excluded.priority,
    status = excluded.status,
    monthly_cost_estimate = excluded.monthly_cost_estimate,
    sort_order = excluded.sort_order,
    updated_at = now();

commit;
