# Кастомизация

## NovaServiceProvider

Основная точка настройки Nova — `app/Providers/NovaServiceProvider.php`.

### Подключение своих стилей и скриптов

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Laravel\Nova\Cards\Help;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;
use Laravel\Nova\NovaApplicationServiceProvider;

class NovaServiceProvider extends NovaApplicationServiceProvider
{
    public function boot()
    {
        parent::boot();

        Nova::sortResourcesBy(static fn ($resource) => $resource::$priority ?? 9999);

        Nova::style('nova', asset('css/nova.css'));
        Nova::style('fontawesome', asset('/plugins/fontawesome-free/css/all.min.css'));

        Nova::serving(function (ServingNova $event) {
            Nova::script('nova', asset('js/nova.js'));
        });
    }

    protected function routes()
    {
        Nova::routes()
            ->withAuthenticationRoutes()
            ->withPasswordResetRoutes()
            ->register();
    }

    protected function gate()
    {
        Gate::define('viewNova', function ($user) {
            return in_array($user->email, [
                // 'admin@example.com',
            ]);
        });
    }

    protected function cards()
    {
        return [
            new Help,
        ];
    }

    protected function dashboards()
    {
        return [];
    }

    public function tools()
    {
        return [];
    }

    public function register()
    {
        //
    }
}
```

### Подключение отдельного JS-файла

```php
public function boot()
{
    parent::boot();

    Nova::serving(function (ServingNova $event) {
        Nova::script('multiselect-search', asset('js/nova/nova-multiselect-search.js'));
    });
}
```

Файл должен находиться по пути:

```
public/js/nova/nova-multiselect-search.js
```

## Middleware

Для добавления кастомного middleware откройте `config/nova.php`:

```php
'middleware' => [
    'web',
    Authenticate::class,
    DispatchServingNovaEvent::class,
    BootTools::class,
    Authorize::class,
    NovaClientGroupMiddleware::class,
],
```

Создайте middleware и зарегистрируйте его в массиве `middleware` конфига Nova.

## Сортировка ресурсов в меню

Задайте свойство `$priority` в Resource (меньшее значение — выше в списке) или используйте:

```php
Nova::sortResourcesBy(static fn ($resource) => $resource::$priority ?? 9999);
```
