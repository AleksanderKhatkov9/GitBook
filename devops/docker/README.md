# Docker

> Официальная документация: [docs.docker.com](https://docs.docker.com/)

Docker — платформа для контейнеризации приложений.

## Установка

Скачайте [Docker Desktop](https://www.docker.com/products/docker-desktop/) для Windows.

```bash
docker --version
docker compose version
```

## Быстрый старт

`Dockerfile`:

```dockerfile
FROM php:8.3-fpm
RUN docker-php-ext-install pdo pdo_mysql
WORKDIR /var/www
COPY . .
```

`docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/var/www
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_ROOT_PASSWORD: secret
    ports:
      - "3306:3306"
```

```bash
docker compose up -d
```

Подробный стек для Laravel (PHP-FPM, Nginx, MySQL, phpMyAdmin, Vite): [Laravel + Docker Compose](laravel-compose/README.md).

## Laravel Sail

```bash
composer require laravel/sail --dev
php artisan sail:install
./vendor/bin/sail up
```
