export const site = {
  name: "Даниил Орунов",
  shortName: "Orunov",
  role: "Веб-разработчик",
  title: "Даниил Орунов — Веб-разработчик. Сайты на Next.js под ключ",
  description:
    "Делаю быстрые сайты на Next.js и TypeScript: лендинги, корпоративные сайты, интернет-магазины и веб-приложения. Фиксированная цена, прозрачные сроки.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orunov.studio",
  locale: "ru_RU",
  email: "daniilorunov@mail.ru",
  phone: "+7 (963) 348-59-66",
  telegram: "https://t.me/dobrak887",
  whatsapp: "https://wa.me/79633485966",
  github: "https://github.com/daniil-orunov",
  ogImage: "/og.png",
  keywords: [
    "веб-разработчик",
    "разработка сайтов",
    "сайт под ключ",
    "Next.js разработчик",
    "React разработчик",
    "TypeScript",
    "лендинг на заказ",
    "корпоративный сайт",
    "интернет-магазин",
    "Даниил Орунов",
  ],
} as const;

export type Site = typeof site;
