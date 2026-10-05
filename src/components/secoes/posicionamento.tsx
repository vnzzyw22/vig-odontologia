import { PlaceholderFoto } from "@/components/ui/placeholder-foto";
import { Palavras } from "@/components/movimento/palavras";

const pilares = [
  {
    titulo: "Atendimento exclusivo",
    texto: "Cada paciente é atendido de forma individual, do planejamento ao acompanhamento.",
  },
  {
    titulo: "Tecnologia de alta precisão",
    texto: "A precisão orienta o planejamento e a execução de cada etapa do tratamento.",
  },
  {
    titulo: "Estética humanizada",
    texto: "Uma estética que respeita o seu rosto, o seu jeito de sorrir e a sua história.",
  },
];

export function Posicionamento() {
  return (
    <section id="posicionamento" aria-labelledby="titulo-posicionamento" className="tom-escuro secao">
      <div className="container-vig">
        <Palavras
          id="titulo-posicionamento"
          texto="Tratamento de alto nível, sem perder o cuidado humano."
          className="display-lg max-w-[18ch] lg:max-w-[20ch]"
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <PlaceholderFoto
              assunto="Detalhe do ambiente"
              className="aspect-[180/215] w-32 lg:w-full lg:max-w-[13.5rem]"
            />
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <div>
              <p className="lead">
                Na VIG, “tratamento de estrela” é atenção de verdade para cada caso: a precisão que a odontologia
                moderna permite, com o cuidado de quem olha para você, e não só para o dente.
              </p>
            </div>

            <dl className="mt-12 border-t b-line lg:mt-16">
              {pilares.map((p) => (
                <div key={p.titulo}>
                  <div className="grid gap-2 border-b b-line py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10 sm:py-7">
                    <dt className="display-md !text-[1.45rem] sm:!text-[1.6rem]">{p.titulo}</dt>
                    <dd className="t-muted max-w-md">{p.texto}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
