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

### HTTP и UI

| Страница | Описание |
|----------|----------|
| [Маршруты](routing.md) | `routes/web.php`, группы, middleware |
| [Контроллеры](controllers.md) | HTTP-контроллеры |
| [Представления](views.md) | Blade-шаблоны |
| [Frontend](frontend.md) | Vue, React, Inertia |

### Database

| Страница | Описание |
|----------|----------|
| [Database](database.md) | Подключения, Query Builder, транзакции, MongoDB |
| [Миграции](migrations.md) | Схема БД, добавление колонок |
| [Eloquent ORM](eloquent.md) | Модели, CRUD, relations, soft deletes |
| [Кэш](cache.md) | Драйверы, Cache API |

### Security · AI · Testing

| Страница | Описание |
|----------|----------|
| [Security](security.md) | CSRF, XSS, auth, policies, валидация |
| [AI](ai.md) | Laravel Boost, MCP, AI-агенты |
| [Testing](testing.md) | Pest / PHPUnit, HTTP-тесты, БД |

## Быстрый старт

```bash
laravel new my-app
cd my-app
composer run dev
```

Приложение: [http://localhost:8000](http://localhost:8000)

## Карта глав (запрошенные темы)

1. **[Структура](structure.md)** — Directory Structure  
2. **[Security](security.md)** — CSRF, аутентификация, авторизация  
3. **[Database](database.md)** — SQL, Query Builder, MongoDB  
4. **[Eloquent ORM](eloquent.md)** — модели и отношения  
5. **[AI](ai.md)** — Boost и AI-assisted development  
6. **[Testing](testing.md)** — тесты из коробки  
