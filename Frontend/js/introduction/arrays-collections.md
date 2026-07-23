# 5. Массивы и коллекции

> Источники: [learn.javascript.ru — Массивы](https://learn.javascript.ru/array) · [metanit.com — Главы 6–7, 10](https://metanit.com/web/javascript/6.1.php) · [W3Schools — JS Arrays](https://www.w3schools.com/js/js_arrays.asp)

## Создание массивов

```javascript
const fruits = ['яблоко', 'груша', 'слива'];
const nums = new Array(3);       // [empty × 3]
const filled = Array.from({ length: 5 }, (_, i) => i + 1);  // [1,2,3,4,5]

const copy = [...fruits];
const merged = [...fruits, 'апельсин', ...['киви']];
```

## Доступ и изменение

```javascript
fruits[0];           // 'яблоко'
fruits.length;       // 3
fruits.push('банан');
fruits.pop();
fruits.unshift('лимон');
fruits.shift();
fruits.splice(1, 1, 'вишня');  // замена
```

## Методы массивов

### Перебор и трансформация

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(n => console.log(n));

const doubled = numbers.map(n => n * 2);        // [2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0); // [2,4]
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15
const hasEven = numbers.some(n => n % 2 === 0);      // true
const allPositive = numbers.every(n => n > 0);       // true
const first = numbers.find(n => n > 3);              // 4
const index = numbers.findIndex(n => n > 3);         // 3
```

### Поиск и проверка

```javascript
[1, 2, 3].includes(2);       // true
[1, 2, 3].indexOf(2);        // 1
[1, 2, 3].at(-1);            // 3 (последний элемент)
```

### Сортировка

```javascript
const items = [3, 1, 4, 1, 5];

items.sort((a, b) => a - b);  // числовая сортировка
items.reverse();

const users = [
    { name: 'Anna', age: 28 },
    { name: 'Ivan', age: 22 }
];
users.sort((a, b) => a.age - b.age);
```

### flat и flatMap

```javascript
[1, [2, 3], [4, [5]]].flat();       // [1, 2, 3, 4, [5]]
[1, [2, 3], [4, [5]]].flat(2);      // [1, 2, 3, 4, 5]

['hello world', 'hi'].flatMap(s => s.split(' '));
// ['hello', 'world', 'hi']
```

## Set

Уникальные значения:

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;           // 3
set.add(4);
set.has(2);         // true
set.delete(2);

const unique = [...new Set([1, 1, 2, 3])];  // [1, 2, 3]
```

## Map

Ключ может быть любого типа:

```javascript
const map = new Map();
map.set('name', 'Anna');
map.set(42, 'answer');
map.set({ id: 1 }, 'object key');

map.get('name');    // 'Anna'
map.has(42);        // true
map.size;           // 3

for (const [key, value] of map) {
    console.log(key, value);
}
```

## WeakSet и WeakMap

Слабые ссылки — не мешают сборке мусора. Ключи WeakMap — только объекты:

```javascript
const cache = new WeakMap();
const obj = {};
cache.set(obj, 'data');
cache.get(obj);  // 'data'
```

## Строки

```javascript
const str = '  Hello, World!  ';

str.length;                    // 17
str.trim();                    // 'Hello, World!'
str.toLowerCase();
str.toUpperCase();
str.includes('World');         // true
str.startsWith('Hello');       // false (пробелы)
str.slice(2, 7);               // 'Hello'
str.split(', ');               // ['  Hello', 'World!  ']
str.replace('World', 'JS');    // '  Hello, JS!  '
str.replaceAll('l', 'L');
```

### Шаблонные строки

```javascript
const name = 'Anna';
const msg = `Привет, ${name}!`;
const html = `
    <ul>
        ${items.map(i => `<li>${i}</li>`).join('')}
    </ul>
`;
```

## Регулярные выражения

```javascript
const pattern = /\d{3}-\d{2}-\d{2}/;
const phone = 'Тел: 123-45-67';

pattern.test(phone);           // true
phone.match(pattern);          // ['123-45-67']
phone.replace(/\d/g, '*');     // 'Тел: ***-**-**'

// Флаги: g (global), i (ignore case), m (multiline)
/\bword\b/gi.test('Word word WORD');
```

### Группы

```javascript
const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
const match = '2025-06-24'.match(datePattern);
// match[0] = '2025-06-24', match[1] = '2025', ...
```

## JSON

```javascript
const obj = { name: 'Anna', skills: ['JS', 'PHP'] };

const json = JSON.stringify(obj);
// '{"name":"Anna","skills":["JS","PHP"]}'

const parsed = JSON.parse(json);
parsed.name;  // 'Anna'
```

## Следующий шаг

[6. Асинхронность](async.md) — Promise, async/await, Fetch.
