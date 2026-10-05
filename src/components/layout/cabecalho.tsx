"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { linkWhatsapp, navegacao, site, acaoAgendar } from "@/content/site";
import { easeVig } from "@/lib/movimento";
import { Botao } from "@/components/ui/botao";
import { IconeInstagram, IconeWhatsapp } from "@/components/ui/icones";

export function Cabecalho() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const primeiroLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const fechar = useCallback(() => {
    setAberto(false);
    botaoMenu.current?.focus();
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    primeiroLink.current?.focus();
    const fundo = [document.getElementById("conteudo"), document.querySelector("footer")];
    fundo.forEach((el) => el?.setAttribute("inert", ""));
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.documentElement.style.overflow = anterior;
      fundo.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, fechar]);

  const sobreHero = pathname === "/" && !rolou;

  return (
    <>
      <header
        className={`${aberto || sobreHero ? "tom-fundo" : "tom-claro"} fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ${
          rolou && !aberto ? "shadow-[0_1px_0_var(--line)]" : "!bg-transparent"
        }`}
      >
        <div className="container-vig flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5rem]">
          <Link href="/" aria-label={`${site.nome} — página inicial`} className="shrink-0">
            <Image
              src="/images/logo-vig.svg"
              alt={site.nome}
              width={1268}
              height={500}
              preload
              className="h-11 w-auto lg:h-14"
              sizes="120px"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navegacao.map((item) => (
              <Link key={item.href} href={item.href} className="link-traco text-[0.9375rem]">
                {item.rotulo}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Botao {...acaoAgendar()} variante={sobreHero ? "ouro" : "grafite"} className="hidden sm:inline-flex !min-h-11 !px-5">
              Agendar consulta
            </Botao>
            <button
              ref={botaoMenu}
              type="button"
              aria-expanded={aberto}
              aria-controls="menu-movel"
              onClick={() => setAberto((v) => !v)}
              className="relative flex h-11 items-center gap-3 px-1 text-[0.9375rem] font-medium lg:hidden"
            >
              <span>{aberto ? "Fechar" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className="absolute left-0 h-px w-full bg-current transition-transform duration-500"
                  style={{ top: aberto ? "50%" : "0", transform: aberto ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 h-px w-full bg-current transition-transform duration-500"
                  style={{ bottom: aberto ? "auto" : "0", top: aberto ? "50%" : "auto", transform: aberto ? "rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu-movel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="tom-fundo fixed inset-0 z-30 flex flex-col overflow-y-auto overscroll-contain pt-[4.5rem] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easeVig }}
          >
            <nav aria-label="Menu móvel" className="container-vig flex flex-1 flex-col justify-center gap-1 py-8">
              {navegacao.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={i === 0 ? primeiroLink : undefined}
                  onClick={() => setAberto(false)}
                  className="display-md border-b b-line py-4"
                >
                  {item.rotulo}
                </Link>
              ))}
            </nav>
            <div className="container-vig flex flex-col gap-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <Botao {...acaoAgendar()} variante="ouro" className="w-full justify-between">
                Agendar consulta
              </Botao>
              <div className="flex items-center gap-6 text-[0.9375rem]">
                <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link-traco">
                  <IconeWhatsapp className="h-4 w-4" /> {site.whatsapp.exibicao}
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link-traco">
                  <IconeInstagram className="h-4 w-4" /> {site.instagram.usuario}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
