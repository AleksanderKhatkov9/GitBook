# 4. Объекты и классы

> Источники: [learn.javascript.ru — Объекты](https://learn.javascript.ru/object) · [metanit.com — Главы 4–5](https://metanit.com/web/javascript/4.1.php) · [W3Schools — JS Objects](https://www.w3schools.com/js/js_objects.asp)

## Создание объектов

```javascript
const user = {
    name: 'Anna',
    age: 28,
    greet() {
        return `Привет, я ${this.name}`;
    }
};

user.name;           // 'Anna' — точечная нотация
user['age'];         // 28 — скобочная нотация

const key = 'name';
user[key];           // 'Anna'
```

## this

`this` зависит от контекста вызова:

```javascript
const person = {
    name: 'Ivan',
    greet() {
        console.log(this.name);
    }
};

person.greet();  // 'Ivan'

const fn = person.greet;
fn();            // undefined (или window.name в non-strict)
```

### Стрелочные функции и this

```javascript
const timer = {
    seconds: 0,
    start() {
        setInterval(() => {
            this.seconds++;  // this = timer
        }, 1000);
    }
};
```

## Копирование объектов

```javascript
const original = { a: 1, b: { c: 2 } };

// Поверхностная копия
const shallow = { ...original };
const shallow2 = Object.assign({}, original);

// Глубокая копия (простые случаи)
const deep = structuredClone(original);
```

## Деструктуризация

```javascript
const { name, age } = user;
const { name: userName, age: userAge = 18 } = user;

const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

function printUser({ name, age }) {
    console.log(name, age);
}
```

## Опциональная цепочка

```javascript
const city = user?.address?.city;       // undefined, если нет address
const result = user.greet?.();         // undefined, если нет greet
const value = obj?.[dynamicKey];
```

## Прототипы

```javascript
const animal = {
    eats: true,
    walk() {
        console.log('walk');
    }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

rabbit.walk();  // из прототипа animal
```

### Конструктор

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.greet = function() {
    return `Привет, ${this.name}!`;
};

const u = new User('Anna', 28);
u.greet();
```

## Классы ES6

```javascript
class User {
    #password;  // приватное поле

    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.#password = null;
    }

    greet() {
        return `Привет, ${this.name}!`;
    }

    setPassword(value) {
        this.#password = value;
    }

    static createGuest() {
        return new User('Guest', 'guest@example.com');
    }
}

const user = new User('Anna', 'anna@mail.ru');
User.createGuest();
```

## Наследование

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} издаёт звук`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        return `${this.name} лает`;
    }
}

const dog = new Dog('Бобик', 'овчарка');
dog.speak();  // 'Бобик лает'
```

## Геттеры и сеттеры

```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    set side(value) {
        this.width = value;
        this.height = value;
    }
}

const rect = new Rectangle(10, 5);
rect.area;       // 50
rect.side = 20;  // width=20, height=20
```

## instanceof

```javascript
dog instanceof Dog;     // true
dog instanceof Animal;  // true
dog instanceof Object;  // true
```

## Object.keys, values, entries

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);    // ['a', 'b', 'c']
Object.values(obj);  // [1, 2, 3]
Object.entries(obj); // [['a',1], ['b',2], ['c',3]]

for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
}
```

## Object.freeze / seal

```javascript
const config = Object.freeze({ theme: 'dark' });
// config.theme = 'light'; // Error в strict mode

const partial = Object.seal({ count: 0 });
partial.count = 1;   // OK
partial.new = 2;     // игнорируется
```

## Следующий шаг

[5. Массивы и коллекции](arrays-collections.md) — Array, Set, Map, строки.
