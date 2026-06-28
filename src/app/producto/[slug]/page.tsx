import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import {
  getAllSlugs,
  getCover,
  getProductBySlug,
  isProductAvailable,
} from "@/lib/products";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const url = `${site.url}/producto/${product.slug}`;
  const cover = getCover(product);

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description: product.shortDescription,
      images: [{ url: cover, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [cover],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const url = `${site.url}/producto/${product.slug}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.images.map((image) => `${site.url}${image}`),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: site.currency,
      price: product.price,
      availability: isProductAvailable(product)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: site.legalName },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${site.url}/#catalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <article className="product-detail">
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="detail-topbar">
        <Link className="back-to-catalog" href="/#catalog">
          <Icon name="arrow_back" />
          <span>Volver al catálogo</span>
        </Link>
        <nav className="breadcrumbs" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#catalog">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <ProductDetailClient product={product} />
    </article>
  );
}
