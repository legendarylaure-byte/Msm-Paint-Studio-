"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Paintbrush } from "lucide-react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#work", label: "Our work" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile links close the menu in their own onClick; no effect needed.

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-x-0 border-t-0 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-tangerine text-onbrand shadow-[0_8px_20px_-6px_rgba(255,107,53,0.9)] transition-transform duration-500 group-hover:rotate-[-12deg]">
            <Paintbrush className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.06rem] font-extrabold tracking-tight">
              MSM Painting
            </span>
            <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-accent">
              Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              <span className="relative z-10">{l.label}</span>
              <span
                aria-hidden
                className="absolute inset-x-3 bottom-1.5 h-2 origin-left scale-x-0 rounded-full bg-tangerine/45 transition-transform duration-300 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <a href={site.phoneHref} className="btn btn-ghost btn-sm">
              {site.phone}
            </a>
            <Link href="/#book" className="btn btn-primary btn-sm gloss">
              Book a painter
            </Link>
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-edge/10 transition-colors hover:border-edge/30 hover:bg-surface-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-line bg-surface transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-5" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-ink-soft transition-colors hover:bg-tangerine/10 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#book"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-full py-3.5"
          >
            Book a painter
          </Link>
        </nav>
      </div>
    </header>
  );
}
