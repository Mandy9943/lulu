# Reproductor de música flotante — Diseño

Fecha: 2026-07-19

## Objetivo

Agregar un reproductor de música flotante estilo "Now Playing" (inspirado en el
widget de sugarangelzbeauty.com) que combine con la estética rosa de Lulu y
permita reproducir canciones del sitio, empezando con una canción provista por
el usuario ("Lulu Song").

## Diseño

- **Componente:** `src/components/MusicPlayer.tsx` (client component), montado
  en `src/app/layout.tsx` dentro de `CartProvider`, después de `CartDrawer`.
  Aparece en todas las páginas; como el layout no se desmonta en la navegación
  client-side, la música continúa al navegar.
- **Audio:** etiqueta nativa `<audio>` sin dependencias nuevas. Los archivos
  viven en `public/music/`. La playlist es un array `PLAYLIST: Track[]`
  (`{ title, src }`) al inicio del componente; agregar canciones = soltar el
  archivo + una línea.
- **Canción inicial:** `public/music/lulu-song.mp3` (audio provisto, MP3 real
  renombrado). Título provisional: "Lulu Song".
- **UI (expandido):** tarjeta fija abajo a la derecha con tokens del design
  system (`--color-primary`, `--color-primary-soft`, `--shadow-lulu`,
  `--radius-pill`): rótulo "Now Playing", título de la canción, barra de
  progreso clickeable con tiempos, botones anterior / play-pausa / siguiente /
  mute (iconos Material Symbols vía `Icon`), y botón para colapsar.
- **UI (colapsado):** burbuja redonda con icono de nota musical. Estado inicial
  colapsado (mobile-first, no tapa contenido); el usuario expande al tocar.
- **Comportamiento:** sin autoplay (bloqueado por navegadores). Al terminar una
  canción avanza a la siguiente (circular). Mute conmutable. Estilos en
  `globals.css` siguiendo el idioma existente de clases semánticas.
- **Accesibilidad:** botones con `aria-label`, barra de progreso como
  `<input type="range">` o slider accesible, foco visible heredado del sitio.

## Alternativas descartadas

- Librería de player (react-h5-audio-player): dependencia extra y difícil de
  tematizar al 100% con el design system.
- Widget embebido (iframe): no puede usar archivos locales ni el estilo Lulu.
