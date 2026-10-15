# 8. Интерфейсы

> Источники: [Спецификация — Interface types, Type assertions](https://go.dev/ref/spec) · [Metanit — глава 8](https://metanit.com/go/tutorial/)

Интерфейс описывает набор методов. Тип **не объявляет**, что он реализует интерфейс. Если методы совпали по имени и сигнатуре — тип подходит.

```go
type Greeter interface {
    Greet() string
}

type User struct {
    Name string
}

func (u User) Greet() string {
    return "Привет, " + u.Name
}

func hello(g Greeter) {
    fmt.Println(g.Greet())
}

hello(User{Name: "Анна"})
```

Значение интерфейса — пара: конкретный тип и конкретное значение. Пока в интерфейс ничего не положили, и тип, и значение равны `nil`.

Пустой интерфейс `interface{}` (псевдоним `any`) требует ноль методов. Ему подходит любое значение. В сигнатурах библиотек его сужают как можно раньше: `any` на входе API прячет ошибки до запуска.

## Указатель и набор методов

Набор методов у `T` и `*T` разный.

| Получатель метода | Есть у значения `T` | Есть у указателя `*T` |
|-------------------|---------------------|------------------------|
| `(u User)` | да | да |
| `(u *User)` | нет | да |

Если хотя бы один нужный метод объявлен на `*User`, в интерфейс кладут указатель:

```go
type Renamer interface {
    Rename(name string)
}

func (u *User) Rename(name string) {
    u.Name = name
}

var r Renamer = &User{Name: "Анна"}
```

`User{...}` без `&` сюда не подойдёт: у значения нет метода `Rename`.

## Несколько интерфейсов

Один тип может подходить сразу под несколько интерфейсов — отдельные объявления не нужны. Интерфейс можно собрать из других:

```go
type Reader interface {
    Read(p []byte) (int, error)
}

type Closer interface {
    Close() error
}

type ReadCloser interface {
    Reader
    Closer
}
```

Так устроены `io.Reader`, `io.Writer` и `io.ReadCloser` в стандартной библиотеке.

## Проверка типа

Утверждение типа достаёт конкретное значение. Форма с одним результатом паникует, если тип не совпал. Форма с двумя результатами возвращает `ok`.

```go
var g Greeter = User{Name: "Анна"}

u, ok := g.(User)
if ok {
    fmt.Println(u.Name)
}
```

Несколько вариантов — `type switch`:

```go
switch v := g.(type) {
case User:
    fmt.Println(v.Name)
case *User:
    fmt.Println(v.Name)
default:
    fmt.Printf("другой тип %T\n", v)
}
```

Проверка «значение в интерфейсе равно nil» коварна: интерфейс равен `nil`, только если **оба** поля пары пустые. Указатель `(*User)(nil)`, положенный в интерфейс, уже не `nil`-интерфейс — тип известен. Сравнивайте конкретное значение до упаковки или проверяйте его отдельно.

## Дальше

[Горутины](concurrency.md) · [Ошибки](errors.md) — тип `error` тоже интерфейс.
