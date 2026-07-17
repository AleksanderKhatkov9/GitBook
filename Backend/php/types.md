# Типы

> Источник: [Типы | PHP Manual](https://www.php.net/manual/ru/language.types.php)

PHP — язык с динамической типизацией и опциональными объявлениями типов (PHP 7+).

## Скалярные типы

| Тип | Пример | Описание |
|-----|--------|----------|
| `bool` | `true`, `false` | Логический |
| `int` | `42`, `0xFF`, `0b1010` | Целое |
| `float` | `3.14`, `1.2e3` | Число с плавающей точкой |
| `string` | `'hi'`, `"hi"`, `<<<EOF` | Строка |

```php
<?php

$ok = true;
$count = 10;
$price = 19.99;
$name = 'PHP';
```

### NULL

`null` — переменная не имеет значения. Единственное значение типа `null`.

```php
<?php

$a = null;
var_dump(is_null($a)); // true
```

## Составные типы

### Массивы

```php
<?php

$list = [1, 2, 3];
$map = ['name' => 'Anna', 'age' => 25];

echo $map['name']; // Anna
```

Ключи — `int` или `string`. Подробнее: [array](https://www.php.net/manual/ru/language.types.array.php).

### Объекты

```php
<?php

class User
{
    public function __construct(public string $name) {}
}

$user = new User('Ivan');
echo $user->name;
```

См. [ООП](OOP/README.md).

### Перечисления (enum)

```php
<?php

enum Status
{
    case Draft;
    case Published;
}
```

См. [Перечисления](enumerations.md).

### Ресурсы и callable

| Тип | Описание |
|-----|----------|
| `resource` | Внешний ресурс (файл, соединение) — постепенно заменяется объектами |
| `callable` | То, что можно вызвать: функция, метод, Closure |

## Специальные типы в объявлениях

| Тип | Назначение |
|-----|------------|
| `mixed` | Любой тип |
| `void` | Функция ничего не возвращает |
| `never` | Функция не возвращает управление (exit, throw) |
| `iterable` | `array` или объект `Traversable` |
| `object` | Любой объект |
| `self` / `static` / `parent` | Относительные типы классов |

## Union, intersection и nullable

```php
<?php

function find(int|string $id): ?User // null или User
{
    return null;
}

function process(Countable&Traversable $items): void {}
```

| Синтаксис | Смысл |
|-----------|-------|
| `?Type` | `Type\|null` |
| `A\|B` | Union (PHP 8.0+) |
| `A&B` | Intersection (PHP 8.1+) |
| `A\|B\|null` | Union с null |

## Объявления типов

```php
<?php

function add(int $a, int $b): int
{
    return $a + $b;
}

class Product
{
    public function __construct(
        public string $title,
        public float $price,
    ) {}
}
```

Строгая проверка типов в файле:

```php
<?php

declare(strict_types=1);
```

Без `strict_types` PHP может приводить типы (жонглирование). Со `strict_types=1` скалярные аргументы не приводятся неявно (кроме `null` → nullable).

## Приведение типов

```php
<?php

(int) '42';      // 42
(float) '3.14';  // 3.14
(string) 100;    // '100'
(bool) 0;        // false
(array) 'x';     // ['x']
```

Проверка типа:

```php
<?php

is_int(5);
is_string('a');
is_array([]);
$value instanceof User;
```

Далее: [Переменные](variables.md).
