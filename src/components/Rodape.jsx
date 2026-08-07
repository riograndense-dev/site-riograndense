import { FaInstagram, FaFacebook} from "react-icons/fa";
import styles from "../styles/Rodape.module.scss";
import logo from "../assets/logo-nova2.png";

export default function Rodape() {
  return (
    <footer className="border-t border-grafite/10">
      <div className="h-[3px] w-full bg-faixa-tricolor" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-8 sm:flex-row sm:px-8">
        {/* Logo */}
        <img
          src={logo}
          alt="Distribuidora Riograndense"
          className={styles.logo}
        />

        {/* Redes sociais */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/distribuidora_riograndense/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-grafite transition hover:text-pink-600"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.facebook.com/distribuidorariograndense"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-grafite transition hover:text-blue-600"
          >
            <FaFacebook size={22} />
          </a>
        </div>

        {/* Direitos */}
        <p className="text-center text-xs text-grafite/50">
          © {new Date().getFullYear()} Distribuidora Riograndense. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}