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

function Counter({ value, suffix }: { value: number; suffix: string }) {
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
    <span ref={ref} className="text-[clamp(2.2rem,4.4vw,3.2rem)] font-bold">
      <span className="font-mono tracking-tight">{shown}</span>
      <span className="font-body text-[0.46em] font-bold tracking-wide text-accent-dark/80">{suffix}</span>
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
              <p className="eyebrow text-accent-dark">Why MSM</p>
            </Reveal>
            <h2 className="mt-3 text-h2 font-extrabold text-balance">
              <WordReveal text="Real craft, now with" accent="a studio behind it" underlineTone="light" />
              <span className="text-accent-dark">.</span>
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-onnight/70">
                Experienced hands on houses, rooms, buildings, fences and
                warehouses — focused on one job at a time, done properly, for
                people who care how their home feels.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 grid grid-cols-2 gap-5">
                {site.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-onnight/12 bg-onnight/[0.05] p-5 transition-colors duration-500 hover:border-accent-dark/40 hover:bg-onnight/[0.09]"
                  >
                    <span className="text-accent-dark">
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                    <p className="mt-1 text-sm font-semibold text-onnight/65">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex gap-5 rounded-[20px] border border-onnight/12 bg-onnight/[0.05] p-6 transition-colors duration-500 hover:border-accent-dark/40 hover:bg-onnight/[0.09]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-dark/15">
                    <v.icon className="h-6 w-6 text-accent-dark" strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3 className="text-h3 font-extrabold text-onnight">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-onnight/65">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
