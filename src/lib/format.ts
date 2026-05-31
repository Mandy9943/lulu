import { site } from "@/lib/site";

const currencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: site.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}
