import { PRODUCTS, TEAM } from "../data/content.js";
import { t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";
import { getAuthStatus } from "../services/auth.js";

export function dashboardPage(path = "/dashboard") {
  const active = path.split("/")[2] || "overview";
  const auth = getAuthStatus();
  const links = [
    ["overview", "/dashboard", t("overview")],
    ["products", "/dashboard/products", t("products")],
    ["support", "/dashboard/support", t("support")],
    ["team", "/dashboard/team", t("teamCount")],
    ["settings", "/dashboard/settings", t("settings")],
  ];

  return pageShell({
    title: t("dashboardTitle"),
    lead: t("dashboardLead"),
    eyebrow: "Dashboard",
    body: `
      <div class="dashboard-grid">
        <nav class="dashboard-rail" aria-label="${t("navDashboard")}">
          ${links.map(([key, href, label]) => `<a href="${href}" data-link ${key === active ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <section class="card">
          <div class="card-body">
            <div class="metric-grid">
              <div class="metric"><strong>${PRODUCTS.length}</strong><span>${t("products")}</span></div>
              <div class="metric"><strong>${TEAM.length}</strong><span>${t("teamCount")}</span></div>
              <div class="metric"><strong>0</strong><span>${t("serverApis")}</span></div>
            </div>
            <ul class="feature-list section-actions">
              <li><span class="number-badge">1</span><div><strong>${t("authReadyTitle")}</strong><p>${t("authReadyLead")}</p></div></li>
              <li><span class="number-badge">2</span><div><strong>${t("routingReadyTitle")}</strong><p>${t("routingReadyLead")}</p></div></li>
              <li><span class="number-badge">3</span><div><strong>${t("hostingReadyTitle")}</strong><p>${t("hostingReadyLead")}</p></div></li>
            </ul>
            <div class="section-actions">
              ${auth.enabled ? `<button class="button ghost" type="button" data-auth-signout>${t("signOut")}</button>` : ""}
              <p class="notice" data-auth-message>${auth.enabled ? t("authReadyLead") : t("supabaseDisabled")}</p>
            </div>
          </div>
        </section>
      </div>
    `,
  });
}
