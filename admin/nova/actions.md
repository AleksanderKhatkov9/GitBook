# Действия

Actions — кнопки на странице ресурса, которые выполняют операции над одной или несколькими записями.

## Создание Action

```bash
php artisan nova:action UpdateBoardStatistic
```

Класс появится в `app/Nova/Actions/`. Зарегистрируйте action в соответствующем Resource:

```php
public function actions(NovaRequest $request)
{
    return [
        new UpdateBoardStatistic,
    ];
}
```

## Примеры и материалы

| Ресурс | Ссылка |
|--------|--------|
| Nova Page | [github.com/whitecube/nova-page](https://github.com/whitecube/nova-page) |
| Nova Core Components | [codecraftsman.us](https://www.codecraftsman.us/use-laravel-nova-core-components-in-your-custom-component/) |
| Nova Card options | [Stack Overflow](https://stackoverflow.com/questions/72049645/laravel-nova-card-options-missing-function) |
| Nova Cards (видео) | [YouTube](https://www.youtube.com/watch?v=WWK2wOhEAdM&t=1870s) |
| HTML Card | [nova-html-card](https://github.com/InteractionDesignFoundation/nova-html-card) |
| Laracasts — Fields | [Эпизод 14](https://laracasts.com/series/laravel-nova-mastery/episodes/14?autoplay=true) |

## Detached Actions

Для кнопок вне таблицы (на дашборде или в шапке) используйте пакет [gobrightspot/nova-detached-actions](https://github.com/gobrightspot/nova-detached-actions):

```bash
composer require gobrightspot/nova-detached-actions
```
