"use client";

import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/Icon";
import { InstallmentsHint } from "@/components/InstallmentsHint";
import { formatPrice } from "@/lib/format";
import { getCover } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import Image from "next/image";
import { useEffect, useRef } from "react";

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

export function CartDrawer() {
  const {
    items,
    subtotal,
    subtotalLabel,
    isOpen,
    close,
    remove,
    updateQuantity,
    checkoutWhatsApp,
    hasOutOfStock,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      const id = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
    if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === "Tab" && drawerRef.current) {
        const focusable = getFocusable(drawerRef.current);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <>
      {isOpen && (
        <div className="cart-backdrop" onClick={close} aria-hidden="true" />
      )}
      <aside
        ref={drawerRef}
        className={isOpen ? "cart-drawer open" : "cart-drawer"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        hidden={!isOpen}
        tabIndex={-1}
      >
        <div className="drawer-header">
          <div>
            <h2 id="cart-title">Tu carrito</h2>
            <p>Tu selección, lista para coordinar</p>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            aria-label="Cerrar carrito"
            title="Cerrar"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div>
                <Icon name="shopping_bag" />
                <p>Tu carrito está vacío por ahora.</p>
              </div>
            </div>
          ) : (
            items.map(({ product, quantity, variantLabel, outOfStock }) => (
              <article
                className={`cart-line${outOfStock ? " cart-line--out" : ""}`}
                key={`${product.slug}::${variantLabel ?? ""}`}
              >
                <Image
                  src={getCover(product)}
                  alt={product.name}
                  width={84}
                  height={84}
                />
                <div>
                  <h3>{product.name}</h3>
                  <p>
                    {variantLabel ? (
                      <>
                        <span className="cart-color-dot" aria-hidden="true" />{" "}
                        {variantLabel} &middot; {product.variant}
                      </>
                    ) : (
                      product.variant
                    )}
                  </p>
                  {outOfStock && (
                    <p className="cart-line-out">
                      <Icon name="block" />
                      <span>Agotado — quitá este producto para continuar.</span>
                    </p>
                  )}
                  <div
                    className="quantity-control"
                    aria-label={`Controles de cantidad para ${product.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${product.name}`}
                      onClick={() =>
                        updateQuantity(product.slug, -1, variantLabel)
                      }
                    >
                      <Icon name="remove" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${product.name}`}
                      onClick={() =>
                        updateQuantity(product.slug, 1, variantLabel)
                      }
                    >
                      <Icon name="add" />
                    </button>
                  </div>
                </div>
                <strong className="line-price">
                  {formatPrice(product.price * quantity)}
                </strong>
                <button
                  className="remove-line"
                  type="button"
                  aria-label={`Quitar ${product.name}`}
                  onClick={() => remove(product.slug, variantLabel)}
                >
                  <Icon name="close" />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="subtotal-row">
            <span>Subtotal</span>
            <strong>{subtotalLabel}</strong>
          </div>
          {subtotal > FREE_SHIPPING_THRESHOLD && (
            <p className="shipping-note">
              <Icon name="local_shipping" />
              <span>Envío gratis en Montevideo</span>
            </p>
          )}
          {items.length > 0 && (
            <InstallmentsHint
              price={subtotal}
              variant="block"
              logoSrc="/payments/mp-isotipo.svg"
              logoHeight={20}
            />
          )}
          <p>
            Escribinos por WhatsApp y te confirmamos stock, entrega y forma de
            pago.
          </p>
          {hasOutOfStock && (
            <p className="cart-checkout-warning" role="status">
              <Icon name="block" />
              <span>
                Tenés productos agotados en el carrito. Quitalos para poder
                finalizar el pedido.
              </span>
            </p>
          )}
          <button
            className="primary-button checkout-button"
            type="button"
            onClick={checkoutWhatsApp}
            disabled={items.length === 0 || hasOutOfStock}
          >
            Comprar por WhatsApp
          </button>
          <button className="text-button" type="button" onClick={close}>
            Seguir explorando
          </button>
        </div>
      </aside>
    </>
  );
}
