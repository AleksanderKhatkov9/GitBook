# PHP-FPM

> Источник: [FastCGI Process Manager](https://www.php.net/manual/ru/install.fpm.php) · [Конфигурация FPM](https://www.php.net/manual/ru/install.fpm.configuration.php)

PHP-FPM (FastCGI Process Manager) — менеджер процессов PHP. Держит пул воркеров, которые выполняют PHP-код по запросу веб-сервера. В production это стандартный способ запуска Laravel и любого PHP-сайта за Nginx.

Nginx **не выполняет** PHP сам: он отдаёт статику и проксирует `.php` в FPM через Unix-сокет или TCP.

```
Браузер
   │
   ▼
Nginx  ──fastcgi──►  PHP-FPM (пул воркеров)
                         │
                         └── Laravel / public/index.php
```

Связанные разделы: [Установка PHP](installation.md), [Nginx](../../devops/nginx/README.md), [Linux](../../devops/linux/README.md), [Docker Compose](../../devops/docker/laravel-compose/README.md).

> В примерах — **PHP 8.3**. На сервере подставьте свою версию в пакете, сервисе и сокете (`php8.1-fpm.sock`). Несовпадение с `fastcgi_pass` в Nginx даёт **502**.

---

## CLI и FPM — разные процессы

| Процесс | Когда используется | Конфиг |
|---------|--------------------|--------|
| `php` (CLI) | Artisan, Composer, cron, очереди | `/etc/php/8.3/cli/php.ini` |
| `php-fpm` | HTTP-запросы через Nginx | `/etc/php/8.3/fpm/php.ini` + pool |

Изменение `php.ini` для CLI **не влияет** на сайт. После правок FPM-конфига нужен перезапуск `php8.3-fpm`, а не только Nginx.

Проверка, какой ini использует FPM:

```bash
php-fpm8.3 -i | grep "Loaded Configuration File"
```

---

## Установка (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install php8.3-fpm php8.3-cli php8.3-mysql php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip

php-fpm8.3 -v
sudo systemctl enable --now php8.3-fpm
sudo systemctl status php8.3-fpm
```

Версию в имени пакета (`php8.3-fpm`) подставьте под проект. Сокет должен совпадать с `fastcgi_pass` в Nginx.

---

## Файлы конфигурации

```
/etc/php/8.3/fpm/
├── php-fpm.conf          # глобальный конфиг FPM
├── php.ini               # runtime PHP для HTTP
└── pool.d/
    └── www.conf          # пул воркеров (обычно один — www)
```

| Файл | Назначение |
|------|------------|
| `php-fpm.conf` | Логи FPM, include пулов, аварийный рестарт |
| `pool.d/www.conf` | Пользователь, сокет, число воркеров, лимиты |
| `php.ini` | `memory_limit`, `upload_max_filesize`, OPcache |

Проверка синтаксиса перед перезапуском:

```bash
sudo php-fpm8.3 -t
```

---

## Пул воркеров (`www.conf`)

Пул — набор процессов, которые обрабатывают запросы. По умолчанию один пул `www`.

Типичные директивы:

```ini
[www]
user = www-data
group = www-data

listen = /run/php/php8.3-fpm.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660

pm = dynamic
pm.max_children = 20
pm.start_servers = 4
pm.min_spare_servers = 2
pm.max_spare_servers = 8
pm.max_requests = 500
```

| Директива | Смысл |
|-----------|--------|
| `user` / `group` | От какого пользователя крутятся воркеры. Для Laravel — `www-data` (права на `storage/` и `bootstrap/cache`) |
| `listen` | Unix-сокет или `127.0.0.1:9000` |
| `pm` | Как масштабировать воркеры |
| `pm.max_children` | Жёсткий потолок процессов. Главный рычаг по RAM |
| `pm.max_requests` | После N запросов воркер перезапускается (защита от утечек памяти) |

Несколько сайтов на одном сервере можно развести по пулам: отдельный `.conf` в `pool.d/`, свой сокет и свой `user`.

Пример второго пула `/etc/php/8.3/fpm/pool.d/site2.conf`:

```ini
[site2]
user = www-data
group = www-data
listen = /run/php/php8.3-fpm-site2.sock
listen.owner = www-data
listen.group = www-data

pm = dynamic
pm.max_children = 10
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 4
```

В Nginx этого сайта: `fastcgi_pass unix:/run/php/php8.3-fpm-site2.sock;`. Затем `sudo php-fpm8.3 -t && sudo systemctl reload php8.3-fpm`.

---

## Режимы `pm`

| Режим | Поведение | Когда выбирать |
|-------|-----------|----------------|
| `dynamic` | Держит запас свободных воркеров, создаёт/убивает по нагрузке | Обычный production |
| `static` | Всегда ровно `pm.max_children` процессов | Стабильная нагрузка, предсказуемая RAM |
| `ondemand` | Процессы создаются по запросу, в простое их нет | Слабый VPS, редкий трафик |

Оценка `pm.max_children`:

```
max_children ≈ доступная_RAM_для_PHP / средний_размер_воркера
```

Ориентир для Laravel: 40–80 МБ на воркер. При 2 ГБ RAM под PHP разумно начать с `max_children = 20`, а не со значения «на глаз». Слишком большое число → OOM-kill → **502 Bad Gateway**. См. [Linux — ошибка 502](../../devops/linux/README.md).

---

## Сокет или TCP

| `listen` | Пример | Когда |
|----------|--------|--------|
| Unix-сокет | `/run/php/php8.3-fpm.sock` | Nginx и FPM на одной машине (быстрее, обычный вариант) |
| TCP | `127.0.0.1:9000` | FPM в другом контейнере / хосте |

В Nginx сокет и TCP выглядят так:

```nginx
# сокет
fastcgi_pass unix:/run/php/php8.3-fpm.sock;

# TCP (Docker: сервис app на порту 9000)
fastcgi_pass 127.0.0.1:9000;
```

Путь сокета должен **совпадать** с `listen` в пуле. Имена бывают `/run/php/` и `/var/run/php/` — это один каталог (симлинк).

Проверка:

```bash
ls -l /run/php/
# php8.3-fpm.sock  php8.3-fpm.pid
```

Подробный виртуальный хост Laravel: [Nginx](../../devops/nginx/README.md).

---

## Команды

```bash
# статус и логи
sudo systemctl status php8.3-fpm
sudo journalctl -u php8.3-fpm -n 50 --no-pager
sudo tail -f /var/log/php8.3-fpm.log

# конфиг без даунтайма (новый воркеры, старые доживают запросы)
sudo systemctl reload php8.3-fpm

# полный перезапуск (нужен после смены php.ini, сокета, расширений)
sudo systemctl restart php8.3-fpm

# остановить / запустить
sudo systemctl stop php8.3-fpm
sudo systemctl start php8.3-fpm
```

| Действие | Команда |
|----------|---------|
| Смена пула (`www.conf`) | `php-fpm8.3 -t` → `reload` |
| Смена `php.ini`, модулей, сокета | `restart` |
| Смена только Nginx | `nginx -t` → `reload nginx` (FPM не трогать) |

---

## php.ini, загрузки, OPcache

Частые директивы в `/etc/php/8.3/fpm/php.ini`:

```ini
memory_limit = 256M
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 60
display_errors = Off
log_errors = On
date.timezone = Europe/Minsk
```

Лимит тела запроса нужно поднять **и** в Nginx (`client_max_body_size`), иначе будет 413. См. [Nginx — загрузка файлов](../../devops/nginx/README.md).

OPcache работает именно в FPM: воркеры живут между запросами и держат скомпилированный код в памяти. После деплоя Laravel обычно хватает `php artisan optimize`; если опкод «залип» — `reload` / `restart` FPM.

---

## Status и slowlog

В `www.conf`:

```ini
pm.status_path = /status
ping.path = /ping

slowlog = /var/log/php8.3-fpm-slow.log
request_slowlog_timeout = 5s
```

В Nginx ограничьте `/status` локальной сетью — там число активных процессов, очередь и uptime. Slowlog показывает стек запросов дольше `request_slowlog_timeout` (удобно ловить тяжёлые SQL в Laravel).

```nginx
location ~ ^/(status|ping)$ {
    access_log off;
    allow 127.0.0.1;
    deny all;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass unix:/run/php/php8.3-fpm.sock;
}
```

---

## Laravel

1. `root` в Nginx — `public/`, не корень репозитория.
2. Владелец файлов совпадает с `user` пула:

```bash
sudo chown -R www-data:www-data /var/www/my-app/storage /var/www/my-app/bootstrap/cache
sudo chmod -R ug+rwx /var/www/my-app/storage /var/www/my-app/bootstrap/cache
```

3. Очереди и scheduler — это **CLI**, не FPM: [очереди](../laravel/queues.md), cron на `schedule:run` — [Artisan](../laravel/artisan.md).
4. При деплое через [Deployer](../../devops/deployer/README.md) `root` указывает на `current/public`; после релиза достаточно `reload` FPM, если не менялись расширения.

---

## Несколько версий PHP

На одном сервере могут стоять `php8.1-fpm` и `php8.3-fpm`. Каждый сайт в Nginx указывает свой сокет.

```bash
sudo systemctl start php8.1-fpm
sudo systemctl start php8.3-fpm
ls /run/php/
```

Если в конфиге `php8.3-fpm.sock`, а проект на 8.1 — будет **502**. Смена версии: [Vagrant](../../devops/vagrant/README.md#смена-версии-php), [Nginx — PHP-FPM](../../devops/nginx/README.md).

---

## Типичные ошибки

| Симптом | Причина | Что сделать |
|---------|---------|-------------|
| **502 Bad Gateway** | FPM не запущен, неверный сокет, OOM | `systemctl status php8.x-fpm`, `ls /run/php/`, логи Nginx |
| **504 Gateway Timeout** | Воркер не уложился в `fastcgi_read_timeout` / `max_execution_time` | Увеличить таймауты или ускорить запрос |
| Скачивается `.php` | Nginx не проксирует в FPM | Блок `location ~ \.php$` |
| Нет эффекта от `php.ini` | Правили CLI-ini или не перезапустили FPM | Файл в `fpm/php.ini` + `restart php8.x-fpm` |
| `Permission denied` на `storage/` | Воркер не `www-data` или чужие права | `chown`/`chmod` как выше |
| 502 после деплоя / пика нагрузки | OOM-kill воркеров | Уменьшить `pm.max_children`, добавить swap |

Диагностика 502:

```bash
sudo tail -20 /var/log/nginx/error.log
sudo systemctl status php8.3-fpm
ls -la /run/php/php8.3-fpm.sock
dmesg | grep -i "php-fpm\|oom"
```

---

## Полезные ссылки

- [PHP Manual — FPM](https://www.php.net/manual/ru/install.fpm.php)
- [Конфигурация пула](https://www.php.net/manual/ru/install.fpm.configuration.php)
- [Laravel — Nginx](https://laravel.com/docs/deployment#nginx)
- [Nginx в этой книге](../../devops/nginx/README.md)
- [Laravel + Docker Compose (php-fpm)](../../devops/docker/laravel-compose/README.md)
