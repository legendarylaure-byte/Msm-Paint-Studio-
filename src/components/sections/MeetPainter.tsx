import { Paintbrush } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** The trust anchor: the person behind the brand. */
export function MeetPainter() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* portrait placeholder — swap for a real photo of the painter on the job */}
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border-[3px] border-edge bg-gradient-to-br from-tangerine via-tangerine to-tangerine-dark p-1">
                <div className="grid h-full w-full place-items-center rounded-[24px] bg-surface">
                  <div className="text-center">
                    <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-tangerine text-onbrand shadow-xl">
                      <Paintbrush className="h-12 w-12" strokeWidth={2.2} />
                    </span>
                    <p className="mt-4 px-6 font-display text-lg font-extrabold text-ink">
                      Photo of your painter on the job
                    </p>
                    <p className="mt-1 px-6 text-sm text-ink-mute">
                      Replace with a real portrait for launch
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-strong absolute -bottom-5 -right-3 rounded-2xl px-5 py-4 shadow-2xl sm:-right-6">
                <p className="font-display text-2xl font-extrabold text-accent">
                  1
                </p>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-ink-mute">
                  Painter, start to finish
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-accent">Meet your painter</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 text-h2 font-extrabold text-balance">
                You get the painter, not a{" "}
                <span className="gradient-text">painting machine</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  Every job MSM Painting Studio takes on teaches the same
                  lesson: the difference between good and great is almost always
                  in the preparation.
                </p>
                <p>
                  So it&apos;s one painter, start to finish — the person quoting
                  is the person painting, and the same hands that masked the
                  skirting are the ones cutting in the last coat.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <blockquote className="mt-7 border-l-4 border-tangerine pl-5 font-display text-xl font-extrabold text-ink">
                “I&apos;d rather do three jobs properly than six rushed.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
