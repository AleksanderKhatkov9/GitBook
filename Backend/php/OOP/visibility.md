# Область видимости

> Источник: [Область видимости | PHP Manual](https://www.php.net/manual/ru/language.oop5.visibility.php)

Модификаторы `public`, `protected`, `private` задают доступ к свойствам, методам и константам класса.

| Модификатор | Где доступен |
|-------------|--------------|
| `public` | Везде |
| `protected` | Класс + дочерние классы |
| `private` | Только текущий класс |

## Свойства

```php
<?php

class MyClass
{
    public $public = 'Public';
    protected $protected = 'Protected';
    private $private = 'Private';

    public function printHello(): void
    {
        echo $this->public;    // OK
        echo $this->protected; // OK
        echo $this->private;   // OK
    }
}

$obj = new MyClass();
echo $obj->public;     // OK
// echo $obj->protected; // Fatal error
// echo $obj->private;   // Fatal error

$obj->printHello();    // Public Protected Private
```

## Наследование и видимость

```php
<?php

class MyClass2 extends MyClass
{
    public $public = 'Public2';
    protected $protected = 'Protected2';

    public function printHello(): void
    {
        echo $this->public;    // Public2
        echo $this->protected; // Protected2
        // echo $this->private; // Warning — private не наследуется
    }
}
```

Правила:

- `public` и `protected` свойства можно переопределять в дочернем классе;
- `private` свойства **не наследуются** — дочерний класс может объявить своё одноимённое;
- видимость можно **ослабить** (`protected` → `public`), но нельзя **усилить** (`public` → `private`).

---

## Методы

Те же правила, что и для свойств:

```php
<?php

class ParentClass
{
    public function publicMethod(): void {}
    protected function protectedMethod(): void {}
    private function privateMethod(): void {}
}

class ChildClass extends ParentClass
{
    // Переопределение с ослаблением видимости — OK
    public function protectedMethod(): void {}

    public function callParent(): void
    {
        $this->publicMethod();     // OK
        $this->protectedMethod();  // OK
        // $this->privateMethod(); // Fatal error
    }
}
```

---

## Асимметричная видимость (PHP 8.4+)

Отдельная видимость для **чтения** и **записи**:

```php
<?php

class Book
{
    public function __construct(
        public private(set) string $title,
        public protected(set) string $author,
    ) {}
}

$book = new Book('1984', 'Оруэлл');
echo $book->title;       // чтение — public
// $book->title = 'Другой'; // Error — запись private(set)
```

---

## В Laravel

| Элемент | Типичная видимость |
|---------|-------------------|
| Свойства модели `$fillable` | `protected` |
| Методы контроллера | `public` |
| Вспомогательные методы сервиса | `private` / `protected` |
| Константы enum / класса | `public` |

Следующая тема: [Конструкторы](constructors.md).
