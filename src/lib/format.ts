import { site } from "@/lib/site";

const currencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: site.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

/**
 * Devuelve el valor de una cuota redondeado hacia arriba, alineado con
 * cómo Mercado Pago muestra las cuotas en su checkout (evita prometer
 * una cuota menor a la real).
 */
export function formatInstallment(price: number, installments = 12): string {
  if (price <= 0 || installments <= 0) return formatPrice(0);
  const value = Math.ceil(price / installments);
  return formatPrice(value);
}
