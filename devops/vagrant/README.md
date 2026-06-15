# Vagrant

> Официальная документация: [developer.hashicorp.com/vagrant](https://developer.hashicorp.com/vagrant/docs)

Vagrant — инструмент для создания и управления виртуальными машинами.

## Установка

1. [VirtualBox](https://www.virtualbox.org/) или VMware
2. [Vagrant](https://developer.hashicorp.com/vagrant/install)

```bash
vagrant --version
```

## Быстрый старт

`Vagrantfile`:

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
vagrant up        # Запустить VM
vagrant ssh       # Подключиться по SSH
vagrant halt      # Остановить
vagrant destroy   # Удалить VM
```

## Laravel Homestead

```bash
composer require laravel/homestead --dev
php vendor/bin/homestead make
vagrant up
```

Homestead — готовый Vagrant-образ для Laravel с PHP, Nginx, MySQL, Redis.
