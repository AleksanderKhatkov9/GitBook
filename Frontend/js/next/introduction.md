# 1. Введение в Next.js

> Источники: [Getting Started | Next.js](https://nextjs.org/docs) · [What is Next.js?](https://nextjs.org/docs/app/getting-started)

**Next.js** — фреймворк на базе [React](../react/README.md) для полноценных веб-приложений. Добавляет к React маршрутизацию, серверный рендеринг, сборку и оптимизации, которые обычно собирают вручную из отдельных библиотек.

Разработан [Vercel](https://vercel.com/). Актуальный подход — **App Router** (директория `app/`).

### Предварительные знания

Нужны основы [HTML](../../html/README.md), [CSS](../../css/README.md), [JavaScript](../README.md) и [React](../react/README.md) (JSX, компоненты, props, state, хуки).

## Зачем Next.js, а не «чистый» React

| Задача | React (Vite) | Next.js |
|--------|--------------|---------|
| Маршруты | React Router отдельно | Файловая система в `app/` |
| SEO / первый экран | CSR — контент после JS | SSR/SSG — HTML с сервера |
| API | Отдельный backend | Route Handlers в том же проекте |
| Картинки / шрифты | Вручную | `next/image`, `next/font` |
| Деплой | Статика или свой Node | Vercel, Node, Docker |

## Режимы рендеринга

| Режим | Когда HTML готов | Типичный кейс |
|-------|------------------|---------------|
| **CSR** | В браузере после загрузки JS | Сильно интерактивные SPA |
| **SSR** | На каждый запрос на сервере | Персональные страницы, актуальные данные |
| **SSG** | При `next build` | Блоги, лендинги, документация |
| **ISR** | При сборке + фоновая ревалидация | Каталоги, новости с редкими обновлениями |

В App Router выбор часто делается через кэш `fetch`, `revalidate` и динамические функции (`cookies`, `headers`), а не отдельными файлами `getServerSideProps` / `getStaticProps` (это Pages Router).

## App Router vs Pages Router

| | App Router (`app/`) | Pages Router (`pages/`) |
|--|---------------------|-------------------------|
| Статус | Рекомендуется для новых проектов | Поддерживается, legacy-стиль |
| Компоненты | Server Components по умолчанию | Клиентские React-компоненты |
| Layouts | Вложенные `layout.js` | `_app.js`, `_document.js` |
| Data | `async` на сервере, `fetch` | `getServerSideProps` и т.п. |

В этом разделе — **только App Router**.

## Минимальная идея

Папка = маршрут. Файл `page.js` = UI страницы:

```
app/
├── layout.js      → общий каркас (html, body, nav)
├── page.js        → /
└── about/
    └── page.js    → /about
```

```js
// app/page.js
export default function Home() {
  return <h1>Привет, Next.js!</h1>
}
```

## Экосистема

| Область | Примеры |
|---------|---------|
| Хостинг | Vercel, Node + Nginx, Docker |
| Backend рядом | Laravel API, Route Handlers, внешний REST |
| Стили | Tailwind, CSS Modules |
| Auth | NextAuth / Auth.js, middleware |
| ORM / БД | Prisma, Drizzle (часто с Route Handlers / Server Actions) |

## Путь обучения

| Ресурс | Ссылка |
|--------|--------|
| Docs | [nextjs.org/docs](https://nextjs.org/docs) |
| Learn (интерактивно) | [nextjs.org/learn](https://nextjs.org/learn) |
| React (база) | [Раздел React](../react/README.md) |

Далее: [Установка](installation.md).
