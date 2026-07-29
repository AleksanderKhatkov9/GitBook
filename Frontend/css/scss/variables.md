# 2. Переменные и типы данных

> Источники: [SassScript](https://sass-scss.ru/documentation/#SassScript) · [Переменные](https://sass-scss.ru/guide/) · [sass-lang.com — Variables](https://sass-lang.com/documentation/variables)

## Переменные

Объявляются через `$`:

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;
$spacing-md: 1rem;

body {
    font: 100% $font-stack;
    color: $primary-color;
    padding: $spacing-md;
}
```

После компиляции в CSS подставляются значения.

### Область видимости и !default

```scss
$brand: #2563eb !default; // задать, только если ещё не определена

.button {
    $local: 0.5rem; // видна только внутри блока
    padding: $local;
}
```

`!default` удобен в библиотеках и темах: проект может переопределить переменную до `@use`.

## Типы данных

| Тип | Примеры |
|-----|---------|
| Числа | `12`, `1.5rem`, `10px`, `80%` |
| Строки | `"Helvetica"`, `'bold'`, `sans-serif` (без кавычек тоже строка) |
| Цвета | `#333`, `rgb(0,0,0)`, `hsl(210, 50%, 40%)` |
| Логические | `true`, `false` |
| `null` | пустое значение |
| Списки | `1rem 2rem`, `Helvetica, Arial, sans-serif` |
| Maps | `(primary: #2563eb, danger: #dc2626)` |

### Строки и интерполяция

```scss
$name: "header";
$side: left;

.#{$name} {
    margin-#{$side}: 1rem;
    content: "Block #{$name}";
}
```

`#{}` вставляет значение в селектор, имя свойства или строку.

### Списки

```scss
$sizes: 0.5rem, 1rem, 1.5rem;

.box {
    margin: 1rem 2rem; // список из двух значений
}
```

Функции: `nth($list, 1)`, `length($list)`, `join()`, `append()`.

### Maps (ассоциативные массивы)

```scss
$colors: (
    primary: #2563eb,
    success: #16a34a,
    danger: #dc2626,
);

.alert-success {
    color: map-get($colors, success);
}

// Современный модуль:
@use 'sass:map';

.btn-primary {
    background: map.get($colors, primary);
}
```

### Цвета

Sass умеет манипулировать цветами:

```scss
@use 'sass:color';

$brand: #2563eb;

.button {
    background: $brand;
    border-color: color.adjust($brand, $lightness: -10%);
}

.button:hover {
    background: color.mix($brand, #000, 15%);
}
```

На старых уроках часто встречаются `darken()`, `lighten()`, `mix()` без модуля — в Dart Sass предпочтительнее `sass:color`.

## Операции

```scss
.container { width: 100%; }

article {
    width: math.div(600px, 960px) * 100%; // 62.5%
}

aside {
    width: 300px / 960px * 100%; // в старых примерах; для деления чисел лучше math.div
}
```

```scss
@use 'sass:math';

.col {
    width: math.div(1, 3) * 100%;
}
```

Операторы: `+`, `-`, `*`, `%`, сравнения (`==`, `>`, …), логические (`and`, `or`, `not`).

Деление и `/` в CSS (например `font: 16px / 1.5`) — особый случай; для арифметики используйте `math.div()`.

Подробнее: [SassScript — операции](https://sass-scss.ru/documentation/#%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8).

## CSS-переменные vs Sass-переменные

| | Sass `$var` | CSS `var(--x)` |
|--|-------------|----------------|
| Когда считается | При компиляции | В браузере |
| Можно менять в runtime | Нет | Да (JS, media) |
| Видны в DevTools как переменные | Нет (уже подставлены) | Да |

Частый подход: токены в Sass → прокинуть в `:root` как CSS custom properties для темизации.
