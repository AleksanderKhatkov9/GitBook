# Авторизация и доступ

MoonShine использует стандартную аутентификацию Laravel. Дополнительно можно ограничить доступ к панели целиком и скрывать отдельные пункты меню по группе пользователя.

## Middleware для всей панели

Подключите middleware в `config/moonshine.php`:

```php
'route' => [
    'domain' => env('MOONSHINE_URL', ''),
    'prefix' => env('MOONSHINE_ROUTE_PREFIX', 'admin'),
    'single_page_prefix' => 'page',
    'index' => 'moonshine.index',
    'middlewares' => [
        \App\Http\Middleware\AdminMiddleware::class,
    ],
],
```

### AdminMiddleware

```php
<?php

namespace App\Http\Middleware;

use App\Models\Group;
use App\Models\Permission;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect('/login')->withErrors(
                'Необходимо авторизоваться, чтобы получить доступ к панели администратора.'
            );
        }

        $user = $request->user();
        $permissions = Permission::query()->where('id', $user->id)->get();
        $group = Group::query()->where('id', $permissions[0]->group_id)->get();
        $groupRole = $group[0]->g_name;

        if ($groupRole != 'Сборщики') {
            return $next($request);
        }

        abort(403, 'У этой группы нет прав к админке');
    }
}
```

При отсутствии прав пользователь увидит ответ **403** с сообщением «У этой группы нет прав к админке».

> В production-проекте надёжнее проверять `group_id` напрямую у модели `User` или через роли/политики, а не обращаться к `$permissions[0]` без проверки на пустую коллекцию.

## Ограничение пунктов меню

Для точечного скрытия разделов используйте `canSee()` у `MenuItem`. Метод принимает замыкание с `MoonShineRequest` и должен вернуть `true`, если пункт виден.

Пример: скрыть разделы для пользователей с `group_id = 2` (группа «Сборщики»):

```php
<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Client;
use App\Models\Group;
use App\Models\Permission;
use App\Models\User;
use App\Models\UserRole;
use App\MoonShine\Pages\CustomReport;
use App\MoonShine\Resources\ClientResource;
use App\MoonShine\Resources\GroupResource;
use App\MoonShine\Resources\OrderPhotoResource;
use App\MoonShine\Resources\PermissionResource;
use App\MoonShine\Resources\PointResource;
use App\MoonShine\Resources\UserResource;
use App\MoonShine\Resources\UserRoleResource;
use MoonShine\MoonShineRequest;
use MoonShine\Menu\MenuGroup;
use MoonShine\Menu\MenuItem;
use MoonShine\Providers\MoonShineApplicationServiceProvider;

class MoonShineServiceProvider extends MoonShineApplicationServiceProvider
{
    protected function menu(): array
    {
        return [
            MenuGroup::make('Пользователи', [
                MenuItem::make('Пользователи', new UserResource())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->badge(fn () => User::query()->count())
                    ->icon('heroicons.users'),

                MenuItem::make('Роли', new UserRoleResource())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->badge(fn () => UserRole::query()->count())
                    ->icon('heroicons.user-circle'),

                MenuItem::make('Группа', new GroupResource())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->badge(fn () => Group::query()->count())
                    ->icon('heroicons.user-group'),

                MenuItem::make('Права доступа', new PermissionResource())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->badge(fn () => Permission::query()->count())
                    ->icon('heroicons.key'),
            ])->icon('heroicons.user-plus'),

            MenuGroup::make('Ресурсы', [
                MenuItem::make('Клиенты', new ClientResource())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->badge(fn () => Client::query()->count())
                    ->icon('heroicons.user-circle'),

                MenuItem::make('Фото', new OrderPhotoResource())
                    ->icon('heroicons.device-tablet'),

                MenuItem::make('Метка', new PointResource())
                    ->icon('heroicons.map-pin'),

                MenuItem::make('Отчёт', new CustomReport())
                    ->canSee(fn (MoonShineRequest $request) => auth()->user()->group_id != 2)
                    ->icon('heroicons.document'),
            ])->icon('heroicons.folder-open'),
        ];
    }
}
```

## Два уровня защиты

| Уровень | Механизм | Что делает |
|---------|----------|------------|
| Панель целиком | `AdminMiddleware` в `config/moonshine.php` | Блокирует доступ к `/admin` для неавторизованных и запрещённых групп |
| Отдельные разделы | `->canSee()` в `MoonShineServiceProvider` | Скрывает пункты меню; пользователь не увидит ссылку, но URL ресурса всё ещё нужно защищать на уровне политик |

Для полной защиты ресурсов дополнительно используйте [Policies](https://laravel.com/docs/authorization) Laravel или проверки в `MoonShineRequest` на уровне страниц.
