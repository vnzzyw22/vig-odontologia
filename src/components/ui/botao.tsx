import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  variante?: "ouro" | "grafite" | "contorno";
  children: ReactNode;
  /** abre em nova aba (links externos) */
  externo?: boolean;
  traco?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function Botao({ href, variante = "ouro", children, externo, traco = false, className = "", ...rest }: Props) {
  const classe = `btn btn-${variante} ${className}`;
  const conteudo = (
    <>
      <span>{children}</span>
      {externo && <span className="sr-only"> (abre em nova aba)</span>}
      {traco && <span className="btn-traco" aria-hidden="true" />}
    </>
  );
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classe} {...rest}>
        {conteudo}
      </a>
    );
  }
  return (
    <Link href={href} className={classe} {...rest}>
      {conteudo}
    </Link>
  );
}
