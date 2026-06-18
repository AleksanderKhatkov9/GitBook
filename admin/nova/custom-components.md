# Кастомные компоненты

Кастомные карточки (Cards), инструменты (Tools) и поля позволяют расширить Nova под задачи проекта.

## Структура папки

```
nova-components/
└── Statistic/
    ├── routes/
    │   └── api.php          # маршруты компонента
    ├── src/
    │   ├── Statistic.php    # класс Card
    │   └── CardServiceProvider.php
    ├── resources/
    │   └── js/
    │       ├── card.js
    │       └── components/
    │           └── Card.vue
    └── dist/                # скомпилированные assets
        ├── js/
        └── css/
```

## Класс Card

`src/Statistic.php`:

```php
<?php

namespace Bzr\Statistic;

use Laravel\Nova\Card;

class Statistic extends Card
{
    /**
     * The width of the card (1/3, 1/2, or full).
     *
     * @var string
     */
    public $width = 'full';

    /**
     * Get the component name for the element.
     *
     * @return string
     */
    public function component()
    {
        return 'statistic';
    }
}
```

## CardServiceProvider

`src/CardServiceProvider.php`:

```php
<?php

namespace Bzr\Statistic;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class CardServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            Nova::script('statistic', __DIR__.'/../dist/js/card.js');
            Nova::style('statistic', __DIR__.'/../dist/css/card.css');
        });
    }

    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova'])
            ->prefix('nova-vendor/statistic')
            ->group(__DIR__.'/../routes/api.php');
    }

    public function register()
    {
        //
    }
}
```

## Маршруты компонента

`routes/api.php` — API-эндпоинты, доступные из Vue-компонента.

Примеры URL:

| Проект | Маршрут |
|--------|---------|
| bzr-analytics | `nova-vendor/board/boards/{id}` |
| bzr-mediaspace | `nova-vendor/order/orders/{id}` |

## Подключение Vue-компонентов

`nova-components/Order/resources/js/card.js`:

```javascript
import lodashGet from 'lodash/get'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Card from './components/Card'
import OrderDetails from './components/Order'
import Loading from '../../../../nova/resources/js/components/LoadingCard'

Nova.booting((Vue, router, store) => {
    Vue.prototype.$get = lodashGet
    Vue.use(Element)
    Vue.component('order', Card)
    Vue.component('order-details', OrderDetails)
    Vue.component('loading', Loading)
})
```

## Axios-запросы к маршрутам Nova

В Vue-компоненте используйте префикс `nova-vendor`:

```javascript
const resourceId = currentUrl.replace('http://lgm.loc/admin/resources/order-statistics/', '')

axios.get(`/nova-vendor/order/order-statistics/` + resourceId)
```

Примеры рабочих URL:

```
# bzr-analytics
http://bzr-analytics.loc/nova-api/boards/1
http://bzr-analytics.loc/nova-vendor/board/boards/1

# bzr-mediaspace
http://bzr-mediaspace.loc/nova-api/order-statistics/37
http://bzr-mediaspace.loc/nova-vendor/order/orders/37
```

> Nova API (`nova-api/...`) и vendor-маршруты (`nova-vendor/...`) — разные точки входа. Для кастомных компонентов используйте `nova-vendor/{component-name}/...`.

## Сборка assets

Каждый компонент содержит `webpack.mix.js`. Команды сборки:

```bash
# Разработка
npm run dev

# Продакшн
npm run prod

# Автопересборка при изменениях
npm run watch
```

Для конкретных компонентов проекта:

```bash
cd nova-components/Order
npm run dev
# или
npm run build-order
npm run build-order-prod
```

Пример пути к данным:

```
storage/app/uploads/json/board.json
```

## Деплой на тестовый/продакшн сервер

Если компонент не работает после деплоя, на сервере выполните:

```bash
cd nova-components/Order
npm update
npm run prod
```

Убедитесь, что папка `nova-components/` присутствует в релизе и assets пересобраны.
