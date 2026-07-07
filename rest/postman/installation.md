# Установка Postman

> Источник: [Postman — Installation](https://learning.postman.com/docs/getting-started/installation/overview/)

Postman доступен как **desktop-приложение** (рекомендуется) и **веб-версия**. Для ежедневной работы с API удобнее desktop — стабильнее работают прокси, сертификаты и локальные URL (`http://localhost`).

## Desktop-приложение

1. Перейдите на [postman.com/downloads](https://www.postman.com/downloads/).
2. Скачайте версию для вашей ОС (Windows, macOS, Linux).
3. Установите и запустите Postman.

## Аккаунт Postman

Регистрация **не обязательна** для отправки запросов, но нужна для:

- синхронизации коллекций между устройствами;
- совместной работы в workspace;
- облачного запуска коллекций (Monitors, CI).

Создать аккаунт: [Sign up for Postman](https://learning.postman.com/docs/getting-started/installation/account/sign-up-for-postman/).

> **Видео:** [Postman. Полный гайд](https://www.youtube.com/watch?v=KdCAV4SzvqQ) · [Postman для тестировщика — интерфейс и workspace](https://www.youtube.com/watch?v=Qe-kDHq-Vw4)

## Первый запуск

После открытия Postman вы увидите:

| Область | Назначение |
|---------|------------|
| **Sidebar** (слева) | Collections, Environments, History |
| **Workbench** (центр) | Конструктор запроса: метод, URL, вкладки |
| **Response** (снизу) | Тело ответа, заголовки, cookies, тесты |

## Локальный Laravel API

Для работы с проектом на машине разработчика:

```
http://localhost:8000/api/...
```

или адрес из `php artisan serve` / Docker Compose (см. [Laravel — установка](../../Backend/laravel/installation.md)).

Если API защищён Sanctum или Passport — токен добавляют на вкладке **Authorization** → **Bearer Token**.

## Environments (переменные)

Чтобы не менять URL в каждом запросе, создайте **Environment**:

| Переменная | Пример значения |
|------------|-----------------|
| `base_url` | `http://localhost:8000` |
| `token` | `eyJhbGciOiJIUzI1NiIs...` |

В запросе используйте: `{{base_url}}/api/users`.

Создание: иконка шестерёнки → **Environments** → **Create Environment**.

## Полезные ссылки

- [Postman — обзор интерфейса](https://learning.postman.com/docs/getting-started/basics/navigating-postman/)
- [Postman — элементы (requests, collections)](https://learning.postman.com/docs/getting-started/basics/postman-elements/)
- [Postman — переменные](https://learning.postman.com/docs/sending-requests/variables/)

Следующая глава: [Быстрый старт](quick-start.md).
