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

// Loop sem corte: o fim se dissolve na cor do fundo e o começo surge dela (o fundo do vídeo é liso).
// HERO_FADE = segundos de cada transição (padrão 1); HERO_FADE_COR = cor do fundo (padrão #2c2621).
const duracao = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", entrada]).toString().trim());
const fadeD = Number(process.env.HERO_FADE ?? "1");
const fadeCor = process.env.HERO_FADE_COR ?? "#2c2621";
const fades = `,fade=t=in:st=0:d=${fadeD}:color=${fadeCor},fade=t=out:st=${(duracao - fadeD).toFixed(2)}:d=${fadeD}:color=${fadeCor}`;
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
const base = ["-an", "-c:v", "libx264", "-preset", "slow", "-x264-params", "aq-mode=3:aq-strength=1.1", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

// desktop: até 1920 de largura, 30 fps, ~2 a 4 Mbps
ff(["-i", entrada, "-vf", `scale='min(1920,iw)':-2,fps=30${fades}`, "-crf", "24", "-maxrate", "4M", "-bufsize", "8M", ...base, path.join(saida, "hero-dental.mp4")]);

// mobile: vertical dedicado, ou recorte central 3:4; 810 de largura, ~1 a 2 Mbps
const origemMobile = vertical && fs.existsSync(vertical) ? vertical : entrada;
// HERO_FOCO_X (0 a 1): onde está o assunto na horizontal, para o recorte mobile 3:4 (padrão 0.5 = centro)
const foco = process.env.HERO_FOCO_X ?? "0.5";
const filtroMobile = vertical
  ? `scale=810:-2,fps=30${fades}`
  : `crop=ih*3/4:ih:min(max(iw*${foco}-ih*3/8\\,0)\\,iw-ih*3/4):0,scale=810:-2,fps=30${fades}`;
ff(["-i", origemMobile, "-vf", filtroMobile, "-crf", "26", "-maxrate", "2M", "-bufsize", "4M", ...base, path.join(saida, "hero-dental-mobile.mp4")]);

// poster: quadro em 1 s (usado antes do vídeo carregar e em reduced-motion)
// HERO_POSTER_T: segundo do quadro usado como poster (padrão 1)
ff(["-ss", process.env.HERO_POSTER_T ?? "1", "-i", entrada, "-frames:v", "1", "-vf", "scale='min(1920,iw)':-2", "-c:v", "libwebp", "-quality", "82", path.join(saida, "hero-dental-poster.webp")]);

for (const f of fs.readdirSync(saida)) {
  console.log(f, Math.round(fs.statSync(path.join(saida, f)).size / 1024) + " KB");
}
console.log("Pronto. Rebuild em produção para detectar os arquivos (no dev basta recarregar).");
