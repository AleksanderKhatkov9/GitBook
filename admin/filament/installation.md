# Установка

> Официальная документация: [Installation | Filament 5.x](https://filamentphp.com/docs/5.x/introduction/installation)

## Требования

- PHP 8.2+
- Laravel 11+
- Composer 2+

## Установка через Composer

```bash
composer require filament/filament:"^5.0"
```

## Установка панели

```bash
php artisan filament:install --panels
```

Команда создаёт провайдер панели, маршруты, layout и базовую конфигурацию.

## Создание пользователя

```bash
php artisan make:filament-user
```

## Создание Resource

```bash
php artisan make:filament-resource Post
```

При создании можно указать, нужны ли страницы View, Edit, Create и soft deletes.

## Полезные команды

| Команда | Описание |
|---------|----------|
| `php artisan make:filament-resource` | CRUD-ресурс для Eloquent-модели |
| `php artisan make:filament-page` | Кастомная страница панели |
| `php artisan make:filament-widget` | Виджет дашборда |
| `php artisan make:filament-relation-manager` | Relation manager для связей |
| `php artisan filament:upgrade` | Обновление после смены версии |

## Структура проекта

После установки основные файлы находятся в:

```
app/
├── Filament/
│   ├── Resources/
│   │   └── PostResource.php
│   └── Pages/
└── Providers/
    └── Filament/
        └── AdminPanelProvider.php
```

Панель по умолчанию доступна по адресу `/admin`.
