"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { PaintEdge } from "@/components/ui/PaintEdge";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <PaintEdge tone="surface" />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Good questions"
          title="Everything people"
          accent="ask us"
          intro="Straight answers on price, timing and what to expect. Anything else — just open the chat."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-tangerine bg-tangerine/[0.04]" : "border-line bg-surface"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-h3 font-extrabold text-ink">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-180 bg-tangerine text-onbrand" : "bg-night/8 text-ink"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
