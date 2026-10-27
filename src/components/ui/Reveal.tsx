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
export function Reveal({ children, delay = 0, y = 18, className, once = false }: Props) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      data-motion
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12%" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A hand-painted stroke that draws itself under the last word of a heading.
 * Colour follows the hero swatch via `--brush-ink`, so picking a paint colour
 * repaints the whole page's underlines.
 */
export function PaintUnderline({ tone = "auto" }: { tone?: "auto" | "light" }) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.span
      data-motion
      aria-hidden
      className={`paint-underline ${tone === "light" ? "paint-underline-light" : ""}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" focusable="false">
        <path d="M1.5 7.8C16 4.9 38 3.1 62 2.9 92 2.7 122 3.9 152 4.6 168 4.9 184 5 198.5 4.4L198.6 7.2C184 8.2 168 8.3 152 8 122 7.4 92 6.6 62 6.9 38 7.1 16 8.2 1.4 9.6Z" />
      </svg>
    </motion.span>
  );
}

/**
 * Per-word paint fill. Each word rises a full line behind its own mask, so a
 * heading reads as if a brush laid it down. Replays both scroll directions —
 * the -12% margin keeps it from flickering at the edge. Reduced motion is plain.
 */
export function WordReveal({
  text,
  accent,
  underline = true,
  underlineTone = "auto",
}: {
  text: string;
  accent?: string;
  underline?: boolean;
  underlineTone?: "auto" | "light";
}) {
  const reduce = useReducedMotionSafe();
  const all = `${text} ${accent ?? ""}`.trim().split(/\s+/);
  const accentFrom = accent ? all.length - accent.trim().split(/\s+/).length : all.length;

  if (reduce) {
    return (
      <>
        {all.map((word, i) => {
          const isLast = i === all.length - 1;
          const content = (
            <span className={i >= accentFrom ? "gradient-text" : undefined}>{word}</span>
          );
          return (
            <Fragment key={`${word}-${i}`}>
              {isLast && underline ? (
                <span className="relative inline-block">
                  {content}
                  <PaintUnderline tone={underlineTone} />
                </span>
              ) : (
                content
              )}
              {i < all.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </>
    );
  }

  return (
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-12%" }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {all.map((word, i) => {
        const isLast = i === all.length - 1;
        const span = (
          <motion.span
            className={`inline-block ${i >= accentFrom ? "gradient-text" : ""}`}
            variants={{
              hidden: { opacity: 0, y: "0.55em", clipPath: "inset(100% 0 0 0)" },
              show: { opacity: 1, y: "0em", clipPath: "inset(0% 0 0 0)" },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        );

        return (
          <Fragment key={`${word}-${i}`}>
            {isLast && underline ? (
              // plain wrapper: the word's own clip-path would cut the stroke off
              <span className="relative inline-block">
                {span}
                <PaintUnderline tone={underlineTone} />
              </span>
            ) : (
              span
            )}
            {i < all.length - 1 ? " " : null}
          </Fragment>
        );
      })}
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
          <p
            className={`mt-4 max-w-xl text-lg leading-relaxed text-ink-soft ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
