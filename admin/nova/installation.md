# Установка Nova

> Официальная документация: [Installation | Nova v5](https://nova.laravel.com/docs/v5/installation)

## Официальная установка

Nova — платный продукт. Лицензия приобретается на [nova.laravel.com](https://nova.laravel.com).

**Видео:** [Установка Nova (YouTube)](https://www.youtube.com/watch?v=52jZ4Foh1EY&list=PL-pc6EZ5yQB1qOf1Wl_xwa6G5wUFKuabZ)

После покупки лицензии:

```bash
composer require laravel/nova
php artisan nova:install
php artisan migrate
php artisan nova:user
```

## Бесплатная установка через Laravel Satis

Альтернативный способ — репозиторий [laravelsatis.com](https://laravelsatis.com/).

**Видео:** [Бесплатная установка Nova (YouTube)](https://www.youtube.com/watch?v=EHUWwgDKkMw)

### Настройка composer.json

Добавьте репозиторий и зависимость:

```json
{
    "require": {
        "php": "^8.3",
        "guzzlehttp/guzzle": "^7.2",
        "laravel/framework": "^10.10",
        "laravel/sanctum": "^3.3",
        "laravel/tinker": "^2.8",
        "laravel/nova": "5.4.2"
    },
    "repositories": [
        {
            "type": "composer",
            "url": "https://laravelsatis.com"
        }
    ]
}
```

### Установка

```bash
composer update --prefer-dist
php artisan nova:install
php artisan migrate
```

Панель: [http://localhost:8000/nova](http://localhost:8000/nova)

## Пример зависимостей проекта (Laravel 8)

Для проектов на более старой версии Laravel:

```json
{
    "require": {
        "php": "^8.1",
        "ext-json": "*",
        "barryvdh/laravel-dompdf": "^1.0",
        "barryvdh/laravel-ide-helper": "^2.9",
        "coderello/laravel-nova-lang": "^1.8",
        "doctrine/dbal": "^2.10",
        "fideloper/proxy": "^4.2",
        "fruitcake/laravel-cors": "^2.0",
        "gobrightspot/nova-detached-actions": "^1.1",
        "guzzlehttp/guzzle": "^7.0.1",
        "laravel/framework": "^8.0",
        "laravel/horizon": "^5.7",
        "laravel/nova": "*",
        "laravel/tinker": "^2.0",
        "laravel/ui": "^3.0"
    }
}
```
