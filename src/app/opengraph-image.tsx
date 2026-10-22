import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Painters in Berwick VIC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card — rendered at build time, no runtime cost. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "72px 80px",
          background: "linear-gradient(135deg, #ff6b35 0%, #e5521d 58%, #16162a 100%)",
          color: "#fffdf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.92,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "#fffdf7",
              }}
            />
            MSM Painting Studio
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            Painting that makes a house feel like home.
          </div>
          <div style={{ marginTop: 26, fontSize: 28, opacity: 0.85 }}>
            Painters in Berwick VIC 3806 · Free quotes · Fully insured
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: 300,
          }}
        >
          {["Interior", "Exterior", "Fences", "Commercial"].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#ffc93c",
                }}
              />
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
