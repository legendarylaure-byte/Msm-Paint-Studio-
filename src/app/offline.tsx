"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-berry/10 text-berry-dark">
        <WifiOff className="h-10 w-10" strokeWidth={2} />
      </div>
      
      <h1 className="mt-6 text-h1 font-extrabold text-balance">
        You're offline.
      </h1>
      
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
        The painting studio is having connection issues. Please check your internet connection and try again.
      </p>
      
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="btn btn-brush gloss group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </span>
        </button>
        <Link href="/" className="btn btn-ghost">
          <Home className="h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="mt-8 max-w-xs rounded-xl border border-line bg-surface-2/50 p-4">
        <h3 className="text-sm font-semibold text-ink">What you can do offline:</h3>
        <ul className="mt-2 space-y-1 text-xs text-ink-soft">
          <li>• Browse gallery and view painting examples</li>
          <li>• Calculate paint coverage estimates</li>
          <li>• View service information and pricing</li>
          <li>• Read reviews and testimonials</li>
        </ul>
      </div>
    </div>
  );
}