import Image from "next/image";
import { Icon } from "@/components/Icon";

type Review = {
  /** Ruta bajo /public, ej. "/reviews/resena-x.jpeg". null = placeholder hasta tener la captura. */
  image: string | null;
  alt: string;
  rating: number;
  width: number;
  height: number;
};

const reviews: Review[] = [
  {
    image: "/reviews/resena-ollas-divinas-instagram.jpeg",
    alt: "Chat de una clienta: recién le llegaron las ollas, están muy divinas y las va a subir a Instagram",
    rating: 5,
    width: 1206,
    height: 1077,
  },
  {
    image: "/reviews/resena-cocina-rosa-equipada.jpeg",
    alt: "Chat de una clienta mostrando su cocina equipada en rosa con productos de Lulu",
    rating: 5,
    width: 1118,
    height: 2048,
  },
  {
    image: "/reviews/resena-ollas-hermosas.jpeg",
    alt: "Chat de una clienta: le llegaron las ollas, las lavó para estrenarlas y están muy hermosas",
    rating: 5,
    width: 1206,
    height: 1275,
  },
  {
    image: "/reviews/resena-compra-apilables-feliz.jpeg",
    alt: "Chat de una clienta súper feliz con la compra, mostrando sus utensilios rosados apilados",
    rating: 5,
    width: 1206,
    height: 1417,
  },
  {
    image: "/reviews/resena-mejor-inversion-ollas.jpeg",
    alt: "Mensaje de una clienta: mi mejor inversión fueron esas ollas",
    rating: 5,
    width: 1205,
    height: 888,
  },
  {
    image: "/reviews/resena-ml-sarten-panqueques.jpeg",
    alt: "Reseña de 5 estrellas del sartén antiadherente para panqueques y huevos",
    rating: 5,
    width: 1074,
    height: 1479,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="review-stars"
      role="img"
      aria-label={`${rating} de 5 estrellas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "star star--filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="section-heading">
        <p className="eyebrow">Reseñas reales de clientas reales</p>
        <h2 id="reviews-title">Lo que dicen de Lulu</h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <figure className="review-card" key={index}>
            <Stars rating={review.rating} />
            {review.image ? (
              <Image
                src={review.image}
                alt={review.alt}
                width={review.width}
                height={review.height}
                sizes="(max-width: 900px) 90vw, 30vw"
                className="review-image"
              />
            ) : (
              <div className="review-image review-image--placeholder">
                <Icon name="chat" />
                <span>Captura próximamente</span>
              </div>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
