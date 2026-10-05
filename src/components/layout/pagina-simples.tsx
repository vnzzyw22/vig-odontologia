import type { ReactNode } from "react";

/** Casca das páginas internas ainda em preparação (/agendar, /privacidade). */
export function PaginaSimples({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section aria-labelledby="titulo-pagina" className="tom-claro min-h-[80svh] pb-[var(--space-secao)] pt-[8.5rem] lg:pt-[11rem]">
      <div className="container-vig">
        <h1 id="titulo-pagina" className="display-xl max-w-[16ch]">
          {titulo}
        </h1>
        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
