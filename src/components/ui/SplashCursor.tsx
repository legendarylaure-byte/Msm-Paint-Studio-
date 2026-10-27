"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { parseHex, readableRgb } from "@/lib/paint";

type Drop = { x: number; y: number; r: number; vx: number; vy: number; life: number };

const FALLBACK = "#ff6b35";

export function SplashCursor() {
  const reduce = useReducedMotionSafe();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const lastRef = useRef({ x: -200, y: -200 });
  const paintRef = useRef<{ rgb: [number, number, number]; readAt: number }>({
    rgb: parseHex(FALLBACK) ?? [255, 107, 53],
    readAt: 0,
  });

  // fresh page, fresh paint — no smear carried across routes
  useEffect(() => {
    dropsRef.current.length = 0;
  }, [pathname]);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

    const readPaint = () => {
      const now = performance.now();
      if (now - paintRef.current.readAt < 200) return;
      paintRef.current.readAt = now;
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--brush-paint")
        .trim();
      paintRef.current.rgb = readableRgb(hex || FALLBACK, isDark());
    };
    readPaint();

    // theme flips mid-scroll: recolour what's already on screen next frame
    const themeObserver = new MutationObserver(() => {
      paintRef.current.readAt = 0;
      readPaint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      readPaint();
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      const dist = Math.hypot(dx, dy);
      lastRef.current = { x: e.clientX, y: e.clientY };
      if (dist < 2) return;

      const dirtX = dist ? dx / dist : 0;
      const dirtY = dist ? dy / dist : 0;
      const count = Math.min(5, Math.floor(dist / 5) + 2);
      for (let i = 0; i < count; i++) {
        dropsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          r: 3 + Math.random() * 6,
          vx: dirtX * (1 + Math.random()) * 0.9,
          vy: dirtY * (1 + Math.random()) * 0.9,
          life: 1,
        });
      }
      if (dropsRef.current.length > 220) {
        dropsRef.current.splice(0, dropsRef.current.length - 220);
      }
    };

    const onLeave = () => {
      dropsRef.current.length = 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const [r, g, b] = paintRef.current.rgb;
      const dark = isDark();
      const alpha = dark ? 0.55 : 0.42;
      const drops = dropsRef.current;

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.life *= 0.9;
        if (d.life < 0.02) {
          drops.splice(i, 1);
          continue;
        }
        const rad = d.r * (0.5 + d.life * 0.8);
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * d.life})`);
        grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${alpha * d.life * 0.55})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      themeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
    />
  );
}
