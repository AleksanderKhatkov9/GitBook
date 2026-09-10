# 5. Инструменты SEO

> Google Search Central · [PageSpeed Insights](https://pagespeed.web.dev/)

## Google Search Console

Бесплатный инструмент для мониторинга индексации в Google.

| URL | [search.google.com/search-console](https://search.google.com/search-console) |

### Подключение сайта

1. Добавить ресурс (домен или префикс URL).
2. Подтвердить владение: DNS TXT, HTML-файл или meta-тег.
3. Отправить `sitemap.xml`.

### Основные отчёты

| Отчёт | Что показывает |
|-------|----------------|
| Performance | Клики, показы, CTR, позиции |
| Pages | Проиндексированные / исключённые URL |
| Sitemaps | Статус sitemap |
| Core Web Vitals | LCP, INP, CLS по URL |
| Links | Внутренние и внешние ссылки |
| Manual actions | Штрафы от Google |

## Яндекс Вебмастер

| URL | [webmaster.yandex.ru](https://webmaster.yandex.ru/) |

Аналог Search Console для Yandex: индексация, sitemap, турбо-страницы, регион.

## Google Analytics 4

| URL | [analytics.google.com](https://analytics.google.com/) |

Отслеживание трафика, поведения, конверсий. Подробнее: [Аналитика — Google Analytics](../analytics/google.md) · [Яндекс Метрика](../analytics/yandex.md) · [Matomo](../analytics/matomo.md).

```html
<!-- gtag.js — в layout -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

| Метрика | SEO-связь |
|---------|-----------|
| Organic sessions | Трафик из поиска |
| Landing pages | Какие страницы входят |
| Bounce rate | Качество контента / intent |

## PageSpeed Insights / Lighthouse

| URL | [pagespeed.web.dev](https://pagespeed.web.dev/) |

Аудит скорости и Core Web Vitals для mobile и desktop.

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://example.com --view
```

| Категория | Что проверяет |
|-----------|---------------|
| Performance | LCP, скорость загрузки |
| Accessibility | a11y |
| Best Practices | HTTPS, консольные ошибки |
| SEO | meta, robots, mobile-friendly |

## Screaming Frog SEO Spider

Desktop-краулер для аудита сайта (бесплатно до 500 URL).

| Проверяет |
|-----------|
| Битые ссылки (404) |
| Дубли title / description |
| Длина title и meta |
| Редиректы |
| Canonical |
| H1 на странице |

## Ahrefs / Semrush (платные)

| Функция | Описание |
|---------|----------|
| Keyword research | Подбор ключевых слов |
| Backlink analysis | Анализ ссылочного профиля |
| Site audit | Технический аудит |
| Competitor analysis | Сравнение с конкурентами |

## Rich Results Test

| URL | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |

Проверка Schema.org разметки.

## robots.txt Tester

В Search Console → Settings → robots.txt — проверка блокировок.

## Еженедельный SEO-ритуал

| Действие | Инструмент |
|----------|------------|
| Проверить ошибки индексации | Search Console |
| Смотреть топ-запросы и CTR | Search Console → Performance |
| Проверить Core Web Vitals | PageSpeed / Search Console |
| Обновить sitemap после новых страниц | Artisan / cron |
| Аудит новых страниц | Lighthouse, checklist On-Page |

## Чеклист инструментов

- [ ] Search Console подключён, sitemap отправлен
- [ ] Яндекс Вебмастер (для RU-аудитории)
- [ ] GA4 или аналитика настроена
- [ ] Lighthouse SEO score ≥ 90
- [ ] Rich Results Test для Schema.org

[← Вернуться к оглавлению](README.md)
