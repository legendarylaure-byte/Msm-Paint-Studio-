"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  Palette,
  MapPin,
} from "lucide-react";
import { site } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Reveal } from "@/components/ui/Reveal";
import { photo, dullStyle } from "@/lib/photo";

const headline = ["Painting", "that", "makes", "a", "house", "feel", "like", "home"];

const trustItems = [
  { icon: BadgeCheck, label: "Free no-obligation quotes" },
  { icon: ShieldCheck, label: "Fully insured" },
  { icon: Palette, label: "Free colour advice" },
  { icon: MapPin, label: "Berwick-based, all of Casey" },
];

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Tall, rough-edged brush shape. Rendered at 200% width, so sliding its
 * position from 100% to 0% rolls the painted layer across the frame with a
 * wavy edge — one static mask, no per-frame filters.
 */
const brushMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0 0h102c6 20-4 32 2 52s-5 34 2 54-4 32 2 50 1 24 0 44H0z'/%3E%3C/svg%3E\")";

const photoSizes = "(min-width: 1024px) 54vw, 100vw";

export function Hero() {
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();

  // Starts 80% painted with a brush edge on the right; the first scroll
  // completes the roll. Reverses if you scroll back up.
  const maskPos = useTransform(scrollY, [0, 360], ["20% 0%", "0% 0%"]);
  const photoY = useTransform(scrollY, [0, 700], ["0%", "5%"]);

  const maskStyle: MotionStyle | undefined = reduce
    ? undefined
    : {
        maskImage: brushMask,
        WebkitMaskImage: brushMask,
        maskSize: "200% 100%",
        WebkitMaskSize: "200% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: maskPos,
        WebkitMaskPosition: maskPos,
      };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 lg:pt-16 lg:pb-24">
      {/* one restrained ambient tint behind the fold */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 -right-24 h-[440px] w-[440px] rounded-full bg-tangerine blur-3xl animate-drift"
          style={{ opacity: "var(--blob)" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        {/* ————— Copy ————— */}
        <div>
          <motion.div
            data-motion
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-tangerine/25 bg-tangerine/10 px-4 py-2 text-accent"
          >
            <Sparkles className="h-4 w-4" />
            <span className="eyebrow">Berwick VIC · Free quotes</span>
          </motion.div>

          <h1 className="mt-6 text-h1 font-extrabold">
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                data-motion
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-[0.28em] inline-block ${
                  word === "home" ? "gradient-text" : "text-ink"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            data-motion
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            <strong className="text-ink">Hands-on craft</strong>, prepped properly
            and painted beautifully. Interiors, exteriors, fences, shops and
            warehouses — cleaned up completely.
          </motion.p>

          <motion.div
            data-motion
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/#book" className="btn btn-primary gloss group">
              <span className="relative z-10 flex items-center gap-2">
                Book a free quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phone}
            </a>
          </motion.div>
        </div>

        {/* ————— Photo: the paint rolls across it as you scroll ————— */}
        <motion.div
          data-motion
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border-[3px] border-edge bg-surface-2 shadow-[0_40px_80px_-40px_rgba(22,22,42,0.7)] sm:aspect-[5/4]">
            <motion.div style={reduce ? undefined : { y: photoY }} className="absolute inset-0">
              {/* dull room — always underneath */}
              <div className="absolute inset-0 scale-[1.16]" aria-hidden>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes={photoSizes}
                  className="object-cover"
                  style={dullStyle}
                />
                <div className="absolute inset-0 bg-[#5b574d]/25 mix-blend-multiply" />
              </div>

              {/* freshly painted room — revealed by the brush edge */}
              <motion.div className="absolute inset-0 scale-[1.16]" style={maskStyle}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes={photoSizes}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* fine grain so it reads as a printed photograph, not a stock tile */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{ backgroundImage: grain, backgroundSize: "160px" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#16162a]/45 to-transparent"
            />
            {/* shortcut: stock placeholder — delete this credit with the photo */}
            <span className="pointer-events-none absolute right-3 bottom-2.5 text-[10px] font-semibold tracking-wide text-white/70">
              {photo.credit}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ————— Trust bar ————— */}
      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {trustItems.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-3 bg-card px-5 py-4 transition-colors duration-300 hover:bg-surface-2"
              >
                <t.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.2} />
                <span className="text-sm font-bold leading-tight text-ink">{t.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
