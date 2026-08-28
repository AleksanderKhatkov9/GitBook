# REST API

> Источник: [Routing](https://laravel.com/docs/13.x/routing) · [Sanctum](https://laravel.com/docs/13.x/sanctum)

Laravel отдаёт JSON для SPA, мобильного клиента и Next.js. Web-маршруты (`web.php`) используют сессию и CSRF; API — токен или cookie Sanctum, без CSRF-форм.

Связанные разделы: [Маршруты](routing.md) · [Контроллеры](controllers.md) · [Валидация](validation.md) · [Postman](../../rest/postman/README.md) · [Laravel + Next.js](../../devops/laravel-next/README.md).

## Подключение

```bash
php artisan install:api
```

Появится `routes/api.php`. Префикс URL по умолчанию — `/api`. В Nginx для fullstack на одном домене `/api` уходит в PHP-FPM, остальное — в Next.js.

```php
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::apiResource('posts', PostController::class);
```

```bash
php artisan make:controller Api/PostController --api
```

`--api` без `create` / `edit` (это HTML-формы).

## Ответ JSON

```php
public function show(Post $post)
{
    return response()->json($post);
}

public function store(StorePostRequest $request)
{
    $post = Post::create($request->validated());

    return response()->json($post, 201);
}
```

Ошибки валидации для API — **422** и объект `errors`. Несуществующая модель при route-binding — **404**.

## Аутентификация (Sanctum)

Типичные варианты:

| Клиент | Как |
|--------|-----|
| First-party SPA / Next на том же домене | Cookie-сессия Sanctum (`EnsureFrontendRequestsAreStateful`) |
| Мобильное приложение, чужой домен | Personal access token: заголовок `Authorization: Bearer …` |

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::apiResource('posts', PostController::class);
});
```

Выдача токена после логина:

```php
$token = $user->createToken('mobile')->plainTextToken;
```

Не кладите токен в git и в логи. CSRF для чистого Bearer API не нужен.

## Лимиты

Группа `api` включает throttle. Свой лимит:

```php
Route::middleware('throttle:60,1')->group(function () {
    // 60 запросов в минуту
});
```

## Проверка

```bash
php artisan route:list --path=api
```

В Postman: коллекция на `https://example.com/api/posts`, заголовок `Accept: application/json`. Основы методов: [REST](../../rest/README.md).
