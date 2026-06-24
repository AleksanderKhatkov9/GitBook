# SEO — поисковая оптимизация

> Справочники: [Google Search Central](https://developers.google.com/search/docs) · [MDN — SEO basics](https://developer.mozilla.org/ru/docs/Glossary/SEO)

SEO (Search Engine Optimization) — оптимизация сайта для поисковых систем (Google, Yandex). Цель — **органический трафик**: пользователи находят сайт по запросам в поиске.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Основы](basics.md) | Как работает поиск, типы SEO, KPI |
| [2. On-Page SEO](on-page.md) | Title, meta, заголовки, контент, ссылки |
| [3. Technical SEO](technical.md) | robots.txt, sitemap, скорость, индексация |
| [4. SEO в Laravel](laravel.md) | Meta-теги, sitemap, SSR, Next.js |
| [5. Инструменты](tools.md) | Search Console, Analytics, Lighthouse |

## Три столпа SEO

| Тип | Что включает |
|-----|--------------|
| **On-Page** | Контент, заголовки, meta, URL, внутренние ссылки |
| **Technical** | Скорость, мобильность, индексация, HTTPS, разметка |
| **Off-Page** | Внешние ссылки, упоминания бренда, репутация |

## Быстрый чеклист

- [ ] Уникальный `<title>` и `<meta name="description">` на каждой странице
- [ ] Один `<h1>` на страницу, логичная иерархия `h2`–`h6`
- [ ] Семантический HTML — см. [HTML — семантика](../Frontend/html/semantics.md)
- [ ] `alt` у всех значимых изображений
- [ ] `robots.txt` и `sitemap.xml`
- [ ] HTTPS, редирект www → non-www (или наоборот)
- [ ] Сайт подключён к Google Search Console

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [HTML](../Frontend/html/README.md) | Разметка, meta, семантика |
| [Nginx](../devops/nginx/README.md) | Редиректы, gzip, кэш |
| [Laravel Views](../Backend/laravel/views.md) | Blade-шаблоны |
| [Laravel + Next.js](../devops/laravel-next/README.md) | SSR для SEO |

## Полезные ссылки

- [Google Search Central — документация](https://developers.google.com/search/docs)
- [Яндекс Вебмастер — справка](https://yandex.ru/support/webmaster/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
