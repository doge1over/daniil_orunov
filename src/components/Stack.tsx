import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    title: "Фронтенд",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    title: "Бэкенд",
    items: ["Node.js", "tRPC", "NestJS", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    title: "Инфраструктура",
    items: ["Vercel", "Docker", "GitHub Actions", "Cloudflare", "Sentry"],
  },
  {
    title: "Интеграции",
    items: ["Stripe", "ЮKassa", "HubSpot", "amoCRM", "Bitrix24", "1С", "Sanity", "Strapi"],
  },
];

export function Stack() {
  return (
    <section className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Стек"
          title="На чём строю"
          description="Боевой стек, на котором держатся продукты Linear, Vercel, Notion и тысячи других — а не модный фреймворк недели."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title} className="card p-6">
              <div className="text-xs uppercase tracking-wider text-[var(--color-accent)]">{g.title}</div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li key={i} className="chip">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
