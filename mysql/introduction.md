# 1. Введение в MySQL

> Источник: [metanit.com — Введение в MySQL](https://metanit.com/sql/mysql/1.1.php)

MySQL — популярная реляционная СУБД с открытым исходным кодом. Используется в Laravel, WordPress и большинстве PHP-проектов.

## Установка (Windows)

| Способ | Ссылка |
|--------|--------|
| MySQL Installer | [dev.mysql.com/downloads/installer](https://dev.mysql.com/downloads/installer/) |
| Laravel Herd Pro | [herd.laravel.com](https://herd.laravel.com/) |
| DBngin | [dbngin.com](https://dbngin.com/) |

После установки сервер слушает порт **3306**.

## Клиенты

### MySQL Command Line Client

Консольный клиент, входит в MySQL Installer:

```bash
mysql -u root -p
```

```sql
SHOW DATABASES;
SELECT VERSION();
```

### MySQL Shell

Современная оболочка с поддержкой JavaScript и Python:

```bash
mysqlsh
\sql
\connect root@localhost
```

Документация: [dev.mysql.com/doc/mysql-shell](https://dev.mysql.com/doc/mysql-shell/8.0/en/)

### MySQL Workbench

Графический клиент — визуальный редактор схемы, SQL-запросы, экспорт/импорт.

Скачать: [dev.mysql.com/downloads/workbench](https://dev.mysql.com/downloads/workbench/)

| Возможность | Описание |
|-------------|----------|
| SQL Editor | Выполнение запросов |
| EER Diagram | Визуальная схема таблиц |
| Data Export | Бэкап базы |

## Создание базы данных

```sql
CREATE DATABASE myapp
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE myapp;
```

```sql
DROP DATABASE IF EXISTS myapp;
```

> `utf8mb4` поддерживает emoji и полный Unicode. Используйте его в новых проектах.

## Полезные команды

```sql
SHOW DATABASES;
SHOW TABLES;
DESCRIBE users;
SHOW CREATE TABLE users;
SHOW PROCESSLIST;
```

Следующая глава: [Структура данных](structure.md).
