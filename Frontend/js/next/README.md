# Next.js

> Официальная документация: [nextjs.org/docs](https://nextjs.org/docs) · [Learn Next.js](https://nextjs.org/learn) · [App Router](https://nextjs.org/docs/app)

Next.js — React-фреймворк для production: файловая маршрутизация, Server Components, SSR/SSG, API (Route Handlers) и оптимизация изображений «из коробки». Актуальная линия — **App Router** (`app/`).

Предварительно полезно знать [React](../react/README.md) (компоненты, JSX, хуки).

## Справочник раздела

| Раздел | Описание |
|--------|----------|
| [1. Введение](introduction.md) | Что такое Next.js, SSR/SSG/CSR, экосистема |
| [2. Установка](installation.md) | create-next-app, структура, команды |
| [3. App Router](routing.md) | Файловая маршрутизация, динамические сегменты |
| [4. Layouts и страницы](layouts.md) | `layout`, `page`, `loading`, `error`, `not-found` |
| [5. Server и Client Components](components.md) | RSC, `'use client'`, границы |
| [6. Загрузка данных](data-fetching.md) | `fetch`, кэш, Server Actions |
| [7. Навигация](navigation.md) | `Link`, `useRouter`, `redirect`, params |
| [8. Route Handlers](route-handlers.md) | API в `route.js`, методы HTTP |
| [9. Стили](styles.md) | CSS, CSS Modules, Tailwind |
| [10. Images и Fonts](images-fonts.md) | `next/image`, `next/font` |
| [11. Metadata и SEO](metadata.md) | `metadata`, Open Graph, sitemap |
| [12. Middleware](middleware.md) | Перехват запросов, редиректы, auth |

## Быстрый старт

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

Приложение: [http://localhost:3000](http://localhost:3000)

## Основные концепции

| Концепция | Суть |
|-----------|------|
| **App Router** | Маршруты = папки и файлы в `app/` |
| **Server Components** | По умолчанию рендер на сервере — меньше JS в браузере |
| **Client Components** | `'use client'` — интерактивность, хуки, браузерные API |
| **SSR / SSG / ISR** | Рендер на запрос, при сборке или с ревалидацией |
| **Route Handlers** | HTTP-эндпоинты рядом с UI (`route.js`) |

## Рекомендуемый стиль в этом разделе

**App Router** + TypeScript (по желанию) + Server Components по умолчанию. Pages Router (`pages/`) упоминается только для сравнения со старыми проектами.

## Laravel

Развёртывание Next.js вместе с Laravel API: [Laravel + Next.js](../../../devops/laravel-next/README.md).  
Запуск Next.js на сервере: [PM2](../../pm2/README.md).  
Подключение фронтенда к Laravel: [Frontend](../../../Backend/laravel/frontend.md).

## Источники

- [Next.js Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [App Router](https://nextjs.org/docs/app)
- [Vercel — Deploy](https://vercel.com/docs)
