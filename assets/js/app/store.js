const languageKey = "artstyle_lang";
const themeKey = "artstyle_theme";

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browser modes.
  }
}

function urlLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang === "ar" || urlLang === "en") return urlLang;
  return null;
}

function browserLanguage() {
  const preferred = navigator.languages?.[0] || navigator.language || "ar";
  return preferred.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function browserTheme() {
  if (!window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const initialUrlLanguage = urlLanguage();

export const state = {
  lang: initialUrlLanguage || storageGet(languageKey) || browserLanguage(),
  theme: storageGet(themeKey) || browserTheme(),
};

if (initialUrlLanguage) storageSet(languageKey, initialUrlLanguage);

export function setLanguage(lang) {
  state.lang = lang === "ar" ? "ar" : "en";
  storageSet(languageKey, state.lang);
}

export function toggleLanguage() {
  setLanguage(state.lang === "ar" ? "en" : "ar");
}

export function setTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  storageSet(themeKey, state.theme);
}

export function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}
