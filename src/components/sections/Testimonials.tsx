import { Star, Quote } from "lucide-react";
import type { CSSProperties } from "react";
import { testimonials } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      {/* same container as every other section — the page has one left edge */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Happy clients"
          title="The kind of words"
          accent="that make our day"
          align="left"
          brushWords={3}
          followPaint
        />

        {/* one voice, at full size — no cards, no equal-weight grid */}
        <Reveal className="mt-12 sm:mt-16">
          <figure className="relative border-t border-line pt-10 sm:pt-12">
            <Quote
              className="absolute top-10 right-0 hidden h-16 w-16 text-ink/10 sm:block"
              aria-hidden
            />
            <div className="flex gap-1" aria-label={`${lead.stars} out of 5 stars`}>
              {Array.from({ length: lead.stars }).map((_, s) => (
                <Star
                  key={s}
                  className="star-pop h-5 w-5 fill-brush-ink text-brush-ink"
                  style={{ "--i": s } as CSSProperties}
                  aria-hidden
                />
              ))}
            </div>
            <blockquote className="mt-6 max-w-4xl font-display text-quote font-medium text-ink text-pretty">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-surface">
                {lead.name.charAt(0)}
              </span>
              <span>
                <span className="block font-extrabold text-ink">{lead.name}</span>
                <span className="flex items-center gap-2 text-sm text-ink-mute">
                  <span>{lead.area}</span>
                  {lead.tag && (
                    <>
                      <span className="text-ink-mute/40">•</span>
                      <span className="rounded-full border border-line/70 px-2 py-0.5 text-xs uppercase tracking-wide">
                        {lead.tag}
                      </span>
                    </>
                  )}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* the rest, kept quiet so the lead quote wins */}
        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-12">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure>
                <blockquote className="text-lg leading-relaxed text-ink-soft text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-3 text-sm font-bold text-ink">
                  {t.name}
                  <span className="ml-2 font-medium text-ink-mute">{t.area}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
