# 8. Шаблоны

> Источники: [Metanit — представления Express](https://metanit.com/web/nodejs/) · [Express — Template engines](https://expressjs.com/en/guide/using-template-engines.html)

Шаблон — HTML с метками. Движок подставляет данные и экранирует текст, чтобы имя пользователя не стало тегом. Это следующий шаг после `replaceAll` из [главы про HTTP](http.md).

В одном приложении выбирают один движок. Три популярных у Express:

| Движок | Файлы | Чем отличается |
|--------|-------|----------------|
| Handlebars | `.handlebars` | HTML остаётся HTML, логика в шаблоне слабая |
| EJS | `.ejs` | Обычный HTML и вставки JavaScript |
| Pug | `.pug` | Отступы вместо тегов |

Страницы кладут в каталог `views/`. Ответ: `res.render('имя', данные)`.

## Handlebars

```bash
npm install express-handlebars
```

```js
import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'node:path';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(import.meta.dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Магазин',
        user: { name: 'Anna' },
    });
});
```

`views/home.handlebars`:

```html
<h1>{{title}}</h1>
<p>{{user.name}}</p>

{{#if user}}
    <p>Вы вошли</p>
{{else}}
    <p>Войдите</p>
{{/if}}

<ul>
    {{#each products}}
        <li>{{this.name}}</li>
    {{/each}}
</ul>
```

`{{title}}` вставляет текст и экранирует `<` и `&`. Тройные скобки `{{{html}}}` вставляют разметку как есть — только для строки, которую собрали вы, не из формы.

### Layout

Общая оболочка сайта — `views/layouts/main.handlebars`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

`{{{body}}}` — место, куда попадает уже собранная страница. Это разметка движка, не ввод пользователя. Express-handlebars берёт `main` как layout по умолчанию. Другой файл: `res.render('home', { layout: 'admin' })`. Отключить оболочку: `{ layout: false }`.

### Частичные шаблоны

Повторяющийся кусок кладут в `views/partials/`.

`views/partials/nav.handlebars`:

```html
<nav><a href="/">Главная</a></nav>
```

В странице:

```html
{{> nav}}
<h1>{{title}}</h1>
```

Имя файла без расширения и есть имя шаблона.

### Хелперы

Свою функцию вызывают из шаблона, если её передали в `engine`:

```js
app.engine('handlebars', engine({
    helpers: {
        upper(text) {
            return String(text ?? '').toUpperCase();
        },
    },
}));
```

```html
<p>{{upper user.name}}</p>
```

Хелпер возвращает строку. Туда не прячут запросы к базе: шаблон получает уже готовые данные из маршрута.

## EJS

```bash
npm install ejs
```

```js
app.set('view engine', 'ejs');
app.set('views', join(import.meta.dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Магазин', users: [{ name: 'Anna' }] });
});
```

`views/home.ejs`:

```html
<h1><%= title %></h1>
<ul>
<% users.forEach(function (user) { %>
    <li><%= user.name %></li>
<% }); %>
</ul>
```

| Вставка | Эффект |
|---------|--------|
| `<%= значение %>` | Текст, символы экранируются |
| `<%- значение %>` | HTML без экранирования |
| `<% код %>` | JavaScript без вывода: цикл, условие |

Общая оболочка через пакет не включена. Повторяющийся кусок подключают `<%- include('nav') %>`, файл `views/nav.ejs`. Layout делают include шапки и подвала либо отдельным пакетом. Для оболочки «из коробки» проще Handlebars.

## Pug

```bash
npm install pug
```

```js
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('home', { title: 'Магазин', users: [{ name: 'Anna' }] });
});
```

`views/home.pug`:

```pug
doctype html
html(lang="ru")
  head
    meta(charset="UTF-8")
    title= title
  body
    h1= title
    ul
      each user in users
        li= user.name
```

Вложенность задают отступы, пробелы, не табы вперемешку. `h1= title` экранирует текст. `h1!= title` вставляет HTML.

Общий каркас — `views/layout.pug`:

```pug
doctype html
html
  body
    block content
```

Страница:

```pug
extends layout

block content
  h1= title
```

Кусок без наследования: `include nav`.

## Где какую работу делать

Маршрут достаёт данные и вызывает `res.render`. Шаблон только показывает. Запрос к базе и `if` про права доступа в `.handlebars` не пишут: их не увидеть в тесте маршрута.

Как разложить файлы на контроллер, модель и шаблон — [глава про MVC](mvc.md).

## Дальше

[9. API](api.md) — те же маршруты, но ответ JSON, без `res.render`.
