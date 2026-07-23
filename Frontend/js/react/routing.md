# 12. Маршрутизация (React Router)

> Источники: [React Router](https://reactrouter.com/) · [Metanit — Маршрутизация](https://metanit.com/web/react/5.1.php)

В React нет встроенного роутера (в отличие от Next.js). Для SPA обычно используют **React Router**.

## Установка

```bash
npm install react-router
```

Актуальный пакет — `react-router` (declarative mode). Документация: [reactrouter.com](https://reactrouter.com/). Ниже — базовый подход с `BrowserRouter`.

## Базовая настройка

`main.jsx`:

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

`App.jsx`:

```js
import { Routes, Route, Link } from 'react-router'

import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
```

| Компонент | Роль |
|-----------|------|
| `BrowserRouter` | История HTML5 History API |
| `Routes` / `Route` | Сопоставление URL и компонента |
| `Link` | Навигация без перезагрузки |
| `NavLink` | Ссылка с классом «активный» маршрут |

## Параметры маршрута

```js
// Route: path="/users/:id"
import { useParams } from 'react-router'

export default function User() {
  const { id } = useParams()
  return <h1>User #{id}</h1>
}
```

Ссылка:

```js
<Link to={`/users/${user.id}`}>{user.name}</Link>
```

## Вложенные маршруты

```js
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

В layout рендерят дочерний маршрут через `<Outlet />`:

```js
import { Outlet, Link } from 'react-router'

export default function DashboardLayout() {
  return (
    <div>
      <aside>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

## Программная навигация

```js
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()

  function onSuccess() {
    navigate('/dashboard', { replace: true })
  }

  return <button onClick={onSuccess}>Log in</button>
}
```

`replace: true` заменяет текущую запись в истории (как redirect).

## Query-параметры

```js
import { useSearchParams } from 'react-router'

function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''

  return (
    <input
      value={q}
      onChange={e => setParams({ q: e.target.value })}
    />
  )
}
```

URL вида `/search?q=react`.

## Lazy-загрузка страниц

```js
import { lazy, Suspense } from 'react'
import { Route } from 'react-router'

const About = lazy(() => import('./pages/About'))

<Route
  path="/about"
  element={
    <Suspense fallback={<p>Loading...</p>}>
      <About />
    </Suspense>
  }
/>
```

## Next.js

Если нужны файловая маршрутизация, SSR и API «из коробки», используйте [Next.js](../next/README.md) вместо ручной настройки React Router.

## Laravel

SPA на React + API Laravel: [Frontend в Laravel](../../../Backend/laravel/frontend.md). Деплой Next + Laravel: [Laravel + Next.js](../../../devops/laravel-next/README.md).
