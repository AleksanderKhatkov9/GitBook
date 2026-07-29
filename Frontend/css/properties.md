# 4. Свойства CSS

> Справочник: [MDN CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)  
> Полный алфавитный список — на MDN; ниже — практические группы для ежедневной работы.

Свойство — параметр объявления, который меняет отображение элемента:

```css
img {
    opacity: 0.8;
    margin: 1rem; /* shorthand для margin-top/right/bottom/left */
}
```

## Цвет и фон

| Свойство | Описание |
|----------|----------|
| `color` | Цвет текста |
| `opacity` | Прозрачность элемента (0–1) |
| `background` | Shorthand фона |
| `background-color` | Цвет фона |
| `background-image` | `url()`, градиенты |
| `background-size` | `cover`, `contain`, размеры |
| `background-position` | Позиция изображения |
| `background-repeat` | Повтор |
| `background-clip` | Обрезка фона |
| `backdrop-filter` | Размытие фона за элементом |

```css
.hero {
    color: #fff;
    background-color: #0f172a;
    background-image: linear-gradient(135deg, #1e3a8a, #0f172a);
    background-size: cover;
}

.glass {
    backdrop-filter: blur(8px);
    background: rgb(255 255 255 / 0.7);
}
```

Форматы цвета: `#rgb`, `#rrggbb`, `rgb()`, `rgba()`, `hsl()`, `oklch()`, именованные (`red`).

## Типографика

| Свойство | Описание |
|----------|----------|
| `font` | Shorthand |
| `font-family` | Семейство шрифтов |
| `font-size` | Размер |
| `font-weight` | `normal`, `bold`, `100`–`900` |
| `font-style` | `normal`, `italic` |
| `line-height` | Высота строки |
| `letter-spacing` | Межбуквенный интервал |
| `word-spacing` | Между словами |
| `text-align` | `left`, `center`, `right`, `justify` |
| `text-decoration` | Подчёркивание и т.п. |
| `text-transform` | `uppercase`, `lowercase`, `capitalize` |
| `text-overflow` | `ellipsis` (нужны overflow + white-space) |
| `white-space` | Переносы и пробелы |
| `vertical-align` | Выравнивание inline/table |

```css
body {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #111;
}

.title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
}

.truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

## Отступы и границы

| Группа | Свойства |
|--------|----------|
| Margin | `margin`, `margin-top/right/bottom/left`, `margin-block`, `margin-inline` |
| Padding | `padding`, `padding-*`, логические аналоги |
| Border | `border`, `border-width/style/color`, `border-radius` |
| Outline | `outline`, `outline-offset` (не влияет на размер) |

```css
.button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    outline-offset: 2px;
}

.button:focus-visible {
    outline: 2px solid #2563eb;
}
```

## Размеры и overflow

| Свойство | Описание |
|----------|----------|
| `width`, `height` | Размер |
| `min-*`, `max-*` | Ограничения |
| `block-size`, `inline-size` | Логические размеры |
| `aspect-ratio` | Пропорции |
| `box-sizing` | Модель расчёта размера |
| `overflow`, `overflow-x/y` | Переполнение |
| `object-fit` | `cover` / `contain` для img/video |
| `object-position` | Позиция внутри object-fit |

```css
.thumb {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
}
```

## Display, flex, grid

| Свойство | Описание |
|----------|----------|
| `display` | `block`, `flex`, `grid`, `none`, … |
| `flex`, `flex-grow/shrink/basis` | Элемент flex |
| `flex-direction`, `flex-wrap` | Ось и перенос |
| `justify-content`, `align-items`, `align-content` | Выравнивание |
| `gap`, `row-gap`, `column-gap` | Промежутки |
| `grid-template-columns/rows` | Треки сетки |
| `grid-column`, `grid-row` | Занятие ячеек |
| `place-items`, `place-content` | Shorthand выравнивания |
| `order` | Порядок flex/grid-элемента |

Подробности: [5. Раскладка](layout.md).

## Позиционирование и слои

| Свойство | Описание |
|----------|----------|
| `position` | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| `top`, `right`, `bottom`, `left` | Смещение |
| `inset` | Shorthand всех четырёх |
| `z-index` | Слой |
| `float` | Обтекание (legacy) |
| `clear` | Отмена float |

```css
.header {
    position: sticky;
    top: 0;
    z-index: 100;
}

.badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}
```

## Тени и эффекты

| Свойство | Описание |
|----------|----------|
| `box-shadow` | Тень блока |
| `text-shadow` | Тень текста |
| `filter` | `blur()`, `grayscale()`, … |
| `mix-blend-mode` | Смешивание с фоном |
| `isolation` | Новый stacking context |
| `clip-path` | Обрезка по фигуре |
| `mask` / `mask-image` | Маска |

```css
.card {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}

.avatar {
    border-radius: 50%;
    filter: grayscale(20%);
}
```

## Трансформации и анимации

| Свойство | Описание |
|----------|----------|
| `transform` | `translate`, `scale`, `rotate`, `skew` |
| `transform-origin` | Точка трансформации |
| `transition` | Плавное изменение |
| `animation` | Ключевые кадры |
| `animation-*` | delay, duration, iteration, … |
| `will-change` | Подсказка браузеру (осторожно) |

Подробнее: [7. Анимации](animations.md).

## Списки, таблицы, курсор

| Свойство | Описание |
|----------|----------|
| `list-style`, `list-style-type` | Маркеры списка |
| `list-style-position` | Внутри / снаружи |
| `table-layout` | Алгоритм таблицы |
| `border-collapse` | Слияние границ ячеек |
| `cursor` | `pointer`, `not-allowed`, `grab`, … |
| `pointer-events` | Участие в событиях мыши |
| `user-select` | Выделение текста |
| `resize` | Изменение размера (textarea) |
| `scroll-behavior` | `smooth` для якорей |
| `scroll-margin-top` | Отступ при scroll to |

```css
a { cursor: pointer; }
.no-select { user-select: none; }
html { scroll-behavior: smooth; }
```

## Кастомные свойства

```css
:root {
    --color-brand: #2563eb;
}

.button {
    background: var(--color-brand);
}
```

На MDN: [Custom properties (--\*)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/Custom_properties).

## Shorthand

Одно свойство задаёт несколько связанных:

| Shorthand | Раскрывается в |
|-----------|----------------|
| `margin` | `margin-top/right/bottom/left` |
| `padding` | `padding-*` |
| `border` | width, style, color |
| `background` | color, image, position, size, … |
| `font` | style, weight, size, line-height, family |
| `flex` | grow, shrink, basis |
| `grid` / `grid-template` | строки и колонки |
| `animation` | name, duration, timing, … |
| `transition` | property, duration, timing, delay |
| `all` | сброс почти всех свойств |

Полный индекс: [MDN Alphabetical index of properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties#alphabetical_index_of_properties).
