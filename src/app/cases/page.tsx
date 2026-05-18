import type { Metadata } from "next";
import Link from "next/link";
import { cases } from "@/content/cases";
import { CaseCover } from "@/components/CaseCover";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbsSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Кейсы веб-разработки: что было, что сделал, что получилось. С метриками результата и описанием стека.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: `Кейсы — ${site.name}`,
    description: "Реальные проекты с метриками результата.",
    url: `${site.url}/cases`,
  },
};

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Главная", url: site.url },
          { name: "Кейсы", url: `${site.url}/cases` },
        ])}
      />
      <section className="border-b border-[var(--color-border)] py-20 md:py-28">
        <div className="container-x">
          <nav aria-label="Хлебные крошки" className="text-xs text-[var(--color-fg-dim)]">
            <Link href="/" className="hover:text-[var(--color-fg)]">Главная</Link>
            <span className="mx-2">/</span>
            <span>Кейсы</span>
          </nav>
          <div className="mt-6">
            <SectionHeader
              eyebrow="Портфолио"
              title="Кейсы"
              description="Что было до, что я сделал, что получилось. С метриками и описанием стека."
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          {cases.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
              <p className="text-[var(--color-fg-muted)]">
                Кейсы готовятся к публикации. Хотите посмотреть работы — напишите в{" "}
                <a href={site.telegram} className="text-[var(--color-accent)] underline-offset-4 hover:underline">Telegram</a>.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <Link key={c.slug} href={`/cases/${c.slug}`} className="card group flex overflow-hidden">
                  <CaseCover caseItem={c} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
