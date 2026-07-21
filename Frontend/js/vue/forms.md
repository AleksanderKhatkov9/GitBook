# 6. Работа с формами

> Источники: [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html) · [Metanit — Глава 3. Формы](https://metanit.com/web/vue/3.1.php)

## `v-model`

Двусторонняя привязка значения элемента формы к состоянию:

```vue
<script setup>
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <input v-model="message" placeholder="edit me" />
  <p>{{ message }}</p>
</template>
```

`v-model` внутри — это `v-bind:value` + `v-on:input` (для большинства элементов).

## Textarea

```vue
<textarea v-model="message"></textarea>
```

Интерполяция внутри `<textarea>{{ message }}</textarea>` **не** работает — используйте только `v-model`.

## Checkbox

Один чекбокс → boolean:

```vue
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

Несколько → массив:

```vue
<script setup>
import { ref } from 'vue'
const checkedNames = ref([])
</script>

<template>
  <input type="checkbox" value="Jack" v-model="checkedNames" />
  <input type="checkbox" value="John" v-model="checkedNames" />
  <input type="checkbox" value="Mike" v-model="checkedNames" />
  <p>{{ checkedNames }}</p>
</template>
```

Кастомные true/false значения:

```vue
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
/>
```

## Radio

```vue
<input type="radio" value="One" v-model="picked" />
<input type="radio" value="Two" v-model="picked" />
<p>{{ picked }}</p>
```

## Select

```vue
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

Множественный выбор → массив:

```vue
<select v-model="multi" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

Динамические опции:

```vue
<select v-model="selected">
  <option v-for="option in options" :key="option.value" :value="option.value">
    {{ option.text }}
  </option>
</select>
```

## Модификаторы `v-model`

| Модификатор | Поведение |
|-------------|-----------|
| `.lazy` | Синхронизация по `change`, не по каждому `input` |
| `.number` | Приведение к числу через `parseFloat` |
| `.trim` | Обрезка пробелов |

```vue
<input v-model.lazy="msg" />
<input v-model.number="age" type="number" />
<input v-model.trim="msg" />
```

## `v-model` на компонентах

Дочерний компонент принимает `modelValue` и эмитит `update:modelValue`:

```vue
<!-- Parent -->
<CustomInput v-model="searchText" />

<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

Именованные модели (Vue 3.4+ удобнее через `defineModel`):

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

Далее: [Условия и списки](conditional-list.md).
