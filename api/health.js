const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    res.status(200).json({
      ok: false,
      message: "Vercel environment variables are not configured yet.",
    });
    return;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/apps?select=slug,name&limit=1`, {
    headers: {
      apikey: SUPABASE_KEY,
    },
  });

  if (!response.ok) {
    let detail = "";
    try {
      const error = await response.json();
      detail = error.message ? ` ${error.message}` : "";
    } catch {
      detail = "";
    }
    res.status(200).json({
      ok: false,
      message: `Supabase is reachable, but the schema is not ready.${detail}`,
    });
    return;
  }

  const rows = await response.json();
  res.status(200).json({
    ok: true,
    message: `Supabase schema is live. Apps endpoint returned ${rows.length} row(s).`,
  });
}
