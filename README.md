# Lulu · Cocina bonita para todos los días

Storefront de **Lulu** (boutique de cocina, Uruguay) construido con **Next.js 15** (App Router), **React 19**, **TypeScript** y **Tailwind CSS v4**. Enfocado en ventas: SEO, datos estructurados, accesibilidad y rendimiento. El checkout se coordina por **WhatsApp**.

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/) (gestor de paquetes del proyecto)

## Puesta en marcha

```bash
pnpm install      # instala dependencias (autoriza el build de sharp)
pnpm dev          # entorno de desarrollo → http://localhost:3000
pnpm build        # build de producción
pnpm start        # sirve el build de producción
```

> En la primera instalación pnpm pedirá autorizar el script de `sharp`
> (optimización de imágenes de Next.js). Ya está aprobado en
> `pnpm-workspace.yaml` (`allowBuilds: sharp: true`).

## Cómo administrar productos

Todo el catálogo vive en un único archivo tipado:

**`src/lib/products.ts`**

- **Agregar:** copiá un bloque del array `products`, cambiá el `slug` (único, sin
  espacios ni acentos) y completá los campos.
- **Quitar:** borrá el bloque del producto.
- **Editar:** cambiá precio, descripción, imágenes, `badge`, etc.

Cada producto genera automáticamente su página en `/producto/<slug>`, su entrada
en el sitemap y sus datos estructurados (JSON-LD) para buscadores e IA.

### Imágenes

Las fotos van en `public/productos/<carpeta>/`. En `products.ts` la ruta empieza
siempre con `/productos/...`. La primera imagen de `images` se usa como portada,
salvo que definas `coverImage`.

## Configuración del sitio

**`src/lib/site.ts`** centraliza nombre, descripción, moneda (UYU), idioma
(`es_UY`) y el número de WhatsApp para el checkout. La URL pública se toma de la
variable de entorno `NEXT_PUBLIC_SITE_URL` (con fallback). Definila en
producción para que canonical, sitemap y Open Graph usen el dominio real:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## Estructura

```
public/
  hero/                 # imagen del hero
  productos/            # fotos de productos
src/
  app/
    layout.tsx          # fuentes, metadata global, JSON-LD de la tienda
    page.tsx            # home (Hero + Catálogo)
    producto/[slug]/    # página de detalle (SSG + metadata + JSON-LD)
    sitemap.ts          # sitemap.xml
    robots.ts           # robots.txt
    globals.css         # design system (Tailwind v4 + estilos Lulu)
  components/           # Header, Footer, Catalog, ProductCard, carrito, galería…
  lib/
    products.ts         # catálogo (editar productos aquí)
    site.ts             # configuración del sitio
    format.ts           # formato de precios (UYU)
```

## Características

- **SEO / IA:** metadata por página, Open Graph, `sitemap.xml`, `robots.txt`,
  JSON-LD (`Store`, `Product`, `BreadcrumbList`).
- **Accesibilidad:** skip-link, focus trap en carrito y lightbox, navegación por
  teclado, `aria-*`, soporte de `prefers-reduced-motion`.
- **Rendimiento:** páginas estáticas (SSG), `next/image` con AVIF/WebP, fuentes
  optimizadas con `next/font`.
- **Carrito + WhatsApp:** persistido en `localStorage`; el checkout arma un
  mensaje de WhatsApp con los productos seleccionados.

## Despliegue

Optimizado para [Vercel](https://vercel.com/) (cero configuración). Recordá
definir `NEXT_PUBLIC_SITE_URL` con tu dominio de producción.
