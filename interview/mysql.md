# MySQL — вопросы на собеседовании

Краткие ответы-ориентиры. Детали: [MySQL](../mysql/README.md), [Запросы](../mysql/queries.md), [JOIN](../mysql/joins.md), [ERD](../mysql/erd.md).

---

## Основы

### Что такое СУБД и чем MySQL отличается от СУБД «вообще»?

СУБД — система управления базами данных. MySQL — конкретная реляционная СУБД (таблицы, SQL, транзакции в InnoDB).

### Что такое первичный ключ (PRIMARY KEY)?

Уникальный идентификатор строки. Не может быть `NULL`. Часто `INT`/`BIGINT` AUTO_INCREMENT или UUID.

### Что такое внешний ключ (FOREIGN KEY)?

Столбец (или набор), ссылающийся на PRIMARY/UNIQUE другой таблицы. Обеспечивает целостность связей. Движок: обычно **InnoDB**.

### Чем InnoDB отличается от MyISAM?

| | InnoDB | MyISAM |
|--|--------|--------|
| Транзакции | Да | Нет |
| Внешние ключи | Да | Нет |
| Блокировки | Строковые | Табличные |
| Crash recovery | Лучше | Хуже |
| Сегодня по умолчанию | **InnoDB** | Устарел для большинства задач |

### Типы данных (часто спрашивают)

| Тип | Когда |
|-----|--------|
| `INT` / `BIGINT` | Целые, ID, счётчики |
| `DECIMAL(p,s)` | Деньги (не `FLOAT`) |
| `VARCHAR(n)` | Строки переменной длины |
| `TEXT` / `JSON` | Длинный текст / JSON-документы |
| `DATETIME` / `TIMESTAMP` | Даты; `TIMESTAMP` зависит от timezone сессии |
| `BOOLEAN` | По сути `TINYINT(1)` |
| `ENUM` | Фиксированный набор значений (спорно по удобству миграций) |

---

## CRUD и SELECT

### Базовый синтаксис

```sql
SELECT col1, col2
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
```

### `WHERE` vs `HAVING`

`WHERE` фильтрует строки **до** группировки. `HAVING` — **после** `GROUP BY` (условия на агрегаты: `HAVING COUNT(*) > 5`).

### Агрегатные функции

`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Часто с `GROUP BY`.

```sql
SELECT user_id, COUNT(*) AS orders_count
FROM orders
GROUP BY user_id
HAVING orders_count > 3;
```

### `DISTINCT`

Убирает дубликаты строк результата. Не замена правильной нормализации или `GROUP BY`.

### Подзапросы

```sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

Могут быть в `SELECT`, `FROM`, `WHERE`. Иногда лучше заменить JOIN'ом ради читаемости/плана.

---

## JOIN

### Виды соединений

| JOIN | Результат |
|------|-----------|
| `INNER JOIN` | Только совпавшие строки обеих таблиц |
| `LEFT JOIN` | Все слева + совпадения справа (`NULL`, если нет) |
| `RIGHT JOIN` | Симметрично RIGHT (на практике чаще пишут LEFT) |
| `CROSS JOIN` | Декартово произведение |
| `FULL OUTER JOIN` | В чистом MySQL нет; эмулируют UNION LEFT+RIGHT |

```sql
SELECT u.name, o.id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
```

### Когда `ON`, когда `WHERE` при JOIN?

Условие связи — в `ON`. Доп. фильтр результата — в `WHERE`. Для `LEFT JOIN` фильтр по правой таблице в `WHERE` может «съесть» строки с `NULL` (превратит в поведение как INNER).

### Типичная задача

«Вывести пользователей без заказов»:

```sql
SELECT u.*
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;
```

---

## Индексы

### Зачем нужны индексы?

Ускоряют поиск, сортировку, JOIN по ключу. Цена: место на диске + замедление INSERT/UPDATE.

### Какие индексы бывают?

| Тип | Назначение |
|-----|------------|
| PRIMARY | Кластерный в InnoDB (данные рядом с PK) |
| UNIQUE | Уникальность + поиск |
| INDEX (KEY) | Обычный неуникальный |
| FULLTEXT | Полнотекстовый поиск |
| Составной (col1, col2) | Поиск по префиксу ключа слева направо |

### Правило leftmost prefix

Индекс `(a, b, c)` помогает для `a`, `a+b`, `a+b+c`. Не помогает эффективно для только `b` или только `c`.

### Когда индекс не помогает?

- Функция от столбца: `WHERE YEAR(created_at) = 2024` — лучше диапазон дат.
- Ведущий `%` в `LIKE '%abc'`.
- Низкая селективность (почти все строки одинаковые).
- Маленькие таблицы (full scan дешевле).

### Как смотреть план?

```sql
EXPLAIN SELECT ...;
-- в новых версиях полезен EXPLAIN ANALYZE
```

Смотрят: `type` (`ref`, `range`, `ALL`), `key`, `rows`, `Extra` (`Using filesort`, `Using temporary`).

---

## Транзакции и изоляция

### Что такое транзакция?

Группа операций: либо все применяются, либо ни одна (атомарность).

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- при ошибке: ROLLBACK;
```

### ACID

| | |
|--|--|
| **A**tomicity | Всё или ничего |
| **C**onsistency | БД переходит из одного согласованного состояния в другое |
| **I**solation | Параллельные транзакции не мешают друг другу «как попало» |
| **D**urability | После COMMIT данные не теряются |

### Уровни изоляции (InnoDB)

| Уровень | Феномены |
|---------|----------|
| READ UNCOMMITTED | Грязное чтение |
| READ COMMITTED | Нет dirty read; возможны non-repeatable |
| REPEATABLE READ | По умолчанию в MySQL; стабильный снимок (MVCC) |
| SERIALIZABLE | Самый строгий, больше блокировок |

Часто спрашивают: dirty read, non-repeatable read, phantom read.

---

## Нормализация и проектирование

### Зачем нормализация?

Убрать избыточность и аномалии обновления. Типично до **3NF**.

| Форма | Идея |
|-------|------|
| 1NF | Атомарные значения, нет повторяющихся групп |
| 2NF | 1NF + нет частичной зависимости от составного ключа |
| 3NF | 2NF + нет транзитивных зависимостей неключевых атрибутов |

### Связи

| Связь | Как в таблицах |
|-------|----------------|
| 1:1 | FK уникальный с одной стороны |
| 1:N | FK на стороне «многих» |
| N:M | Промежуточная (pivot) таблица с двумя FK |

### Денормализация

Иногда осознанно дублируют данные ради скорости чтения (кэш-поля, счётчики). Нужно понимать trade-off.

---

## Продвинутые темы (middle+)

### `UNION` vs `UNION ALL`

`UNION` убирает дубликаты (дороже). `UNION ALL` сохраняет все строки.

### Оконные функции (MySQL 8+)

```sql
SELECT
  user_id,
  amount,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS rn
FROM payments;
```

`ROW_NUMBER`, `RANK`, `SUM() OVER (...)`.

### CTE (`WITH`)

```sql
WITH active_users AS (
  SELECT id FROM users WHERE status = 'active'
)
SELECT * FROM orders WHERE user_id IN (SELECT id FROM active_users);
```

### Блокировки

Shared / exclusive. Deadlock — InnoDB откатывает одну транзакцию. Избегать длинных транзакций и разного порядка блокировок строк.

### Репликация (обзорно)

Master (source) пишет binlog → replicas читают. Для чтения со scale-out; на собеседовании часто: «зачем» и «lag реплики».

### Миграции / изменение схемы без простоя

Кратко: online DDL, осторожность с локом таблицы, большие `ALTER` на проде.

---

## Типичные SQL-задачи на собеседовании

1. Топ-N записей по группе (последний заказ каждого пользователя).
2. Пользователи без заказов (`LEFT JOIN … IS NULL` или `NOT EXISTS`).
3. Дубликаты email:

```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

4. Вторая по величине зарплата / N-я запись.
5. Нарисовать схему: users, orders, products, order_items (N:M).

---

## PHP + MySQL вместе

| Тема | Ожидание |
|------|----------|
| Подключение | PDO, DSN, ошибки через exceptions |
| Безопасность | Только prepared statements |
| N+1 | Не делать запрос в цикле; один JOIN / `WHERE IN` |
| Транзакции | `$pdo->beginTransaction()` / `commit` / `rollBack` |
| Часовые пояса | Единый TZ в PHP и MySQL |

```php
$pdo->beginTransaction();
try {
    // несколько запросов
    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
}
```

---

## Чеклист перед собеседованием

- [ ] PRIMARY / FOREIGN KEY, InnoDB
- [ ] INNER vs LEFT JOIN + задача «без заказов»
- [ ] `GROUP BY` + `HAVING`
- [ ] Индексы и leftmost prefix
- [ ] `EXPLAIN` — что смотреть
- [ ] Транзакции и ACID
- [ ] 1NF–3NF и связи 1:N / N:M
- [ ] PDO + prepared statements из PHP
