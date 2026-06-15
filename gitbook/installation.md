# Установка на локальную машину

## Требования

- [Node.js](https://nodejs.org) LTS (v18+)
- npm (идёт вместе с Node.js)

Проверка:

```bash
node -v
npm -v
```

## Первый запуск

```bash
# 1. Перейти в папку проекта
cd d:\D\Progrmmer\Project\GitBook

# 2. Установить зависимости
npm install

# 3. Запустить локальный сервер
npm run serve
```

Книга откроется по адресу: **[http://localhost:4000](http://localhost:4000)**

При изменении `.md` файлов страница обновляется автоматически.

## Если проект на другом компьютере

```bash
git clone <url-репозитория>
cd GitBook
npm install
npm run serve
```

## Сборка для публикации

```bash
npm run build
```

Готовый сайт появится в папке `_book/` — её можно залить на любой хостинг (GitHub Pages, Netlify, обычный веб-сервер).

## Полезные команды

| Команда | Описание |
|---------|----------|
| `npm run serve` | Локальный просмотр с автообновлением |
| `npm run build` | Сборка статического сайта в `_book/` |
| `npm run init` | Инициализация новой книги (если нужно с нуля) |

## Плагины

В `book.json` подключён плагин сворачиваемых разделов:

```json
{
  "title": "GitBook",
  "plugins": ["collapsible-chapters"]
}
```

После изменения `book.json` перезапустите сервер: `npm run serve`.
