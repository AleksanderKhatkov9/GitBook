# Управляющие конструкции

> Источник: [Управляющие конструкции | PHP Manual](https://www.php.net/manual/ru/language.control-structures.php)

## if / else / elseif

```php
<?php

if ($score >= 90) {
    echo 'A';
} elseif ($score >= 80) {
    echo 'B';
} else {
    echo 'C';
}
```

Альтернативный синтаксис (удобен в шаблонах):

```php
<?php if ($ok): ?>
  <p>OK</p>
<?php else: ?>
  <p>Fail</p>
<?php endif; ?>
```

## while / do-while

```php
<?php

$i = 0;
while ($i < 3) {
    echo $i++;
}

do {
    echo 'once';
} while (false);
```

## for / foreach

```php
<?php

for ($i = 0; $i < 3; $i++) {
    echo $i;
}

$items = ['a' => 1, 'b' => 2];
foreach ($items as $key => $value) {
    echo "$key = $value\n";
}

foreach ($items as &$value) {
    $value *= 2; // изменение по ссылке
}
unset($value); // обязательно после ссылки
```

## break / continue

```php
<?php

for ($i = 0; $i < 10; $i++) {
    if ($i === 3) {
        continue; // следующая итерация
    }
    if ($i === 7) {
        break; // выход из цикла
    }
}
```

`break 2` / `continue 2` — выход на N уровней вложенности.

## switch

```php
<?php

switch ($status) {
    case 'draft':
        echo 'Черновик';
        break;
    case 'published':
    case 'live':
        echo 'Опубликовано';
        break;
    default:
        echo 'Неизвестно';
}
```

Сравнение через нестрогое `==`. Для строгого сопоставления используйте `match`.

## match (PHP 8.0+)

```php
<?php

$result = match ($status) {
    'draft' => 'Черновик',
    'published', 'live' => 'Опубликовано',
    default => 'Неизвестно',
};
```

| | `switch` | `match` |
|---|----------|---------|
| Сравнение | `==` | `===` |
| Возврат значения | нет (обычно) | да |
| Fall-through | да | нет |
| Без совпадения | `default` опционален | нужен `default` или `UnhandledMatchError` |

## declare

```php
<?php

declare(strict_types=1);
declare(ticks=1); // редко
```

## return / include / require

```php
<?php

return $value; // из функции или файла

require 'config.php';      // обязательно
include 'optional.php';     // предупреждение при отсутствии
require_once 'helpers.php';
include_once 'helpers.php';
```

| | `require` | `include` |
|---|-----------|-----------|
| Файл не найден | Fatal error | Warning |
| `_once` | Подключить один раз | Подключить один раз |

## goto

```php
<?php

goto end;
echo 'пропущено';
end:
echo 'конец';
```

Нельзя перепрыгивать в другой файл или внутрь циклов/switch произвольно. Используйте редко.

Далее: [Функции](functions.md).
