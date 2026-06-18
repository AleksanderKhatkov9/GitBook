# Установка

> Официальная документация: [Установка MoonShine 4.x](https://moonshine-laravel.com/ru/docs/4.x/installation) · [Быстрый старт](https://moonshine-laravel.com/ru/docs/4.x/quick-start)

## Требования

- PHP 8.2+
- Laravel 10.48+
- Composer 2+

## Установка через Composer

```bash
composer require moonshine/moonshine
```

### Starter kit (Laravel + MoonShine одной командой)

Если установлен `laravel/installer`:

```bash
laravel new example-app --using=moonshine/app
```

## Установка панели

```bash
php artisan moonshine:install
```

Быстрая установка без диалогов:

```bash
php artisan moonshine:install -Q
```

В процессе установки предлагается настроить:

1. **Аутентификация** — включить middleware проверки доступа к панели.
2. **Миграции** — для встроенных пользователей и ролей MoonShine.
3. **Уведомления** — система уведомлений, опционально с хранением в БД.
4. **Суперпользователь** — при выборе миграций создаётся администратор.

### Опции команды

```bash
php artisan moonshine:install \
  --without-user \
  --without-migrations \
  --without-auth \
  --without-notifications \
  --quick-mode
```

Полный список опций — в разделе [Команды](https://moonshine-laravel.com/ru/docs/4.x/advanced/commands).

## Что создаётся при установке

- `php artisan storage:link`
- `app/Providers/MoonShineServiceProvider.php` (регистрируется в `bootstrap/providers.php`)
- `app/MoonShine/` — ресурсы, страницы, layouts
- `config/moonshine.php`
- `lang/vendor/moonshine`
- `public/vendor/moonshine`
- `app/MoonShine/Pages/Dashboard.php`
- `app/MoonShine/Layouts/MoonShineLayout.php`

## Структура `app/MoonShine`

| Директория | Назначение |
|------------|------------|
| `Pages/` | Страницы админки — каждый роут рендерит страницу с набором компонентов |
| `Resources/` | Логическая группировка страниц; `ModelResource` включает CRUD из коробки |
| `Layouts/MoonShineLayout.php` | Основной шаблон: структура, меню, внешний вид |

Панель доступна по адресу: [http://localhost:8000/admin](http://localhost:8000/admin)

## Первый ресурс

```bash
php artisan moonshine:resource User
```

Раздел появится в меню и по адресу вида:

```
http://127.0.0.1:8000/admin/resource/user-resource/user-index-page
```

## Создание администратора

```bash
php artisan moonshine:user
```

С опциями:

```bash
php artisan moonshine:user --username=admin@example.com --name=Admin --password=secret
```

## Локализация

В `config/moonshine.php`:

```php
'locale' => 'ru',
'locales' => [
    'en',
    'ru',
],
```

Языковые файлы: `lang/vendor/moonshine`.

## Поддержка IDE

Для PhpStorm рекомендуются плагины [MoonShine](https://plugins.jetbrains.com/plugin/moonshine) и MetaStorm.

## Следующие шаги

- [Документация и ресурсы](documentation.md) — ссылки на официальную документацию 4.x
- [Конфигурация](https://moonshine-laravel.com/ru/docs/4.x/configuration) — настройка `config/moonshine.php` и `MoonShineServiceProvider`
- [Быстрый старт](https://moonshine-laravel.com/ru/docs/4.x/quick-start) — поля, фильтры, брендирование
