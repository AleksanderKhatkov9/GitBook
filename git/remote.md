# Удалённый репозиторий

Удалённый репозиторий (remote) — копия проекта на сервере (GitHub, GitLab, Bitbucket).

## Первый раз: загрузить GitBook на GitHub

### 1. Создайте пустой репозиторий на GitHub

GitHub → **New repository** → имя, например `GitBook` → **без** README и `.gitignore` (они уже есть локально).

### 2. Инициализируйте Git в папке проекта

```bash
cd d:\D\Progrmmer\Project\GitBook

git init
git branch -M main
```

### 3. Первый коммит

```bash
git add .
git status
git commit -m "docs: начальная версия документации GitBook"
```

В `.gitignore` уже указаны `node_modules/` и `_book/` — их не нужно коммитить.

### 4. Подключить удалённый репозиторий

**HTTPS:**

```bash
git remote add origin https://github.com/AleksanderKhatkov9/GitBook.git
```

**SSH (рекомендуется):**

```bash
git remote add origin git@github.com:AleksanderKhatkov9/GitBook.git
```

Проверка:

```bash
git remote -v
```

### 5. Отправить на GitHub

```bash
git push -u origin main
```

После этого проект на GitHub. Клонирование на другом ПК:

```bash
git clone git@github.com:AleksanderKhatkov9/GitBook.git
cd GitBook
npm install
npm run serve
```

---

## Просмотр remote

```bash
git remote -v
```

Обычно основной remote называется `origin`.

## Отправка и получение

```bash
# Отправить ветку на сервер
git push origin main

# Первый push новой ветки
git push -u origin feature/login

# Забрать изменения и слить
git pull origin main

# Только скачать, без слияния
git fetch origin
```

## Добавить remote

```bash
git remote add origin git@github.com:user/repo.git
git remote remove origin
git remote set-url origin git@github.com:user/new-repo.git
```

## Клонирование

```bash
git clone https://github.com/user/repo.git
cd repo
```

Клонирует репозиторий и автоматически настраивает `origin`.

## Работа с чужим репозиторием (Fork)

1. Нажмите **Fork** на GitHub
2. Клонируйте свой fork:

```bash
git clone git@github.com:your-name/repo.git
```

3. Добавьте оригинал как upstream:

```bash
git remote add upstream git@github.com:original/repo.git
git fetch upstream
git merge upstream/main
```

## Pull Request

Подробный пример и шаблон: [Pull Request](pull-request.md).

## Теги и релизы

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Релиз 1.0.0"
git push origin v1.0.0
git push origin --tags
```
