# 4. Файлы

> Источники: [Metanit — работа с файлами](https://metanit.com/web/nodejs/) · [File system](https://nodejs.org/docs/latest/api/fs.html) · [Path](https://nodejs.org/docs/latest/api/path.html)

Модуль `node:fs` читает и пишет файлы на диске. В сервере и в обычных скриптах берут промисы из `node:fs/promises`: код пишется с `await`, поток запросов не блокируется.

Примеры рассчитаны на `"type": "module"` из [главы про npm](npm.md).

## Пути

Строки `'data/note.txt'` зависят от того, откуда запустили `node`. Собирайте путь от файла или от известного корня:

```js
import { join } from 'node:path';

const notePath = join(import.meta.dirname, 'data', 'note.txt');
```

| Функция | Результат |
|---------|-----------|
| `join(a, b)` | Склеивает сегменты, убирает лишние `..` |
| `resolve(a)` | Абсолютный путь от текущей рабочей директории |
| `basename(p)` | Имя файла |
| `extname(p)` | Расширение, включая точку: `.txt` |
| `dirname(p)` | Каталог |

`join` на Windows ставит `\`. Функции `node:fs` принимают и прямые, и обратные слэши. В URL и в веб-путях по-прежнему только `/`.

## Чтение и запись

```js
import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(import.meta.dirname, 'data');
const file = join(dir, 'note.txt');

await mkdir(dir, { recursive: true });
await writeFile(file, 'Первая строка\n', 'utf8');
await appendFile(file, 'Вторая строка\n', 'utf8');

const text = await readFile(file, 'utf8');
console.log(text);
```

`recursive: true` создаёт промежуточные каталоги и не падает, если каталог уже есть.

Без кодировки `readFile` возвращает `Buffer` — байты, не строку. Так читают картинки и архивы. Для текста передавайте `'utf8'`, иначе кириллица останется байтами.

`writeFile` затирает файл. `appendFile` дописывает в конец и создаёт файл, если его не было.

## Каталог, удаление, проверка

```js
import { readdir, rm, access } from 'node:fs/promises';

const names = await readdir(dir);
console.log(names);

try {
    await access(file);
    console.log('файл есть');
} catch {
    console.log('файла нет');
}

await rm(file);
```

`access` не заменяет `try/catch` вокруг `readFile`: между проверкой и чтением файл могут удалить. Для «прочитать, а если нет — сделать иначе» ловят ошибку чтения и смотрят `error.code === 'ENOENT'`.

`rm(dir, { recursive: true })` удаляет каталог вместе с содержимым. На чужой путь его не направляют: путь собирают сами, а не из строки запроса пользователя.

## Синхронные функции

У каждой операции есть пара с суффиксом `Sync`: `readFileSync`, `writeFileSync`. Она не возвращает Promise и держит поток, пока диск не ответит.

Их можно вызвать один раз при старте скрипта, до `listen`. В обработчике HTTP-запроса синхронное чтение останавливает остальные запросы. Там — `node:fs/promises` или поток из [следующей главы](streams.md).

## Ошибки

Отказ диска и отсутствие файла — обычные ответы, не «поломка Node.js». `await` бросает исключение, его ловят `try/catch`:

```js
try {
    const text = await readFile(file, 'utf8');
    console.log(text);
} catch (error) {
    console.error(error.code, error.message);
}
```

`error.code` — код ОС (`ENOENT`, `EACCES`), по нему решают, что ответить клиенту. Текст `error.message` пользователю API не отдают: в нём бывает путь на диске.

## Дальше

[5. События и потоки](streams.md) — когда файл не читают целиком в память.
