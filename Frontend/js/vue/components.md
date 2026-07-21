# 10. Компоненты

> Источники: [Components Basics](https://vuejs.org/guide/essentials/component-basics.html) · [Props](https://vuejs.org/guide/components/props.html) · [Events](https://vuejs.org/guide/components/events.html) · [Metanit — Глава 4](https://metanit.com/web/vue/4.1.php)

Компоненты делят UI на независимые переиспользуемые части — дерево вложенных блоков, как HTML-элементы.

## Определение и использование

`ButtonCounter.vue`:

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>
```

Родитель:

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Child components</h1>
  <ButtonCounter />
  <ButtonCounter />
</template>
```

С `<script setup>` импортированные компоненты сразу доступны в шаблоне. Каждый экземпляр имеет своё состояние.

Имена тегов — **PascalCase** (`<ButtonCounter />`). В in-DOM шаблонах без сборки — kebab-case и закрывающие теги.

## Props — данные вниз

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

```vue
<BlogPost title="My journey with Vue" />
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
/>
```

Доступ в скрипте:

```js
const props = defineProps(['title'])
console.log(props.title)
```

### Валидация props

```js
defineProps({
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  commentIds: {
    type: Array,
    default: () => []
  },
  author: Object
})
```

Типы: `String`, `Number`, `Boolean`, `Array`, `Object`, `Function`, `Date` и др.

Props — **однонаправленный** поток: родитель → ребёнок. Не мутируйте props внутри ребёнка; эмитьте событие или используйте локальную копию / computed.

## События — данные вверх

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
const emit = defineEmits(['enlarge-text'])
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

Родитель:

```vue
<BlogPost
  :title="post.title"
  @enlarge-text="postFontSize += 0.1"
/>
```

С полезной нагрузкой:

```js
emit('update', { id: 1, value: 'new' })
```

```vue
<Child @update="onUpdate" />
```

```js
function onUpdate(payload) {
  console.log(payload.id, payload.value)
}
```

## Регистрация

| Тип | Как |
|-----|-----|
| Локальная | `import` в родителе (предпочтительно) |
| Глобальная | `app.component('MyComp', MyComp)` |

Глобальная регистрация удобна для очень частых UI-элементов, но усложняет tree-shaking и зависимости.

## Динамические компоненты

```vue
<script setup>
import { ref, shallowRef } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'

const current = shallowRef(CompA)
</script>

<template>
  <component :is="current"></component>
  <button @click="current = CompA">A</button>
  <button @click="current = CompB">B</button>
</template>
```

Чтобы не уничтожать неактивные вкладки — оберните в `<KeepAlive>`.

## Кратко о потоке данных

```
Parent  --props-->  Child
Parent  <--events--  Child
Parent  --slots-->  Child   (контент, см. следующий раздел)
```

Далее: [Слоты](slots.md).
