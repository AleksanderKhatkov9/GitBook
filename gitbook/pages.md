# Страницы и меню

## Создание новой страницы

### Шаг 1 — создать `.md` файл

Например, `Backend/laravel/middleware.md`:

```markdown
# Middleware

Middleware — промежуточный слой между запросом и контроллером.
```

### Шаг 2 — добавить в `SUMMARY.md`

```markdown
* [Backend](Backend/README.md)
  * [PHP](Backend/php/README.md)
    * [Laravel](Backend/laravel/README.md)
      * [Установка](Backend/laravel/installation.md)
      * [Middleware](Backend/laravel/middleware.md)   ← новая строка
```

Формат: `* [Название в меню](путь/к/файлу.md)`

Вложенные пункты (с отступом в 2 пробела) создают подразделы в меню.

### Шаг 3 — сохранить и проверить

Сохраните файл (`Ctrl+S`). Если запущен `npm run serve`, обновите браузер.

---

## Сворачиваемые разделы

Чтобы раздел можно было сворачивать в меню слева, используйте вложенный список:

```markdown
* [Backend](Backend/README.md)
  * [PHP](Backend/php/README.md)
    * [Laravel](Backend/laravel/README.md)
      * [Установка](Backend/laravel/installation.md)
      * [Конфигурация](Backend/laravel/configuration.md)
      * [Структура проекта](Backend/laravel/structure.md)
```

Плагин `collapsible-chapters` в `book.json` добавляет стрелку — клик скроет или покажет подпункты.

**Важно:** по умолчанию подпункты раздела скрыты, пока раздел не развёрнут (стрелка вниз). При переходе на страницу HonKit прокручивает меню к активному пункту — пункты **ниже** активного могут уйти за край экрана. Решение: ставьте важные страницы **выше** в `SUMMARY.md` или разверните раздел Git стрелкой слева.

---

## Добавление нового раздела

Создайте папку и главную страницу:

```
Backend/php/
├── README.md
└── basics.md
```

В `SUMMARY.md`:

```markdown
* [Введение](README.md)
* [GitBook](gitbook/README.md)
  * ...
* [Backend](Backend/README.md)
  * [PHP](Backend/php/README.md)
    * [Основы](Backend/php/basics.md)
```

---

## Ссылки между страницами

Внутри Markdown:

```markdown
См. раздел [Маршруты](../Backend/laravel/routing.md).
```

Из корня книги:

```markdown
[Установка Laravel](Backend/laravel/installation.md)
```

---

## Изображения

```markdown
![Описание](images/screenshot.png)
```

1. Создайте папку `images/` рядом с `.md` файлом
2. Положите туда картинку
3. Вставьте строку выше в markdown

Пример для `git/pull-request.md`:

```
git/
├── pull-request.md
└── images/
    └── pr-example.png
```

Форматы: `png`, `jpg`, `gif`, `svg`, `webp`. Можно использовать URL из интернета.

---

## Важные правила

| Делать | Не делать |
|--------|-----------|
| Редактировать `*.md` файлы | Редактировать `_book/*.html` |
| Менять `SUMMARY.md` для меню | Писать HTML вручную |
| Использовать `php`, `bash`, `html`, `ini` в блоках кода | Использовать `blade`, `env` — HonKit их не поддерживает |

### Поддерживаемые языки в блоках кода

`php`, `bash`, `html`, `ini`, `powershell`

Вместо `blade` — `html`, вместо `env` — `ini`.


## Как добавить изображение на страницу

В HonKit картинка вставляется **вне** блока кода:

```markdown
![Описание](../images/git/pull-request.jpg)
```

> Неправильно: писать `image.png` просто текстом или внутри ` ```markdown ` — так картинка не появится.

### Где лежит файл

Ваш скриншот:

```
GitBook/
├── images/
│   └── git/
│       └── pull-request.jpg    ← файл здесь
└── git/
    └── pull-request.md         ← страница здесь
```

Путь от `git/pull-request.md` к картинке: `../images/git/pull-request.jpg`

### Шаги

1. Положите файл в `images/git/` (или `git/images/` — тогда путь `images/файл.jpg`)
2. Вставьте в `.md` **без** обратных кавычек вокруг строки:

```markdown
![Подпись к картинке](../images/git/pull-request.jpg)
```

3. Сохраните и обновите браузер (`npm run serve`)

### Варианты путей

| Расположение файла | Путь из `git/pull-request.md` |
|--------------------|-------------------------------|
| `images/git/photo.jpg` | `../images/git/photo.jpg` |
| `git/images/photo.jpg` | `images/photo.jpg` |
| URL в интернете | `https://example.com/photo.png` |

### Форматы

`png`, `jpg`, `jpeg`, `gif`, `svg`, `webp`

---

## Чеклист перед merge