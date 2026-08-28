# Безопасность

> Источники: [CSRF](https://laravel.com/docs/13.x/csrf) · [Authentication](https://laravel.com/docs/13.x/authentication) · [Authorization](https://laravel.com/docs/13.x/authorization) · [Validation](https://laravel.com/docs/13.x/validation)

Laravel из коробки защищает от типичных веб-атак: CSRF, XSS, SQL-инъекций. Ниже — практика для повседневной разработки.

## CSRF

Cross-Site Request Forgery — атака, когда чужой сайт отправляет запрос от имени авторизованного пользователя.

Middleware `PreventRequestForgery` входит в группу `web` и проверяет:

1. заголовок `Sec-Fetch-Site` (same-origin);
2. если не прошёл — CSRF-токен сессии.

В каждой форме `POST` / `PUT` / `PATCH` / `DELETE`:

```html
<form method="POST" action="/profile">
    @csrf
    <input type="email" name="email">
    <button type="submit">Сохранить</button>
</form>
```

Для AJAX — meta-тег и заголовок:

{% raw %}
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```
{% endraw %}

```js
axios.defaults.headers.common['X-CSRF-TOKEN'] =
    document.querySelector('meta[name="csrf-token"]').content;
```

Исключения (webhooks Stripe и т.п.) — в `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->preventRequestForgery(except: [
        'stripe/*',
    ]);
})
```

При тестах CSRF отключается автоматически.

## XSS

Blade по умолчанию экранирует вывод:

{% raw %}
```html
{{ $user->name }}   {{-- безопасно --}}
{!! $html !!}       {{-- сырой HTML — только доверенный контент --}}
```
{% endraw %}

Не выводите пользовательский ввод через `{!! !!}` без санитизации.

## SQL-инъекции

Eloquent и Query Builder используют prepared statements:

```php
// Безопасно
User::where('email', $email)->first();
DB::select('select * from users where email = ?', [$email]);

// Опасно — не склеивайте SQL вручную
DB::select("select * from users where email = '$email'");
```

## Аутентификация

Стартовые киты (`laravel new` → Breeze / Jetstream) дают login/register из коробки.

Проверка в контроллере / маршруте:

```php
use Illuminate\Support\Facades\Auth;

if (Auth::check()) {
    $user = Auth::user();
}

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
```

### Sanctum (API / SPA)

```bash
php artisan install:api
# или
composer require laravel/sanctum
```

Токены для мобильных/API, cookie-сессии для SPA. Подробнее: [Sanctum](https://laravel.com/docs/13.x/sanctum).

### Socialite (OAuth)

Вход через Google, GitHub и др.:

```bash
composer require laravel/socialite
```

Документация: [Socialite](https://laravel.com/docs/13.x/socialite).

## Авторизация (Policies / Gates)

```bash
php artisan make:policy PostPolicy --model=Post
```

`app/Policies/PostPolicy.php`:

```php
public function update(User $user, Post $post): bool
{
    return $user->id === $post->user_id;
}
```

В контроллере:

```php
$this->authorize('update', $post);

// или
if ($request->user()->cannot('update', $post)) {
    abort(403);
}
```

В Blade:

{% raw %}
```html
@can('update', $post)
    <a href="{{ route('posts.edit', $post) }}">Редактировать</a>
@endcan
```
{% endraw %}

## Валидация

Проверяйте все входящие данные — в контроллере или через Form Request. Подробно: [Валидация](validation.md).

```php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
]);
```

## Массовое присвоение

В моделях явно указывайте разрешённые поля:

```php
protected $fillable = ['title', 'body'];

// или
protected $guarded = ['id', 'is_admin'];
```

Не оставляйте `$guarded = []` без необходимости — иначе через `create()` можно подставить `is_admin` и подобные поля.

## Хеширование паролей

```php
use Illuminate\Support\Facades\Hash;

$user->password = Hash::make($request->password);

if (Hash::check($plain, $user->password)) {
    // ok
}
```

Никогда не храните пароли в открытом виде.

## `.env` и секреты

- `APP_KEY` — обязателен (шифрование cookies/сессий)
- `APP_DEBUG=false` на проде
- не коммитьте `.env`
- не логируйте пароли и токены

```bash
php artisan key:generate
```

## Чеклист

| Тема | Что сделать |
|------|-------------|
| CSRF | `@csrf` во всех формах |
| XSS | экранированный вывод Blade, не сырой HTML для user input |
| SQL | Eloquent / bindings, не конкатенация |
| Auth | middleware `auth` на закрытых маршрутах |
| Policies | проверка прав на ресурсы |
| Validation | [Валидация](validation.md): Form Request или `validate()` |
| Mass assignment | `$fillable` / `$guarded` |
| Secrets | `.env`, `APP_DEBUG=false` на проде |

См. также: [Маршруты](routing.md) · [Контроллеры](controllers.md) · [Валидация](validation.md) · [Eloquent ORM](eloquent.md)
