export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function image(src, alt, options = {}) {
  const loading = options.eager ? "eager" : "lazy";
  const fetchPriority = options.eager ? ' fetchpriority="high"' : "";
  const className = options.className ? ` class="${escapeHtml(options.className)}"` : "";
  const safeSrc = escapeHtml(src);
  const webp = safeSrc.replace(/\.[a-z0-9]+$/i, ".webp");
  return `
    <picture>
      <source srcset="/assets/images/webp/${webp}" type="image/webp" />
      <img src="/assets/images/${safeSrc}" alt="${escapeHtml(alt)}" loading="${loading}" decoding="async"${fetchPriority}${className} />
    </picture>
  `;
}

export function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
