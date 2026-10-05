import { acaoAgendar, agendamentoOnline, linkWhatsapp } from "@/content/site";
import { Palavras } from "@/components/movimento/palavras";
import { Botao } from "@/components/ui/botao";

export function CtaFinal() {
  return (
    <section aria-labelledby="titulo-cta" className="tom-ouro secao">
      <div className="container-vig">
        <Palavras
          id="titulo-cta"
          texto="O primeiro passo é uma conversa."
          className="display-xl max-w-[13ch]"
        />
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="lead lg:col-span-5">
            Conte o que você precisa. A equipe da VIG ajuda a encontrar o melhor caminho para o seu caso.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <Botao {...acaoAgendar()} variante="grafite">
              Agendar consulta
            </Botao>
            {agendamentoOnline && (
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-traco text-[0.9875rem] font-medium"
              >
                Prefiro falar no WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
