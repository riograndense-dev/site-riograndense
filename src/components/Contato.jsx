import { useState } from "react";
import api from "../api/requests";

const CANAIS = [
  { rotulo: "Telefone", valor: "(55) 3554-1022" },
  {
    rotulo: "E-mail comercial",
    valor: "contato@distribuidorariograndense.com.br",
  },
  { rotulo: "Endereço", valor: "Av. Brasil, 772, Tronqueiras — Miraguaí, RS" },
  { rotulo: "Horário de atendimento", valor: "Seg. a sex., 8h às 18h" },
];

export default function Contato() {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();

    setEnviando(true);
    setErro(false);

    const form = new FormData(e.target);

    const dados = {
      nome: form.get("nome"),
      empresa: form.get("empresa"),
      email: form.get("email"),
      mensagem: form.get("mensagem"),
    };

    try {
      await api.postData("/channel/mail", dados);
      setEnviado(true);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setErro(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <section className="border-t border-grafite/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-500">
            Contato
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Fale conosco
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {CANAIS.map((canal) => (
                  <div key={canal.rotulo}>
                    <dt className="font-mono text-xs uppercase text-grafite/50 ">
                      {canal.rotulo}
                    </dt>
                    <dd className="mt-1 font-display text-base font-medium break-all">
                      {canal.valor}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 aspect-[16/10] overflow-hidden rounded-xl2 shadow-card">
                <iframe
                  alt="Caminhão de entrega de produtos alimentícios"
                  className="h-full w-full object-cover"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4210.228058102125!2d-53.699554850026445!3d-27.457872667041098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1785271001445!5m2!1spt-BR!2sbr"
                  width="600"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>

            <div>
              {erro && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                  Não foi possível enviar sua mensagem. Tente novamente.
                </div>
              )}
              {enviado ? (
                <div className="rounded-xl2 border border-campeiro-300 bg-campeiro-50 p-8 ">
                  <p className="font-display text-lg font-semibold text-campeiro-700 ">
                    Mensagem enviada
                  </p>
                  <p className="mt-2 text-sm text-grafite/70 ">
                    Um vendedor da sua região vai te responder em até um dia
                    útil.
                  </p>
                </div>
              ) : (
                <form onSubmit={aoEnviar} className="space-y-4">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Nome
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-campeiro-400 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="empresa"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-campeiro-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-campeiro-400 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mensagem"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      required
                      className="w-full resize-none rounded-xl border border-grafite/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-campeiro-400 "
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="rounded-full bg-campeiro-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-campeiro-600 disabled:opacity-50"
                  >
                    {enviando ? "Enviando..." : "Enviar mensagem"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
