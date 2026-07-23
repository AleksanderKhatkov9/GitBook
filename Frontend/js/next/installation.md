# 2. Установка и создание приложения

> Источники: [Installation | Next.js](https://nextjs.org/docs/app/getting-started/installation) · [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

Нужны [Node.js](https://nodejs.org/) 18.18+ (лучше LTS) и npm / pnpm / yarn.

## create-next-app

```bash
npx create-next-app@latest my-next-app
```

Мастер спросит:

| Опция | Рекомендация для обучения |
|-------|---------------------------|
| TypeScript | Да (или Нет — в примерах ниже JS) |
| ESLint | Да |
| Tailwind CSS | Да, если удобно |
| `src/` directory | По желанию |
| App Router | **Да** |
| Turbopack | Да (быстрее `next dev`) |
| Import alias `@/*` | Да |

```bash
cd my-next-app
npm run dev
```

Откроется [http://localhost:3000](http://localhost:3000).

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер (HMR) |
| `npm run build` | Production-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | ESLint |

Без интерактива (пример флагов):

```bash
npx create-next-app@latest my-next-app --js --eslint --app --no-src-dir --import-alias "@/*"
```

## Структура проекта (App Router)

```
my-next-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js       ← корневой layout
│   └── page.js         ← главная страница /
├── public/             ← статика (/logo.png → /logo.png)
├── next.config.js
├── package.json
└── jsconfig.json       ← алиасы (@/*)
```

С `src/`:

```
src/app/layout.js
src/app/page.js
```

## Корневой layout

Каждый App Router-проект обязан иметь корневой `app/layout.js` с тегами `html` и `body`:

```js
// app/layout.js
import './globals.css'

export const metadata = {
  title: 'My Next App',
  description: 'Обучение Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
```

`children` — содержимое текущего маршрута (`page.js` и вложенные layouts).

## Первая страница

```js
// app/page.js
export default function HomePage() {
  return (
    <main>
      <h1>Главная</h1>
      <p>Next.js готов к работе.</p>
    </main>
  )
}
```

## Конфигурация

`next.config.js` (или `.mjs` / `.ts`):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // например: images.remotePatterns, redirects, output: 'standalone'
}

module.exports = nextConfig
```

## Переменные окружения

| Файл | Назначение |
|------|------------|
| `.env.local` | Локальные секреты (не в git) |
| `.env` | Общие значения |

В клиентский бандл попадают только переменные с префиксом `NEXT_PUBLIC_`:

```ini
# .env.local
DATABASE_URL=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```js
const api = process.env.NEXT_PUBLIC_API_URL
```

## Связка с Laravel

Локально часто:

| Сервис | URL |
|--------|-----|
| Next.js | `http://localhost:3000` |
| Laravel API | `http://127.0.0.1:8000` |

Production на одном домене: [Laravel + Next.js](../../../devops/laravel-next/README.md).

Далее: [App Router](routing.md).
