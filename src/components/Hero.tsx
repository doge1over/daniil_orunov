import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(196,247,75,0.35), transparent)" }}
        aria-hidden
      />
      <div className="container-x relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Принимаю заявки
          </span>
          <span className="chip">Работаю удалённо</span>
        </div>

        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
          Сайты на Next.js{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">под ключ</span>
            <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-[var(--color-accent)]/40 md:h-4" aria-hidden />
          </span>
          ,
          <br className="hidden md:block" /> от лендинга до SaaS
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-[var(--color-fg-muted)] md:text-xl">
          Привет, я Даниил. Делаю быстрые сайты и веб-приложения на Next.js и TypeScript. Фиксированная цена, понятные сроки и работающий результат.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="#contact" className="btn btn-primary accent-glow">
            Обсудить проект
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link href="#services" className="btn btn-ghost">
            Услуги и цены
          </Link>
        </div>
      </div>
    </section>
  );
}
