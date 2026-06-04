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
  const hasDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

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
        {hasDiscount && product.discountPercent !== undefined && (
          <span className="discount-badge">
            -{product.discountPercent}% OFF
          </span>
        )}
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
          <div className="product-price">
            <strong>{formatPrice(product.price)}</strong>
            {hasDiscount && (
              <span className="price-original">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
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
