/**
 * Dados da marca. Única fonte de verdade para contato, endereço e flags de protótipo.
 * Nada aqui é inventado: tudo veio do briefing do cliente.
 */

const whatsappNumero = "5544999862487";

export const site = {
  nome: "VIG Odontologia",
  descritorLogo: "Bucomaxilofacial | Implantodontia",
  cidade: "Maringá",
  uf: "PR",
  endereco: {
    linha: "Av. Américo Belay, 885",
    cidadeUf: "Maringá/PR",
    completo: "Av. Américo Belay, 885 – Maringá/PR",
  },
  whatsapp: {
    exibicao: "(44) 99986-2487",
    numero: whatsappNumero,
    padrao: "Olá! Gostaria de agendar uma consulta na VIG Odontologia.",
  },
  instagram: {
    usuario: "@vigodontologiaa",
    url: "https://www.instagram.com/vigodontologiaa/",
  },
  mapa: {
    abrir:
      "https://www.google.com/maps/search/?api=1&query=Av.+Am%C3%A9rico+Belay%2C+885%2C+Maring%C3%A1+PR",
    embed:
      "https://www.google.com/maps?q=Av.+Am%C3%A9rico+Belay%2C+885%2C+Maring%C3%A1+PR&output=embed",
  },
  /** rota futura do agendamento inteligente (passos 1–6 do briefing) */
  agendar: "/agendar",
  /** URL pública; definir NEXT_PUBLIC_SITE_URL no deploy */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100",
  /**
   * Protótipo: mostra marcações explícitas do que ainda falta (CRO, fotos, avaliações).
   * Desligar quando o conteúdo real chegar.
   */
  mostrarPlaceholders: true,
} as const;

/**
 * Ligar o agendamento online = trocar esta flag para true (e implementar /agendar).
 * Enquanto for false, todo "Agendar consulta" do site abre o WhatsApp, sem beco sem saída.
 */
export const agendamentoOnline: boolean = false;

export function linkWhatsapp(mensagem: string = site.whatsapp.padrao) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const navegacao = [
  { rotulo: "A VIG", href: "/#posicionamento" },
  { rotulo: "Tratamentos", href: "/#tratamentos" },
  { rotulo: "Profissionais", href: "/#profissionais" },
  { rotulo: "A clínica", href: "/#clinica" },
  { rotulo: "Dúvidas", href: "/#duvidas" },
  { rotulo: "Contato", href: "/#contato" },
] as const;

/** Destino de todo CTA "Agendar consulta". */
export function acaoAgendar(): { href: string; externo: boolean } {
  return agendamentoOnline
    ? { href: site.agendar, externo: false }
    : { href: linkWhatsapp(), externo: true };
}
