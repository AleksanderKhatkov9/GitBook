# 7. Express

> Источники: [Metanit — Express](https://metanit.com/web/nodejs/) · [Express Guide](https://expressjs.com/en/guide/routing.html) · [Using middleware](https://expressjs.com/en/guide/using-middleware.html)

Express — библиотека поверх `node:http`. Она вызывает ваши функции по методу и пути, разбирает query и тело формы, отдаёт файлы и JSON. Сервер из [прошлой главы](http.md) после этого вручную не собирают.

Примеры — Express 5 и `"type": "module"`.

```bash
npm install express
```

Отличие, которое видно сразу: ошибка из `async`-обработчика сама попадает в error middleware. В Express 4 такой `reject` легко ронял процесс, если его не обернули.

## Первое приложение

`app.js`:

```js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Привет, Express');
});

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});
```

`app.get` — маршрут только для GET. Есть `post`, `put`, `patch`, `delete`, `all`. `res.send` сам ставит `Content-Type` и кодировку для строки.

Порт из окружения, как в [главе про процесс](modules.md):

```js
const port = Number(process.env.PORT) || 3000;
app.listen(port);
```

## Middleware

Запрос проходит цепочку функций. У каждой три аргумента: `req`, `res`, `next`. Пока функция не отправила ответ и не вызвала `next()`, запрос стоит.

```js
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.json({ limit: '100kb' }));
```

| Вызов | Что происходит |
|-------|----------------|
| `next()` | Дальше по цепочке |
| `res.send` / `res.json` / `res.end` | Ответ ушёл, цепочку обычно прекращают |
| `next(error)` | Прыжок в обработчик ошибок |
| ничего | Запрос висит, пока не сработает таймаут |

Порядок `app.use` и маршрутов — порядок выполнения. Разбор JSON подключают до маршрутов, которые читают `req.body`. Логгер ставят в начале, чтобы видеть и те запросы, которым дальше ответят 404.

Обработчик ошибок узнают по четырём аргументам. Его регистрируют последним:

```js
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
});
```

Параметр `next` здесь обязателен, даже если его не вызывают: по числу аргументов Express отличает error middleware от обычного. Клиенту отдают короткое сообщение, не стек и не `err.message`, если там может быть путь или SQL.

## Ответ

| Метод | Когда |
|-------|--------|
| `res.send(строка)` | Текст или HTML-строка |
| `res.json(объект)` | `Content-Type: application/json` |
| `res.status(код).json(...)` | Статус и тело |
| `res.sendFile(абсолютныйПуть)` | Один файл |
| `res.type('txt')` | Задать тип до `send` |
| `res.redirect(код, url)` | Переадресация |

Код по умолчанию — 200. Созданный ресурс — 201, ошибка клиента — 4xx, сбой сервера — 500. Тело без явного статуса при `res.status(404)` не отправляйте забытым вторым вызовом: статус ставят в той же цепочке, что и `send` / `json`.

`res.sendFile` требует абсолютный путь. Его собирают через `join(import.meta.dirname, ...)`, не из сырого URL.

## Статические файлы

Каталог `public/` отдаётся как корень сайта. Путь абсолютный: строка `'public'` без `join` ищется от каталога, из которого вызвали `node`, а не от файла `app.js`.

```js
import { join } from 'node:path';

app.use(express.static(join(import.meta.dirname, 'public')));
```

Файл `public/css/app.css` открывается как `http://127.0.0.1:3000/css/app.css`. Express ищет файл сам и не выходит из `public`.

Если файл найден, следующие маршруты для этого запроса не вызываются. Свой `app.get('/about')` и файл `public/about` не должны спорить за один URL.

## Маршруты

```js
app.get('/', (req, res) => {
    res.send('Главная');
});

app.get('/about', (req, res) => {
    res.send('О сайте');
});
```

Путь сравнивается без query. Регистр и лишний слэш на конце имеют значение: `/About` и `/about/` — другие маршруты, если их не описали.

Несколько обработчиков на один путь вызываются по порядку, каждый решает, звать ли `next()`.

## Переадресация

```js
app.get('/old', (req, res) => {
    res.redirect(301, '/about');
});
```

| Код | Смысл |
|-----|--------|
| 301 | Постоянно. Браузер и поисковик запоминают новый адрес |
| 302 | Временно. Метод запроса браузер может сменить на GET |
| 303 | После POST: «результат смотри GET-ом по этому адресу» |

Адрес может быть абсолютным (`https://example.com/about`) или путём сайта (`/about`).

## Query-строка

`GET /search?q=node&page=2`

```js
app.get('/search', (req, res) => {
    const q = String(req.query.q ?? '');
    const page = Number(req.query.page) || 1;
    res.json({ q, page });
});
```

`req.query` уже объект. Значения — строки (или массивы, если ключ повторили). Число получают через `Number`, как из `process.env`.

Ответ выше — JSON, не HTML. Подставлять `q` в разметку без экранирования нельзя.

## POST и формы

Тело само не появится. Сначала middleware:

```js
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(express.json({ limit: '100kb' }));
```

| Заголовок | Middleware | Где данные |
|-----------|------------|------------|
| `application/x-www-form-urlencoded` | `express.urlencoded` | `req.body.email` |
| `application/json` | `express.json` | `req.body` как объект |

`extended: false` разбирает обычную форму. `limit` обрывает слишком большое тело.

```js
app.get('/login', (req, res) => {
    res.type('html').send(`
        <form method="post" action="/login">
            <input name="email">
            <button>Войти</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const email = String(req.body.email ?? '');
    res.redirect(303, '/');
});
```

Пароль и токен в `res.send` не возвращают. После успешного POST браузер переводят на GET, чтобы обновление страницы не отправило форму ещё раз.

## Параметры пути

```js
app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id });
});
```

`GET /users/15` даёт `req.params.id === '15'` — это строка.

Фиксированный путь объявляют раньше параметра, иначе слово съест параметр:

```js
app.get('/users/new', (req, res) => {
    res.send('Форма');
});

app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id });
});
```

## Router

Группу маршрутов выносят из `app.js`, чтобы файл не рос одним списком.

`routes/users.js`:

```js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Список');
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id });
});

export default router;
```

`app.js`:

```js
import usersRouter from './routes/users.js';

app.use('/users', usersRouter);
```

Путь в роутере пишут без префикса: `/` здесь — это `/users`, `/:id` — это `/users/:id`.

Тот же приём делит API: `app.use('/api', apiRouter)`.

## Дальше

[8. Шаблоны](views.md) — HTML с данными, без склейки строк. JSON-интерфейс без страниц — [глава 9](api.md).
