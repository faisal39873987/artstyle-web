import { hasSupabaseConfig, json, parseSupabaseError, supabaseFetch } from "./_supabase.js";

const ROUND_FIVE_TASKS = new Set([
  "Backend rate limit for suggestions",
  "Backend app catalog endpoint",
  "Backend health and status report",
  "Suggestion notification tracking",
  "Backend OAuth readiness checklist",
]);

async function readJson(path, fallback) {
  const response = await supabaseFetch(path);
  if (!response.ok) {
    throw new Error(await parseSupabaseError(response, fallback));
  }
  return response.json();
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

  try {
    const [statusRows, settingsRows, workstreamRows] = await Promise.all([
      readJson("/rest/v1/backend_public_status?select=*&limit=1", "Backend status view is not ready."),
      readJson(
        "/rest/v1/site_settings?key=in.(auth_plan,backend_round_five,deployment_verification,rom_policy,support_email)&select=key,value,is_public&order=key.asc",
        "Site settings are not ready.",
      ),
      readJson("/rest/v1/workstreams?key=eq.supabase-backend&select=id,key,name,status,target_date&limit=1", "Workstreams are not ready."),
    ]);

    const backendWorkstream = workstreamRows[0] || null;
    const taskRows = backendWorkstream
      ? await readJson(
          `/rest/v1/tasks?workstream_id=eq.${backendWorkstream.id}&select=title,description,status,priority,due_date&order=due_date.asc`,
          "Backend tasks are not ready.",
        )
      : [];
    const roundFiveTasks = taskRows.filter((task) => ROUND_FIVE_TASKS.has(task.title));

    res.setHeader("cache-control", "s-maxage=30, stale-while-revalidate=120");
    json(res, 200, {
      ok: true,
      status: statusRows[0] || null,
      settings: Object.fromEntries(settingsRows.map((row) => [row.key, row.value])),
      backend_workstream: backendWorkstream,
      backend_tasks: roundFiveTasks,
      backend_task_history_count: taskRows.length,
      email_provider_configured: Boolean(process.env.RESEND_API_KEY),
    });
  } catch (error) {
    json(res, 503, { ok: false, message: error.message });
  }
}
