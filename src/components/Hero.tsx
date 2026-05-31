import Link from "next/link";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Envíos a Montevideo y todo Uruguay</p>
        <h1 id="hero-title">Cocina bonita para disfrutar todos los días</h1>
        <p>
          Ollas, sartenes y utensilios en tonos suaves, pensados para cocinar
          fácil, ordenar mejor y sumar encanto a tu rutina. Enviamos a
          Montevideo y todo el país.
        </p>
        <Link className="primary-link" href="/#catalog">
          Explorar catálogo
        </Link>
      </div>
    </section>
  );
}
