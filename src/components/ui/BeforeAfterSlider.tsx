"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfterSlider({
  src,
  alt,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] overflow-hidden rounded-[18px] border border-white/60 bg-card shadow-[0_24px_64px_-34px_rgba(15,16,38,0.8)] dark:border-white/10 ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {/* After image (full) */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 80vw, 50vw"
        className="object-cover"
        loading="lazy"
      />
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={src}
          alt={`${alt} (before)`}
          fill
          sizes="(max-width: 640px) 80vw, 50vw"
          className="object-cover grayscale brightness-90"
          loading="lazy"
        />
      </div>
      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-1 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg border-2 border-brush-paint">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" transform="translate(6,0)" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}