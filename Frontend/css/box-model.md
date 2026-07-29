# 3. Блочная модель

> Источники: [MDN — Box model](https://developer.mozilla.org/ru/docs/Learn_web_development/Core/Styling_basics/Box_model) · [MDN box-sizing](https://developer.mozilla.org/ru/docs/Web/CSS/Reference/Properties/box-sizing)

Каждый элемент — прямоугольник из четырёх слоёв:

```
┌─────────── margin ───────────┐
│  ┌─────── border ─────────┐  │
│  │  ┌─── padding ──────┐  │  │
│  │  │                  │  │  │
│  │  │     content      │  │  │
│  │  │                  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

| Слой | Свойства | Описание |
|------|----------|----------|
| content | `width`, `height` | Содержимое |
| padding | `padding-*` | Внутренний отступ (фон элемента) |
| border | `border-*` | Рамка |
| margin | `margin-*` | Внешний отступ (прозрачный) |

## box-sizing

По умолчанию (`content-box`) `width`/`height` — только content. С padding и border элемент становится шире.

Рекомендуемый сброс:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

При `border-box` `width` включает padding и border — проще считать сетки.

## Padding и margin

```css
.box {
    padding: 1rem;                 /* все стороны */
    padding: 1rem 2rem;            /* вертикаль | горизонталь */
    padding: 1rem 2rem 1.5rem;     /* top | left-right | bottom */
    padding: 1rem 2rem 1.5rem 2rem; /* top | right | bottom | left */

    margin: 0 auto;                /* центрирование блочного элемента */
    margin-block: 1rem;            /* логические: top + bottom */
    margin-inline: auto;           /* left + right */
}
```

### Схлопывание margin

Вертикальные margin соседних блоков **схлопываются** в больший из двух. У flex/grid-элементов схлопывания нет.

```css
h2 { margin-bottom: 24px; }
p  { margin-top: 16px; }
/* между ними будет 24px, не 40px */
```

## Border

```css
.card {
    border: 1px solid #e5e7eb;     /* width style color */
    border-radius: 8px;
    border-top: 3px solid #2563eb;
}
```

Стили: `solid`, `dashed`, `dotted`, `double`, `none`.

Shorthand и длинные формы: [border](https://developer.mozilla.org/ru/docs/Web/CSS/Reference/Properties/border), [border-radius](https://developer.mozilla.org/ru/docs/Web/CSS/Reference/Properties/border-radius).

## Width и height

```css
.box {
    width: 100%;
    max-width: 640px;
    min-height: 200px;
    height: auto;          /* по содержимому */
    aspect-ratio: 16 / 9;  /* пропорции без фиксированной высоты */
}
```

| Свойство | Назначение |
|----------|------------|
| `width` / `height` | Размер |
| `min-width` / `max-width` | Ограничения |
| `min-height` / `max-height` | Ограничения по высоте |
| `aspect-ratio` | Соотношение сторон |
| `overflow` | `visible` \| `hidden` \| `auto` \| `scroll` |
| `overflow-x` / `overflow-y` | По осям |

```css
.scroll-area {
    max-height: 320px;
    overflow-y: auto;
}
```

## Display

| Значение | Поведение |
|----------|-----------|
| `block` | На всю ширину, перенос строки |
| `inline` | В строке, width/height почти не работают |
| `inline-block` | В строке, но с размерами как у блока |
| `none` | Не отображается, места не занимает |
| `flex` / `grid` | Контейнеры раскладки — [5. Раскладка](layout.md) |
| `contents` | «Прозрачный» контейнер для раскладки родителя |

```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}
/* скрыть визуально, оставить для скринридеров — не display: none */
```
