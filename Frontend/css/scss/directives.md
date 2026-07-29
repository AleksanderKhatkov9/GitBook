# 5. Управляющие директивы

> Источники: [Управляющие директивы](https://sass-scss.ru/documentation/#%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%8F%D1%8E%D1%89%D0%B8%D0%B5-%D0%B4%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D1%8B-%D0%B8-%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F) · [Правила и директивы](https://sass-scss.ru/documentation/#%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%B8-%D0%B4%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D1%8B)

## if() и @if

Функция `if()` — выражение:

```scss
$theme: dark;

.panel {
    background: if($theme == dark, #0f172a, #fff);
}
```

Директива `@if` / `@else if` / `@else`:

```scss
@mixin text($size) {
    @if $size == xl {
        font-size: 2rem;
    } @else if $size == lg {
        font-size: 1.25rem;
    } @else {
        font-size: 1rem;
    }
}
```

## @for

```scss
@for $i from 1 through 5 {
    .m-#{$i} {
        margin: #{$i * 0.25rem};
    }
}
```

- `from … through` — включая верхнюю границу;
- `from … to` — не включая.

## @each

Обход списка или map:

```scss
$sizes: sm, md, lg;

@each $size in $sizes {
    .btn-#{$size} {
        @extend %btn-base;
    }
}

$colors: (
    primary: #2563eb,
    danger: #dc2626,
);

@each $name, $color in $colors {
    .text-#{$name} {
        color: $color;
    }
}
```

Множественные значения в `@each` — см. [документацию](https://sass-scss.ru/documentation/#%D0%94%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D0%B0-each).

## @while

```scss
$i: 1;

@while $i <= 4 {
    .col-#{$i} {
        width: math.div(100%, 4) * $i;
    }
    $i: $i + 1;
}
```

Чаще достаточно `@for` / `@each`.

## @media и вложенность

В SCSS `@media` можно писать внутри селектора — компилятор «поднимет» медиазапрос:

```scss
.sidebar {
    width: 100%;

    @media (min-width: 768px) {
        width: 280px;
    }
}
```

→

```css
.sidebar { width: 100%; }

@media (min-width: 768px) {
    .sidebar { width: 280px; }
}
```

## Отладка: @debug, @warn, @error

```scss
@debug $primary;           // в консоль компилятора
@warn "Устаревший миксин"; // предупреждение
@error "Неизвестный размер #{$size}"; // остановить сборку
```

Полезно в миксинах с проверкой аргументов.

## @at-root

Вынести правило из текущей вложенности:

```scss
.block {
    color: #111;

    @at-root {
        .block-reset {
            all: unset;
        }
    }
}
```

Условия `@at-root` — в [документации](https://sass-scss.ru/documentation/#%D0%94%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D0%B0-at-root).

## Пример: утилитарные классы отступов

```scss
@use 'sass:math';

$spaces: (
    0: 0,
    1: 0.25rem,
    2: 0.5rem,
    3: 1rem,
    4: 1.5rem,
);

@each $key, $value in $spaces {
    .p-#{$key}  { padding: $value; }
    .mt-#{$key} { margin-top: $value; }
    .gap-#{$key} { gap: $value; }
}
```

Так на SCSS удобно генерировать однотипные утилиты без копипаста.
