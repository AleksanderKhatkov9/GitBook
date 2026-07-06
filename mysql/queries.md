# 5. Запросы

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

---

## Примеры из реального проекта

Запросы из production-проекта **bzr_mediaspace** — система учёта наружной рекламы (конструкции, стороны, операторы, города).

### Схема данных

| Таблица | Назначение |
|---------|------------|
| `boards` | Рекламные конструкции (адрес, размер, тип, город, клиент) |
| `board_sides` | Стороны конструкции (A/B и т.д.) |
| `board_types` | Типы: билборд, ситиборд, брандмауэр… |
| `clients` | Операторы / рекламные компании |
| `cities` | Города |
| `order_statistics` | Статистика заказов по периодам |

Связи: `boards` → `board_sides`, `clients`, `cities`, `board_types`.

---

### Базовые выборки

Все конструкции:

```sql
SELECT * FROM bzr_mediaspace.boards;
```

Количество конструкций по городу и клиенту:

```sql
SELECT COUNT(id)
FROM bzr_mediaspace.boards
WHERE city_id = 85
  AND client_id = 334;
```

Количество сторон с JOIN по клиенту и городу:

```sql
SELECT COUNT(board_sides.id)
FROM bzr_mediaspace.boards
JOIN board_sides ON boards.id = board_sides.board_id
JOIN cities ON cities.id = boards.city_id
JOIN clients ON clients.id = boards.client_id
WHERE clients.company_name = 'ОранжДолфинПлюс'
  AND cities.name = 'Пинск';
```

---

### GROUP BY — конструкции по городам и операторам

Количество сторон по всем городам одного оператора:

```sql
SELECT
    MIN(board_sides.id) AS board_sides_id,
    clients.company_name,
    cities.name AS city_name,
    COUNT(board_sides.id) AS sides_count
FROM bzr_mediaspace.boards
JOIN board_sides ON boards.id = board_sides.board_id
JOIN cities ON cities.id = boards.city_id
JOIN clients ON clients.id = boards.client_id
WHERE clients.company_name = 'Белвнешреклама'
GROUP BY clients.company_name, cities.name
ORDER BY cities.name ASC, clients.company_name ASC;
```

Список конструкций оператора в конкретном городе:

```sql
SELECT
    boards.id,
    cities.name AS city_name,
    boards.address,
    boards.size
FROM bzr_mediaspace.boards
JOIN board_sides ON boards.id = board_sides.board_id
JOIN cities ON cities.id = boards.city_id
JOIN clients ON clients.id = boards.client_id
WHERE clients.company_name = 'Белвнешреклама'
  AND cities.name = 'Кобрин';
```

---

### Статистика Nova — конструкции и стороны

Запросы из метода `showAllNumberSidesNovaBoardSelect`.

Конструкции определённого типа с группировкой:

```sql
SELECT
    boards.id,
    boards.city_id,
    clients.company_name,
    cities.name,
    board_types.title
FROM boards
JOIN clients ON clients.id = boards.client_id
JOIN cities ON cities.id = boards.city_id
JOIN board_types ON board_types.id = boards.type_id
WHERE boards.type_id = 1
GROUP BY boards.id;
```

Подсчёт сторон по типу конструкции:

```sql
SELECT
    board_sides.id,
    boards.city_id,
    boards.id,
    COUNT(*) AS count_board_sides
FROM board_sides
JOIN boards ON boards.id = board_sides.board_id
JOIN cities ON cities.id = boards.city_id
JOIN board_types ON board_types.id = boards.type_id
WHERE boards.type_id = 1
GROUP BY board_sides.id;
```

`COUNT(DISTINCT)` + `LEFT JOIN` — конструкции и стороны по типу и городу:

```sql
SELECT
    board_types.title,
    cities.name AS city,
    COUNT(DISTINCT boards.id) AS count,
    COUNT(board_sides.id) AS count_board_sides
FROM boards
JOIN clients ON clients.id = boards.client_id
JOIN cities ON cities.id = boards.city_id
JOIN board_types ON board_types.id = boards.type_id
LEFT JOIN board_sides ON board_sides.board_id = boards.id
WHERE boards.type_id IN (1, 2)
GROUP BY boards.type_id, board_types.title, cities.name;
```

> `COUNT(DISTINCT boards.id)` — уникальные конструкции.  
> `COUNT(board_sides.id)` — все стороны (без `DISTINCT`, т.к. каждая сторона — отдельная строка).

---

### Аналитика `#boards`

#### 1. По типу конструкции в РБ

```sql
EXPLAIN ANALYZE
SELECT
    bt.title,
    COUNT(DISTINCT b.id) AS board_count,
    COUNT(bs.id) AS board_sides_count
FROM bzr_mediaspace.boards b
JOIN board_types bt ON bt.id = b.type_id
LEFT JOIN board_sides bs ON bs.board_id = b.id
WHERE bt.title IN (
    'Билборд', 'Брандмауэр', 'Видео билборд', 'Конструкция', 'Короб',
    'Лайтпостер', 'Мегаборд', 'Настенник', 'Путепровод', 'Растяжка',
    'Ситиборд', 'Указатель'
)
GROUP BY bt.id, bt.title;
```

#### 2. По операторам в РБ

Фильтр по названию типа:

```sql
EXPLAIN ANALYZE
SELECT
    cl.company_name,
    COUNT(DISTINCT b.id) AS count,
    COUNT(DISTINCT bs.id) AS count_board_sides_city
FROM boards b
JOIN clients cl ON cl.id = b.client_id
JOIN board_types bt ON bt.id = b.type_id
LEFT JOIN board_sides bs ON bs.board_id = b.id
WHERE cl.company_name IN ('А2-реклама', 'Адверком', 'Ай Ди Про', 'Белвнешреклама')
  AND cl.deleted_at IS NULL
  AND bt.title IN (
      'Билборд', 'Брандмауэр', 'Видео билборд', 'Конструкция', 'Короб',
      'Лайтпостер', 'Мегаборд', 'Настенник', 'Путепровод', 'Растяжка',
      'Ситиборд', 'Указатель'
  )
GROUP BY cl.company_name;
```

Тот же запрос — фильтр по `type_id` (быстрее при индексе):

```sql
SELECT
    cl.company_name,
    COUNT(DISTINCT b.id) AS count,
    COUNT(DISTINCT bs.id) AS count_board_sides_city
FROM boards b
JOIN clients cl ON cl.id = b.client_id
JOIN board_types bt ON bt.id = b.type_id
LEFT JOIN board_sides bs ON bs.board_id = b.id
WHERE cl.company_name IN ('А2-реклама', 'Адверком', 'Ай Ди Про', 'Белвнешреклама')
  AND b.type_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
  AND cl.deleted_at IS NULL
GROUP BY cl.company_name;
```

#### 3. По операторам в городе (Минск, `city_id = 219`)

```sql
EXPLAIN ANALYZE
SELECT
    bt.title,
    c.name AS city,
    COUNT(DISTINCT b.id) AS count,
    COUNT(DISTINCT bs.id) AS count_board_sides
FROM boards b
JOIN clients cl ON cl.id = b.client_id
JOIN cities c ON c.id = b.city_id
JOIN board_types bt ON bt.id = b.type_id
LEFT JOIN board_sides bs ON bs.board_id = b.id
WHERE b.city_id = 219
  AND cl.company_name IN ('А2-реклама', 'Адверком', 'Ай Ди Про', 'Белвнешреклама')
  AND b.type_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
GROUP BY bt.title, c.name;
```

#### 4. Сводка по операторам в Минске

```sql
SELECT
    c.name AS name,
    cl.company_name,
    COUNT(DISTINCT b.id) AS count_boards,
    COUNT(bs.id) AS count_board_sides
FROM boards b
INNER JOIN cities c ON c.id = b.city_id
INNER JOIN clients cl ON cl.id = b.client_id
LEFT JOIN board_sides bs ON bs.board_id = b.id
WHERE b.city_id = 219
  AND cl.company_name IN ('А2-реклама', 'Адверком', 'Ай Ди Про', 'Белвнешреклама')
  AND b.type_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
GROUP BY c.name, cl.company_name
ORDER BY cl.company_name;
```

---

### Аналитика `#orders` — таблица `order_statistics`

Период: `2026-04-01` — `2026-04-13`. Город `city_id = 258`.

#### 1. По типу конструкции и городу

```sql
EXPLAIN ANALYZE
SELECT
    bt.title,
    c.name AS city,
    COUNT(DISTINCT os.model_id) AS count,
    COUNT(os.id) AS count_board_sides
FROM order_statistics os
JOIN board_types bt ON bt.id = os.type_id
JOIN cities c ON c.id = os.city_id
WHERE os.created_at BETWEEN '2026-04-01' AND '2026-04-13'
GROUP BY bt.title, c.name
ORDER BY bt.title;
```

#### 2. По операторам и городам

```sql
EXPLAIN ANALYZE
SELECT
    cl.company_name AS client,
    c.name AS city,
    COUNT(DISTINCT os.model_id) AS count,
    COUNT(os.id) AS count_board_sides
FROM order_statistics os
JOIN clients cl ON cl.id = os.client_id
JOIN cities c ON c.id = os.city_id
WHERE os.created_at BETWEEN '2026-04-01' AND '2026-04-13'
GROUP BY cl.company_name, c.name
ORDER BY cl.company_name;
```

#### 3. По типу конструкции в конкретном городе

```sql
EXPLAIN ANALYZE
SELECT
    bt.title,
    c.name AS city,
    COUNT(DISTINCT os.model_id) AS count,
    COUNT(os.id) AS count_board_sides
FROM order_statistics os
JOIN board_types bt ON bt.id = os.type_id
JOIN cities c ON c.id = os.city_id
WHERE os.city_id = 258
  AND os.created_at BETWEEN '2026-04-01' AND '2026-04-13'
GROUP BY bt.title, c.name
ORDER BY bt.title;
```

#### 4. По операторам в конкретном городе

```sql
EXPLAIN ANALYZE
SELECT
    c.name AS city,
    cl.company_name AS client,
    COUNT(DISTINCT os.model_id) AS count,
    COUNT(os.id) AS count_board_sides
FROM order_statistics os
JOIN clients cl ON cl.id = os.client_id
JOIN cities c ON c.id = os.city_id
WHERE os.city_id = 258
  AND os.created_at BETWEEN '2026-04-01' AND '2026-04-13'
GROUP BY c.name, cl.company_name
ORDER BY cl.company_name;
```

### EXPLAIN ANALYZE

`EXPLAIN ANALYZE` (MySQL 8.0.18+) выполняет запрос и показывает фактический план выполнения:

```sql
EXPLAIN ANALYZE
SELECT ...;
```

Используется при оптимизации тяжёлых отчётов с несколькими `JOIN` и `GROUP BY`.

---

Следующая глава: [Соединение таблиц](joins.md).
