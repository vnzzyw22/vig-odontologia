export type Profissional = {
  id: string;
  nome: string;
  tratamento: "Dr." | "Dra.";
  nomeCurto: string;
  foto: { src: string; alt: string; posicao: string };
  /** Campos futuros: se ficarem vazios, a interface mostra o espaço reservado. */
  cro?: string;
  especialidades?: string[];
  formacao?: string[];
  bio?: string;
};

export const profissionais: Profissional[] = [
  {
    id: "vidian",
    nome: "Dra. Vidian Lara",
    tratamento: "Dra.",
    nomeCurto: "Vidian",
    foto: {
      src: "/images/equipe/dra-vidian.webp",
      alt: "Dra. Vidian Lara sorrindo, de blusa branca, diante de uma estante com parede de mármore.",
      posicao: "50% 38%",
    },
  },
  {
    id: "vinicius",
    nome: "Dr. Vinícius Lara",
    tratamento: "Dr.",
    nomeCurto: "Vinícius",
    foto: {
      src: "/images/equipe/dr-vinicius.webp",
      alt: "Dr. Vinícius Lara sorrindo, de jaleco azul-marinho, com as mãos entrelaçadas sobre a mesa.",
      posicao: "40% 30%",
    },
  },
];
