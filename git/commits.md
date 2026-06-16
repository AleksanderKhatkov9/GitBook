# Коммиты

Правила оформления коммитов для проекта **GitBook** и примеры на реальных изменениях.


## Формат сообщения

```
тип(раздел): краткое описание

[необязательное тело — подробности]
```

| Часть | Описание |
|-------|----------|
| **тип** | Что сделано: `feat`, `fix`, `docs`, `chore` и др. |
| **раздел** | Область проекта в скобках (необязательно) |
| **описание** | Суть изменения в настоящем времени, с маленькой буквы |

## Типы коммитов

| Тип | Когда использовать |
|-----|-------------------|
| `feat` | Новая страница, новый раздел |
| `fix` | Исправление ошибки в документации или конфиге |
| `docs` | Правки текста, уточнения, ссылки |
| `chore` | Зависимости, `package.json`, `book.json` |
| `refactor` | Переструктурирование без смены смысла |
| `style` | Форматирование markdown, опечатки |

---

## Примеры для проекта GitBook

### Новый раздел или страница

```bash
git commit -m "feat(laravel): добавить страницу по маршрутам"
git commit -m "feat(git): добавить документацию по веткам"
git commit -m "feat(js): создать раздел Vue с быстрым стартом"
```

### Обновление существующей документации

```bash
git commit -m "docs(readme): обновить структуру разделов"
git commit -m "docs(laravel): дополнить installation.md для Windows"
git commit -m "docs(git): исправить примеры команд push и pull"
```

### Исправления

```bash
git commit -m "fix(honkit): заменить blade на html в блоках кода"
git commit -m "fix(summary): добавить раздел Git в оглавление"
git commit -m "fix(links): исправить битые ссылки в laravel/README"
```

### Настройка проекта

```bash
git commit -m "chore: установить honkit и collapsible-chapters"
git commit -m "chore(book): добавить book.json с плагинами"
git commit -m "chore: добавить npm-скрипты serve и build"
```

### Реструктуризация

```bash
git commit -m "refactor: перенести установку в раздел gitbook/"
git commit -m "refactor(laravel): вынести laravel под раздел PHP"
git commit -m "refactor: удалить устаревший laravel.md из корня"
```

---

## Полный пример рабочего цикла

Допустим, вы добавили страницу `git/commits.md`:

```bash
# 1. Проверить изменения
git status

# 2. Добавить файлы
git add git/commits.md SUMMARY.md git/README.md

# 3. Коммит с понятным сообщением
git commit -m "docs(git): добавить страницу с правилами коммитов"

# 4. Отправить на сервер
git push origin main
```

Просмотр истории:

```bash
git log --oneline -5
```

Пример вывода:

```
a1b2c3d docs(git): добавить страницу с правилами коммитов
e4f5g6h feat(devops): создать раздел Docker и Vagrant
i7j8k9l docs(readme): обновить главную страницу
m0n1o2p chore: установить gitbook-plugin-collapsible-chapters
q3r4s5t feat(laravel): добавить документацию Laravel 13.x
```

---

## Коммит с телом (подробное описание)

Для крупных изменений используйте многострочное сообщение:

```bash
git commit -m "feat: добавить разделы PHP, JS, DevOps" -m "- Созданы папки php, js, devops, admin, css, linux
- Обновлён SUMMARY.md с вложенным меню
- Laravel перенесён под раздел PHP"
```

Или через редактор:

```bash
git commit
```

В редакторе:

```
feat: добавить разделы PHP, JS, DevOps

- Созданы папки php, js, devops, admin, css, linux
- Обновлён SUMMARY.md с вложенным меню
- Laravel перенесён под раздел PHP
```

---

## Плохие и хорошие примеры

| Плохо | Хорошо |
|-------|--------|
| `update` | `docs(laravel): обновить страницу routing` |
| `fix` | `fix(views): заменить blade на html для honkit` |
| `new page` | `feat(git): добавить документацию по веткам` |
| `правки` | `docs(readme): исправить описание структуры проекта` |
| `asdfasdf` | `chore: обновить package-lock.json` |

---

## Что не коммитить

Добавьте в `.gitignore` (если ещё нет):

```ini
node_modules/
_book/
.DS_Store
```

Не коммитьте:

- папку `_book/` — она генерируется при сборке;
- `node_modules/` — ставится через `npm install`;
- секреты и пароли в `.env`.

---

## Шаблон для копирования

```bash
git add .
git commit -m "тип(раздел): что сделано"
git push origin main
```

Замените `тип` и `раздел` по таблице выше.
