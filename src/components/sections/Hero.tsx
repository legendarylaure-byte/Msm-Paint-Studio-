"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  Palette,
  MapPin,
  Brush,
  Check,
} from "lucide-react";
import { site } from "@/lib/site";
import { palette, rooms, type RoomId } from "@/lib/paint";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { RoomStage } from "@/components/hero/RoomStage";

const headline = ["Painting", "that", "makes", "a", "house", "feel", "like", "home"];

const trustItems = [
  { icon: BadgeCheck, label: "Free no-obligation quotes" },
  { icon: ShieldCheck, label: "Fully insured" },
  { icon: Palette, label: "Free colour advice" },
  { icon: MapPin, label: "Berwick-based, all of Casey" },
];

/** Relative luminance — decides whether the tick on a swatch is ink or chalk. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55;
}

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [room, setRoom] = useState<RoomId>("living");
  const [wall, setWall] = useState<string>(palette[1].hex);
  const [pending, setPending] = useState<string | null>(null);
  const pendingRef = useRef<string | null>(null);

  const pick = (hex: string) => {
    if (hex === (pendingRef.current ?? wall)) return;
    if (reduce) {
      setWall(hex);
      setPending(null);
      pendingRef.current = null;
      return;
    }
    pendingRef.current = hex;
    setPending(hex);
  };

  // the wet coat has finished rolling: promote it to the base coat
  const done = useCallback(() => {
    const p = pendingRef.current;
    pendingRef.current = null;
    if (p) setWall(p);
    setPending(null);
  }, []);

  const active = pending ?? wall;
  const activeName = palette.find((c) => c.hex === active)?.name ?? "Custom";

  return (
    <section className="relative">
      <div className="relative isolate overflow-hidden bg-surface">
        {/* ——— the room ——— */}
        <div className="relative h-[38svh] min-h-[280px] sm:h-[46svh] lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
          <RoomStage wall={wall} pending={pending} onDone={done} room={room} />

          {/* text scrim — desktop only, the mobile copy sits on its own sheet */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgb(var(--scrim)) 0%, rgb(var(--scrim)) 24%, "
                + "rgb(var(--scrim) / 0.88) 36%, rgb(var(--scrim) / 0.57) 48%, "
                + "rgb(var(--scrim) / 0.22) 58%, rgb(var(--scrim) / 0) 68%)",
            }}
          />

          {/* room switcher — outside the stage so the pointer comes back */}
          <div className="absolute top-4 right-4 z-20 flex gap-0.5 rounded-full border border-white/25 bg-black/35 p-1 backdrop-blur-md lg:top-6 lg:right-8">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoom(r.id)}
                aria-pressed={room === r.id}
                className={`rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide transition-colors ${
                  room === r.id ? "bg-white text-ink" : "text-white/80 hover:text-white"
                }`}
              >
                {r.short}
              </button>
            ))}
          </div>

          {/* no brush on touch — point at the swatches instead */}
          <p className="pointer-events-none absolute bottom-9 left-4 z-20 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md lg:hidden">
            Pick a colour below ↓
          </p>
        </div>

        {/* ——— copy sheet ——— */}
        <div
          className={`pointer-events-none relative z-10 -mt-7 rounded-t-[32px] bg-surface lg:mt-0 lg:flex lg:min-h-[min(78svh,780px)] lg:items-center lg:rounded-none lg:bg-transparent ${
            reduce ? "" : "transition-colors duration-500"
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-10 sm:px-8 lg:py-0">
            {/* the text column takes the pointer back — the rest of the hero stays paint-through */}
            <div className="pointer-events-auto lg:max-w-md xl:max-w-xl">
              <div
                className="rise inline-flex items-center gap-2 rounded-full border border-tangerine/25 bg-tangerine/10 px-4 py-2 text-accent"
                style={{ "--d": "40ms" } as CSSProperties}
              >
                <Sparkles className="h-4 w-4" />
                <span className="eyebrow">Berwick VIC · Free colour advice</span>
              </div>

              <h1 className="mt-6 text-h1 font-extrabold">
                {headline.map((word, i) => (
                  <span
                    key={word + i}
                    className={`rise-word mr-[0.26em] ${
                      word === "home" ? "gradient-text" : "text-ink"
                    }`}
                    style={{ "--i": i } as CSSProperties}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p
                className="rise mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
                style={{ "--d": "420ms" } as CSSProperties}
              >
                <strong className="text-ink">Hands-on craft</strong>, prepped properly and painted
                beautifully — interiors, exteriors, fences and shops, cleaned up completely.
              </p>

              <div
                className="rise mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
                style={{ "--d": "500ms" } as CSSProperties}
              >
                <Link href="/#book" className="btn btn-primary gloss group">
                  <span className="relative z-10 flex items-center gap-2">
                    Book a free quote
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost">
                  {site.phone}
                </a>
              </div>

              {/* ——— palette ——— */}
              <div className="rise mt-7 max-w-md sm:mt-9" style={{ "--d": "580ms" } as CSSProperties}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
                    <Brush className="h-3.5 w-3.5" />
                    Paint these walls
                  </p>
                  <p className="hidden text-xs font-semibold text-ink-mute sm:block">
                    move the brush across the room
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Wall colour"
                  className="mt-3 flex flex-wrap gap-2.5"
                >
                  {palette.map((c) => {
                    const on = c.hex === active;
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => pick(c.hex)}
                        aria-pressed={on}
                        title={c.name}
                        className={`grid h-10 w-10 place-items-center rounded-full border transition-[transform,border-color,box-shadow] duration-200 ${
                          on
                            ? "-translate-y-0.5 border-ink shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]"
                            : "border-black/15 hover:-translate-y-0.5"
                        }`}
                        style={{ background: c.hex }}
                      >
                        {on ? (
                          <Check
                            className="h-4 w-4"
                            strokeWidth={3.5}
                            style={{ color: isLight(c.hex) ? "#16162a" : "#fffdf7" }}
                            aria-hidden
                          />
                        ) : null}
                        <span className="sr-only">{c.name}</span>
                      </button>
                    );
                  })}
                </div>

                <p aria-live="polite" className="mt-2.5 text-xs text-ink-soft">
                  {activeName} · screen colour is a guide — we&apos;ll bring the fan deck to
                  the quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ——— trust bar ——— */}
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20">
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {trustItems.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-3 bg-card px-5 py-4 transition-colors duration-300 hover:bg-surface-2"
            >
              <t.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.2} />
              <span className="text-sm font-bold leading-tight text-ink">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
