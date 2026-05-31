import { Catalog } from "@/components/Catalog";
import { Hero } from "@/components/Hero";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ollas, sartenes y utensilios de cocina en Montevideo · Lulu",
  description:
    "Comprá ollas, sartenes y utensilios de cocina en Montevideo. Colecciones en tonos suaves para una cocina práctica y linda. Envíos a todo Uruguay.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Catalog products={products} />
    </>
  );
}
