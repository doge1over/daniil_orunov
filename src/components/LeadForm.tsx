"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "ok" | "error";

const budgets = ["до 200к", "200–500к", "500к–1 млн", "от 1 млн"];
const types = ["Лендинг", "Корпоративный сайт", "Интернет-магазин", "Веб-приложение", "Другое"];

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Не удалось отправить заявку");
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  }

  if (status === "ok") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-semibold">Заявка принята</h3>
        <p className="mt-2 text-[var(--color-fg-muted)]">
          Отвечу в течение 2 часов в рабочее время. Если срочно — пишите в{" "}
          <a href={site.telegram} className="text-[var(--color-accent)] underline-offset-4 hover:underline">Telegram</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Имя" name="name" required placeholder="Александр" autoComplete="name" />
        <Field label="Telegram, email или телефон" name="contact" required placeholder="@username / email / +7…" autoComplete="email" />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm text-[var(--color-fg-muted)]">Тип проекта</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="type" value={t} className="peer sr-only" defaultChecked={t === "Лендинг"} />
              <span className="chip peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)]/15 peer-checked:text-[var(--color-fg)]">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm text-[var(--color-fg-muted)]">Бюджет, ₽</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} className="peer sr-only" defaultChecked={b === "200–500к"} />
              <span className="chip peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)]/15 peer-checked:text-[var(--color-fg)]">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-sm text-[var(--color-fg-muted)]">О задаче</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Что хотите сделать, есть ли дизайн, ссылка на текущий сайт, дедлайны…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none placeholder:text-[var(--color-fg-dim)] focus:border-[var(--color-accent)]/50 focus:ring-1 focus:ring-[var(--color-accent)]/40"
        />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[var(--color-fg-dim)]">
          Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary accent-glow disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Отправляю…" : "Отправить заявку"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-[var(--color-danger)]">
          {error}. Напишите в <a className="underline" href={site.telegram}>Telegram</a> или на{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}

function Field({
  label, name, required, placeholder, autoComplete, type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[var(--color-fg-muted)]">{label}{required && <span className="text-[var(--color-accent)]"> *</span>}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none placeholder:text-[var(--color-fg-dim)] focus:border-[var(--color-accent)]/50 focus:ring-1 focus:ring-[var(--color-accent)]/40"
      />
    </label>
  );
}
