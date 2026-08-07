import { useEffect, useState } from "react";
import api from "../api/requests";
import CartaoProduto from "./CartaoProduto";
import SuperCard from "./Supercard";
import Parceiros from "./Parceiros";

const ITENS_POR_PAGINA = 32;

export default function Produtos({aoTrocarAba}) {

  const [departamentos, setDepartamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  const [departamentoId, setDepartamentoId] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);
  const [busca, setBusca] = useState("");

  const [page, setPage] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);

  // Departamentos — carrega uma vez
  useEffect(() => {
    api.getData("/departments").then(setDepartamentos).catch(console.error);
  }, []);

  // Categorias — recarrega ao trocar de departamento
  useEffect(() => {
    if (!departamentoId) return;
    let ativo = true;

    api
      .getData(`/departments/${departamentoId}/categories`)
      .then((resultado) => {
        if (ativo) setCategorias(resultado);
      })
      .catch(console.error);

    return () => {
      ativo = false;
    };
  }, [departamentoId]);

  // Aguarda uma breve pausa na busca e descarta respostas de filtros antigos.
  useEffect(() => {
    let ativo = true;
    const timer = setTimeout(async () => {
      setCarregando(true);
      try {
        const params = montarParams(1);
        const res = await api.getData(`/catalog?${params.toString()}`);
        if (!ativo) return;
        setTotal(res.total);
        setProdutos(res.produtos);
      } catch (err) {
        if (ativo) console.error(err);
      } finally {
        if (ativo) setCarregando(false);
      }
    }, 250);

    return () => {
      ativo = false;
      clearTimeout(timer);
    };
  }, [departamentoId, categoriaId, busca]);

  function montarParams(paginaAlvo) {
    const params = new URLSearchParams();
    if (departamentoId) params.set("codepto", departamentoId);
    if (categoriaId) params.set("codsec", categoriaId);
    if (busca.trim()) params.set("busca", busca.trim());
    params.set("page", paginaAlvo);
    params.set("page_size", ITENS_POR_PAGINA);
    return params;
  }

  async function buscarProdutos(paginaAlvo, substituirLista) {
    substituirLista ? setCarregando(true) : setCarregandoMais(true);
    try {
      const params = montarParams(paginaAlvo);
      const res = await api.getData(`/catalog?${params.toString()}`);
      setTotal(res.total);
      setProdutos((atual) =>
        substituirLista ? res.produtos : [...atual, ...res.produtos],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
      setCarregandoMais(false);
    }
  }

  function carregarMais() {
    const proximaPagina = page + 1;
    setPage(proximaPagina);
    buscarProdutos(proximaPagina, false);
  }

  function selecionarDepartamento(id) {
    setDepartamentoId(id);
    setCategoriaId(null);
    setCategorias([]);
    setPage(1);
  }

  function selecionarCategoria(id) {
    setCategoriaId(id);
    setPage(1);
  }

  function atualizarBusca(valor) {
    setBusca(valor);
    setPage(1);
  }

  const temMais = produtos.length < total;

  return (
    <>
      <SuperCard aoTrocarAba={aoTrocarAba} />
      <section className="border-t border-grafite/10 "  id="catalogo">
        <Parceiros />
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-500">
              Catálogo
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Nossos produtos
            </h2>
          </div>

          {/* Busca */}
          <div className="mb-5 max-w-md">
            <input
              type="search"
              value={busca}
              onChange={(e) => atualizarBusca(e.target.value)}
              placeholder="Buscar produto — ex: arroz, café, vinho..."
              className="w-full rounded-full border border-grafite/15 bg-white py-3 px-4 text-sm outline-none focus:border-campeiro-400 "
            />
          </div>

          {/* Departamentos */}
          <div
            role="group"
            aria-label="Filtrar por departamento"
            className="mb-4 flex flex-wrap gap-2"
          >
            <button
              onClick={() => selecionarDepartamento(null)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
                !departamentoId
                  ? "border-erva-500 bg-erva-500 text-white"
                  : "border-grafite/15 text-grafite/70"
              }`}
            >
              Todos
            </button>
            {departamentos.map((dep) => (
              <button
                key={dep.CODEPTO}
                onClick={() => selecionarDepartamento(dep.CODEPTO)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
                  departamentoId === dep.CODEPTO
                    ? "border-erva-500 bg-erva-500 text-white"
                    : "border-grafite/15 text-grafite/70"
                }`}
              >
                {dep.DESCRICAO}
              </button>
            ))}
          </div>

          {/* Categorias — só aparece com departamento selecionado */}
          {departamentoId && (
            <div className="mb-8 max-w-xs">
              <label htmlFor="filtro-categoria" className="sr-only">
                Filtrar por categoria
              </label>
              <div className="relative">
                <select
                  id="filtro-categoria"
                  value={categoriaId ?? ""}
                  onChange={(e) =>
                    selecionarCategoria(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full appearance-none rounded-full border border-grafite/15 bg-white py-2 pl-4 pr-10 text-sm font-medium text-grafite shadow-sm outline-none transition-colors hover:border-grafite/25 focus:border-campeiro-500 focus:ring-2 focus:ring-campeiro-500/20"
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((cat) => (
                    <option key={cat.CODSEC} value={cat.CODSEC}>
                      {cat.DESCRICAO}
                    </option>
                  ))}
                </select>

                {/* Seta customizada — substitui a seta padrão do navegador */}
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          )}

          <p className="mb-4 font-mono text-xs text-grafite/50">
            {produtos.length} de {total} produtos
          </p>

          {carregando ? (
            <p className="text-sm text-grafite/60 ">
              Carregando...
            </p>
          ) : produtos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {produtos.map((produto) => (
                  <CartaoProduto key={produto.CODPROD} produto={produto} />
                ))}
              </div>

              {temMais && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={carregarMais}
                    disabled={carregandoMais}
                    className="rounded-full border border-campeiro-500 px-6 py-2.5 text-sm font-semibold text-campeiro-600 transition-colors hover:bg-campeiro-50 disabled:opacity-50 "
                  >
                    {carregandoMais ? "Carregando..." : "Carregar mais"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl2 border border-dashed border-grafite/20 py-16 text-center ">
              <p className="font-display text-lg font-medium">
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
