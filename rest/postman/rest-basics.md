# Основы REST

> Источники: [MDN — HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP) · [RESTful API](https://restfulapi.net/)

REST API — набор URL (эндпоинтов), к которым клиент обращается стандартными HTTP-методами. Ответ обычно в формате **JSON**.

## HTTP-методы

| Метод | Действие | Пример | Тело запроса |
|-------|----------|--------|--------------|
| `GET` | Получить данные | `GET /api/posts` | Нет |
| `POST` | Создать ресурс | `POST /api/posts` | JSON |
| `PUT` | Полностью заменить | `PUT /api/posts/1` | JSON |
| `PATCH` | Частично обновить | `PATCH /api/posts/1` | JSON |
| `DELETE` | Удалить | `DELETE /api/posts/1` | Обычно нет |

В Laravel маршруты API часто объявляют так:

```php
Route::apiResource('posts', PostController::class);
```

Это создаёт стандартные REST-маршруты: `index`, `store`, `show`, `update`, `destroy`.

## Коды ответа HTTP

| Код | Значение | Когда встречается |
|-----|----------|-------------------|
| `200` | OK | Успешный GET, PUT, PATCH |
| `201` | Created | Успешный POST |
| `204` | No Content | Успешный DELETE без тела |
| `400` | Bad Request | Неверные параметры |
| `401` | Unauthorized | Нет или неверный токен |
| `403` | Forbidden | Нет прав доступа |
| `404` | Not Found | Ресурс не найден |
| `422` | Unprocessable Entity | Ошибки валидации (Laravel) |
| `500` | Internal Server Error | Ошибка на сервере |

## Структура запроса

```
GET /api/users?page=1 HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

| Часть | Описание |
|-------|----------|
| **URL** | Адрес ресурса, query-параметры (`?page=1`) |
| **Headers** | Метаданные: тип контента, авторизация |
| **Body** | Данные для POST/PUT/PATCH (обычно JSON) |

### Пример тела POST-запроса

```json
{
  "title": "Новый пост",
  "body": "Текст статьи",
  "published": true
}
```

Заголовок `Content-Type: application/json` сообщает серверу, что тело — JSON.

## Структура ответа

```json
{
  "data": {
    "id": 1,
    "title": "Новый пост",
    "created_at": "2026-07-07T12:00:00.000000Z"
  }
}
```

Laravel часто возвращает ошибки валидации в формате:

```json
{
  "message": "The title field is required.",
  "errors": {
    "title": ["The title field is required."]
  }
}
```

## REST vs «просто API»

| Принцип REST | На практике |
|--------------|-------------|
| Ресурсы — существительные во множественном числе | `/users`, `/posts` |
| Действие задаёт метод HTTP, не глагол в URL | `DELETE /posts/1`, не `/deletePost/1` |
| Статус в HTTP-коде, не только в теле | `404` + JSON с сообщением |
| Stateless | Каждый запрос содержит всё нужное (токен, параметры) |

## Что дальше

Установите Postman и отправьте первый запрос: [Установка Postman](installation.md) → [Быстрый старт](quick-start.md).

Видео по REST и HTTP: [Тестирование API — GET и POST](https://www.youtube.com/watch?v=VqjaDULOYOM) · [все видео](videos.md).
