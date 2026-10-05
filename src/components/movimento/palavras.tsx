"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ElementType } from "react";
import { easeVig, useMovimentoReduzido } from "@/lib/movimento";

type Props = {
  texto: string;
  como?: ElementType;
  className?: string;
  atraso?: number;
  id?: string;
};

/**
 * Revela o texto palavra a palavra por máscara (as palavras sobem de dentro de uma linha cortada).
 * Observa o contêiner externo — nunca o filho deslocado — para o gatilho sempre disparar.
 * Usar só em poucos títulos-chave: movimento que escolhe onde o olhar pousa.
 */
export function Palavras({ texto, como: Tag = "h2", className = "", atraso = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const dentro = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduzido = useMovimentoReduzido();
  const palavras = texto.split(" ");

  return (
    <Tag ref={ref} id={id} className={className} aria-label={texto}>
      {palavras.map((p, i) => (
        <span key={i} aria-hidden="true" className="mascara-palavra">
          <motion.span
            style={{ display: "inline-block" }}
            initial={false}
            animate={reduzido || dentro ? { y: "0%" } : { y: "105%" }}
            transition={reduzido ? { duration: 0 } : { duration: 0.95, ease: easeVig, delay: atraso + i * 0.045 }}
          >
            {p}
            {i < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
