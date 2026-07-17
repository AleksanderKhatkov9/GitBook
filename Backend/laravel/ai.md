# AI

> Источник: [AI Assisted Development | Laravel 13.x](https://laravel.com/docs/13.x/ai) · [Laravel Boost](https://github.com/laravel/boost)

Laravel удобен для AI-агентов (Cursor, Claude Code, Copilot): предсказуемая структура, конвенции и выразительный синтаксис. Агент знает, куда положить контроллер, миграцию или Form Request.

## Почему Laravel подходит для AI

- фиксированные пути (`app/Http/Controllers`, `database/migrations`, …);
- единые паттерны: Eloquent, middleware, Form Request, policies;
- обширная документация — агент генерирует идиоматичный код, а не «общий PHP».

## Laravel Boost

[Laravel Boost](https://github.com/laravel/boost) — MCP-сервер, который даёт агенту доступ к вашему приложению: схема БД, маршруты, логи, Artisan, документация.

### Установка

Laravel 10–13, PHP 8.1+:

```bash
composer require laravel/boost --dev
php artisan boost:install
```

Инсталлер определит IDE/агентов и создаст конфиги (`.mcp.json`, guidelines и т.д.). При желании их можно добавить в `.gitignore`.

### Инструменты MCP

| Область | Возможности |
|---------|-------------|
| Application | версии PHP/Laravel, пакеты, config, env |
| Database | схема, read-only запросы |
| Routes | список маршрутов, middleware, параметры |
| Artisan | список команд и аргументов |
| Logs | логи приложения и браузера |
| Tinker | выполнить PHP в контексте приложения |
| Docs | поиск по документации экосистемы (~17k фрагментов) с учётом версий пакетов |

### AI Guidelines

Boost подставляет guidelines под установленные пакеты (версионно):

- Laravel
- Livewire 2/3/4
- Inertia (React, Vue, Svelte)
- Tailwind CSS 3/4
- Filament 3/4
- PHPUnit, Pest, Pint
- и др.

### Agent Skills

[Agent Skills](https://agentskills.io/home) — модули знаний, которые агент подключает по необходимости (Livewire, Inertia, Pest…), чтобы не раздувать контекст.

### Документация

Поиск Boost индексирован и фильтруется по версиям из `composer.json` — меньше устаревших советов.

### IDE / агенты

Поддержка MCP: Cursor, Claude Code, Codex, Gemini CLI, GitHub Copilot, Junie. Настройка: [Boost — Set Up Your Agents](https://laravel.com/docs/13.x/boost#set-up-your-agents).

## Практика с AI в проекте

1. Установите Boost — агент видит реальную схему и маршруты.
2. Держите конвенции Laravel (не изобретайте свою структуру без нужды).
3. Просите генерировать через Artisan: `make:model`, `make:migration`, `make:controller`.
4. Проверяйте mass assignment, policies и валидацию — [Security](security.md).
5. Покрывайте ключевые сценарии тестами — [Testing](testing.md).

## Связанные разделы

| Тема | Страница |
|------|----------|
| Куда класть классы | [Структура проекта](structure.md) |
| Миграции | [Миграции](migrations.md) |
| Модели | [Eloquent ORM](eloquent.md) |
| Тесты | [Testing](testing.md) |
