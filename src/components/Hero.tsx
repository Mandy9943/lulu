import Image from "next/image";
import Link from "next/link";
import { Squiggle } from "@/components/Squiggle";

const MARQUEE_ITEMS = [
  "Envíos a todo Uruguay",
  "12 cuotas con Mercado Pago",
  "Cocina bonita todos los días",
  "Tonos suaves que enamoran",
];

function MarqueeRow({ decorative }: { decorative?: boolean }) {
  return (
    <span className="heroG-marquee-row" aria-hidden={decorative || undefined}>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="heroG-marquee-item">
          {item}
          <span className="heroG-marquee-heart">{"♥︎"}</span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="heroG" aria-labelledby="hero-title">
      {/* Fondo decorativo */}
      <div className="heroG-blob heroG-blob--a" aria-hidden="true" />
      <div className="heroG-blob heroG-blob--b" aria-hidden="true" />
      <span className="heroG-spark heroG-spark--1" aria-hidden="true">
        ✦
      </span>
      <span className="heroG-spark heroG-spark--2" aria-hidden="true">
        ✧
      </span>
      <span className="heroG-spark heroG-spark--3" aria-hidden="true">
        ✦
      </span>
      <span className="heroG-spark heroG-spark--4" aria-hidden="true">
        ♥
      </span>
      <span className="heroG-spark heroG-spark--5" aria-hidden="true">
        ✧
      </span>

      <div className="heroG-layout">
        <div className="heroG-copy">
          <p className="heroG-sticker">
            <span aria-hidden="true">✨</span> Colección en rosa
          </p>
          <h1 id="hero-title">
            Cocina{" "}
            <em className="heroG-highlight">
              bonita
              <Squiggle />
            </em>{" "}
            para disfrutar todos los días
          </h1>
          <p className="heroG-lead">
            Ollas, sartenes y utensilios en tonos suaves, pensados para cocinar
            fácil, ordenar mejor y sumar encanto a tu rutina.
          </p>
          <div className="heroG-cta">
            <Link className="primary-link" href="/#catalog">
              Explorar catálogo
            </Link>
            <Link className="heroG-cta-alt" href="/sobre">
              Nuestra historia
            </Link>
          </div>
          <ul className="heroG-trust">
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">
                local_shipping
              </span>
              Envíos a todo el país
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">
                credit_card_heart
              </span>
              Hasta 12 cuotas
            </li>
          </ul>
        </div>

        <div className="heroG-visual">
          <div className="heroG-arch">
            <Image
              src="/hero/lulu-cocina-hero.png"
              alt="Cocina Lulu en tonos rosados con flores y utensilios suaves"
              fill
              priority
              sizes="(max-width: 620px) 78vw, (max-width: 900px) 74vw, 460px"
            />
          </div>

          <figure className="heroG-polaroid heroG-polaroid--a" aria-hidden="true">
            <Image
              src="/productos/set-cocina-rosa-6-piezas/set-rosa-1.jpeg"
              alt=""
              width={160}
              height={160}
            />
            <figcaption>Set rosa ♥</figcaption>
          </figure>

          <figure className="heroG-polaroid heroG-polaroid--b" aria-hidden="true">
            <Image
              src="/productos/olla-cara/1907fda9-4415-41f1-b6a7-911599f9028c.jpeg"
              alt=""
              width={160}
              height={160}
            />
            <figcaption>Único en Uruguay ✿</figcaption>
          </figure>

          <div className="heroG-seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="heroG-seal-circle"
                  d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>
              <text>
                <textPath href="#heroG-seal-circle">
                  cocina bonita ♥ lulu uy ♥
                </textPath>
              </text>
            </svg>
            <span className="heroG-seal-center">✿</span>
          </div>
        </div>
      </div>

      <div className="heroG-marquee">
        <div className="heroG-marquee-track">
          <MarqueeRow />
          <MarqueeRow decorative />
        </div>
      </div>
    </section>
  );
}
