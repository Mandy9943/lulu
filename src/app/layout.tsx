import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Cocina bonita para todos los días`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/logo-square.svg", type: "image/svg+xml" }],
    apple: "/logo-square.svg",
  },
  keywords: [
    "ollas",
    "sartenes",
    "utensilios de cocina",
    "batería de cocina",
    "cocina Uruguay",
    "Lulu",
    "Montevideo",
    "cocina Montevideo",
    "ollas Uruguay",
    "sartenes Uruguay",
    "utensilios cocina Montevideo",
    "comprar ollas Montevideo",
    "batería de cocina Uruguay",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-UY": "/" },
  },
  other: {
    "geo.region": "UY-MO",
    "geo.placename": "Montevideo, Uruguay",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Cocina bonita para todos los días`,
    description: site.description,
    images: [
      {
        url: "/hero/lulu-cocina-hero.png",
        width: 1672,
        height: 941,
        alt: `${site.name} · Cocina bonita para todos los días`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Cocina bonita para todos los días`,
    description: site.description,
    images: ["/hero/lulu-cocina-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  currenciesAccepted: site.currency,
  priceRange: "$$",
  areaServed: "UY",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${site.whatsappNumber}`,
    availableLanguage: ["es"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jakarta.variable} ${notoSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body>
        <JsonLd data={organizationLd} />
        <CartProvider>
          <a className="skip-link" href="#main">
            Saltar al contenido
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
