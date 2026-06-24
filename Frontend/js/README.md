# JavaScript

> Руководства: [learn.javascript.ru](https://learn.javascript.ru/) · [metanit.com — JavaScript](https://metanit.com/web/javascript/) · [W3Schools — JS](https://www.w3schools.com/js/default.asp)  
> Справочник: [MDN JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript)

JavaScript — язык программирования для веба. Работает в браузере, на сервере (Node.js) и в мобильных приложениях.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Что такое JS, подключение, консоль, strict mode |
| [2. Основы](basics.md) | Переменные, типы, операторы, условия, циклы |
| [3. Функции](functions.md) | Объявление, стрелочные функции, замыкания, scope |
| [4. Объекты и классы](objects-classes.md) | Объекты, прототипы, классы, деструктуризация |
| [5. Массивы и коллекции](arrays-collections.md) | Array, Set, Map, строки, RegExp |
| [6. Асинхронность](async.md) | Ошибки, Promise, async/await |
| [7. Сетевые запросы](network.md) | Fetch, FormData, WebSocket, SSE, CORS |
| [8. DOM и события](dom-events.md) | Работа со страницей, обработка событий |
| [9. Модули и хранение](modules-storage.md) | ES modules, JSON, localStorage |

## Фреймворки

| Раздел | Описание |
|--------|----------|
| [Vue](vue/README.md) | Прогрессивный JS-фреймворк |
| [React](react/README.md) | Библиотека UI от Meta |
| [Next.js](next/README.md) | React-фреймворк с SSR |

## Требования

- [Node.js](https://nodejs.org) LTS — для инструментов сборки
- Современный браузер с поддержкой ES2020+

```bash
node -v
npm -v
```

## Первая программа

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>JS</title>
</head>
<body>
    <p id="output"></p>
    <script>
        document.getElementById('output').textContent = 'Привет, JavaScript!';
    </script>
</body>
</html>
```

## JavaScript в Laravel

Vite собирает JS из `resources/js/app.js`:

```javascript
import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Laravel + Vite готов');
});
```

Подключение в Blade:

```html
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

## Полезные ссылки

| Ресурс | Описание |
|--------|----------|
| [MDN JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Справочник и гайды |
| [Can I Use](https://caniuse.com/) | Поддержка возможностей браузерами |
| [ECMAScript spec](https://tc39.es/ecma262/) | Спецификация языка |
