# Command (Команда)

**Поведенческий паттерн** — запрос оформляется как **объект** с методом `execute()`. Можно ставить в очередь, логировать, отменять, комбинировать.

> Refactoring.Guru: [Command](https://refactoring.guru/ru/design-patterns/command/php)

## Когда использовать

- Нужна очередь операций или отложенное выполнение.
- Undo/redo, история действий.
- Развязать отправителя запроса и исполнителя.
- Макрокоманды (цепочка команд как одна).

## Пример: текстовый редактор

```php
<?php

interface Command
{
    public function execute(): void;
    public function undo(): void;
}

class Document
{
    private string $content = '';

    public function write(string $text): void
    {
        $this->content .= $text;
    }

    public function delete(int $length): void
    {
        $this->content = substr($this->content, 0, -$length);
    }

    public function content(): string
    {
        return $this->content;
    }
}

class AppendTextCommand implements Command
{
    public function __construct(
        private Document $document,
        private string $text,
    ) {}

    public function execute(): void
    {
        $this->document->write($this->text);
    }

    public function undo(): void
    {
        $this->document->delete(strlen($this->text));
    }
}

class CommandHistory
{
    /** @var Command[] */
    private array $history = [];

    public function run(Command $command): void
    {
        $command->execute();
        $this->history[] = $command;
    }

    public function undo(): void
    {
        $command = array_pop($this->history);
        $command?->undo();
    }
}

$doc = new Document();
$history = new CommandHistory();

$history->run(new AppendTextCommand($doc, 'Hello '));
$history->run(new AppendTextCommand($doc, 'World'));
echo $doc->content(); // Hello World

$history->undo();
echo $doc->content(); // Hello 
```

## Invoker и Receiver

| Роль | Ответственность |
|------|-----------------|
| **Command** | Интерфейс `execute()` / `undo()` |
| **Concrete Command** | Связывает Invoker с Receiver |
| **Receiver** | Объект, который реально выполняет работу (`Document`) |
| **Invoker** | Запускает команду (`CommandHistory`) |

## В Laravel: Jobs и Artisan

### Queue Job как Command

```php
<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendInvoiceEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(public Invoice $invoice) {}

    public function handle(): void
    {
        Mail::to($this->invoice->customer)->send(new InvoiceMail($this->invoice));
    }
}

// Постановка в очередь
SendInvoiceEmail::dispatch($invoice);
```

### Artisan-команда

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PurgeOldLogs extends Command
{
    protected $signature = 'logs:purge {--days=30}';
    protected $description = 'Delete log files older than N days';

    public function handle(): int
    {
        $days = (int) $this->option('days');
        // логика очистки
        $this->info("Purged logs older than {$days} days.");
        return self::SUCCESS;
    }
}
```

CLI-вызов отделён от бизнес-логики: команда — объект, параметры — аргументы, `handle()` — `execute()`.

## Command vs Strategy

| | Command | Strategy |
|---|---------|----------|
| Смысл | Запрос как объект (действие) | Алгоритм как объект |
| Undo | Часто есть | Обычно нет |
| Пример | `SendEmailJob` | `ShippingStrategy` |

← [Каталог паттернов](README.md)
