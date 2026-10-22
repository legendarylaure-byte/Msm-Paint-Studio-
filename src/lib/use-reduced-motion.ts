"use client";

import { useEffect, useState } from "react";

/**
 * Reduced-motion flag that is stable across the server render and the first
 * client render.
 *
 * motion's own `useReducedMotion()` reads matchMedia at module scope, so it
 * returns false on the server and true in the browser — the two disagree and
 * React reports a hydration mismatch. This hook always reports `false` until
 * the component has mounted, which keeps the server markup and the hydrated
 * markup identical; the real preference is applied one tick later.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduce;
}
