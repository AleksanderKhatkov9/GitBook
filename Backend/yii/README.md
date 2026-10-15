# Yii 3

> Официальная документация: [yiisoft.github.io/docs](https://yiisoft.github.io/docs/) · русский перевод (неполный): [docs/ru](https://yiisoft.github.io/docs/ru/)

Yii 3 — PHP-фреймворк из отдельных пакетов `yiisoft/*`. Запрос проходит через middleware, зависимости приходят из DI-контейнера. Yii 2 — предыдущая ветка; в гайде есть переход с 1.1 и с 2.

Ниже — карта [документации](https://yiisoft.github.io/docs/). Ссылки ведут на английский гайд: он полнее русского перевода.

Документация состоит из трёх частей:

| Часть | Зачем |
|-------|--------|
| [Guide](https://yiisoft.github.io/docs/guide/) | Полный гайд по фреймворку |
| [Cookbook](https://yiisoft.github.io/docs/cookbook/) | Рецепты: HTTP-клиент, веб-серверы, деплой |
| [Internals](https://yiisoft.github.io/docs/internals/) | Для тех, кто пишет код самого Yii |

## С чего начать

| Шаг | Статья |
|-----|--------|
| Что это | [About Yii](https://yiisoft.github.io/docs/guide/intro/what-is-yii.html) |
| Требования | [Prerequisites](https://yiisoft.github.io/docs/guide/start/prerequisites.html) |
| Новый проект | [Creating a Project](https://yiisoft.github.io/docs/guide/start/creating-project.html) |
| Первая страница | [Saying Hello](https://yiisoft.github.io/docs/guide/start/hello.html) |
| Демо | [Demo Applications](https://yiisoft.github.io/docs/guide/start/demo-apps.html) |

С Yii 2: [Upgrading from Version 2](https://yiisoft.github.io/docs/guide/intro/upgrade-from-v2.html). С 1.1: [Upgrading from Version 1.1](https://yiisoft.github.io/docs/guide/intro/upgrade-from-v1.html).

## Guide

### Введение (Introduction)

| Статья | О чём |
|--------|--------|
| [About Yii](https://yiisoft.github.io/docs/guide/intro/what-is-yii.html) | Что такое Yii 3 и чем он отличается от Yii 2 |
| [Upgrading from Version 1.1](https://yiisoft.github.io/docs/guide/intro/upgrade-from-v1.html) | Переход с Yii 1.1 |
| [Upgrading from Version 2](https://yiisoft.github.io/docs/guide/intro/upgrade-from-v2.html) | Переход с Yii 2 |

### Старт (Getting Started)

| Статья | О чём |
|--------|--------|
| [Prerequisites](https://yiisoft.github.io/docs/guide/start/prerequisites.html) | PHP, Composer, что нужно до установки |
| [Creating a Project](https://yiisoft.github.io/docs/guide/start/creating-project.html) | Шаблон приложения и первый запуск |
| [Application Workflow](https://yiisoft.github.io/docs/guide/start/workflow.html) | Как запрос проходит через приложение |
| [Saying Hello](https://yiisoft.github.io/docs/guide/start/hello.html) | Первая страница |
| [Working with Forms](https://yiisoft.github.io/docs/guide/start/forms.html) | Форма и обработка отправки |
| [Working with Databases](https://yiisoft.github.io/docs/guide/start/databases.html) | Подключение к БД |
| [Generating Code with Gii](https://yiisoft.github.io/docs/guide/start/gii.html) | Генератор кода Gii |
| [Looking Ahead](https://yiisoft.github.io/docs/guide/start/looking-ahead.html) | Куда читать дальше |
| [Demo Applications](https://yiisoft.github.io/docs/guide/start/demo-apps.html) | Готовые демо-приложения |

### Понятия (Key Concepts)

| Статья | О чём |
|--------|--------|
| [Aliases](https://yiisoft.github.io/docs/guide/concept/aliases.html) | Короткие пути вроде `@root` |
| [Autoloading](https://yiisoft.github.io/docs/guide/concept/autoloading.html) | Как Composer подключает классы |
| [Configuration](https://yiisoft.github.io/docs/guide/concept/configuration.html) | Конфиг приложения |
| [DI Container](https://yiisoft.github.io/docs/guide/concept/di-container.html) | Внедрение зависимостей |
| [Events](https://yiisoft.github.io/docs/guide/concept/events.html) | События и слушатели |
| [Immutability](https://yiisoft.github.io/docs/guide/concept/immutability.html) | Неизменяемые объекты |

### Структура приложения (Application Structure)

| Статья | О чём |
|--------|--------|
| [Overview](https://yiisoft.github.io/docs/guide/structure/overview.html) | Из каких частей состоит приложение |
| [Entry Script](https://yiisoft.github.io/docs/guide/structure/entry-script.html) | Входной скрипт `index.php` |
| [Application](https://yiisoft.github.io/docs/guide/structure/application.html) | Объект приложения |
| [Module](https://yiisoft.github.io/docs/guide/structure/module.html) | Модуль |
| [Action](https://yiisoft.github.io/docs/guide/structure/action.html) | Действие, которое обрабатывает маршрут |
| [Middleware](https://yiisoft.github.io/docs/guide/structure/middleware.html) | Слой до и после действия |

### Пакеты (Packages)

| Статья | О чём |
|--------|--------|
| [Using Packages](https://yiisoft.github.io/docs/guide/structure/package.html) | Как подключать пакеты Yii |
| [Designing Packages](https://yiisoft.github.io/docs/guide/structure/designing-packages.html) | Как оформить свой пакет |

### Запросы (Handling Requests)

| Статья | О чём |
|--------|--------|
| [Routing](https://yiisoft.github.io/docs/guide/runtime/routing.html) | Маршруты |
| [Request](https://yiisoft.github.io/docs/guide/runtime/request.html) | Входящий HTTP-запрос |
| [Response](https://yiisoft.github.io/docs/guide/runtime/response.html) | Ответ |
| [Sessions](https://yiisoft.github.io/docs/guide/runtime/sessions.html) | Сессия |
| [Cookies](https://yiisoft.github.io/docs/guide/runtime/cookies.html) | Куки |
| [Handling Errors](https://yiisoft.github.io/docs/guide/runtime/handling-errors.html) | Ошибки и страницы ошибок |
| [Logging](https://yiisoft.github.io/docs/guide/runtime/logging.html) | Логи |

### REST

| Статья | О чём |
|--------|--------|
| [Quick Start](https://yiisoft.github.io/docs/guide/rest/quick-start.html) | Минимальное REST API |

### Безопасность (Security)

| Статья | О чём |
|--------|--------|
| [Overview](https://yiisoft.github.io/docs/guide/security/overview.html) | Обзор средств безопасности |
| [Authentication](https://yiisoft.github.io/docs/guide/security/authentication.html) | Кто вошёл |
| [Authorization](https://yiisoft.github.io/docs/guide/security/authorization.html) | Что ему можно |
| [Working with Passwords](https://yiisoft.github.io/docs/guide/security/passwords.html) | Хеширование паролей |
| [Cryptography](https://yiisoft.github.io/docs/guide/security/cryptography.html) | Шифрование и подписи |
| [Trusted Request](https://yiisoft.github.io/docs/guide/security/trusted-request.html) | Доверенные прокси и заголовки |
| [Best Practices](https://yiisoft.github.io/docs/guide/security/best-practices.html) | Практики по безопасности |

### Кэш (Caching)

| Статья | О чём |
|--------|--------|
| [Overview](https://yiisoft.github.io/docs/guide/caching/overview.html) | Зачем кэш и какие бывают |
| [Data Caching](https://yiisoft.github.io/docs/guide/caching/data.html) | Кэш данных |

### Базы данных (Working with Databases)

| Статья | О чём |
|--------|--------|
| [Yii DB](https://github.com/yiisoft/db/blob/master/docs/guide/en/README.md) | Пакет доступа к БД |
| [Active Record](https://github.com/yiisoft/active-record/blob/master/README.md) | Модели и запросы |
| [Database Migrations](https://yiisoft.github.io/docs/guide/databases/db-migrations.html) | Миграции схемы |

### Представления (Views)

| Статья | О чём |
|--------|--------|
| [Views](https://yiisoft.github.io/docs/guide/views/view.html) | Шаблоны |
| [Assets](https://yiisoft.github.io/docs/guide/views/asset.html) | CSS и JS как пакеты ассетов |
| [Scripts, Styles and Meta Tags](https://yiisoft.github.io/docs/guide/views/script-style-meta.html) | Подключение скриптов, стилей и meta |
| [Template Engines](https://yiisoft.github.io/docs/guide/views/template-engines.html) | Движки шаблонов |
| [View Injections](https://yiisoft.github.io/docs/guide/views/view-injections.html) | Данные, которые попадают в шаблон |
| [Widgets](https://yiisoft.github.io/docs/guide/views/widget.html) | Виджеты |

### Тесты (Testing)

| Статья | О чём |
|--------|--------|
| [Testing Overview](https://yiisoft.github.io/docs/guide/testing/overview.html) | Какие тесты есть |
| [Testing Environment Setup](https://yiisoft.github.io/docs/guide/testing/environment-setup.html) | Как поднять окружение |
| [Unit Tests](https://yiisoft.github.io/docs/guide/testing/unit.html) | Модульные тесты |
| [Functional Tests](https://yiisoft.github.io/docs/guide/testing/functional.html) | Функциональные тесты |
| [End-to-End Tests](https://yiisoft.github.io/docs/guide/testing/end-to-end.html) | Сквозные тесты |
| [Static Analysis and Mutation Testing](https://yiisoft.github.io/docs/guide/testing/quality-tools.html) | Статический анализ и мутационные тесты |

### Практика (Tutorial)

| Статья | О чём |
|--------|--------|
| [Console Applications](https://yiisoft.github.io/docs/guide/tutorial/console-applications.html) | Консольные команды |
| [Mailing](https://yiisoft.github.io/docs/guide/tutorial/mailing.html) | Письма |
| [Performance Tuning](https://yiisoft.github.io/docs/guide/tutorial/performance-tuning.html) | Ускорение ответа |
| [Using with Event Loop](https://yiisoft.github.io/docs/guide/tutorial/using-with-event-loop.html) | Цикл событий |
| [Using Yii with FrankenPHP](https://yiisoft.github.io/docs/guide/tutorial/using-yii-with-frankenphp.html) | FrankenPHP |
| [Using Yii with Rapira](https://yiisoft.github.io/docs/guide/tutorial/using-yii-with-rapira.html) | Rapira |
| [Using Yii with RoadRunner](https://yiisoft.github.io/docs/guide/tutorial/using-yii-with-roadrunner.html) | RoadRunner |
| [Using Yii with Swoole](https://yiisoft.github.io/docs/guide/tutorial/using-yii-with-swoole.html) | Swoole |
| [Docker in Application Templates](https://yiisoft.github.io/docs/guide/tutorial/docker.html) | Docker в шаблонах |
| [Internationalization](https://yiisoft.github.io/docs/guide/tutorial/i18n.html) | Переводы, i18n |

### Хелперы (Helpers)

Отдельные пакеты, не статьи гайда:

| Пакет | О чём |
|-------|--------|
| [Arrays](https://github.com/yiisoft/arrays/) | Массивы |
| [Files](https://github.com/yiisoft/files/) | Файлы |
| [Html](https://github.com/yiisoft/html/) | HTML |
| [Json](https://github.com/yiisoft/json) | JSON |
| [Network Utilities](https://github.com/yiisoft/network-utilities/) | Сеть |
| [VarDumper](https://github.com/yiisoft/var-dumper) | Дамп переменных |
| [Strings](https://github.com/yiisoft/strings) | Строки |

Словарь терминов: [Glossary](https://yiisoft.github.io/docs/guide/glossary.html).

## Cookbook

| Статья | О чём |
|--------|--------|
| [Preface](https://yiisoft.github.io/docs/cookbook/preface.html) | Как устроены рецепты |
| [Making HTTP Requests](https://yiisoft.github.io/docs/cookbook/making-http-requests.html) | Исходящие HTTP-запросы |
| [Using htmx](https://yiisoft.github.io/docs/cookbook/using-htmx-for-partial-reloads.html) | Частичная перезагрузка страницы |
| [Disabling CSRF Protection](https://yiisoft.github.io/docs/cookbook/disabling-csrf-protection.html) | Когда отключают CSRF |
| [Sentry Integration](https://yiisoft.github.io/docs/cookbook/sentry-integration.html) | Ошибки в Sentry |
| [Custom Migration Template](https://yiisoft.github.io/docs/cookbook/custom-migration-template.html) | Свой шаблон миграции |
| [Using Yii in Third-Party Applications](https://yiisoft.github.io/docs/cookbook/using-yii-in-third-party-apps.html) | Yii внутри чужого приложения |
| [Third-Party Integrations](https://yiisoft.github.io/docs/cookbook/third-party-integrations/) | Сторонние интеграции |

Веб-серверы: [общее](https://yiisoft.github.io/docs/cookbook/configuring-webservers/general.html), [Apache](https://yiisoft.github.io/docs/cookbook/configuring-webservers/apache.html), [Nginx](https://yiisoft.github.io/docs/cookbook/configuring-webservers/nginx.html), [Nginx Unit](https://yiisoft.github.io/docs/cookbook/configuring-webservers/nginx-unit.html).

Деплой: [Docker Swarm](https://yiisoft.github.io/docs/cookbook/deployment/docker-swarm.html), [Angie Docker Proxy](https://yiisoft.github.io/docs/cookbook/deployment/angie-docker-proxy.html), [автомасштабирование](https://yiisoft.github.io/docs/cookbook/deployment/autoscaling.html), [миграции при rolling update](https://yiisoft.github.io/docs/cookbook/deployment/rolling-update-migrations.html).

## Internals

Правила для разработчиков фреймворка, не для прикладного кода: пакеты, кодстайл, релизы, ревью. Оглавление: [Internals](https://yiisoft.github.io/docs/internals/).

## Связанные разделы

[PHP](../php/README.md) · [Laravel](../laravel/README.md) · [Symfony](../symfony/README.md)
