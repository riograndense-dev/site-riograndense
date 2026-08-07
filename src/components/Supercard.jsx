import { useEffect, useRef, useState } from "react";
import api from "../api/requests";

const INTERVALO_PADRAO_MS = 10_000; // 1 minuto
const DURACAO_FADE_MS = 350; // precisa bater com a classe duration-* abaixo

/** Pré-carrega uma imagem e só resolve quando ela estiver pronta (ou falhar). */
function preloadImagem(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // não trava o carrossel se a imagem falhar
    img.src = src;
  });
}

export default function SuperCard({
  aoTrocarAba,
  intervaloMs = INTERVALO_PADRAO_MS,
}) {
  const [produto, setProduto] = useState(null);
  const [visivel, setVisivel] = useState(false);
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const timeoutTrocaRef = useRef(null);
  const intervalRef = useRef(null);

  async function buscarProdutoAleatorio() {
    try {
      const res = await api.getData("/product/random");
      return res ?? null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const p = await buscarProdutoAleatorio();
      if (!ativo) return;

      await preloadImagem(p?.IMAGEM);
      if (!ativo) return;

      setProduto(p);
      setCarregandoInicial(false);
      setVisivel(true);
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisivel(false);

      timeoutTrocaRef.current = setTimeout(async () => {
        const novo = await buscarProdutoAleatorio();
        if (novo) {
          await preloadImagem(novo.IMAGEM);
          setProduto(novo);
        }
        setVisivel(true);
      }, DURACAO_FADE_MS);
    }, intervaloMs);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutTrocaRef.current);
    };
  }, [intervaloMs]);

  const imagemPadrao = "https://placehold.co/600x450?text=Sem+Imagem";

  function descer() {
    document.getElementById("catalogo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-grafite"
        style={{
          backgroundImage:
            "repeating-linear-gradient(120deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 32px)",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          {carregandoInicial || !produto ? (
            <div className="grid animate-pulse gap-6 sm:grid-cols-[240px_1fr] sm:items-center">
              <div className="order-2 aspect-[4/3] rounded-xl2 bg-white/5 sm:order-1" />
              <div className="order-1 flex flex-col gap-3 sm:order-2">
                <div className="h-3 w-28 rounded bg-white/10" />
                <div className="h-8 w-4/5 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
                <div className="mt-2 h-10 w-40 rounded-full bg-white/10" />
              </div>
            </div>
          ) : (
            <div
              aria-live="polite"
              className={`grid gap-6 transition-opacity duration-[350ms] ease-in-out sm:grid-cols-[240px_1fr] sm:items-center ${
                visivel ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="order-2 aspect-[4/3] overflow-hidden rounded-xl2 bg-white p-4 shadow-card sm:order-1">
                <img
                  src={produto.IMAGEM}
                  alt={produto.DESCRICAO}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = imagemPadrao;
                  }}
                />
              </div>

              <div className="order-1 sm:order-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pampa-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-pampa-500" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-300">
                    Produto em destaque agora
                  </span>
                </div>

                <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-marfim/50">
                  {produto.DEPARTAMENTO}
                  {produto.CATEGORIA ? ` · ${produto.CATEGORIA}` : ""}
                </p>
                <h1 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-marfim sm:text-3xl">
                  {produto.DESCRICAO}
                </h1>
                <p className="mt-2 text-sm text-marfim/50">
                  Embalagem {produto.EMBALAGEM} · Cód. {produto.CODPROD}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => aoTrocarAba?.("contato")}
                    className="rounded-full bg-campeiro-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-campeiro-600"
                  >
                    Solicitar este produto
                  </button>
                  <button
                    type="button"
                    onClick={() => descer()}
                    className="rounded-full border border-marfim/20 px-5 py-2.5 text-sm font-semibold text-marfim transition-colors hover:bg-white/5"
                  >
                    Ver catálogo completo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
