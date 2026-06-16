# MySQL

> Официальная документация: [dev.mysql.com/doc](https://dev.mysql.com/doc/)  
> Руководство (RU): [metanit.com/sql/mysql](https://metanit.com/sql/mysql/)

MySQL — реляционная СУБД. Данные хранятся в таблицах; связи между таблицами задаются через ключи.

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Установка, клиенты, подключение |
| [2. Структура данных](structure.md) | Базы, таблицы, типы, внешние ключи |
| [3. Основные операции](crud.md) | INSERT, SELECT, UPDATE, DELETE |
| [4. Запросы](queries.md) | Фильтры, сортировка, агрегаты, подзапросы, транзакции |
| [5. Соединение таблиц](joins.md) | JOIN, UNION |
| [6. Встроенные функции](functions.md) | Строки, числа, даты, CASE, IF |

## Laravel

Подключение и миграции: [Eloquent ORM](../laravel/eloquent.md), конфигурация в [configuration.md](../laravel/configuration.md).

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=
```
