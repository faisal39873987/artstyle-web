import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "assets", "all game");
const outRoot = path.join(root, "assets", "arcade", "covers");
const dataFile = path.join(root, "assets", "js", "data", "arcade.js");

const groups = [
  {
    id: "mega-drive",
    platform: "Mega Drive",
    genre: { ar: "أكشن كلاسيكي", en: "Classic action" },
    collection: { ar: "مجموعة Mega Drive", en: "Mega Drive Collection" },
    source: path.join(sourceRoot, "assets", "images", "covers"),
  },
  {
    id: "retro-quest",
    platform: "NES",
    genre: { ar: "ريترو", en: "Retro" },
    collection: { ar: "Retro Quest", en: "Retro Quest" },
    source: path.join(sourceRoot, "assets nes", "retro_covers"),
  },
  {
    id: "pixel-saga",
    platform: "NES",
    genre: { ar: "بيكسل", en: "Pixel" },
    collection: { ar: "Pixel Saga", en: "Pixel Saga" },
    source: path.join(sourceRoot, "assets nes", "pixel_covers"),
  },
  {
    id: "color-quest",
    platform: "Handheld",
    genre: { ar: "محمول ملون", en: "Color handheld" },
    collection: { ar: "Color Quest", en: "Color Quest" },
    source: path.join(sourceRoot, "assets nes", "color_covers"),
  },
  {
    id: "handheld-quest",
    platform: "Handheld",
    genre: { ar: "محمول", en: "Handheld" },
    collection: { ar: "Handheld Quest", en: "Handheld Quest" },
    source: path.join(sourceRoot, "assets nes", "handheld_covers"),
  },
  {
    id: "pocket-quest",
    platform: "Pocket",
    genre: { ar: "جيب", en: "Pocket" },
    collection: { ar: "Pocket Quest", en: "Pocket Quest" },
    source: path.join(sourceRoot, "assets nes", "pocket_covers"),
  },
  {
    id: "dreamcast",
    platform: "Dreamcast",
    genre: { ar: "قتال", en: "Fighting" },
    collection: { ar: "Dreamcast Vault", en: "Dreamcast Vault" },
    source: path.join(sourceRoot, "assets", "DreamCast_image"),
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.(md)?\.(png|jpe?g|webp)$/i, "")
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function titleize(value) {
  const clean = value
    .replace(/\.(md)?\.(png|jpe?g|webp)$/i, "")
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.replace(/\b([a-z])/g, (letter) => letter.toUpperCase());
}

function listImages(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .filter((name) => !name.startsWith("._") && name !== ".DS_Store")
    .sort();
}

rmSync(outRoot, { force: true, recursive: true });
mkdirSync(outRoot, { recursive: true });

const seen = new Map();
const games = [];

for (const group of groups) {
  const targetDir = path.join(outRoot, group.id);
  mkdirSync(targetDir, { recursive: true });

  for (const file of listImages(group.source)) {
    const source = path.join(group.source, file);
    const baseSlug = slugify(file) || `${group.id}-game`;
    const count = seen.get(baseSlug) || 0;
    seen.set(baseSlug, count + 1);
    const slug = count ? `${baseSlug}-${count + 1}` : baseSlug;
    const outFile = path.join(targetDir, `${slug}.webp`);
    execFileSync("cwebp", ["-quiet", "-q", "78", "-resize", "720", "0", source, "-o", outFile]);

    const title = titleize(file);
    games.push({
      id: slug,
      title,
      platform: group.platform,
      collectionId: group.id,
      collection: group.collection,
      genre: group.genre,
      cover: `/assets/arcade/covers/${group.id}/${slug}.webp`,
      androidApp: group.id === "mega-drive" || group.id === "dreamcast" ? "comix-zone-game" : "pixelhub-arcade",
      playMode: "web-emulator",
      licensedBuild: false,
    });
  }
}

const apps = [
  {
    id: "pixelhub-arcade",
    name: "PixelHub Arcade",
    description: {
      ar: "تطبيق Android لمجموعة ألعاب الريترو والمحمول مع دعم مستقبلي للحفظ والمكتبة.",
      en: "Android app for retro and handheld game collections with future library and save support.",
    },
    androidUrl: "https://play.google.com/store/apps/details?id=com.pixelhub.arcade",
    status: { ar: "رابط Android قابل للتحديث", en: "Android link ready to update" },
  },
  {
    id: "comix-zone-game",
    name: "Comix Zone Game",
    description: {
      ar: "تطبيق Android لمجموعة الأكشن والكلاسيكيات مع روابط دعم وسياسات جاهزة.",
      en: "Android app for action and classic collections with support and policy routes ready.",
    },
    androidUrl: "https://play.google.com/store/apps/details?id=com.comixzone.game",
    status: { ar: "رابط Android موجود في ملفات التطبيق", en: "Android link found in app files" },
  },
];

const collections = groups.map(({ id, platform, genre, collection }) => ({
  id,
  platform,
  genre,
  name: collection,
  count: games.filter((game) => game.collectionId === id).length,
}));

for (const game of games) {
  game.searchText = [
    game.title,
    game.platform,
    game.collection.ar,
    game.collection.en,
    game.genre.ar,
    game.genre.en,
  ].join(" ").toLowerCase();
}

const file = `export const ARCADE_APPS = ${JSON.stringify(apps, null, 2)};

export const ARCADE_COLLECTIONS = ${JSON.stringify(collections, null, 2)};

export const ARCADE_GAMES = ${JSON.stringify(games, null, 2)};

export const ARCADE_FILTERS = {
  platforms: [...new Set(ARCADE_GAMES.map((game) => game.platform))].sort(),
  collections: ARCADE_COLLECTIONS,
};
`;

writeFileSync(dataFile, file);
console.log(`Generated ${games.length} arcade games.`);
