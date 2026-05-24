import { EMULATOR_CDN, EMULATOR_CORES } from "../data/emulator.js";
import { PRIVATE_ROOM_GAMES, ROOM_KEYBOARD_MAP, ROOM_ROM_INVENTORY, ROOM_SYSTEMS } from "../data/playroom.js";
import { localize, t } from "../app/i18n.js";
import { escapeHtml } from "../utils/html.js";
import { pageShell } from "../components/shell.js";
import { getPlayroomStatus, hasPlayroomHostedRom } from "../services/playroom.js";

function coreOption(core, selectedCore) {
  return `<option value="${escapeHtml(core.id)}" data-accept="${escapeHtml(core.accept)}" ${core.id === selectedCore ? "selected" : ""}>${escapeHtml(core.name)}</option>`;
}

function roomImage(src, alt) {
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />`;
}

function roomGate(status) {
  const codeField = status.hasLocalCode
    ? `
      <label class="field">
        <span>${t("playroomAccessCode")}</span>
        <input type="password" name="code" autocomplete="off" required />
      </label>
    `
    : "";

  return `
    <div class="form-shell playroom-gate">
      <form class="card form-card form-grid" data-playroom-gate>
        <h2>${t("playroomPrivateAccess")}</h2>
        <p class="notice">${t("playroomPrivateLead")}</p>
        ${codeField}
        <button class="button dark" type="submit">${t("playroomUnlock")}</button>
        <p class="notice" data-playroom-message>${status.privateStorageReady ? t("playroomPrivateStorageReady") : t("playroomStaticWarning")}</p>
      </form>
      <section class="card">
        <div class="card-body">
          <h2>${t("playroomInventoryTitle")}</h2>
          <div class="metric-grid">
            <div class="metric"><strong>${ROOM_ROM_INVENTORY.total}</strong><span>${t("playroomFoundRoms")}</span></div>
            <div class="metric"><strong>${ROOM_ROM_INVENTORY.approvedHosted}</strong><span>${t("playroomApprovedRoms")}</span></div>
            <div class="metric"><strong>${ROOM_ROM_INVENTORY.pendingApproval}</strong><span>${t("playroomPendingRoms")}</span></div>
          </div>
          <p class="notice">${t("playroomInventoryLead")}</p>
        </div>
      </section>
    </div>
  `;
}

function systemsPanel() {
  return `
    <section class="card">
      <div class="card-body">
        <h2>${t("playroomSystemsTitle")}</h2>
        <div class="playroom-system-grid">
          ${ROOM_SYSTEMS.map((system) => `
            <div class="metric ${system.ready ? "" : "is-muted"}">
              <strong>${system.count}</strong>
              <span>${escapeHtml(system.name)}</span>
            </div>
          `).join("")}
        </div>
        <p class="notice">${t("playroomSystemsLead")}</p>
      </div>
    </section>
  `;
}

function keyboardPanel() {
  return `
    <section class="card">
      <div class="card-body">
        <h2>${t("playroomKeyboardTitle")}</h2>
        <div class="keyboard-map">
          ${ROOM_KEYBOARD_MAP.map(([key, action]) => `
            <div>
              <kbd>${escapeHtml(key)}</kbd>
              <span>${escapeHtml(action)}</span>
            </div>
          `).join("")}
        </div>
        <p class="notice">${t("playroomKeyboardLead")}</p>
      </div>
    </section>
  `;
}

function gameButton(game, activeGame) {
  const hosted = hasPlayroomHostedRom(game);

  return `
    <button
      class="playroom-game-button ${game.id === activeGame.id ? "is-active" : ""}"
      type="button"
      data-room-game
      data-title="${escapeHtml(game.title)}"
      data-core="${escapeHtml(game.core)}"
      data-core-name="${escapeHtml(game.coreName)}"
      data-engine="${escapeHtml(game.engine)}"
      data-rom-url="${escapeHtml(game.romUrl || "")}"
      data-storage-bucket="${escapeHtml(game.storageBucket || "")}"
      data-storage-path="${escapeHtml(game.storagePath || "")}"
      data-cover="${escapeHtml(game.cover)}"
      data-status="${escapeHtml(localize(game.status))}"
      ${hosted ? "" : "disabled"}
    >
      <span>${roomImage(game.cover, game.title)}</span>
      <strong>${escapeHtml(game.title)}</strong>
      <small>${escapeHtml(game.coreName)}</small>
    </button>
  `;
}

function roomPlayer() {
  const activeGame = PRIVATE_ROOM_GAMES[0];

  return `
    <div
      class="playroom-layout"
      data-web-emulator
      data-title="${escapeHtml(activeGame.title)}"
      data-core="${escapeHtml(activeGame.core)}"
      data-engine="${escapeHtml(activeGame.engine)}"
      data-rom-url="${escapeHtml(activeGame.romUrl || "")}"
      data-storage-bucket="${escapeHtml(activeGame.storageBucket || "")}"
      data-storage-path="${escapeHtml(activeGame.storagePath || "")}"
      data-cover="${escapeHtml(activeGame.cover)}"
      data-loader-url="${escapeHtml(EMULATOR_CDN.loaderUrl)}"
      data-data-path="${escapeHtml(EMULATOR_CDN.dataPath)}"
      data-jsnes-url="${escapeHtml(EMULATOR_CDN.jsnesUrl)}"
    >
      <section class="arcade-player-card web-player-card playroom-stage-card">
        <div class="web-player-toolbar">
          <span class="pill" data-room-active-core>${escapeHtml(activeGame.coreName)}</span>
          <span class="pill">${t("playroomPrivateBadge")}</span>
          <span class="pill" data-room-active-title>${escapeHtml(activeGame.title)}</span>
        </div>
        <div class="web-emulator-stage playroom-stage" data-emulator-stage>
          <iframe
            class="web-emulator-frame"
            data-emulator-frame
            title="${escapeHtml(t("emulatorFrameTitle"))}"
            allow="autoplay; fullscreen; gamepad"
            allowfullscreen
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-downloads"
          ></iframe>
          <div class="web-player-empty" data-player-empty>
            ${roomImage(activeGame.cover, activeGame.title)}
            <div class="web-player-empty-content">
              <p class="eyebrow">${t("playroomPrivateBadge")}</p>
              <h2 data-room-empty-title>${escapeHtml(activeGame.title)}</h2>
              <p data-room-empty-status>${escapeHtml(localize(activeGame.status))}</p>
            </div>
          </div>
        </div>
        <div class="arcade-player-actions">
          <button class="button dark" type="button" data-player-start-hosted>${t("emulatorHostedStart")}</button>
          <button class="button ghost" type="button" data-player-focus>${t("playroomFocusGame")}</button>
          <button class="button ghost" type="button" data-player-fullscreen>${t("fullscreen")}</button>
          <button class="button ghost" type="button" data-player-reset>${t("emulatorReset")}</button>
          <button class="button ghost" type="button" data-playroom-lock>${t("playroomLock")}</button>
        </div>
        <p class="web-player-status" data-player-status>${escapeHtml(localize(activeGame.status))}</p>
      </section>

      <aside class="playroom-sidebar">
        <section class="card">
          <div class="card-body">
            <h2>${t("playroomHostedTitle")}</h2>
            <div class="playroom-game-list">
              ${PRIVATE_ROOM_GAMES.map((game) => gameButton(game, activeGame)).join("")}
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-body">
            <h2>${t("emulatorBringFile")}</h2>
            <div class="web-player-controls">
              <label class="field">
                <span>${t("emulatorCore")}</span>
                <select data-emulator-core>
                  ${EMULATOR_CORES.map((core) => coreOption(core, activeGame.core)).join("")}
                </select>
              </label>
              <label class="field">
                <span>${t("emulatorUploadRom")}</span>
                <input type="file" data-rom-file accept=".nes,.fds,.sfc,.smc,.fig,.gb,.gbc,.gba,.nds,.md,.gen,.smd,.bin,.zip" />
              </label>
              <button class="button dark" type="button" data-player-start-upload>${t("emulatorUploadStart")}</button>
            </div>
            <p class="notice">${t("playroomUploadLead")}</p>
          </div>
        </section>
      </aside>

      <section class="touch-controls playroom-touch" data-touch-controls aria-label="${escapeHtml(t("touchControlsTitle"))}">
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
      </section>
    </div>
  `;
}

export function playroomPage() {
  const status = getPlayroomStatus();
  return pageShell({
    title: t("playroomTitle"),
    lead: t("playroomLead"),
    eyebrow: t("playroomPrivateBadge"),
    body: status.unlocked
      ? `
        ${roomPlayer()}
        <div class="grid two playroom-support-grid">
          ${keyboardPanel()}
          ${systemsPanel()}
        </div>
      `
      : roomGate(status),
  });
}
