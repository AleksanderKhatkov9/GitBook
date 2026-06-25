# Listing records

> Официальная документация: [Listing records | Filament 5.x](https://filamentphp.com/docs/5.x/resources/listing-records)

Страница **List** ресурса отображает таблицу записей Eloquent-модели. Ниже — настройка вкладок, авторизация, модификация запроса и кастомизация содержимого страницы.

## Вкладки для фильтрации записей

Над таблицей можно добавить вкладки с предопределёнными условиями. Каждая вкладка по-своему ограничивает Eloquent-запрос таблицы. Добавьте метод `getTabs()` в класс List-страницы и верните массив объектов `Tab`:

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

public function getTabs(): array
{
    return [
        'all' => Tab::make(),
        'active' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', true)),
        'inactive' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', false)),
    ];
}
```

### Настройка подписей вкладок

Ключи массива используются как идентификаторы вкладок и сохраняются в query string URL. Подпись по умолчанию формируется из ключа, но её можно переопределить, передав label в `make()`:

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

public function getTabs(): array
{
    return [
        'all' => Tab::make('All customers'),
        'active' => Tab::make('Active customers')
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', true)),
        'inactive' => Tab::make('Inactive customers')
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', false)),
    ];
}
```

### Иконки на вкладках

Иконку можно задать методом `icon()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->icon('heroicon-m-user-group')
```

Позицию иконки (до или после текста) меняет `iconPosition()`:

```php
use Filament\Support\Enums\IconPosition;

Tab::make()
    ->icon('heroicon-m-user-group')
    ->iconPosition(IconPosition::After)
```

### Бейджи на вкладках

Счётчик или текст на вкладке задаётся методом `badge()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->badge(Customer::query()->where('active', true)->count())
```

#### Цвет бейджа

Цвет меняется через `badgeColor()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->badge(Customer::query()->where('active', true)->count())
    ->badgeColor('success')
```

Метод `badgeColor()` принимает не только статическое значение, но и замыкание с utility injection (например, `$badge` — вычисленное значение бейджа).

#### Отложенная загрузка бейджей

Если подсчёт для бейджа дорогой (большие таблицы), начальная загрузка страницы может тормозить. Метод `deferBadge()` загружает значения асинхронно после рендера:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->badge(static fn (): int => Customer::query()->where('active', true)->count())
    ->deferBadge()
```

> **Важно:** при `deferBadge()` значение в `badge()` должно возвращаться из функции. Если передать `badge(Customer::query()->count())`, запрос выполнится сразу при построении вкладки, и отложенная загрузка не сработает.

Пока бейджи грузятся, на их месте показывается индикатор загрузки; после получения данных он заменяется на значение.

### Дополнительные HTML-атрибуты

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->extraAttributes(['data-cy' => 'statement-confirmed-tab'])
```

### Вкладка по умолчанию

Активную при загрузке вкладку задаёт `getDefaultActiveTab()` — верните ключ из массива `getTabs()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

public function getTabs(): array
{
    return [
        'all' => Tab::make(),
        'active' => Tab::make(),
        'inactive' => Tab::make(),
    ];
}

public function getDefaultActiveTab(): string | int | null
{
    return 'active';
}
```

### Исключение query вкладки при resolve записи

При взаимодействии с записью (например, кнопка действия) Filament заново получает её из БД. По умолчанию применяется query активной вкладки — пользователь не может обратиться к записи вне текущего scope.

Если действие меняет состояние записи (например, «Active» → inactive), последующие действия в том же модальном окне могут не найти запись. Метод `excludeQueryWhenResolvingRecord()` отключает scope вкладки при resolve:

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

public function getTabs(): array
{
    return [
        'active' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', true))
            ->excludeQueryWhenResolvingRecord(),
        'inactive' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', false))
            ->excludeQueryWhenResolvingRecord(),
    ];
}
```

> **Важно:** не используйте `excludeQueryWhenResolvingRecord()` на вкладках, которые ограничивают доступ (tenant, владелец записи и т.п.) — иначе можно обойти авторизацию.

## Авторизация

Filament учитывает [model policies](https://laravel.com/docs/authorization#creating-policies), зарегистрированные в приложении.

| Метод policy | Назначение |
|--------------|------------|
| `viewAny()` | Доступ к странице List |
| `reorder()` | [Изменение порядка записей](https://filamentphp.com/docs/5.x/resources/listing-records#reordering-records) |

Страница List доступна, если `viewAny()` возвращает `true`.

## Кастомизация Eloquent-запроса таблицы

Помимо [глобальной настройки query ресурса](https://filamentphp.com/docs/5.x/resources/overview#customizing-the-resource-eloquent-query), для таблицы на List-странице можно использовать `modifyQueryUsing()` в методе `table()`:

```php
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public static function table(Table $table): Table
{
    return $table
        ->modifyQueryUsing(fn (Builder $query) => $query->withoutGlobalScopes());
}
```

## Кастомное содержимое страницы

У каждой страницы Filament есть [schema](https://filamentphp.com/docs/5.x/schemas/overview) — структура и содержимое. Её переопределяют методом `content()`. Для List-страницы по умолчанию:

```php
use Filament\Schemas\Components\EmbeddedTable;
use Filament\Schemas\Components\RenderHook;
use Filament\Schemas\Schema;

public function content(Schema $schema): Schema
{
    return $schema
        ->components([
            $this->getTabsContentComponent(),
            RenderHook::make(PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_BEFORE),
            EmbeddedTable::make(),
            RenderHook::make(PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_AFTER),
        ]);
}
```

В массив `components()` можно добавлять любые [schema components](https://filamentphp.com/docs/5.x/schemas/overview), менять порядок или удалять ненужные блоки.

### Собственный Blade view

Для более глубокой кастомизации переопределите статическое свойство `$view` на классе страницы:

```php
protected string $view = 'filament.resources.users.pages.list-users';
```

Создайте view `resources/views/filament/resources/users/pages/list-users.blade.php`:

```blade
<x-filament-panels::page>
    {{ $this->content }}
</x-filament-panels::page>
```

`{{ $this->content }}` рендерит содержимое из `content()`. Его можно убрать, если нужна полностью своя разметка.
