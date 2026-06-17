# Паттерны проектирования

**Паттерн проектирования** — проверенное решение типовой задачи в объектно-ориентированном коде. Паттерны не копируют «как есть»: они задают идею, которую адаптируют под конкретный проект.

> Каталог с PHP-примерами: [Refactoring.Guru — Паттерны на PHP](https://refactoring.guru/ru/design-patterns/php)

Связанные разделы: [ООП](../OOP/README.md), [SOLID](../SOLID/README.md), [Laravel](../../laravel/README.md).

## Зачем знать паттерны

| Польза | Пример |
|--------|--------|
| Общий язык в команде | «Здесь уместен Strategy, а не switch» |
| Меньше связанности | Зависимость от интерфейса, а не от класса |
| Проще тестировать | Подмена реализации в unit-тестах |
| Узнаваемость в фреймворках | Laravel Events ≈ Observer, Jobs ≈ Command |

## Классификация (GoF)

| Тип | Назначение | Паттерны в этом разделе |
|-----|------------|-------------------------|
| **Порождающие** | Создание объектов | [Factory](factory.md), [Builder](builder.md), [Singleton](singleton.md) |
| **Структурные** | Композиция классов | [Adapter](adapter.md), [Decorator](decorator.md), [Facade](facade.md) |
| **Поведенческие** | Распределение обязанностей | [Observer](observer.md), [Strategy](strategy.md), [Command](command.md) |

## Самые используемые в PHP

| Паттерн | Когда применять | Где встречается |
|---------|-----------------|-----------------|
| [Factory Method](factory.md) | Тип объекта выбирается в runtime | `Notification::factory()`, Eloquent factories |
| [Builder](builder.md) | Сложный объект с множеством опций | Query Builder, HTTP-клиенты |
| [Singleton](singleton.md) | Один экземпляр на приложение | Контейнер Laravel (осторожно с антипаттерном) |
| [Adapter](adapter.md) | Несовместимые интерфейсы | Обёртки над сторонними API |
| [Decorator](decorator.md) | Добавить поведение без наследования | Middleware, PSR-15 |
| [Facade](facade.md) | Простой API к сложной подсистеме | `Cache::`, `DB::`, `Log::` в Laravel |
| [Observer](observer.md) | Реакция на события | Events, Listeners, Model observers |
| [Strategy](strategy.md) | Взаимозаменяемые алгоритмы | Оплата, доставка, скидки |
| [Command](command.md) | Запрос как объект | Artisan-команды, Jobs, undo |

## Паттерн vs антипаттерн

Не каждый «паттерн из учебника» уместен в PHP-проекте:

- **Singleton** — часто мешает тестам и DI; в Laravel предпочтительнее сервис-контейнер.
- **God Object** — один класс «знает всё»; нарушает [SRP](../SOLID/README.md).
- **Active Record** (Eloquent) — удобен, но смешивает персистентность и домен; для сложной логики смотрят Repository + DTO.

## Минимальный пример: Strategy

```php
<?php

interface PaymentStrategy
{
    public function pay(int $amount): void;
}

class CardPayment implements PaymentStrategy
{
    public function pay(int $amount): void
    {
        // оплата картой
    }
}

class InvoicePayment implements PaymentStrategy
{
    public function pay(int $amount): void
    {
        // оплата по счёту
    }
}

class Checkout
{
    public function __construct(private PaymentStrategy $payment) {}

    public function process(int $amount): void
    {
        $this->payment->pay($amount);
    }
}

$checkout = new Checkout(new CardPayment());
$checkout->process(1500);
```

Подробнее: [Strategy](strategy.md).

## Полный каталог (Refactoring.Guru)

| Порождающие | Структурные | Поведенческие |
|-------------|-------------|---------------|
| [Abstract Factory](https://refactoring.guru/ru/design-patterns/abstract-factory/php) | [Adapter](adapter.md) | [Chain of Responsibility](https://refactoring.guru/ru/design-patterns/chain-of-responsibility/php) |
| [Builder](builder.md) | [Bridge](https://refactoring.guru/ru/design-patterns/bridge/php) | [Command](command.md) |
| [Factory Method](factory.md) | [Composite](https://refactoring.guru/ru/design-patterns/composite/php) | [Iterator](https://refactoring.guru/ru/design-patterns/iterator/php) |
| [Prototype](https://refactoring.guru/ru/design-patterns/prototype/php) | [Decorator](decorator.md) | [Mediator](https://refactoring.guru/ru/design-patterns/mediator/php) |
| [Singleton](singleton.md) | [Facade](facade.md) | [Memento](https://refactoring.guru/ru/design-patterns/memento/php) |
| | [Flyweight](https://refactoring.guru/ru/design-patterns/flyweight/php) | [Observer](observer.md) |
| | [Proxy](https://refactoring.guru/ru/design-patterns/proxy/php) | [State](https://refactoring.guru/ru/design-patterns/state/php) |
| | | [Strategy](strategy.md) |
| | | [Template Method](https://refactoring.guru/ru/design-patterns/template-method/php) |
| | | [Visitor](https://refactoring.guru/ru/design-patterns/visitor/php) |
