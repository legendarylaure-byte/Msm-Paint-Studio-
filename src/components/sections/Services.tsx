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
import type { CSSProperties } from "react";
import { services } from "@/lib/site";
import { palette } from "@/lib/paint";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = { Sofa, Home, Building2, Fence, Palette, Hammer };

/* Mid-tone swatches only — Chalk and Warm Sand are invisible on a white card. */
const cardPaints = [
  palette[4].hex,
  palette[2].hex,
  palette[6].hex,
  palette[3].hex,
  palette[5].hex,
  palette[7].hex,
];

// Each card hovers in its own palette colour — no second accent needed.
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
            const paint = cardPaints[i % cardPaints.length];
            return (
              <Reveal key={s.slug} delay={i * 0.07}>
                <article
                  className="service-card card-lift group relative h-full overflow-hidden rounded-[20px] border border-line bg-card p-7"
                  style={{ "--wash": paint } as CSSProperties}
                >
                  <span aria-hidden className="service-wash" />

                  <span className="icon-tile relative grid h-14 w-14 place-items-center rounded-xl border">
                    <Icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={2.2} />
                  </span>

                  <h3 className="relative mt-5 text-h3 font-extrabold">
                    <span className="relative inline-block">
                      {s.title}
                      <svg
                        aria-hidden
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                        className="card-stroke"
                      >
                        <path d="M1.5 7.8C16 4.9 38 3.1 62 2.9 92 2.7 122 3.9 152 4.6 168 4.9 184 5 198.5 4.4L198.6 7.2C184 8.2 168 8.3 152 8 122 7.4 92 6.6 62 6.9 38 7.1 16 8.2 1.4 9.6Z" />
                      </svg>
                    </span>
                  </h3>
                  <p className="relative mt-3 text-base leading-relaxed text-ink-soft">
                    {s.blurb}
                  </p>

                  <ul className="relative mt-5 space-y-2 border-t border-line pt-4">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm font-medium text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ background: paint }}
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
