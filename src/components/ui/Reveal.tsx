"use client";

import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";
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

/**
 * Per-word paint sweep. Each word is masked in from its left edge, so a heading
 * reads as if a brush laid the line down. Reduced motion gets plain text.
 */
export function WordReveal({ text, accent }: { text: string; accent?: string }) {
  const reduce = useReducedMotionSafe();
  const all = `${text} ${accent ?? ""}`.trim().split(/\s+/);
  const accentFrom = accent ? all.length - accent.trim().split(/\s+/).length : all.length;

  if (reduce) {
    return (
      <>
        {text}
        {accent && <span className="gradient-text"> {accent}</span>}
      </>
    );
  }

  return (
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
    >
      {all.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className={`inline-block ${i >= accentFrom ? "gradient-text" : ""}`}
            variants={{
              hidden: { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
              show: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" },
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < all.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
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
      <h2 className="mt-3 text-h2 font-extrabold text-balance">
        <WordReveal text={title} accent={accent} />
      </h2>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
