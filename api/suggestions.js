import {
  cleanString,
  getClientIp,
  getHeader,
  hashValue,
  hasSupabaseConfig,
  isEmail,
  json,
  parseSupabaseError,
  readJsonBody,
  supabaseFetch,
  SUPABASE_SERVER_KEY,
  SUPABASE_URL,
} from "./_supabase.js";

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "opensea3987@gmail.com";
const ALLOWED_KINDS = new Set(["feature", "bug", "design", "store", "support", "partnership", "other"]);

function normalizeKind(kind) {
  const value = cleanString(kind, 40)?.toLowerCase() || "feature";
  return ALLOWED_KINDS.has(value) ? value : "other";
}

function duplicateKey(payload, ipHash) {
  const stableParts = [
    payload.app_slug || "general",
    payload.email || "guest",
    ipHash || "unknown",
    payload.kind,
    (payload.subject || "").toLowerCase(),
    payload.message.toLowerCase().replace(/\s+/g, " ").slice(0, 800),
  ];
  return hashValue(stableParts.join("|"));
}

async function findAppId(slug) {
  if (!slug) return null;
  const response = await supabaseFetch(
    `/rest/v1/apps?slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`,
  );
  if (!response.ok) return null;
  const apps = await response.json();
  return apps[0]?.id || null;
}

async function checkRateLimit(ipHash, email) {
  const limit = Number(process.env.SUGGESTION_RATE_LIMIT || 5);
  const windowSeconds = Number(process.env.SUGGESTION_RATE_WINDOW_SECONDS || 600);
  const response = await supabaseFetch("/rest/v1/rpc/check_suggestion_rate_limit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      p_ip_hash: ipHash,
      p_email: email,
      p_window_seconds: windowSeconds,
      p_limit: limit,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseSupabaseError(response, "Suggestion rate limit is not ready."));
  }

  const rows = await response.json();
  return rows[0] || { allowed: true, remaining: limit, reset_at: null };
}

async function readDuplicate(dedupeKey) {
  const response = await supabaseFetch(
    `/rest/v1/suggestions?dedupe_key=eq.${encodeURIComponent(dedupeKey)}&select=id,created_at&limit=1`,
  );
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

async function notifySuggestion(suggestionId) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/notify-suggestion`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVER_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ suggestion_id: suggestionId }),
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = { error: await response.text() };
  }

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  if (!hasSupabaseConfig()) {
    json(res, 503, {
      ok: false,
      message: "Suggestion API needs SUPABASE_URL and SUPABASE_SECRET_KEY on Vercel.",
    });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    json(res, 400, { ok: false, message: "Invalid JSON body." });
    return;
  }

  if (cleanString(body?.company, 120) || cleanString(body?.website, 120)) {
    json(res, 200, { ok: true, message: "Suggestion received." });
    return;
  }

  const payload = {
    app_slug: cleanString(body?.app_slug, 120),
    app_name: cleanString(body?.app_name, 160),
    name: cleanString(body?.name, 160),
    email: cleanString(body?.email, 320)?.toLowerCase() || null,
    kind: normalizeKind(body?.kind),
    subject: cleanString(body?.subject, 200),
    message: cleanString(body?.message, 4000),
    source_url: cleanString(body?.source_url, 600),
  };

  if (!payload.message || payload.message.length < 3) {
    json(res, 400, { ok: false, message: "Message is too short." });
    return;
  }

  if (!isEmail(payload.email)) {
    json(res, 400, { ok: false, message: "Email is invalid." });
    return;
  }

  const ipHash = hashValue(getClientIp(req));
  const userAgentHash = hashValue(getHeader(req, "user-agent"));
  const dedupeKey = duplicateKey(payload, ipHash);

  let rate;
  try {
    rate = await checkRateLimit(ipHash, payload.email);
  } catch (error) {
    json(res, 503, { ok: false, message: error.message });
    return;
  }

  if (!rate.allowed) {
    json(res, 429, {
      ok: false,
      message: "Too many suggestions. Please try again soon.",
      reset_at: rate.reset_at,
    });
    return;
  }

  const appId = await findAppId(payload.app_slug);
  const suggestionResponse = await supabaseFetch("/rest/v1/suggestions", {
    method: "POST",
    headers: {
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
      ip_hash: ipHash,
      user_agent_hash: userAgentHash,
      dedupe_key: dedupeKey,
      metadata: {
        app_slug: payload.app_slug,
        app_name: payload.app_name,
        origin: getHeader(req, "origin") || null,
      },
    }),
  });

  if (!suggestionResponse.ok) {
    const detail = await parseSupabaseError(suggestionResponse, "Supabase schema is not ready.");
    if (suggestionResponse.status === 409 || detail.toLowerCase().includes("duplicate")) {
      const duplicate = await readDuplicate(dedupeKey);
      json(res, 200, {
        ok: true,
        duplicate: true,
        suggestion_id: duplicate?.id || null,
        message: "Suggestion was already received.",
      });
      return;
    }
    json(res, 503, { ok: false, message: detail });
    return;
  }

  const suggestions = await suggestionResponse.json();
  const suggestion = suggestions[0];
  const notification = suggestion?.id ? await notifySuggestion(suggestion.id) : null;
  const emailSent = Boolean(notification?.body?.email_sent);

  json(res, 200, {
    ok: true,
    suggestion_id: suggestion?.id || null,
    email_sent: emailSent,
    rate_remaining: rate.remaining,
    message: emailSent
      ? "Suggestion received and emailed."
      : "Suggestion received. Email delivery is pending provider configuration.",
  });
}
