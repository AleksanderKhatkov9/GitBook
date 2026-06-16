# Nginx

> Официальная документация: [nginx.org/en/docs](https://nginx.org/en/docs/)  
> Beginner's Guide: [nginx.org/en/docs/beginners_guide.html](https://nginx.org/en/docs/beginners_guide.html)

Nginx — веб-сервер и reverse proxy. В PHP/Laravel-проектах принимает HTTP-запросы и передаёт `.php`-файлы в PHP-FPM.

## Когда использовать

| Компонент | Роль |
|-----------|------|
| Nginx | Веб-сервер, статика, проксирование |
| PHP-FPM | Выполнение PHP-кода |
| Laravel | Приложение в `public/` |

Связанные разделы: [Linux](../linux/README.md), [Deployer](../deployer/README.md), [Vagrant](../vagrant/README.md).

---

## Установка (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nginx php-fpm
nginx -v
php-fpm8.3 -v
```

Запуск и автозагрузка:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

---

## Структура конфигурации

```
/etc/nginx/
├── nginx.conf              # главный конфиг
├── sites-available/        # все виртуальные хосты
│   └── my-app
├── sites-enabled/          # активные хосты (симлинки)
│   └── my-app -> ../sites-available/my-app
├── snippets/               # переиспользуемые фрагменты
└── conf.d/                 # дополнительные конфиги
```

| Путь | Назначение |
|------|------------|
| `sites-available/` | Хранилище конфигов сайтов |
| `sites-enabled/` | Подключённые сайты |
| `/var/log/nginx/` | Логи (`access.log`, `error.log`) |
| `/var/www/` | Типичная папка для проектов |

---

## Основные команды

```bash
# Проверить синтаксис конфига
sudo nginx -t

# Перезагрузить конфиг без остановки сервера
sudo systemctl reload nginx

# Полный перезапуск
sudo systemctl restart nginx

# Остановить / запустить
sudo systemctl stop nginx
sudo systemctl start nginx

# Логи в реальном времени
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

> После любого изменения конфига: `sudo nginx -t` → `sudo systemctl reload nginx`.

---

## Laravel — базовый виртуальный хост

Создайте конфиг:

```bash
sudo nano /etc/nginx/sites-available/my-app
```

```nginx
server {
    listen 80;
    server_name my-app.loc;
    root /var/www/my-app/public;

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Активировать сайт:

```bash
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Локальный домен (Windows + Homestead)

Добавьте в `C:\Windows\System32\drivers\etc\hosts`:

```
192.168.56.56 my-app.loc
```

---

## Laravel + Deployer

При деплое через [Deployer](../deployer/README.md) корень сайта указывает на `current/public` — симлинк на активный релиз:

```nginx
server {
    listen 80;
    server_name bzr-mediaspace.loc;
    root /var/www/bzr-mediaspace/current/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

| Параметр | Значение |
|----------|----------|
| `root` | `/var/www/<project>/current/public` |
| `fastcgi_pass` | Сокет PHP-FPM нужной версии (`php8.1-fpm.sock`) |

---

## Несколько сайтов на одном сервере

Каждый проект — отдельный файл в `sites-available/`:

```bash
sudo nano /etc/nginx/sites-available/bzr-analytics
sudo nano /etc/nginx/sites-available/bzr-hr
sudo ln -s /etc/nginx/sites-available/bzr-analytics /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/bzr-hr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

У каждого `server` блока свой `server_name` и `root`:

```nginx
server {
    listen 80;
    server_name bzr-analytics.loc;
    root /var/www/bzr-analytics/current/public;
    # ...
}

server {
    listen 80;
    server_name bzr-hr.loc;
    root /var/www/bzr-hr/current/public;
    # ...
}
```

---

## PHP-FPM

Nginx не выполняет PHP сам — передаёт запросы в PHP-FPM через Unix-сокет.

### Проверить сокет

```bash
ls /var/run/php/
# php8.1-fpm.sock  php8.3-fpm.sock
```

### Перезапуск PHP-FPM

```bash
sudo systemctl restart php8.3-fpm
sudo systemctl status php8.3-fpm
```

### Смена версии PHP

Если проект требует PHP 8.1, а в конфиге указан `php8.3-fpm.sock` — сайт упадёт с ошибкой 502.

1. Запустить нужный FPM: `sudo systemctl start php8.1-fpm`
2. Обновить `fastcgi_pass` в конфиге Nginx
3. `sudo nginx -t && sudo systemctl reload nginx`

Подробнее: [Vagrant — смена PHP](../vagrant/README.md#смена-версии-php).

---

## Загрузка файлов (upload)

Для форм с большими файлами увеличьте лимит в конфиге сайта:

```nginx
client_max_body_size 64M;
```

И в `php.ini`:

```ini
upload_max_filesize = 64M
post_max_size = 64M
```

После изменения `php.ini`:

```bash
sudo systemctl restart php8.3-fpm
```

---

## HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot автоматически добавит SSL-блок и настроит редирект HTTP → HTTPS.

Проверка автообновления:

```bash
sudo certbot renew --dry-run
```

---

## Reverse proxy (Node.js / API)

Если фронт на Next.js/Vue dev-server, а API на Laravel:

```nginx
server {
    listen 80;
    server_name app.loc;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Типичные ошибки

| Код / симптом | Причина | Решение |
|---------------|---------|---------|
| **502 Bad Gateway** | PHP-FPM не запущен или неверный сокет | `systemctl status php8.x-fpm`, проверить `fastcgi_pass` |
| **403 Forbidden** | Нет прав на `public/` | `chown -R www-data:www-data /var/www/project` |
| **404 на всех маршрутах** | Нет `try_files` | Добавить `try_files $uri $uri/ /index.php?$query_string` |
| **Скачивается PHP-файл** | Nginx не передаёт в FPM | Проверить блок `location ~ \.php$` |
| **413 Request Entity Too Large** | Маленький `client_max_body_size` | Увеличить в конфиге Nginx |
| **Сайт не открывается** | Конфиг не активирован | Симлинк в `sites-enabled/`, `nginx -t` |

### Диагностика 502

```bash
sudo tail -20 /var/log/nginx/error.log
sudo systemctl status php8.3-fpm
ls -la /var/run/php/php8.3-fpm.sock
```

---


## Копирования файлов 

```bash
cp /etc/nginx/sites-available/bzr_hr.conf /etc/nginx/sites-available/bzr_tech.conf
```
---


## Полезные ссылки

- [Nginx — Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html)
- [Laravel — Deployment](https://laravel.com/docs/deployment#nginx)
- [DigitalOcean — Nginx + PHP-FPM](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-22-04)
- [Certbot](https://certbot.eff.org/)
