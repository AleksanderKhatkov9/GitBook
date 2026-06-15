# MySQL

> Официальная документация: [dev.mysql.com/doc](https://dev.mysql.com/doc/)

MySQL — реляционная система управления базами данных.

## Установка (Windows)

Скачайте [MySQL Installer](https://dev.mysql.com/downloads/installer/) или используйте [Laravel Herd Pro](https://herd.laravel.com/) / [DBngin](https://dbngin.com/).

## Подключение

```bash
mysql -u root -p
```

## Основные команды

```sql
SHOW DATABASES;
CREATE DATABASE myapp;
USE myapp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
INSERT INTO users (name, email) VALUES ('Иван', 'ivan@example.com');
UPDATE users SET name = 'Пётр' WHERE id = 1;
DELETE FROM users WHERE id = 1;
```

## Подключение из Laravel

В `.env`:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=
```

```bash
php artisan migrate
```
