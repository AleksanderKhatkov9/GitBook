# 11. Metadata и SEO

> Источники: [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) · [File-based metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

App Router задаёт `<title>`, `<meta>` и Open Graph через объект `metadata` или функцию `generateMetadata` — без ручного `<Head>` из Pages Router.

## Статический metadata

В `layout.js` или `page.js`:

```js
export const metadata = {
  title: 'Магазин',
  description: 'Каталог товаров',
  openGraph: {
    title: 'Магазин',
    description: 'Каталог товаров',
    images: ['/og.png'],
  },
}

export default function Page() {
  return <h1>Магазин</h1>
}
```

Наследование: дочерний сегмент дополняет / переопределяет родительский.

### Шаблон title

```js
// app/layout.js
export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
}
```

```js
// app/about/page.js
export const metadata = {
  title: 'О проекте', // → "О проекте | My App"
}
```

## Динамический generateMetadata

```js
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.cover],
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article>{/* ... */}</article>
}
```

## Файловые соглашения

В `app/`:

| Файл | Назначение |
|------|------------|
| `favicon.ico` | Иконка |
| `icon.png` / `apple-icon.png` | Иконки |
| `opengraph-image.png` | OG-картинка сегмента |
| `robots.txt` / `sitemap.ts` | Краулеры |

Пример sitemap:

```js
// app/sitemap.js
export default function sitemap() {
  return [
    { url: 'https://example.com', lastModified: new Date() },
    { url: 'https://example.com/about', lastModified: new Date() },
  ]
}
```

## robots

```js
// app/robots.js
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

## Практические советы

- Уникальные `title` / `description` на важных страницах.
- SSR/SSG отдают метатеги в первом HTML — лучше для SEO, чем чистый CSR.
- Для Laravel-блога с Next-витриной метаданные остаются на стороне Next-страниц.

Далее: [Middleware](middleware.md).
