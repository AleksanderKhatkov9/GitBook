# 9. Стили

> Источники: [CSS](https://nextjs.org/docs/app/getting-started/css) · [Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)

## Глобальный CSS

Импорт в корневом layout:

```js
// app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/globals.css */
:root {
  --fg: #111;
  --bg: #fff;
}

body {
  color: var(--fg);
  background: var(--bg);
  font-family: system-ui, sans-serif;
}
```

Глобальные стили обычно подключают один раз в root layout.

## CSS Modules

Локальные классы с хешем имени — без конфликтов:

```css
/* app/ui/Button.module.css */
.root {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: #111;
  color: #fff;
}
```

```js
import styles from './Button.module.css'

export default function Button({ children }) {
  return <button className={styles.root}>{children}</button>
}
```

## Tailwind CSS

Часто включают при `create-next-app`. Утилитарные классы в JSX:

```js
export default function Card() {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Заголовок</h2>
    </div>
  )
}
```

Проверьте `globals.css` (`@tailwind` / `@import "tailwindcss"` — зависит от версии Tailwind) и конфиг.

## Inline styles и className

Как в React:

```js
<p style={{ color: 'tomato', fontSize: 18 }}>Текст</p>
<p className="muted">С классом</p>
```

## Sass

```bash
npm install sass
```

Файлы `.scss` / `.sass` импортируются так же, как CSS.

## Советы

| Подход | Когда |
|--------|-------|
| Global CSS | Reset, переменные, типографика |
| CSS Modules | Изолированные компоненты без Tailwind |
| Tailwind | Быстрая вёрстка, единый дизайн-токен |

Стили в Client и Server Components работают одинаково; `'use client'` для CSS не нужен.

Далее: [Images и Fonts](images-fonts.md).
