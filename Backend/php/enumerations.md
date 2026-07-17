# Перечисления (enum)

> Источник: [Перечисления | PHP Manual](https://www.php.net/manual/ru/language.enumerations.php)

`enum` (PHP 8.1+) — типобезопасный набор именованных значений. Лучше строк-«магических констант» для статусов, ролей, типов.

## Pure enum (без значения)

```php
<?php

enum Status
{
    case Draft;
    case Published;
    case Archived;
}

$status = Status::Draft;

if ($status === Status::Draft) {
    echo 'черновик';
}
```

Каждый case — единственный экземпляр. Сравнение через `===`.

## Backed enum (со скалярным значением)

```php
<?php

enum Status: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';
}

Status::Draft->value;              // 'draft'
Status::from('published');         // Status::Published
Status::tryFrom('unknown');        // null
Status::cases();                   // массив всех case
```

| Метод | Описание |
|-------|----------|
| `from($value)` | Case или `ValueError` |
| `tryFrom($value)` | Case или `null` |
| `cases()` | Все варианты |

Тип backing: только `int` или `string`, все case одного типа.

## Методы и интерфейсы

```php
<?php

enum Status: string
{
    case Draft = 'draft';
    case Published = 'published';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Черновик',
            self::Published => 'Опубликовано',
        };
    }

    public static function default(): self
    {
        return self::Draft;
    }
}

echo Status::Draft->label();
```

Enum может реализовывать интерфейсы и использовать трейты (с ограничениями). Нельзя наследовать enum (`extends` запрещён).

## Константы и свойства

У enum нет обычных изменяемых свойств объекта. Можно объявлять константы. Cases сами по себе — объекты, реализующие `UnitEnum` / `BackedEnum`.

```php
<?php

enum HttpStatus: int
{
    case Ok = 200;
    case NotFound = 404;

    public const SUCCESS_MIN = 200;
}
```

## Сериализация

```php
<?php

serialize(Status::Draft);
json_encode(Status::Draft); // для backed — обычно value (зависит от контекста)
```

В Laravel enum часто используют в Eloquent casts и валидации.

## Отличия от классов

| | Enum | Класс |
|---|------|-------|
| Создание через `new` | Нет | Да |
| Наследование | Нет | Да |
| Экземпляры | Фиксированный набор cases | Произвольные |
| Сравнение | `===` по identity | По правилам объектов |

Связанные разделы: [Типы](types.md), [ООП](OOP/README.md).
