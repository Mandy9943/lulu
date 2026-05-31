"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { Icon } from "@/components/Icon";
import { ProductGallery } from "@/components/ProductGallery";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import { useState } from "react";

export function ProductDetailClient({ product }: { product: Product }) {
  const colorVariants = product.colorVariants;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeImages = colorVariants
    ? colorVariants[selectedIdx].images
    : undefined;

  const activeVideo = colorVariants
    ? colorVariants[selectedIdx].video
    : undefined;

  const activeVariantLabel = colorVariants
    ? colorVariants[selectedIdx].label
    : undefined;

  return (
    <div className="detail-layout">
      <ProductGallery
        product={product}
        images={activeImages}
        video={activeVideo}
      />

      <div className="detail-copy">
        {product.badge && <span className="pill">{product.badge}</span>}
        <h1>{product.name}</h1>
        <p className="variant">{product.variant}</p>
        <p className="price">{formatPrice(product.price)}</p>
        {product.price > FREE_SHIPPING_THRESHOLD && (
          <p className="shipping-note">
            <Icon name="local_shipping" />
            <span>Envío gratis en Montevideo</span>
          </p>
        )}
        <p>{product.description}</p>

        {product.highlights.length > 0 && (
          <ul className="detail-highlights">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="highlight-chip">
                <Icon name="check_circle" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {colorVariants && (
          <div className="color-variants">
            <p className="color-variant-label">
              Color: <strong>{colorVariants[selectedIdx].label}</strong>
            </p>
            <div className="color-swatches" role="group" aria-label="Color">
              {colorVariants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  className={`color-swatch${i === selectedIdx ? " color-swatch--active" : ""}`}
                  style={{ "--swatch-color": v.hex } as React.CSSProperties}
                  onClick={() => setSelectedIdx(i)}
                  aria-label={`Color ${v.label}`}
                  aria-pressed={i === selectedIdx}
                />
              ))}
            </div>
          </div>
        )}

        <p className="stock-note">
          <Icon name="schedule" />
          <span>Coordinamos entrega y pago por WhatsApp.</span>
        </p>

        <div className="detail-actions">
          <AddToCartButton
            product={product}
            variant="detail"
            variantLabel={activeVariantLabel}
          />
        </div>
      </div>
    </div>
  );
}
