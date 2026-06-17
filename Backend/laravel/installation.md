# Установка

> Источник: [Installation | Laravel 13.x](https://laravel.com/docs/13.x)

## Почему Laravel?

**Прогрессивный фреймворк** — подходит и новичкам, и опытным разработчикам.  
**Масштабируемость** — Redis, очереди, горизонтальное масштабирование.  
**AI-ready** — предсказуемая структура для Cursor и Claude Code.  
**Сообщество** — тысячи пакетов и [контрибьюторов](https://github.com/laravel/framework).

## Требования

- [PHP](https://php.net) 8.2+
- [Composer](https://getcomposer.org)
- [Laravel Installer](https://github.com/laravel/installer)
- [Node.js](https://nodejs.org) или [Bun](https://bun.sh/) — для фронтенда

## Установка на Windows

PowerShell **от имени администратора**:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))
```

Перезапустите терминал.

Если PHP уже установлен:

```bash
composer global require laravel/installer
```

## Создание проекта

```bash
laravel new example-app
cd example-app
npm install && npm run build
composer run dev
```

Сайт: [http://localhost:8000](http://localhost:8000)

## Laravel Herd (Windows)

[Herd](https://herd.laravel.com/windows) — PHP, Nginx, Composer, Node в одном пакете.

```powershell
cd ~\Herd
laravel new my-app
cd my-app
herd open
```

Проект доступен по адресу `my-app.test`.

## IDE

| Редактор | Ссылка |
|----------|--------|
| VS Code / Cursor | [Laravel Extension](https://marketplace.visualstudio.com/items?itemName=laravel.vscode-laravel) |
| PhpStorm | [jetbrains.com/phpstorm/laravel](https://www.jetbrains.com/phpstorm/laravel/) |

## Laravel Boost (AI)

```bash
composer require laravel/boost --dev
php artisan boost:install
```

Подробнее: [github.com/laravel/boost](https://github.com/laravel/boost)
