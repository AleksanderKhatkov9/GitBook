# Moonshine

> Официальная документация: [moonshine-laravel.com/ru/docs/4.x](https://moonshine-laravel.com/ru/docs/4.x/index)

Moonshine — open-source админ-панель для Laravel (MIT). Подходит для админок, MVP, backoffice и CMS. Использует Blade, TailwindCSS и Alpine.js.

## Разделы

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | Требования, `moonshine:install`, структура проекта |
| [Документация и ресурсы](documentation.md) | Официальная документация 4.x, видео, плагины |
| [Кастомные компоненты](components.md) | `moonshine:component`, Blade/Vue, подключение к ресурсу |
| [Кастомные страницы](custom-pages.md) | `moonshine:page`, регистрация в меню |
| [Авторизация и доступ](authorization.md) | Middleware, ограничение по группам, `canSee()` |

## Быстрый старт

```bash
composer require moonshine/moonshine
php artisan moonshine:install -Q
php artisan serve
```

Панель: [http://localhost:8000/admin](http://localhost:8000/admin)

## Создание Resource

```bash
php artisan moonshine:resource Post
```

## Основные возможности

- ModelResource и CrudResource для CRUD
- Формы, таблицы, фильтры, поиск, метрики
- Кастомные страницы и компоненты
- Policy-авторизация и `canSee()` для меню
- Импорт/экспорт, локализация, плагины
