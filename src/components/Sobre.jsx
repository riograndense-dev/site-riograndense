import Hero from "./Hero";
import image from "../assets/about.jpeg"

const DIFERENCIAIS = [
  {
    titulo: "Missão",
    texto:
    "Distribuir produtos de qualidade, com eficiência e agilidade na entrega, para melhor atender nossos clientes."
  },
  {
    titulo: "Visão",
    texto:
    "Tornar-se uma referencia na região noroeste do estado do Rio grande do Sul, no seguimento de distribuição de alimentos e até 2030 ter um carro chefe da própria marca na linha de alimentos."
  },
  {
    titulo: "Valores",
    texto:
    "De forma correta, com ética, comprometimento e respeito aos clientes, distribuindo alimentos de qualidade e procedência, para melhor atender nossos consumidores."
  },
];

export default function Sobre({aoTrocarAba}) {
  return (<>
    <Hero aoTrocarAba={aoTrocarAba}/>
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-erva-500">
            Sobre a distribuidora
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Uma ponte entre o produtor e o seu negócio
          </h2>
          <p className="mt-5 leading-relaxed text-grafite/70 ">
            Fundada em 2008, a empresa surge com o intuito de trabalhar de forma mercado atacadista no município, vendo a necessidade de conseguir produtos, veio à missão de poder ajudar quem trabalha também nesse mesmo ramo, como parceiro dos mercados e de maneira muito simples comprando e revendendo, com poucas linhas de mercadoria e com poucos clientes, e assim com o passar do tempo a empresa vai se desenvolvendo e cravando raízes nesse seguimento de distribuição e se tornando umas das referências neste ramo.
          </p>
          <p className="mt-4 leading-relaxed text-grafite/70 ">
            No decorrer destes anos tudo vai tomando forma. A empresa que era humilde e de origem familiar vai se tornando algo a ser investido e hoje em dia a empresa conta com diversas linhas de produtos desde aves, bovinos, laticínios, peixes, suínos, secos e vegetais e com um amplo mercado atendendo um vasto número de clientes, passou por altos e baixos, mas sempre seguindo firme no ramo e cada ano que se passa a empresa consegue atingir seus objetivos e metas propostas, visando sempre um crescente ano após ano. Contando com estrutura própria com capacidade para 500 toneladas, frota de veículos e funcionários treinados, qualificados e comprometidos com o trabalho
          </p>

          <div className="mt-8 aspect-video overflow-hidden rounded-xl2 shadow-card">
            <img
              src={image}
              alt="Prateleiras de mercado abastecidas com produtos alimentícios"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          {DIFERENCIAIS.map((item, i) => (
            <div
              key={item.titulo}
              className="rounded-xl2 border border-grafite/10 p-6 "
            >
              <span className="font-mono text-xs text-erva-500 ">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grafite/70">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>);
}
