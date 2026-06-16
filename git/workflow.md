# Рабочий процесс

## Типичный рабочий день

```bash
# Утро — обновить main
git checkout main
git pull

# Создать ветку для задачи
git checkout -b feature/user-profile

# Работа...
git add .
git commit -m "Добавлен профиль пользователя"

# Перед push — обновить main и перебазировать (опционально)
git checkout main
git pull
git checkout feature/user-profile
git rebase main

# Отправить на сервер
git push -u origin feature/user-profile
```

## Файл `.gitignore`

Указывает Git, какие файлы **не отслеживать**:

```ini
# Зависимости
node_modules/
vendor/

# Окружение
.env
.env.local

# Сборка
_book/
dist/
build/

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db
```

Создайте `.gitignore` в корне проекта до первого коммита.

## Сообщения коммитов

Подробные правила и примеры для этого проекта: [Коммиты](commits.md).

Кратко — используйте формат `тип(раздел): описание`:

```bash
git commit -m "docs(git): добавить страницу с правилами коммитов"
git commit -m "feat(laravel): добавить документацию по маршрутам"
```

## Частые ошибки

### Забыли добавить файл в коммит

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

### Коммит в не ту ветку

```bash
git log --oneline -1          # запомнить хеш
git reset --soft HEAD~1       # отменить коммит, оставить изменения
git stash
git checkout correct-branch
git stash pop
git add .
git commit -m "сообщение"
```

### Конфликт при pull

```bash
git pull
# Git покажет конфликтные файлы
# Отредактируйте файлы, уберите маркеры <<<< ==== >>>>
git add .
git commit -m "Resolve merge conflict"
```

### Откат к предыдущему коммиту

```bash
# Посмотреть историю
git log --oneline

# Мягкий откат (изменения останутся)
git reset --soft abc1234

# Жёсткий откат (изменения удалятся!)
git reset --hard abc1234
```

> **Внимание:** `git reset --hard` необратимо удаляет незакоммиченные изменения.

## Полезные алиасы

Добавьте в `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --all
    last = log -1 HEAD
```

Использование: `git st`, `git lg`
