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
