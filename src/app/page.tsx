import { Hero } from "@/components/secoes/hero";
import { Posicionamento } from "@/components/secoes/posicionamento";
import { Tratamentos } from "@/components/secoes/tratamentos";
import { Precisao } from "@/components/secoes/precisao";
import { Profissionais } from "@/components/secoes/profissionais";
import { Clinica } from "@/components/secoes/clinica";
import { Confianca } from "@/components/secoes/confianca";
import { Faq } from "@/components/secoes/faq";
import { Contato } from "@/components/secoes/contato";
import { CtaFinal } from "@/components/secoes/cta-final";

export default function Home() {
  return (
    <>
      <Hero />
      <Posicionamento />
      <Tratamentos />
      <Precisao />
      <Profissionais />
      <Clinica />
      <Confianca />
      <Faq />
      <Contato />
      <CtaFinal />
    </>
  );
}
