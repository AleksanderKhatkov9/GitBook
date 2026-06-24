# 2. Основы JavaScript

> Источники: [learn.javascript.ru — Основы](https://learn.javascript.ru/first-steps) · [metanit.com — Глава 2](https://metanit.com/web/javascript/2.1.php) · [W3Schools — JS Variables](https://www.w3schools.com/js/js_variables.asp)

## Переменные и константы

```javascript
let age = 25;           // можно изменить
age = 26;

const PI = 3.14159;     // нельзя переназначить
// PI = 3;              // TypeError

var oldStyle = 'legacy'; // устаревший способ — не используйте
```

| Ключевое слово | Область видимости | Переназначение |
|----------------|-------------------|----------------|
| `let` | блочная | да |
| `const` | блочная | нет (объект можно менять) |
| `var` | функциональная | да (устарело) |

```javascript
const user = { name: 'Anna' };
user.name = 'Maria';  // OK — меняется содержимое объекта
// user = {};         // Error — нельзя переназначить ссылку
```

## Типы данных

### Примитивы

| Тип | Пример | Описание |
|-----|--------|----------|
| `string` | `'hello'`, `"world"`, `` `hi` `` | Строка |
| `number` | `42`, `3.14`, `NaN` | Число |
| `boolean` | `true`, `false` | Логический |
| `null` | `null` | Пустое значение |
| `undefined` | `undefined` | Не задано |
| `bigint` | `100n` | Большие целые |
| `symbol` | `Symbol('id')` | Уникальный идентификатор |

### Объекты

```javascript
typeof {}           // 'object'
typeof []           // 'object'
typeof null         // 'object' (исторический баг)
typeof function(){} // 'function'
```

## Преобразование типов

```javascript
String(123);        // '123'
Number('42');        // 42
Number('abc');       // NaN
Boolean(0);          // false
Boolean('hello');    // true

// Неявное преобразование
'5' + 3;             // '53' (конкатенация)
'5' - 3;             // 2 (вычитание → number)
```

### Операторы нулевого слияния

```javascript
const value = null ?? 'default';   // 'default'
const count = 0 ?? 10;               // 0 (0 — не null/undefined)

let config = {};
config.theme ??= 'dark';             // theme = 'dark'
```

## Арифметические операторы

```javascript
5 + 3;    // 8
10 - 4;   // 6
6 * 7;    // 42
15 / 4;   // 3.75
15 % 4;   // 3 (остаток)
2 ** 10;  // 1024 (возведение в степень)

let x = 5;
x++;      // 6 (инкремент)
x += 2;   // 8
```

## Операторы сравнения

```javascript
5 == '5';   // true  (с приведением типов)
5 === '5';  // false (строгое сравнение — предпочитайте)

5 !== '5';  // true
10 > 5;     // true
10 >= 10;   // true
```

**Всегда используйте `===` и `!==`**, кроме редких случаев.

## Логические операторы

```javascript
true && false;   // false
true || false;   // true
!true;           // false

const role = 'admin';
const isAdmin = role === 'admin' && age >= 18;
```

### Короткое замыкание

```javascript
const name = user && user.name;       // undefined, если user falsy
const display = nickname || 'Guest';  // 'Guest', если nickname falsy
```

## Условные конструкции

### if / else if / else

```javascript
const score = 85;

if (score >= 90) {
    console.log('Отлично');
} else if (score >= 70) {
    console.log('Хорошо');
} else {
    console.log('Нужно подтянуть');
}
```

### Тернарный оператор

```javascript
const status = age >= 18 ? 'adult' : 'minor';
```

### switch

```javascript
const day = 3;

switch (day) {
    case 1:
        console.log('Понедельник');
        break;
    case 2:
        console.log('Вторник');
        break;
    default:
        console.log('Другой день');
}
```

## Циклы

### while

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

### do...while

```javascript
let n = 0;
do {
    console.log(n);
    n++;
} while (n < 3);
```

### for

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

const fruits = ['яблоко', 'груша', 'слива'];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

### for...of и for...in

```javascript
for (const fruit of fruits) {
    console.log(fruit);  // значения массива
}

const person = { name: 'Ivan', age: 30 };
for (const key in person) {
    console.log(key, person[key]);  // ключи объекта
}
```

### break и continue

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 3) continue;  // пропустить итерацию
    if (i === 7) break;     // выйти из цикла
    console.log(i);
}
```

## Шаблонные строки

```javascript
const name = 'Anna';
const age = 28;

const greeting = `Привет, ${name}! Тебе ${age} лет.`;

const multiline = `
    Строка 1
    Строка 2
`;
```

## Отладка

### debugger

```javascript
function calculate(a, b) {
    debugger;  // пауза в DevTools
    return a + b;
}
```

### Точки останова

В DevTools → Sources → клик на номер строки.

## Следующий шаг

[3. Функции](functions.md) — объявление, параметры, замыкания.
