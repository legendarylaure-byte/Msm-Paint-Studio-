import Image from "next/image";
import { Reveal, WordReveal } from "@/components/ui/Reveal";

function PaintCard() {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/40 bg-white/60 shadow-[0_40px_90px_-50px_rgba(15,16,38,0.9)] backdrop-blur-xl transition-transform duration-700 hover:scale-[1.01] dark:border-white/10 dark:bg-white/5">
      <Image
        src="/team/mesay-owner.jpg"
        alt="Owner of MSM Painting Studio - hands-on painting professional"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
        priority={false}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(15,16,38,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/3 h-40 w-40 rounded-full bg-brush-paint/25 blur-[90px] opacity-0 transition-opacity duration-700 group-hover:opacity-70"
      />

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

              <div className="glass-strong absolute -bottom-5 -right-3 rounded-[20px] px-5 py-4 shadow-[0_30px_70px_-30px_rgba(15,16,38,0.9)] sm:-right-6 bg-white/90 dark:bg-black/70 backdrop-blur-xl border border-white/60 dark:border-white/15">
                <p className="font-display text-xl font-extrabold text-brush-paint dark:text-brush-paint">
                  Owner on every job
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink dark:text-white/80">
                  A trusted crew behind him
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-brush-ink-dark">Meet the owner</p>
            </Reveal>
            <h2 className="relative mt-3 text-h2 font-extrabold text-balance w-fit max-w-full">
              <WordReveal text="You get the" accent="craftsman, not a call centre." brushWords={3} />
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
