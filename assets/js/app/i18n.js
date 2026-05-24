import { COPY } from "../data/content.js";
import { state } from "./store.js";

export function t(key) {
  return COPY[state.lang]?.[key] || COPY.en[key] || key;
}

export function localize(value) {
  return typeof value === "string" ? value : value[state.lang] || value.en || "";
}

export function applyLanguageToDocument() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.theme = state.theme;
  const langToggle = document.querySelector("[data-lang-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const langToggleButton = document.querySelector("[data-lang-toggle]");
  const menu = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  const footerNav = document.querySelector("[data-footer-nav]");

  if (langToggle) langToggle.textContent = state.lang === "ar" ? "EN" : "عربي";
  if (themeIcon) themeIcon.textContent = state.theme === "dark" ? "☼" : "☾";
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }
  if (langToggleButton) langToggleButton.setAttribute("aria-label", state.lang === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic");
  if (menu) {
    menu.setAttribute("aria-label", state.lang === "ar" ? "فتح القائمة" : "Open navigation");
  }
  if (nav) nav.setAttribute("aria-label", t("primaryNav"));
  if (footerNav) footerNav.setAttribute("aria-label", t("footerNav"));
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
}
