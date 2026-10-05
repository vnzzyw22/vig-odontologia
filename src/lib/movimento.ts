"use client";

import { useSyncExternalStore } from "react";

export const easeVig = [0.22, 1, 0.36, 1] as const;

const consulta = "(prefers-reduced-motion: reduce)";

function assinar(cb: () => void) {
  const mq = window.matchMedia(consulta);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Hook próprio no lugar do useReducedMotion do framer: o snapshot de servidor é sempre `false`,
 * então não há divergência de hidratação (lição do projeto Illuminare).
 */
export function useMovimentoReduzido() {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
