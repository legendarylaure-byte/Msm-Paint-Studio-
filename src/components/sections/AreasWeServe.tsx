"use client";

import { Reveal } from "@/components/ui/Reveal";
import { MapPin } from "lucide-react";

const areas = [
  "Berwick",
  "Narre Warren",
  "Cranbourne",
  "Pakenham",
  "Beaconsfield",
  "Officer",
  "Casey",
  "Cardinia",
  "Dandenong South",
  "Hallam",
];

export function AreasWeServe() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <MapPin className="h-4 w-4 text-brush-ink" />
            <span>Areas we serve</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="group relative overflow-hidden rounded-full border border-line/70 bg-card/80 px-4 py-1.5 text-sm font-medium text-ink-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink hover:shadow-[0_10px_40px_-20px_rgba(15,16,38,0.6)]"
              >
                <span className="relative z-10">{area}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brush-paint/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </span>
            ))}
          </div>
          <p className="max-w-2xl text-sm text-ink-mute">
            Professional painting services across Berwick, Casey &amp; Cardinia. Not sure if
            we cover your suburb? Just ask — we’re happy to help.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
