"use client";

import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getVariantAvailability,
  isProductAvailable,
  type Product,
} from "@/lib/products";
import { MONTEVIDEO_SHIPPING_COST, site } from "@/lib/site";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "lulu-cart";

interface CartItem {
  slug: string;
  /** Label de la variante de color elegida, ej: "Rosa" */
  variantLabel?: string;
  quantity: number;
}

export interface EnrichedCartItem extends CartItem {
  product: Product;
  /** Indica si este item puntual está agotado. */
  outOfStock: boolean;
}

interface CartContextValue {
  items: EnrichedCartItem[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  /** Costo de envío del pedido (0 si ningún item cobra envío). */
  shippingCost: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, variantLabel?: string) => boolean;
  remove: (slug: string, variantLabel?: string) => void;
  updateQuantity: (slug: string, delta: number, variantLabel?: string) => void;
  checkoutWhatsApp: () => void;
  /** ¿Hay alguna línea agotada en el carrito? */
  hasOutOfStock: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    // Si está vacío, ausente o corrupto, tratar como carrito vacío.
    if (!stored) return [];
    const raw = JSON.parse(stored);
    if (!Array.isArray(raw)) return [];
    return (
      raw
        .filter(
          (item) =>
            item &&
            typeof item.slug === "string" &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            getProductBySlug(item.slug),
        )
        // Descartar items cuyo producto o variante quedó agotado
        // desde la última vez que se abrió el carrito.
        .filter((item) => {
          const product = getProductBySlug(item.slug);
          if (!product) return false;
          return getVariantAvailability(
            product,
            typeof item.variantLabel === "string"
              ? item.variantLabel
              : undefined,
          );
        })
        .map((item) => ({
          slug: item.slug as string,
          variantLabel:
            typeof item.variantLabel === "string"
              ? item.variantLabel
              : undefined,
          quantity: item.quantity as number,
        }))
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hidratar desde localStorage en el cliente.
  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  // Persistir cambios.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Bloquear scroll del body cuando el carrito está abierto.
  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((slug: string, variantLabel?: string): boolean => {
    const product = getProductBySlug(slug);
    if (!product) return false;
    if (!getVariantAvailability(product, variantLabel)) return false;
    setItems((current) => {
      const existing = current.find(
        (item) => item.slug === slug && item.variantLabel === variantLabel,
      );
      if (existing) {
        return current.map((item) =>
          item.slug === slug && item.variantLabel === variantLabel
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { slug, variantLabel, quantity: 1 }];
    });
    setIsOpen(true);
    return true;
  }, []);

  const remove = useCallback((slug: string, variantLabel?: string) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.slug === slug && item.variantLabel === variantLabel),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (slug: string, delta: number, variantLabel?: string) => {
      setItems((current) =>
        current
          .map((item) =>
            item.slug === slug && item.variantLabel === variantLabel
              ? { ...item, quantity: item.quantity + delta }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const enriched = useMemo<EnrichedCartItem[]>(() => {
    return items
      .map((item) => {
        const product = getProductBySlug(item.slug);
        if (!product) return null;
        return {
          ...item,
          product,
          outOfStock: !getVariantAvailability(product, item.variantLabel),
        };
      })
      .filter((item): item is EnrichedCartItem => item !== null);
  }, [items]);

  const count = useMemo(
    () => enriched.reduce((sum, item) => sum + item.quantity, 0),
    [enriched],
  );

  const subtotal = useMemo(
    () =>
      enriched.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [enriched],
  );

  const hasOutOfStock = useMemo(
    () => enriched.some((item) => item.outOfStock),
    [enriched],
  );

  // Envío por pedido: si al menos un producto cobra envío en Montevideo,
  // se cobra una sola vez (no por item).
  const shippingCost = useMemo(
    () =>
      enriched.some((item) => item.product.paidShippingMvd)
        ? MONTEVIDEO_SHIPPING_COST
        : 0,
    [enriched],
  );

  const checkoutWhatsApp = useCallback(() => {
    if (enriched.length === 0) return;
    // Bloquear checkout si hay agotados: el cliente debe quitar
    // los items no disponibles antes de finalizar el pedido.
    if (hasOutOfStock) return;
    const lines = enriched.map(({ product, quantity, variantLabel }) => {
      const colorStr = variantLabel ? ` — ${variantLabel}` : "";
      return `- ${product.name}${colorStr} x${quantity} (${product.variant}) ${formatPrice(
        product.price * quantity,
      )}`;
    });
    const totalsLines =
      shippingCost > 0
        ? [
            `Subtotal: ${formatPrice(subtotal)}`,
            `Envío en Montevideo: ${formatPrice(shippingCost)}`,
            `Total: ${formatPrice(subtotal + shippingCost)}`,
          ]
        : [`Total: ${formatPrice(subtotal)}`];
    const message = [
      "Hola Lulu, quiero pedir estos productos:",
      ...lines,
      "",
      ...totalsLines,
      "",
      "Quedo atenta a confirmar stock, entrega y forma de pago.",
    ].join("\n");
    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }, [enriched, subtotal, shippingCost, hasOutOfStock]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: enriched,
      count,
      subtotal,
      subtotalLabel: formatPrice(subtotal),
      shippingCost,
      isOpen,
      open,
      close,
      add,
      remove,
      updateQuantity,
      checkoutWhatsApp,
      hasOutOfStock,
    }),
    [
      enriched,
      count,
      subtotal,
      shippingCost,
      isOpen,
      open,
      close,
      add,
      remove,
      updateQuantity,
      checkoutWhatsApp,
      hasOutOfStock,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}

// Re-export para conveniencia.
export { isProductAvailable };
