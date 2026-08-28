# Laravel 13.x

> Официальная документация: [laravel.com/docs/13.x](https://laravel.com/docs/13.x) · исходники: [github.com/laravel/docs](https://github.com/laravel/docs)

Laravel — PHP-фреймворк с выразительным синтаксисом и архитектурой MVC. Даёт структуру приложения, DI, работу с БД, очереди, безопасность и тесты.

Обзор возможностей: [SkillFactory](https://blog.skillfactory.ru/glossary/laravel/) · [TutorialsPoint](https://www.tutorialspoint.com/laravel/laravel_overview.htm)

## Разделы

### Старт

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | PHP, Composer, создание проекта, Herd |
| [Конфигурация](configuration.md) | `.env`, база данных |
| [Структура проекта](structure.md) | Каталоги `app/`, `routes/`, `database/`, … |
| [Artisan](artisan.md) | CLI, планировщик, команды после деплоя |

### HTTP и UI

| Страница | Описание |
|----------|----------|
| [Маршруты](routing.md) | `routes/web.php`, группы, имена |
| [Middleware](middleware.md) | Слой до контроллера, `auth`, алиасы |
| [Контроллеры](controllers.md) | HTTP-контроллеры |
| [Валидация](validation.md) | `validate()`, Form Request |
| [Представления](views.md) | Blade-шаблоны |
| [Frontend](frontend.md) | Vue, React, Inertia |
| [REST API](api.md) | `routes/api.php`, JSON, Sanctum |

### База данных

| Страница | Описание |
|----------|----------|
| [База данных](database.md) | Подключения, Query Builder, транзакции, MongoDB |
| [Миграции](migrations.md) | Схема БД, добавление колонок |
| [Eloquent ORM](eloquent.md) | Модели, CRUD, relations, soft deletes |
| [Очереди](queues.md) | Jobs, `queue:work`, не FPM |
| [Кэш](cache.md) | Драйверы, Cache API |

### Безопасность · ИИ · тесты

| Страница | Описание |
|----------|----------|
| [Безопасность](security.md) | CSRF, XSS, auth, policies |
| [ИИ](ai.md) | Laravel Boost, MCP, AI-агенты |
| [Тестирование](testing.md) | Pest / PHPUnit, HTTP-тесты, БД |

## Быстрый старт

```bash
laravel new my-app
cd my-app
composer run dev
```

Приложение: [http://localhost:8000](http://localhost:8000)

Связанные разделы: [PHP](../php/README.md) · [PHP-FPM](../php/php-fpm.md) · [Nginx](../../devops/nginx/README.md) · [Deployer](../../devops/deployer/README.md).
