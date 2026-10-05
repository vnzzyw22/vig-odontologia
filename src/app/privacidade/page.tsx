import type { Metadata } from "next";
import { PaginaSimples } from "@/components/layout/pagina-simples";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade da VIG Odontologia (em elaboração).",
  robots: { index: false },
};

export default function Privacidade() {
  return (
    <PaginaSimples titulo="Política de privacidade">
      <p className="lead">Esta página é um rascunho e será substituída pela política completa antes do lançamento.</p>
      <div className="prose-vig mt-8 space-y-5">
        <p>
          Hoje, este site não tem formulários e não coleta dados pessoais. Não usamos cookies de rastreamento nem
          ferramentas de análise.
        </p>
        <p>
          Ao clicar nos botões de WhatsApp ou Instagram, você sai do site e passa a seguir as regras desses
          serviços. O mapa só é carregado se você clicar em “Ver o mapa aqui”; nesse caso, o Google pode registrar o
          seu acesso.
        </p>
        <p>
          Quando o agendamento online for lançado, esta política vai explicar quais dados são pedidos, para quê,
          por quanto tempo ficam guardados e como você pode pedir acesso, correção ou exclusão, conforme a LGPD.
        </p>
        <p className="t-muted">Texto provisório, a ser revisado por profissional jurídico antes de ir ao ar.</p>
      </div>
    </PaginaSimples>
  );
}
