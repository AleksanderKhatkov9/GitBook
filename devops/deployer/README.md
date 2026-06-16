# Deployer

Deployer — инструмент для автоматического деплоя PHP/Laravel-приложений на сервер по SSH. Новая версия собирается в отдельной папке (`releases/N`), затем переключается симлинк `current` — сайт не падает на время деплоя.

## Документация и материалы

| Ресурс | Ссылка |
|--------|--------|
| Deployer 6.x (официально) | [deployer.org/docs/6.x/getting-started](https://deployer.org/docs/6.x/getting-started) |
| Deployer 8.x (актуально) | [deployer.org/docs/8.x/getting-started](https://deployer.org/docs/8.x/getting-started) |
| Laravel Recipe | [deployer.org/docs/8.x/recipe/laravel](https://deployer.org/docs/8.x/recipe/laravel) |
| Статья PHPtoday (RU) | [phptoday.ru/post/deploim-php-prilozhenie-s-pomoshchyu-deployer](https://phptoday.ru/post/deploim-php-prilozhenie-s-pomoshchyu-deployer) |
| Пример `deploy.php` | [github.com/PHPtoday-ru/laravel-deployer-demo](https://github.com/PHPtoday-ru/laravel-deployer-demo/blob/master/deploy.php) |
| Habr | [habr.com/ru/post/302442](https://habr.com/ru/post/302442/) |
| Видео (плейлист) | [YouTube](https://www.youtube.com/playlist?list=PLD5U-C5KK50XjpZ2NFD5pMhw-bCh5Z0Pl) |
| Видео (урок 6) | [YouTube](https://www.youtube.com/watch?v=mkntP_9Vu5Q&list=PLD5U-C5KK50XjpZ2NFD5pMhw-bCh5Z0Pl&index=6) |

---

## Установка

### Через Composer (в проект)

```bash
composer require deployer/deployer --dev
vendor/bin/dep --version
```

### Через Composer (глобально)

```bash
composer global require deployer/deployer
dep --version
```

### Через PHAR (Linux / Homestead)

```bash
curl -LO https://deployer.org/deployer.phar
mv deployer.phar /usr/local/bin/dep
chmod +x /usr/local/bin/dep
dep --version
```

### Инициализация Laravel-проекта

```bash
vendor/bin/dep init --recipe=laravel
```

Создаётся `deploy.php` с рецептом: `git clone`, `composer install`, `npm run production`, `artisan migrate`, кэш и т.д.

---

## Рабочий процесс деплоя

> **Обязательно:** перед деплоем сделайте **бэкап базы данных**. Deployer запускает миграции автоматически — без бэкапа откатить БД будет сложно.

Типичная последовательность:

```bash
# 1. Закоммитить и запушить изменения
git add .
git commit -m "Описание изменений"
git push

# 2. Задеплоить на нужное окружение
dep deploy test          # TEST
dep deploy production    # PROD

# 3. При ошибках — подробный вывод
dep deploy test -vvv
dep deploy production -vvv
```

### Деплой из Vagrant / Homestead

Команды выполняются **внутри VM**, из папки проекта:

```bash
vagrant ssh
cd ~/bzr-mediaspace
dep deploy test
```

Приглашение в терминале:

```
vagrant@homestead:~/bzr-mediaspace$
```

### Откат релиза

```bash
dep rollback test
dep rollback production
```

---

## Структура на сервере

```
/var/www/bzr-mediaspace/
├── current -> releases/6     # симлинк на активный релиз
├── releases/
│   ├── 4/
│   ├── 5/
│   └── 6/
├── shared/
│   ├── .env
│   └── storage/              # логи, кэш, загруженные файлы
└── .dep/
```

| Элемент | Назначение |
|---------|------------|
| `current` | Ссылка на текущий релиз. Nginx указывает на `current/public` |
| `releases/` | Каждый деплой — новая папка. Старые удаляются по `keep_releases` |
| `shared/` | Общие файлы между релизами — не перезаписываются при деплое |
| `shared/storage` | Логи Laravel — смотреть при ошибках |

### Хранение релизов

По умолчанию может храниться только **2** последних релиза — остальные удаляются. Рекомендуется выставить **5**:

```php
set('keep_releases', 5);
```

> Код всегда есть в GitHub, но откат через `dep rollback` возможен только пока старый релиз не удалён.

---

## Настройка `deploy.php`

Минимальный пример для двух окружений:

```php
<?php

namespace Deployer;

require 'recipe/laravel.php';

set('application', 'bzr-mediaspace');
set('repository', 'git@github.com:mhavg/BZRMediaSpace.git');
set('keep_releases', 5);

set('shared_files', ['.env']);
set('shared_dirs', ['storage']);
set('writable_dirs', ['bootstrap/cache', 'storage']);

host('test')
    ->setHostname('192.168.5.11')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '/var/www/bzr-mediaspace')
    ->set('branch', 'develop');

host('production')
    ->setHostname('lgm.by')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '/var/www/www-root/data/www/lgm.by_2')
    ->set('branch', 'main');

after('deploy:failed', 'deploy:unlock');
```

Полный пример: [laravel-deployer-demo/deploy.php](https://github.com/PHPtoday-ru/laravel-deployer-demo/blob/master/deploy.php).

---

## Миграции и сиды

Миграции запускаются **автоматически** при деплое (задача `deploy:migrate` в Laravel-рецепте).

Сиды и ручные команды — **со стороны сервера**, в папке активного релиза:

```bash
ssh deployer@lgm
cd /var/www/bzr-hr/releases/6

php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=CardSeeder
```

Если на сервере несколько версий PHP:

```bash
/usr/bin/php8.1 artisan migrate:status
/usr/bin/php8.1 artisan db:seed --class=BoardSideMaterialsTable
```

---

## Основные команды

```bash
dep deploy test              # деплой на TEST
dep deploy production        # деплой на PROD
dep deploy test -vvv         # деплой с подробным логом
dep rollback test            # откат на предыдущий релиз
dep rollback production
dep releases production      # список релизов
dep artisan production -- migrate:status
dep ssh production           # SSH в папку деплоя
dep list laravel             # список задач рецепта
```

---

## Подготовка сервера

### SSH

```bash
ssh-keygen -t ed25519 -C "deploy"
ssh-copy-id deployer@192.168.5.11
ssh deployer@192.168.5.11
```

### Права на папки

```bash
sudo mkdir -p /var/www/bzr-mediaspace
sudo chown -R deployer:www-data /var/www/bzr-mediaspace
```

### Nginx

Корень сайта — `current/public`:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/bzr-mediaspace/current/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### `.env` на сервере

Перед первым деплоем:

```bash
ssh deployer@server
nano /var/www/bzr-mediaspace/shared/.env
```

### Deploy-ключ для GitHub

```bash
ssh-keygen -t ed25519 -C "deploy@bzr" -f ~/.ssh/deploy_bzr
cat ~/.ssh/deploy_bzr.pub
```

Публичный ключ → **GitHub → Settings → Deploy keys**.

---

## Прокси и hosts (Windows)

Для доступа к внутренним серверам и `.loc`-доменам добавьте в `C:\Windows\System32\drivers\etc\hosts`:

```
192.168.3.69 portal.grevtsov.by bzr-analytics.loc bzr-mediaspace.loc lgm.loc bzra.loc bzr-hr.loc bzr.hr
```

Справочный список доменов проекта:

```
portal.grevtsov.by
192.168.3.69
bzr-analytics.loc
bzr-mediaspace.loc
lgm.loc
bzra.loc
bzr-hr.loc
bzr.hr
```

---

## Логи и диагностика

### Логи Laravel на сервере

```bash
/var/www/bzr-mediaspace/shared/storage/logs/laravel.log
```

### Проверка интернета на сервере

> **Всегда проверяйте интернет на сервере** перед деплоем — без него не сработает `git clone` и `composer install`.

```bash
ping google.com
```

### Подробный вывод деплоя

```bash
dep deploy test -vvv
dep deploy production -vvv
```

Если непонятно, почему деплой не прошёл — сначала смотрите вывод с `-vvv`, затем логи в `shared/storage/logs/`.

---

## Типичные ошибки и решения

### `cross-env: Permission denied` (npm)

```
Exit Code: 127 (Command not found)
sh: 1: cross-env: Permission denied
npm ERR! command sh -c npm run production
```

**Решение:** удалить все релизы на сервере и симлинк `current`, затем задеплоить заново:

```bash
ssh deployer@server
cd /var/www/bzr-mediaspace
rm -rf releases/*
rm -f current
```

После этого с локальной машины или из Homestead:

```bash
dep deploy test
```

---

### `git clone` failed (Exit Code: 128)

```
The command "ssh ... git clone -b develop ..." failed.
Exit Code: 128
```

**Причина:** нет доступа к интернету или к GitHub с сервера.

**Решение:**

```bash
ping google.com
```

Если ping не проходит — настроить DNS:

```bash
sudo nano /etc/resolv.conf
```

```
nameserver 8.8.8.8
options edns0 trust-ad
search
```

---

### `Table already exists` при миграции

```
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'route_metro_images' already exists
```

**Причина:** миграция уже была применена, но Deployer пытается выполнить её снова (чистая БД vs существующие таблицы).

**Решение:** проверить статус миграций на сервере:

```bash
cd /var/www/bzr-mediaspace/current
php artisan migrate:status
```

При необходимости — откатить проблемную миграцию или синхронизировать состояние БД вручную. **Перед любыми действиями — бэкап БД.**

---

### Несовместимая версия PHP (production)

```
Root composer.json requires php ^8.1 but your php version (8.0.28) does not satisfy that requirement.
laravel/horizon v5.22.1 requires ext-posix * -> it is missing from your system.
```

**Проблемы:**

1. Проект требует PHP **^8.1**, на сервере стоит **8.0.x**
2. Не установлено расширение **posix** (нужно для `laravel/horizon`)

**Решение — обновить PHP на сервере до 8.1+:**

```bash
php --ini
sudo nano /etc/php/8.0/cli/php.ini   # включить extension=posix, если есть
```

Проверить доступные версии:

```bash
update-alternatives --list php
/usr/bin/php8.1 -v
```

Использовать нужную версию явно:

```bash
/usr/bin/php8.1 artisan migrate:status
/usr/local/bin/php8.1 /usr/local/bin/composer update
```

Убедиться, что Nginx и PHP-FPM тоже переключены на 8.1 (см. [Linux](../linux/README.md) и [Vagrant](../vagrant/README.md)).

---

### Прочие ошибки

| Ошибка | Решение |
|--------|---------|
| `Permission denied (publickey)` | Проверить SSH: `ssh deployer@server` |
| `Could not open input file: artisan` | Неверный `deploy_path` или не Laravel-репозиторий |
| `storage` не пишется | `chmod -R ug+rwx shared/storage` |
| Долгий деплой | `composer install --no-dev` на production |
| Нет интернета на сервере | DNS `8.8.8.8` в `/etc/resolv.conf`, проверить `ping google.com` |

---

## Чеклист перед деплоем

- [ ] Бэкап базы данных
- [ ] `git commit` + `git push`
- [ ] Интернет на сервере (`ping google.com`)
- [ ] Версия PHP на сервере совпадает с `composer.json`
- [ ] `.env` в `shared/` настроен
- [ ] `keep_releases` выставлен (рекомендуется 5)
- [ ] При ошибках — `dep deploy <host> -vvv`
