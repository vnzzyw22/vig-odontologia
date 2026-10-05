import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { tratamentos, type Tratamento } from "@/content/tratamentos";
import { linkWhatsapp } from "@/content/site";
import { PlaceholderFoto } from "@/components/ui/placeholder-foto";

/**
 * Tratamentos: tudo visível, nada escondido. Três em destaque (com imagem) e os demais numa lista
 * simples em que a linha inteira é o link. Sem abas, painel lateral nem acordeão.
 * Imagem de um tratamento = arquivo em /public/images/tratamentos/<id>.webp (detectado no build).
 */
function imagemDe(t: Tratamento) {
  if (t.imagemFixa) return t.imagemFixa;
  const arquivo = `/images/tratamentos/${t.id}.webp`;
  return fs.existsSync(path.join(process.cwd(), "public", arquivo)) ? arquivo : null;
}

const mensagem = (t: Tratamento) => linkWhatsapp(`Olá! Gostaria de conhecer melhor o tratamento: ${t.nome}.`);

function Destaque({ t, proporcao, tamanhos }: { t: Tratamento; proporcao: string; tamanhos: string }) {
  const src = imagemDe(t);
  return (
    <article>
      <a
        href={mensagem(t)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`Conhecer tratamento: ${t.nome} (abre o WhatsApp em nova aba)`}
      >
        {src ? (
          <div className={`relative w-full overflow-hidden bg-[#bcbdbf] ${proporcao}`}>
            <Image
              src={src}
              alt={t.alt}
              fill
              sizes={tamanhos}
              className="transition-transform duration-[1200ms] ease-[var(--ease-vig)] group-hover:scale-[1.03]"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <PlaceholderFoto assunto={t.nome} status="Imagem do tratamento a definir" className={`w-full ${proporcao}`} />
        )}
        <h3 className="display-md mt-5 !text-[1.7rem] sm:!text-[2rem]">{t.nome}</h3>
        <p className="t-muted mt-1.5 max-w-[34ch]">{t.resumo}</p>
        <span className="link-traco mt-4 text-[0.9375rem] font-medium">Conhecer tratamento</span>
      </a>
    </article>
  );
}

export function Tratamentos() {
  const destaques = tratamentos.filter((t) => t.destaque);
  const demais = tratamentos.filter((t) => !t.destaque);
  const [principal, ...laterais] = destaques;

  return (
    <section id="tratamentos" aria-labelledby="titulo-tratamentos" className="tom-claro secao">
      <div className="container-vig">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="titulo-tratamentos" className="display-lg lg:col-span-7">
            Tratamentos
          </h2>
          <p className="prose-vig t-muted lg:col-span-4 lg:col-start-9">
            Toque em um tratamento para falar com a equipe sobre ele.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 lg:mt-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Destaque t={principal} proporcao="aspect-[5/4] lg:aspect-square" tamanhos="(min-width: 1024px) 56vw, 100vw" />
          </div>
          <div className="grid gap-14 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {laterais.map((t) => (
              <Destaque key={t.id} t={t} proporcao="aspect-[16/9]" tamanhos="(min-width: 1024px) 40vw, (min-width: 640px) 46vw, 100vw" />
            ))}
          </div>
        </div>

        <ul className="mt-20 border-t b-line lg:mt-28" aria-label="Outros tratamentos">
          {demais.map((t) => (
            <li key={t.id} className="border-b b-line">
              <a
                href={mensagem(t)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Conhecer tratamento: ${t.nome} (abre o WhatsApp em nova aba)`}
                className="group grid items-baseline gap-x-8 gap-y-1 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:py-6"
              >
                <span className="display-md !text-[1.4rem] transition-transform duration-500 ease-[var(--ease-vig)] group-hover:translate-x-2 sm:!text-[1.65rem]">
                  {t.nome}
                </span>
                <span className="t-muted">{t.resumo}</span>
                <span className="link-traco hidden text-[0.9375rem] font-medium md:inline-block">Conhecer tratamento</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
