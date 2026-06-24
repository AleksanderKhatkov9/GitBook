# 2. Элементы HTML5

> Источники: [metanit.com — Элементы в HTML5](https://metanit.com/web/html5/2.1.php) · [W3Schools — HTML Elements](https://www.w3schools.com/html/html_elements.asp) · [htmlbook.ru — справочник тегов](https://htmlbook.ru/html)

## Заголовки

Шесть уровней заголовков — от главного к подчинённому:

```html
<h1>Главный заголовок страницы</h1>
<h2>Раздел</h2>
<h3>Подраздел</h3>
<h4>Заголовок 4</h4>
<h5>Заголовок 5</h5>
<h6>Заголовок 6</h6>
```

На странице должен быть **один** `<h1>`. Заголовки образуют иерархию — не пропускайте уровни без необходимости.

## Форматирование текста

```html
<p>Обычный <strong>важный</strong> и <em>акцентированный</em> текст.</p>
<p><mark>Выделенный</mark> фрагмент, <del>удалённый</del> и <ins>добавленный</ins>.</p>
<p>Формула: H<sub>2</sub>O, степень: x<sup>2</sup></p>
<p><code>console.log()</code> — моноширинный код.</p>
<p><abbr title="HyperText Markup Language">HTML</abbr> — аббревиатура.</p>
<blockquote cite="https://example.com">
    <p>Цитата в отдельном блоке.</p>
</blockquote>
<p>Как сказал автор: <q cite="#">краткая цитата</q> в строке.</p>
```

| Элемент | Назначение |
|---------|------------|
| `<strong>` | Важный текст (жирный) |
| `<em>` | Акцент (курсив) |
| `<mark>` | Выделение (маркер) |
| `<code>`, `<pre>` | Код |
| `<blockquote>`, `<q>` | Цитаты |
| `<abbr>` | Аббревиатура с расшифровкой |

## Списки

### Маркированный

```html
<ul>
    <li>Пункт 1</li>
    <li>Пункт 2
        <ul>
            <li>Вложенный пункт</li>
        </ul>
    </li>
</ul>
```

### Нумерованный

```html
<ol>
    <li>Шаг 1</li>
    <li>Шаг 2</li>
    <li>Шаг 3</li>
</ol>

<!-- Атрибуты start и type -->
<ol start="5" type="A">
    <li>Пункт E</li>
    <li>Пункт F</li>
</ol>
```

### Список определений

```html
<dl>
    <dt>HTML</dt>
    <dd>Язык разметки гипертекста</dd>
    <dt>CSS</dt>
    <dd>Язык описания стилей</dd>
</dl>
```

## Ссылки

```html
<!-- Внешняя ссылка -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Открыть сайт
</a>

<!-- Внутренняя ссылка -->
<a href="/about">О нас</a>

<!-- Якорь на странице -->
<a href="#contacts">К контактам</a>
<h2 id="contacts">Контакты</h2>

<!-- Ссылка на email и телефон -->
<a href="mailto:info@example.com">Написать</a>
<a href="tel:+79001234567">Позвонить</a>

<!-- Скачивание файла -->
<a href="/files/report.pdf" download>Скачать PDF</a>
```

| Атрибут | Описание |
|---------|----------|
| `href` | URL или якорь |
| `target="_blank"` | Открыть в новой вкладке |
| `rel="noopener noreferrer"` | Безопасность при `target="_blank"` |
| `download` | Скачать файл вместо перехода |

## Изображения

```html
<img src="photo.jpg" alt="Описание фото" width="600" height="400" loading="lazy">
```

- **`alt`** — обязателен для доступности и SEO; описывает содержимое.
- **`loading="lazy"`** — отложенная загрузка вне экрана.

### Адаптивные изображения

```html
<picture>
    <source srcset="hero.webp" type="image/webp">
    <source media="(max-width: 768px)" srcset="hero-mobile.jpg">
    <img src="hero.jpg" alt="Баннер">
</picture>
```

### Карта ссылок на изображении

```html
<img src="map.jpg" alt="Карта" usemap="#sitemap">
<map name="sitemap">
    <area shape="rect" coords="0,0,100,100" href="/north" alt="Север">
    <area shape="circle" coords="200,200,50" href="/center" alt="Центр">
</map>
```

## figure и figcaption

```html
<figure>
    <img src="chart.png" alt="График продаж за 2025 год">
    <figcaption>Рис. 1 — Динамика продаж</figcaption>
</figure>
```

## Таблицы

```html
<table>
    <caption>Расписание занятий</caption>
    <thead>
        <tr>
            <th>День</th>
            <th>Время</th>
            <th>Предмет</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Понедельник</td>
            <td>10:00</td>
            <td>Математика</td>
        </tr>
        <tr>
            <td colspan="2">Вторник</td>
            <td>Физика</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Всего: 2 занятия</td>
        </tr>
    </tfoot>
</table>
```

| Атрибут | Описание |
|---------|----------|
| `colspan` | Объединение ячеек по горизонтали |
| `rowspan` | Объединение ячеек по вертикали |
| `<th scope="col">` | Заголовок столбца (доступность) |

Для сложной вёрстки страницы таблицы **не используют** — только для табличных данных.

## details и summary

Раскрывающийся блок без JavaScript:

```html
<details>
    <summary>Часто задаваемые вопросы</summary>
    <p>Ответ на вопрос пользователя.</p>
</details>

<details open>
    <summary>Открыт по умолчанию</summary>
    <p>Содержимое видно сразу.</p>
</details>
```

## iframe

Встраивание другой страницы или виджета:

```html
<iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Видео на YouTube"
    width="560"
    height="315"
    loading="lazy"
    allowfullscreen>
</iframe>
```

## Классы и идентификаторы

```html
<p class="text-muted highlight">Абзац с двумя классами</p>
<p class="text-muted">Другой абзац с тем же классом</p>
<nav id="main-nav">Навигация — уникальный id</nav>
```

| Атрибут | Правило |
|---------|---------|
| `class` | Можно несколько через пробел; повторяется на странице |
| `id` | Уникален на странице; используйте для якорей и JS |

## HTML-сущности

Спецсимволы, которые нельзя писать напрямую:

| Сущность | Символ | Описание |
|----------|--------|----------|
| `&lt;` | `<` | Меньше |
| `&gt;` | `>` | Больше |
| `&amp;` | `&` | Амперсанд |
| `&nbsp;` | неразрывный пробел | |
| `&copy;` | © | Знак авторского права |
| `&#8381;` или `&ruble;` | ₽ | Рубль |

```html
<p>5 &lt; 10 &amp; 10 &gt; 5</p>
```

## Следующий шаг

[3. Формы](forms.md) — элементы ввода, кнопки, валидация.
