import { hasSupabaseConfig, json, parseSupabaseError, supabaseFetch } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    json(res, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  if (!hasSupabaseConfig({ requireServerKey: false })) {
    json(res, 200, {
      ok: false,
      message: "Vercel environment variables are not configured yet.",
    });
    return;
  }

  const response = await supabaseFetch(
    "/rest/v1/backend_public_status?select=public_apps,release_rows,checked_at&limit=1",
    {},
    { requireServerKey: false },
  );

  if (!response.ok) {
    json(res, 200, {
      ok: false,
      message: `Supabase is reachable, but backend round five is not applied. ${await parseSupabaseError(response, "")}`.trim(),
    });
    return;
  }

  const rows = await response.json();
  const status = rows[0] || {};
  json(res, 200, {
    ok: true,
    message: `Supabase backend is live. ${status.public_apps ?? 0} public app(s), ${status.release_rows ?? 0} release row(s).`,
    checked_at: status.checked_at,
  });
}
