import Image from "next/image";
import type { Case } from "@/content/cases";

type Variant = "card" | "hero" | "featured";

export function CaseCover({ caseItem, variant = "card" }: { caseItem: Case; variant?: Variant }) {
  const accent = caseItem.accent;
  const isHero = variant === "hero";
  const isFeatured = variant === "featured";
  const isCard = variant === "card";

  const imageAspect = isHero ? "16 / 8" : isFeatured ? "4 / 3" : "16 / 10";
  const sizes = isHero
    ? "(min-width: 1024px) 1100px, 100vw"
    : isFeatured
      ? "(min-width: 1024px) 640px, 100vw"
      : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw";

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: imageAspect }}
        role="img"
        aria-label={caseItem.imageAlt ?? `Превью кейса ${caseItem.title}`}
      >
        {caseItem.image ? (
          <Image
            src={caseItem.image}
            alt=""
            fill
            sizes={sizes}
            priority={isHero}
            className="object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 80% at 0% 0%, ${accent}33 0%, transparent 60%), radial-gradient(120% 80% at 100% 100%, ${accent}22 0%, transparent 55%), #0e0e10`,
            }}
          />
        )}

        <div className="dot-grid absolute inset-0 opacity-20" aria-hidden />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 md:inset-x-4 md:top-4">
          <span
            className="rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm"
            style={{ background: accent, color: "#0a0a0b" }}
          >
            {caseItem.category}
          </span>
          <span
            className="rounded-md border border-white/10 bg-black/65 px-2 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md"
          >
            {caseItem.year}
          </span>
        </div>
      </div>

      {!isHero && (
        <div
          className="relative flex flex-1 flex-col gap-3 border-t bg-[var(--color-surface)] p-5 md:p-6"
          style={{ borderColor: `${accent}33` }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
          />

          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-dim)]">
              {caseItem.client}
            </div>
            <div
              className={`mt-1.5 font-semibold tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)] ${
                isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
              }`}
            >
              {caseItem.title}
            </div>
          </div>

          {isCard && (
            <p className="line-clamp-2 text-sm text-[var(--color-fg-muted)]">
              {caseItem.tagline}
            </p>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-1.5">
            {caseItem.metrics.slice(0, 3).map((m) => (
              <span
                key={m.label}
                className="inline-flex items-baseline gap-1 rounded-md border px-2 py-1 text-[11px]"
                style={{ borderColor: `${accent}33`, background: `${accent}10` }}
              >
                <strong style={{ color: accent }}>{m.value}</strong>
                <span className="text-[var(--color-fg-muted)]">{m.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}