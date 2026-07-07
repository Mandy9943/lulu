import { AddToCartButton } from "@/components/AddToCartButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Icon } from "@/components/Icon";
import { InstallmentsHint } from "@/components/InstallmentsHint";
import { formatPrice } from "@/lib/format";
import {
  getCover,
  getMpPrice,
  isLastUnit,
  isProductAvailable,
  type Product,
} from "@/lib/products";
import { PROMO_END_DATE } from "@/lib/promo";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  // Cuenta también las imágenes declaradas dentro de `colorVariants`,
  // porque algunos productos (con selector de color) tienen `images: []`
  // a nivel raíz pero las fotos viven agrupadas por variante.
  const variantPhotos = (product.colorVariants ?? []).reduce(
    (acc, v) => acc + v.images.length,
    0,
  );
  const photoCount = product.images.length + variantPhotos;
  const photoLabel = photoCount === 1 ? "foto" : "fotos";
  const hasDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;
  const outOfStock = !isProductAvailable(product);
  const lastUnit = !outOfStock && isLastUnit(product);

  return (
    <article
      className={`product-card${outOfStock ? " product-card--out" : ""}`}
    >
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
        {lastUnit && (
          <span className="stock-band" aria-label="Última unidad disponible">
            <Icon name="local_fire_department" />
            Última unidad
          </span>
        )}
        {outOfStock && (
          <span className="out-badge">
            <Icon name="block" />
            Agotado
          </span>
        )}
      </div>
      <div className="product-card-content">
        <p className="product-meta">
          <span>{product.category}</span>
          <span>
            {photoCount} {photoLabel}
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
          <AddToCartButton
            product={product}
            variant="quick"
            outOfStock={outOfStock}
          />
        </div>{" "}
        {hasDiscount && product.showCountdown !== false && (
          <div className="product-card-countdown-wrap">
            <CountdownTimer targetDate={PROMO_END_DATE} variant="card" />
          </div>
        )}{" "}
        <InstallmentsHint price={getMpPrice(product)} variant="inline" />{" "}
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
