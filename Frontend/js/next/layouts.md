# 4. Layouts и страницы

> Источники: [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) · [Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

Layouts оборачивают страницы и **сохраняют состояние** при навигации между дочерними маршрутами (навигация не размонтирует общий layout).

## Корневой и вложенные layouts

```
app/
├── layout.js           ← RootLayout (обязателен)
├── page.js             → /
└── dashboard/
    ├── layout.js       ← только для /dashboard/*
    ├── page.js         → /dashboard
    └── settings/
        └── page.js     → /dashboard/settings
```

```js
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <section>
      <aside>Меню дашборда</aside>
      <div>{children}</div>
    </section>
  )
}
```

Layouts **вкладываются**: Root → Dashboard → страница.

## page.js

Экспорт по умолчанию — React-компонент страницы. Может быть `async` (Server Component):

```js
export default async function DashboardPage() {
  const data = await getData()
  return <h1>{data.title}</h1>
}
```

## loading.js

Показывается, пока грузится сегмент (React Suspense):

```js
// app/dashboard/loading.js
export default function Loading() {
  return <p>Загрузка…</p>
}
```

## error.js

Клиентский компонент — граница ошибок:

```js
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Повторить</button>
    </div>
  )
}
```

`error.js` должен содержать `'use client'`.

## not-found.js

```js
// app/not-found.js
export default function NotFound() {
  return <h1>404 — страница не найдена</h1>
}
```

Вызов из серверного кода:

```js
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()
  return <h1>{product.name}</h1>
}
```

## template.js

Похож на layout, но при каждой навигации **создаётся заново** (удобно для анимаций входа):

```js
export default function Template({ children }) {
  return <div className="fade-in">{children}</div>
}
```

## Сравнение

| Файл | Сохраняется при навигации | Типичный use |
|------|---------------------------|--------------|
| `layout` | Да | Nav, sidebar, providers |
| `template` | Нет (новый mount) | Enter-анимации |
| `page` | Меняется | Контент URL |
| `loading` | — | Скелетон / спиннер |
| `error` | — | Ошибка сегмента |

Далее: [Server и Client Components](components.md).
