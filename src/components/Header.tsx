"use client";

import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { count, open } = useCart();
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartLabel =
    count === 0
      ? "Abrir carrito vacío"
      : `Abrir carrito con ${count === 1 ? "1 producto" : `${count} productos`}`;

  return (
    <header className="site-header" data-elevated={elevated}>
      <Link className="brand" href="/" aria-label={`Inicio de ${site.name}`}>
        {site.name}
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <Link href="/#catalog">Novedades</Link>
        <Link href="/#catalog">Catálogo</Link>
        <Link href="/#catalog">Productos</Link>
        <Link href="/sobre">Nosotras</Link>
      </nav>
      <div className="header-actions">
        <button
          className="icon-button bag-button"
          type="button"
          aria-label={cartLabel}
          title="Carrito"
          onClick={open}
        >
          <Icon name="shopping_bag" />
          {count > 0 && (
            <span className="bag-count" aria-live="polite">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
