# 4. Компоненты и props

> Источники: [Creating and nesting components](https://react.dev/learn#components) · [Passing Props](https://react.dev/learn/passing-props-to-a-component) · [Metanit — Компоненты, Props](https://metanit.com/web/react/2.2.php)

Приложение React — дерево **компонентов**. Компонент — функция, возвращающая разметку; он инкапсулирует логику и внешний вид.

## Объявление и вложенность

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

`export default` отмечает главный компонент файла. Вложенный компонент пишут как тег: `<MyButton />`.

Имена — **PascalCase**. Так React отличает компоненты от HTML-тегов.

## Props — данные сверху вниз

**Props** (properties) — аргументы компонента. Родитель передаёт значения, ребёнок только читает их (не мутирует).

```js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </>
  );
}
```

Передача выражений:

```js
<Avatar person={person} size={size} />
<img src={user.imageUrl} alt={user.name} />
```

Деструктуризация в параметрах — обычный стиль:

```js
function Avatar({ person, size = 100 }) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

Значение по умолчанию: `size = 100`.

### Props — только для чтения

```js
// Плохо: мутация props
function Bad({ items }) {
  items.push('x'); // не делайте так
}

// Хорошо: копия или состояние
function Good({ items }) {
  const next = [...items, 'x'];
  // ...
}
```

Чтобы изменить данные «вверх», передайте callback из родителя (см. [События](events.md) и [Состояние](state.md)).

## children

Всё между открывающим и закрывающим тегом попадает в `props.children`:

```js
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content inside the card</p>
    </Card>
  );
}
```

Так собирают layout-компоненты (аналог слотов во Vue).

## Составные компоненты

Несколько маленьких компонентов вместо одного большого:

```js
function Comment({ author, text }) {
  return (
    <div className="comment">
      <Avatar person={author} size={48} />
      <UserInfo person={author} />
      <p>{text}</p>
    </div>
  );
}
```

Каждый экземпляр компонента независим: свой props, своё state (если есть).

## Условный рендер компонента

```js
function Page({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <AdminPanel /> : <LoginForm />}
    </div>
  );
}
```

Подробнее: [Условия и списки](conditional-list.md).

Далее: [События](events.md).
