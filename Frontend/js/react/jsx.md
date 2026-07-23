# 3. JSX — разметка в JavaScript

> Источники: [Writing Markup with JSX](https://react.dev/learn#writing-markup-with-jsx) · [Metanit — Основы JSX](https://metanit.com/web/react/1.3.php)

**JSX** — расширение синтаксиса JavaScript: разметка выглядит как HTML, но это выражения внутри JS. Большинство проектов React используют JSX; инструменты сборки (Vite и др.) преобразуют его в вызовы `React.createElement` / компилятор.

## Базовый синтаксис

```js
const element = <h1>Hello, world!</h1>;
```

Компонент возвращает JSX:

```js
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

## Правила JSX

| Правило | Пример |
|---------|--------|
| Теги закрываются | `<br />`, `<img />` |
| Один корень | обернуть в `<div>` или фрагмент `<>...</>` |
| `class` → `className` | `<div className="box">` |
| `for` → `htmlFor` | `<label htmlFor="email">` |
| camelCase для атрибутов | `onClick`, `tabIndex`, `strokeWidth` |

Несколько соседних элементов без обёртки — ошибка. Фрагмент не создаёт лишний DOM-узел:

```js
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);
```

Эквивалент: `<React.Fragment>...</React.Fragment>`.

## Выражения в фигурных скобках

Внутри JSX `{}` — выход в JavaScript: переменные, вычисления, вызовы функций.

{% raw %}
```js
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

| Контекст | Синтаксис |
|----------|-----------|
| Текст / дети | `{user.name}` |
| Атрибут-строка | `className="avatar"` |
| Атрибут из JS | `src={user.imageUrl}` |
| Объект стилей | `style={{ width: 90 }}` |

`style={{ }}` — объект JS внутри JSX-скобок `{ }`, не особый синтаксис.
{% endraw %}

В `{}` можно писать выражения (`a + b`, тернарный оператор, вызов функции), но не произвольные statements вроде `if` / `for` — их выносят выше `return` или заменяют выражениями.

## JSX и HTML

Конвертер HTML → JSX: [transform.tools/html-to-jsx](https://transform.tools/html-to-jsx).

```js
// HTML:  <div class="card" tabindex="0">
// JSX:
<div className="card" tabIndex={0}>
```

Булевы атрибуты:

```js
<button disabled>Can't click</button>
<input type="checkbox" defaultChecked />
```

## Без JSX

```js
import { createElement } from 'react';

function MyButton() {
  return createElement('button', null, "I'm a button");
}
```

JSX удобнее для разметки; без него код быстро разрастается.

Далее: [Компоненты и props](components.md).
