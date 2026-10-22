import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${site.name}`,
  description: `The terms that apply when you use this website or engage ${site.name} for painting services in Berwick VIC and surrounds.`,
};

const sections = [
  {
    h: "1. Acceptance of these terms",
    p: [
      "By using this website or engaging us for services, you agree to these Terms & Conditions. If you do not agree, please do not use the site.",
    ],
  },
  {
    h: "2. Quotes and pricing",
    p: [
      "All quotes are free and carry no obligation. A quote is valid for 30 days from issue unless stated otherwise.",
      "Quoted prices are based on the surfaces, access and condition described or inspected at the time. If the scope changes materially (for example, extensive hidden damage or a colour change), we will discuss any adjustment with you before proceeding — we never surprise you with a higher invoice.",
      "Prices are in Australian dollars and include GST unless stated otherwise.",
    ],
  },
  {
    h: "3. Bookings and scheduling",
    p: [
      "Submitting a booking through this website is a request for a date. Your booking is confirmed once we email you a confirmation.",
      "Start dates and timelines depend on weather (for exterior work), material availability and access. We will notify you promptly if something outside our control shifts the schedule.",
      "You may reschedule or cancel a booking by following the link in your confirmation email, calling us, or replying to that email. Please give at least 48 hours’ notice where possible.",
    ],
  },
  {
    h: "4. Payment terms",
    p: [
      "Payment terms are stated on your quote or invoice. Unless otherwise agreed, payment is due upon completion of the work.",
      "For larger projects we may request a deposit to secure materials and your date; this will always be disclosed in advance and confirmed in writing.",
    ],
  },
  {
    h: "5. Client responsibilities",
    p: [
      "Please ensure we have safe and reasonable access to the areas being painted, and that pets, children and vehicles are kept clear of the work zone.",
      "Please move fragile items, valuables and small furniture before we arrive. We will protect and cover everything else.",
      "Colour choices approved by you are treated as final. We recommend testing sample pots on the actual surface first — we’re happy to arrange this.",
    ],
  },
  {
    h: "6. Workmanship guarantee",
    p: [
      "We stand behind our work. If you identify a defect in our workmanship within a reasonable period after completion, contact us and we will return to make it right.",
      "This guarantee does not cover damage caused after the work by others, normal wear and tear, moisture or structural movement unrelated to our preparation or application.",
    ],
  },
  {
    h: "7. Insurance and liability",
    p: [
      `${site.name} maintains public liability insurance. Certificates of currency are available on request before work begins.`,
      "To the extent permitted by law, our liability for any claim arising from our services is limited to the value of the quote for those services. Nothing in these terms limits rights you have under the Australian Consumer Law.",
    ],
  },
  {
    h: "8. Website use and content",
    p: [
      "All text, images, logo and design on this website belong to ${site.name} or its licensors and may not be reproduced without permission.",
      "You agree not to misuse the site, including attempting to interfere with its operation, submitting false bookings, or scraping content.",
      "Information on this site is provided in good faith and for general guidance; it is not a binding offer until confirmed in a written quote.",
    ],
  },
  {
    h: "9. Privacy",
    p: [
      "Your personal information is handled as described in our Privacy Policy, which forms part of these terms.",
    ],
  },
  {
    h: "10. Governing law and contact",
    p: [
      "These terms are governed by the laws of Victoria, Australia, and any disputes fall under the jurisdiction of Victorian courts.",
      `Questions about these terms: ${site.email} or ${site.address.full}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-accent">
        Legal
      </p>
      <h1 className="mt-3 text-h1 font-extrabold">
        Terms &amp; Conditions
      </h1>
      <p className="mt-3 text-sm font-semibold text-ink-mute">
        Last updated: {site.lastUpdated}
      </p>

      <div className="mt-10 space-y-9">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-h3 font-extrabold text-ink">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-ink-soft">
                {para.replace("${site.name}", site.name)}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-card p-6">
        <p className="text-sm text-ink-soft">
          Template prepared for {site.name}. Have a legal professional review it
          before launch to confirm it reflects your actual trading practices.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
        <Link href="/privacy" className="text-accent hover:underline">
          Privacy Policy →
        </Link>
        <Link href="/accessibility" className="text-accent hover:underline">
          Accessibility Statement →
        </Link>
        <Link href="/" className="text-ink-mute hover:underline">
          ← Back to home
        </Link>
      </div>
    </article>
  );
}
