# 3. Функции

> Источники: [learn.javascript.ru — Функции](https://learn.javascript.ru/function-basics) · [metanit.com — Глава 3](https://metanit.com/web/javascript/3.1.php) · [W3Schools — JS Functions](https://www.w3schools.com/js/js_functions.asp)

## Объявление функции

### Function Declaration

```javascript
function greet(name) {
    return `Привет, ${name}!`;
}

greet('Anna');  // 'Привет, Anna!'
```

### Function Expression

```javascript
const greet = function(name) {
    return `Привет, ${name}!`;
};
```

### Стрелочные функции

```javascript
const greet = (name) => `Привет, ${name}!`;

const sum = (a, b) => a + b;

const createUser = (name) => ({
    name,
    createdAt: Date.now()
});

// Многострочное тело — нужны фигурные скобки и return
const calc = (a, b) => {
    const result = a + b;
    return result;
};
```

| Синтаксис | `this` | Hoisting |
|-----------|--------|----------|
| `function` | свой | да |
| `function expr` | свой | нет |
| `=>` | наследует извне | нет |

## Параметры

### Значения по умолчанию

```javascript
function greet(name = 'Guest') {
    return `Привет, ${name}!`;
}

greet();         // 'Привет, Guest!'
greet('Ivan');   // 'Привет, Ivan!'
```

### Rest-параметры

```javascript
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4);  // 10
```

### Spread при вызове

```javascript
const nums = [1, 2, 3];
Math.max(...nums);  // 3
```

## Область видимости

```javascript
const global = 'global';

function outer() {
    const outerVar = 'outer';

    function inner() {
        const innerVar = 'inner';
        console.log(global, outerVar, innerVar);
    }

    inner();
}

outer();
// console.log(outerVar); // ReferenceError
```

### Блочная область

```javascript
if (true) {
    let blockScoped = 'inside';
    const alsoBlock = 'inside';
}
// blockScoped — ReferenceError
```

## Замыкания

Функция «запоминает» переменные из внешней области:

```javascript
function createCounter() {
    let count = 0;

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getCount();   // 2
```

### Практика: debounce

```javascript
function debounce(fn, delay) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const onSearch = debounce((query) => {
    console.log('Поиск:', query);
}, 300);
```

## IIFE

Immediately Invoked Function Expression — функция, вызываемая сразу:

```javascript
(function() {
    const secret = 'hidden';
    console.log('IIFE выполнен');
})();
```

## Рекурсия

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

factorial(5);  // 120
```

## call, apply, bind

```javascript
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'Anna' };

greet.call(user, 'Привет', '!');     // 'Привет, Anna!'
greet.apply(user, ['Привет', '!']);  // 'Привет, Anna!'

const boundGreet = greet.bind(user, 'Привет');
boundGreet('!');  // 'Привет, Anna!'
```

## Callback-функции

```javascript
function processData(data, callback) {
    const result = data.map(item => item * 2);
    callback(result);
}

processData([1, 2, 3], (result) => {
    console.log(result);  // [2, 4, 6]
});
```

## Hoisting

```javascript
sayHi();  // 'Hi!' — Function Declaration поднимается

function sayHi() {
    console.log('Hi!');
}

// greet();  // TypeError — const не поднимается как функция
const greet = function() {
    console.log('Hello');
};
```

## Следующий шаг

[4. Объекты и классы](objects-classes.md) — ООП, прототипы, ES6 classes.
