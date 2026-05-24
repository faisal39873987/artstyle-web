import { PRODUCTS } from "../data/content.js";
import { localize, t } from "../app/i18n.js";
import { productPath } from "../components/product-card.js";
import { pageShell } from "../components/shell.js";
import { image } from "../utils/html.js";

export function pressKitPage() {
  return pageShell({
    title: t("pressKitTitle"),
    lead: t("pressKitLead"),
    eyebrow: "Press",
    body: `
      <div class="grid two press-grid">
        ${PRODUCTS.map((product) => `
          <article class="card press-card">
            <div class="press-media">
              ${image(product.media[0], product.name)}
              <span class="product-logo">${image(product.logo, "")}</span>
            </div>
            <div class="card-body">
              <div class="meta-row">
                <span class="pill">${product.type === "game" ? t("navGames") : t("navApps")}</span>
                <span class="pill">${localize(product.status)}</span>
                <span class="pill">${product.media.length} ${t("screenshots")}</span>
              </div>
              <h3>${product.name}</h3>
              <p>${localize(product.summary)}</p>
              <ul class="compact-list">
                <li>${t("assetsIncluded")}: ${product.media.join(" · ")}</li>
                <li>${t("productCopy")}: ${localize(product.tagline)}</li>
                <li>${t("reviewReady")}: ${localize(product.status)}</li>
              </ul>
              <div class="card-actions">
                <a class="button dark" href="${productPath(product)}" data-link>${t("open")}</a>
                <a class="button ghost" href="/support" data-link>${t("support")}</a>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `,
  });
}
