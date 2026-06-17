# ООП в PHP — классы и объекты

> Официальная документация: [Классы и объекты | PHP Manual](https://www.php.net/manual/ru/language.oop5.php)

Объектно-ориентированное программирование (ООП) в PHP строится на **классах** (шаблонах) и **объектах** (экземплярах). Laravel, Symfony и большинство современных PHP-проектов активно используют ООП.

## Разделы

| Страница | Тема |
|----------|------|
| [Основы](basics.md) | `class`, `new`, объект, `$this` |
| [Свойства](properties.md) | Типы, `readonly`, константы класса |
| [Область видимости](visibility.md) | `public`, `protected`, `private` |
| [Конструкторы](constructors.md) | `__construct`, `__destruct`, promotion |
| [Наследование](inheritance.md) | `extends`, `abstract`, `interface`, `final` |
| [Трейты](traits.md) | Повторное использование кода |
| [Магические методы](magic-methods.md) | `__get`, `__set`, `__toString`, клонирование |
| [SOLID](../SOLID/README.md) | Принципы проектирования + [Laravel](../SOLID/laravel.md) |
| [Паттерны](../patterns/README.md) | Factory, Strategy, Observer и др. |

## Ключевые понятия

| Понятие | Описание |
|---------|----------|
| **Класс** | Шаблон: свойства + методы |
| **Объект** | Экземпляр класса, созданный через `new` |
| **Свойство** | Переменная внутри класса |
| **Метод** | Функция внутри класса |
| **Наследование** | Дочерний класс расширяет родительский |
| **Интерфейс** | Контракт: какие методы должен реализовать класс |
| **Трейт** | Горизонтальное подключение методов без наследования |

## Минимальный пример

```php
<?php

class User
{
    public function __construct(
        public readonly int $id,
        public string $name,
    ) {}

    public function greet(): string
    {
        return "Привет, {$this->name}!";
    }
}

$user = new User(1, 'Иван');
echo $user->greet(); // Привет, Иван!
```

## Версии PHP

| Возможность | С какой версии |
|-------------|----------------|
| Типизированные свойства | PHP 7.4 |
| Constructor promotion | PHP 8.0 |
| `readonly` свойства | PHP 8.1 |
| `readonly` классы | PHP 8.2 |
| Асимметричная видимость `(set)` | PHP 8.4 |

Связанные разделы: [PHP](../README.md), [Laravel](../../laravel/README.md).
