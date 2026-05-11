# notify-suggestion

Sends a newly stored suggestion to the support inbox.

The function is idempotent: if `notified_at` already exists on the suggestion row, it returns success without sending again. It also records notification attempts and provider errors through `public.mark_suggestion_notification`.

Required secrets:

```sh
supabase secrets set \
  SUPPORT_EMAIL=opensea3987@gmail.com \
  ARTSTYLE_SUPABASE_SECRET_KEY=... \
  RESEND_API_KEY=... \
  FROM_EMAIL="Art Style Apps <hello@your-domain.com>"
```

Deploy:

```sh
supabase functions deploy notify-suggestion --no-verify-jwt
```

Client flow:

1. Insert into `public.suggestions`.
2. Call this function with `{ "suggestion_id": "<uuid>" }`.
3. If `RESEND_API_KEY` is missing, the function returns a preview and does not fail the app.
