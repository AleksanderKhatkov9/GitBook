# Очереди

> Источник: [Queues | Laravel 13.x](https://laravel.com/docs/13.x/queues)

Очереди уносят тяжёлую работу из HTTP-запроса: письма, ресайз картинок, отчёты. Контроллер ставит Job и сразу отвечает пользователю. **PHP-FPM очередь не обрабатывает** — это отдельный CLI-процесс (`queue:work`), как cron.

Связанные разделы: [Artisan](artisan.md) · [PHP-FPM](../php/php-fpm.md) · [Linux](../../devops/linux/README.md).

## Драйвер

В `.env`:

```ini
QUEUE_CONNECTION=database
```

| Драйвер | Когда |
|---------|--------|
| `sync` | По умолчанию: Job выполняется сразу, без очереди (удобно локально) |
| `database` | Таблица `jobs`, без Redis |
| `redis` | Production с высокой нагрузкой |

Для `database`:

```bash
php artisan make:queue-table
php artisan make:queue-failed-table
php artisan migrate
```

## Job

```bash
php artisan make:job SendInvoiceEmail
```

```php
namespace App\Jobs;

use App\Models\Invoice;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendInvoiceEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(public Invoice $invoice) {}

    public function handle(): void
    {
        // отправить письмо
    }
}
```

Постановка в очередь:

```php
SendInvoiceEmail::dispatch($invoice);
SendInvoiceEmail::dispatch($invoice)->delay(now()->addMinutes(5));
```

## Воркер

```bash
php artisan queue:work
php artisan queue:work --tries=3 --timeout=60
php artisan queue:listen
php artisan queue:failed
php artisan queue:retry all
```

`queue:work` держит процесс в памяти (быстрее). После деплоя воркер нужно перезапустить, иначе останется старый код. На VPS обычно Supervisor или systemd, не FPM.

Пример unit:

```ini
[Service]
ExecStart=/usr/bin/php /var/www/my-app/current/artisan queue:work --sleep=1 --tries=3
Restart=always
User=www-data
```

Путь `php` и каталог проекта подставьте свои. Несколько очередей: `--queue=high,default`.

## Ошибки

Если Job падает — запись в `failed_jobs` (после `make:queue-failed-table`). Логи: `storage/logs/laravel.log`.

Не ставьте в очередь работу, которая должна завершиться **до** ответа пользователю (создание заказа в БД). В очередь — побочные эффекты.

Далее: [Artisan](artisan.md) (расписание `schedule:run`).
