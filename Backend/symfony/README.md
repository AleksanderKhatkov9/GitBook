# Symfony

> Официальная документация: [symfony.com/doc](https://symfony.com/doc) · актуальная версия: [8.1](https://symfony.com/doc/8.1/index.html)

Symfony — PHP-фреймворк и набор переиспользуемых компонентов (HTTP, маршруты, DI, консоль, безопасность). Laravel построен на этих компонентах.

Ниже — карта официальной документации: что в каком разделе и зачем туда идти.

## С чего начать

На [главной документации](https://symfony.com/doc) предлагают пять путей. После любого из них возвращаются к разделу **Getting Started**.

| Путь | Когда | Ссылка |
|------|--------|--------|
| Quick Tour | Посмотреть основы за полчаса, без установки | [symfony.com/tour](https://symfony.com/tour) |
| Getting Started | Читать статьи по порядку | [Setup](https://symfony.com/doc/current/setup.html) |
| SymfonyCasts | Учиться по видео | [screencast/symfony](https://symfonycasts.com/screencast/symfony) |
| Demo | Поставить приложение и разбирать код | [github.com/symfony/demo](https://github.com/symfony/demo) |
| Книга | Собрать приложение от установки до деплоя | [Symfony: The Fast Track](https://symfony.com/book) |

## Карта документации

### Старт (Getting Started)

| Статья | О чём |
|--------|--------|
| [Setup / Installation](https://symfony.com/doc/current/setup.html) | PHP, Composer, создание проекта |
| [Creating Pages](https://symfony.com/doc/current/page_creation.html) | Первая страница: маршрут и ответ |
| [Routing](https://symfony.com/doc/current/routing.html) | URL и генерация ссылок |
| [Controllers](https://symfony.com/doc/current/controller.html) | Действия контроллера, request и response |
| [Templates / Twig](https://symfony.com/doc/current/templates.html) | Шаблоны Twig |
| [Configuration / Env Vars](https://symfony.com/doc/current/configuration.html) | Конфиг, параметры, переменные окружения |

### Архитектура (Architecture)

| Статья | О чём |
|--------|--------|
| [Requests / Responses](https://symfony.com/doc/current/components/http_kernel.html) | HttpKernel: запрос входит, ответ выходит |
| [Kernel](https://symfony.com/doc/current/reference/configuration/kernel.html) | Ядро приложения и front controller |
| [Services / DI](https://symfony.com/doc/current/service_container.html) | Контейнер сервисов и внедрение зависимостей |
| [Events](https://symfony.com/doc/current/event_dispatcher.html) | События и подписчики |
| [Contracts](https://symfony.com/doc/current/components/contracts.html) | Общие интерфейсы между компонентами |
| [Bundles](https://symfony.com/doc/current/bundles.html) | Бандлы — пакеты, которые расширяют приложение |

### Основы (The Basics)

| Статья | О чём |
|--------|--------|
| [Databases / Doctrine](https://symfony.com/doc/current/doctrine.html) | Doctrine ORM: сущности и запросы |
| [Forms](https://symfony.com/doc/current/forms.html) | Формы, поля, обработка отправки |
| [Tests](https://symfony.com/doc/current/testing.html) | PHPUnit, тесты ядра и HTTP |
| [Sessions](https://symfony.com/doc/current/session.html) | Сессия между запросами |
| [Cache](https://symfony.com/doc/current/cache.html) | Кэш приложения |
| [Logger](https://symfony.com/doc/current/logging.html) | Логи, каналы, Monolog |
| [Errors / Debugging](https://symfony.com/doc/current/controller/error_pages.html) | Страницы ошибок и отладка |

### Продвинутые темы (Advanced)

| Статья | О чём |
|--------|--------|
| [Console](https://symfony.com/doc/current/console.html) | CLI-команды |
| [Mailer](https://symfony.com/doc/current/mailer.html) | Письма |
| [Validation](https://symfony.com/doc/current/validation.html) | Правила валидации объектов |
| [Messaging / Queues](https://symfony.com/doc/current/messenger.html) | Messenger: очереди и шина сообщений |
| [Scheduler](https://symfony.com/doc/current/scheduler.html) | Задачи по расписанию |
| [Notifications](https://symfony.com/doc/current/notifier.html) | Уведомления: почта, чат, SMS |
| [Serialization](https://symfony.com/doc/current/serializer.html) | Объект ↔ JSON и другие форматы |
| [Translation](https://symfony.com/doc/current/translation.html) | Переводы, i18n |

### Безопасность (Security)

| Статья | О чём |
|--------|--------|
| [Introduction](https://symfony.com/doc/current/security.html) | Обзор компонента Security |
| [Users](https://symfony.com/doc/current/security.html#the-user) | Пользователь и откуда его брать |
| [Authentication / Firewalls](https://symfony.com/doc/current/security.html#the-firewall) | Firewall и вход |
| [Authorization / Voters](https://symfony.com/doc/current/security.html#access-control-authorization) | Права доступа и voters |
| [Passwords](https://symfony.com/doc/current/security/passwords.html) | Хеширование паролей |
| [CSRF](https://symfony.com/doc/current/security/csrf.html) | Защита форм от подделки запроса |
| [LDAP](https://symfony.com/doc/current/security/ldap.html) | Вход через LDAP |

### Фронтенд (Front-end)

| Статья | О чём |
|--------|--------|
| [Introduction](https://symfony.com/doc/current/frontend.html) | Как подключать CSS и JavaScript |
| [AssetMapper](https://symfony.com/doc/current/frontend/asset_mapper.html) | Импорт модулей без отдельной сборки |
| [Symfony UX / Stimulus](https://symfony.com/bundles/StimulusBundle/current/index.html) | Интерактив на Stimulus |
| [Webpack Encore](https://symfony.com/doc/current/frontend/encore/index.html) | Сборка фронтенда через Webpack |
| [WebLink](https://symfony.com/doc/current/web_link.html) | HTTP-заголовки Link: preload, prefetch |

### Утилиты (Utilities)

| Статья | О чём |
|--------|--------|
| [HTTP Client](https://symfony.com/doc/current/http_client.html) | Исходящие HTTP-запросы |
| [Filesystem](https://symfony.com/doc/current/components/filesystem.html) | Работа с файлами |
| [Expression Language](https://symfony.com/doc/current/components/expression_language.html) | Выражения в конфиге и правилах |
| [Locks](https://symfony.com/doc/current/components/lock.html) | Блокировки, чтобы задача не шла дважды |
| [Workflows](https://symfony.com/doc/current/workflow.html) | Состояния и переходы |
| [Strings / Unicode](https://symfony.com/doc/current/components/string.html) | Строки, slug, Unicode |
| [UID / UUID](https://symfony.com/doc/current/components/uid.html) | UUID и ULID |
| [PHP Polyfills](https://github.com/symfony/polyfill) | Функции новых версий PHP на старых |
| [YAML Parser](https://symfony.com/doc/current/components/yaml.html) | Чтение и запись YAML |
| [Webhooks](https://symfony.com/doc/current/webhook.html) | Входящие вебхуки |

### Продакшен (Production)

| Статья | О чём |
|--------|--------|
| [Deployment](https://symfony.com/doc/current/deployment.html) | Выкладка приложения |
| [Performance](https://symfony.com/doc/current/performance.html) | Кэш, OPcache, что ускоряет ответ |
| [HTTP Cache](https://symfony.com/doc/current/http_cache.html) | Кэш на уровне HTTP |
| [Cloud / Upsun](https://symfony.com/doc/current/cloud/index.html) | Хостинг на Upsun |
| [Symfony AI](https://symfony.com/doc/current/ai/index.html) | Компоненты для работы с ИИ |

## Связанные разделы

[PHP](../php/README.md) · [Laravel](../laravel/README.md)
