# React

> Официальная документация: [react.dev](https://react.dev/) · [Quick Start](https://react.dev/learn) · [Metanit — React](https://metanit.com/web/react/)

React — библиотека JavaScript для построения пользовательских интерфейсов. Разработана Meta, текущая линия — **React 19**. Компоненты, декларативный UI и однонаправленный поток данных — основа экосистемы (в т.ч. [Next.js](../next/README.md)).

## Справочник раздела

| Раздел | Описание |
|--------|----------|
| [1. Введение](introduction.md) | Что такое React, Virtual DOM, экосистема |
| [2. Установка](installation.md) | Vite, CDN, структура проекта |
| [3. JSX](jsx.md) | Разметка, выражения, фрагменты |
| [4. Компоненты и props](components.md) | Создание, вложенность, props, children |
| [5. События](events.md) | Обработчики, `onClick`, передача функций |
| [6. Состояние](state.md) | `useState`, обновление UI, подъём состояния |
| [7. Условия и списки](conditional-list.md) | Условный рендер, `map`, `key` |
| [8. Стили](styles.md) | `className`, inline `style` |
| [9. Эффекты](effects.md) | `useEffect`, жизненный цикл, очистка |
| [10. Формы](forms.md) | Контролируемые поля, валидация |
| [11. Хуки и Context](hooks-advanced.md) | Context, `useRef`, `useReducer` |
| [12. Маршрутизация](routing.md) | React Router: маршруты, ссылки, params |

## Быстрый старт

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

Приложение: [http://localhost:5173](http://localhost:5173)

> Create React App устарел — для новых проектов используйте Vite или фреймворк ([Next.js](../next/README.md)).

## Основные концепции

| Концепция | Суть |
|-----------|------|
| **Компоненты** | Функции, возвращающие разметку (UI) |
| **JSX** | Синтаксис разметки в JavaScript |
| **State** | Данные, при изменении которых React перерисовывает UI |
| **Props** | Данные от родителя к ребёнку |
| **Хуки** | Функции `use*` (`useState`, `useEffect` и др.) |

## Рекомендуемый стиль в этом разделе

Функциональные компоненты + хуки. Классовые компоненты упоминаются только для сравнения со старым кодом.

## Laravel

Подключение React к Laravel (Inertia, Vite, API): [Frontend](../../../Backend/laravel/frontend.md).

## Источники

- [React — Quick Start](https://react.dev/learn)
- [React — Learn](https://react.dev/learn)
- [Руководство по React — Metanit](https://metanit.com/web/react/)
- [React Router](https://reactrouter.com/)
