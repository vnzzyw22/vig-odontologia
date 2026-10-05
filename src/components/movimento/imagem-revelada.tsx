"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeVig, useMovimentoReduzido } from "@/lib/movimento";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** object-position da foto dentro do quadro */
  posicao?: string;
  /** quadro: proporção e tamanho vêm de fora via className (ex.: "aspect-[4/5]") */
  className?: string;
  /** deslocamento vertical máximo da foto dentro do quadro, em % (0 = sem parallax) */
  parallax?: number;
  /** direção da máscara de entrada */
  de?: "cima" | "baixo" | "esquerda" | "direita";
  preload?: boolean;
};

const inicio = {
  cima: "inset(0 0 100% 0)",
  baixo: "inset(100% 0 0 0)",
  esquerda: "inset(0 100% 0 0)",
  direita: "inset(0 0 0 100%)",
} as const;

/**
 * Foto com entrada por máscara (clip-path) e parallax muito leve.
 * O contêiner externo não é recortado, então o observador sempre enxerga o elemento.
 */
export function ImagemRevelada({
  src,
  alt,
  sizes,
  posicao = "50% 50%",
  className = "",
  parallax = 5,
  de = "baixo",
  preload,
}: Props) {
  const externo = useRef<HTMLDivElement>(null);
  const dentro = useInView(externo, { once: true, margin: "0px 0px -10% 0px" });
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: externo, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const mostrar = reduzido || dentro;

  return (
    <div ref={externo} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
        animate={{ clipPath: mostrar ? "inset(0 0 0 0)" : inicio[de] }}
        transition={reduzido ? { duration: 0 } : { duration: 1.25, ease: easeVig }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduzido || !parallax ? { scale: parallax ? 1.12 : 1 } : { y, scale: 1.12 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            style={{ objectFit: "cover", objectPosition: posicao }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
