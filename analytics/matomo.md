# Matomo

> Сайт: [matomo.org](https://matomo.org/) · Документация: [matomo.org/docs](https://matomo.org/docs/)  
> Актуально на: **10.09.2026** (Matomo 5.x / 6.x)

**Matomo** (ранее Piwik) — open-source веб-аналитика. Можно хостить у себя: данные не уходят в Google/Яндекс. Подходит при требованиях GDPR, корпоративных политиках и желании полного контроля.

## Что бесплатно

**Matomo On-Premise** — open-source аналитика с полным контролем над данными. Скачать и использовать можно **бесплатно навсегда**.

| Вариант | Стоимость | Когда выбирать |
|---------|-----------|----------------|
| **On-Premise** (этот документ) | Бесплатно; платите только за VPS/сервер | Нужен контроль данных, GDPR, свой хостинг |
| **Matomo Cloud** | Платный managed-хостинг | Не хотите администрировать сервер |
| **Плагины Marketplace** | Часть бесплатна, Premium — платные | Heatmaps, Session Recording и др. |
| **WordPress plugin** | Плагин для WP | Сайт на WordPress |
| **Tag Manager** | Встроенный аналог GTM | Теги без деплоя |

Официальные источники:

- [Скачать Matomo](https://matomo.org/download/)
- [Установка](https://matomo.org/docs/installation/)
- [Требования](https://matomo.org/faq/on-premise/matomo-requirements/)
- [Docker](https://matomo.org/faq/how-to-install/install-matomo-with-docker/)
- [On-Premise guide](https://matomo.org/guide/installation-maintenance/matomo-on-premise-self-hosted/)

Для Laravel / Next.js чаще: **On-Premise** на VPS или Docker, либо Cloud.

---

## Требования к серверу

### ПО

| Компонент | Минимум | Рекомендация |
|-----------|---------|--------------|
| ОС | Linux, Windows, FreeBSD, macOS Server | Ubuntu 22.04 / 24.04 LTS |
| Веб-сервер | Apache, Nginx, IIS, LiteSpeed | Nginx или Apache |
| PHP | 7.2.5+ (Matomo 4); для Matomo **6.0** — **PHP 8.1+** | Последний PHP 8.x |
| БД | MySQL 5.5+ / MariaDB; для Matomo **6.0** — **MySQL 8.0+** / **MariaDB 10.6+** | MySQL 8+ или MariaDB LTS |
| PHP-расширения | `pdo` + `pdo_mysql` (или `mysqli`) | + `curl`, `gd`, `cli`, `xml`, `mbstring` |

### Права пользователя MySQL

Нужны: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `INDEX`, `DROP`, `ALTER`, `CREATE TEMPORARY TABLES`, `LOCK TABLES` (желательно и `FILE`).

Отдельная БД и отдельный пользователь только для Matomo — обязательная практика безопасности.

### Рекомендуемые ресурсы

| Трафик (просмотры/мес) | Конфигурация |
|------------------------|--------------|
| до ~100 000 | 2 CPU, 2 GB RAM, 50 GB SSD (приложение + БД на одном сервере) |
| до ~1 000 000 | 4 CPU, 8 GB RAM, 250 GB SSD |
| до ~10 000 000 | Отдельные серверы app и DB (см. [требования](https://matomo.org/faq/on-premise/matomo-requirements/)) |

Для тестов и небольшого web/Android-проекта обычно хватает VPS 2 CPU / 2–4 GB RAM.

---

## Установка и настройка Matomo на Linux-сервере

Типичная схема: **Ubuntu 22.04/24.04** + Nginx + MySQL/MariaDB + PHP-FPM. Команды — от пользователя с `sudo`.

### 1. Подготовка сервера

Перед установкой Matomo необходимо подготовить сервер и установить основные компоненты:

* Nginx — веб-сервер;
* PHP — серверная часть приложения;
* PHP Extensions — необходимые расширения PHP;
* MySQL/MariaDB — база данных;
* системные утилиты для загрузки и распаковки Matomo (`wget`, `unzip`).

Проверить версию операционной системы:

```bash
lsb_release -a
```

Обновить список пакетов:

```bash
sudo apt update
```

Обновить установленные пакеты:

```bash
sudo apt upgrade -y
```

---

### 2. Установка Nginx

Если Nginx ещё не установлен:

```bash
sudo apt install nginx -y
```

Проверить статус:

```bash
sudo systemctl status nginx
```

При необходимости запустить Nginx:

```bash
sudo systemctl start nginx
```

Добавить Nginx в автозагрузку:

```bash
sudo systemctl enable nginx
```

Проверить конфигурацию:

```bash
sudo nginx -t
```

См. также [Nginx](../devops/nginx/README.md).

---

### 3. Установка PHP

Matomo работает через PHP, поэтому необходимо установить PHP и необходимые расширения.

```bash
sudo apt install php php-fpm php-mysql php-curl php-gd php-cli php-xml php-mbstring php-zip php-bcmath php-intl php-fileinfo -y
```

Проверить установленную версию PHP:

```bash
php -v
```

Проверить состояние PHP-FPM (имя сервиса зависит от версии PHP):

```bash
sudo systemctl status php8.1-fpm
# или, например: sudo systemctl status php8.3-fpm
```

> Версия `php8.1-fpm` зависит от PHP на сервере. Для Matomo **6.0** нужен **PHP 8.1+**. Актуальный сокет смотрите в `/run/php/`.

---

### 4. Установка MySQL/MariaDB

Matomo использует базу данных для хранения статистики и настроек.

Если MySQL ещё не установлен:

```bash
sudo apt install mysql-server -y
```

Альтернатива — MariaDB:

```bash
sudo apt install mariadb-server -y
```

Проверить статус:

```bash
sudo systemctl status mysql
# для MariaDB часто: sudo systemctl status mariadb
```

Добавить в автозагрузку:

```bash
sudo systemctl enable mysql
```

---

### 5. Создание базы данных для Matomo

Подключиться к MySQL:

```bash
sudo mysql
```

Создать отдельную базу данных:

```sql
CREATE DATABASE matomo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Создать пользователя:

```sql
CREATE USER 'matomo'@'localhost' IDENTIFIED BY 'СЛОЖНЫЙ_ПАРОЛЬ';
```

Предоставить пользователю минимально необходимые права:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER,
      CREATE TEMPORARY TABLES, LOCK TABLES ON matomo.* TO 'matomo'@'localhost';
```

Обновить права и выйти:

```sql
FLUSH PRIVILEGES;
EXIT;
```

После этого у Matomo будут отдельная база данных и отдельный пользователь.

---

### 6. Загрузка Matomo

Скачивайте **только** с официального источника ([builds.matomo.org](https://builds.matomo.org/)).

Перейти в директорию сайтов:

```bash
cd /var/www/
```

Скачать архив:

```bash
sudo wget https://builds.matomo.org/matomo.zip
```

Если `wget` не установлен:

```bash
sudo apt install wget -y
```

Распаковать архив:

```bash
sudo unzip matomo.zip
```

Если `unzip` отсутствует:

```bash
sudo apt install unzip -y
```

После распаковки должна появиться директория:

```text
/var/www/matomo
```

Рекомендуемый URL:

* поддомен: `https://analytics.example.com/` или `https://matomo.example.com/`
* локально: `http://matomo.loc/`
* либо путь: `https://example.com/matomo/`

---

### 7. Настройка прав доступа

Веб-сервер должен читать все файлы; запись нужна в основном в `tmp/` и `config/`:

```bash
sudo chown -R www-data:www-data /var/www/matomo
sudo find /var/www/matomo -type d -exec chmod 755 {} \;
sudo find /var/www/matomo -type f -exec chmod 644 {} \;
sudo chmod -R 775 /var/www/matomo/tmp /var/www/matomo/config
```

Подробнее: [права веб-сервера](https://matomo.org/faq/on-premise/how-to-configure-web-server-permissions/).

---

### 8. Создание конфигурации Nginx

Создать конфигурационный файл:

```bash
sudo nano /etc/nginx/sites-available/matomo
```

Пример конфигурации:

```nginx
server {
    listen 80;
    server_name matomo.example.com;

    root /var/www/matomo;
    index index.php;

    access_log /var/log/nginx/matomo.access.log;
    error_log  /var/log/nginx/matomo.error.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # путь к сокету зависит от версии PHP
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # запрет прямого доступа к служебным каталогам
    location ~ ^/(config|tmp|core|lang) {
        deny all;
        return 403;
    }

    location ~ /\.ht {
        deny all;
    }

    location ~ /\. {
        deny all;
    }
}
```

Замените `matomo.example.com` на используемый домен или локальный адрес (`matomo.loc`).

Проверить версию PHP-FPM и сокет:

```bash
ls /run/php/
```

Например, для PHP 8.1:

```text
/run/php/php8.1-fpm.sock
```

---

### 9. Включение конфигурации Matomo

Создать символическую ссылку из `sites-available` в `sites-enabled`:

```bash
sudo ln -s /etc/nginx/sites-available/matomo /etc/nginx/sites-enabled/matomo
```

Проверить конфигурацию Nginx:

```bash
sudo nginx -t
```

Если ошибок нет, перезагрузить Nginx:

```bash
sudo systemctl reload nginx
```

При необходимости проверить активные конфигурации:

```bash
ls -la /etc/nginx/sites-enabled/
```

---

### 10. Настройка локального домена

Если Matomo устанавливается для локального использования (например `matomo.loc`), добавьте соответствие домена IP-адресу сервера.

На Linux-клиенте:

```bash
sudo nano /etc/hosts
```

Для локального сервера:

```text
127.0.0.1 matomo.loc
```

Если Matomo на удалённом сервере:

```text
IP_СЕРВЕРА matomo.loc
```

Проверить разрешение имени:

```bash
ping matomo.loc
curl http://matomo.loc
```

---

### 11. HTTPS (Let's Encrypt) — для продакшена

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d matomo.example.com
```

После SSL в `config/config.ini.php` (появится после установки) обычно задают:

```ini
[General]
force_ssl = 1
assume_secure_protocol = 1
```

---

### 12. Запуск веб-установки Matomo

Открыть Matomo в браузере:

```text
http://matomo.loc
```

или:

```text
https://matomo.example.com
```

Откроется мастер установки. На первом этапе Matomo проверит системные требования:

* версию PHP;
* необходимые PHP-расширения;
* права доступа к файлам;
* наличие необходимых функций PHP;
* возможность работы с базой данных.

Если все требования выполнены, можно продолжить установку.

---

### 13. Подключение базы данных

На этапе настройки базы данных указать параметры, созданные ранее:

| Поле | Значение |
|------|----------|
| Database Server | `localhost` или `127.0.0.1` |
| Database Username | `matomo` |
| Database Password | `СЛОЖНЫЙ_ПАРОЛЬ` |
| Database Name | `matomo` |
| Database Table Prefix | `matomo_` |

После заполнения формы Matomo проверит подключение к MySQL и создаст необходимые таблицы.

---

### 14. Создание администратора

Создать административную учётную запись (Super User):

* логин администратора;
* пароль;
* email.

Эта учётная запись используется для входа в административную панель Matomo. Сохраните логин и пароль.

---

### 15. Добавление сайта в Matomo

После создания администратора добавить сайт, статистику которого требуется отслеживать:

* название сайта;
* URL сайта;
* часовой пояс;
* валюта;
* дополнительные параметры отслеживания.

Matomo выдаст JavaScript-код отслеживания. Пример:

```html
<script>
var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function() {
    var u="https://matomo.example.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);

    var d=document, g=d.createElement('script'),
        s=d.getElementsByTagName('script')[0];

    g.async=true;
    g.src=u+'matomo.js';
    s.parentNode.insertBefore(g,s);
})();
</script>
```

Код добавить на отслеживаемый сайт, обычно перед закрывающим тегом `</head>`.

---

### 16. Auto-archiving (cron) — обязательно для продакшена

Без cron Matomo пересчитывает отчёты при каждом открытии дашборда — это нагружает БД.

```bash
sudo crontab -u www-data -e
```

Добавьте (путь и URL замените):

```cron
5 * * * * /usr/bin/php /var/www/matomo/console core:archive --url=https://matomo.example.com/ > /dev/null 2>&1
```

Затем в UI: **Administration → System → General settings** → снимите галочку  
**Archive reports when viewed from the browser**.

Документация: [auto-archiving](https://matomo.org/faq/on-premise/how-to-set-up-auto-archiving-of-your-reports/).

---

### 17. Проверка работы

После установки проверить:

1. Открывается ли Matomo в браузере.
2. Работает ли авторизация.
3. Подключается ли Matomo к базе данных.
4. Загружается ли административная панель.
5. Корректно ли работает JavaScript-код отслеживания.
6. Появляются ли посещения в статистике (**Visitors → Real-time**).
7. Нет ли ошибок в Nginx.
8. Нет ли ошибок PHP-FPM.

Логи Nginx:

```bash
sudo tail -f /var/log/nginx/error.log
# или свой файл: /var/log/nginx/matomo.error.log
```

Логи PHP-FPM:

```bash
sudo journalctl -u php8.1-fpm -f
```

Статус сервисов:

```bash
sudo systemctl status nginx
sudo systemctl status php8.1-fpm
sudo systemctl status mysql
```

Все необходимые сервисы должны быть в состоянии `active (running)`.

---

### 18. Итог классической установки

После выполнения шагов на сервере должны быть настроены:

* Matomo;
* Nginx;
* PHP-FPM;
* MySQL/MariaDB;
* отдельная база данных и пользователь БД;
* виртуальный хост Nginx;
* административная учётная запись Matomo;
* отслеживаемый сайт и JavaScript-код аналитики;
* (для продакшена) HTTPS и cron `core:archive`.

### Обновление (без Docker)

1. Сделайте бэкап БД и каталога `/var/www/matomo` (особенно `config/`).
2. Скачайте новый `matomo.zip`, распакуйте поверх (не затирая `config/` и пользовательские плагины без нужды) либо следуйте [официальному гайду обновления](https://matomo.org/faq/on-premise/how-do-i-update-matomo/).
3. Откройте UI — Matomo предложит обновить схему БД.

---

## Установка через Docker

Docker удобен для быстрого развёртывания и воспроизводимости. Официальный образ: [`matomo`](https://hub.docker.com/_/matomo) ([FAQ](https://matomo.org/faq/how-to-install/install-matomo-with-docker/)). См. также [Docker](../devops/docker/README.md).

> **Важно:** образы Docker удобны, но Matomo официально отмечает, что security-аудит относится к коду Matomo, а не к системным пакетам в образе. Для жёстких требований безопасности — свой образ / патчинг базового.

### Одноконтейнерный режим (только тест)

Нужна **внешняя** БД. Для продакшена не подходит (нет БД и архивации «из коробки»).

```bash
docker run -d -p 8080:80 --name matomo-test matomo
```

Откройте `http://SERVER_IP:8080` и пройдите мастер, указав существующую MySQL/MariaDB.

### Docker Compose (рекомендуется)

Создайте каталог, например `/opt/matomo`:

```bash
sudo mkdir -p /opt/matomo
cd /opt/matomo
```

Файл `docker-compose.yml` (на основе [официального примера](https://matomo.org/faq/how-to-install/install-matomo-with-docker/)):

```yaml
services:
  db:
    image: mariadb:11
    container_name: matomo-db
    restart: unless-stopped
    command: --max-allowed-packet=64MB
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: matomo
      MYSQL_USER: matomo
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - matomo-db-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 10s
      timeout: 5s
      retries: 5

  matomo:
    image: matomo:latest
    container_name: matomo-app
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      MATOMO_DATABASE_HOST: db
      MATOMO_DATABASE_ADAPTER: mysql
      MATOMO_DATABASE_TABLES_PREFIX: matomo_
      MATOMO_DATABASE_USERNAME: matomo
      MATOMO_DATABASE_PASSWORD: ${MYSQL_PASSWORD}
      MATOMO_DATABASE_DBNAME: matomo
      PHP_MEMORY_LIMIT: 512M
    volumes:
      - matomo-app-data:/var/www/html
    depends_on:
      db:
        condition: service_healthy

  cron:
    image: matomo:latest
    container_name: matomo-cron
    restart: unless-stopped
    environment:
      PHP_MEMORY_LIMIT: 512M
    volumes:
      - matomo-app-data:/var/www/html
    entrypoint: >
      /bin/sh -c "while true; do
        php /var/www/html/console core:archive --url=$${MATOMO_URL:-http://matomo/} || true;
        sleep 3600;
      done"
    depends_on:
      - matomo

volumes:
  matomo-db-data:
  matomo-app-data:
```

Файл `.env` (не коммитьте в git):

```env
MYSQL_ROOT_PASSWORD=смените_root_пароль
MYSQL_PASSWORD=смените_пароль_matomo
```

Запуск:

```bash
docker compose up -d
docker compose ps
docker compose logs -f matomo
```

Откройте `http://SERVER_IP:8080` и завершите мастер установки.

**Параметры БД в мастере:**

| Поле | Значение |
|------|----------|
| Database server | `db` |
| Login | `matomo` |
| Password | из `.env` (`MYSQL_PASSWORD`) |
| Database name | `matomo` |

После установки в UI отключите browser-triggered archiving (см. раздел про cron выше).

### Nginx reverse proxy + HTTPS перед Docker

На хосте Nginx проксирует на контейнер (порт `8080` только на localhost — безопаснее).

В `docker-compose.yml` замените публикацию порта:

```yaml
    ports:
      - "127.0.0.1:8080:80"
```

Пример `/etc/nginx/sites-available/matomo`:

```nginx
server {
    listen 80;
    server_name analytics.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo certbot --nginx -d analytics.example.com
```

В контейнере отредактируйте конфиг (том `matomo-app-data` → `/var/www/html/config/config.ini.php`):

```bash
docker exec -it matomo-app bash
# или правьте файл через volume на хосте
```

Добавьте в секцию `[General]`:

```ini
[General]
trusted_hosts[] = "analytics.example.com"
force_ssl = 1
assume_secure_protocol = 1
proxy_client_headers[] = HTTP_X_FORWARDED_FOR
proxy_host_headers[] = HTTP_X_FORWARDED_HOST
```

Иначе возможны бесконечные редиректы 302 или неверный URL в трекинге.

### Обновление Docker-установки

Данные сохраняются в named volumes (`matomo-db-data`, `matomo-app-data`).

```bash
cd /opt/matomo
docker compose pull
docker compose up -d
```

Затем откройте UI Matomo — при необходимости подтвердите обновление БД.

**Бэкап перед обновлением:**

```bash
# БД
docker exec matomo-db mariadb-dump -u matomo -p"${MYSQL_PASSWORD}" matomo > matomo-backup-$(date +%F).sql

# конфиг приложения (через volume / копирование из контейнера)
docker cp matomo-app:/var/www/html/config ./matomo-config-backup
```

### Полезные команды Docker

```bash
# статус
docker compose ps

# логи
docker compose logs -f matomo
docker compose logs -f db

# ручная архивация
docker exec matomo-app php /var/www/html/console core:archive --url=https://analytics.example.com/

# shell в контейнере
docker exec -it matomo-app bash

# остановка / удаление контейнеров (volumes не трогать!)
docker compose down
# опасная команда — удалит данные:
# docker compose down -v
```

### Вариант FPM + Nginx (высокая нагрузка)

Для продакшена с большим трафиком официальный репозиторий образов поддерживает тег `matomo:fpm` (PHP-FPM на порту 9000) + отдельный контейнер Nginx. Apache-образ (`matomo:latest`) проще для старта; FPM — для масштабирования. См. [matomo-org/docker](https://github.com/matomo-org/docker).

---

## После установки: трекинг

### Сайт (JavaScript)

В мастере или в **Administration → Websites → Tracking Code** скопируйте сниппет. Пример:

```html
<!-- Matomo -->
<script>
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u = "//analytics.example.com/";
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
    })();
</script>
<!-- End Matomo Code -->
```

Замените `analytics.example.com` и `SiteId` на свои. Вставляйте в layout перед `</head>` или через `next/script`.

### Laravel (Blade)

`.env`:

```env
MATOMO_URL=https://analytics.example.com/
MATOMO_SITE_ID=1
```

```blade
{{-- resources/views/partials/matomo.blade.php --}}
@if(config('services.matomo.site_id'))
<script>
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u = @json(config('services.matomo.url'));
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', @json(config('services.matomo.site_id'))]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
</script>
@endif
```

`config/services.php`:

```php
'matomo' => [
    'url' => env('MATOMO_URL'),
    'site_id' => env('MATOMO_SITE_ID'),
],
```

### Next.js (App Router)

```tsx
import Script from 'next/script';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export function Matomo() {
  if (!MATOMO_URL || !MATOMO_SITE_ID) return null;

  return (
    <Script id="matomo" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u = "${MATOMO_URL}";
          _paq.push(['setTrackerUrl', u + 'matomo.php']);
          _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  );
}
```

Для SPA / client-side навигации в Next.js после смены маршрута вызывайте:

```js
window._paq?.push(['setCustomUrl', window.location.href]);
window._paq?.push(['setDocumentTitle', document.title]);
window._paq?.push(['trackPageView']);
```

### Android-приложение

1. В Matomo создайте сайт/приложение и запомните **Site ID** и URL Matomo (`https://analytics.example.com/`).
2. Подключите [Matomo Android SDK](https://developer.matomo.org/guides/android-sdk).
3. Инициализируйте трекер URL-ом сервера и `siteId`; отправляйте экраны и события.

Сервер Matomo должен быть доступен с устройств пользователей по HTTPS (не `localhost` на телефоне).

### События и цели

```js
// Цель (Goal ID из админки Matomo)
_paq.push(['trackGoal', 1]);

// Событие
_paq.push(['trackEvent', 'Form', 'Submit', 'Contact']);

// E-commerce (упрощённо)
_paq.push(['addEcommerceItem', 'SKU1', 'Product', 'Category', 99.99, 1]);
_paq.push(['trackEcommerceOrder', 'ORDER-1', 99.99]);
```

Цели создаются в **Goals** в интерфейсе Matomo (URL, событие, ручной вызов).

### Проверка, что данные идут

1. Откройте сайт.
2. Matomo → **Visitors → Real-time** — визит должен появиться.
3. В браузере: Network → запросы к `matomo.php` / `piwik.php` / `matomo.js` (CORS, HTTPS, блокировщики).
4. На Android: логи SDK в тестовой среде.

## Приватность (GDPR)

| Опция | Зачем |
|-------|-------|
| Анонимизация IP | Меньше персональных данных |
| Cookie-less tracking | Без cookies (ниже точность) |
| Opt-out iframe | Ссылка «отключить аналитику» |
| Consent | Грузить трекер только после согласия |

Matomo → **Administration → Privacy** — готовые настройки под GDPR.

## Основные отчёты

| Раздел | Содержание |
|--------|------------|
| Visitors | Визиты, устройства, локации |
| Behavior | Страницы, переходы, события |
| Acquisition | Источники, кампании (UTM) |
| Goals | Конверсии |
| Ecommerce | Заказы (если включено) |

---

## Безопасность (чеклист)

- [ ] HTTPS (Let's Encrypt или свой сертификат)
- [ ] Сильные пароли БД и Super User
- [ ] Отдельный MySQL-пользователь только на БД `matomo`
- [ ] Закрыть прямой доступ к `config/`, `tmp/` (Nginx/Apache rules)
- [ ] Регулярные бэкапы БД + `config.ini.php`
- [ ] Firewall: наружу 80/443; порт Docker `8080` только на `127.0.0.1`
- [ ] Обновлять Matomo и ОС
- [ ] Ознакомиться с [security tips](https://matomo.org/faq/how-to-secure-matomo/)
- [ ] Для GDPR: настройки приватности в Matomo (анонимизация IP, cookie/cookieless, согласие)
- [ ] Tracking code в layout; Real-time показывает визиты
- [ ] URL и Site ID в `.env`
- [ ] Cron `core:archive` включён, browser archiving выключен

---

## Troubleshooting

| Симптом | Что проверить |
|---------|----------------|
| Пустой экран / 502 | PHP-FPM socket, `nginx -t`, логи `/var/log/nginx/`, `docker compose logs` |
| Мастер установки снова после рестарта | Не смонтирован/удалён volume с `/var/www/html` (особенно `config/`) |
| Нет прав записи | `chown www-data`, права на `tmp/` и `config/` |
| Бесконечный 302 за reverse proxy | `assume_secure_protocol = 1`, `force_ssl = 1`, `trusted_hosts`, заголовки `X-Forwarded-*` |
| Медленный UI | Включён cron `core:archive`, отключён browser archiving |
| Нет данных в отчётах | Tracking code / SDK, Site ID, блокировщики рекламы, CORS/HTTPS mixed content |
| Docker: нет связи с БД | Hostname `db`, пароль из `.env`, `depends_on` + healthcheck |

---

## Сравнение: сервер vs Docker

| Критерий | Классическая установка | Docker Compose |
|----------|------------------------|----------------|
| Контроль стека | Полный (PHP, Nginx вручную) | Изолированные контейнеры |
| Скорость старта | Дольше | Быстрее |
| Обновление | Ручная замена файлов | `docker compose pull && up -d` |
| Бэкап | mysqldump + файлы | dump из контейнера + volumes |
| Продакшен | Отлично при правильной настройке | Отлично при proxy + SSL + volumes + cron |
| Локальный тест | Тяжелее | Удобнее |

**Практическая рекомендация:** для VPS с одним проектом — Docker Compose + Nginx на хосте + Certbot; для shared hosting без Docker — классическая установка из zip.

---

## Краткая шпаргалка

**Сервер**

```bash
# пакеты → БД → unzip в /var/www/matomo → Nginx → certbot → браузер-мастер → cron core:archive
```

**Docker**

```bash
cd /opt/matomo
# создать docker-compose.yml и .env
docker compose up -d
# открыть :8080 → мастер (host=db) → proxy+SSL → отключить browser archiving
```

---

## Связанные материалы

| Тема | Ссылка |
|------|--------|
| Скачать | https://matomo.org/download/ |
| Установка | https://matomo.org/docs/installation/ |
| Требования | https://matomo.org/faq/on-premise/matomo-requirements/ |
| Docker | https://matomo.org/faq/how-to-install/install-matomo-with-docker/ |
| Auto-archive | https://matomo.org/faq/on-premise/how-to-set-up-auto-archiving-of-your-reports/ |
| Android SDK | https://developer.matomo.org/guides/android-sdk |
| Безопасность | https://matomo.org/faq/how-to-secure-matomo/ |
| [Яндекс Метрика](yandex.md) | Облако для RU |
| [Google Analytics](google.md) | Облако Google |
| [Nginx](../devops/nginx/README.md) | Vhost / reverse proxy |
| [Docker](../devops/docker/README.md) | Контейнерный деплой |

[← К оглавлению раздела](README.md)
