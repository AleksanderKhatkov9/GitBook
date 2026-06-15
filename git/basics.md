# Основные команды

## Полезные материалы

### Документация

- [Официальная документация Git](https://git-scm.com/doc)
- [GitHub — с чего начать](https://docs.github.com/ru/get-started/start-your-journey)
- [Atlassian — работа с ветками](https://www.atlassian.com/git/tutorials/using-branches)

### Шпаргалки и статьи

- [Git Cheat Sheet — Proglib](https://proglib.io/p/git-cheatsheet)
- [Шпаргалка по Git — Habr](https://habr.com/ru/company/ruvds/blog/599929/)

### Видео

- [Git — урок (плейлист)](https://www.youtube.com/watch?v=748ezxnu0CE&list=PLd2_Os8Cj3t_NscvtE9xd0QATeYy-kNCU&index=9)
- [Git для начинающих](https://www.youtube.com/watch?v=iQqDce_9y3k&t=648s)
- [Основы Git](https://www.youtube.com/watch?v=SZARWakrCro)
- [Git — практика (плейлист)](https://www.youtube.com/watch?v=W4hoc24K93E&list=PLDyvV36pndZFHXjXuwA_NywNrVQO0aQqb)
- [Git — продолжение плейлиста](https://www.youtube.com/watch?v=xzEMA7rzN3Y&list=PLDyvV36pndZFHXjXuwA_NywNrVQO0aQqb&index=6)
- [Git — дополнительный урок](https://www.youtube.com/watch?v=sgbKdriaDHg)

---

## Создание репозитория

```bash
# Новый проект
mkdir my-project && cd my-project
git init

# Или клонировать существующий
git clone https://github.com/user/repo.git
cd repo
```

## Ежедневный цикл

```bash
# 1. Посмотреть статус
git status

# 2. Добавить файлы в индекс (staging)
git add file.txt          # один файл
git add .                 # все изменения
git add -p                # интерактивно, по частям

# 3. Создать коммит
git commit -m "Добавлена страница авторизации"

# 4. Посмотреть историю
git log
git log --oneline         # краткий вид
git log --graph --oneline --all
```

## Просмотр изменений

```bash
git diff                  # незакоммиченные изменения
git diff --staged         # что попадёт в следующий коммит
git diff HEAD~1           # сравнить с предыдущим коммитом
git show abc1234          # детали конкретного коммита
```

## Отмена изменений

```bash
# Убрать файл из staging (файл останется изменённым)
git restore --staged file.txt

# Отменить изменения в файле (осторожно!)
git restore file.txt

# Изменить последний коммит (ещё не запушенный)
git commit --amend -m "Новое сообщение"
```

## Временное сохранение (stash)

```bash
git stash                 # спрятать изменения
git stash list            # список stash
git stash pop             # вернуть и удалить из stash
git stash apply           # вернуть, оставить в stash
```

## Три состояния файла

| Состояние | Описание |
|-----------|----------|
| **Modified** | Файл изменён, но не в индексе |
| **Staged** | Файл добавлен через `git add`, готов к коммиту |
| **Committed** | Файл сохранён в репозитории |

```
Working Directory  →  git add  →  Staging  →  git commit  →  Repository
```
