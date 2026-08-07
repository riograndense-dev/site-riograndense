import { useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import Sobre from "../../components/Sobre";
import Produtos from "../../components/Produtos";
import Contato from "../../components/Contato";
import Rodape from "../../components/Rodape";


export default function Home() {

  const [abaAtiva, setAbaAtiva] = useState("inicio");

  return (
    <div className="min-h-screen bg-marfim">
      <Cabecalho abaAtiva={abaAtiva} aoTrocarAba={setAbaAtiva} />

      {abaAtiva === "inicio" && (
        <>
          <Produtos aoTrocarAba={setAbaAtiva} />
        </>
      )}
      {abaAtiva === "sobre" && <Sobre aoTrocarAba={setAbaAtiva}/>}
      {abaAtiva === "produtos" && <Produtos />}
      {abaAtiva === "contato" && <Contato />}

      <Rodape />
    </div>
  );
}
