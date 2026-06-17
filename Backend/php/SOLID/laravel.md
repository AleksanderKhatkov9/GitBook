# SOLID + Laravel

Практические примеры применения принципов SOLID в Laravel 13.x.

> Теория: [SOLID](README.md) · Документация: [Controllers](../../laravel/controllers.md), [Eloquent](../../laravel/eloquent.md)

---

## S — Single Responsibility

### Проблема: «толстый» контроллер

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Mail::to($user)->send(new \App\Mail\WelcomeMail($user));

        return redirect()->route('users.index');
    }
}
```

### Решение: разделение ответственности

**1. Form Request** — только валидация:

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
        ];
    }
}
```

**2. Action** — только бизнес-логика:

```php
<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUserAction
{
    public function execute(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
```

**3. Listener** — только реакция на событие:

```php
<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail
{
    public function handle(UserRegistered $event): void
    {
        Mail::to($event->user)->send(new WelcomeMail($event->user));
    }
}
```

**4. Controller** — только HTTP-слой:

```php
<?php

namespace App\Http\Controllers;

use App\Actions\CreateUserAction;
use App\Events\UserRegistered;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function store(
        StoreUserRequest $request,
        CreateUserAction $action,
    ): RedirectResponse {
        $user = $action->execute($request->validated());

        UserRegistered::dispatch($user);

        return redirect()->route('users.index');
    }
}
```

| Класс | Ответственность |
|-------|-----------------|
| `StoreUserRequest` | Валидация входных данных |
| `CreateUserAction` | Создание пользователя |
| `SendWelcomeEmail` | Отправка письма |
| `UserController` | HTTP-запрос и ответ |

---

## O — Open/Closed

### Проблема: расширение через `if/else`

```php
<?php

class PaymentService
{
    public function pay(string $gateway, float $amount): bool
    {
        if ($gateway === 'stripe') {
            // Stripe API
        } elseif ($gateway === 'paypal') {
            // PayPal API
        }
        // каждый новый шлюз — правка этого класса
        return false;
    }
}
```

### Решение: интерфейс + binding

```php
<?php

namespace App\Contracts;

interface PaymentGateway
{
    public function charge(float $amount, array $meta = []): string;
}
```

```php
<?php

namespace App\Services\Payments;

use App\Contracts\PaymentGateway;

class StripeGateway implements PaymentGateway
{
    public function charge(float $amount, array $meta = []): string
    {
        // Stripe::charge(...)
        return 'stripe_tx_123';
    }
}

class PayPalGateway implements PaymentGateway
{
    public function charge(float $amount, array $meta = []): string
    {
        // PayPal API
        return 'paypal_tx_456';
    }
}
```

```php
<?php

namespace App\Services;

use App\Contracts\PaymentGateway;

class CheckoutService
{
    public function __construct(
        private PaymentGateway $gateway,
    ) {}

    public function checkout(float $amount): string
    {
        return $this->gateway->charge($amount, ['currency' => 'BYN']);
    }
}
```

Регистрация в `AppServiceProvider` — **без изменения** `CheckoutService`:

```php
<?php

use App\Contracts\PaymentGateway;
use App\Services\Payments\StripeGateway;

public function register(): void
{
    $this->app->bind(PaymentGateway::class, StripeGateway::class);
}
```

Новый шлюз — новый класс `YooKassaGateway implements PaymentGateway` и смена binding.

### Events — расширение без правки ядра

```php
<?php

// EventServiceProvider — добавляем listener, OrderService не трогаем
protected $listen = [
    \App\Events\OrderPlaced::class => [
        \App\Listeners\SendOrderConfirmation::class,
        \App\Listeners\UpdateInventory::class,
        // новый listener — одна строка
    ],
];
```

---

## L — Liskov Substitution

### Проблема: наследник ломает ожидания

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function publish(): void
    {
        $this->update(['published_at' => now()]);
    }
}

class DraftPost extends Post
{
    public function publish(): void
    {
        throw new \LogicException('Черновик нельзя опубликовать напрямую');
    }
}

function publishPost(Post $post): void
{
    $post->publish(); // упадёт для DraftPost
}
```

### Решение: правильная иерархия

```php
<?php

interface Publishable
{
    public function publish(): void;
}

class Post extends Model implements Publishable
{
    public function publish(): void
    {
        $this->update(['published_at' => now()]);
    }
}

class Draft extends Model
{
    public function promoteToPost(): Post
    {
        return Post::create($this->only(['title', 'body']));
    }
}
```

### Laravel: подстановка реализаций контрактов

```php
<?php

use Illuminate\Contracts\Cache\Repository as CacheContract;

// В тестах подставляем ArrayStore вместо Redis — код сервиса не меняется
class ProductService
{
    public function __construct(
        private CacheContract $cache,
    ) {}

    public function getPrice(int $id): float
    {
        return $this->cache->remember("price.{$id}", 3600, fn () => 99.99);
    }
}
```

`CacheContract` — любая реализация (`file`, `redis`, `array`) работает одинаково для вызывающего кода.

---

## I — Interface Segregation

### Проблема: один интерфейс на всё

```php
<?php

interface UserService
{
    public function find(int $id): ?User;
    public function create(array $data): User;
    public function exportCsv(): string;
    public function importFromApi(): void;
    public function sendNewsletter(): void;
}

// Класс импорта вынужден реализовать sendNewsletter()
```

### Решение: узкие контракты

```php
<?php

namespace App\Contracts;

interface UserRepository
{
    public function find(int $id): ?\App\Models\User;
    public function create(array $data): \App\Models\User;
}

interface CsvExportable
{
    public function toCsv(): string;
}

interface NewsletterSender
{
    public function sendToAll(): void;
}
```

```php
<?php

class EloquentUserRepository implements UserRepository
{
    public function find(int $id): ?User
    {
        return User::find($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }
}

class UserCsvExporter implements CsvExportable
{
    public function __construct(private UserRepository $users) {}

    public function toCsv(): string { /* ... */ }
}
```

### Встроенные контракты Laravel

| Интерфейс | Назначение |
|-----------|------------|
| `Illuminate\Contracts\Cache\Repository` | Кэш |
| `Illuminate\Contracts\Mail\Mailer` | Почта |
| `Illuminate\Contracts\Queue\Queue` | Очереди |
| `Illuminate\Contracts\Filesystem\Filesystem` | Файлы |
| `Illuminate\Contracts\Auth\Guard` | Аутентификация |

Класс зависит только от нужного контракта, а не от всего фреймворка.

---

## D — Dependency Inversion

### Проблема: жёсткая связь с Eloquent

```php
<?php

class ReportController extends Controller
{
    public function index()
    {
        $orders = Order::where('status', 'paid')->get();
        return view('reports.orders', compact('orders'));
    }
}
```

Сложно тестировать, нельзя подменить источник данных.

### Решение: репозиторий + DI

**Контракт:**

```php
<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface OrderRepository
{
    public function getPaid(): Collection;
}
```

**Реализация:**

```php
<?php

namespace App\Repositories;

use App\Contracts\OrderRepository;
use App\Models\Order;
use Illuminate\Support\Collection;

class EloquentOrderRepository implements OrderRepository
{
    public function getPaid(): Collection
    {
        return Order::where('status', 'paid')->get();
    }
}
```

**Регистрация** (`AppServiceProvider`):

```php
<?php

use App\Contracts\OrderRepository;
use App\Repositories\EloquentOrderRepository;

public function register(): void
{
    $this->app->bind(OrderRepository::class, EloquentOrderRepository::class);
}
```

**Контроллер:**

```php
<?php

namespace App\Http\Controllers;

use App\Contracts\OrderRepository;
use Illuminate\View\View;

class ReportController extends Controller
{
    public function __construct(
        private OrderRepository $orders,
    ) {}

    public function index(): View
    {
        return view('reports.orders', [
            'orders' => $this->orders->getPaid(),
        ]);
    }
}
```

**Тест** — подмена через контейнер:

```php
<?php

use App\Contracts\OrderRepository;
use Illuminate\Support\Collection;

$this->mock(OrderRepository::class, function ($mock) {
    $mock->shouldReceive('getPaid')
        ->once()
        ->andReturn(Collection::make([]));
});

$response = $this->get('/reports/orders');
$response->assertOk();
```

---

## Структура проекта с SOLID

```
app/
├── Actions/              ← S: одна операция — один класс
│   └── CreateUserAction.php
├── Contracts/            ← D, I: интерфейсы
│   ├── OrderRepository.php
│   └── PaymentGateway.php
├── Http/
│   ├── Controllers/      ← S: тонкие контроллеры
│   └── Requests/         ← S: валидация
├── Listeners/            ← S, O: реакция на события
├── Repositories/         ← D: реализации контрактов
│   └── EloquentOrderRepository.php
├── Services/             ← бизнес-логика
│   └── CheckoutService.php
└── Providers/
    └── AppServiceProvider.php  ← D: binding
```

---

## Команды Artisan

```bash
php artisan make:request StoreUserRequest
php artisan make:event UserRegistered
php artisan make:listener SendWelcomeEmail
php artisan make:policy PostPolicy --model=Post
```

---

Содержание: [SOLID — теория](README.md) · [Laravel](../../laravel/README.md)
