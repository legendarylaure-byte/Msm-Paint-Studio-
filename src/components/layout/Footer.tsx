import Link from "next/link";
import { Paintbrush, Mail, Phone, MapPin } from "lucide-react";
import { Year } from "@/components/ui/Year";
import { site, services } from "@/lib/site";
import { DripEdge } from "@/components/layout/DripEdge";

/* Brand glyphs drawn inline — lucide dropped brand icons. */
const Instagram = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Facebook = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden="true">
    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-onnight">
      <DripEdge />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brush-paint">
              <Paintbrush className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-extrabold">
              MSM Painting <span className="text-brush-ink-dark">Studio</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-onnight/70">
            Hands-on painting craft, now its own studio. Houses, rooms, walls,
            fences, shops and warehouses across Berwick and greater Melbourne.
          </p>
          <div className="flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon grid h-10 w-10 place-items-center rounded-full border border-onnight/30 transition-all duration-300 hover:border-brush-paint hover:bg-brush-paint hover:scale-110 hover:shadow-[0_8px_20px_-8px_var(--brush-paint)]"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-icon grid h-10 w-10 place-items-center rounded-full border border-onnight/30 transition-all duration-300 hover:border-brush-paint hover:bg-brush-paint hover:scale-110 hover:shadow-[0_8px_20px_-8px_var(--brush-paint)]"
            >
              <Facebook className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-brush-ink-dark">
            Services
          </h3>
          <ul className="space-y-2.5 text-sm text-onnight/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="transition-colors hover:text-brush-ink-dark">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-brush-ink-dark">
            Help
          </h3>
          <ul className="space-y-2.5 text-sm text-onnight/70">
            <li>
              <Link href="/#faq" className="transition-colors hover:text-brush-ink-dark">
                FAQ &amp; pricing
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors hover:text-brush-ink-dark">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-brush-ink-dark">
                Terms &amp; conditions
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="transition-colors hover:text-brush-ink-dark">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/admin" className="transition-colors hover:text-brush-ink-dark">
                Admin login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-brush-ink-dark">
            Get in touch
          </h3>
          <ul className="space-y-3.5 text-sm text-onnight/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brush-ink-dark" />
              <span>
                {site.address.line1}
                <br />
                {site.address.suburb} {site.address.state} {site.address.postcode}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brush-ink-dark" />
              <a href={site.phoneHref} className="transition-colors hover:text-brush-ink-dark">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brush-ink-dark" />
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-brush-ink-dark">
                {site.email}
              </a>
            </li>
          </ul>
          <Link
            href="/#book"
            className="btn btn-brush btn-sm mt-5"
          >
            Book a free quote
          </Link>
        </div>
      </div>

      <div className="border-t border-onnight/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-5 py-6 text-xs text-onnight/50 sm:grid-cols-3 sm:px-8">
          <p className="sm:text-left">
            © <Year /> {site.name}. ABN {site.abn}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-center">
            <svg viewBox="0 0 60 30" className="h-[1em] w-[2em] inline-block" aria-hidden="true" role="img">
              <clipPath id="au-flag">
                <path d="M0 0v30h60V0z" />
              </clipPath>
              <g clipPath="url(#au-flag)">
                <path d="M0 0v30h60V0z" fill="#00008b" />
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
                <path d="M0 0l60 30m0-30L0 30" stroke="#f00" strokeWidth="4" />
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                <path d="M30 0v30M0 15h60" stroke="#f00" strokeWidth="6" />
                <g fill="#fff">
                  <path d="M45 10l.9 2.8h2.9l-2.3 1.7.9 2.8-2.5-1.8-2.5 1.8.9-2.8-2.3-1.7h2.9z" />
                  <path d="M48 20l.6 1.9h2l-1.6 1.2.6 1.9-1.6-1.2-1.6 1.2.6-1.9-1.6-1.2h2z" />
                  <path d="M42 24l.5 1.5h1.6l-1.3.9.5 1.5-1.3-.9-1.3.9.5-1.5-1.3-.9h1.6z" />
                  <path d="M38 20l.5 1.5h1.6l-1.3.9.5 1.5-1.3-.9-1.3.9.5-1.5-1.3-.9h1.6z" />
                  <path d="M45 26l.4 1.2h1.3l-1 .7.4 1.2-1-.7-1 .7.4-1.2-1-.7h1.3z" />
                </g>
              </g>
            </svg>
            Proudly painting Berwick, Casey &amp; Cardinia ·{" "}
            <Link href="/admin" className="underline transition-colors hover:text-brush-ink-dark">
              Admin
            </Link>
          </p>
          <p className="sm:text-right">
            Crafted in Kathmandu · Deployed Globally{" "}
            <a
              href="https://www.vyomai.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brush-ink-dark"
            >
              @vyomai cloud
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
