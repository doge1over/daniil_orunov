import Link from "next/link";
import { cases } from "@/content/cases";
import { SectionHeader } from "./SectionHeader";
import { CaseCover } from "./CaseCover";

export function Cases() {
  if (cases.length === 0) return null;

  const featured = cases[0];
  const rest = cases.slice(1);

  return (
    <section id="cases" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Кейсы"
            title="Свежие проекты"
            description="Без рекламной воды — что было до, что я сделал и что получилось в итоге."
          />
          {cases.length > 1 && (
            <Link href="/cases" className="btn btn-ghost">
              Все кейсы
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>

        <Link
          href={`/cases/${featured.slug}`}
          className="card group mt-14 block overflow-hidden lg:grid lg:grid-cols-[1.1fr_1fr]"
        >
          <CaseCover caseItem={featured} variant="featured" />
          <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
            <div>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--color-fg-dim)]">
                {featured.tags.slice(0, 3).map((t) => (
                  <span key={t}>#{t.toLowerCase()}</span>
                ))}
                <span>·</span>
                <span>{featured.duration}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance group-hover:text-[var(--color-accent)] transition-colors md:text-3xl">
                {featured.tagline}
              </h3>
              <p className="mt-4 text-sm text-[var(--color-fg-muted)] md:text-base">
                {featured.result}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-5">
              <div className="flex flex-wrap gap-2">
                {featured.stack.slice(0, 4).map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-[var(--color-fg)]">
                Кейс
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <Link key={c.slug} href={`/cases/${c.slug}`} className="card group flex overflow-hidden">
                <CaseCover caseItem={c} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
