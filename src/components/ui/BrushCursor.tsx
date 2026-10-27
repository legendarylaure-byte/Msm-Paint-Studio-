"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

type Mode = "default" | "text" | "action";

/**
 * Dark circle cursor. Sits on top of the native arrow (which is hidden while
 * mounted), glides with a short lerp, and opens into a transparent ring over
 * body copy so text stays readable through it.
 */
export function BrushCursor() {
  const reduce = useReducedMotionSafe();
  const dotRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>("default");
  const fieldRef = useRef(false);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const setMode = (mode: Mode) => {
      if (mode === modeRef.current) return;
      modeRef.current = mode;
      if (dotRef.current) dotRef.current.dataset.mode = mode;
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.opacity = fieldRef.current ? "0" : "1";
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return setMode("default");
      if (el.closest("input, textarea, select")) {
        fieldRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "0";
        return setMode("default");
      }
      fieldRef.current = false;
      if (el.closest("a, button, [role='button'], summary, svg, .lucide")) return setMode("action");
      if (el.closest("p, li, blockquote, dd, dt, figcaption, h1, h2, h3, h4, h5, h6")) {
        return setMode("text");
      }
      setMode("default");
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const tick = () => {
      const el = dotRef.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * 0.28;
        pos.current.y += (target.current.y - pos.current.y) * 0.28;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      root.classList.remove("has-custom-cursor");
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block">
      <div ref={dotRef} data-mode="default" className="cursor-dot" style={{ opacity: 0 }} />
    </div>
  );
}
