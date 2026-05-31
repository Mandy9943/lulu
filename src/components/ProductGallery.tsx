"use client";

import { Icon } from "@/components/Icon";
import type { Product } from "@/lib/products";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

export function ProductGallery({
  product,
  images: imagesProp,
  video,
}: {
  product: Product;
  /** Override de imágenes, p.ej. para variantes de color */
  images?: string[];
  /** Video opcional; aparece como primer slide */
  video?: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const images = imagesProp ?? product.images;

  // video primero, luego imágenes
  type MediaItem =
    | { type: "video"; src: string }
    | { type: "image"; src: string };
  const media: MediaItem[] = [
    ...(video ? [{ type: "video" as const, src: video }] : []),
    ...images.map((src) => ({ type: "image" as const, src })),
  ];
  const total = media.length;
  const current = media[index] ?? media[0];

  // Resetear al índice 0 cuando cambia el set de imágenes o video (variante de color).
  useEffect(() => {
    setIndex(0);
  }, [imagesProp, video]);

  const move = (delta: number) =>
    setIndex((value) => (value + delta + total) % total);

  // Manejo de foco + scroll lock del lightbox.
  useEffect(() => {
    document.body.classList.toggle("lightbox-open", lightboxOpen);
    if (lightboxOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      const id = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
    if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus();
    }
    return () => document.body.classList.remove("lightbox-open");
  }, [lightboxOpen]);

  // Teclado dentro del lightbox.
  useEffect(() => {
    if (!lightboxOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
        return;
      }
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Tab" && lightboxRef.current) {
        const focusable = getFocusable(lightboxRef.current);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, total]);

  function onPointerDown(event: React.PointerEvent) {
    if (event.pointerType === "mouse") return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent) {
    if (!swipeStart.current || event.pointerType === "mouse") {
      swipeStart.current = null;
      return;
    }
    const dx = event.clientX - swipeStart.current.x;
    const dy = event.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    move(dx < 0 ? 1 : -1);
  }

  return (
    <div className="detail-media">
      <div className="main-image-frame">
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            className="gallery-video"
          />
        ) : (
          <Image
            src={current.src}
            alt={`${product.name} - imagen ${index + 1}`}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            priority
          />
        )}
        {current.type === "image" && (
          <button
            className="image-expand"
            type="button"
            onClick={() => setLightboxOpen(true)}
          >
            <Icon name="zoom_in" />
            <span>Ampliar</span>
          </button>
        )}
      </div>

      {media.length > 1 && (
        <div className="detail-thumbnails">
          {media.map((item, thumbIndex) => (
            <button
              key={item.src}
              className={
                thumbIndex === index
                  ? "thumbnail-button is-active"
                  : "thumbnail-button"
              }
              type="button"
              aria-label={
                item.type === "video"
                  ? `Ver video de ${product.name}`
                  : `Ver imagen ${thumbIndex + 1} de ${product.name}`
              }
              onClick={() => setIndex(thumbIndex)}
            >
              {item.type === "video" ? (
                <span className="video-thumb-placeholder">
                  <Icon name="play_circle" />
                </span>
              ) : (
                <Image
                  src={item.src}
                  alt={`${product.name} miniatura ${thumbIndex + 1}`}
                  width={120}
                  height={120}
                  sizes="120px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && current.type === "image" && (
        <div
          ref={lightboxRef}
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <div className="lightbox-shell">
            <div className="lightbox-header">
              <h2 id="lightbox-title">Vista ampliada</h2>
              <button
                ref={closeButtonRef}
                className="icon-button"
                type="button"
                aria-label="Cerrar imagen ampliada"
                title="Cerrar"
                onClick={() => setLightboxOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="lightbox-stage">
              <button
                className="icon-button lightbox-nav"
                type="button"
                aria-label="Imagen anterior"
                onClick={() => move(-1)}
              >
                <Icon name="chevron_left" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={`${product.name} - imagen ampliada ${index + 1}`}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => {
                  swipeStart.current = null;
                }}
              />
              <button
                className="icon-button lightbox-nav"
                type="button"
                aria-label="Imagen siguiente"
                onClick={() => move(1)}
              >
                <Icon name="chevron_right" />
              </button>
            </div>
            <p>
              {product.name} · imagen {index + 1} de {total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
