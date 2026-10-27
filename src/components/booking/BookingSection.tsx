import { ShieldCheck, Clock3, Palette } from "lucide-react";
import { Booking } from "@/components/booking/Booking";
import { SectionHeading } from "@/components/ui/Reveal";

export function BookingSection() {
  return (
    <section id="book" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface via-brush-ink/[0.06] to-surface" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Book a painter"
          title="Grab a time that"
          accent="works for you"
          intro="Three quick steps. You'll get an email confirmation the moment it's in, and we'll lock the slot within one business day."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-bold text-ink-soft">
          {[
            { icon: Clock3, t: "Takes ~60 seconds" },
            { icon: ShieldCheck, t: "No payment required" },
            { icon: Palette, t: "Free colour advice" },
          ].map((b) => (
            <span key={b.t} className="flex items-center gap-2">
              <b.icon className="h-4.5 w-4.5 text-accent" />
              {b.t}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <Booking />
        </div>
      </div>
    </section>
  );
}
