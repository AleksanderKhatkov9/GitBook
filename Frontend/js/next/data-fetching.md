# 6. Загрузка данных

> Источники: [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) · [Caching](https://nextjs.org/docs/app/deep-dive/caching) · [Server Actions](https://nextjs.org/docs/app/getting-started/updating-data)

В Server Components данные загружают прямо в компоненте через `async`/`await` — без `useEffect` для первого рендера.

## fetch на сервере

```js
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
```

## Кэш и ревалидация

Поведение `fetch` зависит от опций (актуальные детали — в docs вашей версии Next.js):

```js
// без кэша — всегда свежие данные
fetch(url, { cache: 'no-store' })

// ревалидация раз в час (ISR-подобно)
fetch(url, { next: { revalidate: 3600 } })

// теги для точечной инвалидации
fetch(url, { next: { tags: ['products'] } })
```

Инвалидация по тегу (например, после мутации):

```js
import { revalidateTag } from 'next/cache'

revalidateTag('products')
```

Также: `revalidatePath('/blog')`.

## Прямой доступ к данным

На сервере можно ходить в БД / ORM без HTTP:

```js
import { db } from '@/lib/db'

export default async function Page() {
  const posts = await db.post.findMany()
  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}
```

Секреты (`DATABASE_URL`) остаются на сервере.

## Запрос к Laravel API

```js
const base = process.env.NEXT_PUBLIC_API_URL // или серверный URL без PUBLIC_

async function getProducts() {
  const res = await fetch(`${base}/api/products`, {
    next: { revalidate: 60 },
  })
  return res.json()
}
```

Для cookie/сессий Laravel часто нужен `credentials` и CORS — настраивают на backend.

## Server Actions

Мутации без отдельного API-роута. Файл или inline с `'use server'`:

```js
// app/actions.js
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData) {
  const title = formData.get('title')
  await db.post.create({ data: { title } })
  revalidatePath('/posts')
}
```

```js
// app/posts/new/page.js
import { createPost } from '@/app/actions'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Создать</button>
    </form>
  )
}
```

## Клиентская загрузка

Если данные нужны после интерактивности / по событию — Client Component + `useEffect` / SWR / React Query. Для SEO-критичного контента предпочитайте сервер.

## Динамический рендер

Использование `cookies()`, `headers()`, `searchParams` и `cache: 'no-store'` обычно делает маршрут **динамическим** (рендер на запрос), а не статическим при сборке.

Далее: [Навигация](navigation.md).
