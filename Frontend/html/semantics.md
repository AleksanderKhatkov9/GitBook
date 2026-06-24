# 4. Семантическая структура страницы

> Источники: [metanit.com — Семантическая структура](https://metanit.com/web/html5/4.1.php) · [W3Schools — HTML Semantics](https://www.w3schools.com/html/html5_semantic_elements.asp) · [htmlbook.ru — HTML5](https://htmlbook.ru/html5)

**Семантика** — использование элементов по их смыслу, а не только для внешнего вида. Это улучшает SEO, доступность и читаемость кода.

## Зачем нужна семантика

| Преимущество | Описание |
|--------------|----------|
| SEO | Поисковики лучше понимают структуру |
| Доступность | Скринридеры навигируют по landmarks |
| Поддержка | Код понятнее другим разработчикам |

Вместо `<div id="header">` используйте `<header>`. Вместо `<div class="nav">` — `<nav>`.

## Типовой макет страницы

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Название сайта</title>
</head>
<body>
    <header>
        <a href="/" aria-label="На главную">
            <img src="/logo.svg" alt="Логотип">
        </a>
        <nav aria-label="Основная навигация">
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/blog">Блог</a></li>
                <li><a href="/contacts">Контакты</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Заголовок статьи</h1>
                <p>Опубликовано <time datetime="2025-06-24">24 июня 2025</time></p>
            </header>
            <p>Текст статьи...</p>
        </article>

        <aside>
            <h2>Похожие статьи</h2>
            <ul>
                <li><a href="/post-1">Статья 1</a></li>
                <li><a href="/post-2">Статья 2</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <address>
            Контакты: <a href="mailto:info@example.com">info@example.com</a>
        </address>
        <p>&copy; 2025 Пример</p>
    </footer>
</body>
</html>
```

## header

Шапка страницы или раздела. Может содержать логотип, навигацию, заголовок:

```html
<header>
    <h1>Название сайта</h1>
    <p>Краткое описание</p>
</header>

<article>
    <header>
        <h2>Заголовок статьи</h2>
        <p>Автор: Иван Иванов</p>
    </header>
</article>
```

## nav

Блок **навигационных** ссылок. Не каждый список ссылок — только основные разделы:

```html
<nav aria-label="Основное меню">
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/catalog">Каталог</a></li>
    </ul>
</nav>

<nav aria-label="Хлебные крошки">
    <ol>
        <li><a href="/">Главная</a></li>
        <li><a href="/catalog">Каталог</a></li>
        <li><span>Товар</span></li>
    </ol>
</nav>
```

## main

Основное содержимое страницы. **Один** `<main>` на страницу; не вкладывать в `<article>`, `<aside>`, `<header>`, `<footer>`:

```html
<main id="content">
    <h1>Заголовок страницы</h1>
    <p>Основной контент...</p>
</main>
```

## article

Самостоятельный фрагмент контента: статья, пост, карточка товара, комментарий:

```html
<article>
    <h2>Новость дня</h2>
    <p>Текст новости...</p>
    <footer>
        <time datetime="2025-06-24T10:00">24.06.2025, 10:00</time>
    </footer>
</article>
```

## section

Thematic grouping — логический раздел с заголовком:

```html
<section>
    <h2>Наши услуги</h2>
    <p>Описание услуг...</p>
</section>

<section>
    <h2>Отзывы клиентов</h2>
    <article>...</article>
    <article>...</article>
</section>
```

Не используйте `<section>` без заголовка — для обёртки без смысла достаточно `<div>`.

## aside

Боковой контент, косвенно связанный с основным: сайдбар, реклама, похожие материалы:

```html
<aside>
    <h2>Реклама</h2>
    <p>Специальное предложение...</p>
</aside>
```

## footer

Подвал страницы или раздела: копирайт, ссылки, контакты:

```html
<footer>
    <nav aria-label="Дополнительные ссылки">
        <a href="/privacy">Политика конфиденциальности</a>
    </nav>
    <p>&copy; 2025 Компания</p>
</footer>
```

## address

Контактная информация автора или организации:

```html
<address>
    Написать: <a href="mailto:author@example.com">author@example.com</a><br>
    Адрес: г. Москва, ул. Примерная, 1
</address>
```

Не используйте `<address>` для произвольных адресов в тексте — только для контактов автора/владельца страницы.

## article vs section

| Элемент | Когда использовать |
|---------|-------------------|
| `<article>` | Контент можно вынести отдельно (RSS, шаринг) |
| `<section>` | Раздел внутри страницы или статьи |

```html
<article>
    <h1>Руководство по HTML</h1>
    <section>
        <h2>Введение</h2>
        <p>...</p>
    </section>
    <section>
        <h2>Элементы</h2>
        <p>...</p>
    </section>
</article>
```

## time

Машиночитаемая дата и время:

```html
<p>Опубликовано <time datetime="2025-06-24">24 июня 2025</time></p>
<p>Начало в <time datetime="2025-06-24T18:30:00+03:00">18:30</time></p>
```

## Доступность (a11y)

```html
<!-- Пропуск навигации -->
<a href="#main" class="skip-link">Перейти к содержимому</a>

<!-- ARIA-метки для навигации -->
<nav aria-label="Основное меню">...</nav>

<!-- Скрытый текст для скринридеров -->
<button aria-label="Закрыть">
    <span aria-hidden="true">&times;</span>
</button>

<!-- Роль main через aria (если нельзя использовать тег) -->
<div role="main" id="content">...</div>
```

## Следующий шаг

[5. Мультимедиа](media.md) — video, audio, iframe, canvas.
