# 3. Вложенность и импорт

> Источники: [Расширение CSS](https://sass-scss.ru/documentation/#%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-CSS) · [Вложенности и импорт](https://sass-scss.ru/guide/) · [sass-lang.com — Nesting](https://sass-lang.com/documentation/style-rules/declarations#nesting)

## Вложенные правила

Селекторы можно вкладывать по аналогии с HTML:

```scss
nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: inline-block;
    }

    a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
    }
}
```

→ `nav ul`, `nav li`, `nav a`.

Не углубляйте вложенность без нужды (обычно не больше 3 уровней) — селекторы становятся тяжёлыми и хрупкими.

## Ссылка на родителя: `&`

```scss
.button {
    background: #2563eb;

    &:hover {
        background: #1d4ed8;
    }

    &--primary {
        background: #2563eb;
    }

    &__icon {
        margin-right: 0.5rem;
    }

    .card & {
        // .card .button
        width: 100%;
    }
}
```

`&` — текущий родительский селектор. Нужен для псевдоклассов, БЭМ-модификаторов и смены порядка.

В SassScript `&` также участвует в интерполяции — см. [документацию](https://sass-scss.ru/documentation/).

## Вложенные свойства

```scss
.box {
    font: {
        family: Georgia, serif;
        size: 1.125rem;
        weight: 600;
    }

    margin: {
        top: 1rem;
        bottom: 2rem;
    }
}
```

→ `font-family`, `font-size`, …

## Шаблонные селекторы (%)

```scss
%card-base {
    border-radius: 8px;
    padding: 1rem;
    background: #fff;
}

.card {
    @extend %card-base;
}
```

`%placeholder` попадает в CSS **только** если его расширили через `@extend`. Подробнее: [4. Миксины и функции](mixins.md).

## Фрагменты (partials)

Имя с подчёркивания: `_buttons.scss`. Компилятор не создаёт отдельный CSS-файл.

## @use и @forward (современный способ)

Dart Sass рекомендует модули вместо `@import`:

```scss
// _variables.scss
$primary: #2563eb;
$radius: 0.5rem;

// _buttons.scss
@use 'variables' as *;

.button {
    background: $primary;
    border-radius: $radius;
}

// app.scss
@use 'variables';
@use 'buttons';
```

| Директива | Назначение |
|-----------|------------|
| `@use` | Подключить модуль один раз, пространство имён |
| `@forward` | Пробросить API модуля наружу (баррели) |
| `@import` | Устаревший способ (всё в одной глобальной области) |

```scss
@use 'variables' as v;

.button {
    color: v.$primary;
}
```

## @import (legacy)

Из [гайда](https://sass-scss.ru/guide/):

```scss
// _reset.scss
html, body, ul, ol {
    margin: 0;
    padding: 0;
}

// base.scss
@import 'reset';

body {
    font: 100% Helvetica, sans-serif;
    background-color: #efefef;
}
```

Расширение и `_` указывать не обязательно. В отличие от CSS `@import`, Sass склеивает файлы в один CSS без лишнего запроса.

Вложенный `@import` и нюансы — в [документации @import](https://sass-scss.ru/documentation/#%D0%94%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D0%B0-import).

Для новых проектов предпочитайте `@use` / `@forward`.
