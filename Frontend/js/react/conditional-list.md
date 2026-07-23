# 7. Условный рендеринг и списки

> Источники: [Conditional Rendering](https://react.dev/learn#conditional-rendering) · [Rendering Lists](https://react.dev/learn#rendering-lists) · [Metanit — Основы React](https://metanit.com/web/react/2.1.php)

В React нет отдельных директив вроде `v-if` / `v-for`. Используют обычный JavaScript: `if`, тернарный оператор, `&&`, `map`.

## Условный рендеринг

### if / else

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
```

### Тернарный оператор

```js
<div>
  {isLoggedIn ? <AdminPanel /> : <LoginForm />}
</div>
```

### Логическое &&

Когда ветка `else` не нужна:

```js
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

Осторожно с числами: `{count && <Badge />}` при `count === 0` покажет `0`. Лучше:

```js
{count > 0 && <Badge />}
```

### Ранний return

```js
function Page({ user }) {
  if (!user) {
    return <LoginForm />;
  }
  return <Dashboard user={user} />;
}
```

## Списки и map

```js
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return <ul>{listItems}</ul>;
```

Или прямо в JSX:

{% raw %}
```js
export default function ShoppingList() {
  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  return (
    <ul>
      {products.map(product =>
        <li
          key={product.id}
          style={{
            color: product.isFruit ? 'magenta' : 'darkgreen'
          }}
        >
          {product.title}
        </li>
      )}
    </ul>
  );
}
```
{% endraw %}

## Ключ key

У каждого элемента списка должен быть стабильный **`key`** среди соседей — обычно id из данных.

| Подход | Оценка |
|--------|--------|
| `key={product.id}` | Правильно |
| `key={index}` | Только если список статичен и не переупорядочивается |
| Без `key` | Предупреждение React, баги при обновлении |

React использует `key`, чтобы понять, что вставилось, удалилось или переместилось.

## Фильтрация

```js
const fruits = products.filter(p => p.isFruit);

return (
  <ul>
    {fruits.map(p => <li key={p.id}>{p.title}</li>)}
  </ul>
);
```

Далее: [Стили](styles.md).
