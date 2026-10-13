# 11. MongoDB

> Источники: [Metanit — Node.js и MongoDB](https://metanit.com/web/nodejs/) · [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/) · [Mongoose](https://mongoosejs.com/docs/guide.html)

MongoDB хранит документы: объекты вроде записей JSON, сгруппированные в коллекции. Коллекция не требует заранее описать все поля, но приложение всё равно должно знать, какие поля оно пишет. Иначе в одной коллекции оказываются пользователи и с `name`, и с `username`.

Сервер базы должен быть запущен. Локально это установленный MongoDB или контейнер:

```bash
docker run --name mongo -p 27017:27017 -d mongo
```

Адрес по умолчанию: `mongodb://127.0.0.1:27017`. Имя базы в примерах — `shop`. Его создавать вручную не нужно: оно появится с первой записью.

## Драйвер

```bash
npm install mongodb
```

```js
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();

const users = client.db('shop').collection('users');
```

Один `MongoClient` на процесс. На каждый запрос клиента не создают: соединение дорогое, пул уже внутри клиента.

Закрытие при остановке процесса:

```js
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});
```

### Запись и чтение

```js
const result = await users.insertOne({ name: 'Anna', email: 'anna@example.com' });
console.log(result.insertedId);

const one = await users.findOne({ email: 'anna@example.com' });
const list = await users.find({ name: 'Anna' }).toArray();
```

`find` возвращает курсор, не массив. `toArray()` забирает все подходящие документы в память. Для большой коллекции ограничивают выборку: `.limit(20)`.

`insertMany` принимает массив документов и пишет их одним вызовом.

### Обновление и удаление

```js
await users.updateOne(
    { email: 'anna@example.com' },
    { $set: { name: 'Anna K.' } },
);

await users.deleteOne({ email: 'anna@example.com' });
```

Фильтр — первый аргумент, он выбирает документ. Второй аргумент `updateOne` — что сделать. Без `$set` драйвер не «дописывает поле», операция будет отклонена или затрёт документ, в зависимости от режима. Новые поля передают внутри `$set`.

`updateMany` и `deleteMany` затрагивают все документы фильтра. Фильтр `{}` — это вся коллекция. Для удаления одного пользователя берут `deleteOne` и поле, которое точно одно (`_id` или уникальный email).

`_id` создаёт база, если вы его не передали. В URL его отдают строкой. Обратно в фильтр переводят так:

```js
import { ObjectId } from 'mongodb';

const user = await users.findOne({ _id: new ObjectId(id) });
```

Невалидная строка в `ObjectId` бросает ошибку. В маршруте это ответ 400, не 500.

## Mongoose

Mongoose — слой поверх драйвера: схема полей, приведение типов и привычные методы `find` / `create`. Драйвер ближе к командам базы. Mongoose удобен, когда у документа стабильная форма.

```bash
npm install mongoose
```

```js
import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/shop');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export const User = mongoose.model('User', userSchema);
```

Модель `'User'` пишет в коллекцию `users`: имя приводится к нижнему регистру и к множественному числу.

| Поле схемы | Эффект |
|------------|--------|
| `type` | Приведение: число в схеме не останется строкой из формы |
| `required` | Пустое значение — ошибка валидации до записи |
| `unique` | В коллекции строится уникальный индекс |

`unique` не заменяет проверку в интерфейсе. Повторный email придёт как ошибка записи, её превращают в ответ 409.

### CRUD

```js
const user = await User.create({ name: 'Anna', email: 'anna@example.com' });

const list = await User.find({ name: 'Anna' });
const one = await User.findById(user.id);

const updated = await User.findByIdAndUpdate(
    user.id,
    { name: 'Anna K.' },
    { new: true, runValidators: true },
);

await User.findByIdAndDelete(user.id);
```

`{ new: true }` возвращает документ после изменения, не до. `runValidators: true` гоняет схему и на `update`: без этого флага `required` при обновлении молчит.

`user.id` — строка. `user._id` — тот же идентификатор объектом. В JSON наружу кладут `id`.

Ошибка валидации — это `error.name === 'ValidationError'`. Маршрут отвечает 400 и списком полей, а не 500.

## Express и Mongoose

Соединение открывают до `listen`. Маршрут работает с моделью, не с `MongoClient`.

```js
import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user.js';

await mongoose.connect('mongodb://127.0.0.1:27017/shop');

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/api/users', async (req, res) => {
    const list = await User.find();
    res.json(list);
});

app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body?.name,
            email: req.body?.email,
        });
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Проверьте поля' });
            return;
        }
        throw error;
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
});

app.listen(3000);
```

В Express 5 ошибка из `async`, которую вы пробросили через `throw`, доходит до error middleware сама. `ValidationError` здесь перехвачена отдельно, чтобы клиент получил 400.

Пароль в схему пользователя не кладут открытым текстом. Для пароля хранят хеш (пакет вроде bcrypt). В ответ модели пароль не включают: у поля в схеме ставят `select: false`.

Как разнести модель, маршрут и шаблон по файлам — [MVC](mvc.md). Тот же API на MySQL — [следующая глава](mysql.md).

## Дальше

[12. MySQL и Sequelize](mysql.md).
