# Пространства имён

> Источник: [Пространства имён | PHP Manual](https://www.php.net/manual/ru/language.namespaces.php)

Пространства имён (`namespace`) решают конфликты имён классов, функций и констант — основа автозагрузки PSR-4 и Composer.

## Определение

```php
<?php

namespace App\Models;

class User {}
```

Полное имя: `App\Models\User`.

Подпространства — через `\`:

```php
<?php

namespace App\Http\Controllers;
```

Несколько namespace в одном файле возможны, но обычно избегают (кроме сгенерированного кода).

## Использование и импорт

```php
<?php

namespace App\Services;

use App\Models\User;
use App\Models\Post as BlogPost;
use App\Support\{Str, Arr}; // групповой импорт
use function App\Helpers\slugify;
use const App\Config\VERSION;

$user = new User();
$post = new BlogPost();
```

Без `use` — полное имя:

```php
<?php

$user = new \App\Models\User();
```

## Ключевое слово namespace и __NAMESPACE__

```php
<?php

namespace App;

echo __NAMESPACE__;     // App
echo namespace\User::class; // App\User — относительно текущего namespace
```

## Глобальное пространство

Имена без namespace лежат в глобальном пространстве. Префикс `\`:

```php
<?php

namespace App;

$length = \strlen('PHP'); // встроенная функция
$ex = new \Exception('err');
```

Функции и константы: если нет в текущем namespace, PHP ищет в глобальном. Классы — нет (нужен `use` или `\`).

## Динамические имена

```php
<?php

$class = 'App\Models\User';
$obj = new $class();

// Относительно текущего namespace:
$class = __NAMESPACE__ . '\User';
```

## Правила разрешения

| Запись | Где ищется |
|--------|------------|
| `User` | Текущий namespace → (для классов) ошибка, если нет |
| `\User` | Глобальное пространство |
| `Models\User` | Относительно текущего: `App\Models\User` |
| `use App\Models\User` | Импорт полного имени |

## Связь с Composer

В `composer.json`:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  }
}
```

Файл `app/Models/User.php` → класс `App\Models\User`.

Далее: [Перечисления](enumerations.md) · [ООП](OOP/README.md).
