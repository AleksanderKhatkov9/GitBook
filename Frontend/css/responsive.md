# 6. Адаптивность

> Источники: [MDN — Responsive design](https://developer.mozilla.org/ru/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) · [MDN @media](https://developer.mozilla.org/ru/docs/Web/CSS/@media)

Адаптивная вёрстка подстраивает макет под ширину экрана и устройство.

## Viewport

Обязательный meta-тег:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Без него мобильный браузер «сжимает» десктопную страницу.

## Единицы измерения

| Единица | Описание |
|---------|----------|
| `px` | Пиксели (фиксировано) |
| `%` | От родителя |
| `em` | Относительно `font-size` элемента |
| `rem` | Относительно `font-size` корня (`html`) |
| `vw` / `vh` | % ширины / высоты viewport |
| `vmin` / `vmax` | Меньшая / большая сторона viewport |
| `dvh` / `svh` / `lvh` | Динамическая / small / large viewport height |
| `ch` | Ширина символа «0» |
| `cqw` / `cqh` | % контейнера (container queries) |

```css
html { font-size: 100%; } /* обычно 16px */

.card {
    padding: 1rem;                    /* 16px при корне 16px */
    width: min(100%, 40rem);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
}
```

`clamp(min, preferred, max)` — удобный fluid-размер без media query.

## Mobile first

Сначала стили для узких экранов, затем расширения:

```css
.grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

Частые breakpoints (ориентиры, не догма): `640px`, `768px`, `1024px`, `1280px`.

## Media queries

```css
/* Ширина */
@media (max-width: 600px) { /* … */ }

/* Ориентация */
@media (orientation: landscape) { /* … */ }

/* Тёмная тема системы */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #0f172a;
        --fg: #f8fafc;
    }
}

/* Меньше движения */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* Печать */
@media print {
    .no-print { display: none; }
    a[href]::after { content: " (" attr(href) ")"; }
}
```

Логические комбинации:

```css
@media (min-width: 768px) and (hover: hover) {
    .card:hover { transform: translateY(-2px); }
}
```

## Container queries

Стили от размера **контейнера**, а не окна:

```css
.card-list {
    container-type: inline-size;
    container-name: cards;
}

@container cards (min-width: 480px) {
    .card {
        display: grid;
        grid-template-columns: 120px 1fr;
    }
}
```

Полезно для компонентов в сайдбаре и основной колонке одновременно.

## Практические паттерны

```css
/* Картинка не вылезает */
img, video {
    max-width: 100%;
    height: auto;
}

/* Адаптивная сетка без breakpoints */
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 1.5rem;
}

/* Боковая панель → колонка на мобиле */
.page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 900px) {
    .page {
        flex-direction: row;
    }

    .sidebar {
        flex: 0 0 260px;
    }

    .content {
        flex: 1;
        min-width: 0; /* важно для overflow внутри flex */
    }
}
```
