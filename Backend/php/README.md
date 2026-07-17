# PHP

Документация по языку PHP на основе [официального руководства](https://www.php.net/manual/ru/index.php).

## Справочник языка

| Раздел | Описание |
|--------|----------|
| [Введение](introduction.md) | Что такое PHP, версии, карта раздела |
| [Установка и настройка](installation.md) | PHP, FPM, Composer, php.ini |
| [Синтаксис](syntax.md) | Теги, инструкции, комментарии |
| [Типы](types.md) | Scalar, array, object, union types |
| [Переменные](variables.md) | Область видимости, суперглобальные |
| [Константы](constants.md) | `const`, `define`, магические |
| [Операторы](operators.md) | Арифметика, сравнение, логика |
| [Управляющие конструкции](control-structures.md) | if, циклы, match, include |
| [Функции](functions.md) | Параметры, closures, стрелочные |
| [ООП — классы и объекты](OOP/README.md) | Классы, наследование, трейты |
| [Пространства имён](namespaces.md) | `namespace`, `use`, PSR-4 |
| [Перечисления](enumerations.md) | `enum` (PHP 8.1+) |
| [Ошибки и исключения](errors-exceptions.md) | `Throwable`, try/catch |
| [Генераторы](generators.md) | `yield`, ленивые последовательности |
| [Атрибуты](attributes.md) | `#[Attribute]`, Reflection |
| [Безопасность](security.md) | Ввод, SQL, сессии, пароли |
| [Особенности](features.md) | Cookies, сессии, uploads, CLI |

## Проектирование

| Раздел | Описание |
|--------|----------|
| [SOLID](SOLID/README.md) | Принципы + [примеры в Laravel](SOLID/laravel.md) |
| [Паттерны проектирования](patterns/README.md) | Factory, Builder, Observer, Strategy и др. |

## Фреймворк

| Раздел | Описание |
|--------|----------|
| [Laravel](../laravel/README.md) | Веб-фреймворк Laravel 13.x |

## Требования

- PHP 8.2+
- [Composer](https://getcomposer.org)

```bash
php -v
composer -V
```

## Официальные источники

- [Руководство PHP (RU)](https://www.php.net/manual/ru/index.php)
- [Справочник языка](https://www.php.net/manual/ru/langref.php)
- [Справочник функций](https://www.php.net/manual/ru/funcref.php)
- [PHP: The Right Way](https://phptherightway.com/)
- [Паттерны на PHP (Refactoring.Guru)](https://refactoring.guru/ru/design-patterns/php)
