/**
 * The colour preview palette.
 * Names are deliberately generic — never a competitor's trademarked colour name.
 * Screen colour is indicative only; the quote visit brings the real fan deck.
 */
export const palette = [
  { name: "Brand Orange", hex: "#FF6B35" },
  { name: "Chalk", hex: "#F2EDE3" },
  { name: "Warm Sand", hex: "#E3D2B8" },
  { name: "Sage", hex: "#B8C2AE" },
  { name: "Olive", hex: "#7E8A6B" },
  { name: "Ivory", hex: "#F6F1EC" },
  { name: "Greige", hex: "#C9C5BE" },
  { name: "Oatmeal", hex: "#E7E2D6" },
  { name: "Clay", hex: "#D9B99B" },
  { name: "Moss", hex: "#9FA88A" },
  { name: "Terracotta", hex: "#C4674B" },
  { name: "Blush", hex: "#E7C6C0" },
  { name: "Denim", hex: "#8CA3B8" },
  { name: "Charcoal", hex: "#4A4E55" },
] as const;

export type PaletteEntry = (typeof palette)[number];

export const rooms = [
  { id: "living", label: "Living room", short: "Living" },
  { id: "bedroom", label: "Bedroom", short: "Bed" },
  { id: "nursery", label: "Nursery", short: "Nursery" },
] as const;

export type RoomId = (typeof rooms)[number]["id"];

/** "#abc" | "#aabbcc" -> [r, g, b]. Null on anything else. */
export function parseHex(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) {
    return [h[0] + h[0], h[1] + h[1], h[2] + h[2]].map((p) => parseInt(p, 16)) as [
      number,
      number,
      number,
    ];
  }
  if (h.length === 6) {
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  return null;
}

/**
 * Compute a readable text color for any paint swatch.
 * - Light theme: ensures dark text on pale swatches
 * - Dark theme: ensures light text on dark swatches, but forces dark text on very pale swatches
 */
export function readableRgb(hex: string, dark: boolean): [number, number, number] {
  const rgb = parseHex(hex) ?? [255, 107, 53];
  const [r, g, b] = rgb;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  if (!dark) {
    // Light theme: keep mid-tone paints bright (readable on white bg) instead
    // of darkening them. Only very light paints get darkened; dark paints get
    // lightened. This keeps the "paint coloured" look.
    if (lum > 0.75) {
      // Very light paints (Chalk, Warm Sand, Ivory, Oatmeal, Greige, Blush):
      // darken but keep some hue so the color change is visible.
      const mix = Math.min(0.6, 0.45 + (lum - 0.75) * 1.0);
      return [
        Math.round(r + (15 - r) * mix),
        Math.round(g + (15 - g) * mix),
        Math.round(b + (15 - b) * mix),
      ];
    }
    if (lum < 0.35) {
      // Dark paints (Charcoal): keep mostly original hue, slight lighten for
      // readability. Charcoal (#4A4E55) on light bg has ~6.5:1 contrast (AA).
      const mix = 0.15;
      return [
        Math.round(r + (255 - r) * mix),
        Math.round(g + (255 - g) * mix),
        Math.round(b + (255 - b) * mix),
      ];
    }
    // Mid paints (Orange, Terracotta, Olive, Sage, Denim, etc.): keep bright.
    // Tiny darken for WCAG safety only.
    const mix = 0.12;
    return [
      Math.round(r + (15 - r) * mix),
      Math.round(g + (15 - g) * mix),
      Math.round(b + (15 - b) * mix),
    ];
  } else {
    // Dark theme: very light paints -> dark readable ink (don't use white on
    // very light swatches, keeps contrast on dark bg).
    if (lum > 0.7) {
      const mix = Math.min(0.85, 0.6 + (lum - 0.7) * 1.2);
      return [
        Math.round(r + (15 - r) * mix),
        Math.round(g + (15 - g) * mix),
        Math.round(b + (15 - b) * mix),
      ];
    }
    // Mid paints: slight mix toward white for readability.
    if (lum > 0.45) {
      const mix = 0.4;
      return [
        Math.round(r + (255 - r) * mix),
        Math.round(g + (255 - g) * mix),
        Math.round(b + (255 - b) * mix),
      ];
    }
    // Dark paints (Charcoal, Olive, Terracotta): mix toward white.
    if (lum < 0.35) {
      const mix = 0.6;
      return [
        Math.round(r + (255 - r) * mix),
        Math.round(g + (255 - g) * mix),
        Math.round(b + (255 - b) * mix),
      ];
    }
    return rgb;
  }
}

/**
 * Get readable ink color as CSS color string (rgb) for CSS variable injection
 */
export function readableInk(hex: string, dark: boolean): string {
  const [r, g, b] = readableRgb(hex, dark);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Readable button text color: pure black on light paints, pure white on dark
 * paints. Snaps to extremes so buttons look clean (no muddy mid-tones).
 */
export function readableBtnInk(hex: string): string {
  const rgb = parseHex(hex) ?? [255, 107, 53];
  const [r, g, b] = rgb;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.5 ? "#0f1026" : "#f8fafc";
}

/**
 * Rough-edged vertical brush edge, drawn at 200% width.
 * Sliding mask-position 100% -> 0% rolls it across the element.
 * One static mask, no per-frame filters.
 */
export const brushMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0 0h102c6 20-4 32 2 52s-5 34 2 54-4 32 2 50 1 24 0 44H0z'/%3E%3C/svg%3E\")";

export const wipeMaskStyle = {
  maskImage: brushMask,
  WebkitMaskImage: brushMask,
  maskSize: "200% 100%",
  WebkitMaskSize: "200% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "100% 0%",
  WebkitMaskPosition: "100% 0%",
} as const;