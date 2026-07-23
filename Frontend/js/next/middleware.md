# 12. Middleware

> Источники: [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) · [NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request)

**Middleware** выполняется **до** завершения запроса — на Edge. Удобно для редиректов, A/B, гео, проверки cookie / JWT на уровне маршрута.

## Файл

Корень проекта (рядом с `app/` или внутри `src/`):

```
middleware.js
```

```js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*'],
}
```

`matcher` ограничивает, на каких путях middleware запускается (важно для производительности).

## Типичные действия

| Метод | Назначение |
|-------|------------|
| `NextResponse.next()` | Продолжить |
| `NextResponse.redirect(url)` | Редирект |
| `NextResponse.rewrite(url)` | Отдать другой путь без смены URL |
| `response.cookies.set(...)` | Установить cookie |

```js
export function middleware(request) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/old') {
    url.pathname = '/new'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
```

## Ограничения

- Не тяжёлая бизнес-логика и не прямой доступ к Node-only API / БД.
- Держите код быстрым: каждый matched-запрос проходит middleware.
- Полноценный auth часто: middleware (грубый gate) + проверка на сервере в layout/page.

## Auth-паттерн (эскиз)

1. После логина ставите httpOnly cookie.
2. Middleware пускает только с cookie на `/dashboard/*`.
3. Server Component дополнительно валидирует сессию / Laravel Sanctum.

## Деплой

| Цель | Куда |
|------|------|
| Vercel | Нативно, middleware на Edge |
| VPS + PM2 + Nginx | [Laravel + Next.js](../../../devops/laravel-next/README.md) |
| Docker | `output: 'standalone'` в `next.config` |

## Чеклист после изучения раздела

1. Создать приложение через `create-next-app`.
2. Добавить маршруты и вложенный layout.
3. Разделить Server / Client Components.
4. Загрузить данные на сервере и сделать форму через Server Action или Route Handler.
5. Настроить `metadata` и `next/image`.

К оглавлению: [Next.js](README.md).
