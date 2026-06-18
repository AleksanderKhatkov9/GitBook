# Поиск

> Документация: [Search | Nova v4](https://nova.laravel.com/docs/4.0/search/)

## Основы

По умолчанию Nova ищет по полям, указанным в `$search` ресурса:

```php
public static $search = [
    'id', 'title',
];
```

## Поиск по связям

Nova позволяет искать по связанным моделям через метод `searchableColumns()`:

```php
use Laravel\Nova\Query\Search\SearchableRelation;

public static function searchableColumns()
{
    return [
        'id',
        new SearchableRelation('client', 'company_name'),
    ];
}
```

Если определён `searchableColumns()`, свойство `$search` можно удалить.

## Пакет search-relations

Для удобного поиска по связям установите [titasgailius/search-relations](https://packagist.org/packages/titasgailius/search-relations):

```bash
composer require titasgailius/search-relations
```

В Resource:

```php
use SearchesRelations;

public static $searchRelations = [
    'client' => ['company_name'],
];
```

## Пример: Campaign

Модели `Company` и `Client`, ресурс `app/Nova/Campaign.php`:

```php
<?php

namespace App\Nova;

use Laravel\Nova\Resource;
use Titasgailius\SearchRelations\SearchesRelations;

class Campaign extends Resource
{
    use SearchesRelations;

    public static $searchRelations = [
        'client' => ['company_name'],
    ];
}
```

## Видео

- [Laracasts — Nova Mastery, эпизод 8](https://laracasts.com/series/laravel-nova-mastery/episodes/8)
- [Поиск в Nova (YouTube)](https://www.youtube.com/watch?v=1wbAJuIfNqg)
