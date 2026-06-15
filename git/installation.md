# Установка и настройка

## Установка

### Windows

Скачайте установщик: [git-scm.com/download/win](https://git-scm.com/download/win)

Или через winget:

```powershell
winget install Git.Git
```

### Проверка

```bash
git --version
```

## Первоначальная настройка

Укажите имя и email — они будут в каждом коммите:

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "you@example.com"
```

Проверить настройки:

```bash
git config --list
```

## Рекомендуемые настройки

```bash
# Основная ветка — main
git config --global init.defaultBranch main

# Цветной вывод
git config --global color.ui auto

# Сохранять пароли (Windows)
git config --global credential.helper manager

# Имя редактора для сообщений коммита
git config --global core.editor "code --wait"
```

## SSH-ключ для GitHub

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

Скопируйте публичный ключ:

```bash
cat ~/.ssh/id_ed25519.pub
```

Добавьте его в GitHub: **Settings → SSH and GPG keys → New SSH key**

Проверка:

```bash
ssh -T git@github.com
```

## Клонирование по HTTPS или SSH

```bash
# HTTPS
git clone https://github.com/user/repo.git

# SSH (рекомендуется)
git clone git@github.com:user/repo.git
```
