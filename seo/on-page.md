# 2. On-Page SEO

> Источники: [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) · [HTML — семантика](../Frontend/html/semantics.md)

On-Page SEO — оптимизация **отдельной страницы** для релевантности запросу.

## Title — заголовок вкладки

```html
<title>Установка Laravel 11 — пошаговое руководство | GitBook</title>
```

| Правило | Рекомендация |
|---------|--------------|
| Длина | 50–60 символов (Google обрезает ~600px) |
| Уникальность | Свой title на каждой странице |
| Ключевое слово | Ближе к началу |
| Бренд | В конце через `\|` или `—` |

## Meta description

```html
<meta name="description" content="Как установить Laravel 11 на Windows: Composer, .env, миграции. Пошаговая инструкция для начинающих.">
```

| Правило | Рекомендация |
|---------|--------------|
| Длина | 120–160 символов |
| Суть | Не дублировать title, а дополнять |
| CTA | «Узнайте», «Смотрите», «Скачайте» |

Meta description **не является** прямым фактором ранжирования, но влияет на CTR.

## Заголовки H1–H6

```html
<h1>Установка Laravel</h1>
<h2>Требования</h2>
<h3>PHP и Composer</h3>
<h2>Шаги установки</h2>
```

| Правило | Описание |
|---------|----------|
| Один H1 | Главная тема страницы |
| Иерархия | Не пропускать уровни без причины |
| Ключевые слова | Естественно, не спам |

## URL (ЧПУ)

```
✅ /blog/laravel-installation
✅ /products/red-sneakers
❌ /page?id=123&cat=5
❌ /index.php?route=product/view&product_id=42
```

| Правило | Описание |
|---------|----------|
| Короткие | 3–5 слов через дефис |
| Латиница | Транслит или английский |
| Без параметров | Где возможно — статический путь |

Laravel: [маршруты](../Backend/laravel/routing.md), slug в модели.

## Контент

| Принцип | Описание |
|---------|----------|
| Intent | Ответ на запрос пользователя |
| Уникальность | Не копировать с других сайтов |
| Структура | Абзацы, списки, таблицы |
| Обновление | Актуализировать устаревшие статьи |
| LSI-слова | Синонимы и связанные термины |

### Плотность ключевых слов

Не «заспамливать». Ключевое слово в title, H1, первом абзаце и 1–2 подзаголовках — достаточно.

## Изображения

```html
<img src="/images/laravel-logo.svg" alt="Логотип Laravel" width="120" height="40" loading="lazy">
```

| Атрибут | SEO-значение |
|---------|--------------|
| `alt` | Описание для роботов и a11y |
| `width` / `height` | Предотвращает CLS |
| `loading="lazy"` | Не блокирует LCP |
| Имя файла | `laravel-installation.png`, не `IMG_4521.jpg` |

## Внутренние ссылки

```html
<p>См. также <a href="/backend/laravel/routing">маршруты Laravel</a>.</p>
```

| Правило | Описание |
|---------|----------|
| Anchor text | Описательный текст ссылки, не «тут» |
| Hub pages | Страницы-хабы со ссылками на статьи |
| Глубина | Важные страницы — ≤ 3 кликов от главной |

## Open Graph и Twitter Cards

Для красивого превью в соцсетях и мессенджерах:

```html
<meta property="og:title" content="Установка Laravel">
<meta property="og:description" content="Пошаговое руководство">
<meta property="og:image" content="https://example.com/og/laravel.jpg">
<meta property="og:url" content="https://example.com/blog/laravel-install">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Установка Laravel">
<meta name="twitter:description" content="Пошаговое руководство">
<meta name="twitter:image" content="https://example.com/og/laravel.jpg">
```

## Canonical — канонический URL

```html
<link rel="canonical" href="https://example.com/blog/laravel-install">
```

Указывает поисковику **основную** версию страницы при дублях (www/non-www, http/https, UTM-параметры).

## hreflang — мультиязычность

```html
<link rel="alternate" hreflang="ru" href="https://example.com/ru/page">
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```

## Чеклист On-Page

- [ ] Уникальные title и description
- [ ] Один H1, структура заголовков
- [ ] ЧПУ без лишних параметров
- [ ] Alt у изображений
- [ ] Canonical на страницах с дублями
- [ ] OG-теги для шаринга

## Следующий шаг

[3. Technical SEO](technical.md) — robots.txt, sitemap, скорость.
