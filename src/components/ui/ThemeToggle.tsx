"use client";

import { useSyncExternalStore } from "react";

// The <html data-theme> attribute is the source of truth. The inline head
// script sets it before paint, so we read it rather than mirror it in state.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => obs.disconnect();
}

const getSnapshot = () =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

const getServerSnapshot = () => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("msm-theme", next);
    } catch {
      /* storage blocked — theme still applies for this page */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="glass relative grid h-10 w-10 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
    >
      {/* sun */}
      <svg
        viewBox="0 0 24 24"
        className={`h-[18px] w-[18px] transition-all duration-500 ${
          theme === "dark"
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
