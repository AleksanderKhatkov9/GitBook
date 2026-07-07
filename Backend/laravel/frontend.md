# Frontend (Vue / React)

> Источники: [Vite | Laravel 13.x](https://laravel.com/docs/13.x/vite), [Laravel Breeze](https://laravel.com/docs/13.x/starter-kits#laravel-breeze), [Inertia.js](https://inertiajs.com/)

Laravel отдаёт HTML через Blade, а интерактивный UI — через **JavaScript-фреймворк**. Сборка фронтенда выполняется **Vite** (встроен в Laravel с версии 9+).

Связанные разделы: [Vue.js](../../Frontend/js/vue/README.md), [React](../../Frontend/js/react/README.md), [Представления](views.md), [Laravel + Next.js](../../devops/laravel-next/README.md).

---

## Способы подключения

| Подход | Когда использовать |
|--------|-------------------|
| **Inertia.js + Vue/React** | Один проект, без отдельного REST API. Рекомендуется для большинства приложений |
| **Blade + Vite + компоненты** | Небольшие виджеты на JS внутри Blade-страниц |
| **SPA + REST API** | Отдельный frontend (Vue/React/Next.js), Laravel только как API |
| **Next.js + Laravel** | Fullstack на одном домене — см. [Laravel + Next.js](../../devops/laravel-next/README.md) |

---

## Inertia.js — рекомендуемый способ

[Inertia.js](https://inertiajs.com/) связывает Laravel и Vue/React **без REST API**: контроллер возвращает JSON-страницу, фронтенд рендерит компонент. Маршрутизация остаётся на стороне Laravel (`routes/web.php`).

### Установка через Breeze (Vue)

```bash
composer require laravel/breeze --dev
php artisan breeze:install vue

npm install
npm run dev
```

В другом терминале:

```bash
php artisan serve
```

### Установка через Breeze (React)

```bash
composer require laravel/breeze --dev
php artisan breeze:install react

npm install
npm run dev
php artisan serve
```

### Структура проекта (Inertia)

```
resources/
├── js/
│   ├── app.js              # точка входа Vue/React
│   ├── Pages/              # страницы (компоненты)
│   │   ├── Dashboard.vue   # или Dashboard.jsx
│   │   └── Welcome.vue
│   └── Components/         # переиспользуемые компоненты
└── views/
    └── app.blade.php       # единственный Blade-шаблон (@inertia)
```

### Маршрут и контроллер

`routes/web.php`:

```php
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'users' => User::all(),
    ]);
});
```

Vue-компонент `resources/js/Pages/Dashboard.vue`:

```html
<script setup>
defineProps({
    users: Array,
});
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>
```

React-аналог `resources/js/Pages/Dashboard.jsx`:

```jsx
export default function Dashboard({ users }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

### Разработка

```bash
# Терминал 1 — Vite (hot reload)
npm run dev

# Терминал 2 — Laravel
php artisan serve

# Или одной командой (Laravel 11+)
composer run dev
```

---

## Vue + Laravel (вручную, без Breeze)

Если Inertia не нужен — подключите Vue как библиотеку через Vite.

### 1. Установка пакетов

```bash
npm install vue @vitejs/plugin-vue
```

### 2. Vite

`vite.config.js`:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
```

### 3. Точка входа

`resources/js/app.js`:

```js
import { createApp } from 'vue';
import Example from './components/Example.vue';

createApp(Example).mount('#app');
```

`resources/js/components/Example.vue`:

```html
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
    <button @click="count++">Счёт: {{ count }}</button>
</template>
```

### 4. Blade-шаблон

`resources/views/welcome.blade.php`:

```html
<!DOCTYPE html>
<html>
<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

---

## React + Laravel (вручную, без Breeze)

### 1. Установка пакетов

```bash
npm install react react-dom
npm install -D @vitejs/plugin-react
```

### 2. Vite

`vite.config.js`:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
```

### 3. Точка входа

`resources/js/app.jsx`:

```jsx
import { createRoot } from 'react-dom/client';
import Counter from './components/Counter';

createRoot(document.getElementById('app')).render(<Counter />);
```

`resources/js/components/Counter.jsx`:

```jsx
import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Счёт: {count}
        </button>
    );
}
```

### 4. Blade-шаблон

```html
<!DOCTYPE html>
<html>
<head>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

---

## SPA + REST API

Отдельное Vue/React-приложение обращается к Laravel через API.

### Laravel — API-маршруты

`routes/api.php`:

```php
use App\Http\Controllers\PostController;

Route::apiResource('posts', PostController::class);
```

`app/Http/Controllers/PostController.php`:

```php
public function index()
{
    return Post::all();
}
```

### CORS

Для запросов с другого порта (например `localhost:5173` → `localhost:8000`) настройте CORS в `config/cors.php` или используйте Laravel Sanctum для SPA-аутентификации.

### Vue — запрос к API

```js
import axios from 'axios';

const { data } = await axios.get('http://localhost:8000/api/posts');
```

### React — запрос к API

```jsx
useEffect(() => {
    fetch('http://localhost:8000/api/posts')
        .then((res) => res.json())
        .then(setPosts);
}, []);
```

> Для production с отдельным доменом фронтенда см. [Laravel + Next.js](../../devops/laravel-next/README.md) — та же схема применима и к Vue/React SPA.

---

## Сравнение подходов

| | Inertia | Blade + Vite | SPA + API |
|---|---------|--------------|-----------|
| Маршруты | Laravel (`web.php`) | Laravel | Frontend (Vue Router / React Router) |
| Рендеринг | Сервер + клиент | Клиент в `#app` | Полностью на клиенте |
| API | Не нужен | Опционально | Обязателен |
| Стартовый kit | Breeze | Вручную | Отдельный проект |
| Сложность | Низкая | Средняя | Выше |

---

## Полезные ссылки

- [Laravel Breeze](https://laravel.com/docs/13.x/starter-kits#laravel-breeze)
- [Inertia.js — Laravel](https://inertiajs.com/server-side-setup)
- [Vite — Laravel](https://laravel.com/docs/13.x/vite)
- [Laravel Sanctum (SPA auth)](https://laravel.com/docs/13.x/sanctum)
- [Vue.js](../../Frontend/js/vue/README.md)
- [React](../../Frontend/js/react/README.md)
