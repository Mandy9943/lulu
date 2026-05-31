"use client";

import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/Icon";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  variant?: "quick" | "detail";
  variantLabel?: string;
};

export function AddToCartButton({
  product,
  variant = "quick",
  variantLabel,
}: Props) {
  const { add } = useCart();

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
