import { depoimentos } from "@/content/depoimentos";

/**
 * Confiança = o que pacientes reais escreveram no Google (fornecido pelo cliente).
 * Sem nota média, sem total de avaliações e sem estrelas: só o que temos de verdade.
 */
export function Confianca() {
  const [principal, ...demais] = depoimentos;

  return (
    <section id="confianca" aria-labelledby="titulo-confianca" className="tom-claro secao">
      <div className="container-vig">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="titulo-confianca" className="display-lg lg:col-span-7">
            O que os pacientes escrevem sobre a VIG
          </h2>
          <p className="legenda t-muted lg:col-span-4 lg:col-start-9">
            Avaliações públicas no Google, reproduzidas com o texto original.
          </p>
        </div>

        <figure className="mt-14 border-t b-line pt-10 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <blockquote className="display-md lg:col-span-9 !text-[clamp(1.5rem,1.1rem+1.5vw,2.4rem)] !leading-[1.25]">
            “{principal.texto}”
          </blockquote>
          <figcaption className="t-muted mt-6 lg:col-span-3 lg:mt-0 lg:self-end">{principal.autor}</figcaption>
        </figure>

        <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {demais.map((d) => (
            <li key={d.autor} className="border-t b-line pt-6">
              <figure>
                <blockquote className="text-[1rem] leading-[1.6]">“{d.texto}”</blockquote>
                <figcaption className="legenda t-muted mt-4">{d.autor}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
