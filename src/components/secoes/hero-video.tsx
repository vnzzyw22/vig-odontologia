"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUZIDO = "(prefers-reduced-motion: reduce)";
const PEQUENA = "(max-width: 767px), (orientation: portrait)";

function assinar(cb: () => void) {
  const consultas = [window.matchMedia(REDUZIDO), window.matchMedia(PEQUENA)];
  consultas.forEach((q) => q.addEventListener("change", cb));
  return () => consultas.forEach((q) => q.removeEventListener("change", cb));
}

/**
 * Vídeo de fundo da Hero. Só existe no cliente e só quando permitido: sem prefers-reduced-motion e
 * sem economia de dados. Antes disso (e para quem não pode ver movimento) fica o fundo estático
 * renderizado no servidor. Usa o vídeo mobile em telas < 768px. Em loop; a transição fim para começo está embutida no arquivo (scripts/hero-video.mjs). Sem biblioteca: um <video> nativo
 * que aparece em fade quando já pode tocar (posição absoluta, então sem CLS).
 */
export function HeroVideo({ desktop, mobile }: { desktop: string; mobile: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [pronto, setPronto] = useState(false);

  const src = useSyncExternalStore(
    assinar,
    () => {
      const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (window.matchMedia(REDUZIDO).matches || conexao?.saveData) return null;
      return window.matchMedia(PEQUENA).matches ? mobile : desktop;
    },
    () => null,
  );

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [src]);

  if (!src) return null;
  return (
    <video
      ref={ref}
      key={src}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setPronto(true)}
      className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_50%] transition-opacity duration-[1400ms] ease-out md:object-center"
      style={{ opacity: pronto ? 1 : 0 }}
    />
  );
}
