# Docker

> Официальная документация: [docs.docker.com](https://docs.docker.com/)

Docker — платформа для контейнеризации приложений.

## Полезные видео-курсы

| Название | Ссылка |
|----------|--------|
| Docker для начинающих (плейлист) | [YouTube](https://www.youtube.com/watch?v=fOQAeP3qkP0&list=PLd2_Os8Cj3t9Ert8mBlNl1UqwllyP1Tm_) |
| Docker Tutorial (плейлист) | [YouTube](https://www.youtube.com/watch?v=EbEZgdTOHzE&list=PLD5U-C5KK50XMCBkY0U-NLzglcRHzOwAg) |
| Короткий интенсивный гайд | [YouTube](https://www.youtube.com/watch?v=9e_FH3bDHBc&t=498s) |
| Docker Compose (плейлист) | [YouTube](https://www.youtube.com/watch?v=B1GJ04_8F2k&list=PLA0M1Bcd0w8zznkO6nZoG8pWfKGK0RqBo&index=2) |
| Docker Compose — продолжение | [YouTube](https://www.youtube.com/watch?v=4Yc9xfuEo2w&list=PLA0M1Bcd0w8zznkO6nZoG8pWfKGK0RqBo) |
| Очистка места на диске ПК | [YouTube](https://www.youtube.com/watch?v=0MY_WNSS_1A) |

## Официальная документация

- [Get Started — Docker Docs](https://docs.docker.com/get-started/)
- [Как использовать официальный образ Nginx](https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/)
- [PHP + Nginx в Docker](https://blog.devsense.com/2019/php-nginx-docker)
- [Где Docker хранит данные (форум)](https://forums.docker.com/t/docker-no-space-left-on-device/69205/3)
- [Очистка Docker на Windows (Habr)](https://habr.com/ru/articles/486200/)

## Установка

Скачайте [Docker Desktop](https://www.docker.com/products/docker-desktop/) для Windows.

```bash
docker --version
docker compose version
```

## Основные команды Docker

### Общие команды

| Команда | Описание |
|---------|----------|
| `docker --version` | Проверить версию Docker |
| `docker info` | Информация о системе Docker |
| `docker ps` | Список запущенных контейнеров |
| `docker ps -a` | Список всех контейнеров (включая остановленные) |
| `docker images` | Список образов |
| `docker system df` | Использование диска (images, containers, volumes, build cache) |

### Запуск контейнеров

| Команда | Описание |
|---------|----------|
| `docker run -d --name mycontainer nginx` | Запустить контейнер в фоне (detached) |
| `docker run -it ubuntu bash` | Запустить контейнер с интерактивным терминалом |
| `docker start <container_name>` | Запустить остановленный контейнер |
| `docker stop <container_name>` | Остановить контейнер |
| `docker restart <container_name>` | Перезапустить контейнер |
| `docker rm <container_name>` | Удалить остановленный контейнер |
| `docker logs -f <container_name>` | Смотреть логи в реальном времени |

### Работа внутри контейнера

| Команда | Описание |
|---------|----------|
| `docker exec -it <container_name> bash` | Зайти в контейнер через bash |
| `docker exec -it nginx bash` | Пример для nginx |
| `docker exec -it project_nginx bash` | Контейнер nginx проекта |
| `docker exec -it project_app bash` | Контейнер приложения проекта |

### Сборка и образы

| Команда | Описание |
|---------|----------|
| `docker build -t myimage .` | Собрать образ из Dockerfile |
| `docker build --no-cache -t myimage .` | Сборка без кэша |
| `docker pull nginx` | Скачать образ |
| `docker push username/image` | Загрузить свой образ |
| `docker volume ls` | Список volumes |
| `docker network ls` | Список сетей |
| `docker stats` | Статистика использования ресурсов контейнерами |

### Очистка

| Команда | Описание |
|---------|----------|
| `docker system prune` | Удалить неиспользуемые контейнеры, сети, dangling images и build cache |
| `docker system prune -a --volumes` | Полная очистка (все неиспользуемые образы и volumes) — **осторожно!** |
| `docker image prune -a` | Удалить все неиспользуемые образы |
| `docker container prune` | Удалить остановленные контейнеры |

## Docker Compose

| Команда | Описание |
|---------|----------|
| `docker compose up -d` | Запустить сервисы в фоне |
| `docker compose down` | Остановить и удалить контейнеры |
| `docker compose up -d --build` | Запустить с пересборкой образов |
| `docker compose build` | Собрать образы (без запуска) |
| `docker compose ps` | Статус сервисов |
| `docker compose logs -f` | Логи всех сервисов |
| `docker compose exec <service_name> bash` | Зайти в сервис (аналог `docker exec`) |

```bash
docker compose up -d
docker compose down
docker compose up -d --build
docker compose build
```

## Примеры Dockerfile

### Nginx

```dockerfile
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
# или для sites-available:
# COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### PHP-FPM (с расширениями)

```dockerfile
FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql
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

## Работа с проектом (пример WordPress / Nesoda.by)

Развёртывание сайта WP — см. задачу в YouGile: [Пример проекта Nesoda.by](https://ru.yougile.com/team/4114d7546b27/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0/Nesoda.by#PRI-214)

Управление приложением идёт через сервис `project_app`:

```bash
docker exec -it project_app bash
```

## WSL (Windows Subsystem for Linux)

Документация: [Базовые команды WSL](https://learn.microsoft.com/ru-ru/windows/wsl/basic-commands)

### Установка

PowerShell:

```powershell
wsl --install
wsl --list --online
```

### Полезные команды

| Команда | Описание |
|---------|----------|
| `wsl --shutdown` | Полностью выключить все дистрибутивы WSL |
| `wsl` | Войти в основной дистрибутив |

### Пользователь на рабочем Linux (Desktop)

| Параметр | Значение |
|----------|----------|
| user | `sasha` |
| password | `44100` |

## Где Docker хранит данные на Windows (WSL2)

| Расположение | Что хранится |
|--------------|--------------|
| `C:\Users\<ваше_имя>\AppData\Local\Docker\wsl\` | Основное хранилище образов и данных |
| `C:\Users\<ваше_имя>\AppData\Local\Temp` | Временные файлы Docker (может занимать много места) |
| `\\wsl$\docker-desktop-data\...` | Данные внутри WSL |

> **Обновление:** в `AppData\Local\Temp` может накапливаться много временных файлов Docker. Периодическая очистка может освободить десятки гигабайт.

### Настройки Docker Desktop

Если не хватает места на диске `C:` — перенесите хранилище Docker:

**Docker Desktop → Settings → Resources → Advanced → Disk image location**

Если проблема с памятью или диском — укажите другую папку для хранения данных Docker.

## Очистка места

### 1. Временные файлы

Очистите папки:

```
C:\Users\<ваше_имя>\AppData\Local\Docker
C:\Users\<ваше_имя>\AppData\Local\Temp
```

> Можно удалить содержимое папки Temp — это освободит место на диске.

### 2. Полная очистка Docker

```bash
docker system prune -a --volumes
```

### 3. Статистика использования диска

```bash
docker system df
```

Пример вывода:

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          15        4         12.52GB   10.23GB (81%)
Containers      4         4         536B      0B (0%)
Local Volumes   3         1         951.6MB   602.6MB (63%)
Build Cache     107       0         661.2MB   661.2MB
```

| Тип | Описание |
|-----|----------|
| **Images** | Общий размер образов, скачанных и собранных в системе |
| **Containers** | Объём rw-слоёв всех контейнеров |
| **Local Volumes** | Локальные тома, примонтированные к контейнерам |
| **Build Cache** | Кэш сборки (BuildKit, Docker 18.09+) |

**Совет:** если Docker «съедает» много места или памяти — используйте `docker system prune -a --volumes` и периодически очищайте папку `Temp`.
