# Laravel Nova

> Официальная документация: [nova.laravel.com/docs](https://nova.laravel.com/docs)

Nova — официальная админ-панель от Laravel на базе Vue.js. Предоставляет CRUD для Eloquent-моделей, фильтры, метрики, дашборды, кастомные поля и инструменты.

## Разделы

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | Официальная и бесплатная установка через Composer |
| [Документация и ресурсы](documentation.md) | Ссылки на документацию, видео и пакеты |
| [Поля](fields.md) | Редактирование полей, кастомные поля, Trix |
| [Кастомные компоненты](custom-components.md) | Cards, ServiceProvider, сборка assets, маршруты |
| [Действия](actions.md) | Создание действий в Nova |
| [Поиск](search.md) | Поиск по ресурсам и связям |
| [Кастомизация](customization.md) | NovaServiceProvider, middleware, свои JS/CSS |
| [Решение проблем](troubleshooting.md) | Роуты, деплой, webpack, загрузка изображений |

## Быстрый старт

```bash
composer update --prefer-dist
php artisan nova:install
php artisan migrate
php artisan nova:user
```

Панель: [http://localhost:8000/nova](http://localhost:8000/nova)

## Создание Resource

```bash
php artisan nova:resource Post
```
