"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/** Scroll-in reveal used across the page — respects reduced-motion. */
export function Reveal({ children, delay = 0, y = 18, className, once = true }: Props) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      data-motion
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading — one eyebrow treatment, one type scale. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="eyebrow text-ink-mute">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 text-h2 font-extrabold text-balance">
          {title}{" "}
          {accent && <span className="gradient-text">{accent}</span>}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
