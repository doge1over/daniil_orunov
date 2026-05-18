const items = [
  {
    title: "Фиксированная цена",
    desc: "Согласованная стоимость закрепляется в договоре до старта. Без сюрпризов.",
  },
  {
    title: "Гарантия 60 дней",
    desc: "После запуска два месяца бесплатно правлю баги и помогаю с настройкой.",
  },
  {
    title: "Демо по этапам",
    desc: "Рабочая превью-ссылка на каждое обновление. Видите прогресс, не пропадаю.",
  },
  {
    title: "Код остаётся у вас",
    desc: "Полные права на исходники и доступы. Никаких vendor-lock.",
  },
];

export function Guarantees() {
  return (
    <section className="border-b border-[var(--color-border)] py-12 md:py-16">
      <div className="container-x">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold">{it.title}</div>
                <p className="mt-1 text-xs text-[var(--color-fg-muted)]">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
