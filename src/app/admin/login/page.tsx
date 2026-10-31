"use client";

import Link from "next/link";
import { Paintbrush, Mail, ShieldCheck, Lock } from "lucide-react";
import { ElementsLoginBg } from "@/components/ui/ElementsLoginBg";
import { useState } from "react";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password === "msmpainting2026") {
      document.cookie = "admin-session=authenticated; path=/; max-age=86400";
      router.push("/admin/leads");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#000004]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0] brightness-130 contrast-112 saturate-110 scale-[1.02] motion-reduce:hidden"
      >
        <source src="/videos/adminLoginBackground.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[0] hidden motion-reduce:block bg-gradient-to-br from-[#050510] via-[#0a0a18] to-[#000004]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-black/12 to-black/18" />
      <div className="absolute inset-0 z-[2] opacity-2">
        <ElementsLoginBg />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[3] opacity-12">
        <div className="absolute inset-0 bg-[radial-gradient(280%_280%_at_50%_0%,rgba(255,107,53,0.1)_0%,transparent_72%)]" />
        <div className="starfield absolute inset-0 opacity-14" />
        <div className="absolute inset-0 bg-[radial-gradient(190%_190%_at_50%_100%,rgba(0,0,4,0.45)_0%,rgba(0,0,4,0.35)_70%,transparent_100%)]" />
      </div>

      <div className="relative z-[4] mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link href="/" className="group mx-auto mb-6 inline-flex items-center gap-2.5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-tangerine text-onbrand shadow-[0_12px_40px_-10px_rgba(255,107,53,0.98)] transition-all duration-500 group-hover:rotate-[-12deg] group-hover:scale-105">
                <Paintbrush className="h-6 w-6" strokeWidth={2.4} />
              </span>
              <span className="leading-none text-left">
                <span className="block font-display text-xl font-extrabold tracking-tight text-white">MSM Painting</span>
                <span className="block text-xs font-extrabold uppercase tracking-[0.25em] text-accent">Studio</span>
              </span>
            </Link>
            <h1 className="text-h2 font-extrabold text-white tracking-tight">Admin Portal</h1>
            <p className="mt-2.5 text-base text-white/75">Secure access to your dashboard</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>Restricted Access</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-white/18 to-white/10 p-8 shadow-[0_80px_160px_-90px_rgba(255,107,53,0.7)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span aria-hidden className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-accent/35 blur-[120px]" />
            <span aria-hidden className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-orange-500/25 blur-[120px]" />
            <span aria-hidden className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tangerine/15 blur-[100px]" />
            
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div>
                <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-bold text-white/95">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-white/30 bg-white/12 px-4 py-3 text-white placeholder:text-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-200 focus:border-accent focus:bg-white/16 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  required
                />
              </div>
              
              {error && (
                <div className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-300">
                  {error}
                </div>
              )}
              
              <button type="submit" disabled={loading} className="btn btn-primary gloss group relative w-full overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? "Signing in..." : <><Lock className="h-5 w-5" />Sign in to Dashboard</>}
                </span>
              </button>
            </form>
          </div>
          
          <p className="mt-8 text-center text-sm text-white/75">
            <Link href="/" className="group inline-flex items-center gap-1 transition-colors hover:text-white">
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              <span>Back to website</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
