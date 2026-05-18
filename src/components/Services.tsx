import { services } from "@/content/services";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="services" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Услуги"
          title="Что я делаю"
          description="Беру задачи, где нужен результат, а не процесс. От лендинга для платного трафика до полноценной SaaS-платформы."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.slug}
              className={`card p-6 md:p-8 ${s.popular ? "ring-1 ring-[var(--color-accent)]/40" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                {s.popular && (
                  <span className="chip border-[var(--color-accent)]/50 text-[var(--color-accent)]">
                    Чаще всего заказывают
                  </span>
                )}
              </div>

              <p className="mt-3 text-[var(--color-fg-muted)]">{s.tagline}</p>

              <ul className="mt-6 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <svg className="mt-1 shrink-0 text-[var(--color-accent)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between border-t border-[var(--color-border)] pt-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Стоимость</div>
                  <div className="mt-1 text-xl font-semibold">{s.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Срок</div>
                  <div className="mt-1 text-xl font-semibold">{s.term}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
