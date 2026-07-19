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
  /**
   * Marca el producto como "Preventa exprés": muestra un cartelito
   * "Preventa exprés" y un contador regresivo hacia `PRESALE_END_DATE`
   * (ver `src/lib/promo.ts`), independiente de si hay descuento.
   * Para sacarlo antes de tiempo, quitá este flag del producto.
   */
  presale?: boolean;
  /**
   * Si es true, este producto NO tiene envío gratis: cobra
   * `MONTEVIDEO_SHIPPING_COST` de envío dentro de Montevideo (se muestra en
   * la card, el detalle y se suma al total del carrito). Si el carrito
   * incluye al menos un producto con este flag, se cobra el envío una vez.
   */
  paidShippingMvd?: boolean;
}

export const products: Product[] = [
  {
    slug: "bateria-premium-15-piezas",
    name: "Batería de cocina premium con mango desmontable - 15 piezas",
    price: 6990,
    category: "Cocina",
    type: "ollas",
    presale: true,
    paidShippingMvd: true,
    variant: "",
    shortDescription:
      "Batería completa de 15 piezas en rosa o púrpura, con mango desmontable y diseño apilable.",
    description:
      "Juego de utensilios de cocina premium con mango desmontable, compatible con cocina de gas, inducción, horno y lavavajillas. Multicapa antiadherente de cerámica y fondo de aluminio, libre de PFOAS y materiales tóxicos, con diseño apilable para un fácil almacenamiento. Incluye tres sartenes, dos ollas, dos mangos desmontables, dos tapas para refrigerador, dos tapas de vidrio y 4 almohadillas de fieltro para apilar. Disponible en dos colores: rosa y púrpura.",
    descriptionBlocks: [
      {
        title: "Batería completa de 15 piezas",
        body: "Incluye tres sartenes, dos ollas, dos mangos desmontables, dos tapas para refrigerador, dos tapas de vidrio y cuatro almohadillas de fieltro para apilar sin rayar.",
      },
      {
        title: "Antiadherente cerámico libre de tóxicos",
        body: "Multicapa antiadherente de cerámica con fondo de aluminio, libre de PFOAS y materiales tóxicos, para cocinar más sano y limpiar en segundos.",
      },
      {
        title: "Mango desmontable y diseño apilable",
        body: "El mango se quita con un gesto y las piezas se apilan entre sí: pasás del fuego al horno o a la heladera y guardás todo ocupando mínimo espacio.",
      },
      {
        title: "Compatible con todas las cocinas",
        body: "Apta para cocina de gas, inducción, horno y vitrocerámica, y se puede lavar en el lavavajillas.",
      },
      {
        title: "Dos colores para elegir",
        body: "Disponible en rosa y púrpura, para que combine con el estilo de tu cocina.",
      },
    ],
    highlights: [
      "15 piezas",
      "Libre de PFOAS y materiales tóxicos",
      "Mango desmontable y apilable",
      "Apto para inducción, gas, horno y vitrocerámica",
    ],
    coverImage: "/productos/bateria-premium-15-piezas/rosa-1.jpeg",
    images: [
      "/productos/bateria-premium-15-piezas/rosa-1.jpeg",
      "/productos/bateria-premium-15-piezas/rosa-2.jpeg",
      "/productos/bateria-premium-15-piezas/rosa-3.jpeg",
      "/productos/bateria-premium-15-piezas/rosa-4.jpeg",
      "/productos/bateria-premium-15-piezas/rosa-5.jpeg",
      "/productos/bateria-premium-15-piezas/rosa-6.jpeg",
    ],
    colorVariants: [
      {
        label: "Rosa",
        hex: "#F4A7B9",
        images: [
          "/productos/bateria-premium-15-piezas/rosa-1.jpeg",
          "/productos/bateria-premium-15-piezas/rosa-2.jpeg",
          "/productos/bateria-premium-15-piezas/rosa-3.jpeg",
          "/productos/bateria-premium-15-piezas/rosa-4.jpeg",
          "/productos/bateria-premium-15-piezas/rosa-5.jpeg",
          "/productos/bateria-premium-15-piezas/rosa-6.jpeg",
        ],
      },
      {
        label: "Púrpura",
        hex: "#B7A9D9",
        images: [
          "/productos/bateria-premium-15-piezas/purpura-1.jpeg",
          "/productos/bateria-premium-15-piezas/purpura-2.jpeg",
        ],
      },
    ],
  },
  {
    slug: "bateria-premium-9-piezas",
    name: "Batería de cocina premium antiadherente con mango desmontable - 9 piezas",
    price: 5900,
    category: "Cocina",
    type: "ollas",
    presale: true,
    paidShippingMvd: true,
    variant: "Antiadherente premium color crema con mango desmontable",
    shortDescription:
      "Batería de 9 piezas en tono crema, con mango desmontable y diseño apilable.",
    description:
      "Juego de utensilios de cocina premium con mango desmontable, compatible con cocina de gas, inducción, horno y lavavajillas. Multicapa antiadherente de cerámica y fondo de aluminio, libre de PFOAS y materiales tóxicos, con diseño apilable para un fácil almacenamiento. Incluye 3 sartenes, 2 ollas, 2 tapas y 2 mangos desmontables.",
    descriptionBlocks: [
      {
        title: "Set de 9 piezas en tono crema",
        body: "Incluye tres sartenes, dos ollas, dos tapas y dos mangos desmontables, en un tono crema que ilumina cualquier cocina.",
      },
      {
        title: "Antiadherente cerámico libre de tóxicos",
        body: "Multicapa antiadherente de cerámica con fondo de aluminio, libre de PFOAS y materiales tóxicos, para cocinar más sano y limpiar en segundos.",
      },
      {
        title: "Mango desmontable y diseño apilable",
        body: "El mango se quita con un gesto y las piezas se apilan entre sí, para guardar todo ordenado ocupando mínimo espacio.",
      },
      {
        title: "Compatible con todas las cocinas",
        body: "Apta para cocina de gas, inducción, horno y vitrocerámica, y se puede lavar en el lavavajillas.",
      },
    ],
    highlights: [
      "9 piezas",
      "Libre de PFOAS y materiales tóxicos",
      "Mango desmontable y apilable",
      "Apto para inducción, gas, horno y vitrocerámica",
    ],
    coverImage: "/productos/bateria-premium-9-piezas/crema-1.jpeg",
    images: [
      "/productos/bateria-premium-9-piezas/crema-1.jpeg",
      "/productos/bateria-premium-9-piezas/crema-2.jpeg",
      "/productos/bateria-premium-9-piezas/crema-3.jpeg",
      "/productos/bateria-premium-9-piezas/crema-4.jpeg",
    ],
  },
  {
    slug: "set-cocina-rosa-6-piezas",
    name: "Set de cocina rosa con mango desmontable - 6 piezas",
    price: 3730,
    category: "Cocina",
    type: "ollas",
    presale: true,
    paidShippingMvd: true,
    variant: "",
    shortDescription:
      "Set rosa premium con mango desmontable y tapa hermética para llevar del fuego a la heladera.",
    description:
      "Juego de utensilios de cocina premium con mango desmontable y tapa hermética para refrigerador, compatible con cocina de gas, inducción, horno y lavavajillas. Multicapa antiadherente de cerámica y fondo de aluminio, libre de PFOAS y materiales tóxicos, con diseño apilable para un fácil almacenamiento. Incluye dos sartenes, una olla, tapa de vidrio, un mango desmontable y una tapa hermética para guardar tus comidas directo en el refrigerador.",
    descriptionBlocks: [
      {
        title: "Set rosa de 6 piezas",
        body: "Incluye dos sartenes, una olla, tapa de vidrio, un mango desmontable y una tapa hermética, en un rosa suave que se luce en la cocina.",
      },
      {
        title: "Del fuego a la heladera",
        body: "La tapa hermética te permite guardar tus comidas directo en el refrigerador, sin trasvasar a otro recipiente.",
      },
      {
        title: "Antiadherente cerámico libre de tóxicos",
        body: "Multicapa antiadherente de cerámica con fondo de aluminio, libre de PFOAS y materiales tóxicos, para cocinar más sano y limpiar en segundos.",
      },
      {
        title: "Mango desmontable y diseño apilable",
        body: "El mango se quita con un gesto y las piezas se apilan entre sí, para guardar todo ordenado ocupando mínimo espacio.",
      },
      {
        title: "Compatible con todas las cocinas",
        body: "Apta para cocina de gas, inducción, horno y vitrocerámica, y se puede lavar en el lavavajillas.",
      },
    ],
    highlights: [
      "6 piezas",
      "Libre de PFOAS y materiales tóxicos",
      "Mango desmontable + tapa hermética para heladera",
      "Apto para inducción, gas, horno y vitrocerámica",
    ],
    coverImage: "/productos/set-cocina-rosa-6-piezas/set-rosa-1.jpeg",
    images: [
      "/productos/set-cocina-rosa-6-piezas/set-rosa-1.jpeg",
      "/productos/set-cocina-rosa-6-piezas/set-rosa-2.jpeg",
      "/productos/set-cocina-rosa-6-piezas/set-rosa-3.jpeg",
      "/productos/set-cocina-rosa-6-piezas/set-rosa-4.jpeg",
    ],
  },
  {
    slug: "recipientes-hermeticos-cafe-te-azucar",
    name: "Conjunto de 3 recipientes herméticos - Café, Té y Azúcar",
    price: 1590,
    category: "Cocina",
    type: "accesorios",
    presale: true,
    paidShippingMvd: true,
    variant: "Set de 3 con tapa hermética de bambú",
    shortDescription:
      "Trío de contenedores en tonos suaves para café, té y azúcar, con tapa hermética de bambú.",
    description:
      "Set femenino de contenedores en tonos suaves, con tapa hermética de bambú e interior de hierro que limita la luz y el paso del aire. Ideal para conservar café, té y azúcar frescos y a la vez decorar tu cocina.",
    descriptionBlocks: [
      {
        title: "Trío para café, té y azúcar",
        body: "Tres recipientes en tonos suaves para tener tus infusiones ordenadas, identificadas y siempre a mano.",
      },
      {
        title: "Tapa hermética de bambú",
        body: "El cierre hermético con tapa de bambú mantiene el contenido fresco y suma un detalle natural y cálido.",
      },
      {
        title: "Frescura que dura más",
        body: "El interior de hierro limita la luz y el paso del aire, conservando el aroma y el sabor de café, té y azúcar por más tiempo.",
      },
      {
        title: "Decoración para tu cocina",
        body: "Un diseño femenino y delicado que además de conservar, decora la mesada o la estantería.",
      },
    ],
    highlights: [
      "Set de 3 piezas",
      "Tapa hermética de bambú",
      "Interior de hierro que limita luz y aire",
      "Diseño en tonos suaves",
    ],
    coverImage:
      "/productos/recipientes-hermeticos-cafe-te-azucar/recipientes-1.jpeg",
    images: [
      "/productos/recipientes-hermeticos-cafe-te-azucar/recipientes-1.jpeg",
      "/productos/recipientes-hermeticos-cafe-te-azucar/recipientes-2.jpeg",
      "/productos/recipientes-hermeticos-cafe-te-azucar/recipientes-3.jpeg",
    ],
  },
  {
    slug: "mantequillera-ceramica-bambu",
    name: "Mantequillera hermética de cerámica y bambú",
    price: 1290,
    category: "Desayuno",
    type: "accesorios",
    presale: true,
    paidShippingMvd: true,
    variant: "Cerámica con tapa de bambú — apta lavavajillas y microondas",
    shortDescription:
      "Mantené tu manteca cremosa y lista para untar, con un diseño que luce en la mesa.",
    description:
      "Mantequillera hermética de cerámica y bambú, apta para lavavajillas y microondas. Almacena y mantiene tu manteca a temperatura ambiente, garantizando siempre una textura cremosa y lista para untar sin sacrificar el diseño.",
    descriptionBlocks: [
      {
        title: "Manteca cremosa siempre lista",
        body: "Mantiene tu manteca a temperatura ambiente con una textura cremosa y lista para untar, sin pelear con la manteca dura de la heladera.",
      },
      {
        title: "Cerámica y bambú",
        body: "Combina la cerámica con una tapa de bambú en un diseño natural que se luce en la mesa del desayuno.",
      },
      {
        title: "Cierre hermético",
        body: "La tapa hermética protege la manteca del aire y los olores, conservando su sabor por más tiempo.",
      },
      {
        title: "Fácil de usar y limpiar",
        body: "Apta para lavavajillas y microondas: la usás todos los días y la limpiás sin esfuerzo.",
      },
    ],
    highlights: [
      "Cerámica y bambú",
      "Apta para lavavajillas y microondas",
      "Tapa hermética",
      "Manteca cremosa a temperatura ambiente",
    ],
    coverImage: "/productos/mantequillera-ceramica-bambu/mantequillera-1.jpeg",
    images: [
      "/productos/mantequillera-ceramica-bambu/mantequillera-1.jpeg",
      "/productos/mantequillera-ceramica-bambu/mantequillera-2.jpeg",
      "/productos/mantequillera-ceramica-bambu/mantequillera-3.jpeg",
    ],
  },
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
      "/productos/cubiertos/2cfcda06-6270-4cac-93d3-0229e9166b1e.jpeg",
    images: [],
    video: "/productos/cubiertos/WhatsApp Video 2026-07-02 at 14.17.55.mp4",
    colorVariants: [
      {
        label: "Rosa",
        hex: "#F4A7B9",
        images: [
          "/productos/cubiertos/5c81d053-61c9-4a6a-94e9-361b68cb79d5.jpeg",
          "/productos/cubiertos/2cfcda06-6270-4cac-93d3-0229e9166b1e.jpeg",
          "/productos/cubiertos/d55dcda2-8a41-42a9-bd97-54cb3b343f6a.jpeg",
        ],
        stock: 0,
        video: "/productos/cubiertos/WhatsApp Video 2026-07-02 at 14.17.55.mp4",
      },
      {
        label: "Gris",
        hex: "#7A7A7A",
        images: [
          "/productos/cubiertos/d1d9b523-5e86-4d5d-aa93-e927a18db053.jpeg",
          "/productos/cubiertos/2cfcda06-6270-4cac-93d3-0229e9166b1e.jpeg",
          "/productos/cubiertos/d55dcda2-8a41-42a9-bd97-54cb3b343f6a.jpeg",
        ],
        video: "/productos/cubiertos/WhatsApp Video 2026-07-02 at 14.17.55.mp4",
      },
      {
        label: "Blanco",
        hex: "#F3EFE6",
        images: [
          "/productos/cubiertos/f5712c07-56f5-4b57-9d43-e2ebe16f4e69.jpeg",
          "/productos/cubiertos/2cfcda06-6270-4cac-93d3-0229e9166b1e.jpeg",
          "/productos/cubiertos/d55dcda2-8a41-42a9-bd97-54cb3b343f6a.jpeg",
        ],
        video: "/productos/cubiertos/WhatsApp Video 2026-07-02 at 14.17.55.mp4",
      },
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
    variant: "",
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
      "Sarten antiadherente de Piedra Maifan y aleación de aluminio con 4 orificios para huevos, panqueques y hamburguesas.",
    description:
      "Sartén antiadherente de Piedra Maifan y aleación de aluminio con 4 orificios para huevos, panqueques y hamburguesas.",
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
    images: [],
    colorVariants: [
      {
        label: "Blanco",
        hex: "#E8E2D5",
        stock: 1,
        images: [
          "/productos/sarten-forma/72FCDAA3-BA35-4427-B310-90C4D2950F8F.JPG.jpeg",
          "/productos/sarten-forma/22A6887B-78F5-46D9-B1DF-3233235506E9.JPG.jpeg",
          "/productos/sarten-forma/31469175-72AA-4DC0-A5FB-6662877FBB7C.JPG.jpeg",
          "/productos/sarten-forma/5066EB19-218F-46F4-A429-EB28845C334F.JPG.jpeg",
          "/productos/sarten-forma/52020D11-1495-4987-89CA-4743383904F0.JPG.jpeg",
          "/productos/sarten-forma/244774E0-A870-4B4B-A9BB-B536BFFCB5E7.PNG",
          "/productos/sarten-forma/A71F263B-60CB-45CC-BADE-8FAD93B9DC24.PNG",
          "/productos/sarten-forma/F283F80D-A249-4F18-B53F-C7D2AEC4F954.PNG",
        ],
      },
      {
        label: "Negro",
        hex: "#2C2C2C",
        images: [
          "/productos/sarten-forma/b89f88e5-45fd-4c84-814c-1954d3d8816c.jpeg",
          "/productos/sarten-forma/44FC8645-8709-4C88-BD91-467BF50A23AD.JPG.jpeg",
        ],
      },
    ],
  },
  {
    slug: "sarten-grill-cuadrado",
    name: "Bifera antiadherente de cerámica - mango de madera",
    price: 590,
    stock: 0,
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
    stock: 0,
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
