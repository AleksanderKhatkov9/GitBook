# Кэш

> Источники: [Cache | Laravel 13.x](https://laravel.com/docs/13.x/cache), [Как очистить все кэши в Laravel](https://khodo.ru/kak-ochistit-vse-keshi-v-laravel/)

Кэш хранит результаты тяжёлых операций (запросы к БД, API, вычисления) во временном быстром хранилище. При повторном запросе данные берутся из кэша, а не пересчитываются заново.

Laravel даёт единый API для разных драйверов: Redis, Memcached, база данных, файлы и другие.

## Конфигурация

Настройки — в `config/cache.php`. Драйвер по умолчанию задаётся переменной окружения:

```ini
CACHE_STORE=database
```

Поддерживаемые драйверы:

| Драйвер | Назначение |
|---------|------------|
| `database` | Таблица в БД (по умолчанию в Laravel 13) |
| `file` | Файлы в `storage/framework/cache/data` |
| `redis` | Redis — быстрый in-memory store |
| `memcached` | Memcached |
| `array` | В памяти на время одного запроса (удобно для тестов) |
| `null` | Кэш отключён |

### Таблица для database-драйвера

```bash
php artisan make:cache-table
php artisan migrate
```

### Redis

Установите расширение PhpRedis или пакет `predis/predis`. Настройки Redis — в `config/database.php` (раздел `redis`).

## Использование

### Фасад Cache

```php
use Illuminate\Support\Facades\Cache;

// Получить значение
$value = Cache::get('key');
$value = Cache::get('key', 'default');

// Сохранить на 10 минут
Cache::put('key', 'value', now()->addMinutes(10));

// Получить или вычислить и сохранить
$users = Cache::remember('users', 3600, function () {
    return DB::table('users')->get();
});

// Навсегда (удалять вручную через forget)
Cache::forever('settings', $settings);

// Удалить ключ
Cache::forget('key');

// Очистить весь кэш текущего store
Cache::flush();
```

### Глобальный helper `cache()`

```php
$value = cache('key');

cache(['key' => 'value'], now()->addMinutes(10));

cache()->remember('posts', 600, function () {
    return Post::all();
});
```

### Несколько store

```php
Cache::store('redis')->put('bar', 'baz', 600);
$value = Cache::store('file')->get('foo');
```

### Теги (Redis, Memcached)

Позволяют сбросить группу связанных ключей:

```php
Cache::tags(['people', 'artists'])->put('John', $john, 3600);
Cache::tags(['people', 'artists'])->flush();
```

Теги **не поддерживаются** драйверами `file`, `database`, `dynamodb`, `storage`.

## Очистка кэша

В Laravel есть **два разных вида кэша**, и их часто путают:

1. **Кэш приложения** — данные, которые вы сохраняете через `Cache::put()`, `Cache::remember()` и т.д.
2. **Кэш фреймворка** — скомпилированные конфиги, маршруты, Blade-шаблоны, события (файлы в `storage/framework/`).

### Команды Artisan

| Команда | Что делает |
|---------|------------|
| `php artisan cache:clear` | Очищает **кэш приложения** (данные в Redis, БД и т.д.) |
| `php artisan config:clear` | Удаляет закэшированный конфиг |
| `php artisan config:cache` | **Создаёт** кэш конфигурации (для production) |
| `php artisan route:clear` | Удаляет кэш маршрутов |
| `php artisan route:cache` | **Создаёт** кэш маршрутов (для production) |
| `php artisan view:clear` | Удаляет скомпилированные Blade-шаблоны |
| `php artisan event:clear` | Удаляет кэш событий |

> **Важно:** `config:cache` и `route:cache` **создают** кэш, а не очищают его. Для очистки используйте `config:clear` и `route:clear`.

### Очистить всё сразу

```bash
php artisan optimize:clear
```

Эта команда последовательно выполняет: `config:clear`, `cache:clear`, `route:clear`, `view:clear`, `event:clear`, `clear-compiled`.

Пропустить отдельные шаги:

```bash
php artisan optimize:clear --except=cache,views
```

### Создать кэш для production

При деплое на сервер:

```bash
php artisan optimize
```

Кэширует конфигурацию, маршруты, события и представления одной командой.

### Очистка через маршрут (только для разработки)

На production **не рекомендуется** — любой сможет сбросить кэш. Для локальной отладки:

```php
// routes/web.php
Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return 'Кэш очищен.';
})->middleware('auth'); // обязательно защитите маршрут
```

## Типичные сценарии

### Кэширование запроса к БД

```php
public function index()
{
    $posts = Cache::remember('posts.latest', 300, function () {
        return Post::with('author')->latest()->paginate(10);
    });

    return view('posts.index', compact('posts'));
}
```

### Сброс кэша при изменении данных

```php
// В модели или observer
Post::saved(function () {
    Cache::forget('posts.latest');
});

// Или по тегам
Cache::tags(['posts'])->flush();
```

### Когда что запускать

| Ситуация | Команда |
|----------|---------|
| Изменили `.env` или `config/` | `php artisan config:clear` |
| Изменили маршруты | `php artisan route:clear` |
| Изменили Blade-шаблоны | `php artisan view:clear` |
| Данные в Redis/БД устарели | `php artisan cache:clear` |
| Не понятно, что именно закэшировано | `php artisan optimize:clear` |
| Деплой на production | `php artisan optimize` |
