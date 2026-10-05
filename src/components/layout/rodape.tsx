import Image from "next/image";
import Link from "next/link";
import { linkWhatsapp, navegacao, site } from "@/content/site";
import { IconeInstagram, IconeWhatsapp } from "@/components/ui/icones";

export function Rodape() {
  return (
    <footer className="tom-fundo secao-curta">
      <div className="container-vig">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Image
              src="/images/logo-vig.svg"
              alt={site.nome}
              width={1268}
              height={500}
              className="h-16 w-auto"
              sizes="180px"
            />
            <p className="t-muted mt-6 max-w-xs text-[0.9375rem]">
              Odontologia com alta precisão e cuidado humano, em Maringá.
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
            <p className="legenda t-muted mb-4">Navegar</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-traco">
                    {item.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacidade" className="link-traco">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="legenda t-muted mb-4">Fale com a VIG</p>
            <address className="space-y-3 text-[0.9375rem] not-italic">
              <p>
                {site.endereco.linha}
                <br />
                {site.endereco.cidadeUf}
              </p>
              <p>
                <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="link-traco inline-flex items-center gap-2">
                  <IconeWhatsapp className="h-4 w-4 text-ouro" /> {site.whatsapp.exibicao}
                </a>
              </p>
              <p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-traco inline-flex items-center gap-2">
                  <IconeInstagram className="h-4 w-4 text-violeta" /> {site.instagram.usuario}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t b-line pt-6 text-[0.8125rem] t-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.</p>
          {site.mostrarPlaceholders && (
            <p>Responsável técnico e CRO da clínica: a incluir.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
