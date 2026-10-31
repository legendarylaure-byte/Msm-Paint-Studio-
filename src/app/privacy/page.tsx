import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `How ${site.name} collects, uses and protects your personal information when you book or contact us. Compliant with the Australian Privacy Principles.`,
};

const sections = [
  {
    h: "1. Who we are",
    p: [
      `${site.name} (${site.address.full}) operates this website and can be contacted at ${site.email}.`,
      "In this policy, “we”, “us” and “our” refer to MSM Painting Studio.",
    ],
  },
  {
    h: "2. What we collect",
    p: [
      "When you submit a booking, quote request or chat message, we collect the details you provide: your name, email address, phone number, project address, the service you’re interested in, your preferred dates, and any photos or notes you choose to share.",
      "We also collect standard technical data (IP address, browser type, pages visited) through hosting and analytics providers to keep the site secure and improve it.",
    ],
  },
  {
    h: "3. Why we collect it",
    p: [
      "We use your information to: respond to your enquiry, prepare and send quotes, schedule and carry out booked work, send booking confirmations and reminders, and (if you opt in) send occasional updates about our services.",
      "We do not sell, rent or trade your personal information to anyone.",
    ],
  },
  {
    h: "4. Who we share it with",
    p: [
      "We use trusted service providers to run this website — including our hosting platform, email delivery service, database provider and chat provider. They only process your information on our behalf and to the extent needed to provide those services.",
      "We may disclose information where required by Australian law or to protect the rights and safety of our clients or our business.",
    ],
  },
  {
    h: "5. Photo uploads",
    p: [
      "Photos you upload of your space are used solely to assess and quote your job. They are stored securely and deleted on request.",
    ],
  },
  {
    h: "6. Data security and retention",
    p: [
      "We store data in access-controlled databases with encryption in transit (HTTPS) and at rest where the provider supports it. We keep records for as long as needed to deliver our services and meet legal obligations, then delete or de-identify them.",
    ],
  },
  {
    h: "7. Your rights",
    p: [
      "You may request access to, or correction of, the personal information we hold about you, and you may ask us to delete it. Email us at " +
        site.email +
        " and we’ll respond within a reasonable period.",
      "You can opt out of marketing messages at any time by replying “STOP” or emailing us.",
    ],
  },
  {
    h: "8. Cookies and analytics",
    p: [
      "This site uses essential cookies to function (for example, keeping you logged in to the admin area). We may use privacy-respecting analytics to understand aggregate traffic. You can block cookies in your browser settings, though some features may not work.",
    ],
  },
  {
    h: "9. Third-party links",
    p: [
      "Our site links to social media and other third-party sites. Their privacy practices are governed by their own policies, which we encourage you to read.",
    ],
  },
  {
    h: "10. Changes and contact",
    p: [
      "We may update this policy from time to time. The latest version is always published on this page.",
      `Questions? Email ${site.email} or write to ${site.address.full}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-brush-ink">
        Legal
      </p>
      <h1 className="mt-3 text-h1 font-extrabold">
        Privacy Policy
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
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-card p-6">
        <p className="text-sm text-ink-soft">
          This is a template prepared for {site.name} and should be reviewed by a
          legal professional before launch to confirm it matches your actual
          practices and obligations under the Privacy Act 1988 (Cth).
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
        <Link href="/terms" className="text-brush-ink hover:underline">
          Terms &amp; Conditions →
        </Link>
        <Link href="/accessibility" className="text-brush-ink hover:underline">
          Accessibility Statement →
        </Link>
        <Link href="/" className="text-ink-mute hover:underline">
          ← Back to home
        </Link>
      </div>
    </article>
  );
}
