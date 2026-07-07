# Postman

> Официальная документация Postman: [learning.postman.com](https://learning.postman.com/docs/introduction/overview/)

**Postman** — инструмент для отправки API-запросов, организации коллекций и автоматического тестирования ответов. Поддерживает HTTP, GraphQL и gRPC.

В этом разделе — практическая работа с Postman на примере Laravel API и публичных тестовых сервисов. Теория REST — в [Основы REST](rest-basics.md).

## Разделы

| Страница | Описание |
|----------|----------|
| [Основы REST](rest-basics.md) | HTTP-методы, статусы, заголовки, JSON |
| [Установка Postman](installation.md) | Desktop-приложение, аккаунт, синхронизация |
| [Быстрый старт](quick-start.md) | Первый запрос, коллекция, тест ответа |
| [Видео](videos.md) | YouTube-уроки по Postman и REST API |

## Полезные видео

| Название | Ссылка |
|----------|--------|
| Postman. Полный гайд (рус., ~1 ч) | [YouTube](https://www.youtube.com/watch?v=KdCAV4SzvqQ) |
| Postman для тестировщика — урок 1 (рус.) | [YouTube](https://www.youtube.com/watch?v=Qe-kDHq-Vw4) |
| Postman-ниндзя: с нуля до автотестов (рус.) | [YouTube](https://www.youtube.com/watch?v=8-lEjM0FhTg&t=25347) |
| Postman step by step — полный курс (англ.) | [YouTube](https://www.youtube.com/watch?v=wEOLZq-7DYs) |
| New to Postman — официальный плейлист | [YouTube](https://www.youtube.com/playlist?list=PLM-7VG-sgbtBsenu0CM-UF3NZj3hQFs7E) |

Полный список: [Видео по Postman](videos.md)

## Когда использовать Postman

| Задача | Postman |
|--------|---------|
| Проверить Laravel API (`/api/...`) без фронтенда | Отправить GET/POST с нужными заголовками и телом |
| Отладить авторизацию (Bearer token, cookies) | Вкладки **Authorization** и **Headers** |
| Сохранить набор запросов для проекта | **Collections** — папки по модулям API |
| Автотесты после деплоя | Скрипты на вкладке **Tests** |
| Поделиться API с командой | Экспорт коллекции или workspace |

## Быстрая шпаргалка

```
GET    /api/users          → список
GET    /api/users/1        → одна запись
POST   /api/users          → создание (тело JSON)
PUT    /api/users/1        → полное обновление
PATCH  /api/users/1        → частичное обновление
DELETE /api/users/1        → удаление
```

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [Laravel — маршруты](../../Backend/laravel/routing.md) | Определение REST API в `routes/api.php` |
| [Laravel — контроллеры](../../Backend/laravel/controllers.md) | Логика обработки запросов |
| [JavaScript — сетевые запросы](../../Frontend/js/network.md) | `fetch` на стороне клиента |
| [Laravel + Next.js](../../devops/laravel-next/README.md) | Fullstack: Next.js → Laravel API |

## Полезные ссылки

- [Postman Learning Center](https://learning.postman.com/docs/introduction/overview/)
- [Postman Echo API](https://learning.postman.com/docs/developer/echo-api/) — тестовый сервер для отладки
- [MDN — HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)
