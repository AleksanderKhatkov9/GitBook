# 13. Базы данных

> Источники: [database/sql](https://pkg.go.dev/database/sql) · [Metanit — глава 13](https://metanit.com/go/tutorial/)

Реляционные базы подключают через пакет `database/sql`. Он задаёт общий API: открыть, выполнить запрос, прочитать строки. Сам протокол MySQL или PostgreSQL живёт в **драйвере** — отдельном модуле. Драйвер регистрируется пустым импортом.

Документные базы (MongoDB) в этот пакет не входят: у них свой драйвер и свои типы.

## Общая схема

```go
import (
    "context"
    "database/sql"

    _ "github.com/go-sql-driver/mysql"
)

func connect(dsn string) (*sql.DB, error) {
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        return nil, err
    }
    if err := db.PingContext(context.Background()); err != nil {
        db.Close()
        return nil, err
    }
    return db, nil // пул закрывает вызывающий, один раз на процесс
}
```

`Open` проверяет аргументы и **не** устанавливает соединение. Реальная проверка — `Ping` или первый запрос. `db` — пул соединений, его создают один раз на процесс и передают в коде дальше, а не открывают на каждый запрос.

Имя драйвера (`"mysql"`, `"pgx"`, `"sqlite"`) задаёт сам драйвер. Оно написано в его документации, угадывать его не нужно.

Строку подключения не хранят в коде. Её читают из переменной окружения или конфига.

## Драйверы

| База | Драйвер | Комментарий |
|------|---------|-------------|
| MySQL | [go-sql-driver/mysql](https://github.com/go-sql-driver/mysql) | Имя `"mysql"`, DSN вида `user:pass@tcp(127.0.0.1:3306)/app` |
| PostgreSQL | [jackc/pgx](https://github.com/jackc/pgx) | Через `pgx/stdlib` работает как `database/sql`; есть и собственный API pgx |
| SQLite | [modernc.org/sqlite](https://pkg.go.dev/modernc.org/sqlite) | Чистый Go, без CGO. Файл: `file:app.db` |
| MongoDB | [mongo-driver](https://pkg.go.dev/go.mongodb.org/mongo-driver/mongo) | Не `database/sql`: клиент, база, коллекция, документы |

Для SQLite с CGO есть ещё `github.com/mattn/go-sqlite3`. На сборке без компилятора C удобнее `modernc.org/sqlite`.

## Запросы

Параметры передают плейсхолдерами, не склейкой строки. Так значение не становится частью SQL.

MySQL использует `?`. PostgreSQL в стиле `database/sql` — `$1`, `$2`.

```go
var name string
err := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = ?", id).Scan(&name)
if errors.Is(err, sql.ErrNoRows) {
    return fmt.Errorf("пользователь %d не найден", id)
}
```

Несколько строк:

```go
rows, err := db.QueryContext(ctx, "SELECT id, name FROM users")
if err != nil {
    return err
}
defer rows.Close()

for rows.Next() {
    var id int
    var name string
    if err := rows.Scan(&id, &name); err != nil {
        return err
    }
}
return rows.Err()
```

`rows.Close()` обязателен: пока строки не закрыты, соединение не возвращается в пул. `rows.Err()` ловит обрыв уже во время перебора.

Запись и команды без строк результата:

```go
res, err := db.ExecContext(ctx, "UPDATE users SET name = ? WHERE id = ?", name, id)
if err != nil {
    return err
}
n, err := res.RowsAffected()
```

`QueryContext`, `ExecContext` и `PingContext` принимают `context.Context`. Отмена контекста прерывает ожидание базы. Варианты без `Context` в новом коде не используют.

Несколько команд, которые должны пройти вместе, оборачивают в `db.BeginTx`. В конце — `Commit` или `Rollback`. `Rollback` после успешного `Commit` безопасен: его ставят в `defer`, чтобы транзакция не осталась открытой при ошибке посередине.

## MongoDB

Клиент создают через `mongo.Connect`. Дальше берут базу и коллекцию, документы читают и пишут методами коллекции (`InsertOne`, `Find`, `FindOne`). Курсор `Find`, как и `rows` в SQL, закрывают.

Схема другая, чем у `database/sql`: нет таблиц и `Scan` в набор переменных, документ отображают в структуру. Актуальные вызовы смотрите в [документации драйвера](https://www.mongodb.com/docs/drivers/go/current/) — сигнатуры между мажорными версиями менялись.

## Дальше

[Рефлексия](reflection.md) · [Ошибки](errors.md)
