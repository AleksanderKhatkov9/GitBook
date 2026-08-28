# Особенности PHP

> Источник: [Особенности | PHP Manual](https://www.php.net/manual/ru/features.php)

Практические возможности языка для веба и CLI: cookies, сессии, загрузки, удалённые файлы, соединения, командная строка.

## Cookies

> [Cookies](https://www.php.net/manual/ru/features.cookies.php)

```php
<?php

setcookie('theme', 'dark', [
    'expires' => time() + 86400 * 30,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);

$theme = $_COOKIE['theme'] ?? 'light';
```

Cookie отправляются в заголовках — вызывайте `setcookie` до любого вывода. Не храните секреты в cookies без шифрования/подписи.

## Сессии

> [Сессии](https://www.php.net/manual/ru/session.php)

```php
<?php

session_start();

$_SESSION['user_id'] = 42;
echo $_SESSION['user_id'];

session_destroy();
```

Данные сессии хранятся на сервере; клиент получает session id (обычно cookie `PHPSESSID`). См. [Безопасность сессий](security.md).

## Загрузка файлов

> [Загрузка файлов](https://www.php.net/manual/ru/features.file-upload.php)

HTML:

```html
<form method="post" enctype="multipart/form-data">
  <input type="file" name="avatar">
  <button type="submit">Upload</button>
</form>
```

PHP:

```php
<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['avatar'] ?? null;
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        $tmp = $file['tmp_name'];
        $name = basename($file['name']);
        // Проверить тип/размер, затем:
        move_uploaded_file($tmp, __DIR__ . '/uploads/' . $name);
    }
}
```

Лимиты: `upload_max_filesize`, `post_max_size` в `php.ini`.

## HTTP-аутентификация

> [HTTP authentication](https://www.php.net/manual/ru/features.http-auth.php)

```php
<?php

$user = $_SERVER['PHP_AUTH_USER'] ?? null;
$pass = $_SERVER['PHP_AUTH_PW'] ?? null;

if ($user !== 'admin' || $pass !== 'secret') {
    header('WWW-Authenticate: Basic realm="App"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Unauthorized';
    exit;
}
```

В приложениях чаще используют сессии / JWT / OAuth через фреймворк.

## Удалённые файлы и потоки

> [Using remote files](https://www.php.net/manual/ru/features.remote-files.php)

При `allow_url_fopen=On` можно читать URL как файлы:

```php
<?php

$html = file_get_contents('https://example.com');
```

Осторожно с пользовательскими URL (SSRF). Предпочтительнее HTTP-клиенты (cURL, Guzzle) с таймаутами.

Протоколы и обёртки: [file://, http://, php://, …](https://www.php.net/manual/ru/wrappers.php).

## Обработка соединений

> [Connection handling](https://www.php.net/manual/ru/features.connection-handling.php)

```php
<?php

ignore_user_abort(true);
connection_aborted(); // клиент отключился?
```

Полезно для длинных задач, когда браузер закрыл вкладку.

## Постоянные соединения с БД

> [Persistent Database Connections](https://www.php.net/manual/ru/features.persistent-connections.php)

`PDO::ATTR_PERSISTENT` и аналоги переиспользуют соединение между запросами. В [PHP-FPM](php-fpm.md) даёт выигрыш, но требует аккуратной настройки (состояние сессии БД, лимиты).

## CLI

> [Command line usage](https://www.php.net/manual/ru/features.commandline.php)

```bash
php script.php arg1 arg2
php -r "echo PHP_VERSION;"
php -S localhost:8000 -t public
```

```php
<?php

// $argc — число аргументов, $argv — массив
// $argv[0] — имя скрипта
fwrite(STDOUT, "Hello CLI\n");
fwrite(STDERR, "Error\n");
```

Встроенный сервер (`php -S`) — только для разработки.

## Сборка мусора

> [Garbage Collection](https://www.php.net/manual/ru/features.gc.php)

PHP использует подсчёт ссылок + циклический GC. Обычно вмешиваться не нужно:

```php
<?php

gc_enabled();
gc_collect_cycles();
```

Связано: [Безопасность](security.md), [Переменные](variables.md).
