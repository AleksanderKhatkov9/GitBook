# 11. Хуки: Context, useRef, useReducer

> Источники: [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) · [Metanit — Context, useReducer, useRef](https://metanit.com/web/react/3.7.php)

Кроме `useState` и `useEffect` часто нужны Context (данные без прокидывания props через все уровни), `useRef` (ссылка на DOM / мутабельное значение) и `useReducer` (сложная логика state).

## Context API

**Problem:** props приходится передавать через промежуточные компоненты («prop drilling»).

**Решение:** Context — значение доступно любому потомку провайдера.

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Page />
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
    </ThemeContext.Provider>
  );
}

function Page() {
  return <Button />;
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed button</button>;
}
```

| API | Роль |
|-----|------|
| `createContext(default)` | Создание контекста |
| `<Context.Provider value={...}>` | Раздача значения вниз |
| `useContext(Context)` | Чтение в потомке |

Context удобен для темы, локали, текущего пользователя. Для частых обновлений больших данных часто берут отдельный store (Zustand, Redux) или разбивают контексты.

## useRef

`useRef` возвращает объект `{ current: ... }`, который **сохраняется** между рендерами и **не вызывает** повторный рендер при изменении.

### Ссылка на DOM

```js
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  function focus() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focus}>Focus</button>
    </>
  );
}
```

### Значение между рендерами

```js
const renderCount = useRef(0);
renderCount.current += 1; // UI сам по себе не обновится
```

Типичные случаи: id таймера, предыдущее значение props, «флаг» без рендера.

Не читайте/пишите `ref.current` во время рендера для логики UI — для отображаемых данных используйте state.

## useReducer

Когда переходов state много или они связаны, логику выносят в reducer:

```js
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
```

| | useState | useReducer |
|-|----------|------------|
| Простое значение | Удобнее | Избыточно |
| Много связанных полей / переходов | Сложнее | Удобнее |
| Обновление | `setState(next)` | `dispatch(action)` |

Reducer должен быть чистым: по `state` + `action` возвращать новый state без побочных эффектов.

## Свои хуки

Логику, использующую хуки, можно вынести в функцию с именем `use...`:

```js
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function on() { setOnline(true); }
    function off() { setOnline(false); }
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return online;
}
```

Далее: [Маршрутизация](routing.md).
