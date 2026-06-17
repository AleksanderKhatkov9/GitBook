# Свойства

> Источник: [Свойства | PHP Manual](https://www.php.net/manual/ru/language.oop5.properties.php)

**Свойства** — переменные-члены класса. Доступ к нестатическим свойствам: `$this->property`. К статическим: `self::$property`.

## Объявление

```php
<?php

class Product
{
    public string $name = 'Товар';
    public float $price = 0.0;
    protected int $stock = 100;
    private string $sku = 'SKU-001';
}
```

Правила:

- нужен модификатор видимости (`public`, `protected`, `private`);
- значение по умолчанию — только **константное выражение** (не вызов функции);
- без модификатора PHP считает свойство `public` (устаревший стиль — `var`).

```php
// Неправильно — rand() вычисляется в runtime
public int $x = rand();

// Правильно — инициализация в конструкторе
public int $x;

public function __construct()
{
    $this->x = rand();
}
```

---

## Типизированные свойства (PHP 7.4+)

```php
<?php

class User
{
    public int $id;
    public ?string $name;

    public function __construct(int $id, ?string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }
}

$user = new User(1234, null);
var_dump($user->id);   // int(1234)
var_dump($user->name); // NULL
```

Обращение к типизированному свойству **до инициализации** выбрасывает `Error`:

```php
$shape = new Shape();
$shape->getNumberOfSides(); // Error: Typed property must not be accessed before initialization
```

Тип `callable` для свойств **не поддерживается**.

---

## Readonly-свойства (PHP 8.1+)

Свойство можно изменить только **один раз** — при инициализации:

```php
<?php

class Order
{
    public function __construct(
        public readonly string $uuid,
        public readonly int $amount,
    ) {}
}

$order = new Order('abc-123', 5000);
echo $order->uuid;    // abc-123
// $order->uuid = 'xyz'; // Error: Cannot modify readonly property
```

Особенности:

- только для типизированных свойств;
- нельзя значение по умолчанию;
- статические `readonly` не поддерживаются;
- внутреннее изменение объекта разрешено: `$order->obj->field = 1`;
- с PHP 8.3 — повторная инициализация в `__clone()`.

---

## Константы класса

```php
<?php

class Status
{
    public const ACTIVE = 'active';
    public const INACTIVE = 'inactive';

    private const MAX_RETRIES = 3;
}

echo Status::ACTIVE; // active
```

С PHP 7.1 константы поддерживают модификаторы видимости. С PHP 8.3 — типизированные константы:

```php
class Config
{
    public const string APP_NAME = 'MyApp';
    public const int TIMEOUT = 30;
}
```

---

## Динамические свойства

Присвоение несуществующему свойству создаёт его «на лету»:

```php
$obj = new stdClass();
$obj->dynamic = 'value';
```

> **PHP 8.2+:** динамические свойства устарели. Объявляйте свойства явно или используйте `__get()` / `__set()`, либо атрибут `#[\AllowDynamicProperties]`.

---

## Геттеры и сеттеры

```php
<?php

class Shape
{
    private int $numberOfSides;

    public function setNumberOfSides(int $n): void
    {
        $this->numberOfSides = $n;
    }

    public function getNumberOfSides(): int
    {
        return $this->numberOfSides;
    }
}
```

В Laravel Eloquent геттеры/сеттеры часто заменяют аксессорами модели (`get{Name}Attribute`).

Следующая тема: [Область видимости](visibility.md).
