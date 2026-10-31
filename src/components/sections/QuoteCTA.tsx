import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading, Reveal, PaintUnderline } from "@/components/ui/Reveal";

/** Final contact push — the shorter alternative to the full booking wizard. */
export function QuoteCTA() {
  return (
    <section id="quote" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-night/90 px-8 py-12 text-center text-onnight shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-14 sm:py-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brush-paint/10 blur-[100px]" />
          <SectionHeading
            eyebrow="Just curious?"
            title="Get a free quote"
            accent="in one message."
            brushWords={3}
            followPaint
          />
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-onnight/70">
              Not ready to book a date? Send the basics and we&apos;ll come back
              with a clear, itemised number — usually the same business day.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/#book" className="btn btn-brush gloss group">
                <span className="relative z-10 flex items-center gap-2">
                  Start a free quote
                  <ArrowRight className="h-5 w-5 text-inherit transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-invert">
                {site.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-onnight/65">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-brush-ink-dark" />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-brush-ink-dark">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-brush-ink-dark" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-brush-ink-dark" />
                <span>Mon–Sat, replies within one business day</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
