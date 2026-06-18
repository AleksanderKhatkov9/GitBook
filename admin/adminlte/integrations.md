# Интеграции

> Официальная документация: [Integrations | AdminLTE 4](https://adminlte.io/themes/v4/docs/integrations.html)

AdminLTE подключается к любому стеку с HTML-шаблонами. Ниже — типичная интеграция с **Laravel + Vite**.

## Laravel: layout

`resources/views/layouts/admin.blade.php`:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('title', config('app.name'))</title>
  @vite(['resources/css/admin.css', 'resources/js/admin.js'])
</head>
<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
  <div class="app-wrapper">
    @include('layouts.partials.admin-header')
    @include('layouts.partials.admin-sidebar')

    <main class="app-main">
      <div class="app-content-header">
        <div class="container-fluid">
          <h3 class="mb-0">@yield('page-title')</h3>
        </div>
      </div>
      <div class="app-content">
        <div class="container-fluid">
          @yield('content')
        </div>
      </div>
    </main>

    @include('layouts.partials.admin-footer')
  </div>
</body>
</html>
```

Страница:

```blade
@extends('layouts.admin')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
  <div class="card">...</div>
@endsection
```

## Vite: assets

```bash
npm install admin-lte@4 bootstrap @popperjs/core overlayscrollbars bootstrap-icons
```

`resources/css/admin.css`:

```css
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "overlayscrollbars/styles/overlayscrollbars.css";
@import "admin-lte/dist/css/adminlte.min.css";
```

`resources/js/admin.js`:

```js
import "bootstrap"
import "admin-lte"
```

`vite.config.js` — добавьте `admin.css` и `admin.js` в `input`.

## Composer (без npm)

```bash
composer require "almasaeed2010/adminlte=4.0.0"
```

Подключите файлы из `vendor/almasaeed2010/adminlte/dist/` через `asset()` или опубликуйте в `public/`.

## CDN в Blade

Для прототипа достаточно тегов из [Установка](installation.md) в layout.

## Меню из роутов

Генерируйте sidebar из конфига или `@foreach` по массиву пунктов с проверкой `request()->routeIs()` для `active`.

## Другие фреймворки

| Стек | Подход |
|------|--------|
| Symfony | Twig layout + Webpack Encore / AssetMapper |
| Rails | Layout + importmap или esbuild |
| SPA (Vue/React) | Только shell в layout или отдельный admin SPA |

## Связанные разделы

- [Быстрый старт](getting-started.md)
- [Деплой](deployment.md)
