# 12. Сеть

> Источники: [Пакеты net и net/http](https://pkg.go.dev/net/http) · [Metanit — глава 12](https://metanit.com/go/tutorial/)

## TCP-клиент

`net.Dial` открывает соединение. Для TCP адрес — `хост:порт`.

```go
conn, err := net.Dial("tcp", "127.0.0.1:8080")
if err != nil {
    return err
}
defer conn.Close()

if _, err := fmt.Fprintln(conn, "ping"); err != nil {
    return err
}

reply, err := bufio.NewReader(conn).ReadString('\n')
```

Соединение — одновременно `io.Reader` и `io.Writer`. Чтение и запись из главы про [файлы](io.md) работают здесь без другого API.

## TCP-сервер

`net.Listen` занимает порт. `Accept` ждёт следующее подключение и возвращает его как отдельное соединение. Каждое соединение обрабатывают в своей горутине, иначе клиенты встанут в очередь за одним `Accept`.

```go
ln, err := net.Listen("tcp", ":8080")
if err != nil {
    return err
}
defer ln.Close()

for {
    conn, err := ln.Accept()
    if err != nil {
        return err
    }
    go func(c net.Conn) {
        defer c.Close()
        io.Copy(c, c) // эхо: что прочитали, то и вернули
    }(conn)
}
```

Цикл выше крутится, пока `Accept` не вернёт ошибку (сервер закрыли). В рабочем сервисе ошибку `Accept` логируют и продолжают цикл, а останов делают через `Close` у `Listener`.

## Таймаут

Без срока ожидание `Read` может висеть вечно. Срок ставят на соединение:

```go
_ = conn.SetDeadline(time.Now().Add(5 * time.Second))
```

`SetReadDeadline` и `SetWriteDeadline` ограничивают только чтение или только запись. Истёкший срок выглядит как ошибка `Read` / `Write`; соединение после этого нужно закрыть.

Для запроса, который отменяется вместе с клиентом HTTP, в новых сервисах передают `context.Context`: у него есть отмена и дедлайн, и его понимают база, HTTP-клиент и свои горутины.

## HTTP-запрос

Разовый GET:

```go
resp, err := http.Get("https://example.com")
if err != nil {
    return err
}
defer resp.Body.Close()

body, err := io.ReadAll(resp.Body)
```

Тело ответа обязательно закрывают. Иначе соединение не вернётся в пул.

Свой клиент задаёт общий таймаут на запрос. Нулевой `http.Client` таймаута не имеет.

```go
client := &http.Client{Timeout: 5 * time.Second}
resp, err := client.Get("https://example.com")
```

Другие методы и заголовки собирают через `http.NewRequest` и `client.Do`. Код статуса проверяют явно: `Get` возвращает ошибку на обрыве сети, а ответ `404` или `500` — это успешный с точки зрения транспорта вызов с `resp.StatusCode`.

## HTTP-сервер

Для API хватает стандартной библиотеки, фреймворк не обязателен.

```go
mux := http.NewServeMux()
mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "ok")
})

server := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
}
if err := server.ListenAndServe(); err != nil {
    return err
}
```

Шаблон `GET /health` (метод и путь) разбирает маршрутизатор из стандартной библиотеки с Go 1.22. `ReadHeaderTimeout` не даёт медленному клиенту держать соединение на этапе заголовков.

Остановка по сигналу процесса — `server.Shutdown(ctx)`: сервер дослушивает уже принятые запросы и не обрывает их на полуслове.

## Дальше

[Базы данных](databases.md) · [Горутины](concurrency.md)
