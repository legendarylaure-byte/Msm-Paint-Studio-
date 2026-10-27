"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* the one split section — heading sits beside the content, not above it */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Good questions"
              title="Everything people"
              accent="ask us"
              intro="Straight answers on price, timing and what to expect. Anything else — just open the chat."
              align="left"
            />
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.04}>
                  <div
                    className={`overflow-hidden rounded-[20px] border transition-all duration-300 ${
                      isOpen ? "border-brush-ink/50 bg-brush-ink/[0.04] shadow-sm" : "border-line/70 bg-surface"
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
                            isOpen ? "rotate-180 bg-brush-ink text-surface" : "bg-night/8 text-ink"
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
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
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
      </div>
    </section>
  );
}
