"use client";

import { useEffect } from "react";

export function AutoTheme() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("msm-theme");
      if (stored) return; // user has a preference, respect it
      const hour = new Date().getHours();
      const isNight = hour >= 19 || hour < 7;
      if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    } catch {}
  }, []);
  return null;
}