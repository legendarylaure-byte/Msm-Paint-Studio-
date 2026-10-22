"use client";

import { useYear } from "@/lib/use-today";

/** Auto-updating copyright year, rendered client-side only. */
export function Year() {
  const year = useYear();
  return <>{year}</>;
}
