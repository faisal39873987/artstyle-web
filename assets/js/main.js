import { PUBLIC_ENV } from "../../config/public-env.js";
import { applyLanguageToDocument, t } from "./app/i18n.js";
import { closeMenu, navigate, render, startRouter } from "./app/router.js";
import { toggleLanguage, toggleTheme } from "./app/store.js";
import { handleDemoSubmit } from "./components/forms.js";
import { getAuthStatus, signOut } from "./services/auth.js";
import { lockPlayroom, resolvePlayroomRomUrl, unlockPlayroom } from "./services/playroom.js";

function targetElement(event) {
  return event.target instanceof Element ? event.target : null;
}

function linkTarget(link) {
  const url = new URL(link.href, window.location.href);
  return `${url.pathname}${url.search}${url.hash}`;
}

function shouldHandleLink(link) {
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return false;
  const url = new URL(link.href, window.location.href);
  return url.origin === window.location.origin;
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const target = targetElement(event);
    const link = target?.closest("a[data-link]");
    if (!shouldHandleLink(link)) return;
    event.preventDefault();
    navigate(linkTarget(link));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function bindControls() {
  const menuButton = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open") || false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    toggleTheme();
    applyLanguageToDocument();
    render();
  });

  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    toggleLanguage();
    render();
  });

  document.addEventListener("submit", handleDemoSubmit);
}

function updateCatalog(form) {
  const root = form.closest("section") || document;
  const search = form.querySelector("[data-catalog-search]")?.value.trim().toLowerCase() || "";
  const platform = form.elements.platform?.value || "";
  const category = form.elements.category?.value || "";
  const status = form.elements.status?.value || "";
  let visible = 0;

  root.querySelectorAll("[data-product-card]").forEach((card) => {
    const textMatch = !search || card.dataset.search.includes(search);
    const platformMatch = !platform || card.dataset.platforms.split(" ").includes(platform);
    const categoryMatch = !category || card.dataset.category === category;
    const statusMatch = !status || card.dataset.status === status;
    const show = textMatch && platformMatch && categoryMatch && statusMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  const count = root.querySelector("[data-catalog-count]");
  const empty = root.querySelector("[data-catalog-empty]");
  if (count) count.textContent = String(visible);
  if (empty) empty.hidden = visible > 0;
}

function bindCatalog() {
  document.addEventListener("input", (event) => {
    const form = targetElement(event)?.closest("[data-catalog-tools]");
    if (form) updateCatalog(form);
  });

  document.addEventListener("change", (event) => {
    const form = targetElement(event)?.closest("[data-catalog-tools]");
    if (form) updateCatalog(form);
  });

  document.addEventListener("reset", (event) => {
    const form = targetElement(event)?.closest("[data-catalog-tools]");
    if (form) window.requestAnimationFrame(() => updateCatalog(form));
  });
}

function updateArcade(form) {
  const root = form.closest("section") || document;
  const search = form.elements.search?.value.trim().toLowerCase() || "";
  const platform = form.elements.platform?.value || "";
  const collection = form.elements.collection?.value || "";
  const playStatus = form.elements.playStatus?.value || "";
  let visible = 0;

  root.querySelectorAll("[data-arcade-card]").forEach((card) => {
    const textMatch = !search || card.dataset.search.includes(search);
    const platformMatch = !platform || card.dataset.platform === platform;
    const collectionMatch = !collection || card.dataset.collection === collection;
    const playStatusMatch = !playStatus || card.dataset.playStatus === playStatus;
    const show = textMatch && platformMatch && collectionMatch && playStatusMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  const count = root.querySelector("[data-arcade-count]");
  const empty = root.querySelector("[data-arcade-empty]");
  if (count) count.textContent = String(visible);
  if (empty) empty.hidden = visible > 0;
}

function bindArcadeFilters() {
  document.addEventListener("input", (event) => {
    const form = targetElement(event)?.closest("[data-arcade-tools]");
    if (form) updateArcade(form);
  });

  document.addEventListener("change", (event) => {
    const form = targetElement(event)?.closest("[data-arcade-tools]");
    if (form) updateArcade(form);
  });

  document.addEventListener("reset", (event) => {
    const form = targetElement(event)?.closest("[data-arcade-tools]");
    if (form) window.requestAnimationFrame(() => updateArcade(form));
  });
}

function bindPlayroom() {
  document.addEventListener("submit", (event) => {
    const form = targetElement(event)?.closest("[data-playroom-gate]");
    if (!form) return;
    event.preventDefault();

    const formData = new FormData(form);
    const message = form.querySelector("[data-playroom-message]");
    if (unlockPlayroom(formData.get("code"))) {
      if (message) message.textContent = t("playroomAccessGranted");
      render();
      return;
    }

    if (message) {
      message.textContent = t("playroomAccessDenied");
      message.classList.add("danger");
    }
  });

  document.addEventListener("click", (event) => {
    const button = targetElement(event)?.closest("[data-playroom-lock]");
    if (!button) return;

    if (getAuthStatus().enabled) {
      signOut().finally(() => navigate("/login"));
      return;
    }

    lockPlayroom();
    render();
  });
}

function bindAuthActions() {
  document.addEventListener("click", async (event) => {
    const button = targetElement(event)?.closest("[data-auth-signout]");
    if (!(button instanceof HTMLButtonElement)) return;

    const message = document.querySelector("[data-auth-message]");
    button.disabled = true;
    if (message) {
      message.textContent = t("authWorking");
      message.classList.remove("danger");
    }

    const result = await signOut().catch(() => ({ ok: false }));
    button.disabled = false;

    if (result.ok) {
      if (message) message.textContent = t("authSignedOut");
      navigate("/login");
      return;
    }

    if (message) {
      message.textContent = result.message || t("supabaseDisabled");
      message.classList.add("danger");
    }
  });
}

let arcadeController;
let webEmulatorController;
let webEmulatorObjectUrl;
let webEmulatorStatusTimer;

function initArcadePlayer() {
  arcadeController?.abort();
  arcadeController = undefined;

  const canvas = document.querySelector("[data-arcade-player]");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  arcadeController = new AbortController();
  const { signal } = arcadeController;
  const context = canvas.getContext("2d");
  const keys = new Set();
  const state = {
    x: 64,
    y: 64,
    targetX: 420,
    targetY: 260,
    score: 0,
    paused: false,
    pulse: 0,
  };

  function placeTarget() {
    state.targetX = 40 + Math.random() * (canvas.width - 80);
    state.targetY = 70 + Math.random() * (canvas.height - 110);
  }

  function drawText(text, x, y, size = 16) {
    context.font = `800 ${size}px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
    context.fillText(text, x, y);
  }

  function frame() {
    if (signal.aborted) return;
    const speed = keys.has("Shift") ? 5 : 3.2;
    if (!state.paused) {
      if (keys.has("ArrowLeft") || keys.has("a")) state.x -= speed;
      if (keys.has("ArrowRight") || keys.has("d")) state.x += speed;
      if (keys.has("ArrowUp") || keys.has("w")) state.y -= speed;
      if (keys.has("ArrowDown") || keys.has("s")) state.y += speed;
      state.x = Math.max(22, Math.min(canvas.width - 22, state.x));
      state.y = Math.max(58, Math.min(canvas.height - 22, state.y));
      state.pulse += 0.05;

      const distance = Math.hypot(state.x - state.targetX, state.y - state.targetY);
      if (distance < 28 || keys.has("z") || keys.has("x") || keys.has("Enter")) {
        if (distance < 44) {
          state.score += 1;
          placeTarget();
        }
      }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgba(255,255,255,0.08)";
    for (let x = 0; x < canvas.width; x += 32) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    for (let y = 0; y < canvas.height; y += 32) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    context.fillStyle = "#ffffff";
    drawText(canvas.dataset.title || "Arcade", 22, 34, 18);
    drawText(`Score ${state.score}`, canvas.width - 120, 34, 16);

    context.strokeStyle = "#7aa2ff";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(state.targetX, state.targetY, 14 + Math.sin(state.pulse) * 3, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = "#ffffff";
    context.fillRect(state.x - 18, state.y - 18, 36, 36);
    context.fillStyle = "#050505";
    context.fillRect(state.x - 8, state.y - 8, 16, 16);

    if (state.paused) {
      context.fillStyle = "rgba(0,0,0,0.64)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      drawText("PAUSED", canvas.width / 2 - 42, canvas.height / 2, 24);
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Enter"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key.toLowerCase() === "p") state.paused = !state.paused;
    keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }, { signal });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }, { signal });

  document.querySelector("[data-arcade-focus]")?.addEventListener("click", () => canvas.focus(), { signal });
  document.querySelector("[data-arcade-fullscreen]")?.addEventListener("click", () => {
    canvas.requestFullscreen?.();
  }, { signal });

  canvas.setAttribute("tabindex", "0");
  canvas.focus({ preventScroll: true });
  frame();
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function inferCoreFromFile(name) {
  const extension = name.toLowerCase().split(".").pop();
  if (["md", "gen", "smd", "bin"].includes(extension)) return "segaMD";
  if (["nes", "fds"].includes(extension)) return "nes";
  if (["sfc", "smc", "fig"].includes(extension)) return "snes";
  if (["gb", "gbc"].includes(extension)) return "gb";
  if (extension === "gba") return "gba";
  if (extension === "nds") return "nds";
  return "";
}

function setPlayerStatus(root, message, isError = false) {
  const status = root.querySelector("[data-player-status]");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function emulatorDocument({ biosUrl, core, dataPath, gameName, loaderUrl, parentUrl, romUrl }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,
      body,
      #game {
        width: 100%;
        height: 100%;
        margin: 0;
        background: #050505;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="game"></div>
    <script>
      window.EJS_player = "#game";
      window.EJS_core = ${JSON.stringify(core)};
      window.EJS_gameUrl = ${JSON.stringify(romUrl)};
      window.EJS_gameName = ${JSON.stringify(gameName)};
      window.EJS_pathtodata = ${JSON.stringify(dataPath)};
      window.EJS_biosUrl = ${JSON.stringify(biosUrl || "")};
      window.EJS_gameParentUrl = ${JSON.stringify(parentUrl || "")};
      window.EJS_startOnLoaded = true;
      window.EJS_backgroundColor = "#050505";
      window.EJS_color = "#7aa2ff";
      window.EJS_volume = 0.75;
    </script>
    <script src="${escapeAttribute(loaderUrl)}"></script>
  </body>
</html>`;
}

function jsnesDocument({ gameName, jsnesUrl, romUrl }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        background: #050505;
        color: #fff;
        overflow: hidden;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
      }

      #game {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
      }

      canvas {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        object-fit: contain;
        background: #050505;
      }

      #status {
        position: absolute;
        inset: auto 14px 14px;
        padding: 8px 10px;
        border: 1px solid rgba(255, 255, 255, 0.26);
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.72);
        color: rgba(255, 255, 255, 0.82);
        font-size: 12px;
        font-weight: 800;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="game" aria-label=${JSON.stringify(gameName)}></div>
    <div id="status">Loading ${escapeAttribute(gameName)}...</div>
    <script src="${escapeAttribute(jsnesUrl)}"></script>
    <script>
      const status = document.getElementById("status");
      const container = document.getElementById("game");
      const keyMap = {
        37: jsnes.Controller.BUTTON_LEFT,
        38: jsnes.Controller.BUTTON_UP,
        39: jsnes.Controller.BUTTON_RIGHT,
        40: jsnes.Controller.BUTTON_DOWN,
        13: jsnes.Controller.BUTTON_START,
        17: jsnes.Controller.BUTTON_SELECT,
        88: jsnes.Controller.BUTTON_A,
        90: jsnes.Controller.BUTTON_B,
      };

      const browser = new jsnes.Browser({
        container,
        onError(error) {
          status.textContent = "Failed to start game";
          console.error(error);
        },
      });
      window.__artStyleNes = browser;

      function controllerButton(event) {
        return keyMap[event.keyCode || event.which];
      }

      document.addEventListener("keydown", (event) => {
        const button = controllerButton(event);
        if (button === undefined) return;
        event.preventDefault();
        browser.nes.buttonDown(1, button);
      });

      document.addEventListener("keyup", (event) => {
        const button = controllerButton(event);
        if (button === undefined) return;
        event.preventDefault();
        browser.nes.buttonUp(1, button);
      });

      fetch(${JSON.stringify(romUrl)})
        .then((response) => {
          if (!response.ok) throw new Error("ROM request failed: " + response.status);
          return response.arrayBuffer();
        })
        .then((buffer) => {
          browser.loadROM(new Uint8Array(buffer));
          browser.fitInParent();
          status.textContent = "JSNES Ready";
          setTimeout(() => {
            status.hidden = true;
          }, 1600);
        })
        .catch((error) => {
          status.textContent = "Failed to start game";
          console.error(error);
        });
    </script>
  </body>
</html>`;
}

function resetWebEmulator(root, message) {
  if (webEmulatorStatusTimer) {
    window.clearInterval(webEmulatorStatusTimer);
    webEmulatorStatusTimer = undefined;
  }

  if (webEmulatorObjectUrl) {
    URL.revokeObjectURL(webEmulatorObjectUrl);
    webEmulatorObjectUrl = undefined;
  }

  if (root) delete root.dataset.playerActive;

  const frame = root?.querySelector("[data-emulator-frame]");
  if (frame instanceof HTMLIFrameElement) frame.srcdoc = "";

  const empty = root?.querySelector("[data-player-empty]");
  if (empty) empty.hidden = false;

  if (root && message) setPlayerStatus(root, message);
}

function monitorWebEmulator(root, frame) {
  if (webEmulatorStatusTimer) window.clearInterval(webEmulatorStatusTimer);

  let checks = 0;
  webEmulatorStatusTimer = window.setInterval(() => {
    checks += 1;
    const frameText = frame.contentDocument?.body?.innerText || "";
    if (/failed to start game/i.test(frameText)) {
      window.clearInterval(webEmulatorStatusTimer);
      webEmulatorStatusTimer = undefined;
      setPlayerStatus(root, t("emulatorStartFailed"), true);
      return;
    }

    if (frame.contentDocument?.querySelector("canvas") || checks >= 8) {
      window.clearInterval(webEmulatorStatusTimer);
      webEmulatorStatusTimer = undefined;
      setPlayerStatus(root, t("emulatorReadyStatus"));
    }
  }, 1500);
}

function startWebEmulator(root, options = {}) {
  const frame = root.querySelector("[data-emulator-frame]");
  if (!(frame instanceof HTMLIFrameElement)) return;

  const coreSelect = root.querySelector("[data-emulator-core]");
  const core = options.core || coreSelect?.value || root.dataset.core || "";
  const engine = options.engine || (core === "nes" ? "jsnes" : core === root.dataset.core ? root.dataset.engine || "emulatorjs" : "emulatorjs");
  const romUrl = options.romUrl || root.dataset.romUrl || "";

  if (!core || !romUrl) {
    setPlayerStatus(root, !core ? t("emulatorUnsupportedLead") : t("emulatorNoHosted"), true);
    return;
  }

  const gameName = options.gameName || root.dataset.title || "Arcade";
  frame.srcdoc = engine === "jsnes"
    ? jsnesDocument({
      gameName,
      jsnesUrl: root.dataset.jsnesUrl || "https://cdn.jsdelivr.net/npm/jsnes@2.1.0/dist/jsnes.min.js",
      romUrl,
    })
    : emulatorDocument({
      biosUrl: root.dataset.biosUrl || "",
      core,
      dataPath: root.dataset.dataPath || "https://cdn.emulatorjs.org/stable/data/",
      gameName,
      loaderUrl: root.dataset.loaderUrl || "https://cdn.emulatorjs.org/stable/data/loader.js",
      parentUrl: root.dataset.parentUrl || "",
      romUrl,
    });

  const empty = root.querySelector("[data-player-empty]");
  if (empty) empty.hidden = true;
  root.dataset.playerActive = "true";
  setPlayerStatus(root, t("emulatorLoading"));
  window.setTimeout(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    frame.focus();
  }, 100);
  monitorWebEmulator(root, frame);
}

async function startHostedWebEmulator(root) {
  setPlayerStatus(root, t("emulatorLoading"));

  const resolved = await resolvePlayroomRomUrl({
    romUrl: root.dataset.romUrl || "",
    storageBucket: root.dataset.storageBucket || "",
    storagePath: root.dataset.storagePath || "",
  });

  if (!resolved.ok) {
    setPlayerStatus(root, t(resolved.messageKey || "emulatorNoHosted"), true);
    return;
  }

  startWebEmulator(root, {
    core: root.dataset.core,
    engine: root.dataset.engine,
    gameName: root.dataset.title,
    romUrl: resolved.romUrl,
  });
}

function hostedStatusMessage(root) {
  if (root.dataset.romUrl) return t("emulatorHostedReady");
  if (root.dataset.storagePath) return t("playroomPrivateStorageReady");
  return t("emulatorNoHosted");
}

function selectRoomGame(root, button) {
  const title = button.dataset.title || "Arcade";
  root.dataset.title = title;
  root.dataset.core = button.dataset.core || "";
  root.dataset.engine = button.dataset.engine || "";
  root.dataset.romUrl = button.dataset.romUrl || "";
  root.dataset.storageBucket = button.dataset.storageBucket || "";
  root.dataset.storagePath = button.dataset.storagePath || "";
  root.dataset.cover = button.dataset.cover || "";

  root.querySelectorAll("[data-room-game]").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });

  const titleNodes = root.querySelectorAll("[data-room-active-title], [data-room-empty-title]");
  titleNodes.forEach((node) => {
    node.textContent = title;
  });

  const coreNode = root.querySelector("[data-room-active-core]");
  if (coreNode) coreNode.textContent = button.dataset.coreName || root.dataset.core || "";

  const emptyStatus = root.querySelector("[data-room-empty-status]");
  if (emptyStatus) emptyStatus.textContent = button.dataset.status || "";

  const emptyImage = root.querySelector("[data-player-empty] img");
  if (emptyImage instanceof HTMLImageElement && button.dataset.cover) {
    emptyImage.src = button.dataset.cover;
    emptyImage.alt = title;
  }

  const coreSelect = root.querySelector("[data-emulator-core]");
  if (coreSelect && root.dataset.core) coreSelect.value = root.dataset.core;

  const hostedButton = root.querySelector("[data-player-start-hosted]");
  if (hostedButton instanceof HTMLButtonElement) {
    hostedButton.disabled = !root.dataset.romUrl && !root.dataset.storagePath;
  }

  resetWebEmulator(root, button.dataset.status || hostedStatusMessage(root));
}

const TOUCH_KEY_DATA = {
  ArrowUp: { code: "ArrowUp", keyCode: 38 },
  ArrowDown: { code: "ArrowDown", keyCode: 40 },
  ArrowLeft: { code: "ArrowLeft", keyCode: 37 },
  ArrowRight: { code: "ArrowRight", keyCode: 39 },
  Enter: { code: "Enter", keyCode: 13 },
  Control: { code: "ControlRight", keyCode: 17 },
  Shift: { code: "ShiftLeft", keyCode: 16 },
  z: { code: "KeyZ", keyCode: 90 },
  x: { code: "KeyX", keyCode: 88 },
};

function dispatchPlayerKey(root, key, type) {
  const frame = root.querySelector("[data-emulator-frame]");
  const targetWindow = frame instanceof HTMLIFrameElement && frame.contentWindow ? frame.contentWindow : window;
  const targetDocument = frame instanceof HTMLIFrameElement && frame.contentDocument ? frame.contentDocument : document;
  const meta = TOUCH_KEY_DATA[key] || { code: key, keyCode: 0 };
  const event = new targetWindow.KeyboardEvent(type, {
    bubbles: true,
    cancelable: true,
    code: meta.code,
    key,
    repeat: false,
    which: meta.keyCode,
    keyCode: meta.keyCode,
  });

  Object.defineProperty(event, "keyCode", { get: () => meta.keyCode });
  Object.defineProperty(event, "which", { get: () => meta.keyCode });
  targetWindow.dispatchEvent(event);
  targetDocument.dispatchEvent(event);
}

function playerKeyFromEvent(event) {
  return event.key.length === 1 ? event.key.toLowerCase() : event.key;
}

function shouldForwardPlayerKey(event) {
  const key = playerKeyFromEvent(event);
  const target = targetElement(event);
  return Boolean(TOUCH_KEY_DATA[key]) && !target?.closest("input, textarea, select");
}

function initKeyboardForwarding(root, signal) {
  window.addEventListener("keydown", (event) => {
    if (root.dataset.playerActive !== "true" || !shouldForwardPlayerKey(event)) return;
    event.preventDefault();
    dispatchPlayerKey(root, playerKeyFromEvent(event), "keydown");
  }, { signal });

  window.addEventListener("keyup", (event) => {
    if (root.dataset.playerActive !== "true" || !shouldForwardPlayerKey(event)) return;
    event.preventDefault();
    dispatchPlayerKey(root, playerKeyFromEvent(event), "keyup");
  }, { signal });
}

function initTouchControls(root, signal) {
  root.querySelectorAll("[data-touch-key]").forEach((button) => {
    let active = false;
    const key = button.dataset.touchKey;
    if (!key) return;

    const press = (event) => {
      event.preventDefault();
      if (active) return;
      active = true;
      button.classList.add("is-active");
      try {
        button.setPointerCapture?.(event.pointerId);
      } catch {
        // Synthetic test events and a few browsers do not always expose a live pointer id.
      }
      dispatchPlayerKey(root, key, "keydown");
    };

    const release = (event) => {
      event.preventDefault();
      if (!active) return;
      active = false;
      button.classList.remove("is-active");
      dispatchPlayerKey(root, key, "keyup");
    };

    button.addEventListener("pointerdown", press, { signal });
    button.addEventListener("pointerup", release, { signal });
    button.addEventListener("pointercancel", release, { signal });
    button.addEventListener("lostpointercapture", release, { signal });
    button.addEventListener("contextmenu", (event) => event.preventDefault(), { signal });
  });
}

function initWebEmulator() {
  webEmulatorController?.abort();
  webEmulatorController = undefined;
  if (webEmulatorObjectUrl) {
    URL.revokeObjectURL(webEmulatorObjectUrl);
    webEmulatorObjectUrl = undefined;
  }
  if (webEmulatorStatusTimer) {
    window.clearInterval(webEmulatorStatusTimer);
    webEmulatorStatusTimer = undefined;
  }

  const root = document.querySelector("[data-web-emulator]");
  if (!root) return;

  webEmulatorController = new AbortController();
  const { signal } = webEmulatorController;
  const coreSelect = root.querySelector("[data-emulator-core]");
  const fileInput = root.querySelector("[data-rom-file]");

  coreSelect?.addEventListener("change", () => {
    const selected = coreSelect.selectedOptions?.[0];
    const accept = selected?.dataset.accept || "";
    if (fileInput instanceof HTMLInputElement) fileInput.accept = accept;
  }, { signal });

  root.querySelector("[data-player-start-hosted]")?.addEventListener("click", () => {
    startHostedWebEmulator(root);
  }, { signal });

  root.querySelectorAll("[data-room-game]").forEach((button) => {
    button.addEventListener("click", () => {
      selectRoomGame(root, button);
    }, { signal });
  });

  root.querySelector("[data-player-start-upload]")?.addEventListener("click", () => {
    if (!(fileInput instanceof HTMLInputElement) || !fileInput.files?.length) {
      setPlayerStatus(root, t("emulatorSelectFile"), true);
      return;
    }

    if (webEmulatorObjectUrl) URL.revokeObjectURL(webEmulatorObjectUrl);
    const file = fileInput.files[0];
    const inferredCore = inferCoreFromFile(file.name);
    if (inferredCore && coreSelect) coreSelect.value = inferredCore;
    webEmulatorObjectUrl = URL.createObjectURL(file);

    startWebEmulator(root, {
      core: inferredCore || coreSelect?.value || root.dataset.core,
      gameName: file.name.replace(/\.[^.]+$/, ""),
      romUrl: webEmulatorObjectUrl,
    });
  }, { signal });

  root.querySelector("[data-player-reset]")?.addEventListener("click", () => {
    resetWebEmulator(root, hostedStatusMessage(root));
  }, { signal });

  root.querySelector("[data-player-fullscreen]")?.addEventListener("click", () => {
    const stage = root.querySelector("[data-emulator-stage]");
    stage?.requestFullscreen?.();
  }, { signal });

  root.querySelector("[data-player-focus]")?.addEventListener("click", () => {
    const frame = root.querySelector("[data-emulator-frame]");
    if (frame instanceof HTMLIFrameElement) frame.focus();
    setPlayerStatus(root, t("emulatorReadyStatus"));
  }, { signal });

  initTouchControls(root, signal);
  initKeyboardForwarding(root, signal);
}

function prepareImages() {
  document.querySelectorAll("img[loading='lazy']").forEach((image) => {
    image.setAttribute("decoding", "async");
  });
}

function registerServiceWorker() {
  if (!PUBLIC_ENV.pwa.enabled || !("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(PUBLIC_ENV.pwa.serviceWorker).catch(() => {});
  });
}

applyLanguageToDocument();
bindNavigation();
bindControls();
bindCatalog();
bindArcadeFilters();
bindPlayroom();
bindAuthActions();
document.addEventListener("app:rendered", initArcadePlayer);
document.addEventListener("app:rendered", initWebEmulator);
startRouter();
prepareImages();
registerServiceWorker();
