# SOLID

Пять принципов объектно-ориентированного проектирования (Роберт Мартин, Uncle Bob). Помогают писать гибкий, тестируемый и поддерживаемый PHP-код.

> Подробные примеры в Laravel: **[SOLID + Laravel](laravel.md)**

Связанные разделы: [ООП](../OOP/README.md), [Паттерны](../patterns/README.md), [Laravel](../../laravel/README.md).

| Буква | Принцип | Кратко |
|-------|---------|--------|
| **S** | Single Responsibility | Один класс — одна причина для изменения |
| **O** | Open/Closed | Открыт для расширения, закрыт для модификации |
| **L** | Liskov Substitution | Подтип заменяет базовый тип без поломки логики |
| **I** | Interface Segregation | Много узких интерфейсов лучше одного «толстого» |
| **D** | Dependency Inversion | Зависимость от абстракций, а не от реализаций |

---

## S — Single Responsibility

Класс отвечает за **одну задачу** — одну причину для изменения.

```php
<?php

// Плохо: всё в одном методе
class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::create($request->only('name', 'email'));
        Mail::to($user)->send(new WelcomeMail($user));
        Log::info('User created', ['id' => $user->id]);
        return redirect('/users');
    }
}
```

```php
<?php

// Хорошо: ответственность разделена
class StoreUserRequest extends FormRequest { /* валидация */ }
class CreateUserAction { /* создание пользователя */ }
class UserController extends Controller
{
    public function store(StoreUserRequest $request, CreateUserAction $action)
    {
        $user = $action->execute($request->validated());
        return redirect()->route('users.show', $user);
    }
}
```

В Laravel: **Form Request** — валидация, **Policy** — авторизация, **Action/Service** — бизнес-логика, **Controller** — только HTTP.

---

## O — Open/Closed

Код **расширяется** новыми классами, а не правками существующих.

```php
<?php

// Плохо: if/else на каждый новый тип
class Notifier
{
    public function send(string $channel, string $message): void
    {
        if ($channel === 'email') { /* ... */ }
        if ($channel === 'sms') { /* ... */ }
    }
}
```

```php
<?php

// Хорошо: стратегия через интерфейс
interface NotificationChannel
{
    public function send(string $message): void;
}

class EmailChannel implements NotificationChannel { /* ... */ }
class SmsChannel implements NotificationChannel { /* ... */ }

class Notifier
{
    public function __construct(private NotificationChannel $channel) {}

    public function notify(string $message): void
    {
        $this->channel->send($message);
    }
}
```

В Laravel: **Events + Listeners** — новое поведение без изменения исходного кода; **Strategy** через интерфейсы и binding в контейнере.

---

## L — Liskov Substitution

Подкласс можно подставить вместо родителя **без сюрпризов** для вызывающего кода.

```php
<?php

// Плохо: дочерний класс ломает контракт
class FileStorage
{
    public function store(string $path, string $content): bool
    {
        return file_put_contents($path, $content) !== false;
    }
}

class ReadOnlyStorage extends FileStorage
{
    public function store(string $path, string $content): bool
    {
        throw new \RuntimeException('Только чтение');
    }
}
```

```php
<?php

// Хорошо: общий контракт, разные реализации
interface Storage
{
    public function get(string $path): string;
}

class FileStorage implements Storage { /* ... */ }
class S3Storage implements Storage { /* ... */ }
```

В Laravel: корректное переопределение методов в моделях, не нарушайте сигнатуры родительских классов (`Model`, `Authenticatable`).

---

## I — Interface Segregation

Не заставляйте класс реализовывать методы, которые ему **не нужны**.

```php
<?php

// Плохо: «толстый» интерфейс
interface Repository
{
    public function find(int $id): mixed;
    public function all(): array;
    public function exportToCsv(): string;
    public function syncWithApi(): void;
}
```

```php
<?php

// Хорошо: узкие интерфейсы
interface ReadableRepository
{
    public function find(int $id): mixed;
}

interface Exportable
{
    public function exportToCsv(): string;
}
```

В Laravel: пакет `Illuminate\Contracts\` — отдельные контракты `Cache`, `Mail`, `Queue`, `Filesystem` вместо одного «божественного» интерфейса.

---

## D — Dependency Inversion

Зависимость от **абстракций** (интерфейсов), а не от конкретных классов.

```php
<?php

// Плохо
class OrderService
{
    public function create(array $data): void
    {
        $repo = new EloquentOrderRepository();
        $repo->save($data);
    }
}
```

```php
<?php

// Хорошо
class OrderService
{
    public function __construct(
        private OrderRepository $orders,
    ) {}

    public function create(array $data): Order
    {
        return $this->orders->save($data);
    }
}
```

В Laravel: **Service Container**, `bind()` / `singleton()` в `AppServiceProvider`, **constructor injection** в контроллерах и сервисах.

---

## Шпаргалка: SOLID в Laravel

| Принцип | Инструменты Laravel |
|---------|---------------------|
| **S** | Form Request, Policy, Action classes, Resources |
| **O** | Events, Listeners, Observers, Strategy + binding |
| **L** | Наследование моделей, корректные override |
| **I** | `Illuminate\Contracts\*`, узкие собственные интерфейсы |
| **D** | DI-контейнер, `AppServiceProvider`, фасады как прокси |

---

## Чеклист code review

- [ ] Контроллер тонкий — логика вынесена в Action/Service?
- [ ] Новый тип уведомления/оплаты — новый класс, а не новый `if`?
- [ ] Дочерний класс не ломает ожидания родителя?
- [ ] Интерфейс содержит только нужные методы?
- [ ] Зависимости через конструктор и интерфейсы, не `new`?

---

## Материалы

- [SOLID — Wikipedia](https://ru.wikipedia.org/wiki/SOLID_(объектно-ориентированное_программирование))
- [Laravel — Service Container](https://laravel.com/docs/container)
- [SOLID — Haber](https://habr.com/ru/companies/productivity_inside/articles/505430/)
- [SOLID — Haber](https://habr.com/ru/articles/714068/)
- [SOLID — Haber](https://habr.com/ru/articles/208442/)
- **[SOLID + Laravel — примеры кода](laravel.md)**

Предыдущий раздел: [ООП](../OOP/README.md).
