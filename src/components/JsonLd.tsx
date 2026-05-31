/**
 * Inserta un bloque JSON-LD para datos estructurados (SEO / IA).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros a partir de datos del catálogo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
