"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** Fecha objetivo del contador. */
  targetDate: Date;
  /** Variante visual. `"detail"` agranda las celdas para la página de producto. */
  variant?: "card" | "detail";
  /** Texto corto que precede al bloque (solo visible en variant="detail"). */
  label?: string;
  /** className adicional aplicada al contenedor raíz. */
  className?: string;
}

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO_PARTS: Parts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

/** Desglosa una diferencia en ms en d/h/m/s con piso entero. */
function breakdown(diffMs: number): Parts {
  const total = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

/** Pad con ceros a la izquierda hasta 2 dígitos. */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/**
 * Cuenta regresiva cliente-only hacia `targetDate`.
 *
 * - Renderiza `00:00:00:00` durante SSR / primer paint para evitar
 *   hydration mismatch; el `useEffect` toma el tiempo real al montar.
 * - Si la fecha ya venció al montar (o vence mientras corre), devuelve
 *   `null` para que el llamador oculte el bloque sin dejar residuos.
 */
export function CountdownTimer({
  targetDate,
  variant = "card",
  label = "Oferta termina en",
  className,
}: CountdownTimerProps) {
  // Estado inicial estable entre SSR y cliente: siempre ceros.
  const [parts, setParts] = useState<Parts>(ZERO_PARTS);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const remaining = targetDate.getTime() - Date.now();
      if (remaining <= 0) {
        setParts(ZERO_PARTS);
        setExpired(true);
      } else {
        setParts(breakdown(remaining));
      }
    };
    tick();
    if (targetDate.getTime() - Date.now() <= 0) return;
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  if (expired) return null;

  const rootClass = [
    "countdown",
    variant === "detail" ? "countdown--detail" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      role="timer"
      aria-label={`${label}: ${parts.days} días, ${parts.hours} horas, ${parts.minutes} minutos, ${parts.seconds} segundos`}
    >
      {variant === "detail" && <span className="countdown-label">{label}</span>}
      <div className="countdown-cells">
        <div className="countdown-cell">
          <strong>{pad2(parts.days)}</strong>
          <span>D</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell">
          <strong>{pad2(parts.hours)}</strong>
          <span>H</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell">
          <strong>{pad2(parts.minutes)}</strong>
          <span>M</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell">
          <strong>{pad2(parts.seconds)}</strong>
          <span>S</span>
        </div>
      </div>
    </div>
  );
}
