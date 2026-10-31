"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Paintbrush, Phone as PhoneIcon } from "lucide-react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#painter", label: "Our painter" },
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

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "glass border-x-0 border-t-0 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.6)]"
          : "bg-surface/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-tangerine text-onbrand shadow-[0_8px_20px_-6px_rgba(255,107,53,0.9)] transition-transform duration-500 group-hover:rotate-[-12deg]">
            <Paintbrush className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-tight text-ink dark:text-white">
              MSM Painting
            </span>
            <span className="block text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
              Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-base font-medium text-ink-soft transition-colors duration-200 hover:text-ink dark:text-white/80 dark:hover:text-white"
            >
              <span className="relative z-10">{l.label}</span>
              <span
                aria-hidden
                className="absolute inset-x-4 bottom-1.5 h-px origin-center scale-x-0 rounded-full bg-ink/40 transition-transform duration-300 group-hover:scale-x-100 dark:bg-white/60"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <a href={site.phoneHref} className="btn btn-ghost btn-sm">
              <span className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-brush-ink" />
                {site.phone}
              </span>
            </a>
            <Link href="/admin" className="btn btn-ghost btn-sm">
              <span className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-brush-ink" />
                Admin
              </span>
            </Link>
            <Link href="/#book" className="btn btn-brush btn-sm gloss">
              Book a painter
            </Link>
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.08),0_4px_12px_-6px_rgba(15,16,38,0.6)] backdrop-blur-lg transition-all hover:scale-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.1),0_6px_16px_-6px_rgba(15,16,38,0.7)] active:scale-95 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] lg:hidden dark:border-white/15 dark:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet with slide-in animation */}
      <div
        className={`fixed inset-x-0 top-[74px] z-[99] border-t border-line/70 bg-surface/95 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(15,16,38,0.8)] transition-all duration-300 ease-in-out lg:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 p-5" aria-label="Mobile">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group relative rounded-xl px-4 py-3 font-semibold text-ink-soft transition-all duration-300 hover:bg-surface-2 hover:text-ink ${open ? "animate-slide-in" : ""}`}
              style={{ animationDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 rounded-xl border border-brush-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="group relative rounded-xl px-4 py-3 font-semibold text-ink-soft transition-all duration-300 hover:bg-surface-2 hover:text-ink flex items-center gap-2"
          >
            <Paintbrush className="h-5 w-5 text-brush-ink" />
            Admin
          </Link>
          <Link
            href="/#book"
            onClick={() => setOpen(false)}
            className="btn btn-brush mt-2 w-full py-3.5 transition-all duration-300 hover:shadow-lg"
          >
            Book a painter
          </Link>
        </nav>
      </div>
    </header>
  );
}
