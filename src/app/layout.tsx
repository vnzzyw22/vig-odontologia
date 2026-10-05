import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Cabecalho } from "@/components/layout/cabecalho";
import { Rodape } from "@/components/layout/rodape";
import { WhatsappFlutuante } from "@/components/layout/whatsapp-flutuante";

/**
 * Tipografia: Newsreader (display, eixo óptico: em corpo grande fica fina e precisa, em corpo
 * pequeno ganha robustez) + Instrument Sans (interface e texto corrido, leve compressão que
 * dá precisão sem frieza). latin-ext obrigatório para acentos do português.
 */
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

const titulo = "VIG Odontologia | Implantes e estética dental em Maringá";
const descricao =
  "Clínica odontológica em Maringá/PR com atendimento exclusivo e alta precisão: implantes dentários, próteses, estética dental, clareamento e urgência 24h. Dr. Vinícius Lara e Dra. Vidian Lara.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: titulo, template: "%s | VIG Odontologia" },
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: titulo,
    description: descricao,
    url: "/",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "VIG Odontologia, Maringá/PR" }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao, images: ["/images/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#ededeb",
  width: "device-width",
  initialScale: 1,
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.nome,
  url: site.url,
  telephone: "+55 44 99986-2487",
  image: `${site.url}/images/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.linha,
    addressLocality: site.cidade,
    addressRegion: site.uf,
    addressCountry: "BR",
  },
  sameAs: [site.instagram.url],
  employee: [
    { "@type": "Person", name: "Vinícius Lara", jobTitle: "Dr." },
    { "@type": "Person", name: "Vidian Lara", jobTitle: "Dra." },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${instrument.variable}`}>
      <body>
        <noscript>
          <style>{`.mascara-palavra > span{transform:none!important}[style*="clip-path"]{clip-path:none!important}`}</style>
        </noscript>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ouro focus:px-4 focus:py-3 focus:text-grafite-fundo"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <WhatsappFlutuante />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
