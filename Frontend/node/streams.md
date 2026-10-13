# 5. События и потоки

> Источники: [Metanit — события, Stream, Pipe](https://metanit.com/web/nodejs/) · [Events](https://nodejs.org/docs/latest/api/events.html) · [Stream](https://nodejs.org/docs/latest/api/stream.html)

`readFile` забирает файл в память целиком. Поток отдаёт и принимает данные кусками: лог, закачка, ответ клиенту. Многие объекты Node.js при этом ещё и источники событий: сервер, поток, сокет.

## EventEmitter

```js
import { EventEmitter } from 'node:events';

const bus = new EventEmitter();

bus.on('order', (order) => {
    console.log('Новый заказ', order.id);
});

bus.once('order', () => {
    console.log('Этот обработчик сработает один раз');
});

bus.emit('order', { id: 1 });
bus.emit('order', { id: 2 });
```

| Метод | Поведение |
|-------|-----------|
| `on(имя, fn)` | Вызывать `fn` на каждый `emit` |
| `once(имя, fn)` | Вызвать один раз и снять обработчик |
| `off(имя, fn)` | Снять конкретную функцию |
| `emit(имя, ...args)` | Вызвать подписчиков с этими аргументами |

Имя события — строка, которую выбрали вы. Чужой код его не увидит, пока ему не передали тот же объект.

Событие `error` особое. Если его испустить и слушателя нет, Node.js бросит исключение. У потока и у сервера обработчик `error` вешают сразу.

```js
bus.on('error', (error) => {
    console.error(error.message);
});

bus.emit('error', new Error('нет связи'));
```

Подписчиков не копят без `off`: обработчик на долгоживущем объекте держит замыкание в памяти. Для одноразовой реакции есть `once`.

## Четыре вида потоков

| Вид | Направление | Пример |
|-----|-------------|--------|
| Readable | Читать | `createReadStream`, запрос `req` |
| Writable | Писать | `createWriteStream`, ответ `res` |
| Duplex | Оба | сокет TCP |
| Transform | Оба, данные меняются по дороге | сжатие gzip |

Читаемый поток сам по себе ничего не выгружает, пока кто-то не начал чтение: цикл `for await`, вызов `pipe` или `pipeline`.

## Копирование файла

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const source = join(import.meta.dirname, 'input.txt');
const target = join(import.meta.dirname, 'output.txt');

await pipeline(
    createReadStream(source),
    createWriteStream(target),
);
```

`pipeline` соединяет потоки и сам уничтожает их при ошибке. Ошибка чтения не оставляет молча обрезанный файл без сигнала: `await` её бросает.

`readable.pipe(writable)` делает ту же связку короче, но ошибку на стороне чтения нужно слушать самим. В новом коде берут `pipeline`.

Тот же приём отдаёт файл в HTTP-ответ: `res` — записываемый поток. Это разобрано в [главе про сервер](http.md).

## Чтение по кускам

```js
import { createReadStream } from 'node:fs';

const stream = createReadStream(source, { encoding: 'utf8' });

stream.on('data', (chunk) => {
    console.log('кусок', chunk.length);
});

stream.on('end', () => {
    console.log('файл закончился');
});

stream.on('error', (error) => {
    console.error(error.code);
});
```

Без `encoding` кусок — это `Buffer`. С `'utf8'` — строка. Резать текст руками по кускам опасно: символ UTF-8 может разорваться на границе двух `data`. Для текста проще `readFile`, для перекладки байтов — `pipeline`.

Если запись не успевает за чтением, поток притормаживает источник. Это backpressure: память не растёт на весь файл. `pipeline` и `pipe` включают его сами. Свой цикл `data` + `write` без проверки `write()` легко снова копит данные в памяти — для копирования он не нужен.

## Дальше

[6. HTTP-сервер](http.md) — принять запрос и отдать ответ, в том числе файлом.
