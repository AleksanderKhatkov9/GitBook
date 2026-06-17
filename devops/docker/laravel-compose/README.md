# Laravel + Docker Compose

Локальное окружение для Laravel-проекта: **PHP-FPM**, **Nginx**, **MySQL**, **phpMyAdmin**, **Node.js** (Vite).

Пример на основе проекта **Nexora** — стек подходит для любого Laravel-приложения с фронтендом на Vite.

Связанные разделы: [Docker](../README.md), [Nginx](../../nginx/README.md), [Laravel](../../../Backend/laravel/README.md), [MySQL](../../../mysql/README.md).

---

## Архитектура

```
Браузер
   │
   ▼
nginx:80 ──fastcgi──► app (php:8.2-fpm) :9000
   │                      │
   │                      ├── Vite dev-server :5173
   │                      └── Laravel /var/www/html
   │
phpMyAdmin:8080 ────────► db (mysql:8.0) :3306
```

| Сервис | Контейнер | Порт (хост) | Назначение |
|--------|-----------|-------------|------------|
| `app` | `nexora_app` | `5173` | PHP-FPM, Composer, Node.js, Vite |
| `nginx` | `nexora_nginx` | `80` | Веб-сервер, `public/` |
| `db` | `nexora_db` | `127.0.0.1:8102` | MySQL 8.0 |
| `phpmyadmin` | `nexora_phpmyadmin` | `127.0.0.1:8080` | Админка БД |

---

## Структура проекта

```
project/
├── docker/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   └── nginx/
│       └── default.conf
├── docker-compose.yml
└── nexora-app/              ← Laravel-приложение
    ├── .env
    ├── public/
    └── ...
```

> Имя папки приложения (`nexora-app`) можно заменить на своё — обновите пути в `docker-compose.yml`.

---

## Dockerfile

`docker/Dockerfile`:

```dockerfile
FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        unzip \
        libzip-dev \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
    && docker-php-ext-install \
        bcmath \
        mbstring \
        pdo_mysql \
        zip \
        exif \
        pcntl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh \
    && usermod -u 1000 www-data \
    && groupmod -g 1000 www-data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```

**Что установлено:**

| Компонент | Версия / пакеты |
|-----------|-----------------|
| PHP | 8.2-fpm |
| Расширения | `bcmath`, `mbstring`, `pdo_mysql`, `zip`, `exif`, `pcntl` |
| Node.js | 22.x (для Vite / npm) |
| Composer | 2.x |

`sed -i 's/\r$//'` — убирает Windows-переносы строк (`CRLF`) из `entrypoint.sh`, иначе контейнер не стартует.

`usermod` / `groupmod` — выравнивает UID/GID `www-data` с хостом (1000), чтобы не было проблем с правами на `storage/` и `bootstrap/cache/`.

---

## entrypoint.sh

`docker/entrypoint.sh` — скрипт запуска контейнера `app`:

```bash
#!/bin/sh
set -e

cd /var/www/html

# Зависимости PHP (том vendor_data монтируется отдельно)
if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist
fi

# Зависимости Node (том node_modules_data монтируется отдельно)
if [ ! -d node_modules ]; then
    npm ci
fi

# Ключ приложения и миграции — при первом запуске
php artisan key:generate --force 2>/dev/null || true
php artisan migrate --force 2>/dev/null || true

# Vite dev-server (порт 5173 проброшен в compose)
npm run dev -- --host 0.0.0.0 &

exec php-fpm
```

Права на выполнение:

```bash
chmod +x docker/entrypoint.sh
```

---

## docker-compose.yml

```yaml
services:

  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: nexora_app
    working_dir: /var/www/html
    restart: unless-stopped

    volumes:
      - ./nexora-app:/var/www/html:cached
      - vendor_data:/var/www/html/vendor
      - node_modules_data:/var/www/html/node_modules

    env_file:
      - ./nexora-app/.env

    environment:
      APP_ENV: ${APP_ENV:-local}
      APP_DEBUG: ${APP_DEBUG:-false}
      DB_HOST: db
      DB_PORT: 3306
      DB_DATABASE: ${DB_DATABASE:-nexora_db}
      DB_USERNAME: root
      DB_PASSWORD: ${DB_PASSWORD:-root}
      MAIL_MAILER: ${MAIL_MAILER:-log}

    depends_on:
      db:
        condition: service_healthy
    ports:
      - "5173:5173"
    healthcheck:
      test: ["CMD-SHELL", "php-fpm -t 2>/dev/null || pgrep php-fpm"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 120s

    networks:
      - nexora

  nginx:
    image: nginx:1.27-alpine
    container_name: nexora_nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nexora-app:/var/www/html:cached
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro

    depends_on:
      app:
        condition: service_healthy
    networks:
      - nexora

  db:
    image: mysql:8.0
    container_name: nexora_db
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_DATABASE: ${DB_DATABASE:-nexora_db}
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD:-root}
    ports:
      - "127.0.0.1:8102:3306"

    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 10s
      retries: 5
      start_period: 30s

    networks:
      - nexora

  phpmyadmin:
    image: phpmyadmin:5.2
    container_name: nexora_phpmyadmin
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"

    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_USER: root
      PMA_PASSWORD: ${DB_PASSWORD:-root}

    depends_on:
      db:
        condition: service_healthy

    networks:
      - nexora


volumes:
  db_data:
  vendor_data:
  node_modules_data:

networks:
  nexora:
    driver: bridge
```

**Тома:**

| Том | Зачем |
|-----|-------|
| `db_data` | Данные MySQL между перезапусками |
| `vendor_data` | `vendor/` не перезаписывается с хоста |
| `node_modules_data` | `node_modules/` изолированы от Windows/macOS |

`depends_on` с `condition: service_healthy` — Nginx стартует только после готовности PHP-FPM, `app` ждёт MySQL.

---

## Nginx

`docker/nginx/default.conf`:

```nginx
server {
    listen 80;
    server_name nexora.loc localhost _;

    root /var/www/html/public;
    index index.php index.html;

    client_max_body_size 32M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(?:css|js|jpg|jpeg|gif|png|svg|ico|webp|ttf|otf|woff|woff2)$ {
        expires 7d;
        access_log off;
        add_header Cache-Control "public";
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

`fastcgi_pass app:9000` — имя сервиса из `docker-compose.yml`, не `localhost`.

---

## .env Laravel

Минимальные настройки в `nexora-app/.env`:

```ini
APP_NAME=Nexora
APP_ENV=local
APP_DEBUG=true
APP_URL=http://nexora.loc

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=nexora_db
DB_USERNAME=root
DB_PASSWORD=root

MAIL_MAILER=log
```

`DB_HOST=db` — имя сервиса Docker, не `127.0.0.1`.

Для Vite:

```ini
VITE_DEV_SERVER_URL=http://localhost:5173
```

---

## Быстрый старт

### 1. Установить Docker

[Docker Desktop](https://www.docker.com/products/docker-desktop/) для Windows / macOS, или Docker Engine на Linux.

```bash
docker --version
docker compose version
```

### 2. Подготовить Laravel-проект

```bash
# в папке nexora-app
composer create-project laravel/laravel .
# или скопировать существующий проект
```

### 3. Записать `hosts`

```
127.0.0.1   nexora.loc
```

Windows: `C:\Windows\System32\drivers\etc\hosts`  
Linux/macOS: `/etc/hosts`

### 4. Запустить стек

```bash
docker compose up -d --build
```

### 5. Проверить

| URL | Что открывается |
|-----|-----------------|
| http://nexora.loc | Laravel-приложение |
| http://localhost:5173 | Vite dev-server (HMR) |
| http://127.0.0.1:8080 | phpMyAdmin |
| `127.0.0.1:8102` | MySQL (клиент на хосте) |

---

## Полезные команды

```bash
# Статус контейнеров
docker compose ps

# Логи
docker compose logs -f app
docker compose logs -f nginx

# Artisan внутри контейнера
docker compose exec app php artisan migrate
docker compose exec app php artisan cache:clear

# Composer / npm
docker compose exec app composer require package/name
docker compose exec app npm install

# Остановить
docker compose down

# Остановить и удалить тома (БД, vendor, node_modules)
docker compose down -v
```

---

## Типичные проблемы

| Симптом | Решение |
|---------|---------|
| `502 Bad Gateway` | `docker compose logs app` — PHP-FPM не запустился; проверьте `entrypoint.sh` и CRLF |
| Нет прав на `storage/` | `docker compose exec app chown -R www-data:www-data storage bootstrap/cache` |
| MySQL connection refused | Дождитесь `healthy` у `db`: `docker compose ps` |
| Vite не подключается | Порт `5173` проброшен; в `.env` — `VITE_DEV_SERVER_URL` |
| Медленно на Windows | Том `:cached` уже включён; `vendor` и `node_modules` вынесены в именованные тома |

---

## Отличие от Laravel Sail

| | Docker Compose (этот стек) | [Laravel Sail](../README.md#laravel-sail) |
|--|---------------------------|-------------------------------------------|
| Контроль | Полный — свои Dockerfile и Nginx | Готовый образ от Laravel |
| Nginx | Отдельный контейнер | Встроен в Sail или через proxy |
| Кастомизация | Любые сервисы и версии PHP | Через `docker-compose.yml` Sail |

Sail удобен для быстрого старта; отдельный compose — когда нужен точный контроль над окружением (как в Nexora).
