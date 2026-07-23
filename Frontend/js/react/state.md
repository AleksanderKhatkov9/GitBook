# 6. Состояние (useState)

> Источники: [Updating the Screen](https://react.dev/learn#updating-the-screen) · [Sharing Data](https://react.dev/learn#sharing-data-between-components) · [Metanit — useState](https://metanit.com/web/react/3.1.php)

Чтобы компонент «запоминал» данные и обновлял экран, используют **состояние** (state). Основной хук — `useState`.

## useState

```js
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

`useState(0)` возвращает:

| Элемент | Роль |
|---------|------|
| `count` | Текущее значение |
| `setCount` | Функция обновления |

При вызове `setCount` React снова вызывает компонент с новым значением и перерисовывает UI.

Конвенция имён: `[something, setSomething]`.

## Независимое состояние

Каждый экземпляр компонента имеет своё состояние:

```js
export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```

Клик по одной кнопке не меняет счётчик другой.

## Правила хуков

Функции, начинающиеся с `use`, — **Hooks**. Их вызывают:

- только на **верхнем уровне** компонента (или другого хука);
- не внутри условий, циклов и вложенных функций.

Если нужен `useState` в условии — вынесите логику в отдельный компонент.

## Функциональное обновление

Если новое значение зависит от предыдущего:

```js
setCount(c => c + 1);
setCount(c => c + 1); // надёжнее при нескольких обновлениях подряд
```

## Объекты и массивы в state

Состояние считайте **неизменяемым**: создавайте новый объект/массив, не мутируйте старый.

```js
const [user, setUser] = useState({ name: 'Alice', age: 20 });

// Плохо
user.age = 21;

// Хорошо
setUser({ ...user, age: 21 });

const [items, setItems] = useState([1, 2]);
setItems([...items, 3]);
setItems(items.filter(x => x !== 2));
```

## Подъём состояния (lifting state up)

Чтобы несколько компонентов показывали одни и те же данные и обновлялись вместе, state переносят в ближайшего общего родителя и передают вниз через props.

```js
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

Поток:

1. State живёт в `MyApp`.
2. `count` и `handleClick` передаются как props.
3. Клик вызывает `setCount` в родителе → оба ребёнка получают новый `count`.

Для глобального состояния см. [Context](hooks-advanced.md).

Далее: [Условия и списки](conditional-list.md).
