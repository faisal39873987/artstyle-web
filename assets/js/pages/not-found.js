import { t } from "../app/i18n.js";
import { pageShell } from "../components/shell.js";

export function notFoundPage() {
  return pageShell({
    title: t("notFoundTitle"),
    lead: t("notFoundLead"),
    eyebrow: "404",
    body: `<div class="empty-state"><a class="button dark" href="/" data-link>${t("navHome")}</a></div>`,
  });
}
