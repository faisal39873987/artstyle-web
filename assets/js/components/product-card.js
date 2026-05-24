import { localize, t } from "../app/i18n.js";
import { escapeHtml, image } from "../utils/html.js";

export function productPath(product) {
  return `/${product.type === "game" ? "games" : "apps"}/${product.id}`;
}

export function productCard(product) {
  const badges = [localize(product.category), localize(product.status), ...product.platforms.slice(0, 2)];
  return `
    <article
      class="card product-card"
      data-product-card
      data-type="${escapeHtml(product.type)}"
      data-platforms="${escapeHtml(product.platforms.join(" "))}"
      data-category="${escapeHtml(product.category.en)}"
      data-status="${escapeHtml(product.status.en)}"
      data-search="${escapeHtml(product.searchText)}"
    >
      <a class="product-media" href="${productPath(product)}" data-link>
        ${image(product.media[0], product.name)}
        <span class="product-logo">
          ${image(product.logo, "")}
        </span>
      </a>
      <div class="card-body">
        <div class="meta-row">
          ${badges.map((badge) => `<span class="pill">${escapeHtml(badge)}</span>`).join("")}
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(localize(product.tagline))}</p>
        <div class="card-actions">
          <a class="button dark" href="${productPath(product)}" data-link>${t("open")}</a>
          <a class="button ghost" href="/support" data-link>${t("support")}</a>
        </div>
      </div>
    </article>
  `;
}
