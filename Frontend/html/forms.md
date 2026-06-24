# 3. Работа с формами

> Источники: [metanit.com — Работа с формами](https://metanit.com/web/html5/3.1.php) · [W3Schools — HTML Forms](https://www.w3schools.com/html/html_forms.asp) · [htmlbook.ru — Формы](https://htmlbook.ru/html/form)

Формы собирают данные пользователя и отправляют их на сервер.

## Базовая форма

```html
<form action="/login" method="POST">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>

    <label for="password">Пароль</label>
    <input type="password" id="password" name="password" required minlength="8">

    <button type="submit">Войти</button>
</form>
```

| Атрибут | Описание |
|---------|----------|
| `action` | URL обработчика |
| `method` | `GET` или `POST` |
| `enctype` | `multipart/form-data` — для загрузки файлов |
| `novalidate` | Отключить встроенную валидацию |

### Laravel Blade

```html
<form action="{{ route('login') }}" method="POST">
    @csrf
    <input type="email" name="email" value="{{ old('email') }}" required>
    <button type="submit">Войти</button>
</form>
```

## label и autofocus

```html
<!-- Явная связь label и поля -->
<label for="username">Логин</label>
<input type="text" id="username" name="username" autofocus>

<!-- Неявная связь — поле внутри label -->
<label>
    Согласен с условиями
    <input type="checkbox" name="agree">
</label>
```

`label` увеличивает область клика и помогает скринридерам.

## Текстовые поля

```html
<input type="text" name="name" placeholder="Иван Иванов" maxlength="100">
<input type="search" name="q" placeholder="Поиск...">
<input type="password" name="password" minlength="8">
<textarea name="message" rows="5" cols="40" placeholder="Ваше сообщение"></textarea>
```

## Специальные типы input

```html
<!-- Числа -->
<input type="number" name="age" min="18" max="120" step="1">

<!-- Email, URL, телефон -->
<input type="email" name="email" required>
<input type="url" name="website" placeholder="https://">
<input type="tel" name="phone" pattern="[+0-9\s\-()]{10,}">

<!-- Дата и время -->
<input type="date" name="birthday">
<input type="time" name="meeting">
<input type="datetime-local" name="event">
<input type="month" name="period">
<input type="week" name="week">

<!-- Цвет -->
<input type="color" name="theme" value="#336699">

<!-- Диапазон -->
<input type="range" name="volume" min="0" max="100" value="50">
```

## Флажки и переключатели

```html
<!-- Checkbox — несколько вариантов -->
<label><input type="checkbox" name="newsletter" checked> Подписаться</label>

<label><input type="checkbox" name="skills" value="php"> PHP</label>
<label><input type="checkbox" name="skills" value="js"> JavaScript</label>

<!-- Radio — один из группы -->
<fieldset>
    <legend>Способ доставки</legend>
    <label><input type="radio" name="delivery" value="pickup" checked> Самовывоз</label>
    <label><input type="radio" name="delivery" value="courier"> Курьер</label>
</fieldset>
```

## Кнопки

```html
<button type="submit">Отправить</button>
<button type="reset">Сбросить</button>
<button type="button" onclick="doSomething()">Действие</button>

<!-- input type="submit" — устаревший вариант -->
<input type="submit" value="Отправить">
```

| type | Поведение |
|------|-----------|
| `submit` | Отправляет форму |
| `reset` | Сбрасывает поля |
| `button` | Обычная кнопка без действия по умолчанию |

## select и optgroup

```html
<label for="city">Город</label>
<select id="city" name="city" required>
    <option value="">— Выберите —</option>
    <optgroup label="Центральный регион">
        <option value="moscow">Москва</option>
        <option value="tula">Тула</option>
    </optgroup>
    <optgroup label="Северо-Запад">
        <option value="spb">Санкт-Петербург</option>
    </optgroup>
</select>

<!-- Множественный выбор -->
<select name="tags" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
</select>
```

## datalist — автодополнение

```html
<label for="browser">Браузер</label>
<input list="browsers" id="browser" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>
```

## Загрузка файлов

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
    @csrf
    <label for="avatar">Аватар (PNG, JPG до 2 МБ)</label>
    <input type="file" id="avatar" name="avatar" accept="image/png,image/jpeg" required>

    <label for="docs">Документы</label>
    <input type="file" id="docs" name="docs[]" multiple accept=".pdf,.doc,.docx">

    <button type="submit">Загрузить</button>
</form>
```

## fieldset и legend

Группировка связанных полей:

```html
<fieldset>
    <legend>Контактные данные</legend>
    <label for="name">Имя</label>
    <input type="text" id="name" name="name">
    <label for="phone">Телефон</label>
    <input type="tel" id="phone" name="phone">
</fieldset>

<fieldset disabled>
    <legend>Недоступная группа</legend>
    <input type="text" name="locked">
</fieldset>
```

## Валидация форм

HTML5 поддерживает встроенную валидацию через атрибуты:

| Атрибут | Описание |
|---------|----------|
| `required` | Поле обязательно |
| `minlength` / `maxlength` | Длина текста |
| `min` / `max` / `step` | Числовые ограничения |
| `pattern` | Регулярное выражение |
| `type="email"` | Формат email |

```html
<form novalidate>
    <input type="text" name="login" required minlength="3" maxlength="20"
           pattern="[a-zA-Z0-9_]+" title="Только латиница, цифры и _">

    <input type="email" name="email" required>

    <input type="number" name="quantity" min="1" max="99" value="1">
</form>
```

### Псевдоклассы валидации (CSS)

```css
input:valid   { border-color: green; }
input:invalid { border-color: red; }
input:required { /* обязательное поле */ }
input:optional { /* необязательное */ }
```

### output — результат вычислений

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" name="a" value="0"> +
    <input type="number" id="b" name="b" value="0"> =
    <output name="result" for="a b">0</output>
</form>
```

## Скрытые поля

```html
<input type="hidden" name="user_id" value="42">
<input type="hidden" name="_token" value="{{ csrf_token() }}">
```

## GET vs POST

| Метод | Когда использовать |
|-------|-------------------|
| `GET` | Поиск, фильтры — данные в URL (`?q=html&page=2`) |
| `POST` | Авторизация, создание/изменение данных, загрузка файлов |

```html
<!-- Поиск — GET -->
<form action="/search" method="GET">
    <input type="search" name="q" placeholder="Поиск...">
    <button type="submit">Найти</button>
</form>
```

## Следующий шаг

[4. Семантическая структура](semantics.md) — header, nav, main, article, section.
