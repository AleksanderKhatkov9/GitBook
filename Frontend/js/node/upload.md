# 14. Загрузка файлов

> Источники: [Metanit — загрузка файлов](https://metanit.com/web/nodejs/) · [multer](https://github.com/expressjs/multer)

Обычный `express.urlencoded` файл не разбирает. Форма с файлом приходит как `multipart/form-data`. Её читает multer и кладёт файл на диск или в память, а остальные поля — в `req.body`.

```bash
npm install multer
```

Каталог для файлов создайте сами, multer не всегда создаёт его за вас: папка `uploads/` в корне проекта.

## Один файл

```js
import express from 'express';
import multer from 'multer';
import { join, extname } from 'node:path';

const app = express();
const uploadDir = join(import.meta.dirname, 'uploads');

const allowedExt = new Set(['.png', '.jpg', '.jpeg']);

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const ext = extname(file.originalname).toLowerCase();
        if (!allowedExt.has(ext)) {
            cb(new Error('Нужен файл PNG или JPEG'));
            return;
        }
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
            return;
        }
        cb(new Error('Нужен файл PNG или JPEG'));
    },
});

app.get('/avatar', (req, res) => {
    res.type('html').send(`
        <form method="post" action="/avatar" enctype="multipart/form-data">
            <input type="file" name="avatar" accept="image/png,image/jpeg">
            <button>Загрузить</button>
        </form>
    `);
});

app.post('/avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        res.status(400).type('txt').send('Файл не передан');
        return;
    }
    res.json({ file: req.file.filename });
});

app.use('/uploads', express.static(uploadDir));

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ message: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
});

app.listen(3000);
```

`enctype="multipart/form-data"` обязателен. Без него браузер отправит имя файла текстом, а `req.file` будет пустым.

`upload.single('avatar')` — имя поля совпадает с `name="avatar"`. Файл попадает в `req.file`. Несколько файлов одного поля: `upload.array('photos', 5)`, результат в `req.files`. Лимит `5` — максимум файлов за запрос.

| Поле `req.file` | Что внутри |
|-----------------|------------|
| `filename` | Имя, которое задал `filename` |
| `path` | Путь на диске |
| `size` | Размер в байтах |
| `mimetype` | Тип, который прислал клиент |
| `originalname` | Имя с компьютера пользователя |

## Настройки, которые имеют значение

Имя с компьютера пользователя не используют как имя на диске. В `originalname` бывают `../` и неожиданные расширения. Имя собирают сами: время, случайное число и расширение из короткого списка.

`fileFilter` смотрит на заявленный MIME-тип. Его присылает клиент, поэтому его мало: расширение проверяют ещё раз в `filename`. Для чужих файлов этого всё равно недостаточно, чтобы считать содержимое картинкой. Не отдавайте загруженное в каталог, откуда Node.js запускает код, и не подключайте такие файлы как шаблоны.

`limits.fileSize` обрывает слишком большой запрос. Без лимита диск забивается одним POST. Ошибка лимита приходит в error middleware: у multer смотрите `err.code === 'LIMIT_FILE_SIZE'`, если хотите отдельный текст «файл больше 2 МБ».

`express.static` на `/uploads` отдаёт файл по адресу `/uploads/имя`. Каталог при этом не является корнем сайта, и листинг папки Express не показывает.

Папку `uploads/` не коммитят. Её пишут в `.gitignore`. На сервере у процесса должны быть права на запись именно в этот каталог.

Память вместо диска — `multer.memoryStorage()`. Файл окажется в `req.file.buffer`. Так делают перед отправкой в объектное хранилище. Для упражнения с локальным диском хватает `diskStorage`.

Контроллер из [MVC](mvc.md) получает уже готовый `req.file`. Разбор multipart в модели не повторяют: модели нужен путь или идентификатор файла, который контроллер сохранит рядом с пользователем.

## Дальше

Запуск этого сервера в фоне на VPS — [PM2](../../pm2/README.md). Общий указатель глав — [обзор Node.js](README.md).
