# 1. Введение в JavaScript

> Источники: [learn.javascript.ru — Введение](https://learn.javascript.ru/) · [metanit.com — Глава 1](https://metanit.com/web/javascript/1.1.php) · [W3Schools — JS Introduction](https://www.w3schools.com/js/js_intro.asp)

JavaScript (JS) — высокоуровневый интерпретируемый язык. Изначально создан для браузера, сегодня используется повсеместно: фронтенд, бэкенд (Node.js), мобильные и desktop-приложения.

## Что такое JavaScript

| Среда | Применение |
|-------|------------|
| Браузер | Интерактивность страниц, DOM, Fetch |
| Node.js | Серверы, CLI, сборщики (Vite, Webpack) |
| Deno / Bun | Альтернативные JS-рантаймы |

JavaScript **не** имеет отношения к Java — это разные языки.

## Подключение JavaScript

### Внутри HTML

```html
<script>
    alert('Привет!');
</script>
```

### Внешний файл

```html
<script src="app.js"></script>
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
```

| Атрибут | Поведение |
|---------|-----------|
| без атрибута | Блокирует парсинг HTML, выполняется сразу |
| `defer` | Загружается параллельно, выполняется после DOM |
| `async` | Загружается параллельно, выполняется при готовности |
| `type="module"` | ES-модуль, автоматически defer |

```html
<script type="module" src="main.js"></script>
```

### В `<head>` vs в конце `<body>`

Рекомендуется подключать скрипты в конце `<body>` или использовать `defer`:

```html
<body>
    <main>...</main>
    <script src="app.js" defer></script>
</body>
```

## Консоль разработчика

Открыть: `F12` или `Ctrl+Shift+I` → вкладка **Console**.

```javascript
console.log('Обычное сообщение');
console.warn('Предупреждение');
console.error('Ошибка');
console.table([{ id: 1, name: 'Anna' }]);
console.time('fetch');
// ... код ...
console.timeEnd('fetch');
```

## Первая программа

```javascript
'use strict';

const name = 'Мир';
console.log(`Привет, ${name}!`);
```

## Строгий режим — "use strict"

Включает более строгие правила: запрещает необъявленные переменные, дублирование параметров и т.д.

```javascript
'use strict';

// x = 10; // ReferenceError — переменная не объявлена
let x = 10;
```

В ES-модулях strict mode включён автоматически.

## Структура кода

```javascript
// Однострочный комментарий

/*
   Многострочный
   комментарий
*/

let message = 'Hello';  // точка с запятой рекомендуется
let count = 42
```

### Именование

```javascript
const userName = 'ivan';      // camelCase для переменных
const MAX_SIZE = 100;         // UPPER_SNAKE для констант
function calculateTotal() {}  // camelCase для функций
class UserAccount {}          // PascalCase для классов
```

## Выполнение кода

### В браузере

1. Браузер загружает HTML
2. Парсит и строит DOM
3. Загружает и выполняет `<script>`
4. JS может изменять DOM, отправлять запросы

### В Node.js

```bash
node app.js
```

```javascript
// app.js
console.log(process.version);
console.log('Node.js работает');
```

## JavaScript и TypeScript

TypeScript — надмножество JS с типизацией. Компилируется в JavaScript:

```javascript
// TypeScript — типизированное надмножество JS (компилируется в JavaScript)
function greet(name) {
    return `Привет, ${name}!`;
}
```

Для новых проектов на React/Vue/Next часто выбирают TypeScript.

## Следующий шаг

[2. Основы JavaScript](basics.md) — переменные, типы данных, операторы, циклы.
