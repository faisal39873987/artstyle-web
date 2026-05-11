begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.user_role as enum (
  'owner',
  'admin',
  'designer',
  'developer',
  'support',
  'viewer'
);

create type public.app_platform as enum (
  'ios',
  'android',
  'web',
  'macos',
  'windows'
);

create type public.release_status as enum (
  'concept',
  'development',
  'closed_testing',
  'prepare_for_submission',
  'waiting_for_review',
  'ready_for_distribution',
  'production',
  'archived'
);

create type public.task_status as enum (
  'backlog',
  'todo',
  'in_progress',
  'review',
  'blocked',
  'done',
  'cancelled'
);

create type public.task_priority as enum (
  'low',
  'medium',
  'high',
  'critical'
);

create type public.media_kind as enum (
  'icon',
  'logo',
  'screenshot',
  'cover',
  'hero',
  'video',
  'rom_cover'
);

create type public.download_kind as enum (
  'app_store',
  'play_store',
  'testflight',
  'direct',
  'web',
  'support'
);

create type public.suggestion_status as enum (
  'new',
  'triaged',
  'planned',
  'in_progress',
  'done',
  'rejected',
  'spam'
);

create type public.rom_legal_status as enum (
  'unknown',
  'needs_review',
  'owned_by_us',
  'licensed',
  'public_domain',
  'user_provided'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext unique,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'viewer',
  onboarding_completed boolean not null default false,
  allow_marketing_email boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.role from public.profiles p where p.id = auth.uid()),
    'viewer'::public.user_role
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('owner'::public.user_role, 'admin'::public.user_role);
$$;

create or replace function public.is_team_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in (
    'owner'::public.user_role,
    'admin'::public.user_role,
    'designer'::public.user_role,
    'developer'::public.user_role,
    'support'::public.user_role
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name),
        avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
        updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() = old.id
    and not public.is_admin()
    and new.role is distinct from old.role then
    raise exception 'profile owners cannot change their own role';
  end if;

  return new;
end;
$$;

create table public.apps (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  short_name text,
  category text not null default 'Apps',
  tagline text,
  summary text,
  description text,
  audience text,
  logo_path text,
  hero_image_path text,
  website_path text,
  privacy_path text,
  support_email citext not null default 'opensea3987@gmail.com',
  is_public boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 100,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.app_releases (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  platform public.app_platform not null,
  store_display_name text,
  package_identifier text,
  bundle_identifier text,
  version text,
  release_status public.release_status not null default 'development',
  install_audience integer not null default 0 check (install_audience >= 0),
  store_url text,
  testing_url text,
  last_updated_on date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index app_releases_unique_store_ref
  on public.app_releases (
    app_id,
    platform,
    coalesce(store_display_name, ''),
    coalesce(package_identifier, ''),
    coalesce(bundle_identifier, '')
  );

create table public.app_media (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  kind public.media_kind not null,
  path text not null,
  alt_text text,
  caption text,
  width integer,
  height integer,
  sort_order integer not null default 100,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.app_download_links (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  platform public.app_platform,
  kind public.download_kind not null,
  label text not null,
  url text not null,
  region text,
  is_primary boolean not null default false,
  is_active boolean not null default true,
  requires_auth boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.app_page_sections (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  section_key text not null,
  title text not null,
  body text not null,
  sort_order integer not null default 100,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (app_id, section_key)
);

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  role public.user_role not null,
  title text not null,
  email citext,
  avatar_url text,
  bio text,
  public_profile boolean not null default true,
  is_placeholder boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workstreams (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  owner_member_id uuid references public.project_members(id) on delete set null,
  status public.task_status not null default 'todo',
  target_date date,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  workstream_id uuid references public.workstreams(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  status public.task_status not null default 'todo',
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workstream_id uuid references public.workstreams(id) on delete set null,
  milestone_id uuid references public.milestones(id) on delete set null,
  app_id uuid references public.apps(id) on delete set null,
  assignee_member_id uuid references public.project_members(id) on delete set null,
  title text not null,
  description text,
  status public.task_status not null default 'todo',
  priority public.task_priority not null default 'medium',
  due_date date,
  estimate_hours numeric(8, 2),
  external_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.design_reviews (
  id uuid primary key default gen_random_uuid(),
  app_id uuid references public.apps(id) on delete cascade,
  designer_member_id uuid references public.project_members(id) on delete set null,
  status public.task_status not null default 'todo',
  figma_url text,
  notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rom_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  system text not null default 'sega_genesis',
  original_file_name text,
  local_repo_path text,
  storage_path text,
  cover_path text,
  file_sha256 text unique,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  description text,
  legal_status public.rom_legal_status not null default 'needs_review',
  rights_notes text,
  emulator_core text,
  is_public boolean not null default false,
  is_playable boolean not null default false,
  allow_download boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_key uuid not null default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  landing_path text,
  referrer text,
  user_agent_hash text,
  metadata jsonb not null default '{}'::jsonb
);

create table public.play_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  visitor_session_id uuid references public.visitor_sessions(id) on delete set null,
  app_id uuid references public.apps(id) on delete set null,
  rom_id uuid references public.rom_catalog(id) on delete set null,
  status public.task_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  play_seconds integer not null default 0 check (play_seconds >= 0),
  save_state_path text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.suggestions (
  id uuid primary key default gen_random_uuid(),
  app_id uuid references public.apps(id) on delete set null,
  submitted_by uuid references auth.users(id) on delete set null,
  visitor_session_id uuid references public.visitor_sessions(id) on delete set null,
  name text,
  email citext,
  kind text not null default 'feature',
  subject text,
  message text not null,
  status public.suggestion_status not null default 'new',
  source_url text,
  email_to citext not null default 'opensea3987@gmail.com',
  assigned_member_id uuid references public.project_members(id) on delete set null,
  internal_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  name text,
  source text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  category text not null,
  description text,
  priority public.task_priority not null default 'medium',
  status public.task_status not null default 'todo',
  monthly_cost_estimate numeric(10, 2),
  is_public boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger protect_profile_role before update on public.profiles
  for each row execute function public.protect_profile_role();
create trigger set_apps_updated_at before update on public.apps
  for each row execute function public.set_updated_at();
create trigger set_app_releases_updated_at before update on public.app_releases
  for each row execute function public.set_updated_at();
create trigger set_app_download_links_updated_at before update on public.app_download_links
  for each row execute function public.set_updated_at();
create trigger set_app_page_sections_updated_at before update on public.app_page_sections
  for each row execute function public.set_updated_at();
create trigger set_project_members_updated_at before update on public.project_members
  for each row execute function public.set_updated_at();
create trigger set_workstreams_updated_at before update on public.workstreams
  for each row execute function public.set_updated_at();
create trigger set_milestones_updated_at before update on public.milestones
  for each row execute function public.set_updated_at();
create trigger set_tasks_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();
create trigger set_design_reviews_updated_at before update on public.design_reviews
  for each row execute function public.set_updated_at();
create trigger set_rom_catalog_updated_at before update on public.rom_catalog
  for each row execute function public.set_updated_at();
create trigger set_play_sessions_updated_at before update on public.play_sessions
  for each row execute function public.set_updated_at();
create trigger set_suggestions_updated_at before update on public.suggestions
  for each row execute function public.set_updated_at();
create trigger set_services_updated_at before update on public.services
  for each row execute function public.set_updated_at();
create trigger set_site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.apps enable row level security;
alter table public.app_releases enable row level security;
alter table public.app_media enable row level security;
alter table public.app_download_links enable row level security;
alter table public.app_page_sections enable row level security;
alter table public.project_members enable row level security;
alter table public.workstreams enable row level security;
alter table public.milestones enable row level security;
alter table public.tasks enable row level security;
alter table public.design_reviews enable row level security;
alter table public.rom_catalog enable row level security;
alter table public.visitor_sessions enable row level security;
alter table public.play_sessions enable row level security;
alter table public.suggestions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;

create policy "profiles own read" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_team_member());
create policy "profiles own update" on public.profiles
  for update to authenticated using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());
create policy "profiles admin insert" on public.profiles
  for insert to authenticated with check (public.is_admin());

create policy "apps public read" on public.apps
  for select to anon, authenticated using (is_public or public.is_team_member());
create policy "apps admin manage" on public.apps
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "app releases public read" on public.app_releases
  for select to anon, authenticated using (
    public.is_team_member()
    or exists (select 1 from public.apps a where a.id = app_id and a.is_public)
  );
create policy "app releases admin manage" on public.app_releases
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "app media public read" on public.app_media
  for select to anon, authenticated using (
    (is_public and exists (select 1 from public.apps a where a.id = app_id and a.is_public))
    or public.is_team_member()
  );
create policy "app media admin manage" on public.app_media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "download links public read" on public.app_download_links
  for select to anon, authenticated using (
    (is_active and not requires_auth and exists (select 1 from public.apps a where a.id = app_id and a.is_public))
    or public.is_team_member()
  );
create policy "download links admin manage" on public.app_download_links
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "page sections public read" on public.app_page_sections
  for select to anon, authenticated using (
    (is_public and exists (select 1 from public.apps a where a.id = app_id and a.is_public))
    or public.is_team_member()
  );
create policy "page sections admin manage" on public.app_page_sections
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "team public read" on public.project_members
  for select to anon, authenticated using (public_profile or public.is_team_member());
create policy "team admin manage" on public.project_members
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "workstreams team read" on public.workstreams
  for select to authenticated using (public.is_team_member());
create policy "workstreams admin manage" on public.workstreams
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "milestones team read" on public.milestones
  for select to authenticated using (public.is_team_member());
create policy "milestones team write" on public.milestones
  for insert to authenticated with check (public.is_team_member());
create policy "milestones team update" on public.milestones
  for update to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "tasks team read" on public.tasks
  for select to authenticated using (public.is_team_member());
create policy "tasks team insert" on public.tasks
  for insert to authenticated with check (public.is_team_member());
create policy "tasks team update" on public.tasks
  for update to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "design reviews team read" on public.design_reviews
  for select to authenticated using (public.is_team_member());
create policy "design reviews team write" on public.design_reviews
  for insert to authenticated with check (public.is_team_member());
create policy "design reviews team update" on public.design_reviews
  for update to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "roms public legal read" on public.rom_catalog
  for select to anon, authenticated using (
    (is_public and is_playable and legal_status in ('owned_by_us', 'licensed', 'public_domain', 'user_provided'))
    or public.is_team_member()
  );
create policy "roms admin manage" on public.rom_catalog
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "visitor sessions insert" on public.visitor_sessions
  for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
create policy "visitor sessions owner read" on public.visitor_sessions
  for select to authenticated using (user_id = auth.uid() or public.is_team_member());
create policy "visitor sessions owner update" on public.visitor_sessions
  for update to authenticated using (user_id = auth.uid() or public.is_team_member())
  with check (user_id = auth.uid() or public.is_team_member());

create policy "play sessions insert" on public.play_sessions
  for insert to anon, authenticated with check (
    (user_id is null or user_id = auth.uid())
    and (
      rom_id is null
      or exists (
        select 1
        from public.rom_catalog r
        where r.id = rom_id
          and r.is_playable
          and r.legal_status in ('owned_by_us', 'licensed', 'public_domain', 'user_provided')
      )
    )
  );
create policy "play sessions owner read" on public.play_sessions
  for select to authenticated using (user_id = auth.uid() or public.is_team_member());
create policy "play sessions owner update" on public.play_sessions
  for update to authenticated using (user_id = auth.uid() or public.is_team_member())
  with check (user_id = auth.uid() or public.is_team_member());

create policy "suggestions public insert" on public.suggestions
  for insert to anon, authenticated with check (
    char_length(coalesce(message, '')) between 3 and 4000
    and (email is null or email::text ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
    and (submitted_by is null or submitted_by = auth.uid())
  );
create policy "suggestions owner or team read" on public.suggestions
  for select to authenticated using (submitted_by = auth.uid() or public.is_team_member());
create policy "suggestions team update" on public.suggestions
  for update to authenticated using (public.is_team_member()) with check (public.is_team_member());

create policy "newsletter public insert" on public.newsletter_subscribers
  for insert to anon, authenticated with check (email::text ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
create policy "newsletter team read" on public.newsletter_subscribers
  for select to authenticated using (public.is_team_member());

create policy "services public read" on public.services
  for select to anon, authenticated using (is_public or public.is_team_member());
create policy "services admin manage" on public.services
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "settings public read" on public.site_settings
  for select to anon, authenticated using (is_public or public.is_team_member());
create policy "settings admin manage" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('app-assets', 'app-assets', true, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
  ('rom-files', 'rom-files', false, 104857600, array['application/octet-stream', 'application/x-genesis-rom', 'application/zip']),
  ('user-uploads', 'user-uploads', false, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "storage public read app assets" on storage.objects
  for select to anon, authenticated using (bucket_id = 'app-assets');
create policy "storage admin manage app assets" on storage.objects
  for all to authenticated using (bucket_id = 'app-assets' and public.is_admin())
  with check (bucket_id = 'app-assets' and public.is_admin());
create policy "storage admin manage rom files" on storage.objects
  for all to authenticated using (bucket_id = 'rom-files' and public.is_admin())
  with check (bucket_id = 'rom-files' and public.is_admin());
create policy "storage users manage own uploads" on storage.objects
  for all to authenticated using (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

grant usage on schema public to anon, authenticated;
grant select on
  public.apps,
  public.app_releases,
  public.app_media,
  public.app_download_links,
  public.app_page_sections,
  public.project_members,
  public.rom_catalog,
  public.services,
  public.site_settings
to anon, authenticated;
grant insert on
  public.visitor_sessions,
  public.play_sessions,
  public.suggestions,
  public.newsletter_subscribers
to anon, authenticated;
grant select, insert, update on
  public.profiles,
  public.visitor_sessions,
  public.play_sessions,
  public.suggestions
to authenticated;
grant select, insert, update on
  public.workstreams,
  public.milestones,
  public.tasks,
  public.design_reviews
to authenticated;
grant all on all tables in schema public to service_role;
grant all on all routines in schema public to service_role;

commit;
