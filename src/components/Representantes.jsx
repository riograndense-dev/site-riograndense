import { useState } from "react";

const REPRESENTANTES_MOCK = {
  "Porto Alegre": { nome: "Carlos Menezes", telefone: "(51) 99999-0001" },
  "Caxias do Sul": { nome: "Fernanda Ritter", telefone: "(54) 99999-0002" },
  "Pelotas": { nome: "João Vieira", telefone: "(53) 99999-0003" },
};

async function buscarRepresentante(cidade) {
  await new Promise((r) => setTimeout(r, 500));
  return REPRESENTANTES_MOCK[cidade] ?? null;
}

export default function Representantes() {
  const [cidade, setCidade] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState(null); // representante encontrado
  const [buscou, setBuscou] = useState(false); // já fez uma busca?

  async function aoEnviar(e) {
    e.preventDefault();
    if (!cidade) return;

    setCarregando(true);
    setBuscou(false);
    const rep = await buscarRepresentante(cidade);
    setResultado(rep);
    setBuscou(true);
    setCarregando(false);
  }

  return (
    <section className="border-t border-grafite/10 ">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-500 ">
          Buscar Representante
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Encontre um representante próximo do seu negócio
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <form onSubmit={aoEnviar} className="space-y-4">
              <div>
                <label htmlFor="cidade" className="mb-1.5 block text-sm font-medium">
                  Cidade
                </label>
                <select
                  id="cidade"
                  name="cidade"
                  required
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-campeiro-400 "
                >
                  <option value="" disabled>
                    Selecione sua cidade
                  </option>
                  {/* TODO: trocar por lista real de cidades atendidas */}
                  {Object.keys(REPRESENTANTES_MOCK).map((nomeCidade) => (
                    <option key={nomeCidade} value={nomeCidade}>
                      {nomeCidade}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!cidade || carregando}
                className="rounded-full bg-campeiro-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-campeiro-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {carregando ? "Buscando..." : "Buscar"}
              </button>
            </form>

            {/* Resultado da busca */}
            {buscou && resultado && (
              <div className="mt-6 rounded-xl2 border border-campeiro-300 bg-campeiro-50 p-8 ">
                <p className="font-display text-lg font-semibold text-campeiro-700 ">
                  {resultado.nome}
                </p>
                <p className="mt-2 text-sm text-grafite/70 ">
                  Representante em {cidade} — {resultado.telefone}
                </p>
                <a
                  href={`https://wa.me/55${resultado.telefone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-campeiro-600 hover:underline "
                >
                  Chamar no WhatsApp →
                </a>
              </div>
            )}

            {buscou && !resultado && (
              <div className="mt-6 rounded-xl2 border border-grafite/15 bg-white p-8 ">
                <p className="text-sm text-grafite/70 ">
                  Ainda não temos representante cadastrado para {cidade}. Deixe
                  seu contato que alguém do time comercial retorna pra você.
                </p>
              </div>
            )}
          </div>
        </div>
    

      </div>
      </section>
  );
}