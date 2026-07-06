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
