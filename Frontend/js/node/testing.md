# 10. Тестирование

> Источники: [Metanit — тестирование](https://metanit.com/web/nodejs/) · [Test runner](https://nodejs.org/docs/latest/api/test.html) · [Assert](https://nodejs.org/docs/latest/api/assert.html) · [Mocha](https://mochajs.org/)

Тест вызывает функцию или HTTP-маршрут и проверяет результат. В Node.js для этого есть встроенный модуль `node:test`. Ставить Mocha не обязательно: руководство Metanit показывает Mocha, потому что так долго писали тесты до появления встроенного раннера. Оба варианта ниже проверяют одно и то же.

## node:test и assert

Файл `sum.js`:

```js
export function sum(a, b) {
    return a + b;
}
```

Файл `sum.test.js` рядом:

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sum } from './sum.js';

describe('sum', () => {
    it('adds two numbers', () => {
        assert.equal(sum(2, 3), 5);
    });
});
```

```bash
node --test
```

Раннер сам находит файлы `*.test.js`. В `package.json` это скрипт `"test": "node --test"`, запуск — `npm test`.

`node:assert/strict` сравнивает без сюрпризов `==`: число `5` и строка `'5'` не равны.

| Проверка | Смысл |
|----------|--------|
| `assert.equal(a, b)` | Строгое равенство `===` |
| `assert.deepEqual(a, b)` | Одинаковые поля объектов и массивов |
| `assert.match(строка, /шаблон/)` | Строка подходит под регулярное выражение |
| `assert.rejects(promise)` | Promise завершился ошибкой |

`describe` собирает проверки в группу. Имя группы и имя `it` печатаются в отчёте, по ним ищут упавший сценарий. Вложенный `describe` делит группу: «создание» и «удаление» внутри «users».

Один `it` проверяет одно поведение. Падение на первой строке тогда сразу говорит, что сломалось.

## Маршрут Express

Приложение собирают функцией, чтобы тест поднял его на свободном порту и не зависел от того, занят ли 3000.

`app.js`:

```js
import express from 'express';

export function createApp() {
    const app = express();
    app.get('/health', (req, res) => {
        res.json({ ok: true });
    });
    return app;
}
```

Боевой запуск, отдельный файл `server.js`:

```js
import { createApp } from './app.js';

createApp().listen(3000);
```

`app.test.js`:

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

describe('GET /health', () => {
    it('returns ok', async () => {
        const server = createApp().listen(0);

        try {
            await new Promise((resolve) => server.once('listening', resolve));
            const { port } = server.address();
            const response = await fetch(`http://127.0.0.1:${port}/health`);

            assert.equal(response.status, 200);
            assert.deepEqual(await response.json(), { ok: true });
        } finally {
            await new Promise((resolve) => server.close(resolve));
        }
    });
});
```

`listen(0)` просит у системы свободный порт. `finally` закрывает сервер и после падения проверки, иначе процесс `node --test` не завершится: сокет ещё слушает.

Так же проверяют API из [главы 9](api.md): статус 400 без `name`, 201 и тело с `id`, 404 для чужого id. Базу в таком тесте не обязательна, если маршрут принимает хранилище аргументом. Когда маршрут ходит в настоящую MongoDB, тест уже проверяет и базу, и сеть — это отдельный, более медленный набор.

## Mocha

Тот же сценарий на Mocha, как в руководстве Metanit:

```bash
npm install -D mocha
```

`test/sum.test.js`:

```js
import assert from 'node:assert/strict';
import { sum } from '../sum.js';

describe('sum', () => {
    it('adds two numbers', () => {
        assert.equal(sum(2, 3), 5);
    });
});
```

```bash
npx mocha
```

Mocha ищет каталог `test/`. `describe` и `it` она объявляет сама, импортировать их не нужно. Проверки по-прежнему делает `node:assert/strict`, не отдельная библиотека, если вам не нужен другой стиль сообщений.

Встроенный раннер не тащит зависимость и совпадает с [документацией Node.js](https://nodejs.org/docs/latest/api/test.html). Mocha имеет смысл, если проект уже на ней или нужен её репортер. Новые тесты в этом разделе пишите на `node:test`.

## Дальше

[11. MongoDB](mongodb.md) — сохранить пользователей из API между перезапусками.
