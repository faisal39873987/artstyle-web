import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const output = "assets/playable-roms/art-style-demo.nes";
const resetAddress = 0x8000;
const prg = [];
const labels = new Map();
const patches = [];

function pc() {
  return resetAddress + prg.length;
}

function label(name) {
  labels.set(name, pc());
}

function emit(...bytes) {
  prg.push(...bytes.map((byte) => byte & 0xff));
}

function absPatch(name) {
  patches.push({ type: "abs", name, offset: prg.length });
  emit(0, 0);
}

function relPatch(name) {
  patches.push({ type: "rel", name, offset: prg.length });
  emit(0);
}

const op = {
  adcImm: (value) => emit(0x69, value),
  andImm: (value) => emit(0x29, value),
  bcs: (name) => { emit(0xb0); relPatch(name); },
  beq: (name) => { emit(0xf0); relPatch(name); },
  bne: (name) => { emit(0xd0); relPatch(name); },
  bpl: (name) => { emit(0x10); relPatch(name); },
  bitAbs: (address) => emit(0x2c, address & 0xff, address >> 8),
  clc: () => emit(0x18),
  cld: () => emit(0xd8),
  cmpImm: (value) => emit(0xc9, value),
  cpxImm: (value) => emit(0xe0, value),
  dex: () => emit(0xca),
  dey: () => emit(0x88),
  inx: () => emit(0xe8),
  jmp: (name) => { emit(0x4c); absPatch(name); },
  jsr: (name) => { emit(0x20); absPatch(name); },
  ldaAbs: (address) => emit(0xad, address & 0xff, address >> 8),
  ldaAbsXLabel: (name) => { emit(0xbd); absPatch(name); },
  ldaImm: (value) => emit(0xa9, value),
  ldaZp: (address) => emit(0xa5, address),
  ldxImm: (value) => emit(0xa2, value),
  ldyImm: (value) => emit(0xa0, value),
  lsrA: () => emit(0x4a),
  rolZp: (address) => emit(0x26, address),
  rts: () => emit(0x60),
  sbcImm: (value) => emit(0xe9, value),
  sec: () => emit(0x38),
  sei: () => emit(0x78),
  staAbs: (address) => emit(0x8d, address & 0xff, address >> 8),
  staAbsX: (address) => emit(0x9d, address & 0xff, address >> 8),
  staZp: (address) => emit(0x85, address),
  stxAbs: (address) => emit(0x8e, address & 0xff, address >> 8),
  txs: () => emit(0x9a),
};

const playerX = 0x00;
const playerY = 0x01;
const buttons = 0x02;

label("reset");
op.sei();
op.cld();
op.ldxImm(0x40);
op.stxAbs(0x4017);
op.ldxImm(0xff);
op.txs();
op.inx();
op.stxAbs(0x2000);
op.stxAbs(0x2001);
op.stxAbs(0x4010);
op.jsr("waitVBlank");
op.jsr("waitVBlank");
op.jsr("clearOam");
op.jsr("loadPalettes");
op.jsr("clearNametable");
op.jsr("writeTitle");
op.ldaImm(0x78);
op.staZp(playerX);
op.ldaImm(0x70);
op.staZp(playerY);
op.ldaImm(0x1e);
op.staAbs(0x2001);

label("mainLoop");
op.jsr("waitVBlank");
op.jsr("readController");
op.jsr("updatePlayer");
op.jsr("updateSprites");
op.jsr("resetScroll");
op.jmp("mainLoop");

label("waitVBlank");
op.bitAbs(0x2002);
op.bpl("waitVBlank");
op.rts();

label("clearOam");
op.ldaImm(0xfe);
op.ldxImm(0x00);
label("clearOamLoop");
op.staAbsX(0x0200);
op.inx();
op.bne("clearOamLoop");
op.rts();

label("loadPalettes");
op.ldaAbs(0x2002);
op.ldaImm(0x3f);
op.staAbs(0x2006);
op.ldaImm(0x00);
op.staAbs(0x2006);
op.ldxImm(0x00);
label("paletteLoop");
op.ldaAbsXLabel("palettes");
op.staAbs(0x2007);
op.inx();
op.cpxImm(0x20);
op.bne("paletteLoop");
op.rts();

label("clearNametable");
op.ldaAbs(0x2002);
op.ldaImm(0x20);
op.staAbs(0x2006);
op.ldaImm(0x00);
op.staAbs(0x2006);
op.ldaImm(0x00);
op.ldxImm(0x00);
op.ldyImm(0x04);
label("clearNameLoop");
op.staAbs(0x2007);
op.inx();
op.bne("clearNameLoop");
op.dey();
op.bne("clearNameLoop");
op.rts();

label("writeTitle");
op.ldaAbs(0x2002);
op.ldaImm(0x21);
op.staAbs(0x2006);
op.ldaImm(0x28);
op.staAbs(0x2006);
op.ldxImm(0x00);
label("titleLoop");
op.ldaAbsXLabel("titleText");
op.cmpImm(0xff);
op.beq("titleDone");
op.staAbs(0x2007);
op.inx();
op.jmp("titleLoop");
label("titleDone");
op.ldaAbs(0x2002);
op.ldaImm(0x21);
op.staAbs(0x2006);
op.ldaImm(0x88);
op.staAbs(0x2006);
op.ldxImm(0x00);
label("helpLoop");
op.ldaAbsXLabel("helpText");
op.cmpImm(0xff);
op.beq("helpDone");
op.staAbs(0x2007);
op.inx();
op.jmp("helpLoop");
label("helpDone");
op.rts();

label("readController");
op.ldaImm(0x01);
op.staAbs(0x4016);
op.ldaImm(0x00);
op.staAbs(0x4016);
op.staZp(buttons);
op.ldxImm(0x08);
label("readLoop");
op.ldaAbs(0x4016);
op.lsrA();
op.rolZp(buttons);
op.dex();
op.bne("readLoop");
op.rts();

label("updatePlayer");
op.ldaZp(buttons);
op.andImm(0x02);
op.beq("skipLeft");
op.ldaZp(playerX);
op.beq("skipLeft");
op.sec();
op.sbcImm(0x02);
op.staZp(playerX);
label("skipLeft");
op.ldaZp(buttons);
op.andImm(0x01);
op.beq("skipRight");
op.ldaZp(playerX);
op.cmpImm(0xe8);
op.bcs("skipRight");
op.clc();
op.adcImm(0x02);
op.staZp(playerX);
label("skipRight");
op.ldaZp(buttons);
op.andImm(0x08);
op.beq("skipUp");
op.ldaZp(playerY);
op.cmpImm(0x28);
op.bcs("moveUp");
op.jmp("skipUp");
label("moveUp");
op.sec();
op.sbcImm(0x02);
op.staZp(playerY);
label("skipUp");
op.ldaZp(buttons);
op.andImm(0x04);
op.beq("skipDown");
op.ldaZp(playerY);
op.cmpImm(0xd0);
op.bcs("skipDown");
op.clc();
op.adcImm(0x02);
op.staZp(playerY);
label("skipDown");
op.ldaZp(buttons);
op.andImm(0x10);
op.beq("skipStart");
op.ldaImm(0x78);
op.staZp(playerX);
op.ldaImm(0x70);
op.staZp(playerY);
label("skipStart");
op.rts();

label("updateSprites");
op.ldaZp(playerY);
op.staAbs(0x0200);
op.ldaImm(0x01);
op.staAbs(0x0201);
op.ldaImm(0x00);
op.staAbs(0x0202);
op.ldaZp(playerX);
op.staAbs(0x0203);

op.ldaZp(playerY);
op.staAbs(0x0204);
op.ldaImm(0x01);
op.staAbs(0x0205);
op.ldaImm(0x00);
op.staAbs(0x0206);
op.ldaZp(playerX);
op.clc();
op.adcImm(0x08);
op.staAbs(0x0207);

op.ldaZp(playerY);
op.clc();
op.adcImm(0x08);
op.staAbs(0x0208);
op.ldaImm(0x01);
op.staAbs(0x0209);
op.ldaImm(0x00);
op.staAbs(0x020a);
op.ldaZp(playerX);
op.staAbs(0x020b);

op.ldaZp(playerY);
op.clc();
op.adcImm(0x08);
op.staAbs(0x020c);
op.ldaImm(0x01);
op.staAbs(0x020d);
op.ldaImm(0x00);
op.staAbs(0x020e);
op.ldaZp(playerX);
op.clc();
op.adcImm(0x08);
op.staAbs(0x020f);

op.ldaImm(0x00);
op.staAbs(0x2003);
op.ldaImm(0x02);
op.staAbs(0x4014);
op.rts();

label("resetScroll");
op.ldaImm(0x00);
op.staAbs(0x2005);
op.staAbs(0x2005);
op.rts();

label("palettes");
emit(
  0x0f, 0x30, 0x10, 0x00,
  0x0f, 0x27, 0x17, 0x07,
  0x0f, 0x21, 0x11, 0x01,
  0x0f, 0x30, 0x10, 0x00,
  0x0f, 0x30, 0x10, 0x00,
  0x0f, 0x27, 0x17, 0x07,
  0x0f, 0x21, 0x11, 0x01,
  0x0f, 0x30, 0x10, 0x00,
);

const glyphBase = 2;
function tileId(char) {
  if (char === " ") return 0;
  if (char >= "A" && char <= "Z") return glyphBase + char.charCodeAt(0) - 65;
  if (char >= "0" && char <= "9") return glyphBase + 26 + char.charCodeAt(0) - 48;
  return 0;
}

function textBytes(text) {
  return [...text].map(tileId).concat(0xff);
}

label("titleText");
emit(...textBytes("ART STYLE DEMO"));
label("helpText");
emit(...textBytes("MOVE WITH D PAD"));

for (const patch of patches) {
  const target = labels.get(patch.name);
  if (target === undefined) throw new Error(`Missing label: ${patch.name}`);
  if (patch.type === "abs") {
    prg[patch.offset] = target & 0xff;
    prg[patch.offset + 1] = target >> 8;
  } else {
    const branchPc = resetAddress + patch.offset + 1;
    const relative = target - branchPc;
    if (relative < -128 || relative > 127) throw new Error(`Branch out of range: ${patch.name}`);
    prg[patch.offset] = relative & 0xff;
  }
}

if (prg.length > 0x7ffa) throw new Error("PRG is too large for NROM-256");
while (prg.length < 0x7ffa) prg.push(0xea);
emit(resetAddress & 0xff, resetAddress >> 8);
emit(resetAddress & 0xff, resetAddress >> 8);
emit(resetAddress & 0xff, resetAddress >> 8);

const chr = new Uint8Array(0x2000);

function setTile(index, rows) {
  const start = index * 16;
  rows.forEach((row, offset) => {
    chr[start + offset] = parseInt(row.replaceAll(".", "0").replaceAll("#", "1"), 2);
  });
}

setTile(1, [
  "########",
  "########",
  "########",
  "########",
  "########",
  "########",
  "########",
  "########",
]);

const font = {
  A: [".####...", "#....#..", "#....#..", "######..", "#....#..", "#....#..", "#....#..", "........"],
  D: ["#####...", "#....#..", "#....#..", "#....#..", "#....#..", "#....#..", "#####...", "........"],
  E: ["######..", "#.......", "#.......", "#####...", "#.......", "#.......", "######..", "........"],
  H: ["#....#..", "#....#..", "#....#..", "######..", "#....#..", "#....#..", "#....#..", "........"],
  I: ["######..", "..##....", "..##....", "..##....", "..##....", "..##....", "######..", "........"],
  L: ["#.......", "#.......", "#.......", "#.......", "#.......", "#.......", "######..", "........"],
  M: ["#....#..", "##..##..", "#.##.#..", "#....#..", "#....#..", "#....#..", "#....#..", "........"],
  O: [".####...", "#....#..", "#....#..", "#....#..", "#....#..", "#....#..", ".####...", "........"],
  P: ["#####...", "#....#..", "#....#..", "#####...", "#.......", "#.......", "#.......", "........"],
  R: ["#####...", "#....#..", "#....#..", "#####...", "#..#....", "#...#...", "#....#..", "........"],
  S: [".#####..", "#.......", "#.......", ".####...", ".....#..", ".....#..", "#####...", "........"],
  T: ["######..", "..##....", "..##....", "..##....", "..##....", "..##....", "..##....", "........"],
  V: ["#....#..", "#....#..", "#....#..", "#....#..", ".#..#...", ".#..#...", "..##....", "........"],
  W: ["#....#..", "#....#..", "#....#..", "#.##.#..", "#.##.#..", "##..##..", "#....#..", "........"],
  Y: ["#....#..", ".#..#...", "..##....", "..##....", "..##....", "..##....", "..##....", "........"],
};

for (const [char, rows] of Object.entries(font)) {
  if (!rows || rows.length !== 8) throw new Error(`Bad font glyph: ${char}`);
  setTile(tileId(char), rows);
}

const header = Buffer.from([
  0x4e, 0x45, 0x53, 0x1a,
  0x02,
  0x01,
  0x00,
  0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
]);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, Buffer.concat([header, Buffer.from(prg), Buffer.from(chr)]));
console.log(`Built ${output} (${16 + prg.length + chr.length} bytes)`);
