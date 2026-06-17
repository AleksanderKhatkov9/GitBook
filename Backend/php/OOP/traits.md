# Трейты

> Источник: [Трейты | PHP Manual](https://www.php.net/manual/ru/language.oop5.traits.php)

**Трейт** — механизм повторного использования кода без наследования. Решает проблему «один класс — один родитель», позволяя подключать несколько трейтов.

## Базовое использование

```php
<?php

trait Logger
{
    public function log(string $message): void
    {
        echo '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
    }
}

trait Cacheable
{
    public function cacheKey(): string
    {
        return static::class . ':' . spl_object_id($this);
    }
}

class UserService
{
    use Logger, Cacheable;

    public function create(array $data): void
    {
        $this->log('Создание пользователя');
    }
}
```

---

## Разрешение конфликтов имён

Если два трейта содержат метод с одинаковым именем:

```php
<?php

trait A
{
    public function hello(): string { return 'A'; }
}

trait B
{
    public function hello(): string { return 'B'; }
}

class MyClass
{
    use A, B {
        B::hello insteadof A;
        A::hello as helloA;
    }
}

$obj = new MyClass();
echo $obj->hello();   // B
echo $obj->helloA(); // A
```

| Конструкция | Действие |
|-------------|----------|
| `B::hello insteadof A` | Использовать метод из `B` |
| `A::hello as helloA` | Переименовать метод из `A` |
| `B::hello as private helloPrivate` | Изменить видимость |

---

## Абстрактные методы в трейтах

```php
<?php

trait Notifiable
{
    abstract public function getEmail(): string;

    public function notify(string $message): void
    {
        mail($this->getEmail(), 'Уведомление', $message);
    }
}

class User
{
    use Notifiable;

    public function __construct(private string $email) {}

    public function getEmail(): string
    {
        return $this->email;
    }
}
```

---

## Свойства и константы в трейтах

```php
<?php

trait HasTimestamps
{
    public ?\DateTime $createdAt = null;
    public ?\DateTime $updatedAt = null;

    public function touch(): void
    {
        $this->updatedAt = new \DateTime();
    }
}
```

---

## Трейты vs наследование

| Подход | Когда использовать |
|--------|-------------------|
| `extends` | «Является» (Dog **is a** Animal) |
| `implements` | Контракт поведения |
| `use Trait` | Горизонтальное переиспользование (логирование, soft delete) |

---

## В Laravel

Laravel активно использует трейты:

```php
<?php

// Eloquent модель
class Post extends Model
{
    use SoftDeletes;      // мягкое удаление
    use HasFactory;       // фабрики для тестов
}

// Контроллер
class PostController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;
}
```

Популярные трейты Laravel:

| Трейт | Назначение |
|-------|------------|
| `SoftDeletes` | Мягкое удаление (`deleted_at`) |
| `HasFactory` | Model factories |
| `Notifiable` | Уведомления |
| `AuthorizesRequests` | Авторизация в контроллере |

Следующая тема: [Магические методы](magic-methods.md).
