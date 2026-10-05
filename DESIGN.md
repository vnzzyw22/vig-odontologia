# VIG Odontologia — Direção de arte (v1, protótipo)

> Hero v2: vídeo de fundo (2026-10-05). Detalhes e como colocar o vídeo em `docs/hero-video.md`.

## Conceito
Dois perfis, um plano. A logo é a fusão de dois rostos em torno de um implante; o site é conduzido por duas pessoas (Dr. Vinícius Lara e Dra. Vidian Lara). Precisão (desenho técnico, fios finos, tipografia leve) + humanidade (retratos reais, texto direto).
Referência de qualidade: luxury healthcare + editorial + arquitetura contemporânea. Não é cópia de nenhuma clínica.

## Cor (tokens em `src/app/globals.css`, bloco `@theme`)
| token | hex | uso |
|---|---|---|
| grafite / grafite-fundo | #1A1A1A / #121212 | seções escuras |
| pedra | #EDEDEB | base clara (cinza frio de mármore, NÃO creme) |
| branco | #FFFFFF | seção de profissionais e FAQ |
| ouro | #C5A059 | fios, ícones em fundo escuro, bloco do CTA final, hover |
| ouro-texto | #7A5F26 | ouro legível em fundo claro (5,1:1) |
| nevoa / chumbo | #A1A1AA / #5C5C62 | texto secundário (escuro / claro) |
| violeta | #7C3AED | SÓ no ícone do Instagram |
Ouro nunca em gradiente, glow ou borda geral. Tons de seção: `tom-claro`, `tom-branco`, `tom-escuro`, `tom-fundo`, `tom-ouro` (cada um define --fg/--muted/--line/--accent).

## Tipografia
- Display: **Newsreader** (peso 300, eixo óptico automático: fina e precisa em corpo grande, robusta em corpo pequeno). Escala `.display-xl/.display-lg/.display-md`.
- Interface/texto: **Instrument Sans** (leve compressão, precisão sem frieza). Texto corrido 17px/1,65.
- Sem caixa alta, sem monoespaçada, sem rótulo acima de título. `latin-ext` carregado (acentos pt-BR).

## Layout e forma
Container 82rem, gutter fluido. Cantos 0 ou 2px (nada de pill/rounded-xl). Fotos retangulares. Listas em linhas com fio, não em cards. Ritmo de fundos: pedra, grafite, pedra, grafite-fundo, branco, grafite, pedra, branco, grafite, ouro, rodapé.
Um momento memorável por área: Posicionamento (frase em máscara de palavras), Precisão (placa 3D com chamadas desenhadas), Profissionais (máscara + eixo central), CTA final (bloco ouro).

## Movimento (`src/components/movimento`)
Hero 100% CSS (não atrasa LCP). Framer só em: palavras do título de Posicionamento/Precisão/CTA, máscara das fotos dos profissionais, desenho das chamadas, parallax leve (profissionais, clínica), acordeões. `prefers-reduced-motion` respeitado (hook próprio, sem erro de hidratação). Sem bounce/spring/scroll-jacking.

## Conteúdo e placeholders (flag `mostrarPlaceholders` em `src/content/site.ts`)
- Fotos da clínica: placeholders explícitos (seção "A clínica" e painéis de tratamento sem foto).
- CRO, especialidades, formação, mini bio: espaço pronto em `content/profissionais.ts`.
- Antes/depois: NÃO criado (regra de publicidade odontológica). Posts do Instagram com antes/depois e texto assado não foram usados.
- Agendamento: `agendamentoOnline = false` → todo "Agendar consulta" abre o WhatsApp; `/agendar` existe como casca com os 6 passos planejados. Trocar a flag liga a rota.
- Logo: RECRIADA em vetor (`scripts/make-logo-vetor.mjs` + `scripts/emblema.mjs`): emblema desenhado à mão (dois perfis + implante + base) e texto em Montserrat convertida em curvas. É aproximação, não a logo oficial: pedir o arquivo vetorial ao cliente.
- Tratamentos: 3 destaques com imagem + lista simples (linha inteira = link para o WhatsApp). Imagens por IA ainda NÃO geradas (sem chave de API): ver `docs/imagens-tratamentos.md`; soltar `public/images/tratamentos/<id>.webp` e o site troca o placeholder.
- Depoimentos: 5 avaliações reais do Google fornecidas pelo cliente (`content/depoimentos.ts`, nome abreviado). Uso conferido e liberado pelo cliente (2026-10-05).

## Futuro
`/agendar` (casca pronta), `/admin`, `/admin/login` (não criados). Páginas de tratamento: campo `pagina` em `content/tratamentos.ts`.

## Ferramentas
`npm run dev` (webpack, porta 3100), `node scripts/shot.mjs` e `scripts/shots-secoes.mjs` (Playwright + Chrome do sistema), `scripts/interacoes.mjs`.

## Hero com vídeo
- Camadas: fundo estático (poster ou grafite com poça de luz champagne) → vídeo → véu (gradiente só onde o texto precisa) → conteúdo.
- Arquivos esperados em `public/videos`: `hero-dental.mp4`, `hero-dental-mobile.mp4` (opcional), `hero-dental-poster.webp` (opcional). `node scripts/hero-video.mjs <bruto.mp4>` gera os três otimizados.
- O vídeo só é montado no cliente e só se não houver prefers-reduced-motion nem economia de dados; senão fica o poster. Sem biblioteca, sem CLS.
- Texto claro sobre o vídeo; cabeçalho fica claro e transparente na Home até rolar, depois vira a barra de pedra. Texto entra com fade + 14px (sem máscara).
- Removida a foto dos dois profissionais da Hero (eles seguem na seção Profissionais).
- Teste visual: `node scripts/shot-hero.mjs <prefixo>` (5 larguras, overflow, erros e reduced-motion).
