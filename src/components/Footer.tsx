import Link from "next/link";
import { site } from "@/lib/site";
import { Logo, Wordmark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo />
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-md text-sm text-[var(--color-fg-muted)]">
              {site.name} — веб-разработчик. Делаю сайты и веб-приложения на Next.js, которые быстро запускаются и хорошо ранжируются.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Разделы</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#services" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">Услуги</Link></li>
              <li><Link href="/cases" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">Кейсы</Link></li>
              <li><Link href="/#process" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">Процесс</Link></li>
              <li><Link href="/#faq" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">FAQ</Link></li>
              <li><Link href="/kontakty" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-fg-dim)]">Связь</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">{site.phone}</a></li>
              <li><a href={site.telegram} target="_blank" rel="noopener" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">Telegram</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-fg-dim)] md:flex-row md:items-center">
          <span>© {year} {site.name}</span>
          <span>Next.js · TypeScript · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
