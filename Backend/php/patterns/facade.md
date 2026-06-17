# Facade (Фасад)

**Структурный паттерн** — даёт **простой интерфейс** к сложной подсистеме из множества классов.

> Refactoring.Guru: [Facade](https://refactoring.guru/ru/design-patterns/facade/php)

## Когда использовать

- Подсистема сложная, а клиенту нужны 2–3 типовых операции.
- Нужно уменьшить связанность: клиент не знает внутренних классов.
- Точка входа для legacy-модуля.

## Пример: оформление заказа

Без фасада клиент знает про склад, оплату и доставку:

```php
<?php

// Плохо: клиент оркестрирует всё сам
$inventory = new InventoryService();
$payment = new PaymentService();
$shipping = new ShippingService();

$inventory->reserve($order);
$payment->charge($order);
$shipping->dispatch($order);
```

С фасадом:

```php
<?php

class OrderFacade
{
    public function __construct(
        private InventoryService $inventory,
        private PaymentService $payment,
        private ShippingService $shipping,
    ) {}

    public function place(Order $order): void
    {
        $this->inventory->reserve($order);
        $this->payment->charge($order);
        $this->shipping->dispatch($order);
    }
}

// Клиент
$orders = new OrderFacade($inventory, $payment, $shipping);
$orders->place($order);
```

## Facade vs Adapter

| | Facade | Adapter |
|---|--------|---------|
| Цель | Упростить API подсистемы | Совместить несовместимые интерфейсы |
| Подсистема | Своя, знакомая | Чужая, легаси |
| Интерфейс | Новый, удобный | Приводит к ожидаемому контракту |

## В Laravel: Static Facades

Laravel Facades — **не классический GoF Facade**, а прокси к сервису в контейнере:

```php
<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

Cache::put('key', 'value', 3600);
DB::table('users')->where('active', true)->get();
Log::info('User logged in');
```

За `Cache::put()` стоят `CacheManager`, драйверы `file`/`redis`, сериализация и т.д. — клиент этого не видит.

Классический фасад в Laravel — **Service-класс**, объединяющий несколько зависимостей:

```php
<?php

namespace App\Services;

class BillingService
{
    public function __construct(
        private InvoiceGenerator $invoices,
        private PaymentGateway $gateway,
        private TaxCalculator $tax,
    ) {}

    public function billCustomer(Customer $customer, array $items): Invoice
    {
        $total = $this->tax->apply($items);
        $invoice = $this->invoices->create($customer, $total);
        $this->gateway->charge($customer, $invoice->amount);
        return $invoice;
    }
}
```

## Когда не злоупотреблять

Фасад не должен превращаться в God Object с десятками методов. Если методов слишком много — разбейте на несколько фасадов или сервисов по доменам.

← [Каталог паттернов](README.md)
