type IconProps = {
  name: string;
  className?: string;
};

/** Icono de Material Symbols (decorativo por defecto). */
export function Icon({ name, className }: IconProps) {
  return (
    <span
      className={
        className
          ? `material-symbols-outlined ${className}`
          : "material-symbols-outlined"
      }
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
