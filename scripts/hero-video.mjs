// Prepara o vídeo da Hero a partir do arquivo bruto (ex.: exportado do Google Flow).
//   node scripts/hero-video.mjs <video-bruto.mp4> [video-vertical.mp4]
// Gera em public/videos: hero-dental.mp4 (desktop), hero-dental-mobile.mp4 (vertical) e hero-dental-poster.webp.
// Sem áudio, H.264, faststart (começa a tocar antes de baixar tudo). Requer ffmpeg no PATH.
// Se não houver vídeo vertical, o mobile é um recorte central 3:4 do vídeo principal.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [entrada, vertical] = process.argv.slice(2);
if (!entrada || !fs.existsSync(entrada)) {
  console.error("Uso: node scripts/hero-video.mjs <video-bruto.mp4> [video-vertical.mp4]");
  process.exit(1);
}
const saida = path.join("public", "videos");
fs.mkdirSync(saida, { recursive: true });

const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
const base = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

// desktop: até 1920 de largura, 30 fps, ~2 a 4 Mbps
ff(["-i", entrada, "-vf", "scale='min(1920,iw)':-2,fps=30", "-crf", "24", "-maxrate", "4M", "-bufsize", "8M", ...base, path.join(saida, "hero-dental.mp4")]);

// mobile: vertical dedicado, ou recorte central 3:4; 810 de largura, ~1 a 2 Mbps
const origemMobile = vertical && fs.existsSync(vertical) ? vertical : entrada;
const filtroMobile = vertical ? "scale=810:-2,fps=30" : "crop=ih*3/4:ih,scale=810:-2,fps=30";
ff(["-i", origemMobile, "-vf", filtroMobile, "-crf", "26", "-maxrate", "2M", "-bufsize", "4M", ...base, path.join(saida, "hero-dental-mobile.mp4")]);

// poster: quadro em 1 s (usado antes do vídeo carregar e em reduced-motion)
ff(["-ss", "1", "-i", entrada, "-frames:v", "1", "-vf", "scale='min(1920,iw)':-2", "-c:v", "libwebp", "-quality", "82", path.join(saida, "hero-dental-poster.webp")]);

for (const f of fs.readdirSync(saida)) {
  console.log(f, Math.round(fs.statSync(path.join(saida, f)).size / 1024) + " KB");
}
console.log("Pronto. Rebuild em produção para detectar os arquivos (no dev basta recarregar).");
