# orunov.studio — сайт-портфолио

Сайт-визитка веб-разработчика Даниила Орунова. Лендинг с упором на конверсию + страницы кейсов.

## Стек

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** strict
- **Tailwind CSS v4** (CSS-first конфиг через `@theme`)
- Серверный рендеринг (SSG для всех страниц)
- Telegram-бот для приёма заявок (опционально)

## Запуск

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать переменные окружения
cp .env.example .env.local

# 3. Запустить дев-сервер
npm run dev
# → http://localhost:3000

# Прод-сборка
npm run build
npm run start

# Проверка типов
npm run typecheck
```

> Если используете pnpm/yarn — замените `npm` на свой пакет-менеджер.

## Структура

```
src/
├── app/
│   ├── layout.tsx              ← root layout, SEO defaults, JSON-LD
│   ├── page.tsx                ← главная (одностраничник)
│   ├── globals.css             ← Tailwind v4 + тема
│   ├── sitemap.ts              ← /sitemap.xml
│   ├── robots.ts               ← /robots.txt
│   ├── opengraph-image.tsx     ← /og-image (генерируется на edge)
│   ├── not-found.tsx           ← 404
│   ├── cases/
│   │   ├── page.tsx            ← /cases
│   │   └── [slug]/page.tsx     ← /cases/:slug
│   ├── kontakty/page.tsx       ← /kontakty
│   └── api/lead/route.ts       ← обработчик заявок
├── components/                 ← Header, Hero, Cases, Pricing, FAQ и т.д.
├── content/                    ← редактируемые данные
│   ├── cases.ts                ← кейсы
│   ├── services.ts             ← услуги и цены
│   ├── faq.ts                  ← FAQ
│   └── testimonials.ts         ← отзывы
└── lib/
    ├── site.ts                 ← глобальный конфиг сайта
    └── jsonld.ts               ← Schema.org разметка
```

## Что редактировать

| Что | Где |
| --- | --- |
| Имя, email, телефон, соцсети, URL | `src/lib/site.ts` |
| Кейсы (карточки + страницы) | `src/content/cases.ts` |
| Услуги и цены | `src/content/services.ts` |
| FAQ (попадает в JSON-LD) | `src/content/faq.ts` |
| Отзывы | `src/content/testimonials.ts` |
| Цвета / шрифты | `src/app/globals.css` (`@theme`) |

## SEO из коробки

- SSG все страницы — поисковики видят полный HTML
- Уникальные `<title>` и `meta description` на каждой странице
- Open Graph + Twitter Cards
- Auto-generated OG-картинка (`/opengraph-image`)
- JSON-LD: `Person`, `ProfessionalService`, `WebSite`, `FAQPage`, `BreadcrumbList`, `CreativeWork`
- `sitemap.xml` обновляется при добавлении кейсов
- `robots.txt` разрешает AI-краулеры (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` для AI-поиска (Perplexity, ChatGPT, AI Overviews)
- Security-заголовки (HSTS, X-Content-Type-Options и т.д.)
- Чистая семантика, accessible, prefers-reduced-motion
- Core Web Vitals: LCP-friendly hero, никакого CLS

## Конверсия / продажи

- Закреплённый хедер с CTA «Обсудить проект»
- 4 типа предложений с фикс-ценами и сроками
- Кейсы с метриками результата (выручка, конверсия, скорость)
- Блок гарантий (фикс-цена, 90 дней гарантии, демо по пятницам, исходники у клиента)
- 3 социальных пруфа (testimonials)
- FAQ закрывает возражения
- Форма заявки с типом проекта, бюджетом и honeypot против ботов
- Альтернативные каналы: Email, Telegram, WhatsApp, телефон

## Приём заявок в Telegram

1. Создайте бота через [@BotFather](https://t.me/BotFather), получите `TELEGRAM_BOT_TOKEN`.
2. Узнайте свой `chat_id` у [@userinfobot](https://t.me/userinfobot).
3. Заполните `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```
4. Заявки будут падать в личку бота. Без этих переменных лиды пишутся в консоль сервера.

## Деплой

Самый простой путь — Vercel:

```bash
npm i -g vercel
vercel
```

Не забудьте добавить переменные окружения в дашборде Vercel.

Альтернативно: `npm run build && npm run start` на любом Node 20+ хостинге.

## Лицензия

Исходники — `MIT`. Дизайн и контент — © Даниил Орунов.
