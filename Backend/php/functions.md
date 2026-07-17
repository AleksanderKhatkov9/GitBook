# Функции

> Источник: [Функции | PHP Manual](https://www.php.net/manual/ru/language.functions.php)

## Пользовательские функции

```php
<?php

function greet(string $name, string $greeting = 'Привет'): string
{
    return "$greeting, $name!";
}

echo greet('Анна');
```

Имена функций нечувствительны к регистру, но принято писать единообразно (`camelCase` или `snake_case`).

## Параметры

### По значению и по ссылке

```php
<?php

function addOne(int &$n): void
{
    $n++;
}

$x = 1;
addOne($x); // $x === 2
```

### Значения по умолчанию

Параметры со значением по умолчанию идут после обязательных:

```php
<?php

function connect(string $host, int $port = 3306): void {}
```

### Именованные аргументы (PHP 8.0+)

```php
<?php

greet(name: 'Анна', greeting: 'Здравствуй');
```

### Распаковка и variadic

```php
<?php

function sum(int ...$numbers): int
{
    return array_sum($numbers);
}

sum(1, 2, 3);
sum(...[1, 2, 3]);
```

### Типы и nullable

```php
<?php

function find(int $id): ?array
{
    return null;
}

function logMessage(string|Stringable $message): void {}
```

## Возврат значений

```php
<?php

function pair(int $a, int $b): array
{
    return [$a, $b];
}

[$x, $y] = pair(1, 2);

function nothing(): void
{
    // нет return со значением
}

function fail(): never
{
    throw new RuntimeException('fail');
}
```

С PHP 8.0 — union return types; с PHP 8.1 — `never`; с PHP 8.2 — `true`/`false`/`null` как standalone types.

## Переменные функции

```php
<?php

function foo(): string
{
    return 'foo';
}

$fn = 'foo';
echo $fn(); // foo
```

## Анонимные функции (Closure)

```php
<?php

$multiplier = 2;
$fn = function (int $n) use ($multiplier): int {
    return $n * $multiplier;
};

echo $fn(5); // 10
```

`use` захватывает переменные из внешней области. По ссылке: `use (&$multiplier)`.

## Стрелочные функции (PHP 7.4+)

```php
<?php

$multiplier = 2;
$fn = fn(int $n): int => $n * $multiplier;

echo $fn(5); // 10
```

Автоматически захватывают переменные по значению. Всегда возвращают выражение (один `return`).

## First-class callable (PHP 8.1+)

```php
<?php

$strlen = strlen(...);
echo $strlen('PHP'); // 3

$upper = strtoupper(...);
$map = array_map($upper, ['a', 'b']);
```

## Встроенные функции

PHP поставляет тысячи функций: строки (`strlen`, `str_contains`), массивы (`array_map`, `array_filter`), файлы (`file_get_contents`) и т.д.

Справочник: [Function Reference](https://www.php.net/manual/ru/funcref.php).

Далее: [Пространства имён](namespaces.md) · [ООП](OOP/README.md).
