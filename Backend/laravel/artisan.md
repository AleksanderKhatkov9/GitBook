# Artisan и планировщик

> Источник: [Artisan](https://laravel.com/docs/13.x/artisan) · [Task Scheduling](https://laravel.com/docs/13.x/scheduling)

Artisan — CLI Laravel. Команды выполняются **интерпретатором CLI**, не PHP-FPM. На сервере версия `php` в cron/Supervisor должна совпадать с проектом. См. [PHP-FPM](../php/php-fpm.md) (разные `php.ini` у CLI и FPM).

## Частые команды

```bash
php artisan list
php artisan help migrate
php artisan tinker
```

| Команда | Назначение |
|---------|------------|
| `key:generate` | `APP_KEY` |
| `migrate` / `migrate:rollback` | Миграции |
| `db:seed` | Сидеры |
| `route:list` | Таблица маршрутов |
| `make:controller` / `make:model` / `make:job` | Заготовки |
| `optimize` / `optimize:clear` | Кэш конфига, маршрутов, views |
| `queue:work` | Воркер очереди |
| `schedule:run` | Тик планировщика (из cron каждую минуту) |
| `about` | Версии PHP, Laravel, драйверы |

Свои команды: `php artisan make:command SendReport`. Файл — `app/Console/Commands/`.

Closure-команды и расписание живут в `routes/console.php`.

## Планировщик

В `routes/console.php`:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('inspire')->hourly();
Schedule::call(function () {
    // короткая задача
})->dailyAt('03:00');
```

На сервере **одна** строка cron (не десять отдельных задач):

```
* * * * * cd /var/www/my-app/current && php artisan schedule:run >> /dev/null 2>&1
```

Путь — `current` при деплое через [Deployer](../../devops/deployer/README.md).

Проверка локально:

```bash
php artisan schedule:list
php artisan schedule:run
```

Длинные задачи лучше ставить в [очередь](queues.md) (`Schedule::job(...)`), а не выполнять внутри `schedule:run`.

## После деплоя

```bash
php artisan migrate --force
php artisan optimize
php artisan queue:restart
```

`queue:restart` сигналит воркерам перечитаться. FPM после смены только PHP-кода обычно достаточно `reload`; после смены расширений / `php.ini` — `restart`. См. [Nginx](../../devops/nginx/README.md).
