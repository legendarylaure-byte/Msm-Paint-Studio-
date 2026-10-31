import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Accessibility Statement — ${site.name}`,
  description: `How ${site.name} makes this website usable for everyone, including people using keyboards, screen readers and reduced-motion settings.`,
};

const commitments = [
  {
    h: "Keyboard navigation",
    p: "Every interactive element — menus, forms, the booking wizard, the before/after slider and the chat — can be reached and operated using the Tab, Enter, Space and arrow keys. A visible focus indicator always shows where you are.",
  },
  {
    h: "Screen readers",
    p: "The site uses semantic headings, labelled controls, alternative text and ARIA roles where native HTML isn’t enough. A “skip to content” link lets screen-reader users jump past the navigation.",
  },
  {
    h: "Colour and contrast",
    p: "Text is written to meet WCAG AA contrast against its background. Colour is never the only way information is conveyed — states also use shape, text or icons.",
  },
  {
    h: "Motion",
    p: "If your device or browser is set to “reduce motion”, the site automatically disables decorative animations, parallax and auto-moving content while keeping all information and functions available.",
  },
  {
    h: "Forms",
    p: "All form fields have visible labels, clear error messages and sensible input types (email, phone, date) so the right keyboard appears on mobile.",
  },
  {
    h: "Zoom and responsive design",
    p: "The layout works from small phones to large desktops and remains usable at 200% browser zoom without loss of content or function.",
  },
];

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-brush-ink">
        Legal
      </p>
      <h1 className="mt-3 text-h1 font-extrabold">
        Accessibility Statement
      </h1>
      <p className="mt-3 text-sm font-semibold text-ink-mute">
        Last updated: {site.lastUpdated}
      </p>

      <p className="mt-8 leading-relaxed text-ink-soft">
        We believe a welcoming website should be welcoming to everyone. This
        statement explains the steps {site.name} takes to make this site usable
        by people with disabilities, and how to tell us if something gets in your
        way.
      </p>

      <div className="mt-10 space-y-9">
        {commitments.map((c) => (
          <section key={c.h}>
            <h2 className="text-h3 font-extrabold text-ink">{c.h}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{c.p}</p>
          </section>
        ))}

        <section>
          <h2 className="text-h3 font-extrabold text-ink">
            Standards we aim to meet
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            We target WCAG 2.2 Level AA and align with the Disability
            Discrimination Act 1992 (Cth) and the Australian Government Digital
            Service Standard. Accessibility is reviewed as part of every design
            and code change, not as an afterthought.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-extrabold text-ink">
            Something not working?
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            If any part of this site is hard to use, tell us and we&apos;ll fix
            it and offer the information another way. Email{" "}
            <a href={`mailto:${site.email}`} className="font-bold text-brush-ink hover:underline">
              {site.email}
            </a>{" "}
            or call {site.phone}. We aim to respond within two business days.
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
        <Link href="/privacy" className="text-brush-ink hover:underline">
          Privacy Policy →
        </Link>
        <Link href="/terms" className="text-brush-ink hover:underline">
          Terms &amp; Conditions →
        </Link>
        <Link href="/" className="text-ink-mute hover:underline">
          ← Back to home
        </Link>
      </div>
    </article>
  );
}
