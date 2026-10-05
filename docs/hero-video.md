# Vídeo da Hero

A Hero já está pronta para o vídeo. Sem arquivo, mostra grafite com luz champagne e a marca "Vídeo da Hero a definir".

## Como colocar
1. Gere o vídeo no Google Flow (veja o prompt abaixo) e baixe o MP4.
2. `node scripts/hero-video.mjs caminho/do-video.mp4` (opcional: segundo argumento = versão vertical).
   O script cria `public/videos/hero-dental.mp4`, `hero-dental-mobile.mp4` e `hero-dental-poster.webp` (sem áudio, otimizados).
3. Dev: recarregue a página. Produção: rode o build de novo.

Fallbacks: sem `hero-dental-mobile.mp4` o celular usa o principal (com recorte `object-position`). Sem poster, aparece o fundo grafite até o vídeo carregar.
Quem tem "reduzir movimento" ou economia de dados vê só o poster (não baixa o vídeo).

## Especificação
- 16:9, 1080p ou 4K, 6 a 10 s em loop suave, sem áudio, sem texto, sem logo.
- Câmera lenta, plano macro; área à esquerda e embaixo mais calma (é onde fica o texto).
- Peso final alvo: desktop até ~4 MB, mobile até ~2 MB.

## Prompt sugerido para o Flow (inglês)
Cinematic macro shot inside a premium dental ceramics laboratory. A single porcelain dental crown rests on a dark graphite surface, slowly rotating a few degrees while a soft champagne-gold key light travels across its glazed surface, revealing fine translucency and texture. Extremely shallow depth of field, blurred warm background with a hint of marble, deep blacks, restrained editorial color grade (graphite, ivory, champagne gold), slow elegant camera push-in, 35mm anamorphic feel, real commercial production quality. Subject placed right of center, left third calm and dark for text. No people, no hands, no text, no logos, no particles, no neon, no holograms, no blue tones. Seamless loop, 8 seconds, 16:9.

Versão vertical (opcional): mesmo prompt, "9:16 vertical, subject in the upper two thirds, lower third calm and dark".

## Pergunta de revisão
Se o texto sumisse, o vídeo sozinho ainda diria "marca odontológica premium"? Se não, refaça o vídeo, não o texto.
