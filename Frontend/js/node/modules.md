# 2. Модули и процесс

> Источники: [Metanit — глава 2](https://metanit.com/web/nodejs/) · [CommonJS](https://nodejs.org/docs/latest/api/modules.html) · [ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html) · [Globals](https://nodejs.org/docs/latest/api/globals.html) · [Process](https://nodejs.org/docs/latest/api/process.html)

Файл в Node.js — модуль. У него своя область видимости: переменная из `user.js` не видна в `app.js`, пока её не экспортировали. Так же устроены [ES-модули в браузере](../introduction/modules-storage.md), но загрузчик другой.

В Node.js два формата. Новые примеры в этом разделе — ESM.

| | CommonJS | ES modules |
|--|----------|------------|
| Синтаксис | `require`, `module.exports` | `import`, `export` |
| Как включить | Файл `.cjs` или `package.json` без `"type": "module"` | `"type": "module"` или файл `.mjs` |
| Загрузка | Синхронная | Статическая, `import` в начале модуля |
| Имя файла и каталога | `__filename`, `__dirname` | `import.meta.filename`, `import.meta.dirname` |

Префикс `node:` — встроенный модуль, не пакет из npm:

```js
import { readFile } from 'node:fs/promises';
```

Так имя не пересекается с пакетом, который кто-то мог назвать `fs`.

## CommonJS

`user.js`:

```js
function getUser() {
    return { name: 'Anna' };
}

module.exports = { getUser };
```

`app.js` в том же каталоге:

```js
const { getUser } = require('./user');

console.log(getUser().name);
```

Путь к своему файлу начинается с `./` или `../`. Без точки Node.js ищет пакет в `node_modules`.

`exports.имя = ...` — короткая форма добавления поля. Не присваивайте `exports = ...` целиком: оборвётся связь с `module.exports`.

## ES-модули

В `package.json` проекта:

```json
{
  "type": "module"
}
```

`user.js`:

```js
export function getUser() {
    return { name: 'Anna' };
}
```

`app.js`:

```js
import { getUser } from './user.js';

console.log(getUser().name);
```

В ESM расширение `.js` в относительном импорте пишут явно. Импорт пакета остаётся без пути и без расширения: `import express from 'express'`.

Верхний уровень `await` в ES-модуле разрешён. Файл подождёт Promise и только потом отдаст свои экспорты тем, кто его импортирует.

Один проект не смешивает форматы наугад. Чужой пакет на CommonJS из ESM импортируется: у него обычно есть `default`. Если пакет старый и без `export`, смотрите его документацию — иногда нужен `createRequire` из `node:module`.

## Каталог текущего файла

В CommonJS это `__dirname`. В ESM на Node.js 22+:

```js
import { join } from 'node:path';

const file = join(import.meta.dirname, 'data', 'note.txt');
```

`import.meta.dirname` есть с Node.js 20.11. На более старой версии каталог получают так:

```js
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
```

`process.cwd()` — каталог, из которого вызвали `node`, а не каталог файла. Они совпадают только если запускать скрипт из его папки.

## global и globalThis

Имена вроде `console`, `process`, `Buffer` и `setTimeout` доступны без импорта — они лежат в глобальном объекте.

| Среда | Глобальный объект |
|-------|-------------------|
| Браузер | `window`, также `globalThis` |
| Node.js | `global`, также `globalThis` |

Новый код опирается на `globalThis`: одно имя и в браузере, и в Node.js.

Свои значения на `global` не вешают. Общее состояние передают аргументом или импортом, иначе его не видно в тесте и легко затереть из другого файла.

В браузере нет `process`, `__dirname` и `Buffer`. В Node.js нет `document` и `window`.

## Аргументы командной строки

```bash
node app.js --port 3000
```

```js
console.log(process.argv);
```

Массив начинается не с ваших флагов:

| Индекс | Содержимое |
|--------|------------|
| 0 | Путь к исполняемому файлу `node` |
| 1 | Путь к скрипту |
| 2… | Всё, что написали после имени файла |

```js
const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const port = portFlag === -1 ? 3000 : Number(args[portFlag + 1]);
```

Для настоящих CLI берут пакет разбора аргументов. `process.argv` хватает, чтобы передать порт или путь.

## Переменные окружения

Секреты и адреса не пишут в код. Их кладут в окружение процесса:

```bash
# PowerShell
$env:PORT = "3000"
node app.js
```

```bash
# bash
PORT=3000 node app.js
```

```js
const port = Number(process.env.PORT) || 3000;
```

`process.env` — объект строк. Число из него получают через `Number`. Пустая переменная и отсутствие переменной для `||` оба дают значение по умолчанию; если `0` — осмысленный порт, проверяйте явно.

Завершить процесс с кодом ошибки:

```js
if (!process.env.PORT) {
    console.error('Задайте PORT');
    process.exit(1);
}
```

Ненулевой код — сигнал для shell и CI, что запуск не удался. В сервере так выходят при старте, если нет обязательной настройки. Обычную ошибку запроса так не обрабатывают: процесс должен жить дальше.

## TypeScript

Node.js умеет запускать TypeScript, стирая типы (раздел [Modules: TypeScript](https://nodejs.org/docs/latest/api/typescript.html) в справочнике). Это не проверка типов: ошибки типов по-прежнему ищет `tsc` или редактор. В этом разделе примеры на JavaScript.

## Дальше

[3. npm](npm.md) — зависимости, скрипты и перезапуск при сохранении файла.
