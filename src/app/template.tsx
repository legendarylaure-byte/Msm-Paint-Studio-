"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// Set on mount (client only) so the very first paint isn't covered by the
// wipe — it only plays on subsequent client-side navigations.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const showWipe = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  if (reduce || !showWipe) return <>{children}</>;

  return (
    <>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] bg-gradient-to-b from-tangerine to-tangerine-dark"
        initial={{ clipPath: "inset(0 0 0 0)" }}
        animate={{ clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
