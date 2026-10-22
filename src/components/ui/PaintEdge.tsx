/**
 * A painted edge between two section bands: the section's own colour rises
 * into the band above it with a brush-torn line. One path, one animation.
 */
const seamPath =
  "M0 64 L0 36 C90 22 180 46 270 36 S450 20 540 32 S720 48 810 36 S990 20 1080 32 S1260 46 1350 34 L1440 36 L1440 64 Z";

const fills = {
  surface: "fill-surface",
  "surface-2": "fill-surface-2",
  night: "fill-night",
} as const;

export function PaintEdge({
  tone,
  side = "top",
}: {
  tone: keyof typeof fills;
  side?: "top" | "bottom";
}) {
  const bottom = side === "bottom";
  return (
    <div
      aria-hidden
      className={`paint-seam pointer-events-none absolute inset-x-0 z-20 h-10 sm:h-16 ${
        bottom ? "paint-seam-down top-full" : "bottom-full"
      }`}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className={`h-full w-full ${fills[tone]} ${bottom ? "rotate-180" : ""}`}
      >
        <path d={seamPath} />
      </svg>
    </div>
  );
}
