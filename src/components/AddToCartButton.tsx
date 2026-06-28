"use client";

import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/Icon";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  variant?: "quick" | "detail";
  variantLabel?: string;
  /**
   * Disponibilidad efectiva resuelta por el componente padre (que conoce
   * el producto, sus variantes y cuál está seleccionada). Por defecto
   * se considera disponible para mantener compatibilidad.
   */
  outOfStock?: boolean;
};

export function AddToCartButton({
  product,
  variant = "quick",
  variantLabel,
  outOfStock = false,
}: Props) {
  const { add } = useCart();

  if (outOfStock) {
    if (variant === "detail") {
      return (
        <button
          className="primary-button is-disabled"
          type="button"
          disabled
          aria-disabled="true"
        >
          <span>Agotado</span>
        </button>
      );
    }
    return (
      <button
        className="quick-add is-disabled"
        type="button"
        disabled
        aria-disabled="true"
        aria-label={`${product.name} agotado`}
      >
        <Icon name="shopping_bag" />
        <span>Agotado</span>
      </button>
    );
  }

  if (variant === "detail") {
    return (
      <button
        className="primary-button"
        type="button"
        onClick={() => add(product.slug, variantLabel)}
      >
        <span>Agregar al carrito</span>
      </button>
    );
  }

  return (
    <button
      className="quick-add"
      type="button"
      onClick={() => add(product.slug)}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      <Icon name="shopping_bag" />
      <span>Agregar</span>
    </button>
  );
}
