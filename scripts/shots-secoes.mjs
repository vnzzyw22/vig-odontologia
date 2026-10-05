// Fotografa cada seção da Home: node scripts/shots-secoes.mjs <largura> <prefixo> [altura]
import { chromium } from "playwright-core";

const largura = Number(process.argv[2] ?? 1440);
const prefixo = process.argv[3] ?? "d";
const altura = Number(process.argv[4] ?? 900);
const mobile = largura < 700;
const ids = ["posicionamento", "tratamentos", "precisao", "profissionais", "clinica", "confianca", "duvidas", "contato"];
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: largura, height: altura }, isMobile: mobile, hasTouch: mobile });
const page = await ctx.newPage();
const erros = [];
page.on("console", (m) => ["error", "warning"].includes(m.type()) && erros.push(m.text()));
page.on("pageerror", (e) => erros.push(`pageerror: ${e.message}`));
await page.goto("http://localhost:3100/", { waitUntil: "networkidle", timeout: 240000 });
await page.waitForTimeout(1500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += altura * 0.5) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(300); }
await page.waitForTimeout(1500);
for (const id of ids) {
  const el = page.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await el.screenshot({ path: `scripts/_${prefixo}-${id}.png` });
}
// CTA final e rodapé
await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.locator("section[aria-labelledby=titulo-cta]").screenshot({ path: `scripts/_${prefixo}-cta.png` });
await page.locator("footer").screenshot({ path: `scripts/_${prefixo}-rodape.png` });
const dims = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
console.log(JSON.stringify({ dims, erros: erros.slice(0, 10) }));
await browser.close();
