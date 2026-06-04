import { formatInstallment } from "@/lib/format";
import Image from "next/image";

type Variant = "inline" | "block";

type LogoSrc =
  | "/payments/mp-isotipo.svg"
  | "/payments/mp-vertical.svg"
  | "/payments/mp-horizontal.svg";

type Props = {
  /** Precio base sobre el que se calcula la cuota. */
  price: number;
  /** Cantidad de cuotas. Por defecto 12. */
  installments?: number;
  /** `inline` para cards y detalle; `block` para top bar y cart drawer. */
  variant?: Variant;
  /**
   * Si es `false`, no muestra el valor de la cuota. Útil para mensajes
   * globales donde no hay un solo producto (ej. top bar del header).
   */
  showAmount?: boolean;
  /**
   * Logo MP a usar. Default el isotipo minimalista (sin wordmark).
   */
  logoSrc?: LogoSrc;
  /**
   * Alto del logo en píxeles. El ancho se calcula automáticamente para
   * mantener la proporción del SVG. Default 24.
   */
  logoHeight?: number;
  className?: string;
};

/**
 * Pista visual de pago en cuotas con Mercado Pago.
 * Ej. inline: "12x $525 sin interés" con el logo MP al lado.
 * Ej. block: "Pagá en 12 cuotas sin interés con Mercado Pago".
 */
export function InstallmentsHint({
  price,
  installments = 12,
  variant = "inline",
  showAmount = true,
  logoSrc = "/payments/mp-isotipo.svg",
  logoHeight = 24,
  className,
}: Props) {
  const cuota = formatInstallment(price, installments);
  const label = showAmount
    ? `${installments}x ${cuota} sin interés`
    : `${installments} cuotas sin interés`;

  const ariaLabel = showAmount
    ? `Pagá en ${installments} cuotas de ${cuota} sin interés con Mercado Pago`
    : `Pagá en ${installments} cuotas sin interés con Mercado Pago`;

  const classes = [
    "installments-hint",
    `installments-hint--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Aspect ratio del SVG según viewBox.
  // mp-isotipo: 360x200 → 1.8:1
  // mp-vertical: 700x700 → 1:1
  // mp-horizontal: 1020x411 → ~2.48:1
  const aspect = logoSrc.endsWith("mp-horizontal.svg")
    ? 1020 / 411
    : logoSrc.endsWith("mp-isotipo.svg")
      ? 360 / 200
      : 1;
  const width = Math.round(logoHeight * aspect);

  return (
    <p className={classes} aria-label={ariaLabel}>
      <Image
        src={logoSrc}
        alt=""
        width={width}
        height={logoHeight}
        className="installments-hint__logo"
        aria-hidden="true"
      />
      <span className="installments-hint__text">
        {showAmount ? (
          <>
            <strong>
              {installments}x {cuota}
            </strong>{" "}
            sin interés
          </>
        ) : (
          <strong>{label}</strong>
        )}
        {variant === "block" && (
          <>
            {" "}
            con <strong>Mercado Pago</strong>
          </>
        )}
      </span>
    </p>
  );
}
