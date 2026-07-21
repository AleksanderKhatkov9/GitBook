# 11. Слоты

> Источники: [Slots | Vue.js](https://vuejs.org/guide/components/slots.html) · [Metanit — Глава 5. Слоты](https://metanit.com/web/vue/5.1.php)

Слоты позволяют родителю передавать разметку внутрь дочернего компонента (как `children` в React).

## Базовый слот

```vue
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>Error</strong>
    <slot />
  </div>
</template>
```

```vue
<AlertBox>
  Something bad happened.
</AlertBox>
```

Контент родителя подставляется на место `<slot />`.

## Fallback (содержимое по умолчанию)

```vue
<button type="submit">
  <slot>Submit</slot>
</button>
```

Если родитель ничего не передал — отобразится `Submit`.

## Именованные слоты

```vue
<!-- BaseLayout.vue -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

Родитель:

```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>Default slot content.</p>

  <template #footer>
    <p>Footer info</p>
  </template>
</BaseLayout>
```

`#header` — сокращение для `v-slot:header`. Безымянный слот — `default`.

## Scoped slots — данные из ребёнка

Ребёнок может передать данные в слот:

```vue
<!-- FancyList.vue -->
<ul>
  <li v-for="item in items" :key="item.id">
    <slot name="item" :item="item" :index="index"></slot>
  </li>
</ul>
```

Родитель:

```vue
<FancyList :items="items">
  <template #item="{ item, index }">
    <p>{{ index }} — {{ item.text }}</p>
  </template>
</FancyList>
```

Полезно для списков, таблиц, select — родитель задаёт «как рисовать», ребёнок — «что итерировать / структуру».

## Пример: карточка

```vue
<!-- Card.vue -->
<div class="card">
  <div class="card-header" v-if="$slots.header">
    <slot name="header" />
  </div>
  <div class="card-body">
    <slot />
  </div>
  <div class="card-footer" v-if="$slots.footer">
    <slot name="footer" />
  </div>
</div>
```

```vue
<Card>
  <template #header>
    <h3>Title</h3>
  </template>

  <p>Body text</p>

  <template #footer>
    <button>OK</button>
  </template>
</Card>
```

Проверка наличия слота: `$slots.header` (в Options) или `useSlots()` в Composition API.

Далее: [Маршрутизация](routing.md).
