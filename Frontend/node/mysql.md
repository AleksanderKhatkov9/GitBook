# 12. MySQL и Sequelize

> Источники: [Metanit — MySQL и Sequelize](https://metanit.com/web/nodejs/) · [mysql2](https://sidorares.github.io/node-mysql2/docs) · [Sequelize](https://sequelize.org/docs/v6/)  
> Сам язык SQL: [MySQL](../../mysql/README.md)

Из Node.js к MySQL ходят двумя способами. `mysql2` отправляет SQL, который вы написали. Sequelize описывает таблицы моделями и собирает SQL сам. Запросы `SELECT`, индексы и устройство базы — в разделе MySQL этой книги. Здесь только вызов из приложения.

База `shop` и пользователь уже существуют. Пароль берётся из окружения, не из файла, который коммитят:

```bash
# PowerShell
$env:DB_PASSWORD = "secret"
```

## mysql2

```bash
npm install mysql2
```

Пул держит несколько соединений и выдаёт их запросам. Один `createConnection` на весь сервер встанет в очередь, пул на каждый запрос будет открывать соединение заново.

```js
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'app',
    password: process.env.DB_PASSWORD,
    database: 'shop',
    waitForConnections: true,
    connectionLimit: 10,
});
```

`connectionLimit` — сколько соединений можно занять одновременно. Для одного локального приложения десятка хватает.

### Запросы

```js
const [rows] = await pool.execute(
    'SELECT id, name FROM users WHERE id = ?',
    [id],
);

await pool.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
);

await pool.execute(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id],
);

await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [id],
);
```

`execute` возвращает пару: для `SELECT` первый элемент — массив строк, второй — служебные поля. Для `INSERT` в первом элементе лежит `insertId`.

Знак `?` — место значения. Драйвер подставляет его отдельно от текста SQL. Склеивать запрос со строкой из `req.query` или `req.body` нельзя: так в запрос попадает чужой SQL.

В ответ и в лог попадает список колонок, которые вы перечислили, а не `SELECT *`, если в таблице есть хеш пароля.

### Express

```js
import express from 'express';
import { pool } from './db.js';

const app = express();

app.get('/api/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Неверный id' });
        return;
    }

    const [rows] = await pool.execute(
        'SELECT id, name FROM users WHERE id = ?',
        [id],
    );

    const user = rows[0];
    if (!user) {
        res.status(404).json({ message: 'Не найден' });
        return;
    }
    res.json(user);
});
```

Пустая выборка — это не исключение, а пустой массив. 404 ставите вы.

Ошибку соединения ловит error middleware из [главы про API](api.md). Клиенту не отдают текст MySQL: в нём бывают имена таблиц.

## Sequelize

Sequelize описывает таблицу объектом. Связи и запросы идут через модели. SQL всё равно полезно читать: в логе видно, что библиотека отправила в базу.

```bash
npm install sequelize mysql2
```

`mysql2` остаётся драйвером. Sequelize его использует, сам по сети не ходит.

```js
import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(
    'shop',
    'app',
    process.env.DB_PASSWORD,
    {
        host: '127.0.0.1',
        dialect: 'mysql',
    },
);

export const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
});
```

Модель `User` сопоставляется таблице `Users`, если не задать другое имя. Поля `id`, `createdAt` и `updatedAt` Sequelize добавляет сам.

Проверка при старте:

```js
await sequelize.authenticate();
```

`authenticate` только открывает соединение. `sync()` создаёт недостающие таблицы по моделям — удобно в упражнении. В рабочем проекте таблицы меняют миграциями: `sync({ force: true })` удаляет таблицы вместе с данными, в примерах его нет.

### Запросы модели

```js
const user = await User.create({ name: 'Anna', email: 'anna@example.com' });

const list = await User.findAll({ where: { name: 'Anna' } });
const one = await User.findByPk(user.id);

await one.update({ name: 'Anna K.' });
await one.destroy();
```

`findByPk` ищет по первичному ключу. `null` означает «строки нет» — это 404 в маршруте, как с пустым массивом у `mysql2`.

Маршрут Express вызывает модель так же, как Mongoose в [прошлой главе](mongodb.md): `await` в обработчике, статус отдельно от результата.

### Один ко многим

Пользователь и его заказы:

```js
export const Order = sequelize.define('Order', {
    total: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
```

Обе стороны описывают одну и ту же связь. `foreignKey` — колонка в таблице заказов.

```js
const orders = await Order.findAll({
    where: { userId: user.id },
    include: User,
});
```

`include` добавляет JOIN и кладёт связанного пользователя в результат. Без ограничения это тянет лишние колонки. В API перечисляют атрибуты: `attributes: ['id', 'total']`.

### Один к одному

Профиль, который либо есть у пользователя, либо нет:

```js
export const Profile = sequelize.define('Profile', {
    bio: DataTypes.STRING,
});

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });
```

Колонка `userId` в `Profiles` уникальна по смыслу: второй профиль тому же пользователю не создают. Это стоит закрепить уникальным индексом в базе, не только договорённостью в коде.

### Многие ко многим

Пользователь и роли, промежуточная таблица:

```js
export const Role = sequelize.define('Role', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });
```

`through` — имя связующей таблицы. Sequelize создаст в ней два внешних ключа. Строка пользователя и строка роли живут отдельно, связь между ними — третья строка.

```js
await user.addRole(role);
const withRoles = await User.findByPk(user.id, { include: Role });
```

## Что выбрать

`mysql2` — когда запрос уже написан и важен точный SQL. Sequelize — когда основные действия это создать, найти и связать модели, а SQL вы готовы проверять по логу. Оба варианта Parametrized: значения не конкатенируют в строку запроса.

Схема «маршрут → модель → таблица» без шаблона — уже API. С шаблоном страницы это [MVC](mvc.md).

## Дальше

[13. MVC](mvc.md) — разложить маршрут, модель и страницу по файлам.
