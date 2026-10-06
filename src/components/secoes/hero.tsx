import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";
import Image from "next/image";
import { site, linkWhatsapp, acaoAgendar } from "@/content/site";
import { Botao } from "@/components/ui/botao";
import { HeroVideo } from "./hero-video";

/**
 * Hero com vídeo de fundo. Arquivos esperados em /public/videos (veja docs/hero-video.md):
 *   hero-dental.mp4          vídeo principal (obrigatório para o vídeo aparecer)
 *   hero-dental-mobile.mp4   versão vertical (opcional; sem ela o principal é usado)
 *   hero-dental-poster.webp  quadro estático (opcional; usado antes do vídeo e em reduced-motion)
 * Sem o vídeo, a Hero mostra um fundo grafite com luz champagne. Detecção no servidor (build/requisição).
 */
const titulo = "Precisão no detalhe, cuidado de perto.";

const existe = (arquivo: string) => fs.existsSync(path.join(process.cwd(), "public", arquivo));

export function Hero() {
  const palavras = titulo.split(" ");
  const desktop = existe("videos/hero-dental.mp4") ? "/videos/hero-dental.mp4" : null;
  const mobile = existe("videos/hero-dental-mobile.mp4") ? "/videos/hero-dental-mobile.mp4" : desktop;
  const poster = existe("videos/hero-dental-poster.webp") ? "/videos/hero-dental-poster.webp" : null;

  return (
    <section
      aria-labelledby="titulo-hero"
      className="tom-fundo relative isolate flex min-h-[min(100svh,44rem)] items-end overflow-hidden md:min-h-[100svh] md:max-h-[62rem]"
    >
      {/* camada 1: fundo estático (poster ou luz champagne), já no HTML do servidor */}
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover object-[62%_50%] md:object-center"
        />
      ) : (
        <div aria-hidden="true" className="hero-sem-video absolute inset-0 -z-10" />
      )}
      {/* camada 2: vídeo (só no cliente, só se existir e for permitido) */}
      {desktop && mobile && <HeroVideo desktop={desktop} mobile={mobile} />}
      {/* camada 3: véu */}
      <div aria-hidden="true" className="hero-veu absolute inset-0 -z-10" />

      {!desktop && site.mostrarPlaceholders && (
        <p className="legenda absolute right-[var(--gutter)] top-[5.75rem] z-10 hidden border border-dashed b-line px-3 py-2 t-muted sm:block">
          Vídeo da Hero a definir
        </p>
      )}

      <div className="container-vig pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[7rem] sm:pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-16">
        <div className="flex flex-col gap-10">
          <div className="max-w-[44rem]">
            <h1 id="titulo-hero" className="display-xl hero-texto max-w-[15ch]" aria-label={titulo}>
              {palavras.map((p, i) => (
                <Fragment key={i}>
                  <span aria-hidden="true" className="hero-palavra" style={{ ["--i" as string]: i }}>
                    {p}
                  </span>
                  {i < palavras.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>

            <p className="lead hero-texto hero-aparece mt-6 !text-white/85 sm:mt-8" style={{ ["--d" as string]: "0.7s" }}>
              Implantes, próteses e estética dental com o Dr. Vinícius Lara e a Dra. Vidian Lara, em Maringá.
            </p>

            <div
              className="hero-aparece mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-10"
              style={{ ["--d" as string]: "0.9s" }}
            >
              <Botao {...acaoAgendar()} variante="ouro">
                Agendar consulta
              </Botao>
              <a href="#posicionamento" className="link-traco text-[0.9875rem] font-medium">
                Conhecer a VIG
              </a>
            </div>
          </div>

          <dl
            className="hero-aparece hero-texto space-y-1 text-[0.875rem] text-white/80"
            style={{ ["--d" as string]: "1.1s" }}
          >
            <div>
              <dt className="sr-only">Endereço</dt>
              <dd>{site.endereco.completo}</dd>
            </div>
            <div>
              <dt className="sr-only">Urgência</dt>
              <dd>
                Urgência 24h:{" "}
                <a
                  href={linkWhatsapp("Olá! Preciso de atendimento de urgência.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-traco"
                >
                  WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
