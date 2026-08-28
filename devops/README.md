# DevOps

Инструменты для разработки, развёртывания и виртуализации окружения.

## Разделы

| Раздел | Описание |
|--------|----------|
| [Docker](docker/README.md) | Контейнеризация приложений |
| [Laravel + Docker Compose](docker/laravel-compose/README.md) | PHP-FPM, Nginx, MySQL, phpMyAdmin, Vite |
| [Vagrant](vagrant/README.md) | Виртуальные машины для разработки |
| [Linux](linux/README.md) | Команды и администрирование серверов |
| [Nginx](nginx/README.md) | Веб-сервер, виртуальные хосты, Laravel |
| [Deployer](deployer/README.md) | Деплой PHP/Laravel на сервер по SSH |
| [Laravel + Next.js](laravel-next/README.md) | Fullstack: API + frontend на одном домене |

## Когда что использовать

| Инструмент | Сценарий |
|------------|----------|
| Docker | Изолированные контейнеры, CI/CD, production |
| Vagrant | Полноценная VM, legacy-проекты, сложное окружение |
| Nginx | Веб-сервер для PHP/Laravel на VPS |
| Deployer | Деплой Laravel/PHP на VPS по SSH |
| [PM2](../Frontend/pm2/README.md) + Nginx | Next.js frontend на production-сервере |
| [PHP-FPM](../Backend/php/php-fpm.md) | Выполнение PHP за Nginx |

> В примерах Nginx и Linux — PHP **8.3**. Если сайт на 8.1, меняйте имя сокета и сервиса, а не копируйте 8.3 вслепую.
