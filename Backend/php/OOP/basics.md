# Основы

> Источник: [Основы | PHP Manual](https://www.php.net/manual/ru/language.oop5.basic.php)

## Определение класса

Каждый класс начинается с ключевого слова `class`, затем имя и тело в фигурных скобках:

```php
<?php

class SimpleClass
{
    // Свойство
    public $var = 'значение по умолчанию';

    // Метод
    public function displayVar(): void
    {
        echo $this->var;
    }
}
```

Имя класса: буква или `_`, далее буквы, цифры, `_`. Регулярное выражение: `^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$`.

Класс содержит **константы**, **свойства** (переменные) и **методы** (функции).

---

## Псевдопеременная $this

`$this` — ссылка на текущий объект. Доступна только при вызове метода **из контекста объекта**:

```php
<?php

class A
{
    public function foo(): void
    {
        if (isset($this)) {
            echo 'Класс: ' . get_class($this) . "\n";
        }
    }
}

$a = new A();
$a->foo();   // Класс: A

A::foo();    // PHP 8+: Fatal error — нельзя вызывать нестатический метод статически
```

---

## Создание объекта — ключевое слово new

```php
<?php

class SimpleClass {}

$instance = new SimpleClass();

// Через переменную с именем класса
$className = 'SimpleClass';
$instance = new $className();
```

С PHP 8.0 — `new` с произвольным выражением:

```php
<?php

class ClassA {}
class ClassB {}

function getClassName(): string
{
    return rand(0, 1) ? ClassA::class : ClassB::class;
}

$object = new (getClassName())();
```

Круглые скобки после имени класса можно опустить, если конструктор без аргументов: `new SimpleClass`.

---

## Readonly-классы (PHP 8.2+)

Модификатор `readonly` на классе делает все свойства `readonly` и запрещает динамические свойства:

```php
<?php

readonly class User
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}
}

$user = new User(1, 'Иван');
// $user->name = 'Пётр'; // Error: Cannot modify readonly property
```

Ограничения readonly-класса:

- только типизированные свойства;
- нельзя статические свойства;
- дочерний класс тоже должен быть `readonly`.

---

## Проверка типа объекта

```php
<?php

$user = new User(1, 'Иван');

var_dump($user instanceof User);        // true
var_dump(get_class($user));             // User
var_dump(get_object_vars($user));       // ['id' => 1, 'name' => 'Иван']
```

---

## Полезные функции

| Функция | Описание |
|---------|----------|
| `get_class($obj)` | Имя класса объекта |
| `instanceof` | Проверка принадлежности к классу/интерфейсу |
| `get_object_vars($obj)` | Массив свойств объекта |
| `method_exists($obj, 'method')` | Есть ли метод |
| `property_exists($obj, 'prop')` | Есть ли свойство |

Следующая тема: [Свойства](properties.md).
