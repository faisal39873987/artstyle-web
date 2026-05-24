import { PUBLIC_ENV } from "../../../config/public-env.js";
import { t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";
import { field } from "../components/forms.js";

export function supportPage() {
  const subjects = [
    t("supportSubjectApp"),
    t("supportSubjectGame"),
    t("supportSubjectPolicy"),
    t("supportSubjectStore"),
  ];

  return pageShell({
    title: t("supportTitle"),
    lead: t("supportLead"),
    eyebrow: "Support",
    body: `
      <div class="form-shell">
        <form class="card form-card form-grid" data-form="support">
          ${field({ label: t("name"), name: "name" })}
          ${field({ label: t("email"), name: "email", type: "email" })}
          ${field({ label: t("subject"), name: "subject", options: subjects })}
          ${field({ label: t("message"), name: "message", textarea: true })}
          <button class="button dark" type="submit">${t("send")}</button>
          <p class="notice" data-form-message>${t("staticOnly")}. Supabase direct ready.</p>
        </form>
        <aside class="card status-panel">
          <p class="eyebrow">${t("ready")}</p>
          <h2>Namecheap + LiteSpeed</h2>
          <p>${t("noNode")} · ${t("noApi")} · SSH/SCP deployment · .htaccess SPA routing.</p>
          <ul class="feature-list">
            <li><span class="number-badge">1</span><div><strong>${PUBLIC_ENV.supportEmail}</strong><p>${t("supportEmailRoute")}</p></div></li>
            <li><span class="number-badge">2</span><div><strong>Supabase</strong><p>${t("supportDirectRoute")}</p></div></li>
          </ul>
        </aside>
      </div>
    `,
  });
}
