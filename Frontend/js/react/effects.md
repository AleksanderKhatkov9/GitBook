# 9. Эффекты и жизненный цикл (useEffect)

> Источники: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) · [Metanit — useEffect](https://metanit.com/web/react/3.3.php)

**Эффект** синхронизирует компонент с внешней системой: сеть, таймер, подписка, DOM API вне React. Хук — `useEffect`.

Состояние и рендер описывают UI. Эффекты — то, что происходит «рядом»: запросы, слушатели, логирование.

## Базовый синтаксис

```js
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(id); // очистка
  }, []); // [] — один раз после монтирования

  return <p>{seconds} s</p>;
}
```

| Часть | Назначение |
|-------|------------|
| Функция-эффект | Код после отрисовки |
| `return () => ...` | Cleanup при размонтировании / перед повторным запуском |
| Массив зависимостей | Когда перезапускать эффект |

## Массив зависимостей

```js
useEffect(() => {
  // после каждого рендера
});

useEffect(() => {
  // один раз после mount (строгость Strict Mode — см. ниже)
}, []);

useEffect(() => {
  // при изменении userId
  fetchUser(userId);
}, [userId]);
```

Все значения из компонента, которые эффект читает, должны быть в массиве зависимостей (ESLint-правило `react-hooks/exhaustive-deps`).

## Запрос данных

```js
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (!cancelled) {
          setUser(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

Флаг `cancelled` (или AbortController) защищает от обновления state после размонтирования / смены `userId`.

## Соответствие жизненному циклу (ориентир)

| Классовый хук | Близкий аналог |
|---------------|----------------|
| `componentDidMount` | `useEffect(..., [])` |
| `componentDidUpdate` | `useEffect` с зависимостями |
| `componentWillUnmount` | функция очистки из эффекта |

В функциональных компонентах думайте не «жизненный цикл», а «синхронизация с зависимостями».

## Strict Mode (разработка)

В `StrictMode` React в development может **дважды** монтировать компонент, чтобы выявить небезопасные эффекты. Cleanup обязан корректно отменять подписки и таймеры.

## Когда эффект не нужен

| Задача | Лучше так |
|--------|-----------|
| Преобразовать данные для рендера | Вычислить при рендере / `useMemo` |
| Обработать клик | Обработчик события |
| Сбросить state при смене props | Ключ `key` на компоненте |

Не дублируйте props в state через эффект «на всякий случай» — часто это лишний цикл обновлений.

Далее: [Формы](forms.md).
