import { t } from "../app/i18n.js";

export function pageShell({ title, lead, eyebrow, body }) {
  return `
    <section class="band tight">
      <div class="inner">
        <p class="eyebrow">${eyebrow || t("staticOnly")}</p>
        <div class="section-head">
          <div>
            <h1><bdi dir="auto">${title}</bdi></h1>
            <p class="lead">${lead}</p>
          </div>
        </div>
        ${body}
      </div>
    </section>
  `;
}
