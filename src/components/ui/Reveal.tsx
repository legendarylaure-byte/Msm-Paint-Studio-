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

export function PaintUnderline({ tone = "auto" }: { tone?: "auto" | "light" }) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.span
      data-motion
      aria-hidden
      className={`paint-underline ${tone === "light" ? "paint-underline-light" : ""}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" focusable="false">
        <path d="M3 7.2 C15 6.4 35 5.6 65 5.4 95 5.3 125 5.5 155 5.9 175 6.3 195 6.9 197 7.4 L197 8.1 C195 8.6 175 9.0 155 9.3 125 9.6 95 9.7 65 9.6 35 9.4 15 9.0 3 8.3 Z" />
      </svg>
    </motion.span>
  );
}

export function FullPaintUnderline({ tone = "auto" }: { tone?: "auto" | "light" }) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.span
      data-motion
      aria-hidden
      className={`paint-underline paint-underline-full ${tone === "light" ? "paint-underline-light" : ""}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" focusable="false">
        <path d="M3 7.2 C15 6.4 35 5.6 65 5.4 95 5.3 125 5.5 155 5.9 175 6.3 195 6.9 197 7.4 L197 8.1 C195 8.6 175 9.0 155 9.3 125 9.6 95 9.7 65 9.6 35 9.4 15 9.0 3 8.3 Z" />
      </svg>
    </motion.span>
  );
}

export function WordReveal({
  text,
  accent,
  underline = true,
  underlineTone = "auto",
  fullUnderline = false,
  brushWords = 3,
}: {
  text: string;
  accent?: string;
  underline?: boolean;
  underlineTone?: "auto" | "light";
  fullUnderline?: boolean;
  brushWords?: number | false;
}) {
  const reduce = useReducedMotionSafe();
  const all = `${text} ${accent ?? ""}`.trim().split(/\s+/);
  const accentFrom = accent && accent.trim() ? all.length - accent.trim().split(/\s+/).length : all.length;
  const hasAccent = !!(accent && accent.trim()) && accentFrom < all.length;

  const isBrush = (i: number) =>
    brushWords && brushWords > 0 && i >= all.length - brushWords;

  const words = all.map((word, i) => {
    const content = (
      <span className={i >= accentFrom ? "gradient-text" : undefined}>{word}</span>
    );
    if (reduce) {
      return (
        <span key={`${word}-${i}`} className="inline-block">
          {content}
        </span>
      );
    }
    return (
      <motion.span
        key={`${word}-${i}`}
        className={`inline-block ${i >= accentFrom ? "gradient-text" : ""} ${isBrush(i) ? "brush-word" : ""}`}
        variants={{
          hidden: { opacity: 0, y: "0.55em", clipPath: "inset(100% 0 0 0)" },
          show: { opacity: 1, y: "0em", clipPath: "inset(0% 0 0 0)" },
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    );
  });

  // Accent-only underline: underline just the accent words (half the heading).
  if (hasAccent && underline && !fullUnderline) {
    const before = all.slice(0, accentFrom);
    const accentWords = all.slice(accentFrom);
    if (reduce) {
      return (
        <>
          {before.map((word, i) => (
            <Fragment key={`b-${i}`}>
              <span className="inline-block">{word}</span>
              {i < before.length - 1 ? " " : " "}
            </Fragment>
          ))}
          <span className="relative inline-block">
            {accentWords.map((word, i) => (
              <Fragment key={`a-${i}`}>
                <span className="gradient-text">{word}</span>
                {i < accentWords.length - 1 ? " " : null}
              </Fragment>
            ))}
            <PaintUnderline tone={underlineTone} />
          </span>
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
        {before.map((word, i) => (
          <Fragment key={`b-${i}`}>
            <motion.span
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.55em", clipPath: "inset(100% 0 0 0)" },
                show: { opacity: 1, y: "0em", clipPath: "inset(0% 0 0 0)" },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {" "}
          </Fragment>
        ))}
        <span className="relative inline-block">
          {accentWords.map((word, i) => (
            <Fragment key={`a-${i}`}>
              <motion.span
                className="inline-block gradient-text brush-word"
                variants={{
                  hidden: { opacity: 0, y: "0.55em", clipPath: "inset(100% 0 0 0)" },
                  show: { opacity: 1, y: "0em", clipPath: "inset(0% 0 0 0)" },
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
              {i < accentWords.length - 1 ? " " : null}
            </Fragment>
          ))}
          <PaintUnderline tone={underlineTone} />
        </span>
      </motion.span>
    );
  }

  if (fullUnderline && underline) {
    if (reduce) {
      return (
        <span className="relative inline-block">
          {words.map((w, i) => (
            <Fragment key={i}>
              {w}
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
          <FullPaintUnderline tone={underlineTone} />
        </span>
      );
    }
    return (
      <motion.span
        className="relative inline-block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-12%" }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            {w}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
        <FullPaintUnderline tone={underlineTone} />
      </motion.span>
    );
  }

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
            className={`inline-block ${i >= accentFrom ? "gradient-text" : ""} ${isBrush(i) ? "brush-word" : ""}`}
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

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "center",
  underlineAll = false,
  brushWords = 3,
  followPaint = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  underlineAll?: boolean;
  brushWords?: number | false;
  followPaint?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="eyebrow text-ink-mute">{eyebrow}</p>
      </Reveal>
      <h2 className={`relative mt-3 text-h2 font-extrabold text-balance ${underlineAll ? "w-fit max-w-full mx-auto" : ""}`}>
        <WordReveal text={title} accent={accent} fullUnderline={underlineAll} brushWords={brushWords} />
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
