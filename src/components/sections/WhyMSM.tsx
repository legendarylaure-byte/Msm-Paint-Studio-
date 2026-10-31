"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { BadgeCheck, HeartHandshake, Timer } from "lucide-react";
import { site } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Reveal, WordReveal } from "@/components/ui/Reveal";

const values = [
  {
    icon: BadgeCheck,
    title: "Prep is the product",
    text: "Masking, filling, sanding, priming. The part you don't see is what decides how long the part you do see lasts.",
  },
  {
    icon: HeartHandshake,
    title: "Low-odour, low-VOC",
    text: "Family- and pet-conscious paint options for interiors, so you can sleep in the room that night.",
  },
  {
    icon: Timer,
    title: "On time, no surprises",
    text: "Clear start dates, clear timelines, itemised quotes. The number we say is the number you pay.",
  },
];

function Counter({
  value,
  suffix,
  className = "",
}: {
  value: number;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotionSafe();
  // null = not counting yet, so the real number is in the server HTML.
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  // Reduced motion: show the final number straight away, no counting.
  const shown = n === null ? value : n;

  return (
    <span ref={ref} className={`block font-bold ${className}`}>
      <span className="font-mono tracking-tight">{shown}</span>
      <span className="font-body text-[0.34em] font-bold tracking-wide text-onnight/45">{suffix}</span>
    </span>
  );
}

export function WhyMSM() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-night py-20 text-onnight sm:py-28">

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-brush-ink-dark">Why MSM</p>
            </Reveal>
            <h2 className="mt-3 text-h2 font-extrabold text-balance">
              <WordReveal text="Real craft, now with" accent="a studio behind it" underlineTone="light" />
              <span className="text-brush-ink-dark">.</span>
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-onnight/70">
                Experienced hands on houses, rooms, buildings, fences and
                warehouses — focused on one job at a time, done properly, for
                people who care how their home feels.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-onnight/45">
                <span className="h-px w-10 bg-onnight/25" />
                Berwick · Casey · Cardinia
              </p>
            </Reveal>
          </div>

          {/* values */}
          <div className="flex flex-col gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-onnight/15 bg-onnight/[0.06] p-5 shadow-[0_20px_60px_-40px_color-mix(in srgb, var(--brush-paint) 40%, transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brush-ink/50 hover:bg-onnight/[0.1] hover:shadow-[0_24px_70px_-36px_color-mix(in srgb, var(--brush-paint) 50%, transparent)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brush-ink/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <v.icon className="h-5 w-5 text-brush-ink-dark" strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold text-onnight sm:text-xl">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-onnight/70">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* the numbers earn the full width */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-onnight/12 pt-10 sm:mt-20 sm:grid-cols-4">
          {site.stats.map((s) => (
            <div
              key={s.label}
              className="px-1 sm:border-l sm:border-onnight/12 sm:px-7 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              <Counter value={s.value} suffix={s.suffix} className="text-stat text-onnight" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-onnight/45">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
