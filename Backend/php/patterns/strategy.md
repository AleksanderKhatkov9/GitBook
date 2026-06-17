# Strategy (Стратегия)

**Поведенческий паттерн** — семейство взаимозаменяемых алгоритмов выносится в отдельные классы; алгоритм можно **менять в runtime** без изменения клиентского кода.

> Refactoring.Guru: [Strategy](https://refactoring.guru/ru/design-patterns/strategy/php)

## Когда использовать

- Много веток `if` / `switch` по типу поведения.
- Алгоритмы должны подменяться (конфиг, A/B-тест, роль пользователя).
- Нужно изолировать алгоритм для unit-тестов.

## Проблема

```php
<?php

// Плохо: при каждом новом способе доставки — правка метода
class ShippingCalculator
{
    public function calculate(string $method, float $weight): float
    {
        if ($method === 'courier') {
            return 500 + $weight * 10;
        }
        if ($method === 'pickup') {
            return 0;
        }
        if ($method === 'post') {
            return 300 + $weight * 5;
        }
        throw new InvalidArgumentException($method);
    }
}
```

## Решение

```php
<?php

interface ShippingStrategy
{
    public function calculate(float $weight): float;
}

class CourierShipping implements ShippingStrategy
{
    public function calculate(float $weight): float
    {
        return 500 + $weight * 10;
    }
}

class PickupShipping implements ShippingStrategy
{
    public function calculate(float $weight): float
    {
        return 0;
    }
}

class PostShipping implements ShippingStrategy
{
    public function calculate(float $weight): float
    {
        return 300 + $weight * 5;
    }
}

class ShippingCalculator
{
    public function __construct(private ShippingStrategy $strategy) {}

    public function setStrategy(ShippingStrategy $strategy): void
    {
        $this->strategy = $strategy;
    }

    public function calculate(float $weight): float
    {
        return $this->strategy->calculate($weight);
    }
}

$calc = new ShippingCalculator(new CourierShipping());
echo $calc->calculate(2.5); // 525

$calc->setStrategy(new PostShipping());
echo $calc->calculate(2.5); // 312.5
```

## Фабрика стратегий

```php
<?php

class ShippingStrategyFactory
{
    public static function make(string $method): ShippingStrategy
    {
        return match ($method) {
            'courier' => new CourierShipping(),
            'pickup'  => new PickupShipping(),
            'post'    => new PostShipping(),
            default   => throw new InvalidArgumentException($method),
        };
    }
}
```

## В Laravel

### Контекст через DI

```php
<?php

// AppServiceProvider
$this->app->bind(ShippingStrategy::class, function () {
    return ShippingStrategyFactory::make(config('shipping.default'));
});

class OrderController extends Controller
{
    public function store(Request $request, ShippingStrategy $shipping)
    {
        $cost = $shipping->calculate($request->input('weight'));
        // ...
    }
}
```

### Правила валидации как Strategy

```php
<?php

// Разные Rule-классы — стратегии валидации
'email' => ['required', new ValidCorporateEmail()],
'phone' => ['required', new RussianPhoneNumber()],
```

## Strategy vs State

| | Strategy | State |
|---|----------|-------|
| Кто меняет | Клиент явно подставляет стратегию | Объект сам переключает состояние |
| Смысл | Разные алгоритмы одной задачи | Поведение зависит от фазы объекта |
| Пример | Способы оплаты | Черновик → опубликован → архив |

← [Каталог паттернов](README.md)
