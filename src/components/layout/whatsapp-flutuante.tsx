"use client";

import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/content/site";
import { IconeWhatsapp } from "@/components/ui/icones";

/**
 * Acesso persistente ao WhatsApp no celular: um quadrado grafite com contorno dourado,
 * discreto, que só aparece depois da primeira dobra (o CTA do hero já cumpre o papel antes).
 */
export function WhatsappFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.7);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a VIG no WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className="fixed right-4 z-30 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[var(--radius-fino)] border border-ouro/60 bg-grafite-fundo text-ouro shadow-flutuante transition-[opacity,transform,color,background-color] duration-500 hover:bg-ouro hover:text-grafite-fundo lg:hidden"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        opacity: visivel ? 1 : 0,
        transform: visivel ? "none" : "translateY(0.75rem)",
        pointerEvents: visivel ? "auto" : "none",
      }}
    >
      <IconeWhatsapp className="h-6 w-6" />
    </a>
  );
}
