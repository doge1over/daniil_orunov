type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">{eyebrow}</div>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-[var(--color-fg-muted)] md:text-lg">{description}</p>
      )}
    </div>
  );
}
