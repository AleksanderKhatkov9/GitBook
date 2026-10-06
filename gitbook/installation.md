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

Сначала остановите `npm run serve` (Ctrl+C). Оба процесса пишут в `_book/` — если сервер запущен, `npm run build` зависает и не обновляет файлы.

```bash
npm run build
```

Команда сбрасывает кэш HonKit (`--reload`) и полностью пересобирает сайт в `_book/`. Для этой книги вручную заливать `_book/` не нужно: публикация идёт через GitHub Actions.

## Публикация на GitHub Pages

Сайт собирается и выкладывается workflow-файлом [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

Адрес книги: **[https://aleksanderkhatkov9.github.io/GitBook/](https://aleksanderkhatkov9.github.io/GitBook/)**

Сборка запускается сама при `git push` в ветку **`main`**. Пуш в `develop` сайт не обновляет. Запуск вручную тоже есть: в репозитории на GitHub вкладка **Actions** → **Deploy GitHub Pages** → **Run workflow**.

Workflow делает два шага:

| Шаг | Что происходит |
|-----|----------------|
| **build** | Скачивает репозиторий, ставит Node.js 20, выполняет `npm ci` и `npm run build`, собирает HTML в `_book/` |
| **deploy** | Публикует папку `_book/` в среду `github-pages` |

Среда `github-pages` принимает выкладку только с ветки по умолчанию `main`. Поэтому в `pages.yml` указано `branches: [main]`.

Локальный `npm run serve` нужен только чтобы смотреть правки на своём компьютере. Папку `_book/` в git не коммитят: она в `.gitignore`, на сервере её создаёт Actions.

Чтобы опубликовать правки из `develop`:

```bash
git checkout main
git merge develop
git push origin main
```

После пуша откройте вкладку **Actions**. Шаг **build** идёт около 2 минут и почти ничего не пишет в лог — это нормально. Когда **build** и **deploy** станут зелёными, сайт обновится по ссылке выше.

## Полезные команды

| Команда | Описание |
|---------|----------|
| `npm run serve` | Локальный просмотр с автообновлением |
| `npm run build` | Полная сборка в `_book/` (сброс кэша). Сначала остановите `serve` |
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
