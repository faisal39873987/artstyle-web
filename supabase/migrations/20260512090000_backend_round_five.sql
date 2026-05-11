begin;

alter table public.suggestions
  add column if not exists ip_hash text,
  add column if not exists user_agent_hash text,
  add column if not exists dedupe_key text,
  add column if not exists notified_at timestamptz,
  add column if not exists notification_attempts integer not null default 0,
  add column if not exists last_notification_error text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'suggestions_notification_attempts_non_negative'
  ) then
    alter table public.suggestions
      add constraint suggestions_notification_attempts_non_negative
      check (notification_attempts >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'suggestions_kind_allowed'
  ) then
    alter table public.suggestions
      add constraint suggestions_kind_allowed
      check (lower(kind) in ('feature', 'bug', 'design', 'store', 'support', 'partnership', 'other'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'suggestions_message_length'
  ) then
    alter table public.suggestions
      add constraint suggestions_message_length
      check (char_length(message) between 3 and 4000);
  end if;
end $$;

create index if not exists suggestions_created_at_idx
  on public.suggestions (created_at desc);

create index if not exists suggestions_ip_hash_created_at_idx
  on public.suggestions (ip_hash, created_at desc)
  where ip_hash is not null;

create index if not exists suggestions_email_created_at_idx
  on public.suggestions (email, created_at desc)
  where email is not null;

create unique index if not exists suggestions_dedupe_key_unique
  on public.suggestions (dedupe_key)
  where dedupe_key is not null;

create or replace function public.check_suggestion_rate_limit(
  p_ip_hash text,
  p_email citext default null,
  p_window_seconds integer default 600,
  p_limit integer default 5
)
returns table (
  allowed boolean,
  remaining integer,
  reset_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_seconds integer := greatest(coalesce(p_window_seconds, 600), 60);
  v_limit integer := greatest(coalesce(p_limit, 5), 1);
  v_since timestamptz := now() - make_interval(secs => greatest(coalesce(p_window_seconds, 600), 60));
  v_count integer;
  v_oldest timestamptz;
begin
  if nullif(p_ip_hash, '') is null and p_email is null then
    return query select true, v_limit, now() + make_interval(secs => v_window_seconds);
    return;
  end if;

  select count(*)::integer, min(created_at)
    into v_count, v_oldest
  from public.suggestions
  where created_at >= v_since
    and (
      (nullif(p_ip_hash, '') is not null and ip_hash = p_ip_hash)
      or (p_email is not null and email = p_email)
    );

  return query
    select
      v_count < v_limit,
      greatest(v_limit - v_count, 0),
      coalesce(v_oldest + make_interval(secs => v_window_seconds), now() + make_interval(secs => v_window_seconds));
end;
$$;

create or replace function public.mark_suggestion_notification(
  p_suggestion_id uuid,
  p_sent boolean,
  p_error text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.suggestions
  set notification_attempts = notification_attempts + 1,
      notified_at = case when p_sent then now() else notified_at end,
      last_notification_error = case when p_sent then null else left(p_error, 1000) end,
      updated_at = now()
  where id = p_suggestion_id;
end;
$$;

create or replace view public.app_catalog_public
with (security_invoker = true)
as
select
  a.id,
  a.slug,
  a.name,
  a.short_name,
  a.category,
  a.tagline,
  a.summary,
  a.description,
  a.audience,
  a.logo_path,
  a.hero_image_path,
  a.website_path,
  a.privacy_path,
  a.support_email,
  a.is_featured,
  a.sort_order,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'id', r.id,
          'platform', r.platform,
          'store_display_name', r.store_display_name,
          'package_identifier', r.package_identifier,
          'bundle_identifier', r.bundle_identifier,
          'version', r.version,
          'release_status', r.release_status,
          'install_audience', r.install_audience,
          'store_url', r.store_url,
          'testing_url', r.testing_url,
          'last_updated_on', r.last_updated_on,
          'notes', r.notes
        )
        order by r.platform, r.store_display_name
      )
      from public.app_releases r
      where r.app_id = a.id
    ),
    '[]'::jsonb
  ) as releases,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'kind', m.kind,
          'path', m.path,
          'alt_text', m.alt_text,
          'caption', m.caption,
          'width', m.width,
          'height', m.height,
          'sort_order', m.sort_order
        )
        order by m.sort_order, m.created_at
      )
      from public.app_media m
      where m.app_id = a.id
        and m.is_public
    ),
    '[]'::jsonb
  ) as media,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'id', d.id,
          'platform', d.platform,
          'kind', d.kind,
          'label', d.label,
          'url', d.url,
          'region', d.region,
          'is_primary', d.is_primary
        )
        order by d.is_primary desc, d.created_at
      )
      from public.app_download_links d
      where d.app_id = a.id
        and d.is_active
        and not d.requires_auth
    ),
    '[]'::jsonb
  ) as download_links,
  coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'section_key', s.section_key,
          'title', s.title,
          'body', s.body,
          'sort_order', s.sort_order
        )
        order by s.sort_order
      )
      from public.app_page_sections s
      where s.app_id = a.id
        and s.is_public
    ),
    '[]'::jsonb
  ) as page_sections
from public.apps a
where a.is_public;

create or replace view public.backend_public_status
with (security_invoker = true)
as
select
  (select count(*)::integer from public.apps where is_public) as public_apps,
  (select count(*)::integer from public.app_releases) as release_rows,
  (select count(*)::integer from public.project_members where public_profile) as public_team_members,
  (select count(*)::integer from public.services where is_public) as public_services,
  (select count(*)::integer from public.suggestions where created_at >= now() - interval '7 days') as suggestions_last_7_days,
  (select count(*)::integer from public.rom_catalog where is_public and is_playable) as playable_roms,
  now() as checked_at;

grant select on public.app_catalog_public to anon, authenticated;
grant select on public.backend_public_status to anon, authenticated;
grant execute on function public.check_suggestion_rate_limit(text, citext, integer, integer) to service_role;
grant execute on function public.mark_suggestion_notification(uuid, boolean, text) to service_role;

insert into public.site_settings (key, value, is_public)
values
  (
    'backend_round_five',
    '{
      "title":"Backend Round Five",
      "status":"in_progress",
      "items":[
        "Suggestion rate limiting and duplicate protection",
        "Server API for app catalog",
        "Backend status endpoint",
        "Notification attempt tracking",
        "Public-safe catalog views"
      ]
    }'::jsonb,
    true
  )
on conflict (key) do update
set value = excluded.value,
    is_public = excluded.is_public,
    updated_at = now();

update public.workstreams
set status = 'in_progress'::public.task_status,
    updated_at = now()
where key = 'supabase-backend';

insert into public.tasks (workstream_id, title, description, status, priority, due_date)
select w.id, t.title, t.description, t.status, t.priority, t.due_date
from public.workstreams w
join (
  values
    ('Backend rate limit for suggestions', 'Hash visitor IP and email server-side, then limit repeated submissions before database insert.', 'in_progress'::public.task_status, 'critical'::public.task_priority, date '2026-05-12'),
    ('Backend app catalog endpoint', 'Serve app catalog from a public-safe Supabase view through Vercel API.', 'in_progress'::public.task_status, 'high'::public.task_priority, date '2026-05-12'),
    ('Backend health and status report', 'Expose production-safe backend status counts for apps, releases, team members, and suggestions.', 'in_progress'::public.task_status, 'high'::public.task_priority, date '2026-05-12'),
    ('Suggestion notification tracking', 'Track notification attempts, delivered timestamp, and last email error on each suggestion row.', 'todo'::public.task_status, 'high'::public.task_priority, date '2026-05-13'),
    ('Backend OAuth readiness checklist', 'Document Google and Apple provider setup, redirect URLs, and owner bootstrap steps.', 'todo'::public.task_status, 'medium'::public.task_priority, date '2026-05-13')
) as t(title, description, status, priority, due_date) on true
where w.key = 'supabase-backend'
  and not exists (
    select 1 from public.tasks existing
    where existing.workstream_id = w.id
      and existing.title = t.title
  );

commit;
