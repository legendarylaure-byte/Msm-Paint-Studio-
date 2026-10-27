"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Home,
  Building2,
  Fence,
  Sofa,
} from "lucide-react";
import { services } from "@/lib/site";
import { useTodayISO } from "@/lib/use-today";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

type BookingData = {
  service: string;
  property: string;
  details: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  slot: string;
};

const properties = [
  { id: "House", icon: Home },
  { id: "Unit / Apartment", icon: Building2 },
  { id: "Shop / Office", icon: Building2 },
  { id: "Fence / Exterior", icon: Fence },
  { id: "Other", icon: Sofa },
];

const slots = [
  "Morning · 7–10 am",
  "Midday · 10 am–1 pm",
  "Afternoon · 1–4 pm",
  "Flexible",
];

const steps = ["Job", "When", "About you"];

const input =
  "w-full rounded-xl border border-line bg-card px-4 py-3.5 text-base text-ink placeholder:text-ink-mute transition-colors focus:border-tangerine focus:outline-none";

export function Booking() {
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({
    service: "",
    property: "",
    details: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    slot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = <K extends keyof BookingData>(k: K, v: BookingData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  // Client-only so the page stays statically prerenderable.
  const minDate = useTodayISO();

  const stepValid = () => {
    if (step === 0) return data.service && data.property;
    if (step === 1) return data.date && data.slot;
    return (
      data.name.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(data.email) &&
      data.phone.replace(/\D/g, "").length >= 8 &&
      data.address.trim().length > 4
    );
  };

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Something went wrong");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-lime text-onbrand"
        >
          <CheckCircle2 className="h-12 w-12" strokeWidth={2.4} />
        </motion.div>
        <h3 className="mt-6 text-3xl font-extrabold">Booking received!</h3>
        <p className="mt-3 text-lg text-ink-soft">
          Thanks {data.name.split(" ")[0]} — we&apos;ve emailed your confirmation
          to <strong className="text-ink">{data.email}</strong>. We&apos;ll confirm
          the {data.date} {data.slot.toLowerCase()} slot shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStep(0);
            setData({
              service: "", property: "", details: "", name: "", email: "",
              phone: "", address: "", date: "", slot: "",
            });
          }}
          className="mt-7 rounded-full border border-edge/15 px-6 py-3 font-bold text-ink transition-colors hover:border-edge"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* progress */}
      <div className="mb-8 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full font-display text-sm font-extrabold transition-colors ${
                  i <= step ? "bg-tangerine text-onbrand" : "bg-surface-2 text-ink-soft"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  i <= step ? "text-ink" : "text-ink-mute"
                }`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative -mt-5 h-[5px] flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className="paint-fill absolute inset-y-0 left-0 bg-gradient-to-r from-tangerine to-tangerine-dark transition-all duration-500"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-line bg-card p-6 panel-shadow sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            data-motion
            initial={reduce ? false : { opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -26 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <Group label="What needs painting?">
                  <div className="flex flex-wrap gap-2.5">
                    {services.map((s) => (
                      <Chip
                        key={s.slug}
                        active={data.service === s.title}
                        onClick={() => set("service", s.title)}
                      >
                        {s.title}
                      </Chip>
                    ))}
                  </div>
                </Group>

                <Group label="Property type">
                  <div className="flex flex-wrap gap-2.5">
                    {properties.map((p) => (
                      <Chip
                        key={p.id}
                        active={data.property === p.id}
                        onClick={() => set("property", p.id)}
                      >
                        <p.icon className="h-4 w-4" />
                        {p.id}
                      </Chip>
                    ))}
                  </div>
                </Group>

                <Field label="Tell us about the space (optional)">
                  <textarea
                    rows={3}
                    className={input}
                    placeholder="e.g. 3 bedrooms, ceilings included, some cracks in the hallway…"
                    value={data.details}
                    onChange={(e) => set("details", e.target.value)}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <Field label="Preferred date" icon={CalendarDays}>
                  <input
                    type="date"
                    min={minDate}
                    className={input}
                    value={data.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </Field>

                <Group label="Preferred time">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {slots.map((s) => (
                      <Chip
                        key={s}
                        active={data.slot === s}
                        onClick={() => set("slot", s)}
                        full
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </Group>

                <p className="rounded-xl bg-surface-2 px-4 py-3 text-sm font-semibold text-ink-soft">
                  Slots are held for you — we&apos;ll confirm exact availability by
                  email within one business day.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      className={input}
                      placeholder="Jane Smith"
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      className={input}
                      placeholder="you@email.com"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      type="tel"
                      className={input}
                      placeholder="0400 000 000"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </Field>
                  <Field label="Job address">
                    <input
                      className={input}
                      placeholder="Suburb VIC"
                      value={data.address}
                      onChange={(e) => set("address", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="rounded-xl bg-tangerine/10 px-4 py-3 text-sm font-semibold text-ink">
                  <strong>Review:</strong> {data.service} · {data.property} ·{" "}
                  {data.date} · {data.slot}
                </div>

                {status === "error" && (
                  <p className="rounded-xl bg-berry/10 px-4 py-3 text-sm font-semibold text-berry-dark">
                    {error}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* nav */}
        <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn btn-ghost btn-sm disabled:invisible"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!stepValid()}
              className="btn btn-primary group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending" || !stepValid()}
              className="btn btn-primary gloss group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Confirm booking"
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink">
        {Icon && <Icon className="h-4 w-4 text-accent" />}
        {label}
      </span>
      {children}
    </label>
  );
}

/** Groups a set of toggle buttons — a <label> would wrongly name the first one. */
function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={label} className="block">
      <span
        aria-hidden="true"
        className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink"
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  full,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
        full ? "w-full justify-center" : ""
      } ${
        active
          ? "border-tangerine bg-tangerine text-onbrand shadow-[0_10px_22px_-12px_rgba(255,107,53,1)]"
          : "border-line bg-card text-ink-soft hover:border-edge/25 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
