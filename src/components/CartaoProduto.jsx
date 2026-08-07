import estilos from "../styles/textura.module.scss";

const imagemPadrao =
  "https://placehold.co/600x450?text=Sem+Imagem";

export default function CartaoProduto({ produto }) {
  return (
    <article
      className={`${estilos.cardHover} group overflow-hidden rounded-xl2 border border-grafite/10 bg-white shadow-card`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white p-4 ">
        <img
          src={produto.IMAGEM || imagemPadrao}
          alt={produto.DESCRICAO}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = imagemPadrao;}}
        />

        {produto.TEMPROMOCAO === "S" && (
          <span
            className={`${estilos.selo} absolute left-3 top-3 bg-marfim/90 px-3 py-1 font-mono text-[10px] font-medium text-campeiro-700`}
          >
            Oferta
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-grafite/50 ">
          {produto.DEPARTAMENTO} / {produto.CATEGORIA}
        </p>

        <h3 className="mt-1 font-display text-base font-semibold leading-snug">
          {produto.DESCRICAO}
        </h3>

        <div className="mt-2 space-y-1 text-sm text-grafite/60 ">
          <p>Cód.: {produto.CODPROD}</p>
          <p>Embalagem: {produto.EMBALAGEM}</p>
          <p>Unidade: {produto.UNIDADE}</p>
        </div>
      </div>
    </article>
  );
}