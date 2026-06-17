# Builder (Строитель)

**Порождающий паттерн** — пошаговое создание сложного объекта с разными представлениями.

> Refactoring.Guru: [Builder](https://refactoring.guru/ru/design-patterns/builder/php)

## Когда использовать

- У объекта много необязательных параметров (10+ полей в конструкторе — «телескопический конструктор»).
- Один и тот же процесс сборки даёт разные результаты.
- Нужна читаемая пошаговая конфигурация.

## Проблема

```php
<?php

// Плохо: непонятно, что означают null и порядок аргументов
$report = new Report('Sales', null, true, false, 'pdf', null, 'ru', ...);
```

## Решение

```php
<?php

class Report
{
    public function __construct(
        public string $title,
        public ?string $subtitle = null,
        public bool $withCharts = false,
        public bool $withSummary = true,
        public string $format = 'html',
        public ?string $author = null,
        public string $locale = 'ru',
    ) {}
}

class ReportBuilder
{
    private string $title;
    private ?string $subtitle = null;
    private bool $withCharts = false;
    private bool $withSummary = true;
    private string $format = 'html';
    private ?string $author = null;
    private string $locale = 'ru';

    public function title(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function withCharts(bool $value = true): self
    {
        $this->withCharts = $value;
        return $this;
    }

    public function format(string $format): self
    {
        $this->format = $format;
        return $this;
    }

    public function build(): Report
    {
        return new Report(
            title: $this->title,
            subtitle: $this->subtitle,
            withCharts: $this->withCharts,
            withSummary: $this->withSummary,
            format: $this->format,
            author: $this->author,
            locale: $this->locale,
        );
    }
}

$report = (new ReportBuilder())
    ->title('Продажи за квартал')
    ->withCharts()
    ->format('pdf')
    ->build();
```

## Director (опционально)

Отдельный класс знает **типовые конфигурации** сборки:

```php
<?php

class ReportDirector
{
    public function monthlySales(): Report
    {
        return (new ReportBuilder())
            ->title('Продажи за месяц')
            ->withCharts()
            ->withSummary()
            ->build();
    }

    public function quickSummary(): Report
    {
        return (new ReportBuilder())
            ->title('Краткая сводка')
            ->format('txt')
            ->build();
    }
}
```

## В Laravel

Laravel Query Builder — классический Builder:

```php
<?php

$users = User::query()
    ->where('active', true)
    ->orderBy('name')
    ->limit(10)
    ->get();
```

HTTP-клиент с цепочкой методов:

```php
<?php

$response = Http::withToken($token)
    ->timeout(30)
    ->retry(3, 100)
    ->post('https://api.example.com/orders', $payload);
```

## Builder vs Factory

| | Builder | Factory |
|---|---------|---------|
| Цель | Пошаговая сборка одного сложного объекта | Выбор типа объекта |
| API | Fluent-цепочка `->method()->method()` | `make()` / `create()` |
| Результат | Один продукт, много вариантов конфигурации | Разные классы одного интерфейса |

← [Каталог паттернов](README.md)
