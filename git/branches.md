# Ветки

Ветка — независимая линия разработки. Основная ветка обычно называется `main` или `master`.

## Просмотр веток

```bash
git branch                # локальные ветки
git branch -a             # все (включая удалённые)
git branch -v             # с последним коммитом
```

## Создание и переключение

```bash
# Создать ветку
git branch feature/login

# Переключиться на ветку
git checkout feature/login

# Создать и сразу переключиться
git checkout -b feature/login

# Git 2.23+ — альтернатива checkout
git switch feature/login
git switch -c feature/login
```

## Слияние (merge)

```bash
# Переключиться на main и влить ветку
git checkout main
git merge feature/login
```

Если есть конфликты — Git пометит файлы. Отредактируйте их, затем:

```bash
git add .
git commit -m "Merge feature/login"
```

## Удаление ветки

```bash
git branch -d feature/login     # удалить (если слита)
git branch -D feature/login     # принудительно
```

## Rebase (альтернатива merge)

Переписывает историю — делает её линейной:

```bash
git checkout feature/login
git rebase main
```

> **Правило:** не делайте `rebase` для веток, которые уже запушены и используются другими.

## Типичный flow

```
main ─────●─────●─────●─────●───── (production)
               \         /
feature ────────●───●───●          (разработка)
```

1. `git checkout -b feature/new-page` — создать ветку от `main`
2. Работать, коммитить
3. `git checkout main && git pull` — обновить main
4. `git merge feature/new-page` — влить изменения
5. `git push` — отправить на сервер
