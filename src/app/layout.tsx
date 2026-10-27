import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Manrope,
  JetBrains_Mono,
} from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { SplashCursor } from "@/components/ui/SplashCursor";
import { BrushCursor } from "@/components/ui/BrushCursor";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — Painters in Berwick VIC | Free Quotes`;
const description =
  "MSM Painting Studio — professional house, room, wall, fence and commercial painting in Berwick VIC 3806 and all of Casey–Cardinia. Free quotes, free colour advice. Book online.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "painter Berwick",
    "painting Berwick VIC",
    "house painter Casey",
    "interior painter Melbourne",
    "exterior painter Narre Warren",
    "fence painting Cranbourne",
    "commercial painter Pakenham",
    "free painting quote",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ff6b35",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  name: site.name,
  description,
  email: site.email,
  telephone: site.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -38.0184, longitude: 145.3606 },
  areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
  openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below sets data-theme on
    // <html> before React hydrates, which would otherwise mismatch.
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("msm-theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link rounded-full bg-night px-5 py-3 text-sm font-bold text-onnight">
          Skip to content
        </a>
        <ScrollProgress />
        <SplashCursor />
        <BrushCursor />
        <SectionIndicator />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
