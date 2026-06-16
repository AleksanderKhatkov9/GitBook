# 5. Соединение таблиц

> Источник: [metanit.com — Соединение таблиц](https://metanit.com/sql/mysql/5.1.php)

Схема для примеров:

```
users ──< posts ──< comments
          │
categories ┘
```

```sql
CREATE TABLE comments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Неявное соединение (WHERE)

Старый синтаксис — эквивалент `INNER JOIN`:

```sql
SELECT posts.title, users.name AS author
FROM posts, users
WHERE posts.user_id = users.id;
```

> Рекомендуется явный `JOIN` — он читается лучше.

## INNER JOIN

Только строки с совпадением в обеих таблицах:

```sql
SELECT
    posts.id,
    posts.title,
    users.name AS author,
    categories.name AS category
FROM posts
INNER JOIN users ON users.id = posts.user_id
INNER JOIN categories ON categories.id = posts.category_id
WHERE posts.published_at IS NOT NULL
ORDER BY posts.published_at DESC;
```

## LEFT JOIN (LEFT OUTER JOIN)

Все строки из левой таблицы + совпадения справа (или `NULL`):

```sql
SELECT
    users.id,
    users.name,
    COUNT(posts.id) AS posts_count
FROM users
LEFT JOIN posts ON posts.user_id = users.id
GROUP BY users.id, users.name
ORDER BY posts_count DESC;
```

## RIGHT JOIN (RIGHT OUTER JOIN)

Все строки из правой таблицы + совпадения слева:

```sql
SELECT posts.title, categories.name
FROM posts
RIGHT JOIN categories ON categories.id = posts.category_id;
```

Категории без постов тоже попадут в результат (`title` будет `NULL`).

## FULL OUTER JOIN

MySQL не поддерживает `FULL OUTER JOIN` напрямую. Эмуляция через `UNION`:

```sql
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON posts.user_id = users.id
UNION
SELECT users.name, posts.title
FROM users
RIGHT JOIN posts ON posts.user_id = users.id;
```

## Несколько уровней связей

```sql
SELECT
    posts.title AS post_title,
    comments.body AS comment_body,
    users.name AS comment_author
FROM comments
INNER JOIN posts ON posts.id = comments.post_id
INNER JOIN users ON users.id = comments.user_id
WHERE posts.id = 5;
```

## UNION — объединение результатов

```sql
SELECT name, email FROM users WHERE is_active = 1
UNION
SELECT name, email FROM users_archive;

-- UNION ALL — с дубликатами
SELECT title FROM posts WHERE category_id = 1
UNION ALL
SELECT title FROM posts WHERE category_id = 2;
```

| Оператор | Дубликаты |
|----------|-----------|
| `UNION` | Убирает |
| `UNION ALL` | Сохраняет |

Следующая глава: [Встроенные функции](functions.md).
