# 8. Route Handlers (API)

> Источники: [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) · [Request](https://nextjs.org/docs/app/api-reference/functions/next-request)

Route Handlers — HTTP-эндпоинты в App Router. Файл `route.js` (или `.ts`) рядом с сегментом пути.

## Базовый пример

```
app/api/hello/route.js  →  GET /api/hello
```

```js
export async function GET() {
  return Response.json({ message: 'Hello from Next.js' })
}
```

Поддерживаемые экспорты: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

## POST и тело запроса

```js
export async function POST(request) {
  const body = await request.json()
  // body.name, ...
  return Response.json({ ok: true, received: body }, { status: 201 })
}
```

## Динамический сегмент

```
app/api/posts/[id]/route.js  →  /api/posts/42
```

```js
export async function GET(request, { params }) {
  const { id } = await params
  return Response.json({ id })
}
```

## Query-параметры

```js
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  return Response.json({ q })
}
```

Или `NextRequest`:

```js
import { NextResponse } from 'next/server'

export async function GET(request) {
  const q = request.nextUrl.searchParams.get('q')
  return NextResponse.json({ q })
}
```

## Заголовки и cookies

```js
import { cookies, headers } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const token = cookieStore.get('token')
  const ua = headerStore.get('user-agent')
  return Response.json({ token: token?.value, ua })
}
```

## Когда Route Handler, когда Laravel

| Сценарий | Выбор |
|----------|--------|
| BFF, прокси, webhooks, простые JSON | Route Handler в Next |
| Бизнес-логика, Eloquent, очереди, админка | Laravel API |
| Один домен `/` + `/api` | Nginx: Next + Laravel — [гайд](../../../devops/laravel-next/README.md) |

Клиент к Laravel:

```js
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
```

## Ограничения

- В том же сегменте нельзя одновременно `page.js` и `route.js`.
- Для HTML-страниц — `page.js`; для API — `route.js`.

Далее: [Стили](styles.md).
