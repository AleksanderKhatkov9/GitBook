# 8. Привязка классов и стилей

> Источники: [Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html) · [Metanit — CSS и стили](https://metanit.com/web/vue/1.8.php)

## Класс: объектный синтаксис

```vue
<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
</script>

<template>
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
</template>
```

С обычным `class`:

```vue
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Результат при `isActive === true`, `hasError === false`:

```html
<div class="static active"></div>
```

Объект в переменной:

```vue
<script setup>
import { reactive } from 'vue'
const classObject = reactive({
  active: true,
  'text-danger': false
})
</script>

<template>
  <div :class="classObject"></div>
</template>
```

Или `computed`:

```js
const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

## Класс: массивный синтаксис

```vue
<div :class="[activeClass, errorClass]"></div>
```

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

Смешение с объектом:

```vue
<div :class="[{ active: isActive }, errorClass]"></div>
```

## Стили: объектный синтаксис

```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

Ключи можно писать в camelCase или kebab-case (в кавычках):

```vue
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Объект в переменной:

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

```vue
<div :style="styleObject"></div>
```

## Стили: массивный синтаксис

```vue
<div :style="[baseStyles, overridingStyles]"></div>
```

## Автопрефиксы и множественные значения

Vue автоматически добавляет вендорные префиксы при необходимости.

Несколько значений (браузер возьмёт последнее поддерживаемое):

```vue
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## Классы на компонентах

При `:class` / `class` на дочернем компоненте классы по умолчанию попадают на **корневой** элемент ребёнка. С несколькими корневыми элементами нужен явный `$attrs` / атрибут на нужном узле.

Далее: [Жизненный цикл](lifecycle.md).
