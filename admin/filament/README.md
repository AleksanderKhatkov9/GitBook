# Filament

> Официальная документация: [filamentphp.com/docs/5.x](https://filamentphp.com/docs/5.x/introduction/overview)

**Filament** — Server-Driven UI (SDUI) фреймворк для Laravel. Интерфейс описывается в PHP через конфигурационные объекты, без написания кастомного JavaScript. Построен на Livewire, Alpine.js и Tailwind CSS.

Filament используют для админ-панелей, дашбордов, CRM, пользовательских порталов и полноценных приложений с несколькими панелями. Компоненты можно встраивать и в обычные Blade-представления.

## Разделы

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | Требования, `filament:install`, создание пользователя |
| [Документация и ресурсы](documentation.md) | Официальная документация 5.x, пакеты, плагины |
| [Listing records](listing-records.md) | Вкладки, авторизация, кастомизация страницы списка |

## Быстрый старт

```bash
composer require filament/filament:"^5.0"
php artisan filament:install --panels
php artisan make:filament-user
```

Панель: [http://localhost:8000/admin](http://localhost:8000/admin)

## Создание Resource

```bash
php artisan make:filament-resource Post
```

## Основные пакеты

| Пакет | Назначение |
|-------|------------|
| `filament/filament` | Панели (админки) |
| `filament/tables` | Интерактивные таблицы с фильтрами и сортировкой |
| `filament/forms` | Поля форм с валидацией |
| `filament/infolists` | Списки «ключ — значение» для просмотра данных |
| `filament/actions` | Кнопки, модальные окна и логика действий |
| `filament/notifications` | Уведомления в UI |
| `filament/widgets` | Виджеты дашборда (графики, метрики) |
| `filament/schemas` | Базовые UI-компоненты и схемы страниц |

## Сравнение с другими панелями

| | Filament | Nova | Moonshine |
|---|----------|------|-----------|
| Лицензия | MIT (Open Source) | Платная | MIT |
| Стек | Livewire + Alpine + Tailwind | Vue + Laravel | Blade + Alpine + Tailwind |
| Кастомизация | PHP-схемы, Livewire | Vue-компоненты | Blade/Vue-компоненты |
