begin;

insert into public.site_settings (key, value, is_public)
values
  (
    'deployment_verification',
    '{
      "title":"Deployment Verification",
      "status":"verified",
      "verified_at":"2026-05-12T12:44:00Z",
      "production_url":"https://artstyle-web.vercel.app",
      "github":{
        "connected":true,
        "repo":"faisal39873987/artstyle-web",
        "branch":"main"
      },
      "vercel":{
        "connected":true,
        "project":"open-seas-projects/artstyle-web",
        "project_id":"prj_vPZ9B8ArkWcqBOCz7SVOoNbHI9JT",
        "production_alias_public":true,
        "deployment_url_protection":"Raw deployment URLs use Vercel SSO protection; production alias is public."
      },
      "supabase":{
        "connected":true,
        "project_ref":"asplwsmyacuttbdjtgbk",
        "migrations_applied":[
          "20260511173000",
          "20260511174000",
          "20260512090000"
        ]
      },
      "checks":[
        "Production alias returns 200",
        "Health API returns ok",
        "App catalog API returns Supabase data",
        "Backend status API returns the work queue",
        "ROM routes redirect to the legal unavailable page"
      ],
      "manual_remaining":[
        "Add RESEND_API_KEY for real email delivery",
        "Enable Google OAuth provider",
        "Enable Apple OAuth provider after Services ID and secret are ready",
        "Recover Flutter source before moving the portal into app source"
      ]
    }'::jsonb,
    true
  )
on conflict (key) do update
set value = excluded.value,
    is_public = excluded.is_public,
    updated_at = now();

insert into public.site_settings (key, value, is_public)
values
  (
    'backend_round_five',
    '{
      "title":"Backend Round Five",
      "status":"verified_with_manual_items",
      "items":[
        "Suggestion rate limiting and duplicate protection",
        "Server API for app catalog",
        "Backend status endpoint",
        "Notification attempt tracking",
        "Public-safe catalog views"
      ],
      "completed":[
        "Supabase migrations are applied",
        "Vercel API routes are live",
        "Public catalog reads from Supabase",
        "Production health check is green"
      ],
      "manual_remaining":[
        "Configure RESEND_API_KEY for real outbound email",
        "Enable Google and Apple providers from Supabase Auth"
      ]
    }'::jsonb,
    true
  )
on conflict (key) do update
set value = excluded.value,
    is_public = excluded.is_public,
    updated_at = now();

update public.workstreams
set status = 'review'::public.task_status,
    updated_at = now()
where key = 'supabase-backend';

update public.workstreams
set status = 'done'::public.task_status,
    updated_at = now()
where key = 'deployment';

update public.tasks
set status = 'done'::public.task_status,
    updated_at = now()
where title in (
  'Apply initial migration',
  'Connect Vercel project',
  'Backend rate limit for suggestions',
  'Backend app catalog endpoint',
  'Backend health and status report'
);

update public.tasks
set status = 'review'::public.task_status,
    updated_at = now()
where title = 'Suggestion notification tracking';

update public.tasks
set status = 'todo'::public.task_status,
    updated_at = now()
where title in (
  'Backend OAuth readiness checklist',
  'Configure Google and Apple providers'
);

update public.services
set status = 'review'::public.task_status,
    updated_at = now()
where slug = 'supabase-auth-db-storage';

update public.services
set status = 'done'::public.task_status,
    updated_at = now()
where slug = 'vercel-hosting';

update public.services
set status = 'review'::public.task_status,
    updated_at = now()
where slug = 'email-routing';

commit;
