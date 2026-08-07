import styles from "../styles/Cabecalho.module.scss";
import logo from "../assets/logo-nova.png";

const ABAS = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "produtos", rotulo: "Produtos" },
  { id: "contato", rotulo: "Contato" },
];

export default function Cabecalho({ abaAtiva, aoTrocarAba }) {
  return (
    <header className="sticky top-0 z-40 bg-marfim/90 backdrop-blur ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => aoTrocarAba("inicio")}
          aria-label="Ir para o inicio"
          className="font-display text-xl font-semibold tracking-tight text-campeiro-700 "
        >
          {" "}
          <img src={logo} alt="Distribuidora Riograndense" className={styles.logo} />
        </button>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 sm:flex"
        >
          {ABAS.map((aba) => (
            <button
              key={aba.id}
              onClick={() => aoTrocarAba(aba.id)}
              aria-current={abaAtiva === aba.id ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                abaAtiva === aba.id
                  ? "bg-campeiro-500 text-white"
                  : "text-grafite/70 hover:bg-marfim-soft"
              }`}
            >
              {aba.rotulo}
            </button>
          ))}
        </nav>
      </div>

      {/* Navegação mobile */}
      <nav
        aria-label="Navegação principal (mobile)"
        className="flex sm:hidden items-center justify-around border-t border-grafite/10 px-2 py-1.5"
      >
        {ABAS.map((aba) => (
          <button
            key={aba.id}
            onClick={() => aoTrocarAba(aba.id)}
            aria-current={abaAtiva === aba.id ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              abaAtiva === aba.id
                ? "bg-campeiro-500 text-white"
                : "text-grafite/70 "
            }`}
          >
            {aba.rotulo}
          </button>
        ))}
      </nav>

      {/* Assinatura visual: faixa tricolor sutil (verde / dourado / vermelho) */}
      <div className="h-[3px] w-full bg-faixa-tricolor" />
    </header>
  );
}
