import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCaseBySlug } from "@/content/cases";
import { CaseCover } from "@/components/CaseCover";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbsSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};

  const title = `${item.title} — кейс`;
  const description = `${item.tagline}. ${item.problem}`.slice(0, 200);

  return {
    title,
    description,
    alternates: { canonical: `/cases/${item.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${site.url}/cases/${item.slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    creator: { "@type": "Person", name: site.name, url: site.url },
    about: item.category,
    keywords: item.tags.join(", "),
    inLanguage: "ru-RU",
    datePublished: `${item.year}-01-01`,
    description: item.tagline,
  };

  const cleanHost = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Главная", url: site.url },
          { name: "Кейсы", url: `${site.url}/cases` },
          { name: item.title, url: `${site.url}/cases/${item.slug}` },
        ])}
      />
      <JsonLd data={caseStudySchema} />

      <article>
        <section className="border-b border-[var(--color-border)] py-16 md:py-24">
          <div className="container-x">
            <nav aria-label="Хлебные крошки" className="text-xs text-[var(--color-fg-dim)]">
              <Link href="/" className="hover:text-[var(--color-fg)]">Главная</Link>
              <span className="mx-2">/</span>
              <Link href="/cases" className="hover:text-[var(--color-fg)]">Кейсы</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--color-fg-muted)]">{item.title}</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="chip"
                    style={{ color: item.accent, borderColor: `${item.accent}55`, background: `${item.accent}14` }}
                  >
                    {item.category}
                  </span>
                  <span className="chip">{item.year}</span>
                  <span className="chip">{item.duration}</span>
                </div>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                  {item.title}
                </h1>
                <p className="mt-5 text-pretty text-lg text-[var(--color-fg-muted)] md:text-xl">
                  {item.tagline}
                </p>
                {item.url && (
                  <div className="mt-7">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-ghost"
                    >
                      Открыть {cleanHost(item.url)}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {item.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <div className="text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: item.accent }}>{m.value}</div>
                    <div className="mt-1 text-xs text-[var(--color-fg-muted)]">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)]">
          <div className="container-x py-10">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <CaseCover caseItem={item} variant="hero" />
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)] py-20 md:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Задача</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Что было до</h2>
              <p className="mt-5 text-[var(--color-fg-muted)]">{item.problem}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Решение</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Что сделал</h2>
              <p className="mt-5 text-[var(--color-fg-muted)]">{item.solution}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Результат</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Что получилось</h2>
              <p className="mt-5 text-[var(--color-fg-muted)]">{item.result}</p>
            </div>
          </div>
        </section>

        {item.highlights && item.highlights.length > 0 && (
          <section className="border-b border-[var(--color-border)] py-20 md:py-28">
            <div className="container-x">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Особенности реализации</div>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Из чего собрано
              </h2>
              <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {item.highlights.map((h) => (
                  <div key={h.title} className="card p-6">
                    <h3 className="text-lg font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-b border-[var(--color-border)] py-16">
          <div className="container-x">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">Стек</div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container-x flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Нужен похожий проект?
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-fg-muted)]">
                Опишите задачу — за 1 рабочий день пришлю план, сроки и точную смету.
              </p>
            </div>
            <Link href="/#contact" className="btn btn-primary accent-glow">
              Обсудить проект
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
