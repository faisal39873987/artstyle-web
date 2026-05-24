import { POLICIES } from "../data/content.js";
import { localize, t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";

export function policiesPage(path = "/policies") {
  const selected = POLICIES.find((policy) => policy.path === path);
  const body = selected
    ? `
      <article class="card">
        <div class="card-body">
          <h2>${localize(selected.title)}</h2>
          <p class="lead">${localize(selected.body)}</p>
          <a class="button dark" href="/policies" data-link>${t("back")}</a>
        </div>
      </article>
    `
    : `
      <div class="grid two">
        ${POLICIES.map((policy) => `
          <article class="card">
            <div class="card-body">
              <h3>${localize(policy.title)}</h3>
              <p>${localize(policy.body)}</p>
              <a class="button dark" href="${policy.path}" data-link>${t("open")}</a>
            </div>
          </article>
        `).join("")}
      </div>
    `;

  return pageShell({
    title: t("policiesTitle"),
    lead: t("policiesLead"),
    eyebrow: "Policies",
    body,
  });
}
