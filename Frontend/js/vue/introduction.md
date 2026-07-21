# 1. Введение в Vue

> Источники: [Introduction | Vue.js](https://vuejs.org/guide/introduction.html) · [Metanit — Что такое Vue 3](https://metanit.com/web/vue/1.1.php)

Вы читаете документацию по **Vue 3**. Поддержка Vue 2 закончилась 31 декабря 2023. Миграция: [Migration Guide](https://v3-migration.vuejs.org/).

## Что такое Vue?

Vue — JavaScript-фреймворк для UI. Минимальный пример (Composition API):

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

```html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

Два ключевых свойства:

1. **Декларативный рендеринг** — шаблон описывает вывод по состоянию.
2. **Реактивность** — Vue отслеживает изменения и обновляет DOM.

### Предварительные знания

Нужны основы [HTML](../../html/README.md), [CSS](../../css/README.md) и [JavaScript](../README.md). Без них лучше сначала освоить базу.

## Прогрессивный фреймворк

Vue можно внедрять постепенно:

| Сценарий | Пример |
|----------|--------|
| Без сборки | Улучшение статичного HTML через CDN |
| Web Components | Встраивание на любую страницу |
| SPA | Одностраничное приложение |
| SSR / SSG | Fullstack, Nuxt, статическая генерация |
| Другие платформы | Desktop, mobile, WebGL |

Ядро Vue одно и то же во всех сценариях — поэтому его называют *The Progressive Framework*.

Подробнее: [Ways of Using Vue](https://vuejs.org/guide/extras/ways-of-using-vue.html).

## Single-File Components (SFC)

В проектах со сборкой компоненты пишут в файлах `*.vue`: логика, шаблон и стили в одном месте.

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC — рекомендуемый способ для полноценных приложений. Подробнее: [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html).

## Стили API

Оба стиля опираются на одну систему. Options API реализован поверх Composition API.

### Options API

Логика через объект опций (`data`, `methods`, `mounted`). Свойства доступны через `this`:

```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Удобен новичкам и для простой прогрессивной доработки страниц без сборки.

### Composition API

Логика через импортируемые функции. В SFC обычно с `<script setup>`:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Гибче для сложных приложений и переиспользования логики (composables).

### Что выбрать?

| Цель | Рекомендация |
|------|--------------|
| Обучение | Любой стиль, который понятнее |
| Без сборки / простые страницы | Options API |
| Полноценное приложение | Composition API + SFC |

Сравнение: [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html).

## Путь обучения

| Путь | Ссылка |
|------|--------|
| Tutorial | [vuejs.org/tutorial](https://vuejs.org/tutorial/) |
| Guide | [vuejs.org/guide](https://vuejs.org/guide/introduction.html) |
| Examples | [vuejs.org/examples](https://vuejs.org/examples/) |
| Metanit (RU) | [metanit.com/web/vue](https://metanit.com/web/vue/) |

Далее: [Установка](installation.md).
