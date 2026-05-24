import { ARCADE_APPS, ARCADE_COLLECTIONS, ARCADE_FILTERS, ARCADE_GAMES } from "../data/arcade.js";
import { EMULATOR_CDN, EMULATOR_CORES, emulatorProfileForGame } from "../data/emulator.js";
import { localize, t } from "../app/i18n.js";
import { escapeHtml } from "../utils/html.js";
import { pageShell } from "../components/shell.js";

export function arcadePath(game) {
  return `/arcade/${game.id}`;
}

export function arcadePlayPath(game) {
  return `/arcade/play/${game.id}`;
}

export function findArcadeGame(slug) {
  return ARCADE_GAMES.find((game) => game.id === slug);
}

function arcadeImage(src, alt) {
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />`;
}

function option(value, label = value) {
  return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
}

function coreOption(core, selectedCore) {
  return `<option value="${escapeHtml(core.id)}" data-accept="${escapeHtml(core.accept)}" ${core.id === selectedCore ? "selected" : ""}>${escapeHtml(core.name)}</option>`;
}

function playStatus(game) {
  const profile = emulatorProfileForGame(game);
  if (!profile.supported) {
    return {
      id: "unsupported",
      label: t("emulatorUnsupported"),
      detail: t("emulatorUnsupportedLead"),
      profile,
    };
  }
  if (profile.romUrl) {
    return {
      id: "hosted",
      label: t("emulatorHostedReady"),
      detail: game.id === "art-style-demo" ? t("officialDemoNote") : t("emulatorHostedStart"),
      profile,
    };
  }
  return {
    id: "local",
    label: t("emulatorBringFile"),
    detail: t("emulatorUploadHint"),
    profile,
  };
}

function arcadePlayMetrics() {
  const metrics = ARCADE_GAMES.reduce((acc, game) => {
    acc[playStatus(game).id] += 1;
    return acc;
  }, { hosted: 0, local: 0, unsupported: 0 });

  return `
    <section class="arcade-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">${t("emulatorTitle")}</p>
          <h2>${t("arcadePlayReadinessTitle")}</h2>
        </div>
        <p>${t("arcadePlayReadinessLead")}</p>
      </div>
      <div class="metric-grid">
        <div class="metric">
          <strong>${metrics.hosted}</strong>
          <span>${t("emulatorHostedReady")}</span>
        </div>
        <div class="metric">
          <strong>${metrics.local}</strong>
          <span>${t("emulatorBringFile")}</span>
        </div>
        <div class="metric">
          <strong>${metrics.unsupported}</strong>
          <span>${t("emulatorUnsupported")}</span>
        </div>
      </div>
    </section>
  `;
}

function androidLinks() {
  return `
    <section class="arcade-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Android</p>
          <h2>${t("arcadeAppsTitle")}</h2>
        </div>
        <p>${t("arcadeAppsLead")}</p>
      </div>
      <div class="grid two">
        ${ARCADE_APPS.map((app) => `
          <article class="card">
            <div class="card-body">
              <div class="meta-row">
                <span class="pill">Android</span>
                <span class="pill">${localize(app.status)}</span>
              </div>
              <h3>${app.name}</h3>
              <p>${localize(app.description)}</p>
              <div class="card-actions">
                <a class="button dark" href="${app.androidUrl}" target="_blank" rel="noopener">${t("arcadeAndroidLinks")}</a>
                <a class="button ghost" href="/support" data-link>${t("support")}</a>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function arcadeTools() {
  return `
    <form class="catalog-tools" data-arcade-tools>
      <label class="field">
        <span>${t("searchLabel")}</span>
        <input type="search" name="search" placeholder="${t("searchPlaceholder")}" autocomplete="off" />
      </label>
      <label class="field">
        <span>${t("platformFilter")}</span>
        <select name="platform">
          <option value="">${t("all")}</option>
          ${ARCADE_FILTERS.platforms.map((item) => option(item)).join("")}
        </select>
      </label>
      <label class="field">
        <span>${t("arcadeCollectionFilter")}</span>
        <select name="collection">
          <option value="">${t("all")}</option>
          ${ARCADE_COLLECTIONS.map((item) => option(item.id, localize(item.name))).join("")}
        </select>
      </label>
      <label class="field">
        <span>${t("arcadePlayStatus")}</span>
        <select name="playStatus">
          <option value="">${t("all")}</option>
          ${option("hosted", t("emulatorHostedReady"))}
          ${option("local", t("emulatorBringFile"))}
          ${option("unsupported", t("emulatorUnsupported"))}
        </select>
      </label>
      <button class="button ghost" type="reset">${t("clearFilters")}</button>
    </form>
  `;
}

function arcadeCard(game) {
  const status = playStatus(game);

  return `
    <article
      class="card arcade-card"
      data-arcade-card
      data-platform="${escapeHtml(game.platform)}"
      data-collection="${escapeHtml(game.collectionId)}"
      data-play-status="${escapeHtml(status.id)}"
      data-search="${escapeHtml(game.searchText)}"
    >
      <a class="arcade-cover" href="${arcadePath(game)}" data-link>
        ${arcadeImage(game.cover, game.title)}
      </a>
      <div class="card-body">
        <div class="meta-row">
          <span class="pill">${escapeHtml(game.platform)}</span>
          <span class="pill">${localize(game.collection)}</span>
          <span class="pill">${escapeHtml(status.label)}</span>
        </div>
        <h3>${escapeHtml(game.title)}</h3>
        <p>${localize(game.genre)} · ${escapeHtml(status.profile.coreName)} · ${escapeHtml(status.detail)}</p>
        <div class="card-actions">
          <a class="button dark" href="${arcadePlayPath(game)}" data-link>${t("arcadePlayNow")}</a>
          <a class="button ghost" href="${arcadePath(game)}" data-link>${t("arcadeDetails")}</a>
        </div>
      </div>
    </article>
  `;
}

export function arcadePage() {
  return pageShell({
    title: t("arcadeTitle"),
    lead: t("arcadeLead"),
    eyebrow: "Arcade",
    body: `
      ${androidLinks()}
      ${arcadePlayMetrics()}
      <section class="arcade-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">${ARCADE_GAMES.length} ${t("products")}</p>
            <h2>${t("arcadeCollectionsTitle")}</h2>
          </div>
          <p>${t("arcadeLicensedOnly")}</p>
        </div>
        <div class="metric-grid">
          ${ARCADE_COLLECTIONS.map((collection) => `
            <div class="metric">
              <strong>${collection.count}</strong>
              <span>${localize(collection.name)} · ${collection.platform}</span>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="arcade-panel">
        ${arcadeTools()}
        <div class="catalog-summary" aria-live="polite">
          <strong data-arcade-count>${ARCADE_GAMES.length}</strong>
          <span>${t("visibleProducts")}</span>
        </div>
        <div class="arcade-grid" data-arcade-grid>${ARCADE_GAMES.map(arcadeCard).join("")}</div>
        <div class="empty-state" data-arcade-empty hidden>${t("noResults")}</div>
      </section>
    `,
  });
}

export function arcadeDetailPage(game) {
  const app = ARCADE_APPS.find((item) => item.id === game.androidApp) || ARCADE_APPS[0];
  const status = playStatus(game);

  return pageShell({
    title: game.title,
    lead: `${localize(game.collection)} · ${game.platform} · ${localize(game.genre)} · ${status.profile.coreName}`,
    eyebrow: t("arcadeDetails"),
    body: `
      <div class="detail-layout">
        <div>
          <div class="meta-row">
            <span class="pill">${escapeHtml(game.platform)}</span>
            <span class="pill">${localize(game.collection)}</span>
            <span class="pill">${escapeHtml(status.label)}</span>
          </div>
          <h2>${t("emulatorReadyTitle")}</h2>
          <p class="lead">${status.detail}</p>
          <ul class="feature-list">
            <li><span class="number-badge">01</span><div><strong>${t("arcadeControls")}</strong><p>${t("emulatorControlsLead")}</p></div></li>
            <li><span class="number-badge">02</span><div><strong>${t("arcadeLicensedOnly")}</strong><p>${t("emulatorRightsNote")}</p></div></li>
            <li><span class="number-badge">03</span><div><strong>${app.name}</strong><p>${localize(app.description)}</p></div></li>
          </ul>
          <div class="section-actions">
            <a class="button dark" href="${arcadePlayPath(game)}" data-link>${t("arcadePlayNow")}</a>
            <a class="button ghost" href="${app.androidUrl}" target="_blank" rel="noopener">Android</a>
            <a class="button ghost" href="/arcade" data-link>${t("back")}</a>
          </div>
        </div>
        <div class="gallery">
          <div class="gallery-main arcade-detail-cover">
            ${arcadeImage(game.cover, game.title)}
          </div>
        </div>
      </div>
    `,
  });
}

export function arcadePlayPage(game) {
  const profile = emulatorProfileForGame(game);
  const hostedDisabled = !profile.supported || !profile.romUrl ? "disabled" : "";
  const uploadDisabled = !profile.supported ? "disabled" : "";
  const statusText = !profile.supported
    ? t("emulatorUnsupportedLead")
    : profile.romUrl
      ? t("officialDemoNote")
      : t("emulatorNoHosted");

  return pageShell({
    title: game.title,
    lead: profile.supported ? t("emulatorLead") : t("emulatorUnsupportedLead"),
    eyebrow: t("arcadePlayNow"),
    body: `
      <div class="arcade-player-layout web-player-layout">
        <section
          class="arcade-player-card web-player-card"
          data-web-emulator
          data-title="${escapeHtml(game.title)}"
          data-core="${escapeHtml(profile.core)}"
          data-engine="${escapeHtml(profile.engine)}"
          data-rom-url="${escapeHtml(profile.romUrl)}"
          data-bios-url="${escapeHtml(profile.biosUrl)}"
          data-parent-url="${escapeHtml(profile.parentUrl)}"
          data-cover="${escapeHtml(game.cover)}"
          data-loader-url="${escapeHtml(EMULATOR_CDN.loaderUrl)}"
          data-data-path="${escapeHtml(EMULATOR_CDN.dataPath)}"
          data-jsnes-url="${escapeHtml(EMULATOR_CDN.jsnesUrl)}"
        >
          <div class="web-player-toolbar">
            <span class="pill">${escapeHtml(profile.coreName)}</span>
            <span class="pill">${profile.romUrl ? t("emulatorHostedReady") : t("emulatorBringFile")}</span>
          </div>
          <div class="web-emulator-stage" data-emulator-stage>
            <iframe
              class="web-emulator-frame"
              data-emulator-frame
              title="${escapeHtml(t("emulatorFrameTitle"))}"
              allow="autoplay; fullscreen; gamepad"
              allowfullscreen
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-downloads"
            ></iframe>
            <div class="web-player-empty" data-player-empty>
              ${arcadeImage(game.cover, game.title)}
              <div class="web-player-empty-content">
                <p class="eyebrow">${t("emulatorTitle")}</p>
                <h2>${profile.supported ? t("emulatorReadyTitle") : t("emulatorUnsupported")}</h2>
                <p>${profile.supported ? t("emulatorUploadHint") : t("emulatorUnsupportedLead")}</p>
              </div>
            </div>
          </div>
          <div class="arcade-player-actions">
            <button class="button dark" type="button" data-player-start-hosted ${hostedDisabled}>${t("emulatorHostedStart")}</button>
            <button class="button ghost" type="button" data-player-fullscreen>${t("fullscreen")}</button>
            <button class="button ghost" type="button" data-player-reset ${uploadDisabled}>${t("emulatorReset")}</button>
          </div>
          <div class="touch-controls" data-touch-controls aria-label="${escapeHtml(t("touchControlsTitle"))}">
            <div class="touch-dpad" aria-label="${escapeHtml(t("touchDpad"))}">
              <button class="touch-button touch-up" type="button" data-touch-key="ArrowUp" aria-label="${escapeHtml(t("touchDpad"))} up">↑</button>
              <button class="touch-button touch-left" type="button" data-touch-key="ArrowLeft" aria-label="${escapeHtml(t("touchDpad"))} left">←</button>
              <button class="touch-button touch-right" type="button" data-touch-key="ArrowRight" aria-label="${escapeHtml(t("touchDpad"))} right">→</button>
              <button class="touch-button touch-down" type="button" data-touch-key="ArrowDown" aria-label="${escapeHtml(t("touchDpad"))} down">↓</button>
            </div>
            <div class="touch-actions" aria-label="${escapeHtml(t("arcadeControls"))}">
              <button class="touch-button touch-action" type="button" data-touch-key="z" aria-label="${escapeHtml(t("touchActionA"))}">A</button>
              <button class="touch-button touch-action" type="button" data-touch-key="x" aria-label="${escapeHtml(t("touchActionB"))}">B</button>
              <button class="touch-button touch-wide" type="button" data-touch-key="Enter" aria-label="${escapeHtml(t("touchStart"))}">${t("touchStart")}</button>
              <button class="touch-button touch-wide" type="button" data-touch-key="Control" aria-label="${escapeHtml(t("touchSelect"))}">${t("touchSelect")}</button>
            </div>
          </div>
          <p class="web-player-status" data-player-status>${escapeHtml(statusText)}</p>
        </section>
        <aside class="card">
          <div class="card-body">
            <h2>${t("emulatorReadyTitle")}</h2>
            <div class="web-player-controls">
              <label class="field">
                <span>${t("emulatorCore")}</span>
                <select data-emulator-core ${uploadDisabled}>
                  ${EMULATOR_CORES.map((core) => coreOption(core, profile.core)).join("")}
                </select>
              </label>
              <label class="field">
                <span>${t("emulatorUploadRom")}</span>
                <input type="file" data-rom-file accept="${escapeHtml(profile.accept)}" ${uploadDisabled} />
              </label>
              <button class="button dark" type="button" data-player-start-upload ${uploadDisabled}>${t("emulatorUploadStart")}</button>
            </div>
            <ul class="feature-list">
              <li><span class="number-badge">1</span><div><strong>${t("arcadeControls")}</strong><p>${t("emulatorControlsLead")}</p></div></li>
              <li><span class="number-badge">2</span><div><strong>${t("arcadeLicensedOnly")}</strong><p>${t("emulatorRightsNote")}</p></div></li>
              <li><span class="number-badge">3</span><div><strong>${t("touchControlsTitle")}</strong><p>${t("touchControlsLead")}</p></div></li>
              <li><span class="number-badge">4</span><div><strong>${t("gamepadTitle")}</strong><p>${t("gamepadLead")}</p></div></li>
            </ul>
            <div class="section-actions">
              <a class="button ghost" href="${arcadePath(game)}" data-link>${t("arcadeDetails")}</a>
              <a class="button ghost" href="/arcade" data-link>${t("back")}</a>
            </div>
          </div>
        </aside>
      </div>
    `,
  });
}
