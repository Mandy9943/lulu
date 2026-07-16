/**
 * Constantes de la promoción activa.
 *
 * Punto único para editar cuando termina la promo: cambiá la fecha
 * de `PROMO_END_DATE` y el contador de toda la tienda se actualiza.
 *
 * El offset `-03:00` fija la zona horaria de Uruguay (UTC-3) sin
 * depender del huso del navegador del cliente.
 */
export const PROMO_END_DATE = new Date("2026-07-12T23:59:59-03:00");

/**
 * Fin de la "Preventa exprés" (productos marcados con `presale: true`).
 *
 * Es un contador independiente de la promo con descuento: sirve para
 * productos que se ofrecen por tiempo limitado sin precio tachado.
 * Editá esta fecha para extender o cortar la preventa de toda la tienda
 * (o quitá `presale: true` del producto puntual para sacarlo antes).
 */
export const PRESALE_END_DATE = new Date("2026-07-20T23:59:59-03:00");
