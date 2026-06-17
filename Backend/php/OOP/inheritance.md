# Наследование, абстракция и интерфейсы

> Источники: [Наследование](https://www.php.net/manual/ru/language.oop5.inheritance.php), [Абстракция](https://www.php.net/manual/ru/language.oop5.abstract.php), [Интерфейсы](https://www.php.net/manual/ru/language.oop5.interfaces.php)

## Наследование — extends

Дочерний класс наследует `public` и `protected` методы, свойства и константы:

```php
<?php

class Foo
{
    public function printItem(string $string): void
    {
        echo 'Foo: ' . $string . PHP_EOL;
    }

    public function printPHP(): void
    {
        echo 'PHP просто супер.' . PHP_EOL;
    }
}

class Bar extends Foo
{
    public function printItem(string $string): void
    {
        echo 'Bar: ' . $string . PHP_EOL;
    }
}

$foo = new Foo();
$bar = new Bar();

$foo->printItem('baz'); // Foo: baz
$bar->printItem('baz'); // Bar: baz
$bar->printPHP();       // PHP просто супер. (унаследован)
```

### Правила

- PHP поддерживает **многоуровневое** наследование (`A` → `B` → `C`);
- **множественное** наследование классов **не поддерживается** (один `extends`);
- `private` методы родителя **не наследуются**;
- нельзя переопределить read-write свойство как `readonly` и наоборот.

---

## Абстрактные классы

Нельзя создать экземпляр — только наследовать:

```php
<?php

abstract class Animal
{
    abstract public function makeSound(): string;

    public function describe(): string
    {
        return 'Звук: ' . $this->makeSound();
    }
}

class Dog extends Animal
{
    public function makeSound(): string
    {
        return 'Гав!';
    }
}

// $a = new Animal(); // Fatal error
$dog = new Dog();
echo $dog->describe(); // Звук: Гав!
```

---

## Интерфейсы — interface

Контракт: класс **обязан** реализовать все методы интерфейса:

```php
<?php

interface PaymentGateway
{
    public function charge(float $amount): bool;
    public function refund(string $transactionId): bool;
}

class StripeGateway implements PaymentGateway
{
    public function charge(float $amount): bool
    {
        // логика Stripe
        return true;
    }

    public function refund(string $transactionId): bool
    {
        return true;
    }
}
```

| | Абстрактный класс | Интерфейс |
|--|-------------------|-----------|
| Экземпляр | Нельзя | Нельзя |
| Свойства | Могут быть | Только константы |
| Методы | Абстрактные + реализованные | Только сигнатуры |
| Наследование | Один класс | Много интерфейсов |

```php
class OrderService implements PaymentGateway, \JsonSerializable
{
    // ...
}
```

---

## Ключевое слово final

Запрещает переопределение метода или наследование класса:

```php
<?php

final class Config
{
    // Нельзя extends Config
}

class Base
{
    final public function id(): int
    {
        return 1;
    }
}
```

---

## Совместимость типов при переопределении (PHP 8.1+)

Тип возвращаемого значения дочернего метода должен быть совместим с родительским:

```php
<?php

class MyDateTime extends DateTime
{
    #[\ReturnTypeWillChange]
    public function modify(string $modifier)
    {
        return false;
    }
}
```

---

## В Laravel

```php
<?php

// Контроллер наследует базовый класс
class PostController extends Controller
{
    public function index(): View
    {
        return view('posts.index');
    }
}

// Интерфейс контракта
interface UserRepositoryInterface
{
    public function find(int $id): ?User;
}

class EloquentUserRepository implements UserRepositoryInterface
{
    public function find(int $id): ?User
    {
        return User::find($id);
    }
}
```

Следующая тема: [Трейты](traits.md).
