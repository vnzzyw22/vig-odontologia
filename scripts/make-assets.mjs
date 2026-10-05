import sharp from "sharp";
import fs from "node:fs";

// ícone: emblema (vetor) sobre grafite
const emb = await sharp("public/images/logo-emblema.png").resize({ height: 190, fit: "inside" }).toBuffer();
await sharp({ create: { width: 256, height: 256, channels: 3, background: "#1A1A1A" } })
  .composite([{ input: emb, gravity: "centre" }]).png().toFile("src/app/icon.png");

// render 3D de implantes — recorte sem textos do cartaz
await sharp("assets-src/cartaz-implantes.jpg")
  .extract({ left: 140, top: 487, width: 830, height: 693 })
  .webp({ quality: 90 }).toFile("public/images/tecnologia/render-implantes.webp");
await sharp("public/images/tecnologia/render-implantes.webp").jpeg({ quality: 88 }).toFile("scripts/_render.jpg");

// retratos (originais já são 1080x1440 JPEG vindos do Instagram) -> WebP de alta qualidade
for (const n of ["dra-vidian", "dr-vinicius", "profissionais-juntos"]) {
  await sharp(`assets-src/${n}.jpg`).webp({ quality: 88 }).toFile(`public/images/equipe/${n}.webp`);
}
// detalhe: escultura dourada (dois perfis) — recorte pequeno do retrato duplo
await sharp("assets-src/profissionais-juntos.jpg").extract({ left: 410, top: 225, width: 180, height: 215 }).webp({ quality: 92 }).toFile("public/images/equipe/escultura-detalhe.webp");
console.log(fs.readdirSync("public/images"), fs.readdirSync("public/images/equipe"));
