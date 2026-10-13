# Node.js

> Руководство: [Metanit — Node.js](https://metanit.com/web/nodejs/)  
> Справочник: [About this documentation](https://nodejs.org/docs/latest/api/documentation.html) · [nodejs.org](https://nodejs.org/)

Node.js — среда выполнения JavaScript вне браузера. На ней работают HTTP-серверы, CLI, сборщики и [Next.js](../js/next/README.md). Язык тот же, что в [разделе JavaScript](../js/README.md): другой набор встроенных модулей и нет DOM.

На сервере процесс обычно держит [PM2](../pm2/README.md), снаружи — [Nginx](../../devops/nginx/README.md).

## Справочник раздела

| Глава | Описание | В руководстве Metanit |
|-------|----------|------------------------|
| [1. Введение](introduction.md) | Что такое Node.js, установка, первое приложение, как читать API | Глава 1 |
| [2. Модули и процесс](modules.md) | CommonJS, ESM, `global`, `process` | Глава 2, модули и параметры |
| [3. npm](npm.md) | `package.json`, зависимости, `node --watch`, nodemon | npm, package.json, Nodemon |
| [4. Файлы](fs.md) | `node:fs`, пути | Работа с файлами |
| [5. События и потоки](streams.md) | `EventEmitter`, stream, `pipeline` | События, Stream, Pipe |
| [6. HTTP-сервер](http.md) | `node:http`, файлы, формы | Глава 3 |
| [7. Express](express.md) | Middleware, маршруты, статика, формы | Глава 4 |
| [8. Шаблоны](views.md) | Handlebars, EJS, Pug | Представления |
| [9. API](api.md) | JSON, REST, ошибки | Создание API, JSON и AJAX |
| [10. Тестирование](testing.md) | `node:test`, Mocha | Глава 5 |
| [11. MongoDB](mongodb.md) | Драйвер и Mongoose | Глава 6 |
| [12. MySQL и Sequelize](mysql.md) | `mysql2`, модели, связи | MySQL и Sequelize |
| [13. MVC](mvc.md) | Контроллер, модель, представление | Паттерн MVC |
| [14. Загрузка файлов](upload.md) | multer | Глава 10 |

Примеры дальше — ES-модули: в `package.json` стоит `"type": "module"`.

## Требования

- [Node.js](https://nodejs.org/) **LTS** (ветки 22 или 24)
- npm ставится вместе с Node.js

```bash
node -v
npm -v
```

Ветка Current (26.x) получает API раньше. Для проекта берите LTS, если в документации модуль не помечен как экспериментальный.

## Как устроен официальный справочник

Страница [About this documentation](https://nodejs.org/docs/latest/api/documentation.html) — оглавление API и шкала стабильности. У каждого раздела есть индекс:

| Индекс | Что означает |
|--------|----------------|
| 0 Deprecated | Модуль устарел, совместимость не обещают |
| 1 Experimental | Может измениться или исчезнуть. В production не опираться |
| 2 Stable | Обычный API, ломать его стараются только мажорной версией |
| 3 Legacy | Ещё поддерживается, но уже есть замена |

У экспериментальных API бывают стадии 1.0 (ранняя), 1.1 (активная разработка) и 1.2 (кандидат на стабильный). Рядом с таким API в документации написано, нужен ли флаг командной строки.

У каждой HTML-страницы справочника есть соседний `.json` — его читают IDE и генераторы. Функции-обёртки над системным вызовом ссылаются на man page.

Модули, которые встречаются в этом разделе:

| Модуль | Документация |
|--------|----------------|
| `node:fs` | [File system](https://nodejs.org/docs/latest/api/fs.html) |
| `node:path` | [Path](https://nodejs.org/docs/latest/api/path.html) |
| `node:events` | [Events](https://nodejs.org/docs/latest/api/events.html) |
| `node:stream` | [Stream](https://nodejs.org/docs/latest/api/stream.html) |
| `node:http` | [HTTP](https://nodejs.org/docs/latest/api/http.html) |
| `node:url` | [URL](https://nodejs.org/docs/latest/api/url.html) |
| `node:process` | [Process](https://nodejs.org/docs/latest/api/process.html) |
| `node:test` | [Test runner](https://nodejs.org/docs/latest/api/test.html) |
| `node:module` | [Modules](https://nodejs.org/docs/latest/api/modules.html) · [ESM](https://nodejs.org/docs/latest/api/esm.html) |

Полный список, включая `node:crypto`, `node:buffer`, worker threads и остальные, — в [оглавлении API](https://nodejs.org/docs/latest/api/documentation.html).

## Связанные разделы

| Раздел | Зачем |
|--------|--------|
| [JavaScript](../js/README.md) | Язык: типы, функции, Promise, модули в браузере |
| [Next.js](../js/next/README.md) | Приложение на Node.js с React |
| [PM2](../pm2/README.md) | Держать процесс запущенным на VPS |
| [MySQL](../../mysql/README.md) | Сам SQL; здесь только драйвер из Node.js |
