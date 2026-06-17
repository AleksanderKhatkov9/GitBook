# Структура проекта

> Источник: [Directory Structure | Laravel 13.x](https://laravel.com/docs/13.x/structure)

```
my-app/
├── app/
│   ├── Http/
│   │   └── Controllers/    # Контроллеры
│   └── Models/             # Eloquent-модели
├── bootstrap/              # Загрузка фреймворка
├── config/                 # Конфигурация
├── database/
│   ├── migrations/         # Миграции
│   └── seeders/            # Сидеры
├── public/                 # Точка входа (index.php)
├── resources/
│   └── views/              # Blade-шаблоны
├── routes/
│   ├── web.php             # Web-маршруты
│   └── api.php             # API-маршруты
├── storage/                # Логи, кэш, загрузки
├── tests/                  # Тесты
└── .env                    # Переменные окружения
```

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `public/index.php` | Точка входа всех HTTP-запросов |
| `routes/web.php` | Маршруты сайта |
| `routes/api.php` | API-маршруты |
| `app/Models/User.php` | Модель пользователя |
| `database/migrations/` | Схема БД |
| `resources/views/` | HTML-шаблоны Blade |

## Artisan

```bash
php artisan list          # Все команды
php artisan route:list    # Список маршрутов
php artisan make:model Post -m   # Модель + миграция
```
