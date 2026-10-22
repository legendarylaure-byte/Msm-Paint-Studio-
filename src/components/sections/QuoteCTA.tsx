import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/** Final contact push — the shorter alternative to the full booking wizard. */
export function QuoteCTA() {
  return (
    <section id="quote" className="relative scroll-mt-24 bg-card py-20 sm:py-24">
      <div aria-hidden className="scrub-rule absolute inset-x-0 top-0 h-[3px] bg-tangerine" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-[36px] border-[3px] border-edge bg-night px-8 py-12 text-center text-onnight sm:px-14 sm:py-16">
          <Reveal>
            <p className="eyebrow text-accent-dark">Just curious?</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-3 max-w-2xl text-h2 font-extrabold text-balance">
              Get a free quote in{" "}
              <span className="text-accent-dark">one message</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-onnight/70">
              Not ready to book a date? Send the basics and we&apos;ll come back
              with a clear, itemised number — usually the same business day.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/#book" className="btn btn-primary gloss group">
                <span className="relative z-10 flex items-center gap-2">
                  Start a free quote
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
                <Mail className="h-4.5 w-4.5 text-accent-dark" />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-accent-dark">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-accent-dark" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-accent-dark" />
                <span>Mon–Sat, replies within one business day</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
