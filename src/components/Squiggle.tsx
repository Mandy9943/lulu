/** Subrayado ondulado dibujado a mano, para palabras destacadas girly. */
export function Squiggle({ className = "g-underline" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 22"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 14 Q 32 4 60 12 T 116 12 T 172 12 T 216 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}
