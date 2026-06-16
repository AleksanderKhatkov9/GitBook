# Laravel + Next.js

Развёртывание fullstack-проектов: **Laravel (backend/API)** + **Next.js (frontend)** на одном домене.

Связанные разделы: [Nginx](../nginx/README.md), [Deployer](../deployer/README.md), [Laravel](../../laravel/README.md), [Next.js](../../js/next/README.md).

## Материалы

| Ресурс | Ссылка |
|--------|--------|
| Видео | [YouTube](https://www.youtube.com/watch?v=dB1tuF9ux0w) |
| Node.js на хостинге (hoster.by) | [hoster.by/help](https://hoster.by/help/unix-khosting-nastroyka/razvyertyvanie-prilozheniya-na-node-js/) |
| Видео | [YouTube](https://www.youtube.com/watch?v=ruuVPm8jveM) |
| Видео | [YouTube](https://www.youtube.com/watch?v=QIChbX4HBME) |
| Видео | [YouTube](https://www.youtube.com/watch?v=v0jz-g45mcM) |
| Next.js + Nginx (Stack Overflow) | [stackoverflow.com](https://stackoverflow.com/questions/64386737/how-to-deploy-nextjs-with-nginx) |
| Laravel + Next.js + Nginx | [stackoverflow.com](https://stackoverflow.com/questions/69203622/how-to-deploy-nextjs-laravel-project-with-nginx) |
| Next.js + Docker (официально) | [nextjs.org/docs](https://nextjs.org/docs/app/getting-started/deploying#templates-1) |
| Docker-пример Next.js | [github.com/vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/with-docker) |
| PM2 | [nodejsdev.ru/guides/webdraftt/pm2](https://nodejsdev.ru/guides/webdraftt/pm2/) |

---

## Архитектура

Типичная схема: Next.js — точка входа для пользователя, Laravel — REST API.

```
Браузер → Nginx (443/80)
              ├── /          → Next.js (порт 3000 или 3001)
              └── /api       → Laravel (PHP-FPM, public/)
```

| Компонент | Локально | На сервере |
|-----------|----------|------------|
| Laravel (backend) | `http://127.0.0.1:8000` | PHP-FPM через Nginx (`/api`) |
| Next.js (frontend) | `http://localhost:3000` | PM2 + Nginx proxy (`/`) |

Связь между фреймворками — **REST API**. Весь сайт для пользователя открывается через Next.js.

---

## Структура проекта

Пример **markitect.by**:

| Параметр | Значение |
|----------|----------|
| SSH | `ssh bzrby@93.125.99.11` |
| Директория | `/home/bzrby/markitect.by` |

```
markitect.by/
├── backend/     # Laravel
└── frontend/    # Next.js
```

Пример **marketis.by** (production):

```
/var/www/BZRMarketis/
├── backend/     # Laravel → public/
└── frontend/    # Next.js → PM2
```

---

## Переменные окружения

### Laravel (`backend/.env`)

```ini
APP_URL=http://markitect.by
```

### Next.js (`frontend/.env.local`)

```ini
NEXT_PUBLIC_BACKEND_URL=https://markitect.by
```

> `NEXT_PUBLIC_*` доступны в браузере. URL API должен совпадать с доменом, который видит пользователь.

---

## Nginx: Vagrant / локальная разработка

Базовый вариант: Laravel на корне, Next.js на `/next/`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Laravel
    root /var/www/bzrmarkitect/backend/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    # Next.js
    location /next/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Nginx: production (marketis.by)

Рекомендуемая схема: Next.js на `/`, Laravel API на `/api`, HTTPS.

```nginx
# HTTP → HTTPS
server {
    listen 80;
    server_name marketis.by www.marketis.by;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name marketis.by www.marketis.by;

    ssl_certificate /etc/nginx/ssl/marketis.by/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/marketis.by/key.pem;

    access_log /var/log/nginx/marketis.by_access.log;
    error_log /var/log/nginx/marketis.by_error.log notice;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Laravel API
    location ^~ /api {
        root /var/www/BZRMarketis/backend/public;
        index index.php;
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP
    location ~ \.php$ {
        root /var/www/BZRMarketis/backend/public;
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_index index.php;
    }

    # Файлы Laravel storage
    location /storage {
        alias /var/www/BZRMarketis/backend/storage/app/public;
        try_files $uri $uri/ =404;
    }

    location /uploads {
        client_max_body_size 2400M;
    }

    location @fallback {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        access_log off;
    }
}
```

После изменений:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Несколько Next.js на одном сервере (marketis.site)

Если порт **3000 занят** — укажите другой в `package.json` и Nginx.

`frontend/package.json`:

```json
{
  "name": "burgers",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "json-server": "json-server --watch db.json --port 5000",
    "serve": "concurrently \"npm run dev\" \"npm run json-server\""
  }
}
```

Nginx:

```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

---

## PM2 — менеджер процессов

Next.js на сервере запускают через [PM2](https://nodejsdev.ru/guides/webdraftt/pm2/), чтобы процесс перезапускался после падения или перезагрузки сервера.

### Основные команды

```bash
# Запуск
pm2 start npm --name marketis.by -- run start
pm2 start npm --name marketis.site -- run start

# Статус
pm2 status
pm2 list

# Перезапуск после сборки
pm2 restart all
pm2 restart marketis.xyz

# Удаление процесса
pm2 delete 3
```

Пример вывода `pm2 status`:

```
┌────┬────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name           │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ frontend       │ fork     │ 61   │ online    │ 0%       │ 63.8mb   │
│ 7  │ marketis.xyz   │ fork     │ 1    │ online    │ 0%       │ 64.2mb   │
└────┴────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### ecosystem.config.js

Конфиг PM2 для dev и production:

| Файл | Окружение |
|------|-----------|
| `ecosystem.dev.config.js` | develop |
| `ecosystem.prod.config.js` | production |

```bash
cd /var/www/BZRMarketisSite/frontend

# Production
pm2 start ecosystem.prod.config.js

# Develop
pm2 start ecosystem.dev.config.js
```

> На production **обязательно** используйте `ecosystem.prod.config.js`. Без него главная страница может «пропадать» при долгой загрузке API.

---

## Сборка и деплой на сервере

Типичный цикл обновления frontend:

```bash
cd /var/www/BZRMarketis/frontend
npm run build
pm2 restart all
# или конкретный процесс:
pm2 restart marketis.xyz
```

Backend (Laravel) — через [Deployer](../deployer/README.md) или вручную:

```bash
cd /var/www/BZRMarketis/backend
composer install --no-dev
php artisan migrate --force
php artisan config:cache
```

---

## getStaticProps vs getServerSideProps

| Метод | Когда использовать |
|-------|-------------------|
| `getStaticProps` | Данные редко меняются, нужна максимальная скорость (SSG) |
| `getServerSideProps` | Данные меняются часто, нужны актуальные данные при каждом запросе |
| Клиентский `fetch` | Динамика после загрузки страницы |

**Проблема на production:** главная страница исчезает при долгой загрузке API.

**Решение:** `ecosystem.prod.config.js` + `getServerSideProps` на главной — страница рендерится на сервере при каждом запросе и не зависит от таймаута статической генерации.

---

## Docker

Готовые шаблоны для Next.js:

- [Deploying — Templates](https://nextjs.org/docs/app/getting-started/deploying#templates-1)
- [with-docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

Для полного стека Laravel + Next.js обычно используют отдельные контейнеры: `nginx`, `php-fpm`, `node` (Next.js), `mysql`. См. [Docker](../docker/README.md).

---

## Чеклист деплоя

- [ ] `backend/.env` и `frontend/.env.local` настроены
- [ ] `npm run build` в `frontend/`
- [ ] PM2 запущен с `ecosystem.prod.config.js`
- [ ] Nginx: `/` → Next.js, `/api` → Laravel
- [ ] Версия PHP-FPM в Nginx совпадает с проектом
- [ ] SSL настроен (production)
- [ ] `pm2 restart` после каждой сборки frontend
