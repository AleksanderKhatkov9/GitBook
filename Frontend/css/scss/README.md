# SCSS / Sass

> Документация: [sass-scss.ru](https://sass-scss.ru/documentation/) · [Основы](https://sass-scss.ru/guide/) · [Официальный Sass](https://sass-lang.com/documentation/)

**Sass** — препроцессор CSS: переменные, вложенность, миксины, модули и управляющие директивы. Исходник компилируется в обычный CSS.

Два синтаксиса:

| Синтаксис | Расширение | Особенности |
|-----------|------------|-------------|
| **SCSS** | `.scss` | Совместим с CSS, фигурные скобки и `;` |
| **Sass (indented)** | `.sass` | Отступы вместо `{}`, без `;` |

В проектах почти всегда используют **SCSS**.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Установка, компиляция, преимущества |
| [2. Переменные и типы](variables.md) | `$vars`, строки, списки, maps, цвета |
| [3. Вложенность и импорт](nesting.md) | Вложенные правила, `&`, partials, `@use` |
| [4. Миксины и функции](mixins.md) | `@mixin`, `@include`, `@function`, `@extend` |
| [5. Директивы](directives.md) | `@if`, `@for`, `@each`, `@while`, `@media` |

## Быстрый пример

```scss
$primary: #2563eb;
$radius: 0.5rem;

.card {
    border-radius: $radius;
    padding: 1rem;

    &__title {
        color: $primary;
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
    }
}
```

Компилируется в:

```css
.card {
    border-radius: 0.5rem;
    padding: 1rem;
}

.card__title {
    color: #2563eb;
    font-weight: 600;
}

.card:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}
```

## В Laravel / Vite

```bash
npm install -D sass
```

`resources/css/app.scss`:

```scss
@use 'variables';
@use 'components/button';
```

Подключение в Blade:

```html
@vite(['resources/css/app.scss', 'resources/js/app.js'])
```

## Полезные ссылки

| Ресурс | Описание |
|--------|----------|
| [sass-scss.ru/documentation](https://sass-scss.ru/documentation/) | Документация на русском |
| [sass-scss.ru/guide](https://sass-scss.ru/guide/) | Краткий гайд по основам |
| [sass-lang.com](https://sass-lang.com/documentation/) | Актуальный официальный справочник |
| [Can I Use — CSS nesting](https://caniuse.com/css-nesting) | Нативная вложенность в CSS (без Sass) |
