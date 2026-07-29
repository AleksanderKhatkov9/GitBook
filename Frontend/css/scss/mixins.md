# 4. Миксины и функции

> Источники: [Миксины](https://sass-scss.ru/documentation/#%D0%9C%D0%B8%D0%BA%D1%81%D0%B8%D0%BD%D1%8B) · [Функции](https://sass-scss.ru/documentation/#%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8) · [Гайд — миксины и @extend](https://sass-scss.ru/guide/)

## Миксины (@mixin / @include)

Миксин — переиспользуемый набор объявлений, при необходимости с аргументами.

```scss
@mixin transform($property) {
    -webkit-transform: $property;
    -ms-transform: $property;
    transform: $property;
}

.box {
    @include transform(rotate(30deg));
}
```

### Именованные и значения по умолчанию

```scss
@mixin card($padding: 1rem, $radius: 8px) {
    padding: $padding;
    border-radius: $radius;
    background: #fff;
}

.card {
    @include card;
}

.card-lg {
    @include card($padding: 1.5rem, $radius: 12px);
}
```

### Переменное число аргументов

```scss
@mixin shadow($levels...) {
    box-shadow: $levels;
}

.panel {
    @include shadow(0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.08));
}
```

### Блок контента (@content)

```scss
@mixin respond-to($min) {
    @media (min-width: $min) {
        @content;
    }
}

.grid {
    display: grid;
    gap: 1rem;

    @include respond-to(768px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

Переменные снаружи `@content` и область видимости — см. [документацию миксинов](https://sass-scss.ru/documentation/#%D0%9C%D0%B8%D0%BA%D1%81%D0%B8%D0%BD%D1%8B).

## Функции (@function)

Возвращают значение через `@return`:

```scss
@use 'sass:math';

@function rem($px, $base: 16px) {
    @return math.div($px, $base) * 1rem;
}

.title {
    font-size: rem(24px); // 1.5rem
}
```

Встроенные модули: `sass:math`, `sass:color`, `sass:string`, `sass:list`, `sass:map`, `sass:meta`.

Пользовательские функции в Sass описаны в разделе [Расширение Sass](https://sass-scss.ru/documentation/#%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-Sass).

## @extend и наследование

`@extend` подтягивает селектор к другому — в CSS они группируются:

```scss
%message-shared {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}

.message {
    @extend %message-shared;
}

.success {
    @extend %message-shared;
    border-color: green;
}

.error {
    @extend %message-shared;
    border-color: red;
}
```

→ `.message, .success, .error { … }`.

Рекомендации:

- предпочитайте `@extend` с **placeholder** (`%name`), а не с обычными классами;
- для параметризуемых кусков стилей лучше **миксин**;
- сложные цепочки `@extend` усложняют итоговый CSS.

Метка `!optional`, составные селекторы и вложение в директивы — в [документации @extend](https://sass-scss.ru/documentation/#%D0%94%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D0%B0-extend).

## Миксин vs @extend vs функция

| Инструмент | Когда |
|------------|-------|
| `@mixin` | Нужны аргументы или `@content` |
| `@extend` / `%` | Одинаковый статичный набор свойств |
| `@function` | Вычислить **значение** (размер, цвет), а не вставить блок CSS |

```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero {
    @include flex-center;
    min-height: 60vh;
}
```
