# 1. Введение в React

> Источники: [Quick Start | React](https://react.dev/learn) · [Metanit — Что такое React](https://metanit.com/web/react/1.1.php)

**React** — библиотека JavaScript для создания пользовательских интерфейсов (в т.ч. SPA, где контент обновляется без полной перезагрузки страницы). Первый релиз — 2013; актуальная линия — **React 19**.

React помогает собирать UI из **переиспользуемых компонентов** — кнопка, форма или целая страница. Компоненты комбинируют, вкладывают друг в друга и переносят между проектами.

### Предварительные знания

Нужны основы [HTML](../../html/README.md), [CSS](../../css/README.md) и [JavaScript](../README.md) (функции, модули, массивы, деструктуризация).

## Минимальный пример

Компонент — функция, которая возвращает разметку:

```js
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

Имена компонентов начинаются с **заглавной буквы** (`MyButton`). Обычные HTML-теги — в нижнем регистре (`button`, `div`).

## Virtual DOM

DOM (Document Object Model) — дерево HTML-элементов страницы. Прямые частые изменения DOM из JavaScript дороги по производительности.

**Virtual DOM** — лёгкое представление UI в памяти. React:

1. Вносит изменения в виртуальный DOM.
2. Сравнивает новое и предыдущее состояние (reconciliation).
3. Применяет к реальному DOM минимальный набор обновлений.

Так уменьшается лишняя перерисовка при сложном динамическом UI.

## Особенности React

| Особенность | Смысл |
|-------------|--------|
| **Декларативность** | Описываете, как UI должен выглядеть при данном состоянии |
| **Компоненты** | Независимые блоки UI, которые можно переиспользовать |
| **JSX** | Разметка рядом с логикой JavaScript |
| **Однонаправленный поток данных** | Данные идут сверху вниз через props — предсказуемее отладка |
| **Хуки** | `useState`, `useEffect` и др. для состояния и побочных эффектов |

## Экосистема

| Область | Примеры |
|---------|---------|
| Маршрутизация | [React Router](https://reactrouter.com/) |
| Состояние | Context API, Redux, Zustand, React Query |
| Фреймворки | [Next.js](../next/README.md), Remix |
| Стили | CSS Modules, Tailwind, styled-components |
| Мобильные | React Native |
| Отладка | [React Developer Tools](https://react.dev/learn/react-developer-tools) |

## Путь обучения

| Ресурс | Ссылка |
|--------|--------|
| Quick Start | [react.dev/learn](https://react.dev/learn) |
| Tutorial (крестики-нолики) | [react.dev/learn/tutorial-tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe) |
| Metanit (RU) | [metanit.com/web/react](https://metanit.com/web/react/) |

Далее: [Установка](installation.md).
