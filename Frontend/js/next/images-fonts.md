# 10. Images и Fonts

> Источники: [Image Optimization](https://nextjs.org/docs/app/getting-started/images) · [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

## next/image

Компонент `Image` оптимизирует картинки: размеры, lazy-load, современные форматы.

### Локальный файл

Положите файл в `public/` или импортируйте из проекта:

```js
import Image from 'next/image'
import hero from './hero.png'

export default function Hero() {
  return (
    <Image
      src={hero}
      alt="Обложка"
      priority
    />
  )
}
```

Из `public/logo.png`:

```js
<Image src="/logo.png" alt="Logo" width={120} height={40} />
```

Для статичных путей из `public` нужны `width` и `height` (или `fill`).

### Внешний URL

Разрешите домен в `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
}

module.exports = nextConfig
```

```js
<Image
  src="https://cdn.example.com/photo.jpg"
  alt="Фото"
  width={800}
  height={600}
/>
```

### Полезные props

| Prop | Смысл |
|------|--------|
| `alt` | Обязателен для a11y |
| `priority` | LCP / above-the-fold |
| `fill` | Растянуть в относительном родителе |
| `sizes` | Подсказка для responsive |
| `quality` | 1–100 |

## next/font

Шрифты без лишних layout shift и внешних запросов в runtime:

```js
// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

Локальный файл:

```js
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  variable: '--font-mine',
})
```

```js
<html className={myFont.variable}>
```

## Итог

| Задача | Инструмент |
|--------|------------|
| Картинки с оптимизацией | `next/image` |
| Обычный `<img>` без оптимизации | можно, но теряете benefits |
| Google / локальные шрифты | `next/font` |

Далее: [Metadata и SEO](metadata.md).
