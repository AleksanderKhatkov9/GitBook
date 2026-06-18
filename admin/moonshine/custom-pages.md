# Кастомные страницы

Кастомная страница — отдельный экран в админке без привязки к CRUD-ресурсу. Подходит для отчётов, дашбордов и форм с собственной логикой.

## Генерация страницы

```bash
php artisan moonshine:page
```

Укажите имя страницы, например `CustomReport`. Команда создаст класс в `app/MoonShine/Pages/CustomReport.php`.

## Подключение в меню

Зарегистрируйте страницу в `app/Providers/MoonShineServiceProvider.php`:

```php
<?php

declare(strict_types=1);

namespace App\Providers;

use App\MoonShine\Pages\CustomReport;
use App\MoonShine\Resources\ClientResource;
use App\MoonShine\Resources\OrderPhotoResource;
use App\MoonShine\Resources\PointResource;
use App\MoonShine\Resources\ReportExcelResource;
use MoonShine\Menu\MenuGroup;
use MoonShine\Menu\MenuItem;
use MoonShine\Providers\MoonShineApplicationServiceProvider;

class MoonShineServiceProvider extends MoonShineApplicationServiceProvider
{
    protected function menu(): array
    {
        return [
            MenuGroup::make('Ресурсы', [
                MenuItem::make('Клиенты', new ClientResource())
                    ->icon('heroicons.user-circle'),
                MenuItem::make('Фото', new OrderPhotoResource())
                    ->icon('heroicons.device-tablet'),
                MenuItem::make('Карта', new PointResource())
                    ->icon('heroicons.map-pin'),
                MenuItem::make('Отчёт Excel', new ReportExcelResource())
                    ->icon('heroicons.document'),
                MenuItem::make('Отчёт', new CustomReport())
                    ->icon('heroicons.document'),
            ])->icon('heroicons.folder-open'),
        ];
    }
}
```

`MenuItem::make()` принимает заголовок и экземпляр страницы или ресурса. Иконки — из набора [Heroicons](https://moonshine-laravel.com/docs).

## Контроллер для формы

Если страница обрабатывает отправку формы, создайте обычный Laravel-контроллер и вызовите его из метода страницы или зарегистрируйте маршрут. MoonShine-страница рендерит Blade/Vue-разметку; бизнес-логику удобно держать в контроллере или сервисе.

## Связь с компонентами

Кастомную страницу можно комбинировать с [кастомными компонентами](components.md): компонент отвечает за фрагмент UI, страница — за целый экран в меню.
