const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "opensea3987@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "Art Style Apps <onboarding@resend.dev>";

function cleanString(value, max = 4000) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function isEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmail(payload) {
  if (!RESEND_API_KEY) {
    return { sent: false, reason: "RESEND_API_KEY is not configured" };
  }

  const text = [
    `App: ${payload.app_name || payload.app_slug || "General"}`,
    `Type: ${payload.kind}`,
    `Name: ${payload.name || "Guest"}`,
    `Email: ${payload.email || "Not provided"}`,
    `Source: ${payload.source_url || "Not provided"}`,
    "",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [SUPPORT_EMAIL],
      reply_to: payload.email || undefined,
      subject: `[Art Style Apps] ${payload.subject || "New suggestion"}`,
      text,
    }),
  });

  if (!response.ok) {
    return { sent: false, reason: await response.text() };
  }

  return { sent: true };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  const payload = {
    app_slug: cleanString(req.body?.app_slug, 120),
    app_name: cleanString(req.body?.app_name, 160),
    name: cleanString(req.body?.name, 160),
    email: cleanString(req.body?.email, 320),
    kind: cleanString(req.body?.kind, 40) || "feature",
    subject: cleanString(req.body?.subject, 200),
    message: cleanString(req.body?.message, 4000),
    source_url: cleanString(req.body?.source_url, 600),
  };

  if (!payload.message || payload.message.length < 3) {
    res.status(400).json({ ok: false, message: "Message is too short." });
    return;
  }

  if (!isEmail(payload.email)) {
    res.status(400).json({ ok: false, message: "Email is invalid." });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    res.status(503).json({
      ok: false,
      message: "Suggestion API needs SUPABASE_URL and SUPABASE_SECRET_KEY on Vercel.",
    });
    return;
  }

  let appId = null;
  if (payload.app_slug) {
    const appResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/apps?slug=eq.${encodeURIComponent(payload.app_slug)}&select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
        },
      },
    );

    if (appResponse.ok) {
      const apps = await appResponse.json();
      appId = apps[0]?.id || null;
    }
  }

  const suggestionResponse = await fetch(`${SUPABASE_URL}/rest/v1/suggestions`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify({
      app_id: appId,
      name: payload.name,
      email: payload.email,
      kind: payload.kind,
      subject: payload.subject,
      message: payload.message,
      source_url: payload.source_url,
      email_to: SUPPORT_EMAIL,
      metadata: {
        app_slug: payload.app_slug,
        app_name: payload.app_name,
      },
    }),
  });

  if (!suggestionResponse.ok) {
    let detail = "Supabase schema is not ready.";
    try {
      const error = await suggestionResponse.json();
      detail = error.message || detail;
    } catch {
      detail = await suggestionResponse.text();
    }
    res.status(503).json({ ok: false, message: detail });
    return;
  }

  const email = await sendEmail(payload);
  res.status(200).json({
    ok: true,
    email_sent: email.sent,
    message: email.sent
      ? "Suggestion received and emailed."
      : "Suggestion received. Email provider is not configured yet.",
  });
}
