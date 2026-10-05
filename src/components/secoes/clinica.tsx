import { Flutuar } from "@/components/movimento/flutuar";
import { PlaceholderFoto } from "@/components/ui/placeholder-foto";

/**
 * Experiência na clínica — narrativa em três planos (ambiente, consultório, detalhe).
 * As fotos da clínica ainda não existem: cada plano é um placeholder explícito, já com
 * proporção, sobreposição e parallax definidos para receber a foto real sem refazer o layout.
 */
export function Clinica() {
  return (
    <section id="clinica" aria-labelledby="titulo-clinica" className="tom-escuro secao overflow-hidden">
      <div className="container-vig">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="titulo-clinica" className="display-lg lg:col-span-7">
            A clínica, por dentro
          </h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="prose-vig t-muted">
              Cada espaço da VIG é pensado para que você se sinta bem desde a chegada.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-6 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          <div className="col-span-6 lg:col-span-8">
            <PlaceholderFoto assunto="Recepção e ambiente" className="aspect-[16/10] w-full" />
          </div>

          <div className="col-span-3 lg:col-span-4 lg:mt-24">
            <Flutuar distancia={22}>
              <PlaceholderFoto assunto="Consultório" className="aspect-[4/5] w-full" />
            </Flutuar>
          </div>

          <div className="relative z-10 col-span-3 lg:col-span-4 lg:col-start-2 lg:-mt-24">
            <Flutuar distancia={16}>
              <PlaceholderFoto assunto="Detalhes" className="aspect-square w-full !bg-grafite-fundo" />
            </Flutuar>
          </div>

          <p className="legenda t-muted col-span-6 mt-4 max-w-sm lg:col-span-4 lg:col-start-7 lg:mt-0 lg:self-end">
            Recepção, consultório e detalhes: as fotos da clínica entram aqui assim que forem feitas.
          </p>
        </div>
      </div>
    </section>
  );
}
