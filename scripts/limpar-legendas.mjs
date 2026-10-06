// Remove as "legendas" (texto sem sentido gerado pela IA) do lado esquerdo do vídeo do Flow.
//   node scripts/limpar-legendas.mjs <entrada.mp4> <saida.mp4> [tLimpoInicio=5.6] [larguraFaixa=470]
// Método: o texto só aparece sobre um fundo liso. Monta uma "placa limpa" (média de quadros finais, onde o texto já
// sumiu), cobre a faixa esquerda do vídeo todo com ela (borda suave, granulação temporal) e recodifica.
// Premissa: o assunto (dente) nunca entra na faixa esquerda. Confira o resultado antes de usar.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import sharp from "sharp";

const [entrada, saida, tIni = "5.6", faixa = "470"] = process.argv.slice(2);
if (!entrada || !saida) { console.error("Uso: node scripts/limpar-legendas.mjs <entrada.mp4> <saida.mp4> [tLimpoInicio] [larguraFaixa]"); process.exit(1); }
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", entrada]).toString()).streams[0];
const { width: W, height: H } = probe;
const tmp = "scripts/_limpar"; fs.mkdirSync(tmp, { recursive: true });

// 1) placa limpa: média temporal de ~2 s de quadros já sem texto
ff(["-ss", tIni, "-t", "2", "-i", entrada, "-vf", "tmix=frames=47,select=eq(n\\,47)", "-frames:v", "1", `${tmp}/placa.png`]);

// 2) máscara: opaca na faixa esquerda, rampa suave de 90 px até transparente
const ramp = 90, solido = Number(faixa) - ramp;
const linha = Buffer.alloc(W);
for (let x = 0; x < W; x++) linha[x] = x <= solido ? 255 : x >= Number(faixa) ? 0 : Math.round(255 * (1 - (x - solido) / ramp));
const mascara = Buffer.alloc(W * H);
for (let y = 0; y < H; y++) linha.copy(mascara, y * W);
await sharp(mascara, { raw: { width: W, height: H, channels: 1 } }).png().toFile(`${tmp}/mascara.png`);

// 3) cobre o vídeo todo com a placa (com granulação temporal leve para não parecer imagem congelada)
ff([
  "-i", entrada, "-loop", "1", "-i", `${tmp}/placa.png`, "-loop", "1", "-i", `${tmp}/mascara.png`,
  "-filter_complex",
  "[1:v]noise=alls=1:allf=t,format=rgba[p];[2:v]format=gray[m];[p][m]alphamerge[pm];[0:v][pm]overlay=shortest=1:format=auto,format=yuv420p",
  "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-an", saida,
]);
fs.rmSync(tmp, { recursive: true, force: true });
console.log("ok ->", saida);
