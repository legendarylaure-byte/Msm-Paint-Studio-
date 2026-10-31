"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
import { palette, rooms, type RoomId, readableInk, parseHex } from "@/lib/paint";

const colorHints: Record<string, string> = {
  "Brand Orange": "Energetic & welcoming — great for living areas",
  "Chalk": "Clean & airy — perfect for any room",
  "Warm Sand": "Cozy & grounded — ideal for bedrooms",
  "Sage": "Calm & natural — promotes relaxation",
  "Olive": "Earthy & sophisticated — great for studies",
  "Ivory": "Soft & elegant — timeless appeal",
  "Greige": "Modern & versatile — suits any space",
  "Oatmeal": "Warm & inviting — cozy living rooms",
  "Clay": "Rich & earthy — feature walls",
  "Moss": "Fresh & organic — nature-inspired",
  "Terracotta": "Bold & warm — statement rooms",
  "Blush": "Soft & romantic — nurseries & bedrooms",
  "Denim": "Cool & calming — modern spaces",
  "Charcoal": "Dramatic & modern — accent walls",
  "Midnight Teal": "Deep & sophisticated — spa-like retreats",
  "Forest Green": "Lush & calming — nature immersion",
  "Deep Purple": "Rich & luxurious — elegant spaces",
  "Burgundy": "Rich & opulent — dramatic accents",
  "Navy Blue": "Classic & serene — timeless elegance",
  "Emerald Green": "Vibrant & refreshing — energizing",
  "Ruby Red": "Passionate & bold — statement impact",
  "Sapphire Blue": "Cool & professional — focused environments",
};
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { RoomStage } from "@/components/hero/RoomStage";

const headline = ["Painting", "that", "makes", "a", "house", "feel", "like", "home"];

const trustItems = [
  { icon: BadgeCheck, label: "Free no-obligation quotes" },
  { icon: ShieldCheck, label: "Fully insured" },
  { icon: Palette, label: "Free colour advice" },
  { icon: MapPin, label: "Berwick-based, all of Casey" },
];

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
  // Brand Orange is the default (palette[0])
  const [wall, setWall] = useState<string>(palette[0].hex);
  const [pending, setPending] = useState<string | null>(null);
  const pendingRef = useRef<string | null>(null);
  /* the picked colour blooming across the viewport */
  const [bloom, setBloom] = useState<{ id: number; x: number; y: number; color: string } | null>(null);

  const setBrushPaint = useCallback((hex: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--brush-paint", hex);
      // Also set readable ink for text contrast
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const ink = readableInk(hex, isDark);
      document.documentElement.style.setProperty("--brush-ink", ink);
      // Toggle paint luminance class for button text color
      const rgb = parseHex(hex) ?? [255, 107, 53];
      const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
      document.documentElement.classList.remove("light-paint", "dark-paint");
      document.documentElement.classList.add(lum > 0.5 ? "light-paint" : "dark-paint");
      /* the booking form listens for this so the quote carries the colour */
      window.dispatchEvent(new CustomEvent("brush:paint", { detail: hex }));
    }
  }, []);

  useEffect(() => {
    setBrushPaint(wall);
  }, [setBrushPaint, wall]);

  const done = useCallback(() => {
    const p = pendingRef.current;
    pendingRef.current = null;
    if (p) setWall(p);
    setPending(null);
  }, []);

  const active = pending ?? wall;
  const activeName = palette.find((c) => c.hex === active)?.name ?? "Custom";

  // Update readable ink when theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const ink = readableInk(active, isDark);
      document.documentElement.style.setProperty("--brush-ink", ink);
      // brush-ink-dark: lightened version for dark panels (always light enough)
      const rgb = parseHex(active) ?? [255, 107, 53];
      const [r, g, b] = rgb;
      // Mix 50% toward white for consistent lightness on dark panels
      const dr = Math.round(r + (255 - r) * 0.5);
      const dg = Math.round(g + (255 - g) * 0.5);
      const db = Math.round(b + (255 - b) * 0.5);
      document.documentElement.style.setProperty("--brush-ink-dark", `rgb(${dr}, ${dg}, ${db})`);
    };
    // Run on mount to set initial values
    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [active]);

  const pick = useCallback(
    (hex: string, x: number, y: number) => {
      setBrushPaint(hex);
      if (!reduce) setBloom({ id: Date.now(), x, y, color: hex });
      if (hex === (pendingRef.current ?? wall)) return;
      if (reduce) {
        setWall(hex);
        setPending(null);
        pendingRef.current = null;
        return;
      }
      pendingRef.current = hex;
      setPending(hex);
    },
    [reduce, setBrushPaint, wall],
  );

  return (
    <section id="home" className="relative scroll-mt-24">
      <div className="relative isolate overflow-hidden bg-surface">
        <div className="relative h-[38svh] min-h-[280px] sm:h-[46svh] lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
          <div className="hero-drift h-full w-full">
            <RoomStage wall={wall} pending={pending} onDone={done} room={room} />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgb(var(--scrim)) 0%, rgb(var(--scrim)) 24%, rgb(var(--scrim) / 0.88) 36%, rgb(var(--scrim) / 0.57) 48%, rgb(var(--scrim) / 0.22) 58%, rgb(var(--scrim) / 0) 68%)",
            }}
          />
          <div className="absolute top-4 right-4 z-20 flex gap-0.5 rounded-full border border-white/25 bg-black/50 p-1 backdrop-blur-md lg:top-6 lg:right-8">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoom(r.id)}
                aria-pressed={room === r.id}
                className={`rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide transition-all duration-300 ${room === r.id ? "bg-brush-paint text-onbrand shadow-[0_2px_8px_-2px_var(--brush-paint)]" : "text-white/90 hover:text-white hover:bg-white/15"}`}
              >
                {r.short}
              </button>
            ))}
          </div>
          <p className="pointer-events-none absolute bottom-9 left-4 z-20 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md lg:hidden">
            Pick a colour below ↓
          </p>
        </div>
        <div
          className={`pointer-events-none relative z-10 -mt-7 rounded-t-[32px] bg-surface lg:mt-0 lg:flex lg:min-h-[min(78svh,780px)] lg:items-center lg:rounded-none lg:bg-transparent ${reduce ? "" : "transition-colors duration-500"}`}
        >
          <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-10 sm:px-8 lg:py-0">
            <div className="pointer-events-auto lg:max-w-lg xl:max-w-2xl">
              <div
                className="rise inline-flex items-center gap-2 rounded-full border border-brush-ink/25 bg-brush-ink/10 px-4 py-2 text-brush-ink"
                style={{ "--d": "40ms" } as CSSProperties}
              >
                <Sparkles className="h-4 w-4" />
                <span className="eyebrow">Berwick VIC · Free colour advice</span>
              </div>
              <h1 className="mt-6 text-h1 font-extrabold">
                {headline.map((word, i) => (
                  <span
                    key={word + i}
                    className={`rise-word mr-[0.26em] ${word === "home" ? "gradient-text" : "text-ink"}`}
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
                <strong className="text-ink">Hands-on craft</strong>, prepped properly and painted beautifully — interiors, exteriors, fences and shops, cleaned up completely.
              </p>
              <div
                className="rise mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
                style={{ "--d": "500ms" } as CSSProperties}
              >
                <Link href="/#book" className="btn btn-brush gloss group">
                  <span className="relative z-10 flex items-center gap-2">
                    Get {activeName} quoted
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost">
                  {site.phone}
                </a>
              </div>
              <div
                className="rise mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-ink-mute sm:mt-5"
                style={{ "--d": "540ms" } as CSSProperties}
              >
                <span>Owner on every job</span>
                <span className="text-ink-mute/40">•</span>
                <span>Free quote</span>
                <span className="text-ink-mute/40">•</span>
                <span>Berwick, Casey &amp; Cardinia</span>
              </div>
              <div className="rise mt-7 max-w-md sm:mt-9" style={{ "--d": "580ms" } as CSSProperties}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
                    <Brush className="h-3.5 w-3.5" />
                    Paint these walls
                  </p>
                  <p className="hidden text-xs font-semibold text-ink-mute sm:block">move the brush across the room</p>
                </div>
                <div role="radiogroup" aria-label="Wall colour" className="mt-3 flex flex-wrap gap-2.5">
                  {palette.map((c) => {
                    const on = c.hex === active;
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          pick(c.hex, r.left + r.width / 2, r.top + r.height / 2);
                        }}
                        onKeyDown={(e) => {
                          const idx = palette.findIndex((p) => p.hex === c.hex);
                          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                            e.preventDefault();
                            const next = palette[(idx + 1) % palette.length];
                            const btn = e.currentTarget.parentElement?.querySelector(`button[title="${next.name}"]`) as HTMLButtonElement;
                            btn?.focus();
                            btn?.click();
                          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                            e.preventDefault();
                            const prev = palette[(idx - 1 + palette.length) % palette.length];
                            const btn = e.currentTarget.parentElement?.querySelector(`button[title="${prev.name}"]`) as HTMLButtonElement;
                            btn?.focus();
                            btn?.click();
                          }
                        }}
                        aria-pressed={on}
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        title={c.name}
                        className={`grid h-11 w-11 place-items-center rounded-full border swatch-btn transition-[transform,border-color,box-shadow] duration-200 ${on ? "swatch-selected border-transparent" : "border-black/20 hover:-translate-y-0.5 active:translate-y-0.5"} ${isLight(c.hex) ? "swatch-light" : ""}`}
                        style={{ background: c.hex }}
                      >
                        {on ? (
                          <Check
                            className="h-4 w-4"
                            strokeWidth={3.5}
                            style={{ color: isLight(c.hex) ? "#16162a" : "#fffdf7", textShadow: isLight(c.hex) ? "0 0 1px rgba(255,255,255,0.8)" : "0 0 1px rgba(0,0,0,0.5)" }}
                            aria-hidden
                          />
                        ) : null}
                        <span className="sr-only">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p aria-live="polite" className="mt-3 flex items-center gap-2 text-sm font-bold text-ink">
                  <span
                    className="inline-block h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-sm"
                    style={{ background: active }}
                    aria-hidden
                  />
                  <strong className="font-extrabold">{activeName}</strong>
                  <span className="font-medium text-ink-soft">travels with your quote</span>
                </p>
                <p className="mt-1 text-xs text-ink-mute">
                  Screen shade is a guide — we bring the fan deck.
                </p>
                {colorHints[activeName] && (
                  <p className="mt-2 text-xs font-medium text-brush-ink">
                    {colorHints[activeName]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20">
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {trustItems.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-3 bg-card px-5 py-4 transition-colors duration-300 hover:bg-surface-2"
            >
              <t.icon className="h-5 w-5 shrink-0 text-brush-ink" strokeWidth={2.2} />
              <span className="text-sm font-bold leading-tight text-ink">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {bloom && (
        <span
          key={bloom.id}
          aria-hidden
          className="paint-bloom"
          style={
            { left: bloom.x, top: bloom.y, "--bloom": bloom.color } as CSSProperties
          }
          onAnimationEnd={() => setBloom(null)}
        />
      )}
    </section>
  );
}
