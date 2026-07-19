import { Catalog } from "@/components/Catalog";
import { Hero } from "@/components/Hero";
import { HowToBuy } from "@/components/HowToBuy";
import { Reviews } from "@/components/Reviews";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ollas, sartenes y utensilios de cocina en Montevideo · Lulu",
  description:
    "Comprá ollas, sartenes y utensilios de cocina en Montevideo. Colecciones en tonos suaves para una cocina práctica y linda. Envíos a todo Uruguay.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ollas, sartenes y utensilios de cocina en Montevideo · Lulu",
    description:
      "Comprá ollas, sartenes y utensilios de cocina en Montevideo. Colecciones en tonos suaves para una cocina práctica y linda. Envíos a todo Uruguay.",
    images: [
      {
        url: "/hero/lulu-cocina-hero.png",
        width: 1672,
        height: 941,
        alt: "Lulu · Cocina bonita para todos los días",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ollas, sartenes y utensilios de cocina en Montevideo · Lulu",
    description:
      "Comprá ollas, sartenes y utensilios de cocina en Montevideo. Colecciones en tonos suaves para una cocina práctica y linda. Envíos a todo Uruguay.",
    images: ["/hero/lulu-cocina-hero.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Catalog products={products} />
      <HowToBuy />
      <Reviews />
    </>
  );
}
