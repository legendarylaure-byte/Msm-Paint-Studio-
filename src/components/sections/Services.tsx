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

// Bright distinctive paint colors for each card - vibrant for both light & dark themes
const cardPaints = [
  "#9FFDD8",   // Interior Painting - Aqua Mint
  "#DBEBA9",   // Exterior Painting - Pastel Light Green
  "#FFA1C9",   // Fences & Gates - Soft Neon Pink
  "#FDB788",   // Colour Advice - Soft Vibrant Orange/Peach
  "#F1D37F",   // Shops & Warehouses - Butter Yellow
  "#8CFAD8",   // Repairs & Prep - Light Green-Teal
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="What we paint"
          title="Every surface,"
          accent="inside and out"
          intro="From a single bedroom to a full warehouse, the prep is the same obsession: clean, protect, prime, then lay on colour that lasts."
          brushWords={3}
          followPaint
        />

        <div className="mt-9 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Home;
            const paint = cardPaints[i % cardPaints.length];
            const span = "sm:col-span-1 lg:col-span-4";

            return (
              <Reveal key={s.slug} delay={i * 0.03} className={span}>
                <article
                  className="service-card group relative flex h-full min-h-[248px] rounded-[20px] border transition-all duration-500 hover:-translate-y-1 hover:rotate-[0.2deg]"
                  style={
                    {
                      "--wash": paint,
                      borderColor: `color-mix(in srgb, ${paint} 36%, var(--line))`,
                    } as CSSProperties
                  }
                >
                  <span aria-hidden className="service-card-bg" />
                  <span aria-hidden className="service-card-glow" />
                  <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                    <span aria-hidden className="service-card-sheen" />
                    <span aria-hidden className="service-card-border" />
                  </div>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

                  <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="service-card-icon relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border">
                        <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={2.1} />
                        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full ring-2 ring-white/90 dark:ring-white/15" style={{ background: paint }} />
                      </span>
                      <h3 className="text-base font-extrabold tracking-tight text-ink sm:text-lg">{s.title}</h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.blurb}</p>
                    <div className="relative mt-auto pt-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
                      <ul className="mt-3 space-y-1.5">
                        {s.points.map((p, idx) => (
                          <li key={p} className="service-card-bullet flex items-start gap-2 text-sm font-medium text-ink-soft" style={{ "--i": idx } as CSSProperties}>
                            <span className="relative mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: paint, boxShadow: `0 0 0 4px color-mix(in srgb, ${paint} 12%, transparent)` }} />
                            <span className="leading-snug">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
