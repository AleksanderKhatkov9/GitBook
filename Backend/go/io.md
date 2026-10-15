# 11. Файлы и потоки

> Источники: [Пакеты io, os, bufio, fmt](https://pkg.go.dev/io) · [Metanit — глава 11](https://metanit.com/go/tutorial/)

Ввод и вывод в Go устроены вокруг двух интерфейсов. Кто бы ни был источником — файл, сеть, буфер в памяти — читают и пишут одинаково.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}
```

`Read` кладёт байты в переданный срез и сообщает, сколько их прочитано. Конец потока — ошибка `io.EOF`. Это нормальное завершение, не сбой. `Write` может записать меньше, чем просили; остаток отправляют следующим вызовом или через `io.Copy`.

## Файл

```go
f, err := os.Create("notes.txt")
if err != nil {
    return err
}
defer f.Close()

if _, err := f.WriteString("первая строка\n"); err != nil {
    return err
}
```

`os.Open` открывает файл только на чтение. `os.OpenFile` даёт флаги: дозапись, создание, права.

Короткие операции целиком:

```go
data, err := os.ReadFile("notes.txt")
err = os.WriteFile("notes.txt", data, 0o644)
```

`0o644` — права в Unix-восьмеричной записи: владелец читает и пишет, остальные читают. На Windows смысл прав урезан, но аргумент всё равно обязателен.

## Копирование потоков

`io.Copy` читает из `Reader` и пишет в `Writer`, пока источник не кончится.

```go
src, err := os.Open("in.txt")
if err != nil {
    return err
}
defer src.Close()

dst, err := os.Create("out.txt")
if err != nil {
    return err
}
defer dst.Close()

if _, err := io.Copy(dst, src); err != nil {
    return err
}
```

Те же функции пишут в сеть и в `http.ResponseWriter`: это тоже `Writer`.

## Стандартные потоки

| Переменная | Куда |
|------------|------|
| `os.Stdin` | Ввод программы |
| `os.Stdout` | Обычный вывод |
| `os.Stderr` | Сообщения об ошибках |

`fmt.Fprint(os.Stdout, "текст")` — запись в конкретный поток. `fmt.Println` пишет в `os.Stdout`.

Форматированный ввод разбирает текст в переменные:

```go
var name string
var age int
fmt.Print("имя и возраст: ")
_, err := fmt.Scan(&name, &age)
```

`Scan` делит ввод по пробелам. Для строки с пробелами берут `bufio.Reader.ReadString('\n')` или `fmt.Scanln` с оговоркой, что одна строка — один вызов.

## Буфер

Каждый `Write` в файл или сокет — системный вызов. `bufio.Writer` копит байты и отдаёт их пачкой.

```go
w := bufio.NewWriter(f)
fmt.Fprintln(w, "строка")
if err := w.Flush(); err != nil { // без Flush хвост останется в памяти
    return err
}
```

`bufio.Scanner` читает по строкам. По умолчанию он режет длинные строки (лимит около 64 КБ). Для больших строк задают свой буфер через `Buffer` или читают `Reader` напрямую.

```go
sc := bufio.NewScanner(os.Stdin)
for sc.Scan() {
    fmt.Println(sc.Text())
}
if err := sc.Err(); err != nil {
    return err
}
```

После цикла проверяют `sc.Err()`: обрыв чтения сканер не показывает через `Scan()`.

## Дальше

[Сеть](network.md) — сокет и HTTP используют те же `Reader` и `Writer`.
