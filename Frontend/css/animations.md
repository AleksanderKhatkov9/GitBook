# 7. Анимации и переходы

> Источники: [MDN Transitions](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_transitions) · [MDN Animations](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_animations) · [MDN transform](https://developer.mozilla.org/ru/docs/Web/CSS/transform)

## transform

Не меняет поток документа (в отличие от margin/top) — дешевле для анимаций.

```css
.box {
    transform: translateX(20px) scale(1.05) rotate(3deg);
    transform-origin: center center;
}
```

| Функция | Пример |
|---------|--------|
| `translate` / `translateX/Y` | `translate(10px, 20%)` |
| `scale` / `scaleX/Y` | `scale(1.1)` |
| `rotate` | `rotate(45deg)`, `rotate(0.25turn)` |
| `skew` | `skewX(10deg)` |
| `matrix` / 3D | `translateZ`, `rotateY`, `perspective` |

```css
.card:hover {
    transform: translateY(-4px);
}
```

## transition

Плавное изменение свойств при смене состояния (`:hover`, класс, и т.д.).

```css
.button {
    background: #2563eb;
    transform: translateY(0);
    transition:
        background 0.2s ease,
        transform 0.2s ease;
}

.button:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
}
```

Shorthand: `transition: property duration timing-function delay;`

| Часть | Пример |
|-------|--------|
| `transition-property` | `all`, `opacity`, `transform` |
| `transition-duration` | `200ms`, `0.3s` |
| `transition-timing-function` | `ease`, `linear`, `ease-in-out`, `cubic-bezier(...)` |
| `transition-delay` | `0.1s` |

Анимируйте `transform` и `opacity` — они обычно идут через compositor. Избегайте анимации `width`/`height`/`top` без необходимости.

## animation и @keyframes

```css
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alert {
    animation: fade-in 0.35s ease both;
}
```

Shorthand:

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

| Свойство | Описание |
|----------|----------|
| `animation-name` | Имя `@keyframes` |
| `animation-duration` | Длительность |
| `animation-timing-function` | Кривая |
| `animation-delay` | Задержка |
| `animation-iteration-count` | Число или `infinite` |
| `animation-direction` | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | `running`, `paused` |

```css
.spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid #e5e7eb;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

## Несколько анимаций

```css
.hero-title {
    animation:
        fade-in 0.5s ease both,
        slide-up 0.5s ease both;
}
```

## Доступность

```css
@media (prefers-reduced-motion: reduce) {
    .alert,
    .spinner {
        animation: none;
        transition: none;
    }
}
```

Не полагайтесь только на цвет или движение для важной информации.

## Практические советы

1. Коротко: UI-переходы 150–300 ms, появление блоков до ~500 ms.
2. `will-change: transform` — только на время анимации, потом убирать.
3. Для появления списка — `animation-delay` с шагом через SCSS `@for` или отдельные классы.
4. Сложные сценарии — Web Animations API или JS-библиотеки; для UI чаще хватает CSS.
