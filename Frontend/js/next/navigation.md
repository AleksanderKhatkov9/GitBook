# 7. Навигация

> Источники: [Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating) · [next/navigation](https://nextjs.org/docs/app/api-reference/functions/use-router)

## Link

Для переходов внутри приложения используйте `next/link` — prefetch и клиентская навигация без полной перезагрузки:

```js
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/">Главная</Link>
      <Link href="/about">О проекте</Link>
      <Link href="/blog/hello">Пост</Link>
    </nav>
  )
}
```

В современных версиях Next.js `Link` рендерит `<a>` сам — оборачивать `<a>` вручную не нужно.

### Динамический href

```js
<Link href={`/users/${user.id}`}>{user.name}</Link>
```

## useRouter (клиент)

Программная навигация — только в Client Component:

```js
'use client'

import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        // после логина
        router.push('/dashboard')
        // router.replace('/dashboard')
        // router.back()
        // router.refresh() — обновить RSC без смены URL
      }}
    >
      Войти
    </button>
  )
}
```

Импорт из `next/navigation` (App Router), не из `next/router` (Pages Router).

## redirect (сервер)

```js
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()
  if (!session) redirect('/login')
  return <h1>Кабинет</h1>
}
```

`redirect` выбрасывает специальный сигнал — код после него не выполняется.

## params и searchParams

```js
// app/users/[id]/page.js
export default async function UserPage({ params, searchParams }) {
  const { id } = await params
  const { tab } = await searchParams

  return (
    <div>
      <h1>User {id}</h1>
      <p>Вкладка: {tab ?? 'profile'}</p>
    </div>
  )
}
```

На клиенте:

```js
'use client'

import { useParams, useSearchParams, usePathname } from 'next/navigation'

export default function ClientBits() {
  const params = useParams()
  const search = useSearchParams()
  const pathname = usePathname()

  return (
    <p>
      {pathname} · id={params.id} · q={search.get('q')}
    </p>
  )
}
```

Обёртка `useSearchParams` часто требует Suspense boundary — см. docs.

## Активная ссылка

```js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink({ href, children }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link href={href} style={{ fontWeight: active ? 'bold' : 'normal' }}>
      {children}
    </Link>
  )
}
```

Далее: [Route Handlers](route-handlers.md).
