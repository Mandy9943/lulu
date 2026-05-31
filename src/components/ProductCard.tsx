import { AddToCartButton } from "@/components/AddToCartButton";
import { Icon } from "@/components/Icon";
import { formatPrice } from "@/lib/format";
import { getCover, type Product } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const photoLabel = product.images.length === 1 ? "foto" : "fotos";

  return (
    <article className="product-card">
      <div className="product-media">
        <Link
          className="product-image-button"
          href={`/producto/${product.slug}`}
          aria-label={`Ver detalle de ${product.name}`}
        >
          <Image
            src={getCover(product)}
            alt={product.name}
            fill
            sizes="(max-width: 620px) 50vw, (max-width: 900px) 50vw, 25vw"
            priority={priority}
          />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div className="product-card-content">
        <p className="product-meta">
          <span>{product.category}</span>
          <span>
            {product.images.length} {photoLabel}
          </span>
        </p>
        <h3>
          <Link href={`/producto/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-card-footer">
          <strong>{formatPrice(product.price)}</strong>
          <AddToCartButton product={product} variant="quick" />
        </div>{" "}
        {product.price > FREE_SHIPPING_THRESHOLD && (
          <span className="shipping-badge">
            <Icon name="local_shipping" />
            Envío gratis en Mvd.
          </span>
        )}{" "}
      </div>
    </article>
  );
}
