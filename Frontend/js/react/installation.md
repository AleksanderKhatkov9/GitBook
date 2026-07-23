# 2. Установка и создание приложения

> Источники: [Installation | React](https://react.dev/learn/installation) · [Metanit — Первое приложение](https://metanit.com/web/react/1.2.php)

React можно подключать постепенно: песочница в браузере, CDN на существующей странице или полноценный проект со сборкой.

## Рекомендуемый способ: Vite

Нужны [Node.js](https://nodejs.org/) 18+ и npm.

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

Откроется Vite-сервер, обычно [http://localhost:5173](http://localhost:5173).

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки |

Шаблон с TypeScript: `--template react-ts`.

> **Create React App** устарел и не рекомендуется. Для production-приложений с SSR/маршрутизацией «из коробки» смотрите [Next.js](../next/README.md).

## Структура типичного проекта (Vite)

```
my-react-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx       ← createRoot + mount
│   ├── App.jsx        ← корневой компонент
│   ├── App.css
│   ├── index.css
│   └── assets/
└── public/
```

Точка входа `main.jsx`:

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

`createRoot` создаёт корень React; `.render(...)` монтирует дерево компонентов в DOM-элемент `#root`.

## Без сборки (CDN)

Для прототипов и встраивания на страницу (Babel в браузере — только для обучения):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React CDN</title>
  <script src="https://unpkg.com/react@19/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@19/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      return <h1>Hello, React!</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

Для production указывайте конкретные версии и собирайте проект бандлером (Vite и т.п.).

### ESM CDN (без Babel)

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@19",
    "react-dom/client": "https://esm.sh/react-dom@19/client"
  }
}
</script>

<script type="module">
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return createElement('h1', null, 'Hello without JSX');
}

createRoot(document.getElementById('root')).render(createElement(App));
</script>
```

## IDE и инструменты

| Инструмент | Зачем |
|------------|-------|
| VS Code / Cursor + расширения ESLint, Prettier | Редактор |
| [React Developer Tools](https://react.dev/learn/react-developer-tools) | Дерево компонентов, props, state в браузере |
| [CodeSandbox](https://codesandbox.io/) / StackBlitz | Онлайн-песочницы |

## Laravel + Vite

В Laravel React обычно подключают через Vite. См. [Frontend в Laravel](../../../Backend/laravel/frontend.md).

Далее: [JSX](jsx.md).
