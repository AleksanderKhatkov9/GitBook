# 9. Жизненный цикл и Template Refs

> Источники: [Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html) · [Template Refs](https://vuejs.org/guide/essentials/template-refs.html) · [Metanit — Жизненный цикл](https://metanit.com/web/vue/1.11.php)

## Диаграмма жизненного цикла

Упрощённо для компонента:

```
create → setup / beforeCreate → created
      → beforeMount → mounted
      → beforeUpdate → updated  (при изменениях)
      → beforeUnmount → unmounted
```

Полная схема: [Lifecycle Diagram](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram).

## Composition API: хуки

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

onMounted(() => {
  console.log('component mounted')
})

onUnmounted(() => {
  // очистка таймеров, подписок, listeners
})
</script>
```

| Хук | Когда |
|-----|-------|
| `onBeforeMount` | Перед первым рендером |
| `onMounted` | После монтирования в DOM |
| `onBeforeUpdate` | Перед обновлением DOM из-за состояния |
| `onUpdated` | После обновления DOM |
| `onBeforeUnmount` | Перед размонтированием |
| `onUnmounted` | После размонтирования |
| `onErrorCaptured` | Ошибка в потомке |
| `onActivated` / `onDeactivated` | С `<KeepAlive>` |

Хуки регистрируйте синхронно в `setup` / `<script setup>` (не внутри `async` без осторожности).

## Options API

```js
export default {
  created() {
    // состояние есть, DOM ещё нет
  },
  mounted() {
    // DOM доступен
  },
  beforeUnmount() {
    // очистка
  }
}
```

| Options | Composition |
|---------|-------------|
| `beforeCreate` / `created` | код в `setup` сам по себе |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeUnmount` | `onBeforeUnmount` |
| `unmounted` | `onUnmounted` |

## Template Refs

Доступ к DOM-элементу или экземпляру дочернего компонента:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  inputRef.value.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

Имя `ref` в шаблоне должно совпадать с переменной (в `<script setup>`).

### Ref в `v-for`

```vue
<script setup>
import { ref, onMounted } from 'vue'

const itemRefs = ref([])

onMounted(() => {
  console.log(itemRefs.value) // массив элементов
})
</script>

<template>
  <ul>
    <li v-for="item in list" :key="item.id" :ref="itemRefs">
      {{ item.name }}
    </li>
  </ul>
</template>
```

В Vue 3.5+ поведение refs в `v-for` уточнено — см. актуальные [docs](https://vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for).

### Ref на компонент

```vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const child = ref(null)

function callChild() {
  child.value.someMethod()
}
</script>

<template>
  <ChildComp ref="child" />
</template>
```

В Composition API наружу нужно явно экспортировать через `defineExpose`:

```vue
<!-- ChildComp.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
function someMethod() {
  count.value++
}

defineExpose({ someMethod, count })
</script>
```

## Типичный паттерн очистки

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let timerId

onMounted(() => {
  timerId = setInterval(() => {
    /* ... */
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerId)
})
</script>
```

Далее: [Компоненты](components.md).
