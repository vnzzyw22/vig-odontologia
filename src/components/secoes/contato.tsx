"use client";

import { useState } from "react";
import { linkWhatsapp, site, acaoAgendar } from "@/content/site";
import { Botao } from "@/components/ui/botao";
import { IconeInstagram, IconeWhatsapp } from "@/components/ui/icones";

/** O mapa só carrega ao clique: evita requisição ao Google sem consentimento (LGPD) e protege a performance. */
function Mapa() {
  const [carregado, setCarregado] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface)] sm:aspect-[16/11]">
      {carregado ? (
        <iframe
          title={`Mapa: ${site.endereco.completo}`}
          src={site.mapa.embed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-5 p-6 sm:p-8">
          <div>
            <p className="display-md !text-[1.5rem] sm:!text-[1.9rem]">{site.endereco.linha}</p>
            <p className="t-muted">{site.endereco.cidadeUf}</p>
          </div>
          <button type="button" onClick={() => setCarregado(true)} className="btn btn-contorno">
            Ver o mapa aqui
          </button>
          <p className="legenda t-muted max-w-xs">
            Ao carregar o mapa, o Google pode registrar o seu acesso.
          </p>
        </div>
      )}
    </div>
  );
}

export function Contato() {
  return (
    <section id="contato" aria-labelledby="titulo-contato" className="tom-escuro secao">
      <div className="container-vig grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="titulo-contato" className="display-lg">
            Venha conhecer a VIG
          </h2>

          <address className="mt-10 space-y-8 not-italic lg:mt-14">
            <div>
              <p className="display-md !text-[1.5rem] sm:!text-[1.75rem]">
                {site.endereco.linha}
                <br />
                {site.endereco.cidadeUf}
              </p>
            </div>

            <div>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-traco display-md inline-flex items-center gap-3 !text-[1.5rem] sm:!text-[1.75rem]"
              >
                <IconeWhatsapp className="h-6 w-6 text-ouro" /> {site.whatsapp.exibicao}
              </a>
            </div>

            <div>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-traco mt-1 inline-flex items-center gap-3 text-[1.0625rem]"
              >
                <IconeInstagram className="h-5 w-5 text-violeta" /> {site.instagram.usuario}
              </a>
            </div>
          </address>

          <div className="mt-12 flex flex-wrap gap-4">
            <Botao {...acaoAgendar()} variante="ouro">
              Agendar consulta
            </Botao>
            <Botao href={site.mapa.abrir} externo variante="contorno">
              Como chegar
            </Botao>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Mapa />
        </div>
      </div>
    </section>
  );
}
