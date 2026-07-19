const steps = [
  {
    emoji: "🛍️",
    title: "Elegí lo que amás",
    description:
      "Navegá por nuestro catálogo y seleccioná esos productos exclusivos en preventa o por encargo que van a transformar tus espacios. ¡Guardá tus favoritos!",
  },
  {
    emoji: "💬",
    title: "Reservalo por WhatsApp",
    description:
      "Hacé clic en el botón de WhatsApp para enviarnos tu pedido. Coordinamos el pago de forma personalizada, rápida y segura para asegurar tu lugar.",
  },
  {
    emoji: "⏳",
    title: "¡Listo, a esperar la magia!",
    description:
      "Tu pedido ya está en camino. En un plazo de 15 a 20 días tus elegidos llegan al depósito y coordinamos el envío o retiro para que estrenes en casa.",
  },
];

export function PresaleGuide() {
  return (
    <section className="presale-guide" aria-labelledby="presale-guide-title">
      <div className="presale-guide-inner">
        <p className="presale-guide-eyebrow">Guía de compra por encargo</p>
        <h2 id="presale-guide-title">
          Traemos tus favoritos del mundo a tu cocina
        </h2>
        <ol className="presale-guide-steps">
          {steps.map((step, index) => (
            <li className="presale-guide-step" key={step.title}>
              <span className="presale-guide-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>
                {step.title}{" "}
                <span aria-hidden="true">{step.emoji}</span>
              </h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
