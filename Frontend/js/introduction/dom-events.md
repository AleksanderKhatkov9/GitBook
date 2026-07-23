# 8. DOM и события

> Источники: [learn.javascript.ru — Браузер](https://learn.javascript.ru/document) · [metanit.com — Главы 11–13](https://metanit.com/web/javascript/11.1.php) · [W3Schools — HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)

## DOM-дерево

HTML-документ представлен как дерево объектов:

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── header
        └── main
            └── p
```

## Поиск элементов

```javascript
// Один элемент
document.getElementById('app');
document.querySelector('.btn-primary');
document.querySelector('nav a[href="/"]');

// Коллекции
document.querySelectorAll('.card');
document.getElementsByClassName('item');
document.getElementsByTagName('li');
```

| Метод | Возвращает |
|-------|------------|
| `getElementById` | один Element или null |
| `querySelector` | первый Element или null |
| `querySelectorAll` | NodeList (статический) |
| `getElementsByClassName` | HTMLCollection (живая) |

## Свойства элементов

```javascript
const el = document.querySelector('#title');

el.textContent = 'Новый текст';     // только текст
el.innerHTML = '<strong>HTML</strong>';  // с разметкой
el.id;
el.className;                        // строка классов
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('open');
el.classList.contains('active');     // true/false

el.style.color = 'red';
el.style.display = 'none';
```

## Атрибуты

```javascript
const link = document.querySelector('a');

link.getAttribute('href');
link.setAttribute('target', '_blank');
link.hasAttribute('download');
link.removeAttribute('disabled');

// data-атрибуты
link.dataset.userId = '42';          // data-user-id="42"
link.dataset.userId;                 // '42'
```

## Создание и изменение DOM

```javascript
const list = document.querySelector('#list');

// Создание
const li = document.createElement('li');
li.textContent = 'Новый пункт';
li.classList.add('item');

// Добавление
list.appendChild(li);
list.prepend(li);
list.insertBefore(li, list.firstChild);

// Удаление
li.remove();
list.removeChild(li);

// Замена
const newLi = document.createElement('li');
newLi.textContent = 'Заменённый';
li.replaceWith(newLi);
```

### DocumentFragment

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const item = document.createElement('li');
    item.textContent = `Item ${i}`;
    fragment.appendChild(item);
}
list.appendChild(fragment);  // одна перерисовка
```

## События

### addEventListener

```javascript
const button = document.querySelector('#submit');

button.addEventListener('click', (event) => {
    event.preventDefault();  // отменить действие по умолчанию
    console.log('Клик!', event.target);
});

// Удаление
function handler(e) { console.log(e); }
button.addEventListener('click', handler);
button.removeEventListener('click', handler);
```

### Основные события

| Событие | Когда срабатывает |
|---------|-------------------|
| `click` | Клик мышью |
| `dblclick` | Двойной клик |
| `input` | Изменение поля ввода |
| `change` | Подтверждение изменения (select, checkbox) |
| `submit` | Отправка формы |
| `keydown` / `keyup` | Клавиатура |
| `mouseenter` / `mouseleave` | Наведение |
| `scroll` | Прокрутка |
| `DOMContentLoaded` | DOM готов |
| `load` | Страница и ресурсы загружены |

```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM готов');
});

window.addEventListener('load', () => {
    console.log('Все ресурсы загружены');
});
```

## Всплытие и погружение

События проходят три фазы: capture → target → bubble.

```javascript
document.querySelector('#parent').addEventListener('click', (e) => {
    console.log('parent bubble', e.target);
});

document.querySelector('#child').addEventListener('click', (e) => {
    e.stopPropagation();  // остановить всплытие
    console.log('child');
}, false);  // false = bubble (по умолчанию)
```

## Делегирование событий

Один обработчик на родителе вместо множества на дочерних элементах:

```javascript
document.querySelector('#list').addEventListener('click', (e) => {
    const item = e.target.closest('.list-item');
    if (!item) return;

    if (e.target.matches('.delete-btn')) {
        item.remove();
    }
});
```

## Работа с формами

```javascript
const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // { email: '...', password: '...' }

    const email = form.elements.email.value;
    const password = form.elements.password.value;

    if (!email.includes('@')) {
        form.elements.email.setCustomValidity('Некорректный email');
        form.reportValidity();
        return;
    }
    form.elements.email.setCustomValidity('');
});
```

### Validation API

```javascript
const input = document.querySelector('#email');

input.checkValidity();       // true/false
input.validationMessage;     // текст ошибки
input.validity.valid;        // boolean
input.validity.valueMissing; // required не заполнен
```

## Размеры и прокрутка

```javascript
const box = document.querySelector('.box');

box.offsetWidth;    // ширина с padding и border
box.clientWidth;    // ширина с padding, без border
box.scrollHeight;   // полная высота контента

box.getBoundingClientRect();  // позиция относительно viewport

window.scrollY;     // прокрутка страницы
window.scrollTo({ top: 0, behavior: 'smooth' });
```

## Custom Events

```javascript
const app = document.querySelector('#app');

app.addEventListener('user:login', (e) => {
    console.log('User logged in:', e.detail);
});

app.dispatchEvent(new CustomEvent('user:login', {
    detail: { id: 1, name: 'Anna' }
}));
```

## Следующий шаг

[9. Модули и хранение](modules-storage.md) — ES modules, localStorage, cookies.
