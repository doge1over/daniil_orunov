"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo, Wordmark } from "./Logo";

const navLinks = [
  { href: "/#services", label: "Услуги" },
  { href: "/#cases", label: "Кейсы" },
  { href: "/#process", label: "Процесс" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[rgba(10,10,11,0.85)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label={site.name}>
          <Logo />
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Главная навигация">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/#contact" className="btn btn-primary">
            Обсудить проект
          </Link>
        </div>

        <button
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-[var(--color-border)] md:hidden"
        >
          <span className="sr-only">Меню</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden">
          <nav className="container-x flex flex-col py-2" aria-label="Мобильная навигация">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              Обсудить проект
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
