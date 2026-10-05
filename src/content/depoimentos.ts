/**
 * Avaliações públicas do Google fornecidas pelo cliente (colhidas em out/2026).
 * Texto reproduzido sem alterar palavras (só espaçamento de pontuação). Nome abreviado (primeiro nome + inicial).
 * Uso conferido e liberado pelo cliente (2026-10-05).
 */
export type Depoimento = { autor: string; texto: string; destaque?: boolean };

export const depoimentos: Depoimento[] = [
  {
    autor: "Anderson M.",
    destaque: true,
    texto:
      "Excelente clínica, atendimento nota 10. Dr Vinicius muito profissional, me explicou tudo durante a consulta do tratamento de canal, me atendeu fora de horários no sábado à noite, consulta dentro do horário marcado. Com certeza ganhou um cliente, e já recomendei a clínica para minha família.",
  },
  {
    autor: "Kátia P.",
    texto:
      "Não conhecia a clínica! E meu primeiro contato com o profissional Dr Vinícius foi maravilhoso! Muito simpático e muito profissional, me acolheu de uma forma maravilhosa e saí da clínica com o problema solucionado! Recomendo e com toda certeza, a partir de agora sou cliente.",
  },
  {
    autor: "Jane R.",
    texto:
      "Ótimo atendimento, dr. Vinicius mãos abençoadas por Deus, me ajudou num momento de dor com tanto carinho, dedicação e paciência, super recomendo a clínica. Atendimento nota 1000.",
  },
  {
    autor: "Mary R.",
    texto:
      "Estou muito agradecida ao atendimento de urgência que tive na clínica VIG Odontologia, tive um dente quebrado e a restauração ficou perfeita e o mais importante com atendimento humanizado. Super indico!",
  },
  {
    autor: "Isabella F.",
    texto:
      "Fomos muito bem atendidos, mesmo em uma emergência às 22h30 de um sábado. Meu marido voltou para casa sem dores, ficamos muito felizes!",
  },
];
