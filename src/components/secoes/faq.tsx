"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faq } from "@/content/faq";
import { easeVig } from "@/lib/movimento";
import { IconeMais } from "@/components/ui/icones";

export function Faq() {
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <section id="duvidas" aria-labelledby="titulo-duvidas" className="tom-branco secao">
      <div className="container-vig grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="titulo-duvidas" className="display-lg lg:col-span-4">
          Dúvidas frequentes
        </h2>

        <ul className="border-t b-line lg:col-span-7 lg:col-start-6">
          {faq.map((p) => {
            const aberto = aberta === p.id;
            return (
              <li key={p.id} className="border-b b-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={`resp-${p.id}`}
                    id={`perg-${p.id}`}
                    onClick={() => setAberta(aberto ? null : p.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  >
                    <span className="display-md !text-[1.3rem] sm:!text-[1.5rem]">{p.pergunta}</span>
                    <IconeMais aberto={aberto} className="h-6 w-6 shrink-0 t-accent" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {aberto && (
                    <motion.div
                      id={`resp-${p.id}`}
                      role="region"
                      aria-labelledby={`perg-${p.id}`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: easeVig }}
                    >
                      <p className="prose-vig t-muted pb-6 pr-10">{p.resposta}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
