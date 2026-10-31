import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Manrope,
  Space_Mono,
} from "next/font/google";
import { site } from "@/lib/site";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { AutoTheme } from "@/components/ui/AutoTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { Analytics } from "@/components/ui/Analytics";
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

const mono = Space_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "700"],
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  const isAdmin = pathname.startsWith("/admin");
  
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("msm-theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}try{document.documentElement.style.setProperty("--brush-ink","color-mix(in srgb, #ff6b35 75%, #0f1026)");document.documentElement.classList.add("light-paint")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isAdmin ? (
          children
        ) : (
          <>
            <a href="#main" className="skip-link rounded-full bg-night px-5 py-3 text-sm font-bold text-onnight">
              Skip to content
            </a>
            <ScrollProgress />
            <SplashCursor />
            <BrushCursor />
            <SectionIndicator />
            <Header />
            <ToastProvider>
              <main id="main" className="flex-1">
                {children}
              </main>
            </ToastProvider>
            <Footer />
            <MobileActionBar />
            <StickyCTA />
            <AutoTheme />
            <Analytics />
            <link rel="manifest" href="/manifest.json" />
            <script
              dangerouslySetInnerHTML={{
                __html: `if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('Service Worker registered:', registration.scope);
                    })
                    .catch(error => {
                      console.error('Service Worker registration failed:', error);
                    });
                }`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
