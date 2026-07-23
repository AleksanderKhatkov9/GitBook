# 3. App Router — маршрутизация

> Источники: [Routing Fundamentals](https://nextjs.org/docs/app/getting-started/project-structure) · [Defining Routes](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)

В Next.js маршрут определяется **папками** внутри `app/`. Специальные файлы задают UI и поведение.

## Специальные файлы

| Файл | Роль |
|------|------|
| `page.js` | UI страницы (делает маршрут публичным) |
| `layout.js` | Общий каркас для сегмента и детей |
| `loading.js` | UI загрузки (Suspense) |
| `error.js` | Граница ошибок сегмента |
| `not-found.js` | 404 |
| `route.js` | HTTP API (Route Handler) |
| `template.js` | Как layout, но с новым mount при навигации |
| `default.js` | Fallback для parallel routes |

Без `page.js` (или `route.js`) папка — только группировка / layout, URL не создаётся.

## Статические маршруты

```
app/
├── page.js              → /
├── about/
│   └── page.js          → /about
└── blog/
    └── page.js          → /blog
```

```js
// app/about/page.js
export default function AboutPage() {
  return <h1>О проекте</h1>
}
```

## Динамические сегменты

Папка в квадратных скобках — параметр:

```
app/blog/[slug]/page.js     → /blog/hello, /blog/next-js
app/shop/[category]/[item]/page.js
```

```js
// app/blog/[slug]/page.js
export default async function BlogPost({ params }) {
  const { slug } = await params
  return <h1>Пост: {slug}</h1>
}
```

В Next.js 15+ `params` и `searchParams` — **Promise**, их нужно `await`.

### Catch-all

| Папка | Пример URL | `params` |
|-------|------------|----------|
| `[...slug]` | `/docs/a/b` | `{ slug: ['a', 'b'] }` |
| `[[...slug]]` | `/docs` и `/docs/a` | optional catch-all |

## Группы маршрутов

Скобки `(name)` **не** попадают в URL — удобно для разных layouts:

```
app/
├── (marketing)/
│   ├── layout.js
│   ├── page.js          → /
│   └── about/page.js    → /about
└── (shop)/
    ├── layout.js
    └── cart/page.js     → /cart
```

## Private folders

Папка с `_` не участвует в маршрутизации:

```
app/_components/Button.js   ← не маршрут
app/_lib/utils.js
```

## Parallel и Intercepting routes

Продвинутые паттерны (модалки поверх страницы, несколько слотов):

- Parallel: `@folder` + `default.js`
- Intercepting: `(.)`, `(..)`, `(...)` в имени папки

См. [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) в официальной документации.

## Query-параметры

```js
// app/search/page.js
export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams
  return <p>Поиск: {q}</p>
}
```

URL: `/search?q=next`.

## Итог

| Нужно | Как |
|-------|-----|
| Страница `/about` | `app/about/page.js` |
| `/users/42` | `app/users/[id]/page.js` |
| Общий header | `layout.js` выше по дереву |
| API `/api/hello` | `app/api/hello/route.js` |

Далее: [Layouts и страницы](layouts.md).
