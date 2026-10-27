import { Reveal, WordReveal } from "@/components/ui/Reveal";

/** A painted surface, not a stock photo — swap for a real portrait when one exists. */
function PaintCard() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface-2 panel-shadow">
      {/* base coat */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#E3D2B8_0%,#B8C2AE_52%,#8CA3B8_100%)] dark:bg-[linear-gradient(160deg,#4a3a2c_0%,#33402f_52%,#2b3a4a_100%)]" />

      {/* wet paint blending in */}
      <div className="absolute -left-10 top-6 h-56 w-56 rounded-full bg-[#C4674B] opacity-50 blur-3xl mix-blend-multiply animate-drift dark:opacity-40" />
      <div
        className="absolute -right-8 top-1/3 h-64 w-64 rounded-full bg-[#7E8A6B] opacity-45 blur-3xl mix-blend-multiply animate-drift dark:opacity-35"
        style={{ animationDelay: "-4s", animationDuration: "16s" }}
      />
      <div
        className="absolute -bottom-12 left-1/4 h-56 w-72 rounded-full bg-[#8CA3B8] opacity-45 blur-3xl mix-blend-multiply animate-drift dark:opacity-35"
        style={{ animationDelay: "-8s", animationDuration: "19s" }}
      />

      {/* roller sweep */}
      <div className="absolute inset-y-0 left-0 w-full overflow-hidden">
        <div className="animate-sweep h-full w-1/3 -skew-x-12 bg-white/25 blur-xl" />
      </div>

      {/* grain + vignette so it reads as a surface, not a gradient */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(15,16,38,0.3)_100%)]" />

      <div className="absolute inset-x-5 bottom-5">
        <p className="eyebrow text-white/80">In the studio</p>
        <p className="mt-1 font-display text-2xl font-extrabold leading-tight text-white">
          Hands-on, every coat.
        </p>
      </div>
    </div>
  );
}

/** The trust anchor: the person behind the brand. */
export function MeetPainter() {
  return (
    <section id="painter" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <PaintCard />

              <div className="glass-strong absolute -bottom-5 -right-3 rounded-[20px] px-5 py-4 shadow-2xl sm:-right-6">
                <p className="font-display text-xl font-extrabold text-brush-ink">
                  Owner on every job
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-mute">
                  A trusted crew behind him
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-brush-ink">Meet the owner</p>
            </Reveal>
            <h2 className="mt-3 text-h2 font-extrabold text-balance">
              <WordReveal text="You get the craftsman, not a" accent="call centre" />
              <span className="gradient-text">.</span>
            </h2>
            <Reveal delay={0.12}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  MSM is led by one painter who has spent years learning what a
                  wall actually needs — the sanding, the filling, the careful
                  cutting in. That eye doesn&apos;t get subcontracted.
                </p>
                <p>
                  On the bigger jobs he brings a small, trusted crew he has
                  worked with for years. The same hands that prep the room are
                  the hands that finish it, all working to his standard from
                  first coat to final clean-up.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <blockquote className="mt-7 border-l-4 border-brush-ink pl-5 font-display text-xl font-extrabold text-ink">
                “I&apos;d rather do three jobs properly than six rushed.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
