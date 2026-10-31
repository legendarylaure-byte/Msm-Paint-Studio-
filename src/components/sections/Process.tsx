"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { AreasWeServe } from "@/components/sections/AreasWeServe";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Four easy steps"
          accent="to a fresh home"
          intro="No jargon, no pressure. Here's exactly what happens from the moment you get in touch."
          brushWords={3}
          followPaint
        />

        <div className="relative mt-16">
          {/* the paint trail filling as you scroll */}
          <div
            aria-hidden
            className="absolute left-7 top-0 h-full w-[6px] rounded-full bg-line sm:left-1/2 sm:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            data-motion
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute left-7 top-0 h-full w-[6px] origin-top rounded-full bg-brush-ink sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol ref={ref} className="space-y-10 sm:space-y-14">
            {processSteps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.step} className="relative pl-20 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
                  {/* node */}
                  <span
                    className="absolute left-0 top-1 z-10 grid h-14 w-14 place-items-center rounded-2xl border-[5px] border-surface bg-brush-paint font-display text-lg font-extrabold text-onbrand shadow-lg sm:left-1/2 sm:-translate-x-1/2"
                  >
                    {s.step}
                  </span>

                  <Reveal
                    delay={0.05}
                    className={`${right ? "sm:col-start-2 sm:pl-4" : "sm:col-start-1 sm:text-right sm:pr-4"}`}
                  >
                    <div
                      className={`card-lift rounded-[20px] border border-white/40 bg-white/60 p-7 shadow-[0_20px_60px_-30px_rgba(15,16,38,0.5)] backdrop-blur-xl ${
                        right ? "" : "sm:ml-auto"
                      } max-w-md dark:border-white/10 dark:bg-white/5`}
                    >
                      <h3 className="text-h3 font-extrabold">{s.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-ink-soft">
                        {s.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="mt-20">
        <AreasWeServe />
      </div>    </section>
  );
}
