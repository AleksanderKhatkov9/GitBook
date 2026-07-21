# 7. Условный рендеринг и списки

> Источники: [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html) · [List Rendering](https://vuejs.org/guide/essentials/list.html) · [Metanit — Глава 2](https://metanit.com/web/vue/2.1.php)

## `v-if` / `v-else-if` / `v-else`

```vue
<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>

  <button @click="awesome = !awesome">Toggle</button>
</template>
```

Цепочка:

```vue
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

Группировка без лишнего элемента — `<template>`:

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## `v-show`

```vue
<h1 v-show="ok">Hello!</h1>
```

| | `v-if` | `v-show` |
|---|--------|----------|
| DOM | Создаёт/удаляет узлы | Всегда в DOM, CSS `display` |
| Стоимость переключения | Выше | Ниже |
| Начальный рендер | Ленивый (если false) | Всегда рендерит |
| Когда | Редко меняется | Часто переключается |

`v-else` не работает с `v-show`.

## `v-for`

Массив:

```vue
<script setup>
import { ref } from 'vue'
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

<template>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} — {{ item.message }}
  </li>
</template>
```

Объект:

```vue
<li v-for="(value, key, index) in myObject" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

Диапазон:

```vue
<span v-for="n in 10" :key="n">{{ n }}</span>
```

## `:key`

Всегда указывайте уникальный `key` при `v-for` (кроме тривиальных случаев):

```vue
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

`key` помогает Vue корректно переиспользовать и упорядочивать элементы. Не используйте `index` как key, если список переупорядочивается или фильтруется.

## `v-for` с компонентом

```vue
<MyComponent
  v-for="item in items"
  :key="item.id"
  :item="item"
/>
```

Данные в компонент не «протекают» сами — передавайте через props.

## `v-if` и `v-for` на одном элементе

**Не рекомендуется.** Приоритет у `v-if` (он не имеет доступа к переменным `v-for` на том же элементе в Vue 3). Лучше так:

```vue
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

```js
import { computed } from 'vue'

const activeUsers = computed(() =>
  users.value.filter((u) => u.active)
)
```

Или `<template>`:

```vue
<template v-for="user in users" :key="user.id">
  <li v-if="user.active">{{ user.name }}</li>
</template>
```

## Изменение массивов

Реактивные методы: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`.

Замена массива:

```js
items.value = items.value.filter((item) => item.isActive)
```

Фильтрация и сортировка — через `computed`, не мутируйте исходный массив без необходимости:

```js
const sorted = computed(() =>
  [...items.value].sort((a, b) => a.name.localeCompare(b.name))
)

const filtered = computed(() =>
  items.value.filter((i) => i.name.includes(query.value))
)
```

Далее: [Классы и стили](class-style.md).
