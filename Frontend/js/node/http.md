# 6. HTTP-сервер

> Источники: [Metanit — глава 3](https://metanit.com/web/nodejs/) · [HTTP](https://nodejs.org/docs/latest/api/http.html) · [URL](https://nodejs.org/docs/latest/api/url.html)

Модуль `node:http` принимает TCP-соединение, разбирает запрос и отдаёт ответ. Маршрутов, шаблонов и JSON в нём нет — это делает ваш код или [Express](express.md) в следующей главе. Здесь видно, из чего ответ вообще состоит.

## Минимальный сервер

```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Привет');
});

server.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});
```

```bash
node app.js
```

`req` — входящий поток (метод, URL, заголовки, тело). `res` — исходящий поток. `writeHead` отправляет статус и заголовки, `end` — тело и конец ответа. Без `end` браузер ждёт.

Для русского текста в заголовке нужен `charset=utf-8`. Иначе браузер может показать кракозябры.

Остановить сервер в терминале: `Ctrl+C`.

## Метод и путь

```js
const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');

    if (req.method === 'GET' && url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Главная</h1>');
        return;
    }

    if (req.method === 'GET' && url.pathname === '/search') {
        const q = url.searchParams.get('q') ?? '';
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(q);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Не найдено');
});
```

`req.url` — путь и query, без хоста: `/search?q=node`. Объект [URL](https://nodejs.org/docs/latest/api/url.html) собирают со вторым аргументом-базой, чтобы разобрать относительный путь. `searchParams` читает query-строку. Запрос `GET /search?q=node` попадает во вторую ветку, `q` равен `node`.

Пользовательский текст в HTML не подставляют: в query может быть разметка. Выше ответ уходит как `text/plain`.

Порядок веток важен. Общий `404` стоит последним, после конкретных путей.

## Файл в ответ

Файл не читают целиком. Поток с диска соединяют с `res`:

```js
import { createReadStream } from 'node:fs';
import { join, extname } from 'node:path';

const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
};

function sendFile(res, filePath) {
    const type = types[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });

    const stream = createReadStream(filePath);
    stream.on('error', () => {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Не найдено');
    });
    stream.pipe(res);
}

const page = join(import.meta.dirname, 'public', 'index.html');
sendFile(res, page);
```

Путь берут из своего каталога `public`, а не склеивают с `req.url` напрямую. Иначе запрос `/../.env` может выйти из папки сайта. Если файл всё же выбирают по URL, проверяют, что итоговый путь начинается с каталога `public`.

`writeHead` нельзя вызвать второй раз, если поток уже начал ответ. В рабочем коде ошибку `createReadStream` проверяют до записи заголовков (`access` или обработчик `error` до `pipe`). Фрагмент выше показывает связку «поток → ответ», не готовый статический сервер. Для статики в приложении проще [Express](express.md).

## Простая подстановка в HTML

Пока нет движка шаблонов, файл читают и заменяют заранее выбранные метки:

```js
import { readFile } from 'node:fs/promises';

let html = await readFile(join(import.meta.dirname, 'views', 'index.html'), 'utf8');
html = html.replaceAll('{{title}}', 'Магазин');

res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
res.end(html);
```

`index.html`:

```html
<h1>{{title}}</h1>
```

В метку нельзя класть строку от пользователя без экранирования: `replaceAll` не отличает текст от тегов. Экранирование и условия — работа шаблонизатора, это [глава 8](views.md).

## Тело запроса и форма

Тело приходит кусками, как читаемый поток. `node:http` само его не собирает.

```js
const chunks = [];
for await (const chunk of req) {
    chunks.push(chunk);
}
const raw = Buffer.concat(chunks).toString('utf8');
```

Форма с `application/x-www-form-urlencoded` (обычный `<form method="post">`) — это строка `email=anna%40mail.test&password=secret`. Её разбирает `URLSearchParams`:

```js
if (req.method === 'POST' && url.pathname === '/login') {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const params = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
    const email = params.get('email') ?? '';

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(email);
    return;
}
```

HTML формы:

```html
<form method="post" action="/login">
    <input name="email">
    <button type="submit">Войти</button>
</form>
```

Размер тела ограничивают сами: если сумма кусков превысила порог, соединение закрывают. Без лимита клиент может прислать гигабайт и занять память. Express делает лимит в `express.json({ limit: '100kb' })` — в [следующей главе](express.md).

Пароль из примера в ответ не пишут и в лог не кладут.

## Дальше

[7. Express](express.md) — те же запросы без ручного разбора URL и тела.
