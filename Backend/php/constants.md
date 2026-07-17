# Константы

> Источник: [Константы | PHP Manual](https://www.php.net/manual/ru/language.constants.php)

Константа — именованное значение, которое нельзя изменить после определения.

## Синтаксис

```php
<?php

define('APP_NAME', 'GitBook');
const VERSION = '1.0';

echo APP_NAME;
echo VERSION;
```

| Способ | Где можно | Особенности |
|--------|-----------|-------------|
| `const` | Везде (в т.ч. классы), на верхнем уровне файла | Значение — константное выражение |
| `define()` | В рантайме, в т.ч. внутри условий | Имя — строка; можно `define('A', 1, true)` (case-insensitive — устарело) |

С PHP 5.6+ `const` поддерживает скаляры и массивы; с PHP 7+ — более сложные константные выражения.

```php
<?php

const FLAGS = ['a', 'b'];
const SUM = 1 + 2;
```

## Константы класса

```php
<?php

class Http
{
    public const OK = 200;
    private const SECRET = 'x';
}

echo Http::OK;
```

С PHP 8.1 — `final` константы класса. С PHP 8.3 — типизированные константы класса:

```php
<?php

class Config
{
    public const string DRIVER = 'mysql';
}
```

## Магические константы

> Источник: [Магические константы](https://www.php.net/manual/ru/language.constants.magic.php)

Значение зависит от места использования:

| Константа | Значение |
|-----------|----------|
| `__LINE__` | Номер строки |
| `__FILE__` | Полный путь к файлу |
| `__DIR__` | Каталог файла |
| `__FUNCTION__` | Имя функции |
| `__CLASS__` | Имя класса |
| `__TRAIT__` | Имя трейта |
| `__METHOD__` | Имя метода (`Class::method`) |
| `__NAMESPACE__` | Текущее пространство имён |
| `ClassName::class` | Полное имя класса (строка) |

```php
<?php

namespace App;

echo __NAMESPACE__; // App
echo User::class;   // App\User
```

## Предопределённые константы

PHP и расширения задают множество констант (`PHP_VERSION`, `PHP_EOL`, `E_ALL`, `JSON_THROW_ON_ERROR` и др.). Список: [Предопределённые константы](https://www.php.net/manual/ru/reserved.constants.php).

```php
<?php

echo PHP_VERSION;
echo PHP_EOL;
```

Далее: [Операторы](operators.md).
