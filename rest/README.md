# REST

**REST** (Representational State Transfer) — архитектурный стиль для обмена данными между клиентом и сервером через HTTP. Клиент обращается к ресурсам по URL и использует стандартные HTTP-методы; ответ обычно в формате JSON.

## Разделы

| Раздел | Описание |
|--------|----------|
| [Postman](postman/README.md) | Установка, первый запрос, коллекции, тесты, видео |

## Быстрая шпаргалка

```
GET    /api/users          → список
GET    /api/users/1        → одна запись
POST   /api/users          → создание (тело JSON)
PUT    /api/users/1        → полное обновление
PATCH  /api/users/1        → частичное обновление
DELETE /api/users/1        → удаление
```

Подробнее: [Основы REST](postman/rest-basics.md).

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [Laravel — REST API](../Backend/laravel/api.md) | `routes/api.php`, Sanctum, JSON |
| [Laravel — контроллеры](../Backend/laravel/controllers.md) | Логика обработки запросов |
| [JavaScript — сетевые запросы](../Frontend/js/introduction/network.md) | `fetch` на стороне клиента |
| [Laravel + Next.js](../devops/laravel-next/README.md) | Fullstack: Next.js → Laravel API |

## Полезные ссылки

- [MDN — HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)
