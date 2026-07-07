# Быстрый старт Postman

> Источник: [Postman quick start](https://learning.postman.com/docs/getting-started/quick-start/)

В этом руководстве вы отправите первый API-запрос, сохраните его в коллекцию и напишете простой тест ответа.

## Отправка API-запроса

Убедитесь, что [Postman установлен](installation.md). Откройте приложение и выполните шаги:

> **Видео:** [Postman. Полный гайд](https://www.youtube.com/watch?v=KdCAV4SzvqQ) · [Postman для тестировщика — урок 1](https://www.youtube.com/watch?v=Qe-kDHq-Vw4) · [Sending a request (Postman)](https://www.youtube.com/watch?v=YKalL1rVDOE) · [все видео](videos.md)

1. Нажмите **Add** на панели инструментов — откроется новая вкладка запроса.
2. В поле URL введите: `https://postman-echo.com/get`
3. Метод оставьте **GET**.
4. Нажмите **Send**.

Ответ сервера появится в нижней панели **Response** — тело, заголовки, время ответа.

### Как это работает

Postman выступает **клиентом** и обращается к **API-серверу**:

1. Postman отправил GET-запрос на [Postman Echo API](https://learning.postman.com/docs/developer/echo-api/) (`postman-echo.com`).
2. Сервер принял запрос, обработал и вернул ответ.
3. Postman отобразил ответ во вкладке **Response**.

Echo API удобен для отладки: он «отзеркаливает» ваш запрос — можно проверить query-параметры, заголовки и тело.

### Query-параметры

На вкладке **Params** добавьте параметры:

| Key | Value |
|-----|-------|
| `foo` | `bar` |
| `page` | `1` |

URL станет: `https://postman-echo.com/get?foo=bar&page=1`. В ответе Echo вернёт переданные параметры в поле `args`.

## POST-запрос с JSON

1. Создайте новую вкладку (**Add**).
2. Метод: **POST**, URL: `https://postman-echo.com/post`.
3. Вкладка **Body** → **raw** → тип **JSON**.
4. Введите:

```json
{
  "name": "Test User",
  "email": "user@example.com"
}
```

5. Нажмите **Send**.

В ответе поле `json` содержит отправленные данные — так проверяют, что сервер правильно принял тело запроса.

## Коллекция и сохранение запроса

**Collection** — группа сохранённых запросов. Коллекции можно раскладывать по папкам, добавлять документацию и тесты, делиться с командой.

### Создать коллекцию

1. В конструкторе запроса нажмите **Save**.
2. **New Collection** — введите имя, например `My API` или `Laravel Local`.
3. Задайте имя запроса, например `Echo GET`.
4. Нажмите **Save**.

Коллекция и запрос появятся в боковой панели **Collections**.

### Организация

Рекомендуемая структура для Laravel-проекта:

```
Laravel API
├── Auth
│   ├── Login
│   └── Register
├── Users
│   ├── List users
│   └── Create user
└── Posts
    ├── List posts
    └── Show post
```

Подробнее: [Collections overview](https://learning.postman.com/docs/collections/collections-overview/).

## Тест API-запроса

> **Видео:** [Writing tests (Postman)](https://www.youtube.com/watch?v=6Cp4Ez5dwbM) · [Postman-ниндзя — автотесты](https://www.youtube.com/watch?v=8-lEjM0FhTg&t=25347)

**Tests** — скрипты на JavaScript, которые выполняются после получения ответа. Они проверяют, что API ведёт себя ожидаемо (статус, структура JSON, время ответа).

### Проверка статуса 200

1. Откройте запрос `https://postman-echo.com/get`.
2. Вкладка **Scripts** → **Post-response** (в новых версиях — **Tests**).
3. Нажмите **Snippets** → **Status code: Code is 200** или вставьте код:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

4. Нажмите **Send**.
5. Во вкладке **Test Results** (или рядом с Response) — зелёная галочка при успехе.

### Дополнительные проверки

```javascript
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Body has args", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("args");
});
```

### Тест для Laravel API

Пример для `GET /api/users` с Bearer-токеном:

```javascript
pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns array of users", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.be.an("array");
});
```

Подробнее: [Write test scripts](https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/).

## Запрос к локальному Laravel

1. Запустите сервер: `php artisan serve` (по умолчанию `http://127.0.0.1:8000`).
2. В Postman: `GET http://127.0.0.1:8000/api/...` (ваш маршрут из `routes/api.php`).
3. На вкладке **Headers** добавьте:
   - `Accept: application/json`
   - `Authorization: Bearer <token>` — если маршрут защищён

Ошибка `419` или редирект на login — часто признак того, что маршрут требует CSRF (web) вместо API middleware. Используйте префикс `/api` и middleware `auth:sanctum` / `auth:api`.

## Что изучить дальше

| Тема | Ссылка |
|------|--------|
| Видеоуроки по Postman | [Видео](videos.md) |
| Переменные и environments | [Postman Variables](https://learning.postman.com/docs/sending-requests/variables/) |
| Авторизация OAuth 2.0 | [Authorization](https://learning.postman.com/docs/sending-requests/authorization/authorization/) |
| Импорт OpenAPI/Swagger | [Import data](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/) |
| Запуск коллекции в CI | [Collection Runner](https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/) |

Связанные главы книги: [Laravel — маршруты](../../Backend/laravel/routing.md), [JavaScript — сетевые запросы](../../Frontend/js/network.md).
