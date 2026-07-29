# 5. Раскладка

> Источники: [MDN Flexbox](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_flexible_box_layout) · [MDN Grid](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_grid_layout) · [MDN Positioning](https://developer.mozilla.org/ru/docs/Web/CSS/position)

## Flexbox

Одномерная раскладка (ряд или колонка).

```css
.row {
    display: flex;
    flex-direction: row;      /* row | row-reverse | column | column-reverse */
    flex-wrap: wrap;          /* nowrap | wrap */
    justify-content: center;  /* главная ось */
    align-items: center;      /* поперечная ось */
    gap: 1rem;
}
```

### Выравнивание

| Свойство | Ось | Типичные значения |
|----------|-----|-------------------|
| `justify-content` | Главная | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | Поперечная | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` |
| `align-content` | Несколько рядов | как justify, при `flex-wrap` |
| `align-self` | У элемента | переопределяет `align-items` |

### Элементы flex

```css
.item {
    flex: 1;              /* grow shrink basis → 1 1 0% */
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 200px;
    order: 2;             /* порядок без смены HTML */
}
```

```css
/* Три колонки равной ширины */
.cols {
    display: flex;
    gap: 1rem;
}

.cols > * {
    flex: 1;
}
```

## CSS Grid

Двумерная раскладка (строки и колонки).

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
}

.grid-adaptive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
}
```

### Размещение элементов

```css
.header  { grid-column: 1 / -1; }
.sidebar { grid-row: 2 / 4; }
.main    { grid-column: 2 / 3; }

/* именованные области */
.page {
    display: grid;
    grid-template-areas:
        "header header"
        "nav    main"
        "footer footer";
    grid-template-columns: 200px 1fr;
}

.page__header { grid-area: header; }
.page__nav    { grid-area: nav; }
.page__main   { grid-area: main; }
.page__footer { grid-area: footer; }
```

### Единицы треков

| Значение | Смысл |
|----------|-------|
| `1fr` | Доля свободного места |
| `minmax(200px, 1fr)` | От min до max |
| `auto` | По содержимому |
| `repeat(3, 1fr)` | Повтор |
| `auto-fit` / `auto-fill` | Автоколонки |

## Позиционирование

```css
.relative { position: relative; }   /* точка отсчёта для absolute */
.absolute { position: absolute; top: 0; right: 0; }
.fixed    { position: fixed; bottom: 1rem; right: 1rem; } /* относительно viewport */
.sticky   { position: sticky; top: 0; }                   /* пока в родителе */
```

`absolute` / `fixed` вынимают элемент из обычного потока. Контейнер для `absolute` — ближайший предок с `position` ≠ `static`.

## Центрирование

```css
/* Flex */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Grid */
.center-grid {
    display: grid;
    place-items: center;
}

/* Блок по горизонтали */
.block {
    width: min(100%, 720px);
    margin-inline: auto;
}
```

## Когда что выбирать

| Задача | Инструмент |
|--------|------------|
| Навбар, ряд кнопок, выравнивание в строке | Flexbox |
| Карточки, страничный каркас, двумерная сетка | Grid |
| Модалка, бейдж, sticky-шапка | `position` |
| Старый float-layout | Избегать в новом коде |

```css
/* Типичный каркас */
.layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
}

.layout__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
}
```
