import { t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";
import { field } from "../components/forms.js";
import { getAuthStatus } from "../services/auth.js";

export function loginPage() {
  const auth = getAuthStatus();
  return pageShell({
    title: t("loginTitle"),
    lead: t("loginLead"),
    eyebrow: "Auth",
    body: `
      <div class="form-shell">
        <form class="card form-card form-grid" data-form="login">
          <h2>${t("signIn")}</h2>
          ${field({ label: t("email"), name: "email", type: "email", autocomplete: "email" })}
          ${field({ label: t("password"), name: "password", type: "password", autocomplete: "current-password" })}
          <button class="button dark" type="submit">${t("signIn")}</button>
          <p class="notice" data-form-message>${auth.enabled ? t("ready") : t("supabaseDisabled")}</p>
        </form>
        <form class="card form-card form-grid" data-form="register">
          <h2>${t("createAccount")}</h2>
          ${field({ label: t("name"), name: "name", autocomplete: "name" })}
          ${field({ label: t("email"), name: "email", type: "email", autocomplete: "email" })}
          ${field({ label: t("password"), name: "password", type: "password", autocomplete: "new-password" })}
          <button class="button dark" type="submit">${t("createAccount")}</button>
          <p class="notice" data-form-message>${auth.enabled ? t("ready") : t("supabaseDisabled")}</p>
        </form>
      </div>
    `,
  });
}
