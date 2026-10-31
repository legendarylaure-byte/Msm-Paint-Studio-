"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

export function StickyCTA() {
  const reduce = useReducedMotionSafe();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const booking = document.getElementById("book");
    if (!hero) return;

    const onScroll = () => {
      const heroRect = hero.getBoundingClientRect();
      const bookingRect = booking?.getBoundingClientRect();
      const pastHero = heroRect.bottom < 100;
      const inBooking = bookingRect ? bookingRect.top < window.innerHeight && bookingRect.bottom > 0 : false;
      setVisible(pastHero && !inBooking);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduce) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 sm:bottom-8 sm:left-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/#book"
        className="btn btn-brush gloss group flex items-center gap-2 px-5 py-3 text-sm shadow-lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          Get quoted
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}