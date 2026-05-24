import { TEAM } from "../data/content.js";
import { localize, t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";

export function teamPage() {
  return pageShell({
    title: t("teamTitle"),
    lead: t("teamLead"),
    eyebrow: "Team",
    body: `
      <section class="arcade-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("ready")}</p>
            <h2>${t("teamArcadeSquadTitle")}</h2>
          </div>
          <p>${t("teamArcadeSquadLead")}</p>
        </div>
      </section>
      <div class="grid">
        ${TEAM.map((member) => `
          <article class="card team-card">
            <div class="card-body">
              <span class="avatar">${member.initials}</span>
              <h3>${member.name}</h3>
              <p>${localize(member.role)}</p>
              <p><strong>${t("teamFocus")}:</strong> ${localize(member.focus)}</p>
              <span class="pill">${t("ready")}</span>
            </div>
          </article>
        `).join("")}
      </div>
    `,
  });
}
