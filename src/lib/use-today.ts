"use client";

import { useSyncExternalStore } from "react";

/**
 * Read today's date on the client only.
 * Uses useSyncExternalStore so the page can still be statically prerendered —
 * the server snapshot is an empty string, which keeps prerender deterministic.
 */
const subscribe = () => () => {};
const empty = () => "";
const iso = () => new Date().toISOString().split("T")[0];
const year = () => String(new Date().getFullYear());

export function useTodayISO() {
  return useSyncExternalStore(subscribe, iso, empty);
}

export function useYear() {
  return useSyncExternalStore(subscribe, year, empty);
}
