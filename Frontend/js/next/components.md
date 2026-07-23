# 5. Server и Client Components

> Источники: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) · [Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

В App Router компоненты по умолчанию — **Server Components** (RSC). Они выполняются на сервере: можно читать БД, использовать секреты, не отправлять лишний JS клиенту.

## Когда что использовать

| | Server Component | Client Component |
|--|------------------|------------------|
| Директива | нет (по умолчанию) | `'use client'` вверху файла |
| `async` / `await` | Да | Нет (данные через props / хуки) |
| `useState`, `useEffect` | Нет | Да |
| События (`onClick`) | Нет | Да |
| Доступ к БД / секретам | Да | Нет |
| Браузерные API | Нет | Да |

Правило: **сервер по умолчанию**, клиент — только там, где нужна интерактивность.

## Client Component

```js
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Нажато: {count}
    </button>
  )
}
```

`'use client'` ставится в **первой** строке файла (до импортов). Все импорты из этого модуля тоже становятся частью клиентского бандла.

## Паттерн: сервер + остров интерактивности

Серверная страница передаёт данные в клиентский виджет:

```js
// app/posts/page.js — Server Component
import LikeButton from './LikeButton'

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
          <LikeButton id={post.id} />
        </li>
      ))}
    </ul>
  )
}
```

```js
// app/posts/LikeButton.js
'use client'

export default function LikeButton({ id }) {
  return <button onClick={() => console.log('like', id)}>❤️</button>
}
```

## Ограничения границ

| Можно | Нельзя |
|-------|--------|
| Импортировать Client в Server и рендерить | Передавать функции/классы из Server → Client как props |
| Передавать serializable props (строки, числа, plain objects) | Импортировать Server Component **внутрь** Client-файла напрямую |

Чтобы вложить Server в Client, передайте серверный UI как `children`:

```js
// ClientWrapper.js
'use client'

export default function ClientWrapper({ children }) {
  return <div className="panel">{children}</div>
}
```

```js
// page.js (Server)
import ClientWrapper from './ClientWrapper'
import ServerList from './ServerList'

export default function Page() {
  return (
    <ClientWrapper>
      <ServerList />
    </ClientWrapper>
  )
}
```

## Где ставить `'use client'`

Чем выше в дереве директива — тем больше JS уедет клиенту. Лучше выносить маленькие интерактивные компоненты, а не помечать весь `layout` / `page`.

Далее: [Загрузка данных](data-fetching.md).
