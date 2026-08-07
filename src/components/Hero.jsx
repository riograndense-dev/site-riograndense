import { useState, useEffect } from "react";
import api from "../api/requests";
import image from "../assets/hero.jpeg"

export default function Hero({ aoTrocarAba }) {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let ativo = true;

    api
      .getData("/catalog")
      .then((produtos) => {
        if (ativo) setTotal(produtos.total);
      })
      .catch(console.error);

    return () => {
      ativo = false;
    };
  }, []);
  

  function anos_estrada(){
    const ano_atual = new Date().getFullYear();
    return ano_atual - 2008;
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-500">
            Distribuidora Riograndense
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Do armazém direto
            <br />
            para o seu balcão.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-grafite/70 ">
            Distribuímos os mais diversos tipos de produtos para
            mercados, restaurantes e revendas em boa parte do estado — com entrega
            programada e preço de atacado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => aoTrocarAba("produtos")}
              className="rounded-full bg-campeiro-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-campeiro-600"
            >
              Ver catálogo de produtos
            </button>
            <button
              onClick={() => aoTrocarAba("contato")}
              className="rounded-full border border-grafite/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-marfim-soft "
            >
              Falar com um vendedor
            </button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-grafite/10 pt-6 ">
            <div>
              <dt className="font-mono text-xs uppercase text-grafite/50 ">Itens no catálogo</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">{total}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-grafite/50 ">Municípios atendidos</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">180</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-grafite/50 ">Anos de estrada</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">{anos_estrada()}</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-xl2 shadow-card">
            <img
              src={image}
              alt="Armazém com paletes de produtos alimentícios prontos para distribuição"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl2 bg-erva-400 px-5 py-4 shadow-card sm:block">
            <p className="font-display text-lg font-semibold text-grafite">Entrega em 24–48h</p>
            <p className="text-xs text-grafite/70">para toda a região de abrangência</p>
          </div>
        </div>
      </div>
    </section>
    
  );
}
