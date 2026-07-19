import { site } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotras",
  description:
    "Conocé la historia de Lulu: cómo nació en Montevideo con la idea sencilla de que cocinar bien también puede ser bonito.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    type: "website",
    url: `${site.url}/sobre`,
    title: `Sobre nosotras · ${site.name}`,
    description:
      "Conocé la historia de Lulu: cómo nació en Montevideo con la idea sencilla de que cocinar bien también puede ser bonito.",
  },
};

export default function SobrePage() {
  return (
    <main className="about-page">
      {/* Hero ---------------------------------------------------------------- */}
      <section className="about-hero">
        <p className="eyebrow">Nuestra historia</p>
        <h1>
          Cocinar bien también
          <br />
          puede ser&nbsp;<em>bonito</em>
        </h1>
        <p className="about-hero-lead">
          Lulu nació en Montevideo con una idea muy concreta: que los elementos
          de cocina del día a día no tienen que ser feos ni difíciles de usar.
        </p>
      </section>

      {/* Historia ------------------------------------------------------------ */}
      <section className="about-story">
        <div className="about-story-grid">
          <div className="about-story-text">
            <h2>Cómo empecé</h2>
            <p>
              Me llamo Nadin. Lulu nació en 2025 porque me cansé de buscar ollas
              y sartenes que fueran prácticas <em>y</em> lindas al mismo tiempo.
              Todo lo que encontraba era muy industrial o demasiado caro para lo
              que era.
            </p>
            <p>
              Empecé a buscar proveedores por mi cuenta, con mucho cuidado:
              materiales seguros, colores que no desentonaran con cualquier
              cocina, y precios que tuvieran sentido acá en Uruguay. Las
              primeras sartenes las subí a Instagram casi sin querer, y en dos
              semanas se agotaron. Ahí entendí que no era la única que buscaba
              eso.
            </p>
          </div>

          <aside className="about-story-aside">
            <div className="about-pull-quote">
              <blockquote>
                "No quería vender utensilios. Quería que la gente disfrutara más
                el tiempo en su cocina."
              </blockquote>
              <cite>— Nadin, fundadora</cite>
            </div>
          </aside>
        </div>
      </section>

      {/* Valores ------------------------------------------------------------- */}
      <section className="about-values">
        <h2>Lo que nos importa</h2>
        <ul className="about-values-grid">
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">
              🌿
            </span>
            <h3>Materiales seguros</h3>
            <p>
              Sólo trabajamos con productos libres de PFOA y metales pesados.
              Revisamos cada proveedor antes de sumar algo al catálogo.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">
              🎨
            </span>
            <h3>Diseño que dura</h3>
            <p>
              Apostamos a colores y formas atemporales, sin tendencias
              pasajeras. Lo que comprás hoy tiene que seguir gustándote en cinco
              años.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">
              📦
            </span>
            <h3>Envíos a todo Uruguay</h3>
            <p>
              Despachamos desde Montevideo con encomienda. Para compras en la
              capital también tenemos retiro en punto de entrega sin cargo.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">
              💬
            </span>
            <h3>Atención de verdad</h3>
            <p>
              Somos un equipo chico y atendemos nosotras mismas por WhatsApp. Si
              tenés una duda sobre algún producto, te respondemos con
              conocimiento de causa.
            </p>
          </li>
        </ul>
      </section>

      {/* Hoy ----------------------------------------------------------------- */}
      <section className="about-today">
        <div className="about-today-inner">
          <h2>Hoy</h2>
          <p>
            Lulu tiene más de 30 productos en catálogo y enviamos a todo el
            país. Sigo eligiendo cada cosa que vendo y atendiendo yo misma por
            WhatsApp —eso me permite conocer bien lo que ofrezco y estar cerca
            de quien compra.
          </p>
          <Link href="/#catalog" className="btn-primary">
            Ver el catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
