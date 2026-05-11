import { cleanString, hasSupabaseConfig, json, parseSupabaseError, supabaseFetch } from "./_supabase.js";

function queryValue(req, key) {
  if (req.query?.[key]) return Array.isArray(req.query[key]) ? req.query[key][0] : req.query[key];
  const url = new URL(req.url || "/", "https://artstyle.local");
  return url.searchParams.get(key);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    json(res, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  if (!hasSupabaseConfig()) {
    json(res, 503, { ok: false, message: "Supabase server environment variables are not configured." });
    return;
  }

  const slug = cleanString(queryValue(req, "slug"), 120);
  const path = slug
    ? `/rest/v1/app_catalog_public?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`
    : "/rest/v1/app_catalog_public?select=*&order=sort_order.asc";

  const response = await supabaseFetch(path);
  if (!response.ok) {
    json(res, 503, {
      ok: false,
      message: await parseSupabaseError(response, "App catalog view is not ready."),
    });
    return;
  }

  const rows = await response.json();
  res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate=300");
  json(res, 200, {
    ok: true,
    source: "supabase",
    ...(slug ? { app: rows[0] || null } : { apps: rows }),
  });
}
