// Imagem de compartilhamento 1200x630: foto da dupla à direita, logo à esquerda sobre pedra.
import sharp from "sharp";
const W = 1200, H = 630;
const foto = await sharp("assets-src/profissionais-juntos.jpg").resize(520, H, { fit: "cover", position: "attention" }).toBuffer();
const logo = await sharp("public/images/logo-vig.png").resize({ width: 440 }).toBuffer();
await sharp({ create: { width: W, height: H, channels: 3, background: "#EDEDEB" } })
  .composite([{ input: foto, left: W - 520, top: 0 }, { input: logo, left: 90, top: 205 }])
  .jpeg({ quality: 88 }).toFile("public/images/og.jpg");
console.log("og ok");
