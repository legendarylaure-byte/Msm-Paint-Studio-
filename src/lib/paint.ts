/**
 * The colour preview palette.
 * Names are deliberately generic — never a competitor's trademarked colour name.
 * Screen colour is indicative only; the quote visit brings the real fan deck.
 */
export const palette = [
  { name: "Chalk", hex: "#F2EDE3" },
  { name: "Warm Sand", hex: "#E3D2B8" },
  { name: "Sage", hex: "#B8C2AE" },
  { name: "Olive", hex: "#7E8A6B" },
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
 * Pale swatches vanish on white, dark ones vanish on the dark theme. Nudge the
 * swatch toward a visible tone — hue stays, only lightness moves.
 * The CSS side does the same thing with `--brush-ink` for the cursor + underline.
 */
export function readableRgb(hex: string, dark: boolean): [number, number, number] {
  const rgb = parseHex(hex) ?? [255, 107, 53];
  const [r, g, b] = rgb;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const mix = !dark && lum > 0.75 ? 0.45 : dark && lum < 0.45 ? 0.55 : 0;
  if (!mix) return rgb;
  const toward = dark ? 255 : 15;
  return [
    Math.round(r + (toward - r) * mix),
    Math.round(g + (toward - g) * mix),
    Math.round(b + (toward - b) * mix),
  ];
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
