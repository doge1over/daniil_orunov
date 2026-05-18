import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    n: "01",
    title: "Бриф и оценка",
    duration: "1–2 дня",
    desc: "Обсуждаем задачу, цели и бюджет. Фиксирую скоуп и присылаю план с этапами и сроком.",
  },
  {
    n: "02",
    title: "Дизайн и структура",
    duration: "от 1 недели",
    desc: "Согласовываем структуру и экраны. Дизайн в вашем фирстиле, с готового референса или с нуля.",
  },
  {
    n: "03",
    title: "Разработка",
    duration: "по неделям",
    desc: "Кодинг с регулярным демо. Превью-ссылка на каждое обновление. Подключаем CMS, формы, аналитику.",
  },
  {
    n: "04",
    title: "Запуск и поддержка",
    duration: "+ гарантия",
    desc: "Деплой на Vercel или ваш сервер. Обучаю редактора. Бесплатно правлю баги в гарантийный период.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Процесс"
          title="Как мы будем работать"
          description="Без созвонов ради созвонов. Каждый этап — с понятным результатом и демо."
        />

        <ol className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card relative overflow-hidden p-6">
              <div
                className="absolute -right-2 -top-4 font-mono text-7xl font-semibold text-[var(--color-surface-2)] select-none"
                aria-hidden
              >
                {s.n}
              </div>
              <div className="relative">
                <div className="text-xs uppercase tracking-wider text-[var(--color-accent)]">{s.duration}</div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
