# Vue.js

> Официальная документация: [vuejs.org](https://vuejs.org/) · [Introduction](https://vuejs.org/guide/introduction.html) · [Metanit — Vue 3](https://metanit.com/web/vue/)

Vue (произносится /vjuː/, как *view*) — прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов. Строится поверх HTML, CSS и JavaScript и даёт декларативную компонентную модель.

## Справочник раздела

| Раздел | Описание |
|--------|----------|
| [1. Введение](introduction.md) | Что такое Vue, SFC, Options / Composition API |
| [2. Установка](installation.md) | create-vue, CDN, Vite |
| [3. Синтаксис шаблонов](template-syntax.md) | Интерполяция, директивы, `v-bind` |
| [4. Реактивность](reactivity.md) | `ref`, `reactive`, `computed`, `watch` |
| [5. События](events.md) | `v-on`, модификаторы, обработчики |
| [6. Формы](forms.md) | `v-model`, input, checkbox, select |
| [7. Условия и списки](conditional-list.md) | `v-if`, `v-show`, `v-for` |
| [8. Классы и стили](class-style.md) | Привязка class и style |
| [9. Жизненный цикл](lifecycle.md) | Хуки, refs, `nextTick` |
| [10. Компоненты](components.md) | Props, события, регистрация |
| [11. Слоты](slots.md) | Default, named, scoped slots |
| [12. Маршрутизация](routing.md) | Vue Router: маршруты, навигация, params |

## Быстрый старт

```bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev
```

Приложение: [http://localhost:5173](http://localhost:5173)

## Два столпа Vue

| Концепция | Суть |
|-----------|------|
| **Декларативный рендеринг** | Шаблон описывает HTML на основе состояния |
| **Реактивность** | Изменение состояния автоматически обновляет DOM |

## Рекомендуемый стиль в этом разделе

Для новых приложений: **Composition API + `<script setup>` + Single-File Components (`.vue`)**. Options API показан там, где полезно для сравнения.

## Laravel

Подключение Vue к Laravel (Inertia, Vite, API): [Frontend](../../../Backend/laravel/frontend.md).

## Источники

- [Vue 3 Guide](https://vuejs.org/guide/introduction.html)
- [Руководство по Vue 3 — Metanit](https://metanit.com/web/vue/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
