// Recria a logo da VIG em VETOR (a logo avulsa tem só 150 px e o recorte do cartaz tem halo).
//  - emblema: desenhado em SVG (scripts/emblema.mjs), inspirado na escultura da logo;
//  - texto: Montserrat convertida em curvas (opentype.js), proporções parecidas com o original.
// Saída: public/images/logo-vig.svg e logo-emblema.svg (+ PNGs derivados para OG/ícone).
// Substituir pela logo oficial em vetor quando o cliente enviar.
import sharp from "sharp";
import fs from "node:fs";
import opentype from "opentype.js";
import { emblema, EMBLEMA_W, EMBLEMA_H } from "./emblema.mjs";

const COR = { texto: "#C5A059", tagline: "#8F8F96" };

const loadFont = (peso) => {
  const b = fs.readFileSync(`node_modules/@fontsource/montserrat/files/montserrat-latin-${peso}-normal.woff`);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const f500 = loadFont(500), f300 = loadFont(300);
const capH = (f) => (f.tables.os2?.sCapHeight ?? f.unitsPerEm * 0.7) / f.unitsPerEm;

/** Texto em curvas, ajustado a uma largura alvo com tracking fixo (em). Retorna path + métricas. */
function linha(font, texto, larguraAlvo, tracking, x, yBase, cor) {
  const glyphs = font.stringToGlyphs(texto);
  const n = glyphs.length;
  let nat = 0; // largura natural em em (fs = 1)
  glyphs.forEach((g, i) => {
    nat += g.advanceWidth / font.unitsPerEm;
    if (i < n - 1) nat += font.getKerningValue(g, glyphs[i + 1]) / font.unitsPerEm;
  });
  const ult = glyphs[n - 1];
  nat -= (ult.advanceWidth - (ult.xMax ?? ult.advanceWidth)) / font.unitsPerEm; // sem o respiro final
  const fs = larguraAlvo / (nat + tracking * (n - 1));
  let cx = x, d = "";
  glyphs.forEach((g, i) => {
    d += g.getPath(cx, yBase, fs).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * fs + tracking * fs;
    if (i < n - 1) cx += (font.getKerningValue(g, glyphs[i + 1]) / font.unitsPerEm) * fs;
  });
  return { svg: `<path fill="${cor}" d="${d}"/>`, fs, cap: capH(font) * fs };
}

// ---- layout (unidades = px da tela) ----
const ALTURA = 500;
const EMB_H = 460;
const EMB_S = EMB_H / EMBLEMA_H;
const embW = EMBLEMA_W * EMB_S;
const embY = (ALTURA - EMB_H) / 2;
const xTexto = embW + 64;
const larguraBloco = 860;
const vigW = 560;

const medidas = {
  vig: linha(f500, "VIG", vigW, 0.07, 0, 0, COR.texto),
  od: linha(f300, "ODONTOLOGIA", larguraBloco, 0.07, 0, 0, COR.texto),
  tg: linha(f300, "Bucomaxilofacial | Implantodontia", larguraBloco - 60, 0.03, 0, 0, COR.tagline),
};
const gap1 = 50, gap2 = 38;
const alturaBloco = medidas.vig.cap + gap1 + medidas.od.cap + gap2 + medidas.tg.cap;
const topo = (ALTURA - alturaBloco) / 2 + 6;
const yVig = topo + medidas.vig.cap;
const yOd = yVig + gap1 + medidas.od.cap;
const yTg = yOd + gap2 + medidas.tg.cap;

const vig = linha(f500, "VIG", vigW, 0.07, xTexto + (larguraBloco - vigW) / 2, yVig, COR.texto);
const od = linha(f300, "ODONTOLOGIA", larguraBloco, 0.07, xTexto, yOd, COR.texto);
const tg = linha(f300, "Bucomaxilofacial | Implantodontia", larguraBloco - 60, 0.03, xTexto + 30, yTg, COR.tagline);

const larguraTotal = Math.round(xTexto + larguraBloco + 4);
const grupoEmblema = `<g transform="translate(0 ${embY}) scale(${EMB_S.toFixed(5)})">${emblema}</g>`;
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${larguraTotal} ${ALTURA}" role="img" aria-label="VIG Odontologia"><title>VIG Odontologia</title>${grupoEmblema}${vig.svg}${od.svg}${tg.svg}</svg>`;
fs.writeFileSync("public/images/logo-vig.svg", logo);
const emb = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${EMBLEMA_W} ${EMBLEMA_H}" role="img" aria-label="VIG Odontologia">${emblema}</svg>`;
fs.writeFileSync("public/images/logo-emblema.svg", emb);

// PNGs derivados (OG, ícone, conferência)
await sharp(Buffer.from(logo), { density: 144 }).resize({ width: 1600 }).png().toFile("public/images/logo-vig.png");
await sharp(Buffer.from(emb), { density: 144 }).resize({ height: 900 }).png().toFile("public/images/logo-emblema.png");
for (const [n, cor] of [["dark", "#1A1A1A"], ["light", "#EDEDEB"]]) {
  const m = await sharp("public/images/logo-vig.png").metadata();
  await sharp({ create: { width: m.width, height: m.height, channels: 3, background: cor } })
    .composite([{ input: "public/images/logo-vig.png" }]).png().toFile(`scripts/_logo-${n}.png`);
}
console.log("ok", { larguraTotal, ALTURA, vigFs: Math.round(vig.fs), odFs: Math.round(od.fs), tgFs: Math.round(tg.fs), kb: Math.round(logo.length / 1024) });
