# 4. Основные операции с данными

> Источник: [metanit.com — Основные операции с данными](https://metanit.com/sql/mysql/3.1.php)

## INSERT — добавление данных

```sql
INSERT INTO users (name, email)
VALUES ('Иван', 'ivan@example.com');

INSERT INTO categories (name)
VALUES ('Новости'), ('Статьи'), ('Обзоры');

-- вставка из другой таблицы
INSERT INTO users_archive (name, email)
SELECT name, email FROM users WHERE is_active = 0;
```

## SELECT — выборка данных

```sql
SELECT * FROM users;
SELECT id, name, email FROM users;
SELECT name AS user_name FROM users;
```

## WHERE — фильтрация

```sql
SELECT * FROM users WHERE is_active = 1;
SELECT * FROM products WHERE price > 100 AND stock > 0;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM posts WHERE published_at IS NOT NULL;
SELECT * FROM products WHERE id IN (1, 2, 5);
SELECT * FROM users WHERE name BETWEEN 'А' AND 'Я';
```

| Оператор | Описание |
|----------|----------|
| `=`, `<>`, `!=` | Равно / не равно |
| `>`, `<`, `>=`, `<=` | Сравнение |
| `AND`, `OR`, `NOT` | Логические |
| `IN`, `NOT IN` | В списке |
| `BETWEEN` | В диапазоне |
| `LIKE` | Шаблон (`%`, `_`) |
| `IS NULL` | Пустое значение |

## UPDATE — обновление

```sql
UPDATE users SET name = 'Пётр' WHERE id = 1;
UPDATE products SET price = price * 1.1 WHERE category_id = 2;
UPDATE users SET is_active = 0 WHERE last_login_at < '2024-01-01';
```

## DELETE — удаление

```sql
DELETE FROM users WHERE id = 1;
DELETE FROM posts WHERE published_at IS NULL;
DELETE FROM users WHERE is_active = 0;
```

> Без `WHERE` удалятся **все** строки таблицы. Перед массовым удалением делайте бэкап.

Следующая глава: [Запросы](queries.md).
