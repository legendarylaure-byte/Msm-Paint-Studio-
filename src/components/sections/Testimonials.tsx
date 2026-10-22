import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-surface-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Happy clients"
          title="The kind of words that"
          accent="make our day"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09}>
              <figure className="card-lift relative h-full rounded-3xl border border-line bg-card p-7">
                <Quote
                  className="absolute top-5 right-5 h-9 w-9 text-tangerine/40"
                  aria-hidden
                />
                <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-5 w-5 fill-sunshine text-sunshine"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-tangerine font-display text-lg font-extrabold text-onbrand">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-extrabold text-ink">{t.name}</span>
                    <span className="block text-sm text-ink-mute">{t.area}</span>
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
