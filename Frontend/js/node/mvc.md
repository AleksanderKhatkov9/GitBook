# 13. MVC

> Источники: [Metanit — паттерн MVC](https://metanit.com/web/nodejs/) · [Express routing](https://expressjs.com/en/guide/routing.html)

MVC делит приложение на три роли, чтобы SQL и HTML не жили в одном файле на сотни строк.

| Часть | Делает | Не делает |
|-------|--------|-----------|
| Модель | Читает и пишет данные | Не знает про `req` и HTML |
| Представление | Показывает данные | Не ходит в базу |
| Контроллер | Принимает запрос, зовёт модель, выбирает ответ | Не содержит SQL и разметку |

Express не навязывает эти папки. Их заводят сами. Тот же приём, что [Router](express.md) и [шаблоны](views.md), только с явной границей.

Ниже пользователи лежат в MongoDB через Mongoose, как в [главе 11](mongodb.md). Модель на Sequelize выглядит так же снаружи: у контроллера функции `find` и `create`, а не конкретная база.

## Каталоги

```text
app.js
models/
  user.js
controllers/
  userController.js
views/
  layouts/
    main.handlebars
  users.handlebars
  user-form.handlebars
```

`app.js` подключает middleware, движок шаблонов и маршруты. Больше в нём ничего не накапливают.

## Модель

`models/user.js` — схема и экспорт модели из главы про Mongoose:

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export const User = mongoose.model('User', userSchema);
```

Функции вокруг модели имеют смысл, когда правило сложнее одного `find`. Например, «создать пользователя и не вернуть лишние поля» живёт рядом с моделью, а не в контроллере. Пока правило — это один вызов Mongoose, контроллер может звать `User.find()` сам.

## Контроллер

`controllers/userController.js`:

```js
import { User } from '../models/user.js';

export async function index(req, res) {
    const users = await User.find();
    res.render('users', { title: 'Пользователи', users });
}

export async function create(req, res) {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';

    if (!name || !email) {
        res.status(400).render('user-form', {
            title: 'Новый',
            error: 'Заполните имя и email',
            name,
            email,
        });
        return;
    }

    await User.create({ name, email });
    res.redirect(303, '/users');
}
```

Контроллер переводит HTTP в вызов модели и вызов модели в ответ. Проверка «поле пустое» — про запрос, она остаётся здесь. Правило «email уникален в коллекции» выполняет база; повтор приходит исключением, его ловят и снова показывают форму, а не стек.

Для API тот же контроллер заканчивается на `res.json` вместо `res.render`. Модель не меняется. Поэтому модель не импортирует Express.

## Представление

`views/users.handlebars`:

```html
<h1>{{title}}</h1>
<ul>
    {{#each users}}
        <li>{{this.name}} — {{this.email}}</li>
    {{/each}}
</ul>
<a href="/users/new">Добавить</a>
```

`views/user-form.handlebars`:

```html
<h1>{{title}}</h1>
{{#if error}}
    <p>{{error}}</p>
{{/if}}
<form method="post" action="/users">
    <input name="name" value="{{name}}">
    <input name="email" value="{{email}}">
    <button>Сохранить</button>
</form>
```

`{{this.email}}` экранируется. В шаблон не приходит объект с хешем пароля: контроллер передаёт только поля списка.

## Сборка в app.js

```js
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { join } from 'node:path';
import { index, create } from './controllers/userController.js';

await mongoose.connect('mongodb://127.0.0.1:27017/shop');

const app = express();
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(import.meta.dirname, 'views'));

app.get('/users', index);
app.get('/users/new', (req, res) => {
    res.render('user-form', { title: 'Новый', name: '', email: '' });
});
app.post('/users', create);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).type('txt').send('Ошибка сервера');
});

app.listen(3000);
```

Маршрут формы `/users/new` объявлен отдельно от `/:id`, хотя параметра здесь ещё нет: когда появится страница одного пользователя, слово `new` не должно стать id. Это тот же порядок, что в [Express](express.md).

Тонкая обёртка `GET /users/new` может переехать в контроллер, когда в ней появится решение. Пока она только открывает пустую форму, отдельная функция ничего не прячет.

## Где проходит граница

Если в `users.handlebars` появился запрос к MongoDB — представление взяло чужую работу. Если в `user.js` появился `res.render` — модель узнала про HTTP и её не вызвать из скрипта без сервера. Если в `app.js` снова вырос разбор полей формы — это код контроллера, его возвращают в `userController.js`.

Загрузка файла — отдельный middleware перед контроллером, не метод модели. Это [следующая глава](upload.md).

## Дальше

[14. Загрузка файлов](upload.md).
