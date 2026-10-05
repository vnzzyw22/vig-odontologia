import { site } from "./site";

export type Pergunta = { id: string; pergunta: string; resposta: string };

export const faq: Pergunta[] = [
  {
    id: "primeira-consulta",
    pergunta: "Como funciona a primeira consulta?",
    resposta:
      "É o momento de a equipe conhecer o seu caso, ouvir o que você busca e orientar sobre os próximos passos. Para marcar, fale com a gente pelo WhatsApp ou clique em “Agendar consulta”.",
  },
  {
    id: "tratamentos",
    pergunta: "Quais tratamentos são realizados na VIG?",
    resposta:
      "Implantes dentários, próteses totais e protocolo, estética dental, clareamento, resina composta, tratamento de canal, extração de siso, profilaxia e atendimento de urgência 24h.",
  },
  {
    id: "agendar",
    pergunta: "Como faço para agendar?",
    resposta:
      "Hoje, o caminho mais direto é o WhatsApp da clínica. O agendamento online, com escolha de tratamento, profissional, data e horário, está sendo preparado.",
  },
  {
    id: "urgencia",
    pergunta: "Atendem urgências?",
    resposta:
      "Sim. A VIG tem atendimento de urgência 24 horas. Se você está com dor ou aconteceu um imprevisto, chame a equipe pelo WhatsApp.",
  },
  {
    id: "onde",
    pergunta: "Onde fica a clínica?",
    resposta: `Na ${site.endereco.completo}. Há um link para abrir o endereço no mapa na seção de contato.`,
  },
  {
    id: "whatsapp",
    pergunta: "Posso falar com a equipe pelo WhatsApp?",
    resposta: `Pode. O número é ${site.whatsapp.exibicao}. Conte o que você precisa e a equipe orienta o melhor caminho.`,
  },
];
