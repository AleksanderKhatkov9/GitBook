# Git

> Официальная документация: [git-scm.com/doc](https://git-scm.com/doc)

Git — система контроля версий. Она отслеживает изменения в файлах, позволяет работать в команде и откатываться к предыдущим версиям.

## Разделы

| Страница | Описание |
|----------|----------|
| [Установка и настройка](installation.md) | Установка Git, `git config` |
| [Основные команды](basics.md) | `init`, `clone`, `add`, `commit`, `status` |
| [Ветки](branches.md) | Создание, переключение, слияние |
| [Удалённый репозиторий](remote.md) | `push`, `pull`, `fetch` |
| [Коммиты](commits.md) | Формат сообщений, примеры для проекта |
| [Рабочий процесс](workflow.md) | Типичный flow, `.gitignore`, ошибки |
| [Pull Request](pull-request.md) | Создание PR, пример, шаблон |

## Быстрая шпаргалка

```bash
git status                  # Статус файлов
git add .                   # Добавить все изменения
git commit -m "описание"    # Сохранить коммит
git push                    # Отправить на сервер
git pull                    # Забрать изменения с сервера
```

## Полезные ссылки

- [Pro Git (книга)](https://git-scm.com/book/ru/v2)
- [GitHub Docs](https://docs.github.com/ru)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
