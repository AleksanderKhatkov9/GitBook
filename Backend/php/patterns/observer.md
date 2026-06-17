# Observer (Наблюдатель)

**Поведенческий паттерн** — подписка: при изменении одного объекта (**субъект**) автоматически уведомляются зависимые (**наблюдатели**).

> Refactoring.Guru: [Observer](https://refactoring.guru/ru/design-patterns/observer/php)

## Когда использовать

- Событие в одном месте должно вызвать реакцию в нескольких (без жёсткой связи).
- Количество подписчиков меняется в runtime.
- Нужна слабая связанность между модулями.

## Пример: заказ и уведомления

```php
<?php

interface OrderObserver
{
    public function updated(Order $order): void;
}

class Order
{
    /** @var OrderObserver[] */
    private array $observers = [];

    public function __construct(
        public string $status = 'pending',
    ) {}

    public function attach(OrderObserver $observer): void
    {
        $this->observers[] = $observer;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
        $this->notify();
    }

    private function notify(): void
    {
        foreach ($this->observers as $observer) {
            $observer->updated($this);
        }
    }
}

class EmailOnShipped implements OrderObserver
{
    public function updated(Order $order): void
    {
        if ($order->status === 'shipped') {
            // отправить email
        }
    }
}

class AnalyticsOnShipped implements OrderObserver
{
    public function updated(Order $order): void
    {
        if ($order->status === 'shipped') {
            // отправить событие в аналитику
        }
    }
}

$order = new Order();
$order->attach(new EmailOnShipped());
$order->attach(new AnalyticsOnShipped());
$order->setStatus('shipped');
```

## Push vs Pull

| | Push | Pull |
|---|------|------|
| Данные | Субъект передаёт всё в `update()` | Наблюдатель сам запрашивает нужное |
| В PHP | Чаще push (объект события) | Реже |

## В Laravel: Events & Listeners

```php
<?php

// app/Events/OrderShipped.php
class OrderShipped
{
    public function __construct(public Order $order) {}
}

// app/Listeners/SendShipmentNotification.php
class SendShipmentNotification
{
    public function handle(OrderShipped $event): void
    {
        Mail::to($event->order->user)->send(new ShipmentMail($event->order));
    }
}

// Вызов
event(new OrderShipped($order));
// или
OrderShipped::dispatch($order);
```

### Eloquent Model Observers

```php
<?php

// app/Observers/UserObserver.php
class UserObserver
{
    public function created(User $user): void
    {
        Log::info("User created: {$user->id}");
    }

    public function deleting(User $user): void
    {
        $user->posts()->delete();
    }
}

// AppServiceProvider::boot()
User::observe(UserObserver::class);
```

## Observer vs Mediator

| | Observer | Mediator |
|---|----------|----------|
| Связь | Субъект → много наблюдателей | Все общаются через посредника |
| Направление | Одностороннее уведомление | Централизованная координация |

← [Каталог паттернов](README.md)
