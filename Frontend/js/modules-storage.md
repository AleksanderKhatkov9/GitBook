# 9. Модули и хранение данных

> Источники: [learn.javascript.ru — Модули](https://learn.javascript.ru/modules-intro) · [metanit.com — Главы 16, 22](https://metanit.com/web/javascript/22.1.php) · [W3Schools — JS Modules](https://www.w3schools.com/js/js_modules.asp)

## ES Modules

### Экспорт

```javascript
// utils.js
export const PI = 3.14159;

export function sum(a, b) {
    return a + b;
}

export default class Calculator {
    add(a, b) { return a + b; }
}
```

### Импорт

```javascript
// main.js
import Calculator, { PI, sum } from './utils.js';
import { sum as addNumbers } from './utils.js';
import * as utils from './utils.js';

console.log(PI, sum(2, 3));
const calc = new Calculator();
```

### Подключение в HTML

```html
<script type="module" src="main.js"></script>
```

Модули выполняются в strict mode, переменные изолированы, `import`/`export` работают только между модулями.

### Динамический импорт

```javascript
async function loadChart() {
    const { Chart } = await import('./chart.js');
    new Chart('#canvas');
}

// Условная загрузка
if (user.isAdmin) {
    const admin = await import('./admin.js');
    admin.init();
}
```

## Структура проекта (Vite / Laravel)

```
resources/js/
├── app.js          # точка входа
├── bootstrap.js
├── api/
│   └── posts.js
└── components/
    └── modal.js
```

```javascript
// resources/js/api/posts.js
export async function fetchPosts() {
    const res = await fetch('/api/posts');
    return res.json();
}

// resources/js/app.js
import { fetchPosts } from './api/posts.js';

fetchPosts().then(posts => console.log(posts));
```

## JSON

```javascript
const user = {
    id: 1,
    name: 'Anna',
    roles: ['user', 'editor'],
    createdAt: new Date()
};

JSON.stringify(user, null, 2);
JSON.parse('{"id":1}');

// Date при stringify → строка ISO
// Функции, undefined, Symbol — пропускаются
```

## localStorage и sessionStorage

```javascript
// localStorage — сохраняется между сессиями
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');     // 'dark'
localStorage.removeItem('theme');
localStorage.clear();

// sessionStorage — только текущая вкладка
sessionStorage.setItem('tabId', '123');

// Хранить объекты
const settings = { theme: 'dark', lang: 'ru' };
localStorage.setItem('settings', JSON.stringify(settings));
const saved = JSON.parse(localStorage.getItem('settings'));
```

| API | Объём | Срок жизни |
|-----|-------|------------|
| `localStorage` | ~5 МБ | Постоянно |
| `sessionStorage` | ~5 МБ | До закрытия вкладки |
| Cookies | ~4 КБ | Задаётся вручную |

## Cookies

```javascript
// Запись
document.cookie = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';

// Чтение — парсинг строки
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

getCookie('theme');
```

Laravel управляет cookies через middleware и `Cookie` facade — предпочтительнее для auth-токенов.

## IndexedDB (кратко)

Для больших объёмов структурированных данных в браузере:

```javascript
const request = indexedDB.open('MyApp', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('posts', { keyPath: 'id' });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction('posts', 'readwrite');
    tx.objectStore('posts').add({ id: 1, title: 'Hello' });
};
```

## BOM — Browser Object Model

```javascript
// window — глобальный объект браузера
window.innerWidth;
window.innerHeight;
window.location.href;       // текущий URL
window.location.pathname;   // '/about'
window.history.back();
window.history.pushState({}, '', '/new-page');

window.open('https://example.com', '_blank');
window.close();

// Диалоги (избегайте в UX)
// alert('Сообщение');
// const ok = confirm('Продолжить?');
// const name = prompt('Ваше имя?');
```

## navigator

```javascript
navigator.userAgent;
navigator.language;          // 'ru-RU'
navigator.onLine;            // true/false
navigator.clipboard.writeText('скопировано');
```

## Web Workers (кратко)

Тяжёлые вычисления в отдельном потоке:

```javascript
// worker.js
self.onmessage = (e) => {
    const result = heavyCalculation(e.data);
    self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage(largeData);
worker.onmessage = (e) => console.log(e.data);
```

## Полезные паттерны

### Модуль-паттерн (IIFE)

```javascript
const App = (function() {
    let config = {};

    function init(options) {
        config = options;
    }

    return { init };
})();

App.init({ debug: true });
```

### Namespace

```javascript
window.MyApp = window.MyApp || {};
MyApp.utils = { formatDate(d) { return d.toISOString(); } };
MyApp.api = { fetchUsers() { return fetch('/api/users'); } };
```

## Полезные ссылки

- [MDN — Modules](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules)
- [MDN — Web Storage API](https://developer.mozilla.org/ru/docs/Web/API/Web_Storage_API)
- [MDN — IndexedDB](https://developer.mozilla.org/ru/docs/Web/API/IndexedDB_API)

[← Вернуться к оглавлению](README.md)
