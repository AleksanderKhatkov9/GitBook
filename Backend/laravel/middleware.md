# Middleware

> Источник: [Middleware | Laravel 13.x](https://laravel.com/docs/13.x/middleware)

Middleware — слой между запросом и контроллером: аутентификация, логи, CORS, локаль. Запрос проходит цепочку «до», контроллер отрабатывает, затем цепочка «после».

См. также: [Маршруты](routing.md) · [Безопасность](security.md) · [REST API](api.md).

## Создание

```bash
php artisan make:middleware EnsureUserIsAdmin
```

Файл: `app/Http/Middleware/EnsureUserIsAdmin.php`

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->is_admin) {
            abort(403);
        }

        return $next($request);
    }
}
```

`$next($request)` передаёт запрос дальше. Код **после** `$next` выполняется на обратном пути (удобно для заголовков ответа).

## Регистрация (Laravel 11+)

Алиасы и глобальные слои — в `bootstrap/app.php`:

```php
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Foundation\Configuration\Middleware;

->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias([
        'admin' => EnsureUserIsAdmin::class,
    ]);

    $middleware->web(append: [
        // \App\Http\Middleware\SetLocale::class,
    ]);
})
```

| Способ | Когда |
|--------|--------|
| `alias` | Имя в маршруте: `->middleware('admin')` |
| `web(append:)` | На все web-маршруты |
| `api(append:)` | На все API-маршруты |
| `append` / `prepend` | Глобально на каждый запрос |

Из коробки в группе `web`: сессии, cookies, CSRF. В `api` — throttling (после `install:api`).

## На маршруте и контроллере

```php
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'admin']);

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingsController::class, 'edit']);
});
```

В контроллере — интерфейс `HasMiddleware` или атрибут `#[Middleware]`. Примеры: [Контроллеры](controllers.md).

## Параметры

```php
public function handle(Request $request, Closure $next, string $role): Response
{
    if ($request->user()?->role !== $role) {
        abort(403);
    }

    return $next($request);
}
```

```php
Route::get('/editor', ...)->middleware('role:editor');
```

## Частые алиасы

| Алиас | Назначение |
|-------|------------|
| `auth` | Только вошедший пользователь |
| `guest` | Только гость (логин, регистрация) |
| `verified` | Подтверждённый email |
| `throttle:60,1` | Лимит запросов |

Исключения CSRF: [Безопасность](security.md).
