export const ROOM_SYSTEMS = [
  {
    id: "nes",
    name: "NES / Famicom",
    count: 49,
    ready: true,
  },
  {
    id: "snes",
    name: "SNES / Super Famicom",
    count: 36,
    ready: true,
  },
  {
    id: "gb",
    name: "Game Boy / Game Boy Color",
    count: 15,
    ready: true,
  },
  {
    id: "gba",
    name: "Game Boy Advance",
    count: 5,
    ready: true,
  },
  {
    id: "nds",
    name: "Nintendo DS",
    count: 5,
    ready: true,
  },
  {
    id: "segaMD",
    name: "Mega Drive / Genesis",
    count: 62,
    ready: true,
  },
  {
    id: "dreamcast",
    name: "Dreamcast",
    count: 1,
    ready: false,
  },
];

export const ROOM_KEYBOARD_MAP = [
  ["↑ ↓ ← →", "Move"],
  ["Z", "B / primary action"],
  ["X", "A / secondary action"],
  ["Enter", "Start"],
  ["Ctrl", "Select"],
];

export const PRIVATE_ROOM_GAMES = [
  {
    id: "art-style-demo",
    title: "Art Style Demo",
    core: "nes",
    coreName: "NES / Famicom",
    engine: "jsnes",
    romUrl: "/assets/playable-roms/art-style-demo.nes",
    cover: "/assets/arcade/covers/official/art-style-demo.svg",
    status: {
      ar: "روم رسمي مملوك وجاهز للتشغيل داخل الغرفة.",
      en: "Owned official ROM ready to play inside the room.",
    },
  },
];

export const PRIVATE_ROOM_STORAGE_TEMPLATE = {
  bucket: "private-roms",
  approvedPrefix: "approved/",
  signedUrlTtlSeconds: 300,
};

export const ROOM_ROM_INVENTORY = {
  total: 175,
  approvedHosted: PRIVATE_ROOM_GAMES.length,
  pendingApproval: 174,
};
