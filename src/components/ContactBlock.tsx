import { site } from "@/lib/site";
import { LeadForm } from "./LeadForm";

export function ContactBlock() {
  return (
    <section id="contact" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Контакт</div>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Расскажите о задаче — посчитаю за 1 день
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-[var(--color-fg-muted)] md:text-lg">
            Опишите проект в форме или напишите напрямую. В течение 2 часов в рабочее время отвечу с уточнениями. Если задача подходит — пришлю план работ, сроки и фикс-цену.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <a href={`mailto:${site.email}`} className="group flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Email</div>
                <div className="mt-1 text-base">{site.email}</div>
              </div>
              <Arrow />
            </a>
            <a href={site.telegram} target="_blank" rel="noopener" className="group flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Telegram</div>
                <div className="mt-1 text-base">{site.telegram.replace("https://t.me/", "@")}</div>
              </div>
              <Arrow />
            </a>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="group flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Телефон / WhatsApp</div>
                <div className="mt-1 text-base">{site.phone}</div>
              </div>
              <Arrow />
            </a>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      className="text-[var(--color-fg-dim)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
