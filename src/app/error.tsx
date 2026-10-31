"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-berry/10 text-berry-dark">
        <AlertTriangle className="h-10 w-10" strokeWidth={2} />
      </div>
      <h1 className="mt-6 text-h1 font-extrabold text-balance">
        Something went <span className="gradient-text">wrong</span>.
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
        We hit an unexpected error. Try again, or head back home and we'll
        sort it out.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-ink-mute">Error ref: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button onClick={reset} className="btn btn-brush gloss group">
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
    </div>
  );
}