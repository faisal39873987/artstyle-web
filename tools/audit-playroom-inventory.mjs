import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const romExtensions = new Set([
  ".nes",
  ".fds",
  ".sfc",
  ".smc",
  ".fig",
  ".gb",
  ".gbc",
  ".gba",
  ".nds",
  ".md",
  ".gen",
  ".smd",
  ".bin",
]);

function walk(folder, files = []) {
  for (const name of readdirSync(folder)) {
    if (name.startsWith("._") || name === ".DS_Store") continue;
    if (name.toLowerCase() === "readme.md") continue;
    const fullPath = path.join(folder, name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (romExtensions.has(path.extname(name).toLowerCase())) files.push(fullPath);
  }

  return files;
}

function countBy(values, keyFn) {
  return values.reduce((counts, value) => {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function dreamcastTitleCount(files) {
  const titleFolders = new Set();
  for (const file of files) {
    const normalized = file.split(path.sep).join("/");
    if (!normalized.includes("/DreamCast_roms/")) continue;
    titleFolders.add(path.basename(path.dirname(file)));
  }
  return titleFolders.size;
}

function systemCounts(files) {
  const extCounts = countBy(files, (file) => path.extname(file).slice(1).toLowerCase());
  return {
    nes: (extCounts.nes || 0) + (extCounts.fds || 0),
    snes: (extCounts.sfc || 0) + (extCounts.smc || 0) + (extCounts.fig || 0),
    gb: (extCounts.gb || 0) + (extCounts.gbc || 0),
    gba: extCounts.gba || 0,
    nds: extCounts.nds || 0,
    segaMD: (extCounts.md || 0) + (extCounts.gen || 0) + (extCounts.smd || 0),
    dreamcast: dreamcastTitleCount(files),
  };
}

function formatCounts(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}

const privateSourceRoot = path.join(root, "assets", "all game");
const hasPrivateSource = existsSync(privateSourceRoot);
const allFiles = walk(path.join(root, "assets"));
const approvedFiles = allFiles.filter((file) => file.includes(`${path.sep}assets${path.sep}playable-roms${path.sep}`));
const pendingFiles = allFiles.filter((file) => !approvedFiles.includes(file));
const extCounts = countBy(allFiles, (file) => path.extname(file).slice(1).toLowerCase());
const actualSystems = systemCounts(allFiles);

const { ROOM_ROM_INVENTORY, ROOM_SYSTEMS } = await import(pathToFileURL(path.join(root, "assets", "js", "data", "playroom.js")));
const declaredSystems = Object.fromEntries(ROOM_SYSTEMS.map((system) => [system.id, system.count]));
const mismatches = [];

if (ROOM_ROM_INVENTORY.approvedHosted !== approvedFiles.length) {
  mismatches.push(`approved declared ${ROOM_ROM_INVENTORY.approvedHosted}, found ${approvedFiles.length}`);
}

if (hasPrivateSource) {
  if (ROOM_ROM_INVENTORY.total !== allFiles.length) {
    mismatches.push(`total declared ${ROOM_ROM_INVENTORY.total}, found ${allFiles.length}`);
  }

  if (ROOM_ROM_INVENTORY.pendingApproval !== pendingFiles.length) {
    mismatches.push(`pending declared ${ROOM_ROM_INVENTORY.pendingApproval}, found ${pendingFiles.length}`);
  }

  for (const [system, count] of Object.entries(actualSystems)) {
    if (declaredSystems[system] !== count) {
      mismatches.push(`${system} declared ${declaredSystems[system] ?? "missing"}, found ${count}`);
    }
  }
}

console.log("Playroom ROM inventory audit");
console.log(`Total ROM-like files: ${allFiles.length}`);
console.log(`Approved hosted files: ${approvedFiles.length}`);
console.log(`Pending approval files: ${pendingFiles.length}`);
console.log(`By extension: ${formatCounts(extCounts)}`);
console.log(`By playable system: ${formatCounts(actualSystems)}`);
if (!hasPrivateSource) console.log("Private source folder is not present; skipped private inventory comparisons.");
console.log(mismatches.length ? `Mismatches: ${mismatches.join("; ")}` : "Inventory matches playroom data.");

if (mismatches.length) process.exitCode = 1;
