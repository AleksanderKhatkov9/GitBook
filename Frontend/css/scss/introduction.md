# 1. Введение в Sass / SCSS

> Источники: [Преимущества Sass](https://sass-scss.ru/documentation/) · [Основы Sass](https://sass-scss.ru/guide/) · [sass-lang.com](https://sass-lang.com/guide)

## Зачем нужен препроцессор

Чистый CSS удобен на маленьких страницах. В большом проекте не хватает:

- переменных для цветов и отступов;
- вложенности селекторов по HTML-иерархии;
- переиспользуемых блоков стилей (миксины);
- модульности без лишних HTTP-запросов.

Sass добавляет эти возможности и на выходе даёт обычный CSS, понятный любому браузеру.

## Преимущества (по документации Sass)

- **Полная совместимость с CSS** — любой валидный CSS является валидным SCSS.
- **Богатая функциональность** — переменные, миксины, функции, циклы, модули.
- **Зрелость и поддержка** — стандарт де-факто среди препроцессоров.
- **Экосистема** — библиотеки и фреймворки на базе Sass.

Подробнее: [sass-scss.ru — преимущества](https://sass-scss.ru/documentation/).

## Установка и компиляция

```bash
npm install -D sass
```

Одноразовая компиляция:

```bash
npx sass input.scss output.css
```

Следить за изменениями:

```bash
npx sass --watch input.scss:output.css
npx sass --watch app/sass:public/css
```

В Vite / Laravel достаточно импортировать `.scss` — сборщик вызовет Sass сам.

## Выбор синтаксиса

```scss
/* SCSS — рекомендуется */
$color: #333;
.box {
    color: $color;
}
```

```sass
/* Indented Sass */
$color: #333
.box
  color: $color
```

Директива/настройка синтаксиса описана в разделе [Использование Sass](https://sass-scss.ru/documentation/#%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-Sass) на sass-scss.ru.

## Стили выходного файла

| Стиль | Описание |
|-------|----------|
| `expanded` | Читаемый CSS (удобно в разработке) |
| `compressed` | Минифицированный (для продакшена) |

```bash
npx sass --style=compressed input.scss output.css
```

В современных сборщиках минификацией часто занимается PostCSS / esbuild, а не Sass.

## Структура проекта (пример)

```
resources/css/
├── app.scss              ← точка входа
├── _variables.scss       ← фрагмент (partial)
├── _mixins.scss
└── components/
    ├── _button.scss
    └── _card.scss
```

Файлы с `_` в начале — **фрагменты**: сами в CSS не компилируются, подключаются через `@use` / `@import`.

Далее: [2. Переменные и типы](variables.md).
