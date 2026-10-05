type Props = {
  /** o que a foto vai mostrar */
  assunto: string;
  className?: string;
  /** descrição curta para leitores de tela */
  rotuloAria?: string;
  /** texto de status sob o assunto */
  status?: string;
};

/**
 * Placeholder explícito de foto. Nunca imagem de banco nem imagem gerada:
 * o bloco diz claramente que a foto real ainda vai entrar. O rótulo fica no topo
 * para continuar legível quando outro bloco se sobrepõe pela base.
 */
export function PlaceholderFoto({ assunto, className = "", rotuloAria, status = "Foto da clínica a definir" }: Props) {
  return (
    <div
      role="img"
      aria-label={rotuloAria ?? `Espaço reservado para foto: ${assunto}`}
      className={`placeholder-foto flex flex-col justify-start gap-1 p-4 sm:p-6 ${className}`}
    >
      <span className="display-md !text-[1.15rem] sm:!text-[1.5rem]">{assunto}</span>
      <span className="legenda t-muted">{status}</span>
    </div>
  );
}
