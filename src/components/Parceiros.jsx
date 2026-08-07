import estilos from "../styles/Parceiros.module.scss";
import frutap from "../assets/logo-parceiros/frutap.png";
import mineirinho from "../assets/logo-parceiros/mineirinho.png";
import tupy from "../assets/logo-parceiros/tupy.png";
import vabene from "../assets/logo-parceiros/vabene.png";
import dtalia from "../assets/logo-parceiros/dtalia.png";
import stier from "../assets/logo-parceiros/stier.png";
import mazutti from "../assets/logo-parceiros/mazutti.png";
import plenno from "../assets/logo-parceiros/plenno_.svg";

const parceiros = [frutap, mineirinho, tupy, vabene, dtalia, stier, mazutti, plenno];

export default function Parceiros() {
  return (
    <div className="mx-auto max-w-6xl border-t border-grafite/10 px-5 pt-6 ">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-grafite/50 ">
        Parcerias:
      </p>

      <div className={estilos.container}>
        <div className={estilos.animateScroll}>
          {[...parceiros, ...parceiros].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt=""
              className="h-10 w-auto object-contain sm:h-12"
            />
          ))}
        </div>
      </div>
    </div>
  );
}