# Маршруты

> Источник: [Routing | Laravel 13.x](https://laravel.com/docs/13.x/routing)

Маршруты описывают URL и HTTP-метод. Web-маршруты — в `routes/web.php` (сессии, CSRF, cookies). API — в `routes/api.php` после `php artisan install:api`. См. [REST API](api.md).

```bash
php artisan route:list
php artisan route:list --path=posts
```

## Базовые маршруты

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return 'Привет, Laravel!';
});
```

Методы: `get`, `post`, `put`, `patch`, `delete`, `options`. Несколько методов сразу:

```php
Route::match(['get', 'post'], '/contact', [ContactController::class, 'submit']);
Route::any('/hook', [HookController::class, 'handle']);
```

## Параметры и привязка модели

```php
Route::get('/user/{id}', function (string $id) {
    return 'User ' . $id;
});

Route::get('/posts/{post}', function (App\Models\Post $post) {
    return $post->title;
});
```

Во втором примере Laravel сам найдёт `Post` по `{post}` (обычно `id`). Если записи нет — 404.

Ограничение параметра:

```php
Route::get('/user/{id}', ...)->whereNumber('id');
Route::get('/slug/{slug}', ...)->where('slug', '[a-z0-9-]+');
```

Необязательный параметр: `{name?}`.

## Контроллер

```bash
php artisan make:controller PostController
```

```php
use App\Http\Controllers\PostController;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::resource('posts', PostController::class);
```

Подробнее: [Контроллеры](controllers.md).

## Именованные маршруты

```php
Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
```

{% raw %}
```html
<a href="{{ route('profile') }}">Профиль</a>
```
{% endraw %}

```php
return redirect()->route('profile');
```

Имя должно быть уникальным. Для resource Laravel задаёт `posts.index`, `posts.show` и т.д.

## Группы

```php
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');
    // URL: /admin/users  имя: admin.users
});
```

Группа `web` подключается автоматически для `routes/web.php`. Своё middleware: [Middleware](middleware.md).

## Редирект и fallback

```php
Route::redirect('/here', '/there', 301);
Route::view('/welcome', 'welcome');

Route::fallback(function () {
    return view('errors.404');
});
```

## Проверка CSRF

Для `POST` / `PUT` / `PATCH` / `DELETE` в web-форме нужен `@csrf`. API (токен) CSRF не использует. См. [Безопасность](security.md).

Далее: [Middleware](middleware.md) · [Контроллеры](controllers.md) · [REST API](api.md).
