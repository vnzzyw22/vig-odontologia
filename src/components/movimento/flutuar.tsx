"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMovimentoReduzido } from "@/lib/movimento";

/** Desloca o conteúdo levemente conforme a rolagem (parallax discreto, em px). */
export function Flutuar({
  children,
  distancia = 30,
  className = "",
}: {
  children: ReactNode;
  distancia?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distancia, -distancia]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduzido ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
