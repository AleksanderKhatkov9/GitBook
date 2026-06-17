# Конструкторы и деструкторы

> Источник: [Конструкторы и деструкторы | PHP Manual](https://www.php.net/manual/ru/language.oop5.decon.php)

## Конструктор __construct

Вызывается автоматически при `new ClassName()`:

```php
<?php

class User
{
    private string $name;

    public function __construct(string $name)
    {
        $this->name = $name;
        echo "Создан пользователь: {$name}\n";
    }
}

$user = new User('Иван');
```

---

## Constructor promotion (PHP 8.0+)

Объявление и инициализация свойств прямо в параметрах конструктора:

```php
<?php

class User
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $email = null,
    ) {}
}

$user = new User(1, 'Иван', 'ivan@example.com');
```

Эквивалентно:

```php
class User
{
    public int $id;
    public string $name;
    public ?string $email;

    public function __construct(int $id, string $name, ?string $email = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }
}
```

---

## Вызов конструктора родителя

```php
<?php

class Animal
{
    public function __construct(
        protected string $name,
    ) {}
}

class Dog extends Animal
{
    public function __construct(
        string $name,
        public string $breed,
    ) {
        parent::__construct($name);
    }
}

$dog = new Dog('Рекс', 'овчарка');
```

---

## Деструктор __destruct

Вызывается при уничтожении объекта (конец скрипта или `unset`):

```php
<?php

class FileHandler
{
    public function __construct(
        private string $path,
    ) {
        echo "Открыт: {$this->path}\n";
    }

    public function __destruct()
    {
        echo "Закрыт: {$this->path}\n";
    }
}

$fh = new FileHandler('/tmp/data.txt');
// При завершении: "Закрыт: /tmp/data.txt"
```

---

## Статические методы и свойства

> Источник: [Ключевое слово static | PHP Manual](https://www.php.net/manual/ru/language.oop5.static.php)

Принадлежат **классу**, а не объекту. Доступ через `ClassName::$prop` или `self::method()`:

```php
<?php

class Counter
{
    public static int $count = 0;

    public function __construct()
    {
        self::$count++;
    }

    public static function getCount(): int
    {
        return self::$count;
    }
}

new Counter();
new Counter();
echo Counter::getCount(); // 2
```

---

## Оператор разрешения области ::

> Источник: [Оператор :: | PHP Manual](https://www.php.net/manual/ru/language.oop5.paamayim-nekudotayim.php)

Доступ к константам, статическим членам и переопределённым методам родителя:

```php
<?php

class ParentClass
{
    public const VERSION = '1.0';

    public static function who(): string
    {
        return 'Parent';
    }
}

class ChildClass extends ParentClass
{
    public static function who(): string
    {
        return 'Child';
    }

    public static function test(): void
    {
        echo parent::who();  // Parent
        echo self::who();    // Child
        echo static::who();  // Child (позднее статическое связывание)
        echo ParentClass::VERSION; // 1.0
    }
}
```

| Ключевое слово | Ссылка на |
|----------------|-----------|
| `self::` | Текущий класс (на этапе компиляции) |
| `parent::` | Родительский класс |
| `static::` | Класс, из которого вызван метод (runtime) |

---

## В Laravel

```php
<?php

// Constructor promotion в модели / DTO
class CreateUserData
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {}
}

// Статический вызов фасада
use Illuminate\Support\Facades\Cache;

Cache::put('key', 'value', 3600);
```

Следующая тема: [Наследование](inheritance.md).
