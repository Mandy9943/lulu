"use client";

import { formatPrice } from "@/lib/format";
import { getProductBySlug, type Product } from "@/lib/products";
import { site } from "@/lib/site";
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
}

interface CartContextValue {
  items: EnrichedCartItem[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, variantLabel?: string) => void;
  remove: (slug: string, variantLabel?: string) => void;
  updateQuantity: (slug: string, delta: number, variantLabel?: string) => void;
  checkoutWhatsApp: () => void;
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
    return raw
      .filter(
        (item) =>
          item &&
          typeof item.slug === "string" &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          getProductBySlug(item.slug),
      )
      .map((item) => ({
        slug: item.slug as string,
        variantLabel:
          typeof item.variantLabel === "string" ? item.variantLabel : undefined,
        quantity: item.quantity as number,
      }));
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

  const add = useCallback((slug: string, variantLabel?: string) => {
    if (!getProductBySlug(slug)) return;
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
        return product ? { ...item, product } : null;
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

  const checkoutWhatsApp = useCallback(() => {
    if (enriched.length === 0) return;
    const lines = enriched.map(({ product, quantity, variantLabel }) => {
      const colorStr = variantLabel ? ` — ${variantLabel}` : "";
      return `- ${product.name}${colorStr} x${quantity} (${product.variant}) ${formatPrice(
        product.price * quantity,
      )}`;
    });
    const message = [
      "Hola Lulu, quiero pedir estos productos:",
      ...lines,
      "",
      `Total: ${formatPrice(subtotal)}`,
      "",
      "Quedo atenta a confirmar stock, entrega y forma de pago.",
    ].join("\n");
    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }, [enriched, subtotal]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: enriched,
      count,
      subtotal,
      subtotalLabel: formatPrice(subtotal),
      isOpen,
      open,
      close,
      add,
      remove,
      updateQuantity,
      checkoutWhatsApp,
    }),
    [
      enriched,
      count,
      subtotal,
      isOpen,
      open,
      close,
      add,
      remove,
      updateQuantity,
      checkoutWhatsApp,
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
