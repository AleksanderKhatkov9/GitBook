# Factory Method / Abstract Factory

**Порождающие паттерны** — делегируют создание объектов отдельным классам или методам.

> Refactoring.Guru: [Factory Method](https://refactoring.guru/ru/design-patterns/factory-method/php) · [Abstract Factory](https://refactoring.guru/ru/design-patterns/abstract-factory/php)

---

## Factory Method

Определяет интерфейс создания объекта, но **подклассы решают**, какой именно класс инстанцировать.

### Когда использовать

- Тип создаваемого объекта зависит от условий (конфиг, запрос, окружение).
- Нужно убрать `new ConcreteClass()` из бизнес-логики.
- Клиентский код работает с интерфейсом, а не с конкретным классом.

### Пример: уведомления

```php
<?php

interface Notification
{
    public function send(string $to, string $message): void;
}

class EmailNotification implements Notification
{
    public function send(string $to, string $message): void
    {
        // отправка email
    }
}

class SmsNotification implements Notification
{
    public function send(string $to, string $message): void
    {
        // отправка SMS
    }
}

abstract class NotificationCreator
{
    abstract public function create(): Notification;

    public function notify(string $to, string $message): void
    {
        $this->create()->send($to, $message);
    }
}

class EmailNotificationCreator extends NotificationCreator
{
    public function create(): Notification
    {
        return new EmailNotification();
    }
}

class SmsNotificationCreator extends NotificationCreator
{
    public function create(): Notification
    {
        return new SmsNotification();
    }
}
```

### Простая фабрика (static factory)

В PHP часто достаточно статического метода или отдельного класса-фабрики:

```php
<?php

class NotificationFactory
{
    public static function make(string $channel): Notification
    {
        return match ($channel) {
            'email' => new EmailNotification(),
            'sms'   => new SmsNotification(),
            default => throw new InvalidArgumentException("Unknown channel: {$channel}"),
        };
    }
}

$notification = NotificationFactory::make('email');
$notification->send('user@example.com', 'Привет!');
```

### В Laravel

```php
<?php

// database/factories/UserFactory.php — фабрика тестовых данных
User::factory()->create(['email' => 'test@example.com']);

// Illuminate\Notifications\Notification::via() — выбор канала доставки
class OrderShipped extends Notification
{
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }
}
```

---

## Abstract Factory

Создаёт **семейства связанных объектов** без привязки к конкретным классам.

### Когда использовать

- Нужны согласованные наборы объектов (UI-тема: кнопка + чекбокс + поле ввода).
- Система должна работать с несколькими «семействами» продуктов.

### Пример: UI-компоненты

```php
<?php

interface Button { public function render(): string; }
interface Checkbox { public function render(): string; }

interface UIFactory
{
    public function createButton(): Button;
    public function createCheckbox(): Checkbox;
}

class LightButton implements Button
{
    public function render(): string { return '<button class="light">OK</button>'; }
}

class LightCheckbox implements Checkbox
{
    public function render(): string { return '<input type="checkbox" class="light">'; }
}

class LightUIFactory implements UIFactory
{
    public function createButton(): Button { return new LightButton(); }
    public function createCheckbox(): Checkbox { return new LightCheckbox(); }
}

class DarkUIFactory implements UIFactory
{
    public function createButton(): Button
    {
        return new class implements Button {
            public function render(): string { return '<button class="dark">OK</button>'; }
        };
    }

    public function createCheckbox(): Checkbox
    {
        return new class implements Checkbox {
            public function render(): string { return '<input type="checkbox" class="dark">'; }
        };
    }
}

function renderForm(UIFactory $factory): void
{
    echo $factory->createButton()->render();
    echo $factory->createCheckbox()->render();
}
```

---

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|----------------|------------------|
| Создаёт | Один продукт | Семейство продуктов |
| Механизм | Метод в подклассе | Отдельный интерфейс фабрики |
| Типичный случай | `NotificationFactory::make()` | Тема UI, набор драйверов БД |

← [Каталог паттернов](README.md)
