/** Transição entre páginas: o template remonta a cada navegação e reinicia o fade (CSS, respeita reduced-motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="pagina-entra">{children}</div>;
}
