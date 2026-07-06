# 2. Определение структуры данных

> Источник: [metanit.com — Определение структуры данных](https://metanit.com/sql/mysql/2.1.php)

## Создание таблицы

```sql
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

```sql
DROP TABLE IF EXISTS users;
```

## Типы данных

| Тип | Назначение |
|-----|------------|
| `TINYINT`, `SMALLINT`, `INT`, `BIGINT` | Целые числа |
| `FLOAT`, `DOUBLE` | Числа с плавающей точкой |
| `DECIMAL(10, 2)` | Точные дроби (деньги) |
| `CHAR(n)`, `VARCHAR(n)` | Строки фикс./перем. длины |
| `TEXT`, `MEDIUMTEXT`, `LONGTEXT` | Длинный текст |
| `DATE`, `TIME`, `DATETIME`, `TIMESTAMP` | Даты и время |
| `BOOLEAN` / `TINYINT(1)` | Логический тип |
| `JSON` | JSON (MySQL 5.7+) |
| `BLOB` | Бинарные данные |

```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    description TEXT,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Атрибуты столбцов

| Атрибут | Описание |
|---------|----------|
| `PRIMARY KEY` | Первичный ключ |
| `AUTO_INCREMENT` | Автоувеличение id |
| `NOT NULL` | Значение обязательно |
| `UNIQUE` | Уникальное значение |
| `DEFAULT` | Значение по умолчанию |
| `CHECK` | Проверка условия (MySQL 8.0+) |

```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    CHECK (price >= 0),
    CHECK (stock >= 0)
);
```

## Индексы

```sql
CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    published_at DATETIME NULL,

    UNIQUE KEY posts_slug_unique (slug),
    INDEX posts_user_id_index (user_id),
    INDEX posts_published_at_index (published_at)
);
```

## Внешние ключи (FOREIGN KEY)

```sql
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,

    CONSTRAINT fk_posts_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

| Действие | Значение |
|----------|----------|
| `ON DELETE CASCADE` | Удалить связанные строки |
| `ON DELETE SET NULL` | Поставить `NULL` |
| `ON DELETE RESTRICT` | Запретить удаление |
| `ON UPDATE CASCADE` | Обновить FK при смене id |

## Изменение таблиц

```sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL AFTER email;
ALTER TABLE users MODIFY COLUMN name VARCHAR(500) NOT NULL;
ALTER TABLE users RENAME COLUMN phone TO mobile;
ALTER TABLE users DROP COLUMN mobile;

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_post
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;
```

Следующая глава: [Проектирование по ERD](erd.md).
