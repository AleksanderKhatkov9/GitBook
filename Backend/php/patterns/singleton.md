# Singleton (Одиночка)

**Порождающий паттерн** — гарантирует **один экземпляр** класса и глобальную точку доступа к нему.

> Refactoring.Guru: [Singleton](https://refactoring.guru/ru/design-patterns/singleton/php)

## Когда теоретически уместен

- Ровно один экземпляр на всё приложение (логгер, пул соединений, конфигурация).
- Нужен контролируемый глобальный доступ.

## Реализация в PHP

```php
<?php

class Config
{
    private static ?self $instance = null;
    private array $data = [];

    private function __construct() {}

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function set(string $key, mixed $value): void
    {
        $this->data[$key] = $value;
    }

    public function get(string $key): mixed
    {
        return $this->data[$key] ?? null;
    }

    // Запрет клонирования и десериализации
    private function __clone() {}
    public function __wakeup(): void
    {
        throw new \Exception('Cannot unserialize singleton');
    }
}

$config = Config::getInstance();
$config->set('app.name', 'MyApp');
```

## PHP 8.1+: enum как Singleton

Для stateless-синглтонов иногда проще `enum`:

```php
<?php

enum AppConfig: string
{
    case Name = 'MyApp';
    case Version = '1.0.0';
}

echo AppConfig::Name->value;
```

## Почему в современном PHP осторожно

| Проблема | Последствие |
|----------|-------------|
| Глобальное состояние | Сложно отследить зависимости |
| Тестирование | Нельзя подменить mock без хаков |
| Скрытые связи | Класс тянет Singleton «из воздуха» |
| Нарушение SRP | Класс и бизнес-логика, и контроль экземпляра |

## Альтернатива: DI-контейнер (Laravel)

Вместо `Config::getInstance()` — регистрация singleton в контейнере:

```php
<?php

// app/Providers/AppServiceProvider.php
$this->app->singleton(ConfigRepository::class, function () {
    return new ConfigRepository(config('app'));
});

// В конструкторе — явная зависимость
class OrderService
{
    public function __construct(private ConfigRepository $config) {}
}
```

Контейнер Laravel хранит **один экземпляр на запрос**, но зависимости **явные** — их видно в конструкторе и легко подменить в тестах.

```php
<?php

// Регистрация singleton
App::singleton(PaymentGateway::class, StripeGateway::class);

// Разрешение из контейнера
$gateway = app(PaymentGateway::class);
```

## Вывод

Знайте Singleton как паттерн из учебника, но в новых PHP-проектах предпочитайте **dependency injection** и `singleton`-биндинги контейнера.

← [Каталог паттернов](README.md)
