# Конфигурация

> Источник: [Configuration | Laravel 13.x](https://laravel.com/docs/13.x/configuration)

## Файлы конфигурации

Все настройки — в папке `config/`. Из коробки Laravel почти не требует настройки.

Основной файл: `config/app.php` (`url`, `locale`, `timezone`).

## Файл `.env`

Переменные окружения в корне проекта:

```ini
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
```

**Важно:** `.env` не коммитят в git — там пароли и ключи.

## База данных

### SQLite (по умолчанию)

Laravel 13 создаёт `database/database.sqlite` и запускает миграции автоматически.

### MySQL

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

```bash
php artisan migrate
```

## Миграции

```bash
# Применить миграции
php artisan migrate

# Откатить последнюю партию
php artisan migrate:rollback

# Создать миграцию
php artisan make:migration create_posts_table
```

## Размещение на сервере

Document root веб-сервера должен указывать на папку `public/`, не на корень проекта.
