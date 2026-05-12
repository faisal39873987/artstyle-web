begin;

update public.site_settings
set value = jsonb_set(
      value,
      '{supabase,migrations_applied}',
      '[
        "20260511173000",
        "20260511174000",
        "20260512090000",
        "20260512124500",
        "20260512125500"
      ]'::jsonb
    ),
    updated_at = now()
where key = 'deployment_verification';

commit;
