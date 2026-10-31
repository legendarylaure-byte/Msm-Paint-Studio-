"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

/** Sticky tap-to-call / tap-to-book bar — trades' most valuable real estate on mobile. */
export function MobileActionBar() {
  const pathname = usePathname();
  /* the bar would sit on top of the wizard's next/back buttons */
  const [inBooking, setInBooking] = useState(false);

  useEffect(() => {
    const el = document.getElementById("book");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInBooking(e.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      className={`glass fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 px-3 py-2.5 transition-transform duration-300 sm:hidden ${
        inBooking ? "pointer-events-none translate-y-full" : ""
      }`}
      aria-hidden={inBooking}
    >
      <div className="flex gap-2.5">
        <a
          href={site.phoneHref}
          className="btn btn-dark flex-1 py-3.5 text-sm"
        >
          <Phone className="h-4 w-4" strokeWidth={2.5} />
          Call now
        </a>
        <Link
          href="/#book"
          className="btn btn-brush gloss flex-1 py-3.5 text-sm"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          Free quote
        </Link>
      </div>
    </div>
  );
}
