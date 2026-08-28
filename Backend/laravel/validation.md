# Валидация

> Источник: [Validation | Laravel 13.x](https://laravel.com/docs/13.x/validation)

Входящие данные нельзя доверять. Laravel проверяет их до записи в БД и возвращает ошибки в форму или JSON (422).

Связанные разделы: [Безопасность](security.md) · [Контроллеры](controllers.md) · [REST API](api.md).

## В контроллере

```php
use Illuminate\Http\Request;

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'body'  => 'nullable|string',
    ]);

    Post::create($validated);
}
```

Если проверка не прошла, web-запрос вернётся назад с ошибками в сессии; API — JSON 422.

Правила массивом читаются проще:

```php
'title' => ['required', 'string', 'max:255'],
```

## Form Request

Для повторяющихся или длинных правил — отдельный класс:

```bash
php artisan make:request StorePostRequest
```

`app/Http/Requests/StorePostRequest.php`:

```php
public function authorize(): bool
{
    return true;
}

public function rules(): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'body'  => ['required', 'string'],
    ];
}
```

```php
public function store(StorePostRequest $request)
{
    Post::create($request->validated());
}
```

`authorize(): false` даёт 403. Права на модель лучше сверять через policies — [Безопасность](security.md).

Генерация вместе с resource-контроллером:

```bash
php artisan make:controller PhotoController --model=Photo --resource --requests
```

## Ошибки в Blade

{% raw %}
```html
<input name="title" value="{{ old('title') }}">

@error('title')
    <p>{{ $message }}</p>
@enderror
```
{% endraw %}

`old()` подставляет значение после неудачной отправки. Для JSON-клиента смотрите поле `errors` в теле 422.

## Частые правила

| Правило | Смысл |
|---------|--------|
| `required` | Поле обязательно |
| `nullable` | Может быть пустым |
| `string` / `integer` / `boolean` | Тип |
| `email` | Email |
| `max:255` / `min:8` | Длина или значение |
| `unique:users,email` | Уникальность в таблице |
| `exists:posts,id` | Ссылка на существующую запись |
| `confirmed` | Есть поле `password_confirmation` |
| `file` / `image` / `mimes:pdf` | Загрузка |

Лимиты размера файла задаются и в PHP-FPM/`php.ini`, и в Nginx. См. [PHP-FPM](../php/php-fpm.md).

## Массовое присвоение

В модель передавайте только `$validated` / `$request->validated()`, не весь `$request->all()`. В модели — `$fillable` или `$guarded`. Подробнее: [Безопасность](security.md).
