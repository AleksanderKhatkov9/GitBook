# 10. Формы

> Источники: [React — Forms (docs)](https://react.dev/reference/react-dom/components/input) · [Metanit — Работа с формами](https://metanit.com/web/react/4.1.php)

В React поля формы обычно делают **контролируемыми**: значение хранится в state, а `onChange` его обновляет.

## Контролируемый input

```js
import { useState } from 'react';

export default function NameForm() {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Hello, ${name}!`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{' '}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
```

| Атрибут | Роль |
|---------|------|
| `value={name}` | Отображаемое значение из state |
| `onChange` | Обновление state при вводе |
| `e.preventDefault()` | Без перезагрузки страницы |

## Несколько полей

Один объект state или несколько `useState`:

```js
const [form, setForm] = useState({
  email: '',
  password: '',
});

function handleChange(e) {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
}

return (
  <form>
    <input name="email" value={form.email} onChange={handleChange} />
    <input
      name="password"
      type="password"
      value={form.password}
      onChange={handleChange}
    />
  </form>
);
```

Имена `name` у полей совпадают с ключами объекта.

## Checkbox, radio, select

```js
const [agree, setAgree] = useState(false);
const [color, setColor] = useState('red');
const [city, setCity] = useState('msk');

<input
  type="checkbox"
  checked={agree}
  onChange={e => setAgree(e.target.checked)}
/>

<input
  type="radio"
  name="color"
  value="red"
  checked={color === 'red'}
  onChange={e => setColor(e.target.value)}
/>

<select value={city} onChange={e => setCity(e.target.value)}>
  <option value="msk">Moscow</option>
  <option value="spb">Saint Petersburg</option>
</select>
```

Для checkbox используют `checked` / `e.target.checked`, не `value`.

## Textarea

В React `textarea` — самозакрывающийся по смыслу контролируемый элемент с `value`:

```js
<textarea
  value={text}
  onChange={e => setText(e.target.value)}
/>
```

## Простая валидация

```js
function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    // отправка...
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign up</button>
    </form>
  );
}
```

## Неконтролируемые поля и ref

Иногда значение читают только при submit через DOM:

```js
import { useRef } from 'react';

function FileForm() {
  const fileRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    console.log(file);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  );
}
```

Для обычного текста предпочтительны контролируемые компоненты. Подробнее про ref: [Хуки и Context](hooks-advanced.md).

## Поиск и фильтрация списка

```js
const [query, setQuery] = useState('');
const filtered = items.filter(item =>
  item.title.toLowerCase().includes(query.toLowerCase())
);

return (
  <>
    <input value={query} onChange={e => setQuery(e.target.value)} />
    <ul>
      {filtered.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  </>
);
```

Далее: [Хуки и Context](hooks-advanced.md).
