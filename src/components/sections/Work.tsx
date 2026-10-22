"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { photo, dullStyle } from "@/lib/photo";

/** One photograph, two states: the "before" is the same frame dulled down. */
function Room({ tone, label }: { tone: "before" | "after"; label: string }) {
  const isAfter = tone === "after";
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover"
        style={isAfter ? undefined : dullStyle}
      />
      {!isAfter && (
        <div className="absolute inset-0 bg-[#5b574d]/25 mix-blend-multiply" />
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur">
        {label}
      </span>
    </div>
  );
}

export function Work() {
  const [pos, setPos] = useState(52);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  }, []);

  return (
    <section id="work" className="relative scroll-mt-24 bg-card py-20 sm:py-28">
      <div aria-hidden className="scrub-rule absolute inset-x-0 top-0 h-[3px] bg-tangerine" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our work"
          title="Drag to see the"
          accent="transformation"
          intro="Colour is the fastest way to change how a room feels. Pull the slider and watch a tired space come back to life."
        />

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div
            ref={boxRef}
            className="relative aspect-[16/10] touch-none select-none overflow-hidden rounded-3xl border-[3px] border-edge shadow-[0_40px_70px_-40px_rgba(22,22,42,0.7)]"
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
            }}
          >
            <Room tone="before" label="Before" />
            {/* after layer clipped */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Room tone="after" label="After" />
            </div>

            {/* handle */}
            <div
              className="absolute inset-y-0 z-10 w-[5px] -translate-x-1/2 bg-card shadow-[0_0_18px_rgba(0,0,0,0.45)]"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-edge bg-tangerine shadow-xl">
                <MoveHorizontal className="h-5 w-5 text-onbrand" strokeWidth={2.6} />
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-ink-mute">
            Illustrative preview — swap in real before/after job photos from the
            admin gallery.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
