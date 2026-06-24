# HTML

> Руководства: [metanit.com — HTML5](https://metanit.com/web/html5/) · [W3Schools — HTML](https://www.w3schools.com/html/default.asp) · [htmlbook.ru](https://htmlbook.ru/)  
> Справочник: [MDN HTML](https://developer.mozilla.org/ru/docs/Web/HTML)

HTML (HyperText Markup Language) — язык разметки для создания веб-страниц. Описывает **структуру** и **смысл** контента; внешний вид задаётся CSS, поведение — JavaScript.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Что такое HTML, элементы, атрибуты, структура документа |
| [2. Элементы](elements.md) | Заголовки, текст, списки, таблицы, ссылки, изображения |
| [3. Формы](forms.md) | Поля ввода, кнопки, select, textarea, валидация |
| [4. Семантика](semantics.md) | article, section, nav, header, footer, main, aside |
| [5. Мультимедиа](media.md) | Видео, аудио, picture, iframe |

## Минимальный документ

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это абзац текста.</p>
</body>
</html>
```

## HTML в Laravel

Blade-шаблоны генерируют HTML. Пример `resources/views/welcome.blade.php`:

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <main>
        <h1>{{ $title }}</h1>
    </main>
</body>
</html>
```

Подробнее: [Frontend в Laravel](../../Backend/laravel/frontend.md).

## Полезные ссылки

| Ресурс | Описание |
|--------|----------|
| [MDN HTML](https://developer.mozilla.org/ru/docs/Web/HTML) | Авторитетный справочник |
| [validator.w3.org](https://validator.w3.org/) | Проверка валидности разметки |
| [Can I Use](https://caniuse.com/) | Поддержка элементов браузерами |
| [htmlbook.ru — справочник тегов](https://htmlbook.ru/html) | Справочник на русском |
