import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://asplwsmyacuttbdjtgbk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SmtqOqSeFObxgMypSsqYKg_TbwUrfq5";
const SUPPORT_EMAIL = "opensea3987@gmail.com";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});

const fallbackApps = [
  {
    slug: "arcadiax",
    name: "ArcadiaX",
    category: "Arcade",
    tagline: "Retro-inspired arcade collection with clear store access.",
    summary: "Android production app and iOS review candidate for arcade content.",
    audience: "Retro arcade players",
    releases: [
      { platform: "android", package_identifier: "com.comixzone.game", release_status: "production", install_audience: 51, last_updated_on: "2026-05-10" },
      { platform: "ios", store_display_name: "ARCADIAX2", version: "1.0", release_status: "waiting_for_review" },
    ],
  },
  {
    slug: "nanny-abu-dhabi",
    name: "Nanny Abu Dhabi",
    category: "Social",
    tagline: "Find trusted nannies and caregivers in Abu Dhabi.",
    summary: "Caregiver discovery app with iOS submission and Android closed testing.",
    audience: "Families and caregivers",
    logo_path: "/logo/nanny_logo.png",
    media: ["/nanny_1.png", "/images/nanny_2.png"],
    releases: [
      { platform: "android", package_identifier: "com.nannyfinder", release_status: "closed_testing", install_audience: 2, last_updated_on: "2026-04-30" },
      { platform: "ios", store_display_name: "Nanny Abu Dhabi", version: "1.0.2", release_status: "prepare_for_submission" },
    ],
  },
  {
    slug: "polarvault-x",
    name: "PolarVault X",
    category: "Utilities",
    tagline: "Secure and private digital vault for files and data.",
    summary: "iOS app ready for distribution with privacy-first positioning.",
    audience: "Private file storage users",
    logo_path: "/images/polar_logo.png",
    media: ["/images/polar_1.png", "/images/polar_2.png"],
    releases: [{ platform: "ios", version: "1.0", release_status: "ready_for_distribution" }],
  },
  {
    slug: "snake-modern-game",
    name: "Snake Modern Game",
    category: "Arcade",
    tagline: "Classic snake reimagined with modern graphics and gameplay.",
    summary: "Production Android app and iOS ready-for-distribution game.",
    audience: "Casual arcade players",
    logo_path: "/images/snake_logo.png",
    media: ["/images/snake_1.png", "/images/snake_2.png"],
    releases: [
      { platform: "android", package_identifier: "com.artstyle.snake", release_status: "production", install_audience: 3, last_updated_on: "2026-04-23" },
      { platform: "ios", version: "1.0.1 (7)", release_status: "ready_for_distribution" },
    ],
  },
  {
    slug: "cube-stack-heroes",
    name: "CUBE STACK HEROES",
    category: "Arcade",
    tagline: "Stack cubes, build towers, and chase a clean high score loop.",
    summary: "iOS ready-for-distribution arcade game.",
    audience: "Puzzle and arcade players",
    logo_path: "/images/cube_logo.png",
    media: ["/images/cube_1.png", "/images/cube_2.png"],
    releases: [{ platform: "ios", version: "1.0", release_status: "ready_for_distribution" }],
  },
  {
    slug: "bricknova",
    name: "bricknova",
    category: "Classic",
    tagline: "Timeless brick-breaking action with explosive power-ups.",
    summary: "Production Android app and iOS ready-for-distribution game.",
    audience: "Brick breaker fans",
    logo_path: "/images/brick_logo.png",
    media: ["/images/brick_1.png", "/images/brick_2.png"],
    releases: [
      { platform: "android", package_identifier: "com.bricknova.game", release_status: "production", install_audience: 1, last_updated_on: "2026-04-27" },
      { platform: "ios", version: "1.0.1", release_status: "ready_for_distribution" },
    ],
  },
  {
    slug: "run-with-us",
    name: "Run With Us",
    category: "Social",
    tagline: "Social running app to track and compete with friends.",
    summary: "iOS ready-for-distribution app and Android closed testing app.",
    audience: "Runners and friend groups",
    logo_path: "/images/run_logo.png",
    media: ["/images/run_1.png", "/images/run_2.png"],
    releases: [
      { platform: "android", package_identifier: "com.runwithus.app", release_status: "closed_testing", install_audience: 1, last_updated_on: "2026-04-19" },
      { platform: "ios", version: "1.0.1", release_status: "ready_for_distribution" },
    ],
  },
  {
    slug: "reemverse",
    name: "ReemVerse",
    category: "Social",
    tagline: "Community app for connecting, sharing, and exploring.",
    summary: "iOS app preparing for submission. Missing source assets need replacement.",
    audience: "Community users",
    releases: [{ platform: "ios", version: "1.0", release_status: "prepare_for_submission" }],
  },
];

const team = [
  ["Faisal", "Product Owner", "FA", "Owns app direction, store publishing, approvals, and final product calls."],
  ["UI/UX Designer", "Design Lead", "UX", "Owns Figma, page structure, visual hierarchy, white-background polish, and flow."],
  ["Flutter Frontend Engineer", "Current Priority", "FL", "Owns onboarding, routing, widgets, responsive UI, and Supabase integration."],
  ["Frontend Architect", "App Flow", "AR", "Owns providers, state management, navigation contracts, performance, and scalability."],
  ["Backend Developer", "Supabase", "BE", "Owns Auth, database, APIs, RLS, storage, emails, and deployment checks."],
];

const plan = [
  ["Now", "Stabilize public web portal", "Use app-owned assets, keep unverified ROM files private, and publish a clean catalog experience."],
  ["Backend", "Apply Supabase migrations", "Run SQL migrations on the hosted project, seed apps, enable RLS, configure buckets, and deploy suggestions."],
  ["Frontend", "Recover Flutter source", "Move catalog, login, detail pages, suggestions, and visitor flow into Flutter source when lib/pubspec are available."],
  ["Release", "Vercel and store alignment", "Connect GitHub to Vercel, set environment variables, test mobile layouts, and verify store links."],
];

let state = { apps: fallbackApps, source: "local", category: "All", query: "" };
const view = document.querySelector("#view");

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function normalizeApp(app) {
  return {
    ...app,
    releases: app.app_releases || app.releases || [],
    media:
      app.app_media?.filter((item) => item.path).sort((a, b) => (a.sort_order || 100) - (b.sort_order || 100)).map((item) => item.path) ||
      app.media ||
      [],
  };
}

function normalizeStatus(status = "") {
  return status.replaceAll("_", " ");
}

function statusClass(status = "") {
  if (["production", "ready_for_distribution"].includes(status)) return "green";
  if (["waiting_for_review", "prepare_for_submission", "closed_testing"].includes(status)) return "amber";
  return "";
}

function appLogo(app) {
  return app.logo_path || app.media?.find((path) => path.includes("logo"));
}

function appHero(app) {
  return app.media?.find((path) => !path.includes("logo")) || app.hero_image_path || appLogo(app);
}

function categories() {
  return ["All", ...new Set(state.apps.map((app) => app.category).filter(Boolean))];
}

function filteredApps() {
  return state.apps.filter((app) => {
    const matchesCategory = state.category === "All" || app.category === state.category;
    const blob = `${app.name} ${app.category} ${app.tagline} ${app.summary}`.toLowerCase();
    return matchesCategory && (!state.query || blob.includes(state.query.toLowerCase()));
  });
}

async function loadApps() {
  const { data, error } = await supabase
    .from("apps")
    .select("*, app_releases(*), app_media(*), app_page_sections(*), app_download_links(*)")
    .order("sort_order", { ascending: true });

  if (!error && Array.isArray(data) && data.length) {
    state.apps = data.map(normalizeApp);
    state.source = "supabase";
  } else {
    state.apps = fallbackApps.map(normalizeApp);
    state.source = "local";
  }
}

function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll("[data-link]").forEach((link) => {
    const href = link.getAttribute("href");
    const active = href === "/" ? path === "/" : path.startsWith(href);
    link.toggleAttribute("aria-current", active);
  });
}

function renderHome() {
  const apps = filteredApps();
  const showcase = state.apps.filter((app) => appHero(app)).slice(0, 4);
  view.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">${state.source === "supabase" ? "Live Supabase catalog" : "Local preview catalog"}</p>
        <h1>Art Style Apps</h1>
        <p class="hero-copy">A clean product library for the app portfolio: pages, screenshots, release status, optional sign-in, visitor suggestions, and a safe path for reviewed playable files.</p>
        <div class="hero-actions">
          <a class="button primary" href="#apps">View Apps</a>
          <a class="button" href="/team" data-link>Team Plan</a>
          <a class="button subtle" href="/backend" data-link>Backend Status</a>
        </div>
      </div>
      <div class="showcase">
        ${showcase
          .map(
            (app) => `
              <a class="showcase-tile" href="/apps/${esc(app.slug)}" data-link>
                <img src="${esc(appHero(app))}" alt="${esc(app.name)}" loading="lazy" />
              </a>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="section" id="apps">
      <div class="section-header">
        <div>
          <h2>Applications</h2>
          <p>Each app gets a dedicated page with store state, screenshots, use flow, support, and download readiness.</p>
        </div>
      </div>
      <div class="toolbar">
        <input class="search" type="search" placeholder="Search apps" value="${esc(state.query)}" data-search />
        <div class="segmented" role="group" aria-label="Category filter">
          ${categories().map((category) => `<button type="button" aria-pressed="${state.category === category}" data-category="${esc(category)}">${esc(category)}</button>`).join("")}
        </div>
      </div>
      <div class="grid">${apps.map(renderAppCard).join("") || `<div class="empty">No apps match this filter.</div>`}</div>
    </section>
    <section class="section">
      <div class="split">
        <div class="panel">
          <h3>Guest Path</h3>
          <p>Visitors can browse apps and send suggestions. Google and Apple sign-in are optional for saved state, favorites, team tools, and testing access.</p>
        </div>
        <div class="panel">
          <h3>Arcade Safety</h3>
          <p>ROM files and unverified covers stay out of the public tree. Only owned, licensed, public-domain, or user-provided files should become playable.</p>
        </div>
      </div>
    </section>
  `;
  bindHomeEvents();
}

function renderAppCard(app) {
  const firstStatus = app.releases[0]?.release_status || "planned";
  const logo = appLogo(app);
  return `
    <article class="card app-card">
      <a class="app-card-media" href="/apps/${esc(app.slug)}" data-link aria-label="${esc(app.name)}">
        ${
          logo
            ? `<img class="app-card-logo" src="${esc(logo)}" alt="${esc(app.name)} logo" loading="lazy" />`
            : `<div class="placeholder-art">${esc(initials(app.name))}</div>`
        }
      </a>
      <div class="app-card-body">
        <div class="meta">
          <span class="pill">${esc(app.category)}</span>
          <span class="pill ${statusClass(firstStatus)}">${esc(normalizeStatus(firstStatus))}</span>
        </div>
        <h3>${esc(app.name)}</h3>
        <p>${esc(app.summary || app.tagline || "")}</p>
        <a class="button" href="/apps/${esc(app.slug)}" data-link>Open</a>
      </div>
    </article>
  `;
}

function renderDetail(slug) {
  const app = state.apps.find((item) => item.slug === slug);
  if (!app) {
    view.innerHTML = `<section class="section"><div class="empty">App not found.</div></section>`;
    return;
  }
  const logo = appLogo(app);
  const media = app.media.filter((path) => path !== logo).slice(0, 4);
  view.innerHTML = `
    <section class="detail-hero">
      <div>
        ${logo ? `<img class="detail-logo" src="${esc(logo)}" alt="${esc(app.name)} logo" />` : ""}
        <p class="eyebrow">${esc(app.category)}</p>
        <h1>${esc(app.name)}</h1>
        <p class="hero-copy">${esc(app.tagline || app.summary || "")}</p>
        <div class="hero-actions">
          <a class="button primary" href="#suggest">Send Suggestion</a>
          <a class="button" href="/" data-link>All Apps</a>
        </div>
      </div>
      <div class="detail-media">
        ${
          media.length
            ? media.map((path) => `<img src="${esc(path)}" alt="${esc(app.name)} screenshot" loading="lazy" />`).join("")
            : `<div class="placeholder-art">${esc(initials(app.name))}</div>`
        }
      </div>
    </section>
    <section class="section">
      <div class="info-list">
        <div class="info-item"><strong>Audience</strong><span>${esc(app.audience || "Visitors")}</span></div>
        <div class="info-item"><strong>Platforms</strong><span>${esc([...new Set(app.releases.map((release) => release.platform))].join(", ") || "Planned")}</span></div>
        <div class="info-item"><strong>Support</strong><span>${SUPPORT_EMAIL}</span></div>
      </div>
    </section>
    <section class="section">
      <div class="split">
        <div class="stack">
          <div class="panel"><h3>Overview</h3><p>${esc(app.description || app.summary || app.tagline || "")}</p></div>
          <div class="panel"><h3>How it works</h3><p>${esc(app.name)} opens with the main app flow, then guides visitors to install, test, or send feedback depending on platform readiness.</p></div>
          <div class="panel">
            <h3>Release Status</h3>
            <div class="stack">
              ${
                app.releases
                  .map(
                    (release) => `
                      <div class="status-box">
                        <strong>${esc(release.platform)}</strong>
                        ${esc(normalizeStatus(release.release_status))}
                        ${release.version ? ` · v${esc(release.version)}` : ""}
                        ${release.install_audience ? ` · ${esc(release.install_audience)} audience` : ""}
                      </div>
                    `,
                  )
                  .join("") || `<div class="status-box">No release rows yet.</div>`
              }
            </div>
          </div>
        </div>
        ${renderSuggestionPanel(app)}
      </div>
    </section>
  `;
  bindSuggestionForm(app);
}

function renderSuggestionPanel(app) {
  return `
    <aside class="panel" id="suggest">
      <h3>Suggestions</h3>
      <form class="form" data-suggestion-form>
        <div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" /></div>
        <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" /></div>
        <div class="field">
          <label for="kind">Type</label>
          <select id="kind" name="kind">
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="design">Design</option>
            <option value="store">Store</option>
            <option value="support">Support</option>
          </select>
        </div>
        <div class="field"><label for="message">Message</label><textarea id="message" name="message" required minlength="3"></textarea></div>
        <button class="button primary" type="submit">Send</button>
        <div class="status-box" data-form-status>Suggestions route to ${SUPPORT_EMAIL} after backend deployment.</div>
      </form>
    </aside>
  `;
}

function renderTeam() {
  view.innerHTML = `
    <section class="section"><div class="page-title"><p class="eyebrow">Working team</p><h2>Senior build crew</h2><p>The immediate priority is Flutter frontend flow, backed by Supabase and a clean design system.</p></div></section>
    <section class="section">
      <div class="team-grid">
        ${team
          .map(
            ([name, title, mark, body]) => `
              <article class="card member">
                <div class="avatar">${esc(mark)}</div>
                <h3>${esc(name)}</h3>
                <p><strong>${esc(title)}</strong></p>
                <p>${esc(body)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderPlan() {
  view.innerHTML = `
    <section class="section"><div class="page-title"><p class="eyebrow">Round two</p><h2>Execution plan</h2><p>Backend, design, frontend, and deployment move together. The public web portal is now the preview surface.</p></div></section>
    <section class="section">
      <div class="timeline">
        ${plan
          .map(
            ([date, title, body]) => `
              <article class="timeline-item"><time>${esc(date)}</time><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

async function renderBackend() {
  view.innerHTML = `
    <section class="section"><div class="page-title"><p class="eyebrow">Supabase</p><h2>Backend status</h2><p>The frontend has the project URL and publishable key. Hosted schema deployment needs SQL access through Supabase CLI or dashboard SQL editor.</p></div></section>
    <section class="section">
      <div class="split">
        <div class="panel"><h3>Live check</h3><div class="status-box" data-health>Checking Supabase API...</div></div>
        <div class="panel"><h3>Required credentials</h3><p>Publishable keys are for browsers. Secret keys are server-side API keys. Applying migrations still needs a database password, connection string, or Supabase access token plus DB password.</p></div>
      </div>
    </section>
  `;
  const health = view.querySelector("[data-health]");
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    health.className = `status-box ${data.ok ? "success" : "error"}`;
    health.textContent = data.message;
  } catch {
    health.className = "status-box error";
    health.textContent = "Health API is not available in this environment.";
  }
}

function bindHomeEvents() {
  view.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderHome();
  });
  view.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderHome();
    });
  });
}

function bindSuggestionForm(app) {
  const form = view.querySelector("[data-suggestion-form]");
  const status = view.querySelector("[data-form-status]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      app_slug: app.slug,
      app_name: app.name,
      name: formData.get("name")?.toString().trim() || null,
      email: formData.get("email")?.toString().trim() || null,
      kind: formData.get("kind")?.toString() || "feature",
      subject: `${app.name} suggestion`,
      message: formData.get("message")?.toString().trim(),
      source_url: window.location.href,
    };
    if (!payload.message || payload.message.length < 3) {
      status.className = "status-box error";
      status.textContent = "Message is too short.";
      return;
    }
    status.className = "status-box";
    status.textContent = "Sending...";
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Suggestion API failed");
      status.className = "status-box success";
      status.textContent = data.message || "Suggestion received.";
      form.reset();
    } catch {
      const mailto = new URL(`mailto:${SUPPORT_EMAIL}`);
      mailto.searchParams.set("subject", payload.subject);
      mailto.searchParams.set("body", [`App: ${payload.app_name}`, `Type: ${payload.kind}`, `From: ${payload.name || "Guest"} ${payload.email || ""}`, "", payload.message].join("\n"));
      status.className = "status-box error";
      status.innerHTML = `Backend is not deployed yet. <a href="${mailto.toString()}">Open email draft</a>.`;
    }
  });
}

async function signIn(provider) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin },
  });
  if (error) window.alert(error.message);
}

function route() {
  setActiveNav();
  const path = window.location.pathname;
  if (path.startsWith("/apps/")) renderDetail(path.split("/").filter(Boolean)[1]);
  else if (path === "/team") renderTeam();
  else if (path === "/plan") renderPlan();
  else if (path === "/backend") renderBackend();
  else renderHome();
  view.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");
  if (!link || link.origin !== window.location.origin) return;
  event.preventDefault();
  history.pushState({}, "", link.href);
  route();
});

document.querySelectorAll("[data-auth]").forEach((button) => {
  button.addEventListener("click", () => signIn(button.dataset.auth));
});
window.addEventListener("popstate", route);

await loadApps();
route();
