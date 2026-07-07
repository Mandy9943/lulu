/**
 * Catálogo de productos de Lulu.
 *
 * ──────────────────────────────────────────────────────────────────────────
 *  CÓMO ADMINISTRAR PRODUCTOS
 * ──────────────────────────────────────────────────────────────────────────
 *  • Agregar: copiá un bloque dentro de `products`, cambiá `slug` (único,
 *    sin espacios ni acentos) y completá los campos.
 *  • Quitar: borrá el bloque del producto.
 *  • Editar: cambiá cualquier campo (precio, descripción, imágenes…).
 *
 *  Las imágenes viven en `public/productos/<carpeta>/`. La ruta empieza
 *  siempre con `/productos/...`. La primera imagen de `images` se usa como
 *  portada salvo que definas `coverImage`.
 *
 *  El `slug` define la URL del producto: /producto/<slug>
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ProductType = "ollas" | "sartenes" | "utensilios" | "accesorios";

export interface ColorVariant {
  /** Nombre que se muestra al cliente, ej: "Rosa" */
  label: string;
  /** Color CSS para el swatch, ej: "#F4A7B9" */
  hex: string;
  /** Imágenes específicas de este color */
  images: string[];
  /** Video opcional para este color (ruta desde /public) */
  video?: string;
  /**
   * Stock disponible para esta variante.
   * - 0: agotado (no se puede comprar).
   * - 1: última unidad (muestra badge "Última unidad").
   * - 2+: stock suficiente (sin badge).
   * - undefined: stock sin control (se considera disponible).
   */
  stock?: number;
}

export interface Product {
  /** Identificador único y URL del producto: /producto/<slug> */
  slug: string;
  name: string;
  /** Precio en pesos uruguayos (UYU), número entero. */
  price: number;
  category: string;
  /** Familia del producto, usada por los filtros del catálogo. */
  type: ProductType;
  /** Etiqueta destacada (ej: "Nuevo"). Si existe, aparece en "Favoritos". */
  badge?: string;
  /**
   * Precio "anterior" (tachado). Si está definido y es mayor que `price`,
   * se muestra tachado al lado del precio actual como gancho visual.
   * El cliente sigue pagando `price` — el descuento es solo de marketing.
   */
  originalPrice?: number;
  /**
   * Porcentaje de descuento a mostrar en el badge (ej: 20 → "-20% OFF").
   * Solo se usa como etiqueta visual; no se aplica al cálculo real.
   */
  discountPercent?: number;
  /**
   * Precio "financiado" sobre el que se calcula la cuota de Mercado Pago
   * (ej: 12x $444 con Mercado Pago). Si no se define, se usa `price`.
   *
   * El precio al contado (`price`) sigue mostrándose tal cual; este campo
   * sólo cambia la base sobre la que se divide entre 12. Es display-only:
   * el cobro real se coordina por WhatsApp.
   */
  mpPrice?: number;
  variant: string;
  shortDescription: string;
  description: string;
  /**
   * Descripción larga estructurada por bloques para el detalle del producto.
   * Si se define, reemplaza el render plano de `description` por una lista
   * con `título` destacado y `body` debajo de cada uno. La descripción plana
   * (`description`) sigue usándose para SEO, búsqueda y meta description.
   */
  descriptionBlocks?: { title: string; body: string }[];
  highlights: string[];
  /** Portada opcional. Si no se define, se usa images[0]. */
  coverImage?: string;
  images: string[];
  /** Video opcional que aparece como primer slide de la galería. */
  video?: string;
  /**
   * Variantes de color seleccionables. Cuando se define, en el detalle
   * aparece un selector de swatches que cambia las imágenes de la galería.
   */
  colorVariants?: ColorVariant[];
  /**
   * Stock disponible del producto.
   * - 0: agotado (muestra badge "Agotado" + CTA deshabilitado,
   *   bloquea el checkout hasta quitarlo del carrito).
   * - 1: última unidad (muestra banda "Última unidad" en la card
   *   y pill naranja en el detalle; el botón sigue activo).
   * - 2+: stock suficiente (sin badge).
   * - undefined: stock sin control, se considera disponible.
   * Si una variante específica tiene `stock` definido, manda sobre
   * el stock global cuando se evalúa esa variante puntual.
   */
  stock?: number;
  /**
   * Si es false, oculta el contador regresivo aunque el producto
   * tenga `originalPrice` definido. Default: true (lo muestra).
   * Útil para excluir productos puntuales de la promo universal.
   */
  showCountdown?: boolean;
}

export const products: Product[] = [
  {
    slug: "utensilios-silicona",
    name: "Set de utensilios de cocina con soporte - 14 piezas.",
    price: 530,
    originalPrice: 690,
    discountPercent: 23,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 576.27,
    showCountdown: false,
    category: "Cocina",
    type: "utensilios",
    badge: "Más elegido",
    variant: "Silicona alimentaria con mango efecto madera",
    shortDescription:
      "Piezas esenciales para cocinar, servir y mantener todo a mano.",
    description:
      "Un set completo para el día a día: cuida tus ollas y sartenes, se guarda fácil en su soporte y aporta un toque cálido sin recargar la mesada.",
    descriptionBlocks: [
      {
        title: "Silicona premium resistente al calor",
        body: "Hechos de silicona premium con alta resistencia al calor hasta 230º, para saltear, servir y hornear con total confianza.",
      },
      {
        title: "Cuida tus sartenes",
        body: "No se dobla, no raya tus sartenes ni superficies antiadherentes. Mantiene tus piezas como nuevas por más tiempo.",
      },
      {
        title: "Apto para uso alimentario",
        body: "Material 100% apto para uso alimentario y libre de BPA, para cocinar tranquilo en cualquier receta.",
      },
      {
        title: "Mango ergonómico y durable",
        body: "Mango ergonómico de construcción robusta que garantiza la durabilidad a largo plazo, incluso con el uso diario.",
      },
      {
        title: "Todo lo que necesitás en la cocina",
        body: "Cubre todas las necesidades culinarias, desde hornear hasta saltear, manteniendo la estética y organización de la cocina.",
      },
    ],
    highlights: [
      "Soporte incluido",
      "Silicona resistente al calor",
      "Cuida superficies antiadherentes",
    ],
    coverImage:
      "/productos/cubiertos/3A33C539-5DFB-4FF7-90EB-D8B054A42139.JPG.jpeg",
    images: [
      "/productos/cubiertos/207F835B-17CD-44EE-B1D1-842756CDB92E.JPG.jpeg",
      "/productos/cubiertos/2273C486-2A14-4D89-B79B-E2B7C926DE03.JPG.jpeg",
      "/productos/cubiertos/3A33C539-5DFB-4FF7-90EB-D8B054A42139.JPG.jpeg",
      "/productos/cubiertos/4EDDA583-00FC-44A6-819F-BA3A13B55774.JPG.jpeg",
      "/productos/cubiertos/6A19AEA0-CF83-4D4F-A4ED-15F77FDCE716.JPG.jpeg",
      "/productos/cubiertos/A326D168-9623-447E-A99E-89EFE26761E3.JPG.jpeg",
      "/productos/cubiertos/B9E06972-696F-4CFA-AA68-8D8A9584C7EB.JPG.jpeg",
      "/productos/cubiertos/E07D1865-D9A1-48F7-AF20-77DC5BDB0FC2.JPG.jpeg",
    ],
  },
  {
    slug: "bateria-rosa-desmontable",
    name: "Set de batería rosa con mango desmontable - 17 piezas",
    price: 4900,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 5327.82,
    originalPrice: 7890,
    discountPercent: 20,
    category: "Cocina",
    type: "ollas",
    badge: "Nuevo",
    stock: 0,
    variant: "Antiadherente premium con mango desmontable",
    shortDescription:
      "Juego premium de aluminio con mango extraíble, antiadherente libre de PFOA y apilable.",
    description:
      "Descubre la combinación perfecta de diseño, funcionalidad y salud para tu cocina con nuestro juego de ollas y sartenes premium de aluminio de alta resistencia. Cocina de forma más sana con un recubrimiento libre de PFOA, disfruta del mango extraíble de un clic, ahorra espacio con su diseño apilable y úsalo en cualquier fuente de calor: inducción, gas, placas eléctricas y vitrocerámica.",
    descriptionBlocks: [
      {
        title: "Antiadherente premium y saludable",
        body: "Cocina de forma más sana gracias a un recubrimiento de alto rendimiento libre de PFOA y materiales tóxicos. Diseñado para que nada se pegue, facilitando una limpieza impecable en segundos.",
      },
      {
        title: "Mango extraíble de vanguardia",
        body: "Máxima seguridad con un sistema de bloqueo ultraestable que te permite cocinar con total confianza y quitar el mango con un solo clic.",
      },
      {
        title: "Ahorro inteligente de espacio",
        body: "El diseño desmontable y apilable optimiza el almacenamiento en tus armarios.",
      },
      {
        title: "Máxima compatibilidad y eficiencia",
        body: "Diseñado para calentarse de manera uniforme y rápida en cualquier fuente de calor, incluyendo inducción, gas, placas eléctricas y vitrocerámica.",
      },
    ],
    highlights: [
      "Libre de PFOA",
      "Mango extraíble con un clic",
      "Apto para inducción",
      "Apilable y desmontable",
    ],
    coverImage:
      "/productos/olla-cara/79e2f04c-b983-439e-bdfc-a7dea4094566.jpeg",
    images: [
      "/productos/olla-cara/79e2f04c-b983-439e-bdfc-a7dea4094566.jpeg",
      "/productos/olla-cara/c7506439-ef13-419d-8617-714028c5e58e.jpeg",
      "/productos/olla-cara/ce50414e-bcf1-4e40-adb1-bd6d04236255.jpeg",
      "/productos/olla-cara/bb8b6e00-fcf5-4507-bf4c-8c8b3f77a6cf.jpeg",
      "/productos/olla-cara/b29c330d-4b29-4f0c-ba96-82aff521fb20.jpeg",
      "/productos/olla-cara/1907fda9-4415-41f1-b6a7-911599f9028c.jpeg",
      "/productos/olla-cara/e88fa900-df73-48c2-9cec-91f02fec2438.jpeg",
      "/productos/olla-cara/642cd924-e22a-432e-a72f-6b35126da9af.jpeg",
    ],
    showCountdown: false,
  },
  {
    slug: "ollas-blancas-desmontables",
    name: "Set de ollas y sartén con mango desmontable - 5 piezas",
    price: 3190,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 3464,
    originalPrice: 3990,
    discountPercent: 20,
    showCountdown: false,
    category: "Cocina",
    type: "ollas",
    badge: "Favorito",
    stock: 0,
    variant: "Set compacto de 5 piezas",
    shortDescription:
      "Ollas apilables en tono marfil para una cocina luminosa, práctica y ordenada.",
    description:
      "Un set claro y compacto para cocinar con comodidad sin perder estilo. Su mango removible facilita pasar de la cocina a la mesa y guardar todo de forma prolija.",
    highlights: [
      "Tono neutro elegante",
      "Ideal para espacios chicos",
      "Presentación cuidada",
    ],
    coverImage:
      "/productos/ollas-blancas/30048358-3FE8-496D-A25F-AE2DCCC5D808.JPG.jpeg",
    images: [
      "/productos/ollas-blancas/30048358-3FE8-496D-A25F-AE2DCCC5D808.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0561.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0562.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0563.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0564.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0565.JPG.jpeg",
      "/productos/ollas-blancas/IMG_0566.JPG.jpeg",
    ],
  },
  {
    slug: "sarten-cuatro-cavidades",
    name: "Sartén de cerámica con 4 cavidades - mango madera.",
    price: 530,
    originalPrice: 690,
    discountPercent: 23,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 576.27,
    showCountdown: false,
    category: "Cocina",
    type: "sartenes",
    badge: "Desayunos",
    variant: "Antiadherente efecto piedra",
    shortDescription:
      "Ideal para huevos, pancakes y porciones parejas sin ensuciar de más.",
    description:
      "Una pieza práctica para desayunos y meriendas más prolijas. Sus cuatro cavidades ayudan a cocinar porciones uniformes, servir mejor y ganar tiempo.",
    descriptionBlocks: [
      {
        title: "Diseño de 4 cavidades",
        body: "Sartén antiadherente de aleación de aluminio con 4 orificios para huevos, panqueques y hamburguesas. Perfecta para cocinar varias porciones simultáneamente y servir todo junto, en su punto y bien presentado.",
      },
      {
        title: "Recubrimiento Piedra Maifan",
        body: "Recubrimiento de Piedra Maifan: ecológico y duradero, garantizando un rendimiento antiadherente superior que cuida tus preparaciones.",
      },
      {
        title: "Calentamiento rápido y uniforme",
        body: "Distribución uniforme del calor con capacidad de calentamiento rápido que ahorra energía y conserva los nutrientes de los alimentos.",
      },
      {
        title: "Compatible con gas e inducción",
        body: "Apta para varios métodos de cocción: funciona en cocina a gas y en placas de inducción sin perder rendimiento.",
      },
      {
        title: "Aleación de aluminio durable",
        body: "Material de aleación de aluminio resistente para un uso prolongado y un calentamiento parejo en cada cocción.",
      },
      {
        title: "Fácil de limpiar",
        body: "Material antiadherente que cocina y se limpia rápidamente, para que solo te ocupes de disfrutar el desayuno.",
      },
    ],
    highlights: [
      "Cuatro porciones a la vez",
      "Fácil de limpiar",
      "Mango cómodo",
    ],
    coverImage:
      "/productos/sarten-forma/72FCDAA3-BA35-4427-B310-90C4D2950F8F.JPG.jpeg",
    images: [
      "/productos/sarten-forma/22A6887B-78F5-46D9-B1DF-3233235506E9.JPG.jpeg",
      "/productos/sarten-forma/244774E0-A870-4B4B-A9BB-B536BFFCB5E7.PNG",
      "/productos/sarten-forma/31469175-72AA-4DC0-A5FB-6662877FBB7C.JPG.jpeg",
      "/productos/sarten-forma/44FC8645-8709-4C88-BD91-467BF50A23AD.JPG.jpeg",
      "/productos/sarten-forma/5066EB19-218F-46F4-A429-EB28845C334F.JPG.jpeg",
      "/productos/sarten-forma/52020D11-1495-4987-89CA-4743383904F0.JPG.jpeg",
      "/productos/sarten-forma/72FCDAA3-BA35-4427-B310-90C4D2950F8F.JPG.jpeg",
      "/productos/sarten-forma/A71F263B-60CB-45CC-BADE-8FAD93B9DC24.PNG",
      "/productos/sarten-forma/F283F80D-A249-4F18-B53F-C7D2AEC4F954.PNG",
    ],
  },
  {
    slug: "sarten-grill-cuadrado",
    name: "Bifera antiadherente de cerámica - mango de madera",
    price: 590,
    originalPrice: 790,
    discountPercent: 25,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 641.51,
    showCountdown: false,
    category: "Cocina",
    type: "sartenes",
    badge: "Top cocina",
    variant: "Base apta para gas e inducción",
    shortDescription:
      "Grill compacto para carnes, vegetales y marcas doradas con terminación prolija.",
    description:
      "Sartén cuadrado con relieve interior, base reforzada y acabado claro. Logra cocciones parejas y una presentación más linda para platos simples de todos los días.",
    highlights: [
      "Apto para inducción",
      "Diseño cuadrado",
      "Acabado tipo piedra",
    ],
    coverImage:
      "/productos/sarten-rallado/187DCD2E-F030-4513-883D-33D1F9F65C8E.JPG.jpeg",
    images: [
      "/productos/sarten-rallado/187DCD2E-F030-4513-883D-33D1F9F65C8E.JPG.jpeg",
      "/productos/sarten-rallado/1AE2B6CC-EACC-4B1F-A76F-BBF0AF17FF3C.JPG.jpeg",
      "/productos/sarten-rallado/1E51D325-DE98-4D60-A749-92263929805D.JPG.jpeg",
      "/productos/sarten-rallado/30CA6A0C-91D2-445C-977C-0C948B157440.JPG.jpeg",
      "/productos/sarten-rallado/373EC5A5-BEFB-4DEC-A4A4-39F528DB4165.JPG.jpeg",
      "/productos/sarten-rallado/4493E979-0BA7-4766-AF10-3558258C4CB2.JPG.jpeg",
      "/productos/sarten-rallado/66AE759A-0F06-45C1-BD10-25BB7744323F.JPG.jpeg",
      "/productos/sarten-rallado/6D86D699-D684-4ADD-9E03-F4A958449CF4.WEBP",
      "/productos/sarten-rallado/9F044695-F085-47FB-843A-109E659581DC.PNG",
      "/productos/sarten-rallado/A39ACC87-1AEA-44C4-AB4D-30D7B1347C8C.JPG.jpeg",
      "/productos/sarten-rallado/C7F35429-FBE2-496F-B069-F404913018EF.JPG.jpeg",
      "/productos/sarten-rallado/EDDD13E4-AE0F-4B83-A03C-2C4ABECF8BF3.JPG.jpeg",
    ],
  },
  {
    slug: "estacion-desayuno-3en1",
    name: "Estación de desayuno 3 en 1 - horno, bifera y cafetera",
    price: 1990,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 2163,
    originalPrice: 3290,
    discountPercent: 21,
    showCountdown: false,
    category: "Desayuno",
    type: "sartenes",
    badge: "Estrella",
    variant: "Horno eléctrico + bifera + cafetera de goteo",
    stock: 0,
    shortDescription:
      "Tostá, cociná y preparás café en un solo equipo compacto y con mucho encanto.",
    description:
      "Una estación todo en uno para resolver el desayuno sin ocupar media mesada: mini horno, plancha tipo bifera y cafetera de goteo integrada. Práctica, linda y pensada para empezar el día con todo a mano.",
    highlights: [
      "Tres funciones en un equipo",
      "Diseño compacto",
      "Ideal para desayunos completos",
    ],
    images: ["/productos/estacion-desayuno-3en1/estacion-desayuno-3en1-1.jpeg"],
    colorVariants: [
      {
        label: "Rosa",
        hex: "#E8889A",
        images: [
          "/productos/estacion-desayuno-3en1/estacion-desayuno-3en1-1.jpeg",
        ],
        stock: 0,
      },
      {
        label: "Negro",
        hex: "#2C2C2C",
        // Guardá la foto negra en: public/productos/estacion-desayuno-3en1/estacion-negro-1.jpeg
        images: ["/productos/estacion-desayuno-3en1/estacion-negro-1.jpeg"],
        video: "/productos/estacion-desayuno-3en1/estacion-negro.mp4",
        stock: 0,
      },
    ],
  },
  {
    // Producto nuevo · agregar más imágenes a futuro en public/productos/sarten-ceramica-2en1/
    slug: "sarten-ceramica-2en1",
    name: "Sartén de cerámica 2 en 1 - bifera y cavidades",
    price: 590,
    originalPrice: 790,
    discountPercent: 25,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 641,
    showCountdown: false,
    category: "Cocina",
    type: "sartenes",
    variant: "Cerámica antiadherente con mango de madera",
    shortDescription:
      "Plancha y dos cavidades en una sola sartén para armar el plato completo.",
    description:
      "Combina una zona tipo bifera con dos cavidades redondas para cocinar huevos, panqueques o medallones a la vez. Antiadherente, fácil de limpiar y con un acabado claro que queda lindo en la mesa.",
    highlights: [
      "Bifera + dos cavidades",
      "Cerámica antiadherente",
      "Mango de madera",
    ],
    images: ["/productos/sarten-ceramica-2en1/sarten-ceramica-2en1-1.jpeg"],
  },
  {
    // Producto nuevo · agregar más imágenes a futuro en public/productos/bento-box-acero/
    slug: "bento-box-acero",
    name: "Bento box de acero inoxidable con dos divisiones",
    price: 850,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 924.21,
    originalPrice: 1190,
    discountPercent: 25,
    showCountdown: false,
    category: "Accesorios",
    type: "accesorios",
    variant: "Acero inoxidable con dos divisiones",
    shortDescription:
      "Vianda resistente para llevar tu comida ordenada y sin mezclas.",
    description:
      "Un bento box de acero inoxidable con dos divisiones para transportar tu almuerzo prolijo y sin que se mezclen los sabores. Práctico, duradero y fácil de limpiar.",
    highlights: ["Acero inoxidable", "Dos divisiones", "Ideal para llevar"],
    images: [
      "/productos/bento-box-acero/bento-box-acero-1.jpeg",
      "/productos/bento-box-acero/bento-box-acero-2.jpeg",
      "/productos/bento-box-acero/bento-box-acero-3.jpeg",
      "/productos/bento-box-acero/bento-box-acero-4.jpeg",
    ],
    video: "/productos/bento-box-acero/bento-box-acero.mp4",
  },
  {
    // Producto nuevo · agregar más imágenes a futuro en public/productos/vaso-termico-led/
    slug: "vaso-termico-led",
    name: "Vaso térmico con control de temperatura led - 450ml",
    price: 400,
    originalPrice: 550,
    discountPercent: 27,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 434.92,
    showCountdown: false,
    category: "Accesorios",
    type: "accesorios",
    badge: "Nuevo",
    variant: "450 ml con display de temperatura LED",
    shortDescription:
      "Mantené tu bebida a temperatura y mirá el dato en su pantalla LED.",
    description:
      "Vaso térmico de 450 ml con tapa y display LED que muestra la temperatura de tu bebida. Conserva el calor o el frío por más tiempo y suma un detalle moderno a tu día.",
    highlights: [
      "Display de temperatura LED",
      "Capacidad 450 ml",
      "Conserva frío y calor",
    ],
    images: ["/productos/vaso-termico-led/vaso-termico-led-1.jpeg"],
  },
  {
    // Producto nuevo · agregar más imágenes a futuro en public/productos/set-toallas-regalo/
    slug: "set-toallas-regalo",
    name: "Set de toallas 3 piezas - con caja y bolsa de regalo",
    price: 490,
    originalPrice: 690,
    discountPercent: 28,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 532,
    showCountdown: false,
    category: "Accesorios",
    type: "accesorios",
    variant: "3 piezas con caja y bolsa de regalo",
    shortDescription:
      "Trío de toallas listo para regalar, con caja y bolsa incluidas.",
    description:
      "Un set de tres toallas presentado en caja con bolsa de regalo: una opción simple y prolija para obsequiar o para renovar tus toallas con estilo.",
    highlights: ["3 piezas", "Caja y bolsa de regalo", "Listo para regalar"],
    images: ["/productos/set-toallas-regalo/set-toallas-regalo-1.jpeg"],
    stock: 0,
  },
  {
    // Producto nuevo · agregar más imágenes a futuro en public/productos/taza-cafe-viaje/
    slug: "taza-cafe-viaje",
    name: "Taza de café hermético para viaje - 400ml",
    price: 190,
    originalPrice: 290,
    discountPercent: 34,
    // TODO mpPrice: confirmar valor real. Placeholder: price * 1.086
    mpPrice: 206,
    showCountdown: false,
    category: "Accesorios",
    type: "accesorios",
    variant: "400 ml hermética para llevar",
    shortDescription:
      "Tu café siempre a mano, sin derrames y listo para llevar.",
    description:
      "Taza de café de 400 ml con cierre hermético para llevar tu bebida sin derrames. Compacta y práctica para el trabajo, el estudio o cualquier salida.",
    highlights: ["Cierre hermético", "Capacidad 400 ml", "Lista para llevar"],
    images: ["/productos/taza-cafe-viaje/taza-cafe-viaje-1.jpeg"],
  },
];

/** Portada efectiva de un producto. */
export function getCover(product: Product): string {
  return product.coverImage ?? product.images[0];
}

/**
 * Precio "financiado" sobre el que se calcula la cuota de Mercado Pago.
 * Si el producto no define `mpPrice`, cae al precio de contado `price`.
 *
 * Uso: pasar este resultado a `InstallmentsHint` para que la cuota refleje
 * el valor real que se cobra con MP (puede incluir interés).
 */
export function getMpPrice(product: Product): number {
  return product.mpPrice ?? product.price;
}

/** Devuelve un producto por su slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Lista de slugs para generación estática de rutas. */
export function getAllSlugs(): string[] {
  return products.map((product) => product.slug);
}

/**
 * ¿El producto está disponible para comprar (a nivel global)?
 * Un producto agotado (stock === 0) bloquea TODAS sus variantes.
 * Si `stock` no está definido, se considera disponible.
 */
export function isProductAvailable(product: Product): boolean {
  return (product.stock ?? 1) > 0;
}

/** ¿Esta variante puntual está disponible? */
export function isVariantAvailable(variant: ColorVariant): boolean {
  return (variant.stock ?? 1) > 0;
}

/**
 * ¿Este producto / variante es la "última unidad" disponible?
 * - Devuelve true solo si el stock efectivo es exactamente 1.
 * - Si el producto está agotado (stock === 0) devuelve false: prima el
 *   badge de "Agotado" sobre el de "Última unidad".
 * - Si el producto tiene `colorVariants`, se considera `variantLabel`
 *   para resolver el stock de la variante puntual.
 */
export function isLastUnit(product: Product, variantLabel?: string): boolean {
  const variant = product.colorVariants
    ? (product.colorVariants.find((v) => v.label === variantLabel) ??
      product.colorVariants[0])
    : undefined;
  const effectiveStock = variant?.stock ?? product.stock;
  return effectiveStock === 1;
}

/**
 * Resuelve la disponibilidad efectiva para un (producto, variantLabel).
 * - Si el producto está agotado → false.
 * - Si tiene colorVariants y se pasa variantLabel → busca esa variante;
 *   si no encuentra match, usa la primera.
 * - Si no tiene variantes → disponibilidad del producto.
 */
export function getVariantAvailability(
  product: Product,
  variantLabel?: string,
): boolean {
  if (!isProductAvailable(product)) return false;
  if (!product.colorVariants || product.colorVariants.length === 0) return true;
  const variant =
    (variantLabel &&
      product.colorVariants.find((v) => v.label === variantLabel)) ||
    product.colorVariants[0];
  return isVariantAvailable(variant);
}
