# CSS

> Руководства: [MDN CSS](https://developer.mozilla.org/ru/docs/Web/CSS) · [webref.ru — CSS](https://webref.ru/css)  
> Справочник свойств: [MDN CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)  
> Препроцессор: [Sass / SCSS](https://sass-scss.ru/documentation/)

CSS (Cascading Style Sheets) — язык стилей для оформления HTML. Описывает **внешний вид**: цвета, размеры, раскладку, анимации. Структура страницы — HTML, поведение — JavaScript.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Подключение, синтаксис, каскад, специфичность |
| [2. Селекторы](selectors.md) | Типы, классы, псевдоклассы, комбинаторы |
| [3. Блочная модель](box-model.md) | content, padding, border, margin, box-sizing |
| [4. Свойства](properties.md) | Справочник основных свойств по группам (MDN) |
| [5. Раскладка](layout.md) | Flexbox, Grid, позиционирование |
| [6. Адаптивность](responsive.md) | Единицы, media queries, контейнеры |
| [7. Анимации](animations.md) | transition, animation, transform |
| [SCSS / Sass](scss/README.md) | Переменные, вложенность, миксины, директивы |

## Минимальный пример

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <title>CSS</title>
</head>
<body>
    <div class="container">
        <h1>Заголовок</h1>
    </div>
</body>
</html>
```

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

h1 {
    color: #1a1a1a;
    font-size: 2rem;
}
```

## CSS в Laravel

Стили обычно живут в `resources/css/app.css` и подключаются через Vite:

```html
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

Для SCSS: `resources/css/app.scss` — Vite компилирует автоматически.

Подробнее: [Frontend в Laravel](../../Backend/laravel/frontend.md).

## Фреймворки

| Фреймворк | Описание |
|-----------|----------|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first |
| [Bootstrap](https://getbootstrap.com/) | Компонентный |
| [Bulma](https://bulma.io/) | Чистый CSS |

## Полезные ссылки

| Ресурс | Описание |
|--------|----------|
| [MDN CSS](https://developer.mozilla.org/ru/docs/Web/CSS) | Авторитетный справочник |
| [MDN Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties) | Алфавитный список свойств |
| [Can I Use](https://caniuse.com/) | Поддержка браузерами |
| [sass-scss.ru](https://sass-scss.ru/documentation/) | Документация Sass на русском |
| [css-tricks.com](https://css-tricks.com/) | Гайды и шпаргалки |
