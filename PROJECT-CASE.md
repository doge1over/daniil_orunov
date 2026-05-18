# Кейс: сайт НПО «ДОМ ФАРМАЦИИ» (doclinika)

Документ-описание проекта для переноса в другой рабочий контекст. Содержит достаточно деталей, чтобы понять, что это, на чём построено и как устроено, без необходимости открывать репозиторий.

## Что это за продукт

Корпоративный сайт научно-исследовательского центра **АО НПО «ДОМ ФАРМАЦИИ»** — крупного российского центра доклинических исследований лекарственных препаратов (питомник и виварий, лаборатории, образовательный центр; штат >190 человек, адрес: Ленинградская область, г.п. Кузьмоловский).

Сайт выполняет три задачи:
1. **Представительская витрина** — рассказ о компании, услугах, лабораториях, лицензиях, специалистах, политиках.
2. **Приём заявок от клиентов** — две большие формы: «Заявка на доклинические исследования» (с десятками чекбоксов по типам токсичности, фармакокинетики и т.д.) и «Заявка на НИР».
3. **Новостной раздел с админкой** — публикация и редактирование новостей через защищённую панель `/admin/news`.

Контактный телефон: `+7(812) 603-74-28`, email: `info@doclinika.ru`.

## Технологический стек

- **Framework:** Next.js `16.1.3` (App Router; публичные страницы — `'use client'`).
- **React:** `19.2.3`, React DOM `19.2.3`.
- **TypeScript:** v5.
- **Стили:** Tailwind CSS v4 (через `@tailwindcss/postcss`). Брендовая палитра — `#F28F20` (оранжевый), `#14B7E0` (голубой), `#146FA8` (тёмно-синий), `#ABA8B1` (серый).
- **Шрифты:** Geist Sans / Geist Mono через `next/font`.
- **Хранилище:** Vercel KV (`@vercel/kv`) — единственный ключ `news` хранит массив `NewsItem`.
- **Файлы:** Vercel Blob (`@vercel/blob`) — для загрузок (через `app/api/upload/route.ts`).
- **UI-библиотеки:** `react-chrono`, `react-vertical-timeline-component` (вероятно для страницы «О нас» / истории компании).
- **Линт:** ESLint 9 + `eslint-config-next`.
- **Деплой:** Vercel (явно — судя по зависимостям и `vercel.svg` в `/public`).

## Структура (App Router, ~26 страниц)

```
app/
  page.tsx                          // главная: hero с видео, 3 секции карточек, модалка видео, футер с Яндекс-картой
  layout.tsx                        // корневой layout (Geist шрифты) — metadata НЕ кастомизирована, остался дефолтный "Create Next App"
  globals.css

  o-nas/page.tsx                    // О нас
  spetsialisty/page.tsx             // Специалисты
  kontakty/page.tsx                 // Контакты
  vakansii/page.tsx                 // Вакансии
  policy/page.tsx                   // Политики
  litsenzii-sertifikaty-udostovereniya/page.tsx

  doklinicheskie-issledovaniya/page.tsx
  mikrobiologicheskaya-laboratoriya/page.tsx
  laboratornye-zhivotnye/page.tsx
  obespechenie-kachestva/page.tsx
  provizorskaya-sluzhba/page.tsx

  innovatsionnaya-deyatelnost/
    page.tsx
    doklinicheskie-issledovaniya-farmakokinetiki/page.tsx
    doklinicheskie-issledovaniya-toksikokinetiki/page.tsx
    izuchenie-farmakokineticheskih-pokazatelej-substancij-v-in-vitro-sistemah/page.tsx
    issledovanie-bioekvivalentnosti-preparatov-v-klinicheskih-issledovaniyah-analiticheskaya-chast/page.tsx

  glavnaya/
    page.tsx
    kontakty/page.tsx
    svedeniya-ob-obrazovatelnoj-organizacii/page.tsx

  zayavka-doklinicheskie/page.tsx   // огромная форма с десятками чекбоксов (toxicity, pharmacokinetics, bioequivalence…)
  zayavka-nir/page.tsx              // форма заявки на НИР

  category/news/page.tsx            // список новостей
  category/news/[id]/page.tsx       // карточка новости

  admin/news/page.tsx               // админка новостей (тулбар форматирования, lightbox, upload, image-size dialog, toast)

  api/
    auth/route.ts                   // вход (пароль → JWT)
    news/route.ts                   // CRUD новостей через Vercel KV
    upload/route.ts                 // загрузка изображений в Vercel Blob

components/
  ScrollToTop.tsx
  PartnersCarousel.tsx

translations/
  translations.ts                   // словари ru/en
  LanguageSwitcher.tsx
  useTranslation.ts
  index.ts

lib/
  auth.ts                           // самописный HMAC-SHA256 JWT + rate-limit (без внешних JWT-библиотек)
```

Общий объём `app/**/*.tsx` — ~760 KB / 26 файлов: страницы «толстые» (вся вёрстка, хедер и футер копируются на каждую страницу — нет общего layout-компонента с навигацией).

## Аутентификация (lib/auth.ts)

Полностью самописная, без внешних библиотек:

- **JWT:** HS256 руками через `crypto.createHmac`, base64url. Payload: `{ role: 'admin', iat, exp, jti }`. TTL по умолчанию 8 ч (`SESSION_TTL_HOURS`).
- **Пароль:** `ADMIN_PASSWORD` из env, сравнивается через `crypto.timingSafeEqual` от SHA-256 хешей. (Не bcrypt/argon2 — слабое место, но для одного админа допустимо.)
- **Подпись JWT:** `SESSION_SECRET` из env, минимум 16 символов, иначе бросает ошибку.
- **Rate-limit:** in-memory `Map` по IP — 5 попыток за 15 мин, лок 30 мин. На serverless защита частичная (per-instance) — это явно прокомментировано в коде.
- **Header:** ожидает `Authorization: Bearer <token>`.

Переменные окружения: `ADMIN_PASSWORD`, `SESSION_SECRET`, опционально `SESSION_TTL_HOURS`, плюс `KV_*` и `BLOB_READ_WRITE_TOKEN` от Vercel.

## Новости (api/news/route.ts)

- Хранение: один ключ `news` в Vercel KV — массив `NewsItem { id, date, title, excerpt, content }`.
- `id = Date.now().toString()`.
- Дата — строка формата `dd.mm.yyyy`; парсится в timestamp для сортировки (новые сверху).
- `content` — HTML. Поддерживается маркер `<!--more-->`: текст до него идёт в `excerpt` (или автоматически из первых 200 символов без HTML-тегов, если `excerpt` не передан).
- Все методы кроме `GET` требуют валидный JWT.
- Эндпоинты: `GET` (список), `POST` (создать), `PUT` (обновить), `DELETE` (удалить).

## Админка новостей (app/admin/news/page.tsx)

Богатый WYSIWYG-подобный редактор на ванильном React/contentEditable (без TipTap/Slate):

- Тулбар форматирования.
- Загрузка изображений → Vercel Blob, диалог выбора ширины (S/M/L/полная), автогруппировка подряд идущих `<img>` в `<div class="news-img-row">` для отображения в ряд.
- Lightbox для предпросмотра.
- Toast-уведомления (success/error).
- Стиль смешанный — где-то Tailwind, где-то inline `style={{...}}`.

## Главная страница (app/page.tsx)

Один большой клиентский компонент (~340 строк JSX):

- Sticky-хедер с логотипом, двумя CTA-кнопками («Заявка на доклинические» оранжевая, «Заявка на НИР» голубая), переключателем языка, телефоном/email.
- Мобильное меню — отдельный блок при `mobileMenuOpen`.
- Hero: градиент `#F28F20 → #5BC0C4 → #14B7E0`, SVG-паттерн, заголовок/описание из переводов, кнопка «О нас», справа автоплей-видео `/video/hero-video.mp4`, клик открывает модалку с `<video controls>`. Снизу — волнистый SVG-разделитель.
- `<PartnersCarousel lang={lang} />` — карусель партнёров.
- 3 секции карточек по 4 колонки (на десктопе): «О компании», «Контакты и информация», «Наши услуги и лаборатории» (12 карточек, ведут на внутренние разделы и одну внешнюю ссылку — `labanimalsjournal.ru`).
- Каждая карточка: SVG-иконка, заголовок, описание, hover-эффект (поднятие, цветная полоска сверху, изменение цвета заголовка).
- Тёмный футер: три колонки (Информация / Контакты / Как добраться с Яндекс-картой через `<iframe>`).

## Многоязычность

- Два языка: `ru` и `en` (объект `translations` в `translations/translations.ts`).
- Состояние языка хранится в `useState` на каждой странице — **нет глобального стора / контекста** (значит, выбор языка не сохраняется при переходе между страницами).
- Переводится: телефон, email, hero, тексты карточек, кнопки футера и т.д.

## Заметки и шероховатости

- `app/layout.tsx` — `<html lang="en">` и метадата по-прежнему `"Create Next App"` / `"Generated by create next app"`. **SEO-метаданные не настроены вообще** — критично для корпоративного B2B-сайта.
- README — дефолтный от `create-next-app`, без описания проекта.
- Дубликаты разделов: есть и `/kontakty`, и `/glavnaya/kontakty`; есть `/glavnaya/page.tsx` параллельно с `/page.tsx`. Похоже на наследие миграции со старого сайта.
- Хедер/футер копируются в каждую страницу вместо переиспользуемого layout-компонента — большой объём дублированной разметки.
- Одиночный SHA-256 для пароля (а не bcrypt/scrypt/argon2) — слабое место, если `ADMIN_PASSWORD` короткий.
- Rate-limit в памяти на serverless фактически не работает между холодными стартами; в комментарии это признано.
- Mix стилей: Tailwind utility-классы + inline `style` в админке.
- Названия маршрутов на транслите (`zayavka-doklinicheskie`, `litsenzii-sertifikaty-udostovereniya`, `innovatsionnaya-deyatelnost`) — для русскоязычного SEO нормально, но длинно.

## Команды для запуска

```
npm install
npm run dev      # next dev на :3000
npm run build
npm start
npm run lint
```

Перед запуском в админку нужны env: `ADMIN_PASSWORD`, `SESSION_SECRET` (>=16 симв.), и подключение к Vercel KV / Blob.

## Резюме одной строкой

Корпоративный многостраничный сайт фармацевтического R&D-центра на Next.js 16 + React 19, с самописной JWT-аутентификацией, простой новостной CMS на Vercel KV, формами приёма заявок и i18n (ru/en) без глобального стора. Готов к деплою на Vercel; основные технические долги — нет SEO-метаданных, дублируется хедер/футер, серверный rate-limit in-memory.