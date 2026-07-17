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

/** Umbral para envío gratis (en UYU). Productos SIN `paidShippingMvd`
 * que superen este monto muestran envío gratis en Montevideo. */
export const FREE_SHIPPING_THRESHOLD = 3000;

/** Costo de envío dentro de Montevideo (en UYU) para los productos marcados
 * con `paidShippingMvd: true`. Se muestra en las cards, el detalle y el
 * carrito, y se suma al total. Envíos al resto del país se coordinan por
 * WhatsApp. */
export const MONTEVIDEO_SHIPPING_COST = 175;

export type Site = typeof site;
