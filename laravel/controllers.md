# Контроллеры

> Источник: [Controllers | Laravel 13.x](https://laravel.com/docs/13.x/controllers)

Контроллеры группируют логику обработки HTTP-запросов в отдельные классы. По умолчанию они лежат в `app/Http/Controllers/`.

См. также: [Маршруты](routing.md)

## Создание контроллера

```bash
php artisan make:controller UserController
```

Файл: `app/Http/Controllers/UserController.php`

```php
namespace App\Http\Controllers;

use Illuminate\View\View;

class UserController extends Controller
{
    public function show(string $id): View
    {
        return view('user.profile', ['id' => $id]);
    }
}
```

Подключение в `routes/web.php`:

```php
use App\Http\Controllers\UserController;

Route::get('/user/{id}', [UserController::class, 'show']);
```

## Контроллеры в подпапках

В имени команды указывайте путь через `/` — Laravel создаст папки и правильный `namespace`.

```bash
php artisan make:controller Order/OrderController
```

Результат:

```
app/Http/Controllers/Order/OrderController.php
```

```php
namespace App\Http\Controllers\Order;

class OrderController extends Controller
{
    // ...
}
```

Маршрут:

```php
use App\Http\Controllers\Order\OrderController;

Route::get('/orders', [OrderController::class, 'index']);
```

### Примеры из проекта

**Заказы и корзина**

```bash
php artisan make:controller Order/OrderController
php artisan make:controller Basket/BasketController
php artisan make:controller Form/FormController
```

**Админка**

```bash
php artisan make:controller Admin/Order/OrderController
php artisan make:controller Admin/OrderEvent/OrderEventController
php artisan make:controller Admin/Form/FormController
```

**API**

```bash
php artisan make:controller Api/Excel/ExcelController
php artisan make:controller Api/Map/YandexMapController
php artisan make:controller Api/Map/PhotoController
php artisan make:controller Api/Map/PointController
php artisan make:controller Api/Admin/Excel/ReportEcxcelController
php artisan make:controller Api/NotificationsController
php artisan make:controller Api/ProgramController
```

**Backend**

```bash
php artisan make:controller Backend/Partners/TagClientController
php artisan make:controller Backend/Partners/PageTagsClientController
```

**Прочее**

```bash
php artisan make:controller Glossary/GlossaryController
```

### Структура после создания

```
app/Http/Controllers/
├── Order/
│   └── OrderController.php
├── Basket/
│   └── BasketController.php
├── Admin/
│   ├── Order/
│   │   └── OrderController.php
│   ├── OrderEvent/
│   │   └── OrderEventController.php
│   └── Form/
│       └── FormController.php
├── Api/
│   ├── Excel/
│   │   └── ExcelController.php
│   ├── Map/
│   │   ├── YandexMapController.php
│   │   ├── PhotoController.php
│   │   └── PointController.php
│   ├── Admin/
│   │   └── Excel/
│   │       └── ReportEcxcelController.php
│   ├── NotificationsController.php
│   └── ProgramController.php
├── Backend/
│   └── Partners/
│       ├── TagClientController.php
│       └── PageTagsClientController.php
└── Glossary/
    └── GlossaryController.php
```

> **Важно:** не ставьте `/` в начале имени и не добавляйте пробелы — `Order/OrderController`, а не `/ Order/ OrderController`.

## Одно действие (invokable)

Для одного метода — класс с `__invoke`:

```bash
php artisan make:controller ProvisionServer --invokable
```

```php
class ProvisionServer extends Controller
{
    public function __invoke()
    {
        // ...
    }
}
```

```php
Route::post('/server', ProvisionServer::class);
```

## Resource-контроллеры (CRUD)

```bash
php artisan make:controller PhotoController --resource
```

| Метод | URI | Действие |
|-------|-----|----------|
| GET | /photos | index |
| GET | /photos/create | create |
| POST | /photos | store |
| GET | /photos/{photo} | show |
| GET | /photos/{photo}/edit | edit |
| PUT/PATCH | /photos/{photo} | update |
| DELETE | /photos/{photo} | destroy |

```php
use App\Http\Controllers\PhotoController;

Route::resource('photos', PhotoController::class);
```

### API-контроллер (без create и edit)

```bash
php artisan make:controller PhotoController --api
```

```php
Route::apiResource('photos', PhotoController::class);
```

### С моделью и Form Request

```bash
php artisan make:controller PhotoController --model=Photo --resource --requests
```

### Частичный resource

```php
Route::resource('photos', PhotoController::class)->only(['index', 'show']);

Route::resource('photos', PhotoController::class)->except(['create', 'store']);
```

## Middleware

В файле маршрутов:

```php
Route::get('/profile', [UserController::class, 'show'])->middleware('auth');
```

В классе контроллера:

```php
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('log', only: ['index']),
            new Middleware('subscribed', except: ['store']),
        ];
    }
}
```

Через PHP-атрибуты:

```php
use Illuminate\Routing\Attributes\Controllers\Middleware;

#[Middleware('auth')]
#[Middleware('log', only: ['index'])]
class UserController extends Controller
{
    // ...
}
```

## Внедрение зависимостей

**В конструкторе:**

```php
use App\Repositories\UserRepository;

class UserController extends Controller
{
    public function __construct(
        protected UserRepository $users,
    ) {}
}
```

**В методе:**

```php
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

public function store(Request $request): RedirectResponse
{
    $name = $request->name;

    return redirect('/users');
}
```

Параметры маршрута указывайте после зависимостей:

```php
public function update(Request $request, string $id): RedirectResponse
{
    // ...
}
```
