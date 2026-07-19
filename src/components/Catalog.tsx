"use client";

import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { Squiggle } from "@/components/Squiggle";
import type { Product } from "@/lib/products";
import { useMemo, useState } from "react";

type SortMode =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "photos-desc"
  | "stock-first";

type FilterGroup = {
  id: string;
  label: string;
  matches: (product: Product) => boolean;
};

const filterGroups: FilterGroup[] = [
  { id: "all", label: "Todos", matches: () => true },
  { id: "ollas", label: "Ollas", matches: (p) => p.type === "ollas" },
  { id: "sartenes", label: "Sartenes", matches: (p) => p.type === "sartenes" },
  {
    id: "utensilios",
    label: "Utensilios",
    matches: (p) => p.type === "utensilios",
  },
  {
    id: "accesorios",
    label: "Accesorios",
    matches: (p) => p.type === "accesorios",
  },
  { id: "favoritos", label: "Favoritos", matches: (p) => Boolean(p.badge) },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function searchText(product: Product): string {
  return normalize(
    [
      product.name,
      product.category,
      product.badge ?? "",
      product.variant,
      product.shortDescription,
      product.description,
      ...product.highlights,
    ].join(" "),
  );
}

export function Catalog({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("stock-first");

  const visible = useMemo(() => {
    const group =
      filterGroups.find((g) => g.id === activeFilter) ?? filterGroups[0];
    const q = normalize(query.trim());
    return products
      .filter((product) => group.matches(product))
      .filter((product) => !q || searchText(product).includes(q))
      .sort((a, b) => {
        if (sortMode === "price-asc") return a.price - b.price;
        if (sortMode === "price-desc") return b.price - a.price;
        if (sortMode === "photos-desc")
          return b.images.length - a.images.length;
        if (sortMode === "stock-first") {
          // Disponibles primero (undefined o > 0), agotados al final;
          // dentro de cada grupo, mantiene el orden de destacados.
          const aOut = a.stock === 0 ? 1 : 0;
          const bOut = b.stock === 0 ? 1 : 0;
          if (aOut !== bOut) return aOut - bOut;
          return products.indexOf(a) - products.indexOf(b);
        }
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [products, activeFilter, query, sortMode]);

  const filterLabel =
    filterGroups.find((g) => g.id === activeFilter)?.label ?? "Todos";
  const productWord = visible.length === 1 ? "producto" : "productos";

  function clearFilters() {
    setActiveFilter("all");
    setQuery("");
    setSortMode("stock-first");
  }

  return (
    <section
      className="catalog-section"
      id="catalog"
      aria-labelledby="catalog-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Catálogo Lulu</p>
        <h2 id="catalog-title">
          Elegí tus{" "}
          <em className="g-highlight">
            favoritos
            <Squiggle />
          </em>{" "}
          para la cocina
        </h2>
      </div>

      <div className="catalog-toolbar" aria-label="Herramientas del catálogo">
        <label className="search-field">
          <Icon name="search" />
          <span className="visually-hidden">Buscar productos</span>
          <input
            type="search"
            name="product-search"
            placeholder="Buscar ollas, sartenes, utensilios..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="catalog-filters" aria-label="Filtrar catálogo">
          {filterGroups.map((group) => (
            <button
              key={group.id}
              className={
                group.id === activeFilter
                  ? "filter-chip is-active"
                  : "filter-chip"
              }
              type="button"
              aria-pressed={group.id === activeFilter}
              onClick={() => setActiveFilter(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>

        <label className="sort-field">
          <span>Ordenar</span>
          <select
            name="product-sort"
            aria-label="Ordenar productos"
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
          >
            <option value="stock-first">Disponibles primero</option>
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="photos-desc">Más imágenes</option>
          </select>
        </label>
      </div>

      <p className="results-summary" aria-live="polite">
        {visible.length} {productWord} · {filterLabel}
        {query ? ` · "${query}"` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="product-grid">
          <div className="empty-results">
            <Icon name="search_off" />
            <h3>No encontramos productos con esos filtros</h3>
            <p>
              Probá buscar por olla, sartén o utensilios, o volvé a ver todo el
              catálogo.
            </p>
            <button
              className="outline-button"
              type="button"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {visible.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      )}
    </section>
  );
}
