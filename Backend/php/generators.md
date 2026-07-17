# Генераторы

> Источник: [Генераторы | PHP Manual](https://www.php.net/manual/ru/language.generators.php)

Генератор — функция с `yield`, которая возвращает значения по одному, не создавая весь массив в памяти. Удобно для больших наборов данных и потоковой обработки.

## Базовый синтаксис

```php
<?php

function countdown(int $from): Generator
{
    for ($i = $from; $i >= 0; $i--) {
        yield $i;
    }
}

foreach (countdown(3) as $n) {
    echo $n; // 3 2 1 0
}
```

Вызов генераторной функции возвращает объект `Generator` (реализует `Iterator`).

## yield с ключом

```php
<?php

function pairs(): Generator
{
    yield 'a' => 1;
    yield 'b' => 2;
}

foreach (pairs() as $key => $value) {
    echo "$key=$value\n";
}
```

## yield from

Делегирование другому генератору, массиву или Traversable:

```php
<?php

function inner(): Generator
{
    yield 1;
    yield 2;
}

function outer(): Generator
{
    yield 0;
    yield from inner();
    yield 3;
}
```

## Передача значений в генератор

```php
<?php

function logger(): Generator
{
    while (true) {
        $line = yield;
        echo "[log] $line\n";
    }
}

$gen = logger();
$gen->send('start');
$gen->send('done');
```

`yield` может вернуть значение, переданное через `send()`.

## Возврат из генератора

```php
<?php

function numbers(): Generator
{
    yield 1;
    yield 2;
    return 'done';
}

$gen = numbers();
foreach ($gen as $n) {
    echo $n;
}
echo $gen->getReturn(); // done
```

## Генератор vs массив vs Iterator

| Подход | Память | Когда |
|--------|--------|-------|
| Массив | Все элементы сразу | Небольшие данные |
| Генератор | Один элемент | Большие потоки, ленивые последовательности |
| Класс `Iterator` | Гибко | Сложная логика, повторное использование |

```php
<?php

// Плохо для огромного файла — весь файл в память
$lines = file('huge.log');

// Лучше
function readLines(string $path): Generator
{
    $fh = fopen($path, 'r');
    try {
        while (($line = fgets($fh)) !== false) {
            yield $line;
        }
    } finally {
        fclose($fh);
    }
}
```

Связано: [Функции](functions.md), [Fibers](https://www.php.net/manual/ru/language.fibers.php) (легковесные волокна, PHP 8.1+).
