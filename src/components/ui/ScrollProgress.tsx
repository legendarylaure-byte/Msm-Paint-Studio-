"use client";

import { useEffect, useState } from "react";

/** Thin paint-line that fills across the top as you scroll. */
export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-tangerine to-tangerine-dark shadow-[0_0_12px_rgba(255,107,53,0.7)]"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
