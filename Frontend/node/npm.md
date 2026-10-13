# 3. npm

> Источники: [Metanit — npm, package.json, Nodemon](https://metanit.com/web/nodejs/) · [npm Docs](https://docs.npmjs.com/) · [Command-line options](https://nodejs.org/docs/latest/api/cli.html)

npm ставится вместе с Node.js. Он скачивает пакеты в `node_modules` и читает описание проекта из `package.json`.

## Новый проект

В пустом каталоге:

```bash
npm init -y
```

Появятся `package.json` и после первой установки — `package-lock.json`. Каталог `node_modules` в git не коммитят: его восстанавливает `npm install` по lock-файлу.

Минимум, с которым дальше идут примеры этого раздела:

```json
{
  "name": "shop",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "test": "node --test"
  }
}
```

`"type": "module"` включает `import` / `export` в файлах `.js`. Без этого поля Node.js считает `.js` форматом CommonJS.

| Поле | Зачем |
|------|--------|
| `name`, `version` | Имя пакета. Для приложения, которое не публикуют, имя локальное |
| `type` | `module` или по умолчанию CommonJS |
| `scripts` | Команды `npm run …` |
| `dependencies` | Пакеты, нужные в production |
| `devDependencies` | Тесты, nodemon, сборщики — только на машине разработчика |

## Установка пакетов

```bash
npm install express
npm install -D nodemon
npm uninstall express
```

`npm install` без имени ставит всё, что уже записано в `package.json` и lock-файле. Так поднимают проект после клонирования.

| Команда | Куда записывает |
|---------|-----------------|
| `npm install пакет` | `dependencies` |
| `npm install -D пакет` | `devDependencies` |
| `npm install` | Никуда, только ставит по lock-файлу |

Точную версию фиксирует `package-lock.json`. Его коммитят: у коллеги и в CI будут те же версии, что прошли у вас.

Пакет запускают без глобальной установки через `npx`:

```bash
npx nodemon app.js
```

Глобально (`npm install -g`) ставят инструменты вроде [PM2](../pm2/README.md), когда команда нужна во всей системе, а не в одном репозитории.

## Скрипты

`npm start` и `npm test` вызываются без слова `run`. Остальные скрипты — через `npm run`:

```bash
npm start
npm run dev
npm test
```

В скрипте npm сам добавляет `node_modules/.bin` в PATH, поэтому пишут `nodemon app.js`, а не путь к файлу внутри `node_modules`.

## Перезапуск при правках

Встроенный режим Node.js 22+:

```bash
node --watch app.js
```

Процесс перезапускается, когда меняется файл, который приложение уже загрузило. Для сервера из следующих глав этого достаточно.

Nodemon делает то же и умеет шире задать, за какими расширениями следить:

```bash
npm install -D nodemon
```

```json
{
  "scripts": {
    "dev": "nodemon app.js"
  }
}
```

```bash
npm run dev
```

Оба инструмента — для разработки. На сервере приложение запускают без `--watch`: [PM2](../pm2/README.md) перезапускает процесс при падении, а не при каждом сохранении файла.

## Дальше

[4. Файлы](fs.md) — чтение и запись через `node:fs`.
