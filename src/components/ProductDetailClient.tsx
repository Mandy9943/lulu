"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Icon } from "@/components/Icon";
import { InstallmentsHint } from "@/components/InstallmentsHint";
import { ProductGallery } from "@/components/ProductGallery";
import { formatPrice } from "@/lib/format";
import {
  getMpPrice,
  getVariantAvailability,
  isLastUnit,
  isProductAvailable,
  type Product,
} from "@/lib/products";
import { PRESALE_END_DATE, PROMO_END_DATE } from "@/lib/promo";
import { FREE_SHIPPING_THRESHOLD, MONTEVIDEO_SHIPPING_COST } from "@/lib/site";
import { useState } from "react";

export function ProductDetailClient({ product }: { product: Product }) {
  const colorVariants = product.colorVariants;
  // Si la variante inicial está agotada, buscamos una disponible
  // para que el swatch seleccionado no quede bloqueado al cargar.
  const initialIdx = (() => {
    if (!colorVariants) return 0;
    const firstAvailable = colorVariants.findIndex((v) => (v.stock ?? 1) > 0);
    return firstAvailable === -1 ? 0 : firstAvailable;
  })();
  const [selectedIdx, setSelectedIdx] = useState(initialIdx);

  const activeImages = colorVariants
    ? colorVariants[selectedIdx].images
    : undefined;

  const activeVideo = colorVariants
    ? colorVariants[selectedIdx].video
    : product.video;

  const activeVariantLabel = colorVariants
    ? colorVariants[selectedIdx].label
    : undefined;

  const hasDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  const presale = product.presale === true;

  const productOutOfStock = !isProductAvailable(product);
  const activeOutOfStock = !getVariantAvailability(product, activeVariantLabel);
  const outOfStock = productOutOfStock || activeOutOfStock;
  const lastUnit = !outOfStock && isLastUnit(product, activeVariantLabel);

  return (
    <div className="detail-layout">
      <ProductGallery
        product={product}
        images={activeImages}
        video={activeVideo}
      />

      <div className="detail-copy">
        <div className="detail-pills">
          {presale && (
            <span className="pill pill--presale">Preventa exprés</span>
          )}
          {product.badge && <span className="pill">{product.badge}</span>}
          {lastUnit && (
            <span className="pill pill--urgent">
              <Icon name="local_fire_department" />
              Última unidad
            </span>
          )}
          {outOfStock && (
            <span className="pill pill--out">
              <Icon name="block" />
              Agotado
            </span>
          )}
        </div>
        <h1>{product.name}</h1>
        {product.shortDescription && (
          <p className="detail-short-description">{product.shortDescription}</p>
        )}
        {product.variant && <p className="variant">{product.variant}</p>}
        <div className="detail-price">
          <p className="price">{formatPrice(product.price)}</p>
          {hasDiscount && (
            <>
              <span className="price-original price-original--detail">
                {formatPrice(product.originalPrice!)}
              </span>
              {product.discountPercent !== undefined && (
                <span className="discount-badge discount-badge--detail">
                  -{product.discountPercent}% OFF
                </span>
              )}
            </>
          )}
        </div>
        {(hasDiscount || presale) && product.showCountdown !== false && (
          <CountdownTimer
            targetDate={presale ? PRESALE_END_DATE : PROMO_END_DATE}
            variant="detail"
            label={presale ? "Preventa exprés termina en" : "Oferta termina en"}
          />
        )}
        {product.paidShippingMvd ? (
          <p className="shipping-note">
            <Icon name="local_shipping" />
            <span>
              Envío {formatPrice(MONTEVIDEO_SHIPPING_COST)} en Montevideo
            </span>
          </p>
        ) : (
          product.price > FREE_SHIPPING_THRESHOLD && (
            <p className="shipping-note shipping-note--free">
              <Icon name="local_shipping" />
              <span>Envío gratis en Montevideo</span>
            </p>
          )
        )}
        <InstallmentsHint
          price={getMpPrice(product)}
          variant="block"
          logoSrc="/payments/mp-isotipo.svg"
          logoHeight={22}
        />
        {product.descriptionBlocks && product.descriptionBlocks.length > 0 ? (
          <div className="detail-description">
            {product.descriptionBlocks.map((block) => (
              <section key={block.title} className="detail-description-block">
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </section>
            ))}
          </div>
        ) : (
          <p>{product.description}</p>
        )}

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
              {colorVariants.map((v, i) => {
                // Una variante agotada se sigue pudiendo seleccionar para
                // ver sus fotos; sólo bloqueamos la compra en el CTA y en
                // la lógica del carrito.
                const variantOut = productOutOfStock || (v.stock ?? 1) === 0;
                const isSelected = i === selectedIdx;
                return (
                  <button
                    key={v.label}
                    type="button"
                    className={`color-swatch${isSelected ? " color-swatch--active" : ""}${variantOut ? " color-swatch--disabled" : ""}`}
                    style={{ "--swatch-color": v.hex } as React.CSSProperties}
                    onClick={() => setSelectedIdx(i)}
                    aria-disabled={variantOut || undefined}
                    aria-label={`Color ${v.label}${variantOut ? " (agotado)" : ""}`}
                    aria-pressed={isSelected}
                    title={variantOut ? `${v.label} agotado` : v.label}
                  />
                );
              })}
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
            outOfStock={outOfStock}
          />
        </div>
      </div>
    </div>
  );
}
