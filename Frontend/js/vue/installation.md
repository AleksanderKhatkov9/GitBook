# 2. Установка и создание приложения

> Источники: [Quick Start | Vue.js](https://vuejs.org/guide/quick-start.html) · [Creating an Application](https://vuejs.org/guide/essentials/application.html) · [Metanit — Первое приложение](https://metanit.com/web/vue/1.1.php)

## Рекомендуемый способ: create-vue

Нужны [Node.js](https://nodejs.org/) 18+ и npm.

```bash
npm create vue@latest my-vue-app
```

Мастер предложит опции: TypeScript, Vue Router, Pinia, Vitest, ESLint и др.

```bash
cd my-vue-app
npm install
npm run dev
```

Откроется Vite-сервер, обычно [http://localhost:5173](http://localhost:5173).

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки |

Проект использует **Vite** и Single-File Components.

## Создание приложения (`createApp`)

Точка входа обычно `main.js` / `main.ts`:

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

`createApp` создаёт экземпляр приложения; `.mount('#app')` монтирует его в DOM-элемент.

Несколько независимых приложений на одной странице:

```js
const app1 = createApp(AppOne)
app1.mount('#container-1')

const app2 = createApp(AppTwo)
app2.mount('#container-2')
```

Глобальная регистрация компонента:

```js
import { createApp } from 'vue'
import App from './App.vue'
import MyButton from './components/MyButton.vue'

const app = createApp(App)
app.component('MyButton', MyButton)
app.mount('#app')
```

## Без сборки (CDN)

Для прототипов и встраивания на существующую страницу:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return { message }
    }
  }).mount('#app')
</script>
```

Для production лучше указать конкретную версию и при необходимости использовать сборку.

Import maps + ES modules (без бандлера):

```html
<script type="importmap">
{
  "imports": {
    "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
  }
}
</script>

<script type="module">
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return { count: ref(0) }
  }
}).mount('#app')
</script>
```

## Структура типичного проекта

```
my-vue-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js          ← createApp + mount
│   ├── App.vue          ← корневой компонент
│   ├── components/      ← UI-компоненты
│   ├── views/           ← страницы (с Router)
│   ├── router/          ← Vue Router
│   └── stores/          ← Pinia
└── public/
```

## IDE

| Инструмент | Зачем |
|------------|-------|
| [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | Подсветка, типы, SFC |
| Vue DevTools | Отладка в браузере |

## Laravel + Vite

В Laravel Vue обычно подключают через Vite. См. [Frontend в Laravel](../../../Backend/laravel/frontend.md).

Далее: [Синтаксис шаблонов](template-syntax.md).
