import Image from "next/image";
import { Squiggle } from "@/components/Squiggle";

const steps = [
  {
    title: "Elegí tus productos",
    description:
      "Explorá nuestro catálogo y seleccioná tus favoritos para la cocina.",
  },
  {
    title: "Agregalos al carrito",
    description:
      "Sumá los productos que quieras a tu carrito con un solo clic.",
  },
  {
    title: "Finalizá por WhatsApp",
    description:
      "Enviás tu pedido por WhatsApp y coordinamos el pago y el envío hasta la puerta de tu casa.",
  },
];

export function HowToBuy() {
  return (
    <section className="how-to-buy" aria-labelledby="how-to-buy-title">
      <div className="how-to-buy-media">
        <Image
          src="/productos/bateria-premium-15-piezas/rosa-1.jpeg"
          alt="Batería de cocina rosa de Lulu"
          width={720}
          height={720}
          className="how-to-buy-image"
        />
      </div>
      <div className="how-to-buy-copy">
        <p className="g-sticker">
          <span aria-hidden="true">✨</span> Así de fácil
        </p>
        <h2 id="how-to-buy-title">
          Cómo comprar en{" "}
          <em className="g-highlight">
            Lulu
            <Squiggle />
          </em>
        </h2>
        <ol className="how-to-buy-steps">
          {steps.map((step, index) => (
            <li className="how-to-buy-step" key={step.title}>
              <span className="how-to-buy-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
