# 3. Technical SEO

> Источники: [Google — Crawling and indexing](https://developers.google.com/search/docs/crawling-indexing) · [Nginx](../devops/nginx/README.md)

Technical SEO — техническая база, без которой контент может **не индексироваться** или ранжироваться хуже.

## robots.txt

Файл в корне сайта: `https://example.com/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /cart/
Disallow: /checkout/

Sitemap: https://example.com/sitemap.xml
```

| Директива | Назначение |
|-----------|------------|
| `Allow` / `Disallow` | Разрешить / запретить краулинг пути |
| `User-agent: *` | Все роботы |
| `Sitemap` | URL карты сайта |

**Важно:** `Disallow` не скрывает страницу — только совет роботу. Для скрытия используйте `noindex`.

## Meta robots

```html
<!-- Не индексировать страницу -->
<meta name="robots" content="noindex, nofollow">

<!-- Индексировать, но не переходить по ссылкам -->
<meta name="robots" content="index, nofollow">

<!-- Не показывать сниппет -->
<meta name="robots" content="nosnippet">
```

| Директива | Эффект |
|-----------|--------|
| `noindex` | Не попадёт в индекс |
| `nofollow` | Не передаёт вес по ссылкам |
| `noarchive` | Без кэша в выдаче |

## sitemap.xml

XML-файл со списком URL для краулера:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com/</loc>
        <lastmod>2025-06-24</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://example.com/blog/laravel-install</loc>
        <lastmod>2025-06-20</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

| Поле | Описание |
|------|----------|
| `loc` | Полный URL страницы |
| `lastmod` | Дата последнего изменения |
| `priority` | Относительный приоритет (0.0–1.0) |

Лимит: 50 000 URL или 50 МБ на файл. Больше — sitemap index.

## HTTPS и редиректы

| Правило | Реализация |
|---------|------------|
| HTTPS everywhere | SSL-сертификат (Let's Encrypt) |
| www → apex или наоборот | 301 редирект в Nginx |
| http → https | 301 редирект |
| trailing slash | Единый стиль: `/page` или `/page/` |

Пример Nginx — см. [Nginx](../devops/nginx/README.md).

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}
```

## Core Web Vitals

| Метрика | Что измеряет | Хорошо |
|---------|--------------|--------|
| **LCP** | Largest Contentful Paint — загрузка главного блока | ≤ 2.5 s |
| **INP** | Interaction to Next Paint — отклик на действие | ≤ 200 ms |
| **CLS** | Cumulative Layout Shift — сдвиг вёрстки | ≤ 0.1 |

### Как улучшить

- Сжатие gzip/brotli в Nginx
- Кэш статики (Cache-Control)
- Lazy load изображений
- Минификация CSS/JS (Vite)
- CDN для статики
- WebP/AVIF вместо тяжёлых JPG

## Мобильная версия

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Google использует **mobile-first indexing** — индексируется мобильная версия.

## Structured Data (Schema.org)

JSON-LD в `<head>` или `<body>`:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Установка Laravel",
    "author": {
        "@type": "Person",
        "name": "Иван Иванов"
    },
    "datePublished": "2025-06-24",
    "image": "https://example.com/images/laravel.jpg"
}
</script>
```

| Тип | Применение |
|-----|------------|
| `Organization` | Главная, контакты |
| `Article` / `BlogPosting` | Статьи блога |
| `Product` | Карточки товаров |
| `FAQPage` | Блок вопрос-ответ |
| `BreadcrumbList` | Хлебные крошки |

Проверка: [Rich Results Test](https://search.google.com/test/rich-results)

## Дубли контента

| Проблема | Решение |
|----------|---------|
| www и non-www | 301 + canonical |
| http и https | 301 на https |
| Пагинация | `rel="next"` / `rel="prev"` или canonical на view-all |
| UTM-метки | Canonical без параметров |
| Print-версия | Canonical на основную |

## Пагинация

```html
<link rel="prev" href="https://example.com/blog?page=1">
<link rel="next" href="https://example.com/blog?page=3">
```

## Статус-коды

| Код | SEO-значение |
|-----|--------------|
| 200 | OK — страница индексируется |
| 301 | Постоянный редирект — передаёт вес |
| 302 | Временный — вес может не передаться |
| 404 | Не найдено — убрать из sitemap |
| 410 | Удалено навсегда |
| 500 | Ошибка сервера — краулинг страдает |

## SPA и JavaScript

| Подход | SEO |
|--------|-----|
| CSR (React/Vue без SSR) | Робот может не увидеть контент |
| SSR / SSG (Next.js, Inertia SSR) | Контент в HTML — лучше для SEO |
| Pre-rendering | Статический HTML для ботов |

См. [Laravel + Next.js](../devops/laravel-next/README.md).

## Чеклист Technical SEO

- [ ] HTTPS, редиректы 301
- [ ] robots.txt и sitemap.xml в Search Console
- [ ] Core Web Vitals в зелёной зоне
- [ ] Нет битых ссылок (404)
- [ ] Canonical на дублях
- [ ] Schema.org для ключевых типов страниц

## Следующий шаг

[4. SEO в Laravel](laravel.md) — реализация в проекте.
