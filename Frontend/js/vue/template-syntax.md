# 3. Синтаксис шаблонов

> Источники: [Template Syntax | Vue.js](https://vuejs.org/guide/essentials/template-syntax.html) · [Metanit — Привязка данных](https://metanit.com/web/vue/1.3.php)

Vue использует HTML-подобный синтаксис шаблонов, расширенный директивами и интерполяцией.

## Текстовая интерполяция

```vue
<p>{{ message }}</p>
```

Выражение внутри `{{ }}` вычисляется и вставляется как текст. При изменении `message` текст обновляется.

Одноразово (без реактивных обновлений):

```vue
<p v-once>{{ message }}</p>
```

Сырой HTML (осторожно — XSS):

```vue
<div v-html="rawHtml"></div>
```

Не используйте `v-html` для пользовательского ввода без санитизации. См. [Security](https://vuejs.org/guide/best-practices/security.html).

## Привязка атрибутов: `v-bind`

```vue
<div v-bind:id="dynamicId"></div>

<!-- сокращение -->
<div :id="dynamicId"></div>
```

Булевы атрибуты:

```vue
<button :disabled="isButtonDisabled">Submit</button>
```

Если значение `null`, `undefined` или `false`, атрибут не рендерится.

Несколько атрибутов объектом:

```vue
<script setup>
const attrs = { id: 'container', class: 'wrapper' }
</script>

<template>
  <div v-bind="attrs"></div>
</template>
```

## Выражения в шаблоне

Допустимы JS-выражения:

```vue
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```

Нельзя писать полноценные инструкции:

```vue
<!-- НЕПРАВИЛЬНО -->
{{ var a = 1 }}
{{ if (ok) return message }}
```

Сложную логику выносите в `computed` или методы. См. [Реактивность](reactivity.md).

## Директивы

Директивы — атрибуты с префиксом `v-`. Примеры:

| Директива | Назначение |
|-----------|------------|
| `v-if` / `v-else` / `v-show` | Условный рендеринг |
| `v-for` | Списки |
| `v-on` / `@` | События |
| `v-bind` / `:` | Атрибуты |
| `v-model` | Двусторонняя привязка |
| `v-slot` / `#` | Слоты |
| `v-html` | HTML-контент |
| `v-text` | Текстовый контент |
| `v-once` | Одноразовый рендер |
| `v-memo` | Мемоизация поддерева |

Аргумент:

```vue
<a v-bind:href="url">Link</a>
<a v-on:click="doSomething">Click</a>
```

Динамический аргумент:

```vue
<a v-bind:[attrName]="url">...</a>
<a v-on:[eventName]="handler">...</a>
```

Модификаторы (после `.`):

```vue
<form @submit.prevent="onSubmit">...</form>
<input @keyup.enter="onEnter" />
```

## Сокращения

| Полная форма | Сокращение |
|--------------|------------|
| `v-bind:href` | `:href` |
| `v-on:click` | `@click` |
| `v-slot:header` | `#header` |

```vue
<a :href="url" @click="doSomething">Link</a>
```

Далее: [Реактивность](reactivity.md).
