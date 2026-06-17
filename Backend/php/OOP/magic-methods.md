# Магические методы

> Источник: [Магические методы | PHP Manual](https://www.php.net/manual/ru/language.oop5.magic.php)

**Магические методы** начинаются с `__` и вызываются автоматически в особых ситуациях.

## Основные магические методы

| Метод | Когда вызывается |
|-------|------------------|
| `__construct()` | При `new Class()` |
| `__destruct()` | При уничтожении объекта |
| `__get($name)` | Чтение недоступного свойства |
| `__set($name, $value)` | Запись недоступного свойства |
| `__isset($name)` | `isset()` / `empty()` на свойстве |
| `__unset($name)` | `unset()` на свойстве |
| `__call($name, $args)` | Вызов недоступного метода |
| `__callStatic($name, $args)` | Статический вызов недоступного метода |
| `__toString()` | Преобразование объекта в строку |
| `__invoke()` | Вызов объекта как функции |
| `__clone()` | При `clone $obj` |
| `__serialize()` / `__unserialize()` | Сериализация (PHP 7.4+) |

---

## __get и __set

```php
<?php

class User
{
    private array $data = [];

    public function __get(string $name): mixed
    {
        return $this->data[$name] ?? null;
    }

    public function __set(string $name, mixed $value): void
    {
        $this->data[$name] = $value;
    }
}

$user = new User();
$user->name = 'Иван';       // __set
echo $user->name;            // __get → Иван
```

---

## __toString

```php
<?php

class Product
{
    public function __construct(
        private string $name,
        private float $price,
    ) {}

    public function __toString(): string
    {
        return "{$this->name} ({$this->price} руб.)";
    }
}

$product = new Product('Книга', 29.99);
echo $product; // Книга (29.99 руб.)
```

---

## __invoke

```php
<?php

class Multiplier
{
    public function __construct(private int $factor) {}

    public function __invoke(int $value): int
    {
        return $value * $this->factor;
    }
}

$double = new Multiplier(2);
echo $double(5); // 10
```

В Laravel замыкания и invokable-контроллеры используют этот паттерн:

```php
Route::get('/dashboard', DashboardController::class);
```

---

## __call и __callStatic

```php
<?php

class ApiClient
{
    public function __call(string $method, array $args): mixed
    {
        return "Вызов API: {$method}(" . implode(', ', $args) . ')';
    }
}

$client = new ApiClient();
echo $client->getUsers(1, 10); // Вызов API: getUsers(1, 10)
```

---

## Клонирование — __clone

```php
<?php

class Document
{
    public function __construct(
        public string $title,
        public \DateTime $createdAt,
    ) {}

    public function __clone(): void
    {
        $this->createdAt = new \DateTime();
        $this->title .= ' (копия)';
    }
}

$original = new Document('Отчёт', new \DateTime());
$copy = clone $original;
```

---

## Сериализация

```php
<?php

class Session
{
    public function __construct(
        private string $token,
        private array $data,
    ) {}

    public function __serialize(): array
    {
        return ['token' => $this->token, 'data' => $this->data];
    }

    public function __unserialize(array $data): void
    {
        $this->token = $data['token'];
        $this->data = $data['data'];
    }
}
```

---

## Сравнение объектов

При `==` сравниваются свойства. При `===` — ещё и идентичность (один и тот же экземпляр):

```php
<?php

$a = new User(1, 'Иван');
$b = new User(1, 'Иван');
$c = $a;

var_dump($a == $b);  // true (одинаковые свойства)
var_dump($a === $b); // false (разные объекты)
var_dump($a === $c); // true
```

---

## Анонимные классы

```php
<?php

$logger = new class {
    public function log(string $msg): void
    {
        echo $msg . PHP_EOL;
    }
};

$logger->log('Сообщение');
```

---

## В Laravel / Eloquent

Eloquent использует магические методы для динамических свойств модели:

```php
$user = User::find(1);
$user->name;              // __get — атрибут из БД
$user->posts;             // __get — lazy-load связи
$user->nonExistent();     // __call — scope или ошибка
```

---

Содержание раздела: [ООП — оглавление](README.md).
