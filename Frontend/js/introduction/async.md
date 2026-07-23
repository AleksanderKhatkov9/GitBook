# 6. Асинхронность

> Источники: [learn.javascript.ru — Промисы](https://learn.javascript.ru/promise-basics) · [metanit.com — Главы 8, 17, 19](https://metanit.com/web/javascript/17.1.php) · [W3Schools — JS Async](https://www.w3schools.com/js/js_async.asp)

## Обработка ошибок

```javascript
try {
    const data = JSON.parse('invalid json');
} catch (error) {
    console.error('Ошибка:', error.message);
} finally {
    console.log('Выполнится всегда');
}
```

### Создание своих ошибок

```javascript
class ValidationError extends Error {
    constructor(field) {
        super(`Некорректное поле: ${field}`);
        this.name = 'ValidationError';
        this.field = field;
    }
}

function validateAge(age) {
    if (age < 0) throw new ValidationError('age');
}
```

## Callbacks

Классический подход — функция обратного вызова:

```javascript
function loadData(url, callback) {
    setTimeout(() => {
        callback(null, { id: 1, title: 'Post' });
    }, 1000);
}

loadData('/api/post', (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
});
```

Проблема: «callback hell» при вложенных вызовах.

## Promise

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id: 1 });
        // reject(new Error('Failed'));
    }, 1000);
});

promise
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));
```

### Цепочки

```javascript
fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(`/api/posts?userId=${user.id}`))
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.error(error));
```

### Promise.all / race / allSettled

```javascript
const p1 = fetch('/api/users');
const p2 = fetch('/api/posts');

Promise.all([p1, p2])
    .then(([users, posts]) => console.log(users, posts))
    .catch(error => console.error('Один из запросов упал'));

Promise.allSettled([p1, p2])
    .then(results => {
        results.forEach(r => {
            if (r.status === 'fulfilled') console.log(r.value);
            else console.error(r.reason);
        });
    });

Promise.race([p1, p2]);  // первый завершившийся
```

## async / await

```javascript
async function loadUserPosts(userId) {
    try {
        const userRes = await fetch(`/api/users/${userId}`);
        if (!userRes.ok) throw new Error(`HTTP ${userRes.status}`);
        const user = await userRes.json();

        const postsRes = await fetch(`/api/posts?userId=${user.id}`);
        const posts = await postsRes.json();

        return { user, posts };
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        throw error;
    }
}

loadUserPosts(1).then(data => console.log(data));
```

### Параллельные запросы

```javascript
async function loadDashboard() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);

    return { users, posts, comments };
}
```

Подробнее о HTTP-запросах: [7. Сетевые запросы](network.md).

## Таймеры

```javascript
const timerId = setTimeout(() => console.log('Через 2 сек'), 2000);
clearTimeout(timerId);

const intervalId = setInterval(() => console.log('Каждую секунду'), 1000);
clearInterval(intervalId);
```

## Событийный цикл

```
┌───────────────────────────┐
│   Call Stack (синхронный)  │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│   Microtasks (Promise)    │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│   Macrotasks (setTimeout) │
└───────────────────────────┘
```

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
// 1, 4, 3, 2
```

## Следующий шаг

[7. Сетевые запросы](network.md) — Fetch, FormData, WebSocket, SSE.
