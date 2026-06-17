# Маршруты

> Источник: [Routing | Laravel 13.x](https://laravel.com/docs/13.x/routing)

Маршруты определяются в `routes/web.php`.

## Базовые маршруты

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return 'Привет, Laravel!';
});
```

## Маршрут с параметром

```php
Route::get('/user/{id}', function (string $id) {
    return 'User ' . $id;
});
```

## Контроллер

```bash
php artisan make:controller PostController
```

```php
use App\Http\Controllers\PostController;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
```

```php
// app/Http/Controllers/PostController.php
namespace App\Http\Controllers;

class PostController extends Controller
{
    public function index()
    {
        return view('posts.index');
    }

    public function show(string $id)
    {
        return view('posts.show', ['id' => $id]);
    }
}
```

## Именованные маршруты

```php
Route::get('/profile', function () {
    // ...
})->name('profile');
```

```html
<a href="{{ route('profile') }}">Профиль</a>
```

## Группы маршрутов

```php
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        // /admin/users
    });
});
```
