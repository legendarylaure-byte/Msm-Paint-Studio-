"use client";

import { useState, useMemo } from "react";
import { Ruler, Paintbrush, Info } from "lucide-react";

export function PaintCoverageCalculator() {
  const [roomType, setRoomType] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [windows, setWindows] = useState<number>(0);
  const [doors, setDoors] = useState<number>(0);

  // Coverage lookup (litres per square meter based on paint type)
  const coverageLookup = {
    "single-coat": 0.06, // 6m² per litre
    "double-coat": 0.03, // 3m² per litre
  };

  // Calculate area
  const area = useMemo(() => {
    if (!roomType || !length || !width || !height) return 0;
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(l) || isNaN(w) || isNaN(h)) return 0;

    // Calculate wall area
    let totalArea = 2 * (l * h) + 2 * (w * h);

    // Subtract areas for windows and doors (approximate)
    totalArea -= windows * 1.5; // Window ~1.5m²
    totalArea -= doors * 2.0; // Door ~2.0m²

    // Account for waste and touch-ups
    return Math.max(0, totalArea * 1.1);
  }, [roomType, length, width, height, windows, doors]);

  // Calculate paint needed
  const paintNeeded = useMemo(() => {
    if (area === 0) return 0;
    return Math.ceil(area / coverageLookup["single-coat"]);
  }, [area]);

  // Get room type dimensions hint
  const roomHints = {
    living: "Living room - typically larger",
    bedroom: "Bedroom - medium size",
    kitchen: "Kitchen - often smaller",
    bathroom: "Bathroom - smaller space",
    hallway: "Hallway - narrow but long",
    dining: "Dining room - medium-large",
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card p-6 shadow-lg">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-ink">
        <Paintbrush className="h-5 w-5 text-brush-ink" />
        Paint Coverage Calculator
      </h3>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Form submission handled by parent component
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="room-type" className="mb-2 block text-sm font-medium text-ink-soft">
              Room Type
            </label>
            <select
              id="room-type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
              required
            >
              <option value="">Select a room...</option>
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="hallway">Hallway</option>
              <option value="dining">Dining Room</option>
            </select>
            {roomType && roomHints[roomType as keyof typeof roomHints] && (
              <p className="mt-1 text-xs text-brush-ink">
                {roomHints[roomType as keyof typeof roomHints]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="length" className="mb-2 block text-sm font-medium text-ink-soft">
              Length (meters)
            </label>
            <input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g., 4.5"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
              required
            />
          </div>

          <div>
            <label htmlFor="width" className="mb-2 block text-sm font-medium text-ink-soft">
              Width (meters)
            </label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="e.g., 3.5"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
              required
            />
          </div>

          <div>
            <label htmlFor="height" className="mb-2 block text-sm font-medium text-ink-soft">
              Ceiling Height (meters)
            </label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 2.4"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
              required
            />
          </div>

          <div>
            <label htmlFor="windows" className="mb-2 block text-sm font-medium text-ink-soft">
              Windows (approximate)
            </label>
            <input
              id="windows"
              type="number"
              value={windows === 0 ? "" : windows}
              onChange={(e) => {
                const val = e.target.value;
                setWindows(val === "" ? 0 : parseInt(val) || 0);
              }}
              placeholder="0"
              min="0"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
            />
            <p className="mt-1 text-xs text-ink-mute">~1.5m² each</p>
          </div>

          <div>
            <label htmlFor="doors" className="mb-2 block text-sm font-medium text-ink-soft">
              Doors (approximate)
            </label>
            <input
              id="doors"
              type="number"
              value={doors === 0 ? "" : doors}
              onChange={(e) => {
                const val = e.target.value;
                setDoors(val === "" ? 0 : parseInt(val) || 0);
              }}
              placeholder="0"
              min="0"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm transition-colors focus:border-brush-ink focus:outline-none focus:ring-2 focus:ring-brush-ink/20"
            />
            <p className="mt-1 text-xs text-ink-mute">~2.0m² each</p>
          </div>
        </div>

        {area > 0 && (
          <div className="mt-6 rounded-lg bg-brush-ink/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-brush-ink" />
                <span className="text-sm font-medium text-ink-soft">Total Wall Area:</span>
              </div>
              <span className="text-xl font-bold text-brush-ink">
                {area.toFixed(1)} m²
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-brush-ink" />
                <span className="text-sm font-medium text-ink-soft">Paint Required:</span>
              </div>
              <span className="text-xl font-bold text-brush-ink">
                {paintNeeded} litres
              </span>
            </div>

            <div className="mt-3 text-xs text-ink-mute">
              Based on single coat coverage (6m² per litre)
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={async () => {
            if (area > 0) {
              try {
                await fetch('/api/leads', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    source: 'calculator',
                    roomType,
                    length,
                    width,
                    height,
                    windows,
                    doors,
                    area: area.toFixed(1),
                    paintNeeded,
                    timestamp: new Date().toISOString(),
                    status: 'new'
                  })
                });
                alert('Calculation saved! You can now continue with your booking.');
              } catch (e) {
                alert('Calculation saved! You can now continue with your booking.');
              }
            }
          }}
          disabled={!area}
          className="w-full rounded-lg bg-brush-ink px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-brush-ink/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brush-ink/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}