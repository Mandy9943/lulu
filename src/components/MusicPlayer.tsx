"use client";

import { Icon } from "@/components/Icon";
import { useEffect, useRef, useState } from "react";

interface Track {
  /** Nombre visible en el "Now Playing". */
  title: string;
  /** Ruta pública del audio (en `public/music/`). */
  src: string;
}

/**
 * Playlist del sitio. Para agregar una canción: soltar el archivo en
 * `public/music/` y sumar una entrada acá.
 */
const PLAYLIST: Track[] = [
  { title: "Theme Song · Bratz Rock Angelz", src: "/music/lulu-song.mp3" },
  { title: "House Tour · Sabrina Carpenter", src: "/music/lulu-song-2.mp3" },
  { title: "Tears · Sabrina Carpenter", src: "/music/lulu-song-3.mp3" },
  {
    title: "The Fate Of Ophelia · Taylor Swift",
    src: "/music/lulu-song-4.mp3",
  },
  {
    title: "Unbelievable · Barbie and The Three Musketeers",
    src: "/music/lulu-song-5.mp3",
  },
];

/** Formatea segundos como m:ss (0:00 si aún no hay duración). */
function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? `0${s}` : s}`;
}

/**
 * Reproductor de música flotante estilo "Now Playing".
 *
 * - Arranca colapsado como burbuja; se expande a tarjeta con controles.
 * - Sin autoplay: el audio empieza cuando el usuario toca play.
 * - Al terminar una canción avanza a la siguiente (circular).
 * - Montado en el layout, la música sigue sonando al navegar entre páginas.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  /** Si al cambiar de pista debe seguir reproduciendo la nueva. */
  const resumeRef = useRef(false);
  const mountedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = PLAYLIST[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    // Los metadatos pueden haber cargado antes de montar el efecto.
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) onMeta();
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // Al cambiar de pista, el src nuevo ya está commiteado: reanudar si aplica.
  useEffect(() => {
    if (!mountedRef.current) return;
    if (resumeRef.current) {
      resumeRef.current = false;
      void audioRef.current?.play().catch(() => setPlaying(false));
    }
  }, [trackIndex]);

  // Mover el foco al alternar burbuja <-> tarjeta (el botón activo se desmonta).
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (expanded) {
      cardRef.current?.focus();
    } else {
      fabRef.current?.focus();
    }
  }, [expanded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused || audio.ended) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  /** Cambia de pista; si estaba sonando (o se pide), sigue sonando la nueva. */
  const goTo = (index: number, resume?: boolean) => {
    const audio = audioRef.current;
    const next = (index + PLAYLIST.length) % PLAYLIST.length;
    resumeRef.current = resume ?? Boolean(audio && !audio.paused && !audio.ended);
    setTrackIndex(next);
    setCurrentTime(0);
    setDuration(0);
  };

  const onSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(event.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const progressMax = Number.isFinite(duration) && duration > 0 ? duration : 0;

  return (
    <div className={expanded ? "music-player open" : "music-player"}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onEnded={() => {
          if (PLAYLIST.length > 1) {
            goTo(trackIndex + 1, true);
          } else {
            setPlaying(false);
            setCurrentTime(0);
          }
        }}
        onError={() => {
          setPlaying(false);
          setDuration(0);
        }}
      />

      {expanded ? (
        <div
          ref={cardRef}
          className="music-card"
          role="region"
          aria-label="Reproductor de música"
          tabIndex={-1}
        >
          <div className="music-card-top">
            <span className="music-eyebrow">Now Playing</span>
            <button
              type="button"
              className="music-collapse"
              onClick={() => setExpanded(false)}
              aria-label="Minimizar reproductor"
            >
              <Icon name="expand_more" />
            </button>
          </div>

          <p className="music-title">{track.title}</p>

          <div className="music-progress">
            <span className="music-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={progressMax}
              step={1}
              value={Math.min(currentTime, progressMax)}
              onChange={onSeek}
              disabled={progressMax === 0}
              aria-label="Progreso de la canción"
            />
            <span className="music-time">{formatTime(duration)}</span>
          </div>

          <div className="music-controls">
            <button
              type="button"
              className="music-button"
              onClick={toggleMute}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
              aria-pressed={muted}
            >
              <Icon name={muted ? "volume_off" : "volume_up"} />
            </button>
            <button
              type="button"
              className="music-button"
              onClick={() => goTo(trackIndex - 1)}
              aria-label="Canción anterior"
              disabled={PLAYLIST.length < 2}
            >
              <Icon name="skip_previous" />
            </button>
            <button
              type="button"
              className="music-button music-play"
              onClick={togglePlay}
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              <Icon name={playing ? "pause" : "play_arrow"} />
            </button>
            <button
              type="button"
              className="music-button"
              onClick={() => goTo(trackIndex + 1)}
              aria-label="Canción siguiente"
              disabled={PLAYLIST.length < 2}
            >
              <Icon name="skip_next" />
            </button>
          </div>
        </div>
      ) : (
        <button
          ref={fabRef}
          type="button"
          className={playing ? "music-fab playing" : "music-fab"}
          onClick={() => setExpanded(true)}
          aria-label="Abrir reproductor de música"
        >
          <Icon name="music_note" />
        </button>
      )}
    </div>
  );
}
