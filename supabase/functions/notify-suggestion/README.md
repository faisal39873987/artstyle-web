# notify-suggestion

Sends a newly stored suggestion to the support inbox.

Required secrets:

```sh
supabase secrets set \
  SUPPORT_EMAIL=opensea3987@gmail.com \
  SUPABASE_SERVICE_ROLE_KEY=... \
  RESEND_API_KEY=... \
  FROM_EMAIL="Art Style Apps <hello@your-domain.com>"
```

Deploy:

```sh
supabase functions deploy notify-suggestion
```

Client flow:

1. Insert into `public.suggestions`.
2. Call this function with `{ "suggestion_id": "<uuid>" }`.
3. If `RESEND_API_KEY` is missing, the function returns a preview and does not fail the app.
