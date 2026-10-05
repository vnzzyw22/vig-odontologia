"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palavras } from "@/components/movimento/palavras";
import { easeVig, useMovimentoReduzido } from "@/lib/movimento";

const itens = [
  {
    titulo: "Planejamento cuidadoso",
    texto: "Cada caso é estudado antes de começar, para que você entenda o caminho antes do primeiro passo.",
  },
  {
    titulo: "Uma experiência pensada nos detalhes",
    texto: "Do primeiro contato ao acompanhamento, o atendimento é conduzido com atenção e com clareza sobre o que vem a seguir.",
  },
  {
    titulo: "Tecnologia a serviço da precisão",
    texto: "O objetivo é um tratamento previsível e confortável, em que cada etapa tem uma razão de ser.",
  },
];

/** Pontos do desenho técnico sobre o render (coordenadas do render 830×693). */
const marcas = [
  { rotulo: "Prótese", x: 604, y: 118, y2: 118 },
  { rotulo: "Pilar", x: 663, y: 372, y2: 372 },
  { rotulo: "Implante", x: 655, y: 545, y2: 545 },
];

const IMG = "/images/tecnologia/render-implantes.webp";
const T0 = { duration: 0 };

function Desenho() {
  const ref = useRef<HTMLDivElement>(null);
  const dentro = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduzido = useMovimentoReduzido();
  const ativo = reduzido || dentro;

  return (
    <div ref={ref}>
      {/* celular: só a imagem, legenda de partes logo abaixo */}
      <svg
        viewBox="0 0 830 693"
        role="img"
        aria-label="Ilustração 3D de prótese sobre quatro implantes."
        className="block w-full md:hidden"
      >
        <image href={IMG} width="830" height="693" />
      </svg>

      {/* tablet/desktop: desenho técnico com chamadas */}
      <svg
        viewBox="0 0 1060 693"
        role="img"
        aria-label="Ilustração 3D de prótese sobre quatro implantes, com a prótese, o pilar e o implante identificados."
        className="hidden w-full md:block"
      >
        <image href={IMG} width="830" height="693" />
        {marcas.map((m, i) => (
          <g key={m.rotulo}>
            <motion.line
              x1={m.x}
              y1={m.y}
              x2={858}
              y2={m.y2}
              stroke="#1A1A1A"
              strokeOpacity="0.55"
              strokeWidth="3"
              initial={false}
              animate={{ pathLength: ativo ? 1 : 0 }}
              transition={reduzido ? T0 : { duration: 1.3, ease: easeVig, delay: 0.25 + i * 0.22 }}
            />
            <motion.line
              x1={m.x}
              y1={m.y}
              x2={858}
              y2={m.y2}
              stroke="#C5A059"
              strokeWidth="1.5"
              initial={false}
              animate={{ pathLength: ativo ? 1 : 0 }}
              transition={reduzido ? T0 : { duration: 1.3, ease: easeVig, delay: 0.25 + i * 0.22 }}
            />
            <motion.circle
              cx={m.x}
              cy={m.y}
              r="6"
              fill="#C5A059"
              stroke="#1A1A1A"
              strokeWidth="2"
              initial={false}
              animate={{ opacity: ativo ? 1 : 0, scale: ativo ? 1 : 0.4 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={reduzido ? T0 : { duration: 0.6, ease: easeVig, delay: 0.2 + i * 0.22 }}
            />
            <motion.text
              x={876}
              y={m.y2 + 8}
              fill="#FFFFFF"
              fontSize="26"
              initial={false}
              animate={{ opacity: ativo ? 1 : 0 }}
              transition={reduzido ? T0 : { duration: 0.8, delay: 1.1 + i * 0.22 }}
            >
              {m.rotulo}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Precisao() {
  return (
    <section id="precisao" aria-labelledby="titulo-precisao" className="tom-fundo secao">
      <div className="container-vig grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Palavras id="titulo-precisao" texto="Precisão em cada etapa" className="display-lg" />
          <dl className="mt-12 border-t b-line lg:mt-16">
            {itens.map((i) => (
              <div key={i.titulo}>
                <div className="border-b b-line py-6">
                  <dt className="display-md !text-[1.45rem] sm:!text-[1.6rem]">{i.titulo}</dt>
                  <dd className="t-muted mt-2 max-w-md">{i.texto}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-7 lg:self-center">
          <Desenho />
          <figcaption className="legenda t-muted mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <span>Ilustração 3D de reabilitação sobre implantes.</span>
            <span className="md:hidden">Da arcada para baixo: prótese, pilares e implantes.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
