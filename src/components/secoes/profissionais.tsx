import { profissionais, type Profissional } from "@/content/profissionais";
import { site } from "@/content/site";
import { ImagemRevelada } from "@/components/movimento/imagem-revelada";

/** Espaço arquitetural para CRO, especialidades, formação e mini bio — preenchido pelos dados quando existirem. */
function Credenciais({ p }: { p: Profissional }) {
  const temDados = p.cro || p.especialidades?.length || p.formacao?.length || p.bio;
  if (!temDados) {
    if (!site.mostrarPlaceholders) return null;
    return (
      <p className="legenda t-muted mt-5 max-w-[22rem] border border-dashed b-line px-3.5 py-3">
        CRO, especialidades, formação e mini bio: a incluir.
      </p>
    );
  }
  return (
    <div className="mt-5 max-w-[24rem] space-y-2 text-[0.9375rem]">
      {p.cro && <p className="t-muted">CRO {p.cro}</p>}
      {p.especialidades?.length ? <p>{p.especialidades.join(", ")}</p> : null}
      {p.formacao?.length ? <p className="t-muted">{p.formacao.join(" · ")}</p> : null}
      {p.bio && <p className="prose-vig pt-2">{p.bio}</p>}
    </div>
  );
}

export function Profissionais() {
  const [dra, dr] = profissionais;
  return (
    <section id="profissionais" aria-labelledby="titulo-profissionais" className="tom-branco secao">
      <div className="container-vig">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="titulo-profissionais" className="display-lg lg:col-span-7">
            Quem cuida de você
          </h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="prose-vig t-muted">
              A VIG é conduzida por dois profissionais que você conhece antes mesmo da primeira consulta.
            </p>
          </div>
        </div>

        <div className="relative mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* eixo central: o encontro dos dois perfis da logo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 top-24 hidden w-px bg-[var(--line)] lg:block"
          />

          <article className="lg:col-span-6 lg:pr-10 xl:col-span-5">
            <ImagemRevelada
              src={dra.foto.src}
              alt={dra.foto.alt}
              posicao={dra.foto.posicao}
              sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 44vw, 100vw"
              className="aspect-[4/5] w-full"
              de="baixo"
            />
            <h3 className="display-md mt-7 !text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">{dra.nome}</h3>
            <Credenciais p={dra} />
          </article>

          <article className="lg:col-span-5 lg:col-start-8 lg:mt-[16vw] xl:col-span-4 xl:col-start-8">
            <ImagemRevelada
              src={dr.foto.src}
              alt={dr.foto.alt}
              posicao={dr.foto.posicao}
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
              de="cima"
            />
            <h3 className="display-md mt-7 !text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">{dr.nome}</h3>
            <Credenciais p={dr} />
          </article>
        </div>
      </div>
    </section>
  );
}
