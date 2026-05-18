import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <div className="font-mono text-7xl font-semibold tracking-tight text-[var(--color-accent)] md:text-9xl">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
          Такой страницы нет
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-fg-muted)]">
          Возможно, страница переехала или вы ошиблись адресом. Вернитесь на главную или загляните в кейсы.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">На главную</Link>
          <Link href="/cases" className="btn btn-ghost">Смотреть кейсы</Link>
        </div>
      </div>
    </section>
  );
}
