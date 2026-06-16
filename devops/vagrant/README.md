# Vagrant

> Официальная документация: [developer.hashicorp.com/vagrant](https://developer.hashicorp.com/vagrant/docs)  
> Vagrant Boxes: [developer.hashicorp.com/vagrant/docs/boxes](https://developer.hashicorp.com/vagrant/docs/boxes)

Vagrant — инструмент для создания и управления виртуальными машинами.

## Документация и видео

### Laravel Homestead

| Ресурс | Ссылка |
|--------|--------|
| Homestead 8.x (RU) | [laravel.su/docs/8.x/homestead](https://laravel.su/docs/8.x/homestead) |
| Homestead 11.x (RU) | [laravel.su/docs/11.x/homestead](https://laravel.su/docs/11.x/homestead) |

### Видео

| Тема | Ссылка |
|------|--------|
| Homestead | [YouTube](https://www.youtube.com/watch?v=WdZjv2_e080) |
| Homestead | [YouTube](https://www.youtube.com/watch?v=_ett8eVVHws) |
| Настройка | [YouTube](https://www.youtube.com/watch?v=BB08hIBqQN0) |

---

## Установка

1. [VirtualBox](https://www.virtualbox.org/) или VMware
2. [Vagrant](https://developer.hashicorp.com/vagrant/install)

```bash
vagrant --version
```

---

## Основные команды Vagrant

```bash
# Запуск виртуальной машины
vagrant up

# Остановка виртуальной машины
vagrant halt

# Перезагрузка виртуальной машины
vagrant reload

# Подключение к виртуальной машине через SSH
vagrant ssh

# Уничтожение виртуальной машины (с удалением всех данных)
vagrant destroy

# Пересоздание виртуальной машины с применением provision-скриптов
vagrant up --provision
# или
vagrant reload --provision
```

---

## Laravel Homestead

Homestead — готовый Vagrant-образ для Laravel с PHP, Nginx, MySQL, Redis.

```bash
composer require laravel/homestead --dev
php vendor/bin/homestead make
vagrant up
```

После `homestead make` настраивается файл `Homestead.yaml` (в каталоге `~/.homestead/` или в корне проекта).

### Пример Homestead.yaml

```yaml
ip: 192.168.56.56
memory: 2048
cpus: 2
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
    - ~/.ssh/id_rsa
    - ~/.ssh/id_rsa.pub

folders:
    - map: C:\OSPanel\domains\BZRAnalytics
      to: /home/vagrant/bzr-analytics
    - map: C:\OSPanel\domains\BZRMediaSpace
      to: /home/vagrant/bzr-mediaspace
    - map: C:\OSPanel\domains\BZRhr
      to: /home/vagrant/bzr-hr

sites:
    - map: bzr-analytics.loc
      to: /home/vagrant/bzr-analytics/public
      php: "8.1"
      schedule: true
    - map: bzr-mediaspace.loc
      to: /home/vagrant/bzr-mediaspace/public
      php: "8.1"
      schedule: true
    - map: bzr-hr.loc
      to: /home/vagrant/bzr-hr/public
      php: "8.1"
      schedule: true

databases:
    - bzr_analytics
    - bzr_mediaspace
    - bzr_hr

features:
    - mysql: true
    - mariadb: false
    - postgresql: false
    - ohmyzsh: false
    - webdriver: false

services:
    - enabled:
          - "mysql"
#    - disabled:
#        - "postgresql@11-main"

ports:
    - send: 33060 # MySQL/MariaDB
```

| Параметр | Описание |
|----------|----------|
| `folders` | Синхронизация папок Windows → VM |
| `sites` | Виртуальные хосты Nginx и версия PHP |
| `databases` | Базы, создаваемые при `vagrant up` |
| `schedule` | Запуск Laravel Scheduler для сайта |
| `ports` | Проброс портов (например MySQL на хост) |

После изменения `Homestead.yaml`:

```bash
vagrant reload --provision
```

### Прокси (hosts)

Добавьте домены в файл hosts на Windows (`C:\Windows\System32\drivers\etc\hosts`):

```
192.168.56.56 bzr-analytics.loc bzr-mediaspace.loc bzr-hr.loc
```

Пример расширенного списка для прокси/hosts:

```
192.168.3.69;bzr-analytics.loc;bzr-mediaspace.loc;bzr-hr.loc;lgm.loc;bzra.loc;bzr.hr;portal.grevtsov.by;10.66.71.2:1500;10.66.71.3:1500;185.179.80.130;svh7.hoster.by;shop.loc;bzr-lgm2.loc;lgm2.loc
```

> В `hosts` каждый домен указывается через пробел после IP. Строка выше — справочный список; для локальной разработки обычно достаточно IP Homestead (`192.168.56.56`) и `.loc`-доменов из `sites`.

---

## Полная переустановка VM

Если окружение «сломалось» или нужно пересоздать БД с нуля:

```bash
vagrant destroy    # удаляет VM и данные БД внутри неё
vagrant up --provision
# или
vagrant reload --provision
```

Затем пересоберите проект (зависимости, миграции) внутри VM:

```bash
vagrant ssh
cd /home/vagrant/bzr-analytics
composer install
php artisan migrate
```

---

## Смена версии PHP

Выполняется **внутри** виртуальной машины (`vagrant ssh`).

### Проверить доступные версии

```bash
update-alternatives --list php
```

### PHP CLI — версия по умолчанию

```bash
sudo update-alternatives --set php /usr/bin/php8.1
```

### PHP-FPM (для Nginx)

```bash
sudo service php8.2-fpm stop
sudo service php8.1-fpm start
```

После смены FPM перезагрузите Nginx:

```bash
sudo service nginx reload
```

> Версия PHP для конкретного сайта задаётся в `Homestead.yaml` (`php: "8.1"` в блоке `sites`) и применяется через `vagrant reload --provision`.

---

## Установка Node.js 16

Внутри VM (`vagrant ssh`):

```bash
# 1. Скачиваем NodeSource setup для 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

# 2. Ставим Node.js и npm
sudo apt-get install -y nodejs

# 3. Проверяем версии
node -v
npm -v
```

---

## Быстрый старт (без Homestead)

Минимальный `Vagrantfile`:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx php php-mysql
  SHELL
end
```

```bash
vagrant up
vagrant ssh
vagrant halt
vagrant destroy
```
