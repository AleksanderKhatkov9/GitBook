# Laravel — вопросы на собеседовании

Краткие ответы-ориентиры. Детали: [Laravel](../Backend/laravel/README.md), [Eloquent](../Backend/laravel/eloquent.md), [Маршруты](../Backend/laravel/routing.md), [Безопасность](../Backend/laravel/security.md).

Связанный план: [PHP/Laravel подготовка](php-laravel.md).

---

## Архитектура и жизненный цикл

### Что такое Laravel?

PHP-фреймворк с MVC, Service Container (DI), Eloquent, очередями, Blade и встроенной защитой (CSRF, XSS, SQL bindings). На собеседовании ждут не «это фреймворк», а зачем вы его выбираете: структура, тестируемость, экосистема.

### Как обрабатывается HTTP-запрос?

```text
public/index.php
    ↓
bootstrap (kernel / Application)
    ↓
Service Providers
    ↓
Middleware (глобальные → группа web/api → route)
    ↓
Router → Controller / Closure
    ↓
Response обратно через middleware
```

Точка входа — `public/index.php`. Document root веб-сервера должен указывать на `public/`.

### Чем `web.php` отличается от `api.php`?

| Файл | Назначение |
|------|------------|
| `routes/web.php` | Сессии, cookies, CSRF |
| `routes/api.php` | Stateless API, JSON, обычно Sanctum/token |

API-файл появляется после `php artisan install:api`.

### Что такое Service Provider?

Класс, который регистрирует сервисы в контейнере (`register`) и запускает логику после регистрации всех провайдеров (`boot`). Пример: привязать интерфейс к реализации, зарегистрировать event listener, загрузить конфиг пакета.

### Что такое Service Container?

IoC-контейнер Laravel: создаёт объекты и разрешает зависимости конструктора.

```php
class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $repository
    ) {
    }
}
```

Контроллер получает `OrderService` без `new`. Это Dependency Injection на практике.

### Binding: `bind` vs `singleton` vs `scoped`

| Метод | Поведение |
|-------|-----------|
| `bind` | Новый экземпляр на каждый resolve |
| `singleton` | Один экземпляр на весь HTTP-запрос / процесс |
| `scoped` | Один экземпляр в рамках текущего контекста (например, одного HTTP-запроса) |

Интерфейс привязывают к реализации в провайдере:

```php
$this->app->bind(OrderRepositoryInterface::class, EloquentOrderRepository::class);
```

### Facade vs DI

Facade — статичный прокси к объекту из контейнера (`Cache::get()`, `DB::table()`). Удобно в контроллерах и closures. В сервисах и тестах чаще предпочтительнее явный конструктор: проще подменить зависимость mock'ом.

### Helpers `app()`, `resolve()`, `app()->make()`

Все обращаются к контейнеру. На собеседовании достаточно сказать: «это resolve из IoC, не глобальный `new`».

---

## Маршруты, middleware, контроллеры

### Как объявить маршрут?

```php
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
```

Методы: `get`, `post`, `put`, `patch`, `delete`. Несколько сразу: `Route::match()`, любой: `Route::any()`.

### Что такое route model binding?

Laravel сам находит модель по параметру `{post}` (обычно по `id`). Если записи нет — 404.

```php
public function show(Post $post)
{
    return $post;
}
```

Кастомный ключ: `{post:slug}`.

### Зачем именованные маршруты?

`route('posts.show', $post)` не ломается, если URL изменился. Имена важнее хардкода путей.

### Что такое middleware?

Слой до и после контроллера: auth, CSRF, throttle, CORS, кастомные проверки.

```php
public function handle(Request $request, Closure $next): Response
{
    if (! $request->user()?->is_admin) {
        abort(403);
    }

    return $next($request);
}
```

Код **до** `$next` — на входе, **после** — на выходе (заголовки ответа, логирование).

### Глобальный vs route middleware

Глобальный — на каждый запрос. Route / group — только на выбранные маршруты. Алиасы в Laravel 11+ задают в `bootstrap/app.php`.

### Thin controller — что это значит?

Контроллер принимает запрос, валидирует (или делегирует Form Request), вызывает сервис, возвращает ответ. Бизнес-логика, SQL и письма не должны жить в контроллере.

### Form Request

Класс валидации и (часто) авторизации:

```bash
php artisan make:request StorePostRequest
```

Методы: `authorize()`, `rules()`. Если `authorize()` вернул `false` — 403. Невалидные данные: редирект с ошибками или JSON 422.

---

## Eloquent и база данных

### Eloquent vs Query Builder

| | Eloquent | Query Builder |
|--|----------|----------------|
| Модель | Да, Active Record | Нет, работа с таблицей |
| Связи, events, casts | Да | Нет |
| Когда | Доменная сущность | Сложный отчёт, raw SQL, производительность |

Оба используют bindings — защита от SQL-инъекций при корректном API.

### `$fillable` vs `$guarded`

Mass assignment protection. `create()` / `update([...])` записывают только разрешённые поля.

```php
protected $fillable = ['title', 'body'];
// или
protected $guarded = ['id', 'is_admin'];
```

Пустой `$guarded = []` открывает все поля — опасно, если в запрос попадут лишние ключи.

### Основные отношения

```text
hasOne / belongsTo
hasMany / belongsTo
belongsToMany          (pivot)
hasManyThrough
morphMany / morphTo    (полиморф)
```

Нужно уметь написать `hasMany` + `belongsTo` и объяснить pivot-таблицу.

### Проблема N+1

```php
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name; // +1 запрос на каждый пост
}
```

Решение — eager loading:

```php
$posts = Post::with('user')->get();
```

`withCount`, `load()`, `lazy()` — смежные темы. На собеседовании часто просят найти N+1 в коде.

### Lazy vs eager vs lazy eager

| Способ | Когда |
|--------|--------|
| Lazy | Связь грузится при первом обращении |
| Eager (`with`) | Сразу, одним (или несколькими) запросами |
| Lazy eager (`load`) | Догрузить связи у уже полученной коллекции |

### Soft deletes

Трейт `SoftDeletes`: `delete()` ставит `deleted_at`, запись скрыта из обычных запросов. `restore()`, `forceDelete()`, `withTrashed()`, `onlyTrashed()`.

### Accessors, mutators, casts

Casts: `'published_at' => 'datetime'`, `'meta' => 'array'`. Accessor/mutator (Attribute API) — преобразование при чтении/записи без сырой логики в контроллере.

### `find` vs `findOrFail` vs `firstOrFail`

`find` вернёт `null`. `*OrFail` бросит `ModelNotFoundException` → обычно 404. Для API это предсказуемее, чем ручные проверки.

### Транзакции в Laravel

```php
DB::transaction(function () {
    $account->decrement('balance', 100);
    $target->increment('balance', 100);
});
```

Либо `DB::beginTransaction()` / `commit()` / `rollBack()`. Нужно связать с ACID из [MySQL](mysql.md).

### Миграции vs изменение схемы руками

Миграции — версионирование схемы, одинаковое состояние у команды и на серверах. `up` / `down` (или `Schema::table`). Сидеры — тестовые/начальные данные, не схема.

### Factories

Генерация моделей для тестов и сидеров. На собеседовании: «не вставляю фикстуры SQL вручную, использую factory + состояния».

---

## Валидация и безопасность

### Как валидировать запрос?

`$request->validate([...])`, Form Request или `Validator::make()`. Правила: `required`, `email`, `unique:users`, `exists:posts,id`, `confirmed`.

Web: редирект назад + `$errors`. API: `422 Unprocessable Entity`.

### CSRF в Laravel

Группа `web` проверяет токен. В форме `@csrf`. Для AJAX — заголовок `X-CSRF-TOKEN`. API на токенах CSRF обычно не использует. Webhooks исключают из проверки.

### XSS

`{{ $value }}` экранирует. `{!! $html !!}` — сырой HTML, только доверенный контент.

### SQL-инъекции

Eloquent и Query Builder биндят параметры. Опасно: конкатенация в `whereRaw`, `DB::raw`, `orderBy` с пользовательским вводом.

### Auth: authentication vs authorization

Authentication — кто пользователь (`Auth::user()`, guard, session/token). Authorization — что ему можно (Gates, Policies).

### Gates vs Policies

| | Gate | Policy |
|--|------|--------|
| Где | `AppServiceProvider` / `Gate::define` | Класс на модель |
| Когда | Разовое правило (`view-horizon`) | CRUD модели (`PostPolicy@update`) |

В Blade: `@can('update', $post)`. В контроллере: `$this->authorize('update', $post)`.

### Sanctum vs Passport

Sanctum — SPA (cookie) и простые API-токены. Passport — полноценный OAuth2. Для большинства продуктов достаточно Sanctum.

---

## Сервисы: очереди, кэш, события

### Зачем очереди?

Тяжёлую работу (email, ресайз, отчёты) вынести из HTTP-запроса. Пользователь получает ответ сразу, Job обрабатывает worker.

```text
Controller → Job::dispatch()
                 ↓
            queue:work (CLI, не FPM)
```

PHP-FPM очередь **не** обрабатывает.

### `ShouldQueue` и `sync`

Job с `ShouldQueue` уходит в очередь. Драйвер `sync` выполняет сразу — удобно локально, в production обычно `database` или `redis`.

### Failed jobs

Таблица `failed_jobs`, `retry_after`, `$tries`, `$backoff`. Нужно уметь объяснить: повтор, идемпотентность, что делать с письмом, которое уже ушло.

### Events / Listeners vs Observers

| Механизм | Назначение |
|----------|------------|
| Event + Listener | Доменное событие: `UserRegistered` → письмо, аналитика |
| Model Observer | Хуки Eloquent: `creating`, `updated`, `deleted` |
| `$dispatchesEvents` в модели | Модель сама бросает доменные события |

Observer удобен для побочных действий модели, но легко превратить в скрытую бизнес-логику. Для явных сценариев лучше Event.

### Кэш

`Cache::remember('posts', 3600, fn () => Post::latest()->get())`. Драйверы: `array` (тесты), `file`, `redis`. Важно: инвалидация при изменении данных, ключи с параметрами пользователя.

### `.env` vs `config/`

`.env` — секреты и окружение, не коммитится. Код читает `config('app.name')`, не `env()` напрямую (кроме файлов config): после `config:cache` `env()` вне конфигов не работает.

---

## Frontend, API, консоль

### Blade: директивы, которые ждут

`@if`, `@foreach`, `@include`, `@extends` / `@section` / `@yield`, `@csrf`, `@auth`, `@can`, `@error`, компоненты `<x-alert />`.

### API Resource

Преобразование модели в стабильный JSON-контракт, без отдачи `$model->toArray()` со всеми полями.

```php
return new PostResource($post);
return PostResource::collection($posts);
```

### Artisan

Кастомная команда: `php artisan make:command SendReport`. Планировщик — `schedule` в `routes/console.php` + cron на `schedule:run`. После деплоя часто: `migrate --force`, `config:cache`, `route:cache`, `view:cache`, `queue:restart`.

---

## Тестирование

### Feature vs Unit

Feature — HTTP, БД, интеграция (основной тип в Laravel). Unit — изолированный класс, приложение может не бутиться.

### Что уметь показать

```php
$this->post('/posts', ['title' => 'Hello'])
    ->assertRedirect();

$this->assertDatabaseHas('posts', ['title' => 'Hello']);
```

`RefreshDatabase` / `DatabaseTransactions`, `actingAs($user)`, factory. CSRF в тестах отключается автоматически.

---

## Типичные вопросы «почему»

### Почему сервис зависит от интерфейса, а не от Eloquent-репозитория?

Контракт, а не конкретная реализация. Легче подменить (MySQL → API, mock в тесте). Это DIP + Service Container. Не нужно плодить Repository на каждую модель «для галочки».

### Где живёт бизнес-логика?

Не в контроллере и не в огромной модели. Сервис / Action / Domain-класс. Модель — состояние и инварианты сущности. Job — асинхронная граница.

### Как отладить медленный Eloquent-запрос?

1. Воспроизвести.
2. `DB::listen` / Laravel Debugbar / `toSql()`.
3. `EXPLAIN` в MySQL.
4. Проверить N+1, `SELECT *`, отсутствие индекса, лишний `ORDER BY`.
5. Измерить после правки.

Связка с [MySQL: EXPLAIN и индексы](mysql.md).

### Как рассказывать про очередь на собеседовании

Структура из [подготовки](php-laravel.md): проблема → решение → почему → альтернативы → минусы → результат.

> Письмо не должно блокировать HTTP. Вынес в Job. Минус — failed jobs и идемпотентность. Результат — быстрый ответ пользователю.

---

## Типичные практические задания

1. Модель `Post` + `User`, связь, миграция, CRUD.
2. Найти и исправить N+1.
3. Form Request + Policy на обновление чужого поста.
4. Job на отправку письма после регистрации.
5. Endpoint API + Resource + валидация 422.
6. Транзакция: перевод денег между счетами.
7. Middleware: только админ.
8. Тест: гость не может создать пост, автор может.

---

# Чеклист перед собеседованием

- [ ] Жизненный цикл запроса, `web` vs `api`
- [ ] Container: bind / singleton, интерфейс → реализация
- [ ] Middleware, Form Request, thin controller
- [ ] `$fillable`, relations, N+1, `with()`, soft deletes
- [ ] Миграции, транзакции `DB::transaction`
- [ ] CSRF, XSS, `authorize` / Policy
- [ ] Queues: `ShouldQueue`, worker ≠ FPM, failed jobs
- [ ] Events / Observers — когда что
- [ ] `config()` vs `env()`, кэш конфига
- [ ] Feature-тест HTTP + БД
