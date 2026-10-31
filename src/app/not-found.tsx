import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="eyebrow text-brush-ink">Page not found</p>
      <h1 className="mt-3 text-h1 font-extrabold text-balance">
        That page has been
        <span className="gradient-text"> painted over</span>.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        The link you followed doesn&apos;t exist. Head back to the studio, or
        tell us what you were after and we&apos;ll point you to it.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-brush">
          Back to home
        </Link>
        <a href={site.phoneHref} className="btn btn-ghost">
          {site.phone}
        </a>
      </div>
    </section>
  );
}
