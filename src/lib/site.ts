/**
 * Configuración global del sitio.
 * Cambiá estos valores para ajustar marca, dominio y contacto.
 */
export const site = {
  name: "Lulu",
  legalName: "Lulu Boutique",
  shortDescription: "Cocina bonita para todos los días",
  description:
    "Lulu reúne utensilios, ollas y sartenes en tonos suaves para una cocina práctica, linda y lista para disfrutar todos los días. Envíos a Montevideo y todo Uruguay.",
  /** Dominio público. En producción configurá NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lulu.com.uy").replace(
    /\/$/,
    "",
  ),
  locale: "es_UY",
  currency: "UYU",
  city: "Montevideo",
  addressRegion: "MO",
  addressCountry: "UY",
  /** Coordenadas del centro de Montevideo */
  geo: { latitude: -34.9011, longitude: -56.1645 },
  /** Número de WhatsApp en formato internacional sin signos. */
  whatsappNumber: "598092092765",
} as const;

/** Umbral para envío gratis (en UYU). Productos/carritos que superen este monto tienen envío gratis en Montevideo. */
export const FREE_SHIPPING_THRESHOLD = 3000;

export type Site = typeof site;
