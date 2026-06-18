# Кастомные компоненты

Компоненты MoonShine позволяют вынести произвольную разметку и логику в отдельный класс и подключать его на страницах ресурсов.

> Официальная документация: [Components — MoonShineComponent](https://moonshine-laravel.com/docs/resource/components/components-moonshine_component)

Видео: [Создание компонентов MoonShine](https://www.youtube.com/watch?v=pHSaMeBjVDk&list=PLTucyHptHtTnfDI18bZnYEgvJIFmW8fGy&index=2)

## Генерация компонента

```bash
php artisan moonshine:component Form
```

Команда создаёт класс в `app/MoonShine/Components/Form.php`.

## Класс компонента

```php
<?php

declare(strict_types=1);

namespace App\MoonShine\Components;

use MoonShine\Components\MoonShineComponent;

/**
 * @method static static make()
 */
final class Form extends MoonShineComponent
{
    protected string $view = 'admin.components.form';

    public function __construct()
    {
        //
    }

    protected function viewData(): array
    {
        return [];
    }
}
```

Свойство `$view` указывает путь к Blade-шаблону: `resources/views/admin/components/form.blade.php`.

## Подключение к странице ресурса

Компонент добавляется в один из слоёв страницы — `topLayer()`, `mainLayer()` или `bottomLayer()`.

Пример для `IndexPage` ресурса `OrderPhoto`:

```php
<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\OrderPhoto;

use App\MoonShine\Components\Form;
use App\Models\OrderPhoto;
use MoonShine\Fields\ID;
use MoonShine\Fields\Text;
use MoonShine\Pages\Crud\IndexPage;

class OrderPhotoIndexPage extends IndexPage
{
    protected string $model = OrderPhoto::class;

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Пользователь', 'name'),
            Text::make('Каталог', 'catalog'),
            Text::make('Товар', 'product'),
            Text::make('Производитель', 'producer'),
            Text::make('Бренд', 'brand'),
            Text::make('Подбренд', 'sub_brand'),
            Text::make('Тип конструкции', ''),
            Text::make('Размер конструкции', ''),
            Text::make('Вращение конструкции', 'spin'),
            Text::make('Тип плоскости', 'image_type'),
            Text::make('Стороны', ''),
            Text::make('Освещение', ''),
            Text::make(
                'Описание месторасположения конструкции (адрес, обозначение оператора)',
                'address'
            ),
        ];
    }

    protected function topLayer(): array
    {
        return [
            ...parent::topLayer(),
            Form::make(),
        ];
    }

    public function search(): array
    {
        return ['id', 'name', 'client', 'city'];
    }
}
```

`Form::make()` рендерит шаблон `admin.components.form` над таблицей записей.

## Blade-шаблон

`resources/views/admin/components/form.blade.php`

### Вариант с Vue.js

```blade
<link href="{{ asset('css/app.css') }}">
<script src="{{ asset('js/app.js') }}" async defer></script>

<div id="app">
    <admin-form></admin-form>
</div>
```

Подключите скомпилированные assets приложения и зарегистрируйте Vue-компонент `admin-form` в `app.js`.

### Вариант без Vue

Можно вывести обычную HTML-разметку или форму прямо в Blade — без JavaScript-фреймворка.

## Работа со связями в ресурсе

Примеры загрузки связанных данных через Eloquent:

```php
// $orderPhoto = OrderPhoto::with('city')->find(1);
// $cityName = $orderPhoto->city->name;

// $orderPhoto = OrderPhoto::with('client')->find(1);
// $companyName = $orderPhoto->client->company_name;
```

Данные из связей можно передать в шаблон через `viewData()` компонента.
