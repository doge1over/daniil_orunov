import { faq } from "@/content/faq";
import { SectionHeader } from "./SectionHeader";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/jsonld";

export function FAQ() {
  return (
    <section id="faq" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <JsonLd data={faqSchema} />
      <div className="container-x">
        <SectionHeader
          eyebrow="FAQ"
          title="Частые вопросы"
          description="Короткие ответы на то, что спрашивают чаще всего. Не нашли свой вопрос — напишите."
        />

        <div className="mt-14 mx-auto max-w-3xl divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {faq.map((q, i) => (
            <details key={q.question} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                <span className="text-base font-medium md:text-lg">{q.question}</span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-6 text-sm text-[var(--color-fg-muted)] md:px-6 md:text-base">
                {q.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
