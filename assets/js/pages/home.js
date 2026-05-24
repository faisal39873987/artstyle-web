import { MEDIA_LIBRARY, PLAN, PRODUCTS } from "../data/content.js";
import { localize, t } from "../app/i18n.js";
import { image } from "../utils/html.js";
import { productCard } from "../components/product-card.js";

export function homePage() {
  const heroImages = ["polar_1.png", "nanny_1.png", "snake_1.png", "cube_1.png"];
  return `
    <section class="hero band">
      <div class="inner hero-frame">
        <div class="hero-media" aria-hidden="true">
          ${heroImages.map((item, index) => image(item, "", { eager: index === 0 })).join("")}
        </div>
        <div class="hero-copy">
          <p class="eyebrow">${t("heroBadge")}</p>
          <h1>${t("heroTitle")}</h1>
          <p class="lead">${t("heroLead")}</p>
          <div class="hero-actions">
            <a class="button dark" href="/apps" data-link>${t("viewApps")}</a>
            <a class="button ghost" href="/login" data-link>${t("accountAccess")}</a>
          </div>
          <div class="hero-stats">
            <div><strong>${PRODUCTS.length}</strong><span>${t("products")}</span></div>
            <div><strong>3</strong><span>${t("platforms")}</span></div>
            <div><strong>2</strong><span>${t("languages")}</span></div>
            <div><strong>10</strong><span>${t("teamCount")}</span></div>
          </div>
        </div>
      </div>
    </section>
    <section class="band tight">
      <div class="inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("noNode")} · ${t("noApi")}</p>
            <h2>${t("featuredTitle")}</h2>
          </div>
          <p>${t("featuredLead")}</p>
        </div>
        <div class="grid">
          ${PRODUCTS.slice(0, 6).map(productCard).join("")}
        </div>
      </div>
    </section>
    <section class="band tight">
      <div class="inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">${t("screenshots")}</p>
            <h2>${t("mediaLibraryTitle")}</h2>
          </div>
          <p>${t("mediaLibraryLead")}</p>
        </div>
        <div class="media-wall">
          ${MEDIA_LIBRARY.map((item, index) => `
            <figure class="media-tile ${item.featured ? "is-featured" : ""}">
              ${image(item.src, item.productName, { eager: index < 2 })}
              <figcaption>
                <strong>${item.productName}</strong>
                <span>${item.type === "game" ? t("navGames") : t("navApps")}</span>
              </figcaption>
            </figure>
          `).join("")}
        </div>
      </div>
    </section>
    <section class="band tight">
      <div class="inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Senior Web</p>
            <h2>${t("planTitle")}</h2>
          </div>
          <p>${t("planLead")}</p>
        </div>
        <ol class="timeline">
          ${PLAN.map((item, index) => `
            <li>
              <span class="number-badge">${index + 1}</span>
              <div><strong>${localize(item)}</strong></div>
            </li>
          `).join("")}
        </ol>
      </div>
    </section>
  `;
}
