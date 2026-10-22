"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

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
          title="Four easy steps to a"
          accent="fresh home"
          intro="No jargon, no pressure. Here's exactly what happens from the moment you get in touch."
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
            className="absolute left-7 top-0 h-full w-[6px] origin-top rounded-full bg-tangerine sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol ref={ref} className="space-y-10 sm:space-y-14">
            {processSteps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.step} className="relative pl-20 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
                  {/* node */}
                  <span
                    className="absolute left-0 top-1 z-10 grid h-14 w-14 place-items-center rounded-2xl border-[5px] border-onnight bg-tangerine font-display text-lg font-extrabold text-onbrand shadow-lg sm:left-1/2 sm:-translate-x-1/2"
                  >
                    {s.step}
                  </span>

                  <Reveal
                    delay={0.05}
                    className={`${right ? "sm:col-start-2 sm:pl-4" : "sm:col-start-1 sm:text-right sm:pr-4"}`}
                  >
                    <div
                      className={`card-lift rounded-3xl border border-line bg-card p-7 ${
                        right ? "" : "sm:ml-auto"
                      } max-w-md`}
                    >
                      <h3 className="text-h3 font-extrabold">{s.title}</h3>
                      <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">
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
    </section>
  );
}
