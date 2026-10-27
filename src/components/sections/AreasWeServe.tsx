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
            <MapPin className="h-4 w-4 text-accent" />
            <span>Areas we serve</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-line/70 bg-card/80 px-4 py-1.5 text-sm font-medium text-ink-soft backdrop-blur transition-colors hover:border-ink/30 hover:text-ink"
              >
                {area}
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
