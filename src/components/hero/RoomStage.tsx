"use client";

import { useCallback, useRef } from "react";
import { palette, rooms, type RoomId, wipeMaskStyle } from "@/lib/paint";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/* ————————————————————————————————————————————————
   One-point perspective, computed from a single vanishing point.
   Back wall 150–1050 × 160–610, VP at its centre (600, 385).
   Every side edge is the back-wall corner projected through the VP,
   so the geometry stays honest if the room is ever resized.
———————————————————————————————————————————————— */
const BACK = "M150 160H1050V610H150Z";
const LEFT = "M0 85L150 160V610L0 685Z";
const RIGHT = "M1050 160L1200 85V685L1050 610Z";
const CEILING = "M0 0H1200V85L1050 160H150L0 85Z";
const FLOOR = "M0 685L150 610H1050L1200 685V800H0Z";

/** Floorboards: depth lines from the back wall base through the VP. */
const PLANKS = [150, 250, 350, 450, 550, 650, 750, 850, 950, 1050].map((qx) => {
  const x = 600 + ((qx - 600) * 415) / 225;
  return { x1: qx, x2: Math.round(x) };
});

type Uniform = { wall: string; room: RoomId; pending: string | null; onDone: () => void };

export function RoomStage({ wall, room, pending, onDone }: Uniform) {
  const reduce = useReducedMotionSafe();
  const cursor = useRef<HTMLDivElement>(null);
  const drops = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const paint = pending ?? wall;

  const move = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.current.style.opacity = "1";
      }

      // one droplet per ~30px of travel, so a slow drag still paints a trail
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      if (dx * dx + dy * dy < 900) return;
      last.current = { x, y };

      const layer = drops.current;
      if (!layer) return;
      if (layer.childElementCount > 14) layer.firstElementChild?.remove();

      const drop = document.createElement("span");
      drop.className = "paint-drop";
      drop.style.left = `${x}px`;
      drop.style.top = `${y}px`;
      drop.style.setProperty("--drop", paint);
      drop.style.setProperty("--dx", `${Math.round(Math.random() * 26 - 13)}px`);
      drop.style.setProperty("--dur", `${540 + Math.random() * 380}ms`);
      drop.addEventListener("animationend", () => drop.remove());
      layer.appendChild(drop);
    },
    [paint, reduce],
  );

  const hide = useCallback(() => {
    if (cursor.current) cursor.current.style.opacity = "0";
  }, []);

  return (
    <div
      className="stage relative h-full w-full overflow-hidden"
      onPointerMove={move}
      onPointerLeave={hide}
      onPointerDown={move}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`${rooms.find((r) => r.id === room)?.label ?? "Room"} preview painted in ${palette.find((p) => p.hex === paint)?.name ?? "colour"}`}
      >
        <defs>
          {/* painted surfaces — one fill, reused by the wet coat via <use> */}
          <g id="wallBase">
            <path d={BACK} fill="currentColor" />
            <path d={LEFT} fill="currentColor" />
            <path d={RIGHT} fill="currentColor" />
          </g>

          <linearGradient id="sky" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="var(--room-sky-a)" />
            <stop offset="1" stopColor="var(--room-sky-b)" />
          </linearGradient>

          <linearGradient id="ceiling" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--room-ceiling)" />
            <stop offset="1" stopColor="var(--room-ceiling-2)" />
          </linearGradient>

          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--room-floor-a)" />
            <stop offset="1" stopColor="var(--room-floor-b)" />
          </linearGradient>

          {/* sun patch: brightest at the wall, dissolving toward the viewer */}
          <linearGradient id="shaft" x1="0" y1="0" x2="0.18" y2="1">
            <stop offset="0" stopColor="#fff6e2" stopOpacity="0.62" />
            <stop offset="0.55" stopColor="#fff6e2" stopOpacity="0.26" />
            <stop offset="1" stopColor="#fff6e2" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="glassGlow">
            <stop offset="0" stopColor="#fff6e2" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff6e2" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="contact">
            <stop offset="0" stopColor="#000" stopOpacity="var(--room-shadow)" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* corner shading keeps the box reading as a box */}
          <linearGradient id="ao" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.16" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ——— surfaces ——— */}
        <g style={{ color: wall }}>
          <use href="#wallBase" />
        </g>

        {pending && (
          <g
            key={pending}
            className="wall-wipe"
            style={{ color: pending, ...wipeMaskStyle }}
            onAnimationEnd={onDone}
          >
            <use href="#wallBase" />
          </g>
        )}

        <g fill="var(--room-wall-dim)">
          <path d={BACK} />
          <path d={LEFT} />
          <path d={RIGHT} />
        </g>

        <path d={LEFT} fill="#000" opacity="0.11" />
        <path d={RIGHT} fill="#000" opacity="0.05" />
        <path d={BACK} fill="url(#glassGlow)" opacity="0.35" />

        <path d={CEILING} fill="url(#ceiling)" />
        <path d={FLOOR} fill="url(#floor)" />

        <g stroke="#000" strokeOpacity="0.07" strokeWidth="1.5">
          {PLANKS.map((p) => (
            <line key={p.x1} x1={p.x1} y1="611" x2={p.x2} y2="800" />
          ))}
        </g>

        <path d="M790 610H1004L1096 800H650Z" fill="url(#shaft)" />

        {/* skirting + wall/floor junction shadow */}
        <rect x="150" y="592" width="900" height="18" fill="var(--room-trim)" />
        <rect x="150" y="586" width="900" height="8" fill="url(#ao)" />
        <path d="M0 672L150 597V610L0 685Z" fill="var(--room-trim)" />
        <path d="M1050 597L1200 672V685L1050 610Z" fill="var(--room-trim)" />

        {/* ——— window ——— */}
        <g>
          <rect x="770" y="198" width="234" height="228" rx="3" fill="var(--room-trim)" />
          <rect x="782" y="210" width="210" height="204" fill="url(#sky)" />
          <rect x="884" y="210" width="5" height="204" fill="var(--room-trim)" opacity="0.85" />
          <rect x="782" y="308" width="210" height="5" fill="var(--room-trim)" opacity="0.85" />
          <rect x="760" y="426" width="254" height="9" rx="3" fill="var(--room-trim)" />
        </g>

        {/* ——— furniture ——— */}
        {room === "living" && <Living />}
        {room === "bedroom" && <Bedroom />}
        {room === "nursery" && <Nursery />}

        <rect x="0" y="0" width="1200" height="800" fill="none" />
      </svg>

      <div ref={drops} aria-hidden className="pointer-events-none absolute inset-0 z-40" />
      {!reduce && (
        <div ref={cursor} aria-hidden className="brush-cursor opacity-0">
          <svg viewBox="0 0 34 34" width="34" height="34">
            <path d="M4 2l9.5 9.5-4 4L0 6z" fill={paint} stroke="rgba(0,0,0,.28)" strokeWidth="1" />
            <path d="M12.5 12.5l5 5-2.5 2.5-5-5z" fill="#cfc9c0" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
            <path d="M18 18l12.5 12.5" stroke="#24222e" strokeWidth="5.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ————————————————————————————————————————————————
   Rooms. Flat masses, one contact shadow each — decor stays out of the way
   so the wall is the subject. No top faces: the camera sits at VP height,
   so horizontal edges stay horizontal in one-point perspective.
———————————————————————————————————————————————— */
function Contact({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="20" fill="url(#contact)" />;
}

function Living() {
  return (
    <g>
      <ellipse cx="470" cy="716" rx="250" ry="54" fill="var(--room-rug)" opacity="0.7" />
      <Contact cx={515} cy={642} rx={245} />
      <rect x="300" y="452" width="420" height="112" rx="14" fill="var(--room-furniture-2)" />
      <rect x="286" y="556" width="448" height="66" rx="16" fill="var(--room-furniture)" />
      <rect x="286" y="600" width="448" height="26" rx="12" fill="var(--room-furniture-2)" opacity="0.7" />
      <rect x="272" y="512" width="40" height="120" rx="14" fill="var(--room-furniture-2)" />
      <rect x="708" y="512" width="40" height="120" rx="14" fill="var(--room-furniture-2)" />
      <line x1="510" y1="466" x2="510" y2="552" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
      {/* coffee table */}
      <Contact cx={510} cy={732} rx={130} />
      <rect x="410" y="678" width="200" height="14" rx="6" fill="var(--room-furniture-2)" />
      <rect x="424" y="692" width="9" height="34" rx="3" fill="var(--room-furniture-2)" />
      <rect x="587" y="692" width="9" height="34" rx="3" fill="var(--room-furniture-2)" />
      {/* plant */}
      <Contact cx={946} cy={700} rx={54} />
      <path d="M946 700c-6-40 8-62 26-76-2 30-8 54-18 76z" fill="var(--room-plant)" />
      <path d="M946 700c-2-34-18-52-34-60 4 28 14 44 26 60z" fill="var(--room-plant)" opacity="0.8" />
      <path d="M930 700h34l-5 44h-24z" fill="var(--room-furniture-2)" />
    </g>
  );
}

function Bedroom() {
  return (
    <g>
      <ellipse cx="500" cy="730" rx="270" ry="52" fill="var(--room-rug)" opacity="0.7" />
      <Contact cx={500} cy={648} rx={250} />
      <rect x="296" y="430" width="418" height="86" rx="12" fill="var(--room-furniture-2)" />
      <rect x="306" y="516" width="398" height="140" rx="10" fill="var(--room-furniture)" />
      <rect x="306" y="596" width="398" height="60" rx="8" fill="var(--room-rug)" />
      <rect x="330" y="486" width="112" height="40" rx="10" fill="var(--room-furniture-2)" opacity="0.9" />
      <rect x="466" y="486" width="112" height="40" rx="10" fill="var(--room-furniture-2)" opacity="0.9" />
      {/* nightstand + lamp */}
      <Contact cx={800} cy={648} rx={80} />
      <rect x="736" y="540" width="128" height="104" rx="8" fill="var(--room-furniture-2)" />
      <line x1="736" y1="592" x2="864" y2="592" stroke="#000" strokeOpacity="0.1" strokeWidth="2" />
      <rect x="792" y="504" width="8" height="36" fill="#000" fillOpacity="0.35" />
      <path d="M768 504h56l-8-30h-40z" fill="var(--room-lamp)" />
    </g>
  );
}

function Nursery() {
  return (
    <g>
      <ellipse cx="520" cy="724" rx="240" ry="48" fill="var(--room-rug)" opacity="0.7" />
      <Contact cx={470} cy={650} rx={180} />
      {/* cot */}
      <rect x="330" y="470" width="290" height="46" rx="8" fill="var(--room-furniture-2)" />
      <rect x="336" y="556" width="278" height="34" rx="6" fill="var(--room-furniture)" />
      <g stroke="var(--room-furniture-2)" strokeWidth="7" strokeLinecap="round">
        {[372, 410, 448, 486, 524, 562, 594].map((x) => (
          <line key={x} x1={x} y1="516" x2={x} y2="590" />
        ))}
      </g>
      <rect x="326" y="512" width="12" height="82" rx="5" fill="var(--room-furniture-2)" />
      <rect x="612" y="512" width="12" height="82" rx="5" fill="var(--room-furniture-2)" />
      {/* dresser */}
      <Contact cx={810} cy={656} rx={92} />
      <rect x="716" y="532" width="188" height="112" rx="8" fill="var(--room-furniture-2)" />
      <line x1="716" y1="590" x2="904" y2="590" stroke="#000" strokeOpacity="0.1" strokeWidth="2" />
      <rect x="786" y="556" width="48" height="8" rx="4" fill="#000" fillOpacity="0.16" />
      <rect x="786" y="614" width="48" height="8" rx="4" fill="#000" fillOpacity="0.16" />
    </g>
  );
}
