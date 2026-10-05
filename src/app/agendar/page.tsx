import type { Metadata } from "next";
import { PaginaSimples } from "@/components/layout/pagina-simples";
import { Botao } from "@/components/ui/botao";
import { linkWhatsapp, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Agendar consulta",
  description: "O agendamento online da VIG Odontologia está sendo preparado. Enquanto isso, fale com a equipe pelo WhatsApp.",
  robots: { index: false },
};

/** Fluxo planejado (briefing). Ainda não há agenda, calendário nem horários: só a estrutura da rota. */
const passos = [
  "Escolher o tratamento ou o motivo da consulta",
  "Escolher o profissional ou “sem preferência”",
  "Escolher a data",
  "Escolher o horário",
  "Informar seus dados",
  "Confirmar",
];

export default function Agendar() {
  return (
    <PaginaSimples titulo="Agendamento online, em breve.">
      <p className="lead">
        Estamos preparando uma forma simples de marcar a sua consulta aqui no site. Enquanto isso, a equipe atende
        pelo WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Botao href={linkWhatsapp()} externo variante="grafite">
          Agendar pelo WhatsApp
        </Botao>
        <span className="t-muted text-[0.9375rem]">{site.whatsapp.exibicao}</span>
      </div>

      <h2 className="display-md mt-16">Como vai funcionar</h2>
      <ol className="mt-6 border-t b-line">
        {passos.map((p, i) => (
          <li key={p} className="flex gap-6 border-b b-line py-4">
            <span className="t-accent w-5 shrink-0 font-medium" aria-hidden="true">
              {i + 1}
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ol>
    </PaginaSimples>
  );
}
