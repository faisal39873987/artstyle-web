import { FILTERS, PRODUCTS } from "../data/content.js";
import { localize, t } from "../app/i18n.js";
import { escapeHtml, image } from "../utils/html.js";
import { pageShell } from "../components/shell.js";
import { productCard } from "../components/product-card.js";

function filterOption(value, label = value) {
  return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
}

function catalogFilters(type) {
  const items = type === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.type === type);
  const categories = [...new Map(items.map((product) => [product.category.en, localize(product.category)])).entries()].sort();
  const statuses = [...new Map(items.map((product) => [product.status.en, localize(product.status)])).entries()].sort();
  const platforms = FILTERS.platforms.filter((platform) =>
    items.some((product) => product.platforms.includes(platform)),
  );

  return `
    <form class="catalog-tools" data-catalog-tools>
      <label class="field">
        <span>${t("searchLabel")}</span>
        <input type="search" name="search" placeholder="${t("searchPlaceholder")}" autocomplete="off" data-catalog-search />
      </label>
      <label class="field">
        <span>${t("platformFilter")}</span>
        <select name="platform" data-catalog-filter>
          <option value="">${t("all")}</option>
          ${platforms.map(filterOption).join("")}
        </select>
      </label>
      <label class="field">
        <span>${t("categoryFilter")}</span>
        <select name="category" data-catalog-filter>
          <option value="">${t("all")}</option>
          ${categories.map(([value, label]) => filterOption(value, label)).join("")}
        </select>
      </label>
      <label class="field">
        <span>${t("statusFilter")}</span>
        <select name="status" data-catalog-filter>
          <option value="">${t("all")}</option>
          ${statuses.map(([value, label]) => filterOption(value, label)).join("")}
        </select>
      </label>
      <button class="button ghost" type="reset">${t("clearFilters")}</button>
    </form>
  `;
}

export function listingPage(type) {
  const items = type === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.type === type);
  return pageShell({
    title: type === "all" ? t("catalogTitle") : type === "game" ? t("gamesTitle") : t("appsTitle"),
    lead: type === "all" ? t("catalogLead") : type === "game" ? t("gamesLead") : t("appsLead"),
    eyebrow: type === "all" ? "Catalog" : type === "game" ? "Games" : "Apps",
    body: `
      ${catalogFilters(type)}
      <div class="catalog-summary" aria-live="polite">
        <strong data-catalog-count>${items.length}</strong>
        <span>${t("visibleProducts")}</span>
      </div>
      <div class="grid catalog-grid" data-catalog-grid>${items.map(productCard).join("")}</div>
      <div class="empty-state" data-catalog-empty hidden>${t("noResults")}</div>
    `,
  });
}

export function productPage(product) {
  return pageShell({
    title: product.name,
    lead: localize(product.summary),
    eyebrow: localize(product.category),
    body: `
      <div class="detail-layout">
        <div>
          <div class="meta-row">
            <span class="pill">${t("category")}: ${localize(product.category)}</span>
            <span class="pill">${t("status")}: ${localize(product.status)}</span>
          </div>
          <h2>${localize(product.tagline)}</h2>
          <p class="lead">${localize(product.summary)}</p>
          <div class="product-fact-grid">
            <div class="metric"><strong>${product.media.length}</strong><span>${t("screenshots")}</span></div>
            <div class="metric"><strong>${product.platforms.length}</strong><span>${t("platforms")}</span></div>
            <div class="metric"><strong>${product.type === "game" ? "Game" : "App"}</strong><span>${t("category")}</span></div>
          </div>
          <ul class="feature-list">
            <li><span class="number-badge">01</span><div><strong>${t("platform")}</strong><p>${product.platforms.join(" · ")}</p></div></li>
            <li><span class="number-badge">02</span><div><strong>${t("targetAudience")}</strong><p>${localize(product.audience)}</p></div></li>
            <li><span class="number-badge">03</span><div><strong>${t("techProfile")}</strong><p>${t("staticOnly")} · ${t("noNode")} · ${t("noApi")}</p></div></li>
          </ul>
          <div class="detail-columns">
            <section class="card">
              <div class="card-body">
                <h3>${t("productHighlights")}</h3>
                <ul class="compact-list">
                  ${product.features.map((item) => `<li>${localize(item)}</li>`).join("")}
                </ul>
              </div>
            </section>
            <section class="card">
              <div class="card-body">
                <h3>${t("releaseReadiness")}</h3>
                <ul class="compact-list">
                  ${product.release.map((item) => `<li>${localize(item)}</li>`).join("")}
                </ul>
              </div>
            </section>
          </div>
          <section class="card faq-card">
            <div class="card-body">
              <h3>${t("faqTitle")}</h3>
              <div class="faq-list">
                ${product.faq.map((item) => `
                  <details>
                    <summary>${localize(item.q)}</summary>
                    <p>${localize(item.a)}</p>
                  </details>
                `).join("")}
              </div>
            </div>
          </section>
          <div class="section-actions">
            <a class="button dark" href="/support" data-link>${t("support")}</a>
            <a class="button ghost" href="/press-kit" data-link>${t("pressKit")}</a>
            <a class="button ghost" href="/${product.type === "game" ? "games" : "apps"}" data-link>${t("back")}</a>
          </div>
        </div>
        <div class="gallery">
          <h2>${t("detailMedia")}</h2>
          <div class="gallery-main">
            ${image(product.media[0], product.name, { eager: true })}
          </div>
          <div class="gallery-strip">
            ${product.media.map((item) => image(item, product.name)).join("")}
          </div>
        </div>
      </div>
    `,
  });
}
