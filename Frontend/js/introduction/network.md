# 7. Сетевые запросы

> Источник: [learn.javascript.ru — Сетевые запросы](https://learn.javascript.ru/network) · [MDN Fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API)

JavaScript в браузере может обмениваться данными с сервером: REST API, загрузка файлов, WebSocket, push-уведомления.

## Fetch — базовый запрос

```javascript
const response = await fetch('https://api.example.com/users');

console.log(response.status);       // 200
console.log(response.ok);         // true (status 200–299)
console.log(response.headers.get('Content-Type'));

const users = await response.json();
```

### Методы и заголовки

```javascript
const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({ title: 'Hello', body: 'Text' })
});

if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

const post = await response.json();
```

| Метод | Назначение |
|-------|------------|
| `GET` | Получение данных |
| `POST` | Создание |
| `PUT` / `PATCH` | Обновление |
| `DELETE` | Удаление |

### Форматы ответа

```javascript
await response.json();    // JSON
await response.text();    // текст, HTML
await response.blob();    // бинарные данные (файл, картинка)
await response.arrayBuffer();
await response.formData();
```

## FormData

Отправка формы и файлов без ручной сериализации:

```javascript
const form = document.querySelector('#upload-form');
const formData = new FormData(form);  // все поля формы

// Или вручную
formData.append('name', 'Anna');
formData.append('avatar', fileInput.files[0]);

const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
    // Content-Type выставит браузер с boundary — не задавайте вручную
});
```

```javascript
// FormData → обычный объект (без файлов)
const data = Object.fromEntries(formData.entries());
```

## Fetch: ход загрузки

`fetch` не сообщает прогресс **отправки** напрямую. Для **скачивания** больших файлов используйте `ReadableStream`:

```javascript
async function downloadWithProgress(url, onProgress) {
    const response = await fetch(url);
    const total = Number(response.headers.get('Content-Length'));
    const reader = response.body.getReader();
    const chunks = [];
    let loaded = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total) onProgress(Math.round(loaded / total * 100));
    }

    return new Blob(chunks);
}

downloadWithProgress('/files/report.pdf', percent => {
    console.log(`Загружено: ${percent}%`);
});
```

Для загрузки файлов на сервер с прогрессом — `XMLHttpRequest` или библиотеки (axios с `onUploadProgress`).

## Fetch: прерывание запроса

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('/api/slow', { signal })
    .then(r => r.json())
    .catch(err => {
        if (err.name === 'AbortError') {
            console.log('Запрос отменён');
        }
    });

// Отмена по таймауту
setTimeout(() => controller.abort(), 5000);

// Отмена по клику
cancelBtn.addEventListener('click', () => controller.abort());
```

Объединение нескольких сигналов:

```javascript
const timeout = AbortSignal.timeout(5000);  // ES2022+
const response = await fetch('/api/data', { signal: timeout });
```

## CORS — запросы на другие сайты

Браузер блокирует cross-origin запросы, если сервер не разрешил их заголовками CORS.

```javascript
// Запрос на другой домен — нужны заголовки на сервере:
// Access-Control-Allow-Origin: https://mysite.com
await fetch('https://api.other-site.com/data');
```

| Тип запроса | Preflight (OPTIONS) |
|-------------|---------------------|
| Simple GET, POST с `text/plain` | не нужен |
| JSON, кастомные заголовки | нужен |

```javascript
// mode: 'cors' — по умолчанию
// mode: 'no-cors' — ограниченный ответ (opaque), редко нужен
await fetch(url, { mode: 'cors', credentials: 'include' });
```

Laravel CORS настраивается в `config/cors.php` или middleware.

## Объект Response

```javascript
const response = await fetch('/api/user');

response.status;          // 200
response.statusText;      // 'OK'
response.ok;              // true
response.redirected;      // был ли редирект
response.url;             // финальный URL

response.headers.get('Content-Type');
response.headers.has('X-Rate-Limit');

// Клонирование — body можно прочитать только один раз
const clone = response.clone();
const json = await response.json();
const text = await clone.text();
```

## Объекты URL

```javascript
const url = new URL('https://example.com:8080/path/page?id=42&sort=desc#section');

url.protocol;   // 'https:'
url.hostname;   // 'example.com'
url.port;       // '8080'
url.pathname;   // '/path/page'
url.search;     // '?id=42&sort=desc'
url.hash;       // '#section'

url.searchParams.get('id');           // '42'
url.searchParams.set('page', '2');
url.searchParams.delete('sort');
url.searchParams.toString();          // 'id=42&page=2'

// Относительный URL
const api = new URL('/api/users', window.location.origin);
api.searchParams.set('limit', '10');
// https://mysite.com/api/users?limit=10
```

## XMLHttpRequest (XHR)

Устаревший, но поддерживает прогресс загрузки:

```javascript
function uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                onProgress(Math.round(e.loaded / e.total * 100));
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`HTTP ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));

        xhr.open('POST', '/api/upload');
        xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
        xhr.send(formData);
    });
}
```

Для новых проектов предпочитайте **Fetch**; XHR — когда нужен `upload.onprogress`.

## Возобновляемая загрузка файлов

Загрузка частями с заголовком `Range`:

```javascript
async function downloadChunk(url, start, end) {
    const response = await fetch(url, {
        headers: { Range: `bytes=${start}-${end}` }
    });
    return response.arrayBuffer();
}

// Сервер должен ответить 206 Partial Content
// и поддерживать Accept-Ranges: bytes
```

## Длинные опросы (Long Polling)

Клиент ждёт ответ сервера, пока не появятся новые данные:

```javascript
async function longPoll() {
    try {
        const response = await fetch('/api/messages/wait?timeout=30');
        const messages = await response.json();
        handleMessages(messages);
    } catch (error) {
        console.error(error);
    } finally {
        longPoll();  // следующий запрос
    }
}

longPoll();
```

Современная альтернатива — **WebSocket** или **Server-Sent Events**.

## WebSocket

Двусторонний канал в реальном времени:

```javascript
const socket = new WebSocket('wss://example.com/ws');

socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(JSON.stringify({ type: 'subscribe', channel: 'chat' }));
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log('Получено:', data);
});

socket.addEventListener('close', (event) => {
    console.log('Закрыто', event.code, event.reason);
});

socket.addEventListener('error', (error) => {
    console.error('WebSocket error', error);
});

// Закрыть
socket.close(1000, 'Done');
```

Laravel: [Laravel Reverb](https://laravel.com/docs/reverb), [Echo](https://laravel.com/docs/broadcasting).

## Server-Sent Events (SSE)

Сервер **отправляет** события клиенту (односторонний поток):

```javascript
const source = new EventSource('/api/events');

source.addEventListener('message', (event) => {
    console.log('Данные:', event.data);
});

source.addEventListener('update', (event) => {
    const payload = JSON.parse(event.data);
    updateUI(payload);
});

source.addEventListener('error', () => {
    console.log('Ошибка или переподключение...');
});

// Закрыть
source.close();
```

| Технология | Направление | Протокол |
|------------|-------------|----------|
| Fetch / XHR | запрос → ответ | HTTP |
| Long polling | запрос → ответ с задержкой | HTTP |
| SSE | сервер → клиент | HTTP |
| WebSocket | двусторонний | WS / WSS |

## Laravel + Fetch

```javascript
async function api(url, options = {}) {
    const defaults = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        }
    };

    const response = await fetch(url, {
        ...defaults,
        ...options,
        headers: { ...defaults.headers, ...options.headers }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
}

// Использование
const posts = await api('/api/posts');
const created = await api('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title: 'New post' })
});
```

Sanctum для SPA: cookie + `credentials: 'include'` + заголовок `X-XSRF-TOKEN`.

## Следующий шаг

[8. DOM и события](dom-events.md) — работа со страницей в браузере.
