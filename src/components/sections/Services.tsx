"use client";

import {
  Sofa,
  Home,
  Building2,
  Fence,
  Palette,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = { Sofa, Home, Building2, Fence, Palette, Hammer };

// Cards stay neutral so one action colour (tangerine) carries the CTAs.
export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we paint"
          title="Every surface, inside and"
          accent="out"
          intro="From a single bedroom to a full warehouse, the prep is the same obsession: clean, protect, prime, then lay on colour that lasts."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Home;
            return (
              <Reveal key={s.slug} delay={i * 0.07}>
                <article
                  className="card-lift group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition-colors duration-500 group-hover:border-tangerine/50"
                >
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface-2 text-ink-soft transition-colors duration-500 group-hover:border-tangerine/40 group-hover:text-accent">
                    <Icon className="h-7 w-7" strokeWidth={2.2} />
                  </span>

                  <h3 className="mt-5 text-h3 font-extrabold">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {s.blurb}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-[0.87rem] font-medium text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
