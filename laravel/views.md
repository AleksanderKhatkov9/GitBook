# Представления (Blade)

> Источник: [Views | Laravel 13.x](https://laravel.com/docs/13.x/views)

Blade — шаблонизатор Laravel. Файлы лежат в `resources/views/`.

## Создание шаблона

`resources/views/hello.blade.php`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
</head>
<body>
    <h1>{{ $title }}</h1>
    <p>Привет, {{ $name }}!</p>
</body>
</html>
```

## Возврат из маршрута

```php
Route::get('/hello', function () {
    return view('hello', [
        'title' => 'Моя страница',
        'name'  => 'Мир',
    ]);
});
```

## Наследование шаблонов

`resources/views/layouts/app.blade.php`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
    @yield('content')
</body>
</html>
```

`resources/views/posts/index.blade.php`:

```html
@extends('layouts.app')

@section('title', 'Посты')

@section('content')
    <h1>Список постов</h1>
@endsection
```

## Условия и циклы

```html
@if ($posts->count())
    <ul>
        @foreach ($posts as $post)
            <li>{{ $post->title }}</li>
        @endforeach
    </ul>
@else
    <p>Постов нет.</p>
@endif
```

## Компоненты

```bash
php artisan make:component Alert
```

```html
<x-alert type="success" message="Сохранено!" />
```
