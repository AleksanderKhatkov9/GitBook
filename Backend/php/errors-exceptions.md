# Ошибки и исключения

> Источник: [Ошибки](https://www.php.net/manual/ru/language.errors.php) · [Исключения](https://www.php.net/manual/ru/language.exceptions.php)

В PHP 7+ ошибки движка представлены объектами иерархии `Throwable`. Пользовательский код обычно бросает `Exception`.

## Иерархия

```
Throwable
├── Error          // ошибки движка
│   ├── TypeError
│   ├── ValueError
│   ├── ArgumentCountError
│   ├── ArithmeticError
│   │   └── DivisionByZeroError
│   ├── AssertionError
│   ├── ParseError
│   ├── CompileError
│   ├── UnhandledMatchError
│   └── FiberError
└── Exception      // исключения приложения
    └── ErrorException  // преобразование warnings в exceptions
```

Полный список: [Предопределённые исключения](https://www.php.net/manual/ru/reserved.exceptions.php).

## try / catch / finally

```php
<?php

try {
    $result = riskyOperation();
} catch (InvalidArgumentException $e) {
    echo $e->getMessage();
} catch (RuntimeException | LogicException $e) { // multi-catch
    report($e);
} finally {
    // выполнится всегда
}
```

С PHP 8.0 — `catch` без переменной: `catch (Exception) {}`.

## throw

```php
<?php

throw new InvalidArgumentException('Некорректный id');

// PHP 8.0+: throw — выражение
$id = $input ?? throw new RuntimeException('id required');
```

## Собственные исключения

```php
<?php

class UserNotFoundException extends RuntimeException {}

function findUser(int $id): User
{
    throw new UserNotFoundException("User {$id} not found");
}
```

## Обработка ошибок PHP

Уровни: `E_ERROR`, `E_WARNING`, `E_NOTICE`, `E_DEPRECATED`, `E_ALL` и др.

```php
<?php

error_reporting(E_ALL);
ini_set('display_errors', '0'); // в production — в лог, не на экран

set_error_handler(function (int $severity, string $message, string $file, int $line): bool {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(function (Throwable $e): void {
    error_log($e->getMessage());
});
```

В Laravel / Symfony обработкой занимается фреймворк — не дублируйте глобальные handlers без нужды.

## Практические правила

| Ситуация | Подход |
|----------|--------|
| Ожидаемая бизнес-ошибка | Своё `Exception` + catch на границе |
| Невалидный аргумент | `InvalidArgumentException` / `ValueError` |
| Невозможность продолжить | `RuntimeException` / `LogicException` |
| Production | Логировать, не показывать stack trace пользователю |

См. также: [Безопасность — сообщения об ошибках](security.md).
