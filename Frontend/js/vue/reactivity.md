# 4. Реактивность

> Источники: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) · [Computed](https://vuejs.org/guide/essentials/computed.html) · [Watchers](https://vuejs.org/guide/essentials/watchers.html) · [Metanit — вычисляемые и наблюдаемые](https://metanit.com/web/vue/1.6.php)

## `ref()` — основной API

```js
import { ref } from 'vue'

const count = ref(0)

console.log(count.value) // 0
count.value++
```

В шаблоне `.value` не нужен — ref разворачивается автоматически:

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)

function increment() {
  count.value++ // в JS — через .value
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

`ref` подходит для примитивов и объектов. Объекты внутри ref становятся глубоко реактивными:

```js
const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

obj.value.nested.count++
obj.value.arr.push('baz')
```

## `reactive()`

Делает реактивным сам объект (только object / array / Map / Set):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
state.count++
```

Ограничения:

1. Нельзя хранить примитивы.
2. Нельзя «заменить» весь объект — теряется связь реактивности.
3. Деструктуризация примитивов отрывает реактивность.

Рекомендация официальной документации: для объявления состояния предпочитайте **`ref()`**.

## Options API: `data` и `methods`

```js
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

Не используйте стрелочные функции в `methods` — потеряете корректный `this`.

## Computed — вычисляемые свойства

Кэшируются и пересчитываются только при изменении зависимостей:

```vue
<script setup>
import { ref, computed } from 'vue'

const author = ref({
  name: 'John Doe',
  books: ['Vue 2 Guide', 'Vue 3 Guide']
})

const publishedBooksMessage = computed(() => {
  return author.value.books.length > 0
    ? 'Yes'
    : 'No'
})
</script>

<template>
  <p>{{ publishedBooksMessage }}</p>
</template>
```

Writable computed:

```js
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

| Подход | Когда |
|--------|-------|
| `computed` | Производное значение от состояния |
| Метод в шаблоне | Побочные эффекты / каждый вызов заново |

## Watchers — `watch` и `watchEffect`

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    answer.value = 'Thinking...'
    // fetch...
  }
})

// автоматически отслеживает используемые реактивные источники
watchEffect(() => {
  console.log(`Question is: ${question.value}`)
})
</script>
```

Опции `watch`:

```js
watch(
  () => state.someObject,
  (newVal, oldVal) => { /* ... */ },
  { deep: true, immediate: true }
)
```

| API | Назначение |
|-----|------------|
| `watch` | Явный источник, доступ к old/new |
| `watchEffect` | Автотрекинг, сразу при создании |
| `watchPostEffect` | После обновления DOM |

## Обновление DOM и `nextTick`

Обновления DOM буферизуются. Чтобы дождаться перерисовки:

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // DOM уже обновлён
}
```

Далее: [События](events.md).
