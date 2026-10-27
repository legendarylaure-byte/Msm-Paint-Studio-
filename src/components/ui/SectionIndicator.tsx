"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
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
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastHaptic = useRef<string>("home");

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
          setActive(id);
          if (id !== lastHaptic.current) {
            lastHaptic.current = id;
            try {
              if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
              if (typeof navigator !== "undefined" && "vibrate" in navigator && window.matchMedia("(pointer: coarse)").matches) {
                navigator.vibrate([3, 2]);
              }
            } catch {}
          }
        }
      },
      { threshold: [0.2, 0.35, 0.6], rootMargin: "-12% 0px -45% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === active);
    if (idx < 0) return;
    const el = itemRefs.current[idx];
    const list = listRef.current;
    if (el && list) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  const activeSection = sections.find((s) => s.id === active);
  /* the wizard's own controls sit bottom-right — don't stack a pill on them */
  const hideTop = active === "book";

  return (
    <>
      <button
        onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
        className={`fixed bottom-20 right-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-line/60 bg-surface/90 text-ink shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface sm:bottom-6 ${
          hideTop ? "pointer-events-none translate-y-3 opacity-0" : ""
        }`}
        aria-hidden={hideTop}
        tabIndex={hideTop ? -1 : undefined}
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end lg:flex"
      >
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
                      "0 1px 1px color-mix(in srgb, var(--surface) 95%, transparent), 0 2px 8px color-mix(in srgb, var(--surface) 80%, transparent), 0 0 1px color-mix(in srgb, var(--surface) 100%, transparent)",
                  }
                : undefined
            }
          >
            {activeSection?.label}
          </span>
          <div className="relative max-h-[104px] overflow-hidden">
            <ul
              ref={listRef}
              className="flex max-h-[104px] flex-col items-center gap-1.5 overflow-y-auto py-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                        className={`rounded-full transition-all duration-200 ${
                          isActive
                            ? "h-2 w-2 bg-ink shadow-[0_0_0_4px_color-mix(in_srgb,var(--ink)_14%,transparent)]"
                            : "h-1.5 w-1.5 bg-ink/40 hover:h-[7px] hover:w-[7px] hover:bg-ink/80"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-surface/90 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-surface/90 to-transparent" />
          </div>
        </div>
      </nav>
    </>
  );
}
