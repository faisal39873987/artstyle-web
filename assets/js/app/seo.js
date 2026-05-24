import { PRODUCTS, POLICIES, SITE } from "../data/content.js";
import { ARCADE_GAMES } from "../data/arcade.js";
import { localize, t } from "./i18n.js";
import { state } from "./store.js";
import { productPath } from "../components/product-card.js";

function setMeta(selector, value, attr = "content") {
  const node = document.head.querySelector(selector);
  if (node) node.setAttribute(attr, value);
}

function routeMeta(path) {
  const privateRoute = path === "/login" || path === "/playroom" || path.startsWith("/dashboard");
  const product = PRODUCTS.find((item) => productPath(item) === path);
  if (product) {
    return {
      title: `${product.name} | ${SITE.name}`,
      description: localize(product.summary),
      image: `${SITE.url}/assets/images/${product.media[0]}`,
      url: `${SITE.url}${path}`,
      robots: "index, follow, max-image-preview:large",
    };
  }

  const arcadeGame = ARCADE_GAMES.find((item) => path === `/arcade/${item.id}` || path === `/arcade/play/${item.id}`);
  if (arcadeGame) {
    return {
      title: `${arcadeGame.title} | ${SITE.name}`,
      description: `${localize(arcadeGame.collection)} · ${arcadeGame.platform} · ${t("arcadeKeyboardLead")}`,
      image: `${SITE.url}${arcadeGame.cover}`,
      url: `${SITE.url}${path}`,
      robots: "index, follow, max-image-preview:large",
    };
  }

  const policy = POLICIES.find((item) => item.path === path);
  if (policy) {
    return {
      title: `${localize(policy.title)} | ${SITE.name}`,
      description: localize(policy.body),
      image: `${SITE.url}${SITE.image}`,
      url: `${SITE.url}${path}`,
      robots: "index, follow, max-image-preview:large",
    };
  }

  const titles = {
    "/": [t("heroTitle"), t("heroLead")],
    "/products": [t("catalogTitle"), t("catalogLead")],
    "/apps": [t("appsTitle"), t("appsLead")],
    "/games": [t("gamesTitle"), t("gamesLead")],
    "/arcade": [t("arcadeTitle"), t("arcadeLead")],
    "/playroom": [t("playroomTitle"), t("playroomLead")],
    "/team": [t("teamTitle"), t("teamLead")],
    "/policies": [t("policiesTitle"), t("policiesLead")],
    "/support": [t("supportTitle"), t("supportLead")],
    "/press-kit": [t("pressKitTitle"), t("pressKitLead")],
    "/login": [t("loginTitle"), t("loginLead")],
    "/dashboard": [t("dashboardTitle"), t("dashboardLead")],
  };
  const [title, description] = titles[path] || [t("notFoundTitle"), t("notFoundLead")];
  return {
    title: `${title} | ${SITE.name}`,
    description,
    image: `${SITE.url}${SITE.image}`,
    url: `${SITE.url}${path}`,
    robots: privateRoute ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  };
}

export function applySeo(path) {
  const meta = routeMeta(path);
  document.title = meta.title;
  setMeta('meta[name="robots"]', meta.robots);
  setMeta('meta[name="theme-color"]', state.theme === "dark" ? "#101816" : "#f6f8f3");
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:url"]', meta.url);
  setMeta('meta[property="og:image"]', meta.image);
  setMeta('meta[property="og:locale"]', state.lang === "ar" ? "ar_AE" : "en_US");
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);
  setMeta('meta[name="twitter:image"]', meta.image);
  setMeta('link[rel="canonical"]', meta.url, "href");
  setMeta('link[hreflang="ar"]', `${meta.url}?lang=ar`, "href");
  setMeta('link[hreflang="en"]', `${meta.url}?lang=en`, "href");
  setMeta('link[hreflang="x-default"]', meta.url, "href");
}
