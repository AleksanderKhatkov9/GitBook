# Decorator (Декоратор)

**Структурный паттерн** — динамически добавляет объекту новое поведение, **оборачивая** его, без изменения исходного класса и без глубокого наследования.

> Refactoring.Guru: [Decorator](https://refactoring.guru/ru/design-patterns/decorator/php)

## Когда использовать

- Поведение включается/выключается в runtime (кэш, логирование, сжатие).
- Наследование даёт комбинаторный взрыв (`CachedLoggedUserService`, `LoggedCachedUserService`…).
- Нужно соблюдать [Open/Closed](../SOLID/README.md) — расширять, не меняя базовый класс.

## Пример: сервис уведомлений

```php
<?php

interface Notifier
{
    public function send(string $to, string $message): void;
}

class EmailNotifier implements Notifier
{
    public function send(string $to, string $message): void
    {
        echo "Email to {$to}: {$message}\n";
    }
}

abstract class NotifierDecorator implements Notifier
{
    public function __construct(protected Notifier $wrapped) {}
}

class LoggingDecorator extends NotifierDecorator
{
    public function send(string $to, string $message): void
    {
        error_log("Sending to {$to}");
        $this->wrapped->send($to, $message);
    }
}

class RetryDecorator extends NotifierDecorator
{
    public function __construct(
        Notifier $wrapped,
        private int $attempts = 3,
    ) {
        parent::__construct($wrapped);
    }

    public function send(string $to, string $message): void
    {
        for ($i = 1; $i <= $this->attempts; $i++) {
            try {
                $this->wrapped->send($to, $message);
                return;
            } catch (\Throwable $e) {
                if ($i === $this->attempts) {
                    throw $e;
                }
            }
        }
    }
}

// Сборка «луком»
$notifier = new RetryDecorator(
    new LoggingDecorator(
        new EmailNotifier()
    )
);

$notifier->send('user@example.com', 'Заказ оформлен');
```

## Decorator vs наследование

| | Наследование | Decorator |
|---|--------------|-----------|
| Комбинации | N подклассов на каждую опцию | Обёртки вкладываются произвольно |
| В runtime | Фиксировано при компиляции/создании | Можно менять цепочку динамически |
| Базовый класс | Меняется иерархия | Базовый класс не трогаем |

## В Laravel: Middleware

Каждый middleware — декоратор вокруг следующего обработчика:

```php
<?php

// app/Http/Middleware/LogRequest.php
class LogRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        Log::info('Request', ['url' => $request->url()]);
        $response = $next($request);  // делегирование «внутрь»
        Log::info('Response', ['status' => $response->status()]);
        return $response;
    }
}
```

Цепочка: `LogRequest → Auth → Throttle → Controller`.

PSR-15 `MiddlewareInterface` — тот же принцип для любого PSR-совместимого фреймворка.

← [Каталог паттернов](README.md)
