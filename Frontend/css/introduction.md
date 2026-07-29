# 1. Введение в CSS

> Источники: [MDN — CSS first steps](https://developer.mozilla.org/ru/docs/Learn_web_development/Core/Styling_basics/What_is_CSS) · [MDN CSS](https://developer.mozilla.org/ru/docs/Web/CSS)

CSS задаёт, как браузер отображает элементы HTML: цвет, шрифт, отступы, расположение.

## Способы подключения

### Внешний файл (рекомендуется)

```html
<link rel="stylesheet" href="/css/styles.css">
```

### Внутри `<style>`

```html
<style>
    body { font-family: system-ui, sans-serif; }
</style>
```

### Инлайн (избегать в обычной вёрстке)

```html
<p style="color: red;">Текст</p>
```

## Синтаксис

```css
selector {
    property: value;
}
```

| Часть | Пример | Описание |
|-------|--------|----------|
| Селектор | `h1`, `.card` | К каким элементам применять |
| Свойство | `color` | Что меняем |
| Значение | `#333`, `1rem` | Как именно |

Несколько объявлений разделяются `;`. Комментарии: `/* ... */`.

```css
/* Карточка */
.card {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
}
```

## Каскад

Если несколько правил конфликтуют, побеждает то, у которого выше **приоритет**:

1. **Важность** — `!important` (использовать редко)
2. **Специфичность** — насколько «точный» селектор
3. **Порядок** — при равной специфичности побеждает правило ниже по коду

```css
p { color: blue; }           /* специфичность: 0,0,1 */
.text { color: green; }      /* специфичность: 0,1,0 */
#intro { color: red; }       /* специфичность: 1,0,0 */
```

Для `<p id="intro" class="text">` цвет будет красным.

### Специфичность (упрощённо)

| Селектор | Вес |
|----------|-----|
| Элемент, псевдоэлемент (`div`, `::before`) | 0,0,1 |
| Класс, атрибут, псевдокласс (`.btn`, `[type]`, `:hover`) | 0,1,0 |
| ID (`#header`) | 1,0,0 |
| Инлайн `style=""` | 1,0,0,0 |
| `!important` | перебивает всё |

## Наследование

Часть свойств наследуется детьми от родителя: `color`, `font-family`, `line-height`.  
Не наследуются: `margin`, `padding`, `border`, `width`, `display`.

```css
body {
    color: #222;
    font-family: Georgia, serif;
}
/* все потомки наследуют цвет и шрифт, пока не переопределите */
```

Ключевые слова:

```css
.child {
    color: inherit;   /* взять у родителя */
    margin: initial;  /* начальное значение свойства */
    all: unset;       /* сбросить почти всё */
}
```

## Кастомные свойства (CSS-переменные)

```css
:root {
    --color-primary: #2563eb;
    --space-md: 1rem;
}

.button {
    background: var(--color-primary);
    padding: var(--space-md);
}
```

С fallback: `var(--color-accent, #f59e0b)`.

Подробнее о свойствах: [4. Свойства](properties.md).
