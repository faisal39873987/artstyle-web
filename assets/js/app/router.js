import { PRODUCTS, POLICIES } from "../data/content.js";
import { applyLanguageToDocument } from "./i18n.js";
import { applySeo } from "./seo.js";
import { productPath } from "../components/product-card.js";
import { homePage } from "../pages/home.js";
import { listingPage, productPage } from "../pages/products.js";
import { teamPage } from "../pages/team.js";
import { policiesPage } from "../pages/policies.js";
import { loginPage } from "../pages/auth.js";
import { supportPage } from "../pages/support.js";
import { dashboardPage } from "../pages/dashboard.js";
import { pressKitPage } from "../pages/press-kit.js";
import { arcadeDetailPage, arcadePage, arcadePlayPage, findArcadeGame } from "../pages/arcade.js";
import { playroomPage } from "../pages/playroom.js";
import { notFoundPage } from "../pages/not-found.js";
import { getAuthStatus, getCurrentSession } from "../services/auth.js";

const view = document.querySelector("#view");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu]");
let authGuardRun = 0;

function currentPath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function authRedirectTarget(path) {
  return `/login?next=${encodeURIComponent(path)}`;
}

function requiresAuth(path) {
  return path === "/playroom" || path === "/dashboard" || path.startsWith("/dashboard/");
}

function route(path) {
  if (path === "/") return homePage();
  if (path === "/products") return listingPage("all");
  if (path === "/apps") return listingPage("app");
  if (path === "/games") return listingPage("game");
  if (path === "/arcade") return arcadePage();
  if (path === "/playroom") return playroomPage();
  if (path === "/team") return teamPage();
  if (path === "/policies" || POLICIES.some((policy) => policy.path === path)) return policiesPage(path);
  if (path === "/login") return loginPage();
  if (path === "/support") return supportPage();
  if (path === "/press-kit") return pressKitPage();
  if (path === "/plan") return homePage();
  if (path === "/dashboard" || path.startsWith("/dashboard/")) return dashboardPage(path);

  if (path.startsWith("/arcade/play/")) {
    const game = findArcadeGame(path.split("/").pop());
    return game ? arcadePlayPage(game) : notFoundPage();
  }

  if (path.startsWith("/arcade/")) {
    const game = findArcadeGame(path.split("/").pop());
    return game ? arcadeDetailPage(game) : notFoundPage();
  }

  const product = PRODUCTS.find((item) => productPath(item) === path);
  return product ? productPage(product) : notFoundPage();
}

function updateActiveNav(path) {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.removeAttribute("aria-current");
    const href = link.getAttribute("href");
    if (!link.closest(".site-nav")) return;
    if (href === "/" ? path === "/" : path.startsWith(href)) {
      link.setAttribute("aria-current", "page");
    }
  });
}

export function closeMenu() {
  if (!nav || !menuButton) return;
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

export function render() {
  const path = currentPath();
  applyLanguageToDocument();
  view.innerHTML = route(path);
  applyLanguageToDocument();
  applySeo(path);
  updateActiveNav(path);
  document.dispatchEvent(new CustomEvent("app:rendered", { detail: { path } }));
  view.focus({ preventScroll: true });
  guardPrivateRoutes(path);
}

export function navigate(url, scroll = true) {
  history.pushState({}, "", url);
  closeMenu();
  render();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

export function startRouter() {
  window.addEventListener("popstate", render);
  render();
}

async function guardPrivateRoutes(path) {
  const auth = getAuthStatus();
  if (!auth.enabled || !requiresAuth(path)) return;

  const run = ++authGuardRun;
  const session = await getCurrentSession();
  if (run !== authGuardRun || currentPath() !== path || session) return;
  navigate(authRedirectTarget(path));
}
