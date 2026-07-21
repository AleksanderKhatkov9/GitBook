# 5. Обработка событий

> Источники: [Event Handling | Vue.js](https://vuejs.org/guide/essentials/event-handling.html) · [Metanit — События](https://metanit.com/web/vue/1.4.php)

## Слушатели: `v-on` / `@`

```vue
<button v-on:click="doSomething">Click</button>
<button @click="doSomething">Click</button>
```

## Inline-обработчики

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Add 1</button>
  <button @click="count += 5">Add 5</button>
</template>
```

Доступ к событию через `$event`:

```vue
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
function warn(message, event) {
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

## Методы как обработчики

```vue
<script setup>
function greet(event) {
  alert('Hello!')
  console.log(event.target.tagName) // BUTTON
}
</script>

<template>
  <button @click="greet">Greet</button>
</template>
```

С аргументами:

```vue
<button @click="say('hello')">Say hello</button>
```

```js
function say(message) {
  alert(message)
}
```

## Модификаторы событий

```vue
<!-- preventDefault -->
<form @submit.prevent="onSubmit">...</form>

<!-- stopPropagation -->
<a @click.stop="doThis"></a>

<!-- цепочка -->
<a @click.stop.prevent="doThat"></a>

<!-- только на самом элементе, не на потомках -->
<div @click.self="doThat">...</div>

<!-- один раз -->
<a @click.once="doThis"></a>

<!-- passive для scroll (производительность) -->
<div @scroll.passive="onScroll">...</div>
```

| Модификатор | Эффект |
|-------------|--------|
| `.stop` | `event.stopPropagation()` |
| `.prevent` | `event.preventDefault()` |
| `.self` | Только если `event.target` === элемент |
| `.capture` | Фаза capture |
| `.once` | Сработает один раз |
| `.passive` | `{ passive: true }` |

## Клавиатурные модификаторы

```vue
<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />
<input @keyup.ctrl.enter="onSubmit" />
```

Системные клавиши: `.ctrl`, `.alt`, `.shift`, `.meta`.

Кнопки мыши: `.left`, `.right`, `.middle`.

```vue
<!-- Ctrl + Click -->
<div @click.ctrl="onCtrlClick">A</div>

<!-- точное сочетание (без других модификаторов) -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<button @click.exact="onClick">A</button>
```

## Пример: счётчик

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function onIncrement() {
  count.value++
}

function onReset() {
  count.value = 0
}
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="onIncrement">+</button>
  <button @click="onReset">Reset</button>
  <button @click="count--">−</button>
</template>
```

Далее: [Формы](forms.md).
