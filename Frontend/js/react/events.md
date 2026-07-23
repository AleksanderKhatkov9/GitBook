# 5. Обработка событий

> Источники: [Responding to Events](https://react.dev/learn#responding-to-events) · [Metanit — События](https://metanit.com/web/react/2.4.php)

События в React объявляют как props с именами в camelCase: `onClick`, `onChange`, `onSubmit`. В значение передают **функцию**, а не её вызов.

## Обработчик

```js
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

| Правильно | Неправильно |
|-----------|-------------|
| `onClick={handleClick}` | `onClick={handleClick()}` — вызов сразу при рендере |
| `onClick={() => alert('hi')}` | — |

Inline-стрелочная функция допустима:

```js
<button onClick={() => alert('hi')}>
  Click
</button>
```

## Объект события

React передаёт синтетическое событие (обёртка над нативным):

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Send</button>
    </form>
  );
}
```

Частые методы: `e.preventDefault()`, `e.stopPropagation()`, `e.target`, `e.currentTarget`.

## Передача аргументов

```js
function Toolbar() {
  return (
    <div>
      <Button onClick={() => alert('Playing')}>Play Movie</Button>
      <Button onClick={() => alert('Uploading')}>Upload Image</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

Родитель передаёт поведение через props — ребёнок вызывает `onClick` при клике.

## Всплытие (bubbling)

События всплывают, как в DOM. Остановить: `e.stopPropagation()`.

```js
function Parent() {
  return (
    <div onClick={() => console.log('parent')}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log('button');
        }}
      >
        Click
      </button>
    </div>
  );
}
```

## Именование

| Паттерн | Пример |
|---------|--------|
| Обработчик внутри компонента | `handleClick`, `handleSubmit` |
| Prop от родителя | `onClick`, `onSend`, `onUserLogin` |

Далее: [Состояние](state.md).
