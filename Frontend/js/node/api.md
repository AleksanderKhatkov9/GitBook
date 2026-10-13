# 9. API

> Источники: [Metanit — создание API, JSON и AJAX](https://metanit.com/web/nodejs/) · [Express routing](https://expressjs.com/en/guide/routing.html) · [HTTP](https://nodejs.org/docs/latest/api/http.html)

API отдаёт данные, не HTML. Клиент — страница с [fetch](../introduction/network.md), мобильное приложение или другой сервер. Ниже маленький список пользователей в памяти: так виден контракт запросов. Хранение в базе — [MongoDB](mongodb.md) и [MySQL](mysql.md).

## Контракт

| Действие | Метод и путь | Успех |
|----------|--------------|-------|
| Список | `GET /api/users` | 200 и массив |
| Один | `GET /api/users/:id` | 200 и объект, иначе 404 |
| Создать | `POST /api/users` | 201 и объект |
| Заменить поля | `PATCH /api/users/:id` | 200 и объект |
| Удалить | `DELETE /api/users/:id` | 204 без тела |

Тело запроса и ответа — JSON. Ошибку тоже описывают JSON, не HTML-страницей: клиенту нужен машинный текст.

Имена путей — существительные. Действие задаёт метод, а не хвост `/delete` в URL.

## Сервер

```js
import express from 'express';

const app = express();
app.use(express.json({ limit: '100kb' }));

const users = [];
let nextId = 1;

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);
    if (!user) {
        res.status(404).json({ message: 'Не найден' });
        return;
    }
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    if (!name) {
        res.status(400).json({ message: 'Нужно поле name' });
        return;
    }
    const user = { id: nextId, name };
    nextId += 1;
    users.push(user);
    res.status(201).json(user);
});

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);
    if (!user) {
        res.status(404).json({ message: 'Не найден' });
        return;
    }
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    if (!name) {
        res.status(400).json({ message: 'Нужно поле name' });
        return;
    }
    user.name = name;
    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Не найден' });
        return;
    }
    users.splice(index, 1);
    res.status(204).end();
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
});

app.listen(3000);
```

Проверка: `name` обязан быть непустой строкой. Число, объект и пробелы — это 400, а не запись в список. Так клиентская ошибка не становится пользователем с именем `"undefined"`.

`id` из URL — строка. Сравнение с числом из памяти без `Number` всегда ложно.

Массив `users` пропадёт при перезапуске. Для учебного контракта этого хватает. Общую логику «найти или 404» потом забирает контроллер из [MVC](mvc.md), а не копируют в каждый метод.

Заголовок `Content-Type: application/json` у ответа ставит `res.json`. У запроса его ставит клиент, иначе `express.json` не заполнит `req.body`.

## Запрос с клиента

```js
const response = await fetch('http://127.0.0.1:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Anna' }),
});

if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
}

const user = await response.json();
```

`response.ok` ложно для 4xx и 5xx. `fetch` в этом случае исключение не бросает — статус проверяют сами. Подробнее про `fetch`: [Сетевые запросы](../introduction/network.md).

## Другой источник страницы

Страница на `http://localhost:5173` и API на порту 3000 — разные источники. Браузер отрежет ответ, пока API не пришлёт заголовок CORS.

```bash
npm install cors
```

```js
import cors from 'cors';

app.use(cors({ origin: 'http://localhost:5173' }));
```

`origin: '*'` открывает API любому сайту. Для разработки с известным адресом Vite указывайте этот адрес. Запрос без браузера (curl, сервер к серверу) CORS не касается.

## Что не класть в JSON

Пароль, хеш пароля, сессию и внутренний путь диска в объект ответа не входят. Наружу уходит то, что клиенту нужно показать или отправить обратно: `id`, имя, публичные поля.

Список на тысячах записей не отдают целиком. Позже добавляют `limit` и `page` из `req.query`. В этом примере список маленький и живёт в памяти.

## Дальше

[10. Тестирование](testing.md) — проверить статус и JSON без ручного клика. Как только данные нужны после перезапуска, список переносят в [MongoDB](mongodb.md) или [MySQL](mysql.md).
