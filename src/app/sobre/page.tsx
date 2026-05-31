import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

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
            <h2>Cómo empezamos</h2>
            <p>
              Todo comenzó en 2018 en la cocina de un apartamento pequeño en el
              barrio Pocitos. Valentina, que trabajaba en diseño de interiores, se
              cansó de buscar ollas y sartenes que fueran prácticas <em>y</em>{" "}
              lindas al mismo tiempo —las que encontraba eran o muy industriales
              o demasiado caras.
            </p>
            <p>
              Junto a su amiga Carla, que había pasado años trabajando en
              importación, empezaron a buscar proveedores con cuidado. Querían
              materiales seguros, colores suaves que no desentonaran con cualquier
              cocina, y precios que tuvieran sentido para Uruguay.
            </p>
            <p>
              Los primeros pedidos llegaron en 2019: unas pocas sartenes de
              cerámica en tonos naturales y un set de tazas. Los publicaron en
              Instagram casi sin querer, y en dos semanas se agotaron. Ahí
              entendieron que no eran las únicas que buscaban eso.
            </p>
          </div>

          <aside className="about-story-aside">
            <div className="about-pull-quote">
              <blockquote>
                "No queríamos vender utensilios. Queríamos que la gente disfrutara
                más el tiempo en su cocina."
              </blockquote>
              <cite>— Valentina, cofundadora</cite>
            </div>
          </aside>
        </div>
      </section>

      {/* Valores ------------------------------------------------------------- */}
      <section className="about-values">
        <h2>Lo que nos importa</h2>
        <ul className="about-values-grid">
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">🌿</span>
            <h3>Materiales seguros</h3>
            <p>
              Sólo trabajamos con productos libres de PFOA y metales pesados.
              Revisamos cada proveedor antes de sumar algo al catálogo.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">🎨</span>
            <h3>Diseño que dura</h3>
            <p>
              Apostamos a colores y formas atemporales, sin tendencias pasajeras.
              Lo que comprás hoy tiene que seguir gustándote en cinco años.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">📦</span>
            <h3>Envíos a todo Uruguay</h3>
            <p>
              Despachamos desde Montevideo con encomienda. Para compras en la
              capital también tenemos retiro en punto de entrega sin cargo.
            </p>
          </li>
          <li className="about-value-card">
            <span className="about-value-icon" aria-hidden="true">💬</span>
            <h3>Atención de verdad</h3>
            <p>
              Somos un equipo chico y atendemos nosotras mismas por WhatsApp.
              Si tenés una duda sobre algún producto, te respondemos con conocimiento
              de causa.
            </p>
          </li>
        </ul>
      </section>

      {/* Hoy ----------------------------------------------------------------- */}
      <section className="about-today">
        <div className="about-today-inner">
          <h2>Hoy</h2>
          <p>
            Lulu tiene más de 30 productos en catálogo y envía a todo el país.
            Seguimos siendo un equipo pequeño —eso nos permite elegir bien cada
            cosa que vendemos y mantener una atención cercana.
          </p>
          <p>
            Cada temporada revisamos el catálogo: sacamos lo que no funcionó,
            mejoramos lo que sí, y sumamos alguna novedad que hayamos probado
            primero nosotras en casa.
          </p>
          <Link href="/#catalog" className="btn-primary">
            Ver el catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
