"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Volume2, VolumeX } from "lucide-react";
import {
  playSectionTick,
  playBackToTop,
  isSoundEnabled,
  setSoundEnabled,
  vibrateSection,
  vibrateBackToTop,
} from "@/lib/sound";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Our work" },
  { id: "why", label: "Why MSM" },
  { id: "process", label: "Process" },
  { id: "painter", label: "Our painter" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "book", label: "Book" },
  { id: "quote", label: "Quote" },
];

export function SectionIndicator() {
  const [active, setActive] = useState("home");
  const [soundOn, setSoundOn] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastHaptic = useRef<string>("home");
  const lastTrigger = useRef<number>(0);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const id = visible[0].target.id;
          if (id !== active) {
            const now = Date.now();
            if (now - lastTrigger.current > 150) {
              lastTrigger.current = now;
              playSectionTick();
              if (id !== lastHaptic.current) {
                lastHaptic.current = id;
                vibrateSection();
              }
            }
          }
          setActive(id);
          return;
        }
        if (visible.length === 0) {
          let bestId = active;
          let bestScore = -Infinity;
          for (const s of sections) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const headerOffset = 120;
            const distance = Math.abs(rect.top - headerOffset);
            const score = -distance + (rect.bottom > headerOffset && rect.top < window.innerHeight ? 1000 : 0);
            if (score > bestScore) {
              bestScore = score;
              bestId = s.id;
            }
          }
          if (bestId && bestId !== active) {
            setActive(bestId);
          }
        }
      },
      { threshold: [0.05, 0.15, 0.25, 0.4, 0.6], rootMargin: "-18% 0px -35% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === active);
    if (idx < 0) return;
    const el = itemRefs.current[idx];
    const list = listRef.current;
    if (el && list) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSection = sections.find((s) => s.id === active);
  const hideTop = active === "book";

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSectionTick();
  };

  const scrollToTop = () => {
    playBackToTop();
    vibrateBackToTop();
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Back-to-top 3D button */}
      <button
        onClick={scrollToTop}
        className={`btn-back-to-top ${hideTop ? "pointer-events-none translate-y-3 opacity-0" : ""} ${showTop ? "" : "pointer-events-none translate-y-3 opacity-0"}`}
        aria-hidden={hideTop || !showTop}
        tabIndex={hideTop || !showTop ? -1 : undefined}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>

      {/* Section indicator — right sidebar */}
      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
          className="grid h-7 w-7 place-items-center rounded-full border border-line/40 bg-surface/60 text-ink-mute backdrop-blur-md transition-all hover:scale-110 hover:text-ink"
        >
          {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <span
            className={`pointer-events-none whitespace-nowrap text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
              active === "why"
                ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                : "text-ink"
            }`}
            style={
              active !== "why"
                ? {
                    textShadow:
                      "0 1px 1px color-mix(in srgb, var(--surface) 95%, transparent), 0 2px 8px color-mix(in srgb, var(--surface) 80%, transparent)",
                  }
                : undefined
            }
          >
            {activeSection?.label}
          </span>
          <div className="relative max-h-[140px] overflow-hidden rounded-full border border-line/30 bg-surface/50 px-1.5 py-2 backdrop-blur-md">
            {/* Progress line behind dots */}
            <div
              aria-hidden
              className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-line/40"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-brush-paint/60 transition-all duration-300"
              style={{
                height: `${(sections.findIndex((s) => s.id === active) / (sections.length - 1)) * 100}%`,
              }}
            />
            <ul
              ref={listRef}
              className="relative flex max-h-[120px] flex-col items-center gap-1.5 overflow-y-auto py-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sections.map((s, i) => {
                const isActive = active === s.id;
                return (
                  <li
                    key={s.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <button
                      onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                      aria-label={s.label}
                      aria-current={isActive ? "true" : undefined}
                      className="relative grid h-6 w-6 place-items-center"
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "h-3 w-3 bg-brush-paint shadow-[0_0_8px_var(--brush-paint)]"
                            : "h-1.5 w-1.5 bg-ink/30 hover:h-2 hover:w-2 hover:bg-ink/60"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}