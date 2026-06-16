# 4. Запросы

> Источник: [metanit.com — Запросы](https://metanit.com/sql/mysql/4.1.php)

## DISTINCT — уникальные значения

```sql
SELECT DISTINCT category_id FROM posts;
SELECT DISTINCT city FROM users ORDER BY city;
```

## ORDER BY — сортировка

```sql
SELECT * FROM posts ORDER BY published_at DESC;
SELECT * FROM users ORDER BY name ASC, created_at DESC;
```

## LIMIT — диапазон строк

```sql
SELECT * FROM posts ORDER BY id DESC LIMIT 10;
SELECT * FROM posts ORDER BY id DESC LIMIT 10 OFFSET 20;  -- пагинация: страница 3
```

## Агрегатные функции

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM posts WHERE published_at IS NOT NULL;
SELECT AVG(price) FROM products;
SELECT MIN(price), MAX(price) FROM products;
SELECT SUM(stock) FROM products;
```

## GROUP BY и HAVING

```sql
SELECT category_id, COUNT(*) AS total
FROM posts
GROUP BY category_id;

SELECT user_id, COUNT(*) AS posts_count
FROM posts
GROUP BY user_id
HAVING posts_count > 5;
```

| Ключевое слово | Когда использовать |
|----------------|-------------------|
| `WHERE` | Фильтр **до** группировки |
| `HAVING` | Фильтр **после** группировки |

## Подзапросы

Запрос внутри другого запроса.

### Скалярный подзапрос в WHERE

```sql
SELECT name, email
FROM users
WHERE id = (
    SELECT user_id
    FROM posts
    GROUP BY user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);
```

### IN

```sql
SELECT title, category_id
FROM posts
WHERE category_id IN (
    SELECT category_id
    FROM posts
    GROUP BY category_id
    HAVING COUNT(*) > 10
);
```

### Подзапрос в FROM (производная таблица)

```sql
SELECT category_avg.category_id, category_avg.avg_price
FROM (
    SELECT category_id, AVG(price) AS avg_price
    FROM products
    GROUP BY category_id
) AS category_avg
WHERE category_avg.avg_price > (
    SELECT AVG(price) FROM products
);
```

### Подзапрос в SELECT

```sql
SELECT
    p.title,
    (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count
FROM posts p;
```

## EXISTS

Проверка наличия связанных строк:

```sql
SELECT id, name
FROM users u
WHERE EXISTS (
    SELECT 1 FROM comments c WHERE c.user_id = u.id
);

SELECT title FROM posts p
WHERE NOT EXISTS (
    SELECT 1 FROM comments c WHERE c.post_id = p.id
);
```

## Подзапросы в INSERT, UPDATE, DELETE

```sql
INSERT INTO users_archive (name, email)
SELECT name, email FROM users WHERE is_active = 0;

UPDATE products
SET price = price * 0.9
WHERE category_id IN (SELECT id FROM categories WHERE name = 'Распродажа');

DELETE FROM posts
WHERE user_id IN (SELECT id FROM users WHERE is_active = 0);
```

## Транзакции

Группа запросов выполняется целиком или откатывается.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

COMMIT;
-- ROLLBACK;
```

### SAVEPOINT

```sql
START TRANSACTION;

INSERT INTO users (name, email) VALUES ('Анна', 'anna@example.com');
SAVEPOINT after_user;

INSERT INTO posts (user_id, category_id, title, body)
VALUES (LAST_INSERT_ID(), 1, 'Черновик', 'Текст');

ROLLBACK TO SAVEPOINT after_user;
COMMIT;
```

### Уровни изоляции

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
-- запросы...
COMMIT;
```

| Уровень | Описание |
|---------|----------|
| `READ COMMITTED` | Только зафиксированные данные |
| `REPEATABLE READ` | По умолчанию в InnoDB |
| `SERIALIZABLE` | Максимальная изоляция |

В Laravel:

```php
use Illuminate\Support\Facades\DB;

DB::transaction(function () {
    $user = User::create(['name' => 'Иван', 'email' => 'ivan@example.com']);
    Post::create(['user_id' => $user->id, 'title' => 'Пост', 'body' => '...']);
});
```

Следующая глава: [Соединение таблиц](joins.md).
