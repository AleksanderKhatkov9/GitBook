# Введение в JavaScript

> Руководства: [learn.javascript.ru](https://learn.javascript.ru/) · [metanit.com — JavaScript](https://metanit.com/web/javascript/) · [W3Schools — JS](https://www.w3schools.com/js/default.asp)  
> Справочник: [MDN JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript)

Базовый курс JavaScript: от подключения скрипта до модулей, DOM и сетевых запросов.

## Справочник раздела

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

## Требования

- Современный браузер с поддержкой ES2020+
- [Node.js](https://nodejs.org) LTS — для инструментов сборки (по желанию)

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

## Дальше

После основ: [Vue](../vue/README.md), [React](../react/README.md), [Next.js](../next/README.md).
