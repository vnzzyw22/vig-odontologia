import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome" });
const erros = [];
const log = (...a) => console.log(...a);

// DESKTOP
let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
let page = await ctx.newPage();
page.on("console", (m) => ["error", "warning"].includes(m.type()) && erros.push(m.text()));
page.on("pageerror", (e) => erros.push("pageerror " + e.message));
await page.goto("http://localhost:3100/", { waitUntil: "networkidle", timeout: 240000 });
await page.locator("#tratamentos").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.getByRole("button", { name: "Estética dental" }).click();
await page.waitForTimeout(900);
const h3 = await page.locator("#tratamentos h3").innerText();
log("painel trata:", h3);
await page.screenshot({ path: "scripts/_i-trat-estetica.png" });
await page.getByRole("button", { name: "Próteses totais e protocolo" }).click();
await page.waitForTimeout(900);
await page.locator("#tratamentos").screenshot({ path: "scripts/_i-trat-proteses.png" });

await page.locator("#duvidas").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Atendem urgências?" }).click();
await page.waitForTimeout(900);
const resp = await page.locator("#resp-urgencia").isVisible();
log("faq urgencia visivel:", resp, "| aria-expanded:", await page.getByRole("button", { name: "Atendem urgências?" }).getAttribute("aria-expanded"));
await page.locator("#duvidas").screenshot({ path: "scripts/_i-faq.png" });

await page.locator("#contato").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Ver o mapa aqui" }).click();
await page.waitForTimeout(2500);
log("iframe mapa:", await page.locator("iframe").count(), await page.locator("iframe").first().getAttribute("src"));

const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
log("links únicos:", [...new Set(links)].join(" | "));
await ctx.close();

// MOBILE: menu
ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
page = await ctx.newPage();
page.on("pageerror", (e) => erros.push("pageerror " + e.message));
await page.goto("http://localhost:3100/", { waitUntil: "networkidle", timeout: 240000 });
await page.getByRole("button", { name: "Menu" }).click();
await page.waitForTimeout(1100);
await page.screenshot({ path: "scripts/_i-menu-movel.png" });
const foco = await page.evaluate(() => document.activeElement?.textContent);
log("foco ao abrir menu:", foco);
await page.keyboard.press("Escape");
await page.waitForTimeout(900);
log("menu fechado:", (await page.locator("#menu-movel").count()) === 0);
await ctx.close();

// páginas internas
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
page = await ctx.newPage();
for (const r of ["/agendar", "/privacidade"]) {
  const resp = await page.goto("http://localhost:3100" + r, { waitUntil: "networkidle", timeout: 240000 });
  log(r, resp.status());
}
await page.goto("http://localhost:3100/agendar", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "scripts/_i-agendar.png" });
log("erros:", JSON.stringify(erros.slice(0, 8)));
await browser.close();
