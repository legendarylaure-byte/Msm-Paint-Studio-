"use client";

import { useEffect, useState } from "react";

export function DripEdge() {
  const [fill, setFill] = useState("var(--surface-2)");

  useEffect(() => {
    const update = () => {
      const sections = Array.from(document.querySelectorAll("main > section, main > div"));
      const footer = document.querySelector("footer");
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      // find section above footer
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i] as HTMLElement;
        if (s === footer) continue;
        const r = s.getBoundingClientRect();
        if (r.bottom <= rect.top + 10) {
          const bg = getComputedStyle(s).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)") {
            setFill(bg);
            return;
          }
          // try CSS var
          setFill("var(--surface-2)");
          return;
        }
      }
      setFill("var(--surface-2)");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -top-px left-0 h-12 w-full"
      style={{ color: fill }}
    >
      <path
        fill="currentColor"
        d="M0 0h1440v16c-90 28-180 10-270 18s-180 30-270 24-180-28-270-26S270 44 180 38 90 34 0 28V0z"
      />
    </svg>
  );
}
