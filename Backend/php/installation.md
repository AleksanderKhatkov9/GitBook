# Установка и настройка

> Источник: [Установка и настройка | PHP Manual](https://www.php.net/manual/ru/install.php)

## Способы установки

| Платформа | Вариант |
|-----------|---------|
| Windows | [windows.php.net](https://windows.php.net/download/), Laravel Herd, XAMPP, Scoop/Chocolatey |
| Linux | Пакеты дистрибутива (`php`, `php-fpm`, `php-cli`) |
| macOS | Homebrew, Laravel Herd |
| Docker | Официальный образ [`php`](https://hub.docker.com/_/php) |

Проверка:

```bash
php -v
php -m   # загруженные модули
php --ini
```

> В примерах команд — **PHP 8.3**. Пакеты и сокеты на сервере могут быть `php8.1` / `php8.2` — подставьте версию проекта. Подробно: [PHP-FPM](php-fpm.md).

## PHP-FPM и веб-сервер

Для production обычно: Nginx/Apache → PHP-FPM → приложение.

Document root должен указывать на `public/` (в Laravel), а не на корень проекта.

Подробно: [PHP-FPM](php-fpm.md) — пулы, воркеры, сокет, команды, типичные ошибки. Официально: [FastCGI Process Manager](https://www.php.net/manual/ru/install.fpm.php).

## Composer

> [Знакомство с Composer](https://www.php.net/manual/ru/install.composer.php)

Менеджер зависимостей PHP:

```bash
composer -V
composer init
composer require vendor/package
composer install
composer dump-autoload
```

Сайт: [getcomposer.org](https://getcomposer.org/).

## Конфигурация runtime

> [Конфигурация времени выполнения](https://www.php.net/manual/ru/configuration.php)

Основные места:

| Источник | Назначение |
|----------|------------|
| `php.ini` | Глобальные настройки |
| `.user.ini` / `ini_set()` | Переопределение в runtime (где разрешено) |
| FPM pool config | Настройки воркеров |

Часто настраивают:

```ini
memory_limit = 256M
upload_max_filesize = 20M
post_max_size = 25M
max_execution_time = 60
display_errors = Off
log_errors = On
date.timezone = Europe/Minsk
```

Список директив: [php.ini directives](https://www.php.net/manual/ru/ini.list.php).

## Расширения (extensions)

Нужные модули зависят от проекта: `pdo_mysql`, `mbstring`, `openssl`, `curl`, `intl`, `redis` и т.д.

```bash
# пример Ubuntu/Debian
sudo apt install php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-curl
```

PECL: [Установка PECL-модулей](https://www.php.net/manual/ru/install.pecl.php).  
PIE (новый установщик расширений): [Введение в PIE](https://www.php.net/manual/ru/install.pie.php).

## Рекомендуемый стек для Laravel

См. [Laravel — Установка](../laravel/installation.md) и [Docker Compose](../../devops/docker/laravel-compose/README.md).

Далее: [Введение](introduction.md) · [Синтаксис](syntax.md).
