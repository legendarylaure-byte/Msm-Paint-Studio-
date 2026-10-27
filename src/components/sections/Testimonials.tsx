import { Star, Quote } from "lucide-react";
import type { CSSProperties } from "react";
import { testimonials } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      {/* deliberately wider than every other section — breaks the 7xl rhythm */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Happy clients"
          title="The kind of words that"
          accent="make our day"
          align="left"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09}>
              <figure className="card-lift relative h-full rounded-[20px] border border-line bg-card p-7">
                <Quote
                  className="absolute top-5 right-5 h-9 w-9 text-ink/15"
                  aria-hidden
                />
                <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="star-pop h-5 w-5 fill-brush-ink text-brush-ink"
                      style={{ "--i": s } as CSSProperties}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-xl leading-snug font-medium text-ink text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-surface">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-extrabold text-ink">{t.name}</span>
                    <span className="flex items-center gap-2 text-sm text-ink-mute">
                      <span>{t.area}</span>
                      {(t as any).tag && (
                        <>
                          <span className="text-ink-mute/40">•</span>
                          <span className="rounded-full border border-line/70 px-2 py-0.5 text-xs uppercase tracking-wide">
                            {(t as any).tag}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
