# Безопасность

> Источник: [Безопасность | PHP Manual](https://www.php.net/manual/ru/security.php)

Безопасность в PHP — это не одна настройка, а набор практик: валидация ввода, безопасная работа с БД и файлами, сессии, актуальные версии.

## Общие принципы

| Принцип | Практика |
|---------|----------|
| Не доверять вводу | Валидировать и санитизировать `$_GET`, `$_POST`, файлы, заголовки |
| Least privilege | Минимальные права у PHP-процесса и БД-пользователя |
| Актуальный PHP | Следить за [security advisories](https://www.php.net/security) |
| Секреты вне кода | `.env`, не коммитить ключи и пароли |
| Ошибки | В production не показывать stack trace пользователю |

## Данные пользователя

```php
<?php

// XSS: экранировать вывод в HTML
echo htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Фильтрация
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
```

Никогда не вставляйте сырой ввод в HTML, SQL, shell, пути файлов.

## База данных

Используйте подготовленные выражения — не конкатенируйте SQL:

```php
<?php

$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$stmt->execute([$id]);

// Плохо:
// $pdo->query("SELECT * FROM users WHERE id = $id");
```

См. [Database Security](https://www.php.net/manual/ru/security.database.php).

## Сессии

> Источник: [Безопасность сессий](https://www.php.net/manual/ru/session.security.php)

```php
<?php

session_start([
    'cookie_httponly' => true,
    'cookie_secure' => true,      // только HTTPS
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);

session_regenerate_id(true); // после логина
```

Не храните чувствительные данные в cookie в открытом виде. ID сессии — только в cookie, не в URL.

## Файловая система

```php
<?php

// Опасный путь от пользователя
$userPath = $_GET['file'] ?? '';
// Нужна whitelist-проверка, realpath, запрет ..

$base = '/var/www/uploads';
$path = realpath($base . '/' . $userPath);
if ($path === false || !str_starts_with($path, $base)) {
    throw new RuntimeException('Invalid path');
}
```

Загрузки: проверяйте MIME/расширение, храните вне document root или с безопасными именами. См. [Filesystem Security](https://www.php.net/manual/ru/security.filesystem.php).

## Пароли

```php
<?php

$hash = password_hash($password, PASSWORD_DEFAULT);
password_verify($password, $hash);
```

Не используйте `md5` / `sha1` для паролей. FAQ: [Хеширование паролей](https://www.php.net/manual/ru/faq.passwords.php).

## Скрытие PHP и CGI

- Не раскрывайте версию PHP в заголовках без необходимости (`expose_php = Off`).
- При CGI/FPM следите за конфигурацией веб-сервера (document root → `public/`).
- Документация: [Installed as CGI](https://www.php.net/manual/ru/security.cgi-bin.php), [Apache module](https://www.php.net/manual/ru/security.apache.php).

## Laravel

В проектах на Laravel значительная часть уже закрыта: CSRF, XSS в Blade (`{{ }}`), Eloquent/Query Builder, хеширование. См. [Laravel Security](../laravel/security.md).

Связано: [Особенности](features.md), [Переменные](variables.md).
