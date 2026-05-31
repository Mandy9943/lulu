import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="brand" href="/" aria-label={`Inicio de ${site.name}`}>
        {site.name}
      </Link>
      <nav aria-label="Navegación del pie de página">
        <Link href="/sobre">Sobre {site.name}</Link>
        <Link href="/#catalog">Catálogo</Link>
        <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Contacto</a>
        <Link href="/privacidad">Privacidad</Link>
      </nav>
      <p>
        © {new Date().getFullYear()} {site.legalName}. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
