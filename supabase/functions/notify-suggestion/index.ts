const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type SuggestionRow = {
  id: string;
  name: string | null;
  email: string | null;
  kind: string;
  subject: string | null;
  message: string;
  source_url: string | null;
  email_to: string;
  created_at: string;
  notified_at: string | null;
  apps: { name: string } | null;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

async function markNotification(
  supabaseUrl: string,
  secretKey: string,
  suggestionId: string,
  sent: boolean,
  error?: string,
) {
  await fetch(`${supabaseUrl}/rest/v1/rpc/mark_suggestion_notification`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      p_suggestion_id: suggestionId,
      p_sent: sent,
      p_error: error ?? null,
    }),
  }).catch(() => undefined);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const secretKey =
    Deno.env.get("ARTSTYLE_SUPABASE_SECRET_KEY") ??
    Deno.env.get("SUPABASE_SECRET_KEY") ??
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const supportEmail = Deno.env.get("SUPPORT_EMAIL") ?? "opensea3987@gmail.com";
  const fromEmail = Deno.env.get("FROM_EMAIL") ?? "Art Style Apps <onboarding@resend.dev>";

  if (!supabaseUrl || !secretKey) {
    return json({ error: "Missing Supabase service configuration" }, 500);
  }

  let payload: { suggestion_id?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!isUuid(payload.suggestion_id)) {
    return json({ error: "suggestion_id must be a UUID" }, 400);
  }

  const suggestionResponse = await fetch(
    `${supabaseUrl}/rest/v1/suggestions?id=eq.${payload.suggestion_id}&select=id,name,email,kind,subject,message,source_url,email_to,created_at,notified_at,apps(name)`,
    {
      headers: {
        apikey: secretKey,
        accept: "application/vnd.pgrst.object+json",
      },
    },
  );

  if (!suggestionResponse.ok) {
    return json({ error: "Suggestion not found" }, 404);
  }

  const suggestion = (await suggestionResponse.json()) as SuggestionRow;

  if (suggestion.notified_at) {
    return json({ ok: true, email_sent: true, already_notified: true });
  }

  const appName = suggestion.apps?.name ?? "General";
  const subject = suggestion.subject?.trim() || `New ${suggestion.kind} suggestion`;
  const toEmail = suggestion.email_to || supportEmail;
  const replyLine = suggestion.email ? `Reply-to: ${suggestion.email}` : "Reply-to: not provided";
  const nameLine = suggestion.name ? `Name: ${suggestion.name}` : "Name: Guest";
  const sourceLine = suggestion.source_url ? `Source: ${suggestion.source_url}` : "Source: not provided";

  const text = [
    `App: ${appName}`,
    `Type: ${suggestion.kind}`,
    nameLine,
    replyLine,
    sourceLine,
    `Created: ${suggestion.created_at}`,
    "",
    "Message:",
    suggestion.message,
  ].join("\n");

  if (!resendApiKey) {
    await markNotification(
      supabaseUrl,
      secretKey,
      suggestion.id,
      false,
      "RESEND_API_KEY is not configured",
    );
    return json({
      ok: true,
      email_sent: false,
      reason: "RESEND_API_KEY is not configured",
      preview: { to: toEmail, subject, text },
    }, 202);
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: suggestion.email ?? undefined,
      subject: `[Art Style Apps] ${subject}`,
      text,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    await markNotification(supabaseUrl, secretKey, suggestion.id, false, errorText);
    return json({ error: "Email provider failed", details: errorText }, 502);
  }

  await markNotification(supabaseUrl, secretKey, suggestion.id, true);
  return json({ ok: true, email_sent: true });
});
