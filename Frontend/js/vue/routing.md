# 12. Маршрутизация (Vue Router)

> Источники: [Vue Router](https://router.vuejs.org/) · [Routing | Vue.js](https://vuejs.org/guide/scaling-up/routing.html) · [Metanit — Глава 6](https://metanit.com/web/vue/6.1.php)

Для SPA нужна клиентская маршрутизация. Официальная библиотека — **Vue Router**.

## Установка

При `create-vue` можно включить Router сразу. Вручную:

```bash
npm install vue-router@4
```

## Базовая настройка

`src/router/index.js`:

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/UserView.vue'), // lazy
    props: true
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

`main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

`App.vue`:

```vue
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
```

| Компонент | Роль |
|-----------|------|
| `<RouterView>` | Рендерит компонент текущего маршрута |
| `<RouterLink>` | Навигация без перезагрузки страницы |

## Параметры маршрута

```js
{ path: '/users/:id', component: UserView }
```

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
// route.params.id
</script>

<template>
  <p>User #{{ $route.params.id }}</p>
</template>
```

С `props: true` параметр придёт как prop:

```vue
<script setup>
defineProps(['id'])
</script>
```

## Программная навигация

```js
import { useRouter } from 'vue-router'

const router = useRouter()

router.push('/about')
router.push({ name: 'user', params: { id: 42 } })
router.push({ path: '/search', query: { q: 'vue' } })
router.replace({ name: 'home' }) // без записи в history
router.back()
router.forward()
```

## Вложенные маршруты

```js
{
  path: '/user/:id',
  component: UserLayout,
  children: [
    { path: '', component: UserHome },
    { path: 'profile', component: UserProfile },
    { path: 'posts', component: UserPosts }
  ]
}
```

В `UserLayout.vue` — вложенный `<RouterView />`.

## Именованные представления

Несколько `<RouterView>` на одном уровне (сайдбар + контент):

```js
{
  path: '/',
  components: {
    default: HomeView,
    sidebar: SidebarView
  }
}
```

```vue
<RouterView />
<RouterView name="sidebar" />
```

## Переадресация и алиасы

```js
{ path: '/home', redirect: '/' }
{ path: '/search', redirect: { name: 'search' } }
{ path: '/', component: HomeView, alias: '/index' }
```

## Навигационные хуки (guards)

```js
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

```js
{
  path: '/admin',
  component: AdminView,
  meta: { requiresAuth: true }
}
```

## Активные ссылки

`RouterLink` добавляет классы `.router-link-active` и `.router-link-exact-active`. Можно настроить через `linkActiveClass` / проп `activeClass`.

## History mode и сервер

`createWebHistory()` требует, чтобы сервер на все пути отдавал `index.html` (fallback). Иначе — 404 при прямом заходе на `/about`.

Альтернатива: `createWebHashHistory()` (`/#/about`) — без настройки сервера, но с `#` в URL.

## Связанные темы

| Тема | Ссылка |
|------|--------|
| Pinia (состояние) | [pinia.vuejs.org](https://pinia.vuejs.org/) |
| Официальный гайд Router | [router.vuejs.org/guide](https://router.vuejs.org/guide/) |
| Laravel + Vue | [Frontend в Laravel](../../../Backend/laravel/frontend.md) |

К оглавлению раздела: [Vue.js](README.md).
