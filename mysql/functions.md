# 7. Встроенные функции

> Источник: [metanit.com — Встроенные функции](https://metanit.com/sql/mysql/6.1.php)

## Строковые функции

```sql
SELECT CONCAT(name, ' <', email, '>') AS contact FROM users;
SELECT UPPER(name), LOWER(email) FROM users;
SELECT LENGTH(name) FROM users;
SELECT SUBSTRING(email, 1, LOCATE('@', email) - 1) AS login FROM users;
SELECT TRIM('  hello  ');
SELECT REPLACE(title, 'Laravel', 'PHP') FROM posts;
```

| Функция | Описание |
|---------|----------|
| `CONCAT(s1, s2, ...)` | Склеить строки |
| `UPPER`, `LOWER` | Регистр |
| `LENGTH` | Длина строки |
| `SUBSTRING(str, pos, len)` | Подстрока |
| `TRIM` | Убрать пробелы |
| `REPLACE` | Замена подстроки |
| `LOCATE(sub, str)` | Позиция подстроки |

## Числовые функции

```sql
SELECT ROUND(price, 2) FROM products;
SELECT CEIL(price), FLOOR(price) FROM products;
SELECT ABS(stock - 10) FROM products;
SELECT MOD(id, 2) AS is_even FROM users;
SELECT RAND();
```

| Функция | Описание |
|---------|----------|
| `ROUND(x, n)` | Округление |
| `CEIL`, `FLOOR` | Вверх / вниз |
| `ABS` | Модуль |
| `MOD(a, b)` | Остаток от деления |
| `POWER(x, y)` | Степень |

## Функции даты и времени

```sql
SELECT NOW();
SELECT CURDATE(), CURTIME();
SELECT YEAR(created_at), MONTH(created_at), DAY(created_at) FROM users;
SELECT DATE_FORMAT(created_at, '%d.%m.%Y %H:%i') FROM users;
SELECT DATEDIFF(NOW(), created_at) AS days_ago FROM posts;
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);
```

| Функция | Описание |
|---------|----------|
| `NOW()` | Текущие дата и время |
| `CURDATE()`, `CURTIME()` | Дата / время |
| `DATE_FORMAT(d, fmt)` | Форматирование |
| `DATEDIFF(d1, d2)` | Разница в днях |
| `DATE_ADD`, `DATE_SUB` | Прибавить / вычесть интервал |

## CASE, IF, IFNULL, COALESCE

### CASE

```sql
SELECT
    name,
    CASE
        WHEN is_active = 1 THEN 'Активен'
        WHEN is_active = 0 THEN 'Неактивен'
        ELSE 'Неизвестно'
    END AS status
FROM users;

SELECT
    title,
    CASE category_id
        WHEN 1 THEN 'Новости'
        WHEN 2 THEN 'Статьи'
        ELSE 'Другое'
    END AS category_name
FROM posts;
```

### IF

```sql
SELECT name, IF(is_active = 1, 'Да', 'Нет') AS active FROM users;
```

### IFNULL и COALESCE

Замена `NULL` на значение по умолчанию:

```sql
SELECT name, IFNULL(phone, 'не указан') FROM users;
SELECT name, COALESCE(phone, mobile, email) AS contact FROM users;
```

| Функция | Описание |
|---------|----------|
| `IFNULL(v, default)` | Если `NULL` — вернуть default |
| `COALESCE(v1, v2, ...)` | Первое не-NULL значение |

## EXPLAIN — анализ запроса

```sql
EXPLAIN SELECT * FROM posts WHERE user_id = 5;
```

Помогает понять, использует ли запрос индекс.

---

[← К оглавлению MySQL](README.md)
