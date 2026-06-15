# Laravel Nova

> Официальная документация: [nova.laravel.com/docs](https://nova.laravel.com/docs)

Nova — официальная админ-панель от Laravel на базе Vue.js.

## Установка

```bash
composer require laravel/nova
php artisan nova:install
php artisan migrate
php artisan nova:user
```

Панель: [http://localhost:8000/nova](http://localhost:8000/nova)

## Основные возможности

- CRUD для Eloquent-моделей (Resources)
- Фильтры, метрики, дашборды
- Авторизация и роли
- Кастомные поля и инструменты

## Создание Resource

```bash
php artisan nova:resource Post
```
