export type Tratamento = {
  id: string;
  nome: string;
  /** uma linha: o que é, sem promessa */
  resumo: string;
  /** futura página individual (ainda não existe; o CTA hoje abre o WhatsApp) */
  pagina: string;
  /** os três em destaque ganham imagem grande */
  destaque?: boolean;
  /** texto alternativo da imagem de /public/images/tratamentos/<id>.webp, quando ela existir */
  alt: string;
  /** imagem real que já temos (as demais são detectadas em /public/images/tratamentos) */
  imagemFixa?: string;
};

/** Ordem = relevância visual/comercial, sem prioridade clínica. */
export const tratamentos: Tratamento[] = [
  {
    id: "implantes",
    nome: "Implantes dentários",
    resumo: "Reposição de dentes ausentes com implantes fixados no osso.",
    pagina: "/tratamentos/implantes",
    destaque: true,
    alt: "Imagem ilustrativa de implante dentário.",
  },
  {
    id: "estetica",
    nome: "Estética dental",
    resumo: "Cor, forma e proporção dos dentes em harmonia com o seu rosto.",
    pagina: "/tratamentos/estetica-dental",
    destaque: true,
    alt: "Imagem ilustrativa de estética dental.",
  },
  {
    id: "urgencia",
    nome: "Urgência 24h",
    resumo: "Atendimento de urgência 24 horas. Fale com a equipe pelo WhatsApp.",
    pagina: "/tratamentos/urgencia",
    destaque: true,
    alt: "Imagem ilustrativa de atendimento odontológico de urgência.",
  },
  {
    id: "proteses",
    nome: "Próteses totais e protocolo",
    resumo: "Reabilitação de toda a arcada, com foco em função e aparência natural.",
    pagina: "/tratamentos/proteses",
    alt: "Imagem ilustrativa de prótese dentária.",
  },
  {
    id: "clareamento",
    nome: "Clareamento",
    resumo: "Dentes mais claros, com indicação e acompanhamento profissional.",
    pagina: "/tratamentos/clareamento",
    alt: "Imagem ilustrativa de clareamento dental.",
  },
  {
    id: "resina",
    nome: "Resina composta",
    resumo: "Restaurações e correções na cor do dente.",
    pagina: "/tratamentos/resina-composta",
    alt: "Imagem ilustrativa de restauração em resina composta.",
  },
  {
    id: "canal",
    nome: "Tratamento de canal",
    resumo: "Cuida do interior do dente e alivia a dor, preservando o dente.",
    pagina: "/tratamentos/canal",
    alt: "Imagem ilustrativa de tratamento de canal.",
  },
  {
    id: "siso",
    nome: "Extração de siso",
    resumo: "Remoção dos sisos quando indicada, depois de avaliar o seu caso.",
    pagina: "/tratamentos/siso",
    alt: "Imagem ilustrativa de extração de siso.",
  },
  {
    id: "profilaxia",
    nome: "Profilaxia",
    resumo: "Limpeza profissional para manter gengiva e dentes saudáveis.",
    pagina: "/tratamentos/profilaxia",
    alt: "Imagem ilustrativa de limpeza dental profissional.",
  },
];
