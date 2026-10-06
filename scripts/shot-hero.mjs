// node scripts/shot-hero.mjs <prefixo>   — fotografa só a Hero em várias larguras e confere overflow/erros/vídeo
import { chromium } from "playwright-core";

const prefixo = process.argv[2] ?? "h";
const tamanhos = [[1920, 1080, "wide"], [1440, 900, "desk"], [820, 1180, "tablet"], [390, 844, "mob"], [360, 640, "mobp"]];
const b = await chromium.launch({ channel: "chrome", args: ["--autoplay-policy=no-user-gesture-required"] });
for (const [w, h, n] of tamanhos) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 700, hasTouch: w < 700 });
  const p = await ctx.newPage();
  const erros = [];
  p.on("console", (m) => m.type() === "error" && erros.push(m.text().slice(0, 160)));
  p.on("pageerror", (e) => erros.push("pageerror " + e.message.slice(0, 160)));
  await p.goto("http://localhost:3100/", { waitUntil: "load", timeout: 240000 });
  await p.waitForTimeout(2600);
  const info = await p.evaluate(() => {
    const v = document.querySelector("video");
    const s = document.querySelector("section");
    return {
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
      alturaHero: Math.round(s.getBoundingClientRect().height),
      video: v ? { src: v.currentSrc.split("/").pop(), tocando: !v.paused, t: Number(v.currentTime.toFixed(2)), opacidade: getComputedStyle(v).opacity } : null,
    };
  });
  await p.screenshot({ path: `scripts/_${prefixo}-${n}.png` });
  console.log(n, JSON.stringify(info), erros.length ? "ERROS: " + erros.join(" | ") : "sem erros");
  await ctx.close();
}
// reduced motion
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/", { waitUntil: "load", timeout: 240000 });
await p.waitForTimeout(1500);
console.log("reduced-motion: <video> no DOM =", await p.locator("video").count());
await p.screenshot({ path: `scripts/_${prefixo}-reduced.png` });
await b.close();
