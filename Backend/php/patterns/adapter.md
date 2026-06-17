# Adapter (Адаптер)

**Структурный паттерн** — оборачивает объект с несовместимым интерфейсом, чтобы клиент работал через **ожидаемый** интерфейс.

> Refactoring.Guru: [Adapter](https://refactoring.guru/ru/design-patterns/adapter/php)

## Когда использовать

- Интеграция со сторонней библиотекой с «чужим» API.
- Легаси-код нельзя переписать, но нужно вписать в новую архитектуру.
- Несколько провайдеров с разными методами — единый контракт для приложения.

## Пример: платёжные шлюзы

Приложение ожидает единый интерфейс, а Stripe и PayPal имеют разные SDK:

```php
<?php

interface PaymentGateway
{
    public function charge(int $amountCents, string $currency): string;
}

// Сторонний класс — менять нельзя
class StripeSdk
{
    public function createPaymentIntent(int $amount, string $curr): array
    {
        return ['id' => 'pi_123', 'status' => 'succeeded'];
    }
}

class StripeAdapter implements PaymentGateway
{
    public function __construct(private StripeSdk $stripe) {}

    public function charge(int $amountCents, string $currency): string
    {
        $result = $this->stripe->createPaymentIntent($amountCents, $currency);
        return $result['id'];
    }
}

// Другой провайдер — другой API
class PayPalClient
{
    public function pay(float $sum, string $code): object
    {
        return (object) ['transaction_id' => 'PP-456'];
    }
}

class PayPalAdapter implements PaymentGateway
{
    public function __construct(private PayPalClient $paypal) {}

    public function charge(int $amountCents, string $currency): string
    {
        $result = $this->paypal->pay($amountCents / 100, $currency);
        return $result->transaction_id;
    }
}
```

Клиентский код не знает о деталях SDK:

```php
<?php

class CheckoutService
{
    public function __construct(private PaymentGateway $gateway) {}

    public function pay(int $amount): string
    {
        return $this->gateway->charge($amount, 'RUB');
    }
}
```

## Object Adapter vs Class Adapter

| | Object Adapter | Class Adapter |
|---|----------------|---------------|
| Механизм | Композиция (делегирование) | Множественное наследование |
| В PHP | **Рекомендуется** | Невозможно (нет множественного наследования классов) |

## В Laravel

Адаптеры часто регистрируют в сервис-провайдере:

```php
<?php

// config/services.php
'payment' => ['driver' => env('PAYMENT_DRIVER', 'stripe')],

// AppServiceProvider
$this->app->bind(PaymentGateway::class, function ($app) {
    return match (config('services.payment.driver')) {
        'stripe' => new StripeAdapter($app->make(StripeSdk::class)),
        'paypal' => new PayPalAdapter($app->make(PayPalClient::class)),
    };
});
```

Filesystem-диски (`local`, `s3`) — адаптеры над разными драйверами хранения с единым API `Storage::disk()`.

← [Каталог паттернов](README.md)
