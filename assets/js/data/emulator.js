export const EMULATOR_CDN = {
  dataPath: "https://cdn.emulatorjs.org/stable/data/",
  jsnesUrl: "https://cdn.jsdelivr.net/npm/jsnes@2.1.0/dist/jsnes.min.js",
  loaderUrl: "https://cdn.emulatorjs.org/stable/data/loader.js",
};

export const EMULATOR_CORES = [
  {
    id: "segaMD",
    name: "Mega Drive / Genesis",
    accept: ".md,.gen,.smd,.bin,.zip",
  },
  {
    id: "nes",
    name: "NES / Famicom",
    accept: ".nes,.fds,.zip",
  },
  {
    id: "snes",
    name: "SNES / Super Famicom",
    accept: ".sfc,.smc,.fig,.zip",
  },
  {
    id: "gb",
    name: "Game Boy / Game Boy Color",
    accept: ".gb,.gbc,.zip",
  },
  {
    id: "gba",
    name: "Game Boy Advance",
    accept: ".gba,.zip",
  },
  {
    id: "nds",
    name: "Nintendo DS",
    accept: ".nds,.zip",
  },
];

const CORE_BY_COLLECTION = {
  "official-demo": "nes",
  "mega-drive": "segaMD",
  "retro-quest": "nes",
  "pixel-saga": "snes",
  "color-quest": "gb",
  "handheld-quest": "gba",
  "pocket-quest": "gb",
};

// Add only ROM files you own or are licensed to distribute publicly.
export const HOSTED_ROM_MANIFEST = {
  "art-style-demo": {
    core: "nes",
    engine: "jsnes",
    romUrl: "/assets/playable-roms/art-style-demo.nes",
  },
};

export function emulatorCore(coreId) {
  return EMULATOR_CORES.find((core) => core.id === coreId);
}

export function emulatorProfileForGame(game) {
  const hosted = HOSTED_ROM_MANIFEST[game.id] || {};
  const coreId = hosted.core || CORE_BY_COLLECTION[game.collectionId] || "";
  const core = emulatorCore(coreId);

  return {
    supported: Boolean(core),
    core: core?.id || "",
    coreName: core?.name || "External player",
    engine: hosted.engine || (core?.id === "nes" ? "jsnes" : "emulatorjs"),
    accept: core?.accept || "",
    romUrl: hosted.romUrl || "",
    biosUrl: hosted.biosUrl || "",
    parentUrl: hosted.parentUrl || "",
  };
}
