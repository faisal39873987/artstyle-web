import { t } from "../app/i18n.js";
import { getAuthStatus, signInWithEmail, signUpWithEmail } from "../services/auth.js";

export function field({ label, name, type = "text", autocomplete = "", textarea = false, options = [] }) {
  const control = textarea
    ? `<textarea name="${name}" required></textarea>`
    : options.length
      ? `<select name="${name}">${options.map((item) => `<option>${item}</option>`).join("")}</select>`
      : `<input type="${type}" name="${name}" autocomplete="${autocomplete}" required />`;

  return `
    <label class="field">
      <span>${label}</span>
      ${control}
    </label>
  `;
}

function setFormMessage(form, text, state = "") {
  const message = form.querySelector("[data-form-message]");
  if (!message) return;
  message.textContent = text;
  message.classList.toggle("danger", state === "error");
  message.classList.toggle("success", state === "success");
}

function redirectAfterAuth() {
  const next = new URL(window.location.href).searchParams.get("next");
  const target = next?.startsWith("/") ? next : getAuthStatus().redirectPath || "/dashboard";
  history.pushState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function handleAuthSubmit(form) {
  const mode = form.dataset.form;
  const data = new FormData(form);
  const email = String(data.get("email") || "").trim();
  const password = String(data.get("password") || "");
  const submit = form.querySelector("button[type='submit']");

  if (submit instanceof HTMLButtonElement) submit.disabled = true;
  setFormMessage(form, t("authWorking"));

  let result;
  try {
    result = mode === "register"
      ? await signUpWithEmail(email, password, { name: String(data.get("name") || "").trim() })
      : await signInWithEmail(email, password);
  } catch {
    result = {
      ok: false,
      messageKey: "authFailed",
    };
  }

  if (submit instanceof HTMLButtonElement) submit.disabled = false;

  if (!result.ok) {
    setFormMessage(form, result.messageKey ? t(result.messageKey) : result.message || t("authFailed"), "error");
    return;
  }

  if (mode === "register" && !result.data?.session) {
    setFormMessage(form, t("authAccountCreated"), "success");
    form.reset();
    return;
  }

  setFormMessage(form, t("authSignedIn"), "success");
  form.reset();
  redirectAfterAuth();
}

export async function handleDemoSubmit(event) {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();

  if (form.dataset.form === "login" || form.dataset.form === "register") {
    await handleAuthSubmit(form);
    return;
  }

  setFormMessage(form, t("formDone"), "success");
  form.reset();
}
