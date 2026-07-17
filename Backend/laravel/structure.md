# Структура проекта

> Источник: [Directory Structure | Laravel 13.x](https://laravel.com/docs/13.x/structure) · [laravel/docs](https://github.com/laravel/docs)

Структура Laravel подходит и для маленьких, и для больших приложений. Классы можно размещать свободно — главное, чтобы Composer мог их автозагрузить (PSR-4).

## Корневая структура

```
my-app/
├── app/                    # Код приложения
│   ├── Http/
│   │   ├── Controllers/    # Контроллеры
│   │   ├── Middleware/     # Middleware
│   │   └── Requests/       # Form Request
│   ├── Models/             # Eloquent-модели
│   └── Providers/          # Service Providers
├── bootstrap/              # Загрузка фреймворка (app.php)
├── config/                 # Конфигурация
├── database/
│   ├── factories/          # Фабрики моделей
│   ├── migrations/         # Миграции
│   └── seeders/            # Сидеры
├── public/                 # Точка входа (index.php), ассеты
├── resources/
│   ├── css/
│   ├── js/
│   └── views/              # Blade-шаблоны
├── routes/
│   ├── web.php             # Web-маршруты
│   └── console.php         # Console-команды / schedule
├── storage/                # Логи, кэш, загрузки
├── tests/
│   ├── Feature/            # Feature-тесты
│   └── Unit/               # Unit-тесты
├── vendor/                 # Зависимости Composer
└── .env                    # Переменные окружения
```

## Корневые каталоги

### `app/`

Основной код приложения. Почти все классы лежат здесь. Namespace по умолчанию — `App\` (PSR-4).

### `bootstrap/`

Файл `app.php` загружает фреймворк. Папка `cache/` хранит кэш маршрутов и сервисов.

### `config/`

Все файлы конфигурации (`app.php`, `database.php`, `cache.php` и т.д.).

### `database/`

Миграции, фабрики моделей и сидеры. Сюда же можно положить SQLite-файл.

### `public/`

Точка входа `index.php` и публичные ассеты (CSS, JS, изображения). Document root веб-сервера должен указывать сюда.

### `resources/`

Blade-шаблоны (`views/`) и исходники фронтенда (CSS/JS до сборки Vite).

### `routes/`

| Файл | Назначение |
|------|------------|
| `web.php` | Web-маршруты: сессии, CSRF, cookies |
| `console.php` | Closure-команды Artisan и schedule |
| `api.php` | API-маршруты (после `php artisan install:api`) |
| `channels.php` | Broadcasting-каналы (после `install:broadcasting`) |

### `storage/`

| Путь | Назначение |
|------|------------|
| `storage/app/` | Файлы приложения |
| `storage/app/public/` | Публичные загрузки (аватары и т.п.) |
| `storage/framework/` | Кэш фреймворка, сессии, скомпилированные Blade |
| `storage/logs/` | Логи |

Симлинк для публичных файлов:

```bash
php artisan storage:link
```

Создаёт `public/storage` → `storage/app/public`.

### `tests/`

Автотесты: Pest или PHPUnit. Каталоги `Feature/` и `Unit/`. Запуск: `php artisan test`.

### `vendor/`

Зависимости Composer. Не редактировать вручную.

## Каталог `app/`

По умолчанию есть `Http/`, `Models/`, `Providers/`. Остальные папки появляются при генерации через Artisan (`php artisan list make`).

| Каталог | Когда появляется | Назначение |
|---------|------------------|------------|
| `Broadcasting/` | `make:channel` | Каналы broadcasting |
| `Console/` | `make:command` | Кастомные Artisan-команды |
| `Events/` | `make:event` | События |
| `Exceptions/` | `make:exception` | Кастомные исключения |
| `Http/` | из коробки | Контроллеры, middleware, Form Request |
| `Jobs/` | `make:job` | Очереди / jobs |
| `Listeners/` | `make:listener` | Обработчики событий |
| `Mail/` | `make:mail` | Mailables |
| `Models/` | из коробки | Eloquent-модели |
| `Notifications/` | `make:notification` | Уведомления |
| `Policies/` | `make:policy` | Политики авторизации |
| `Providers/` | из коробки | Service Providers |
| `Rules/` | `make:rule` | Правила валидации |

`Http` и `Console` — точки входа в приложение (HTTP и CLI). Бизнес-логика обычно живёт в моделях, сервисах, jobs.

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `public/index.php` | Точка входа всех HTTP-запросов |
| `bootstrap/app.php` | Конфигурация приложения, middleware, exceptions |
| `routes/web.php` | Маршруты сайта |
| `app/Models/User.php` | Модель пользователя |
| `app/Providers/AppServiceProvider.php` | Bootstrap сервисов |
| `database/migrations/` | Схема БД |
| `resources/views/` | HTML-шаблоны Blade |
| `.env` | Секреты и окружение (не коммитить) |

## Artisan

```bash
php artisan list              # Все команды
php artisan list make         # Генераторы классов
php artisan route:list        # Список маршрутов
php artisan make:model Post -m   # Модель + миграция
php artisan make:controller PostController
php artisan model:show Post   # Обзор модели
```

См. также: [Миграции](migrations.md) · [Контроллеры](controllers.md) · [Eloquent ORM](eloquent.md) · [Testing](testing.md)
