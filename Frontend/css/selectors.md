# 2. Селекторы

> Источники: [MDN — CSS selectors](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_selectors) · [MDN Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors)

Селектор указывает, к каким элементам применять правило.

## Базовые

| Селектор | Пример | Описание |
|----------|--------|----------|
| Универсальный | `*` | Все элементы |
| По типу | `p`, `h1` | Тег |
| По классу | `.card` | `class="card"` |
| По ID | `#main` | `id="main"` (уникален) |
| По атрибуту | `[type="email"]` | Наличие/значение атрибута |

```css
* { box-sizing: border-box; }
h2 { font-weight: 600; }
.btn { cursor: pointer; }
#app { min-height: 100vh; }
input[required] { border-color: #ccc; }
a[target="_blank"] { color: #2563eb; }
```

### Атрибуты

```css
[href]              /* есть атрибут href */
[href^="https"]     /* начинается с */
[href$=".pdf"]      /* заканчивается на */
[href*="docs"]      /* содержит подстроку */
[class~="active"]   /* одно из значений в списке */
```

## Комбинаторы

| Синтаксис | Пример | Описание |
|-----------|--------|----------|
| Потомок | `nav a` | `a` внутри `nav` на любом уровне |
| Дочерний | `ul > li` | прямой потомок |
| Соседний | `h2 + p` | сразу следующий sibling |
| Общий sibling | `h2 ~ p` | все следующие siblings |

```css
.card > img { width: 100%; }
h1 + p { margin-top: 0.5rem; }
```

## Группировка

```css
h1, h2, h3 {
    font-family: Georgia, serif;
}
```

## Псевдоклассы

Состояние или позиция элемента:

| Псевдокласс | Описание |
|-------------|----------|
| `:hover` | Наведение |
| `:focus` / `:focus-visible` | Фокус |
| `:active` | Нажатие |
| `:visited` | Посещённая ссылка |
| `:checked` | Чекбокс/радио |
| `:disabled` / `:enabled` | Состояние поля |
| `:first-child` / `:last-child` | Первый / последний потомок |
| `:nth-child(n)` | n-й потомок |
| `:nth-of-type(n)` | n-й среди того же тега |
| `:not(selector)` | Не совпадает |
| `:is()` / `:where()` | Группа селекторов |
| `:has()` | Родитель, у которого есть потомок |

```css
a:hover { text-decoration: underline; }
button:focus-visible { outline: 2px solid #2563eb; }
li:nth-child(odd) { background: #f5f5f5; }
.form-group:has(input:invalid) { border-color: red; }
article:not(.featured) { opacity: 0.9; }
```

## Псевдоэлементы

Создают «виртуальные» части элемента:

| Псевдоэлемент | Описание |
|---------------|----------|
| `::before` / `::after` | Контент до/после (нужен `content`) |
| `::placeholder` | Текст-подсказка в input |
| `::selection` | Выделенный текст |
| `::first-line` / `::first-letter` | Первая строка / буква |

```css
.quote::before {
    content: "«";
    color: #999;
}

input::placeholder {
    color: #9ca3af;
}
```

## Практические паттерны

```css
/* Сброс списка в меню */
.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-list > li + li {
    margin-left: 1rem;
}

/* Карточка со ссылкой на всю площадь */
.card {
    position: relative;
}

.card a::after {
    content: "";
    position: absolute;
    inset: 0;
}
```
