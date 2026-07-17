# Testing

> Источник: [Testing](https://laravel.com/docs/13.x/testing) · [HTTP Tests](https://laravel.com/docs/13.x/http-tests) · [Database Testing](https://laravel.com/docs/13.x/database-testing)

Laravel из коробки поддерживает [Pest](https://pestphp.com) и [PHPUnit](https://phpunit.de). Есть `phpunit.xml` и хелперы для выразительных тестов.

## Feature vs Unit

| Тип | Каталог | Что проверяет |
|-----|---------|---------------|
| **Feature** | `tests/Feature/` | HTTP, БД, взаимодействие компонентов (основной тип) |
| **Unit** | `tests/Unit/` | изолированный метод/класс; приложение Laravel не бутится |

Большинство тестов должны быть Feature — они дают уверенность, что система работает целиком.

## Окружение

При запуске тестов Laravel ставит `APP_ENV=testing` (из `phpunit.xml`). Session и cache — драйвер `array` (данные не сохраняются).

Опционально — файл `.env.testing` в корне проекта.

Перед тестами с изменённым конфигом:

```bash
php artisan config:clear
```

## Создание тестов

```bash
php artisan make:test UserTest           # Feature
php artisan make:test UserTest --unit    # Unit
```

### Pest

```php
<?php

test('basic', function () {
    expect(true)->toBeTrue();
});
```

### PHPUnit

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function test_basic_test(): void
    {
        $this->assertTrue(true);
    }
}
```

Если переопределяете `setUp` / `tearDown` — вызывайте `parent::setUp()` / `parent::tearDown()`.

## Запуск

```bash
php artisan test
php artisan test --testsuite=Feature --stop-on-failure
./vendor/bin/pest
./vendor/bin/phpunit
```

### Параллельно

```bash
composer require brianium/paratest --dev
php artisan test --parallel
php artisan test --parallel --processes=4
php artisan test --parallel --recreate-databases
```

Laravel создаёт отдельную тестовую БД на процесс (`db_test_1`, `db_test_2`, …).

### Coverage и профиль

```bash
php artisan test --coverage
php artisan test --coverage --min=80
php artisan test --profile          # 10 самых медленных тестов
```

Нужен Xdebug или PCOV.

## HTTP-тесты

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_returns_ok(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_can_view_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('Dashboard');
    }

    public function test_store_post(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/posts', [
            'title' => 'Hello',
            'body' => 'Content',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('posts', ['title' => 'Hello']);
    }
}
```

Полезные assertions:

```php
$response->assertStatus(200);
$response->assertOk();
$response->assertRedirect('/login');
$response->assertJson(['status' => 'ok']);
$response->assertSee('текст');
$response->assertForbidden();
$response->assertNotFound();
```

CSRF в тестах отключён автоматически.

## Pest-пример Feature

```php
<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest is redirected from dashboard', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated user sees dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertOk();
});
```

## Работа с БД в тестах

```php
use Illuminate\Foundation\Testing\RefreshDatabase;

use RefreshDatabase; // миграции + откат между тестами
```

Альтернативы: `DatabaseMigrations`, `DatabaseTruncation`.

Фабрики:

```bash
php artisan make:factory PostFactory --model=Post
```

```php
Post::factory()->create(['title' => 'Fixed']);
Post::factory()->count(5)->create();
Post::factory()->for($user)->create();
```

Проверки:

```php
$this->assertDatabaseHas('users', ['email' => 'ada@example.com']);
$this->assertDatabaseMissing('posts', ['title' => 'Draft']);
$this->assertSoftDeleted('posts', ['id' => 1]);
```

## Кэш конфига в тестах

Чтобы не читать все config-файлы на каждый тест:

```php
use Illuminate\Foundation\Testing\WithCachedConfig;

class ConfigTest extends TestCase
{
    use WithCachedConfig;
}
```

Pest:

```php
use Illuminate\Foundation\Testing\WithCachedConfig;

pest()->use(WithCachedConfig::class);
```

## Чеклист

1. Пишите Feature-тесты на критичные маршруты (auth, CRUD, оплату).
2. Используйте `RefreshDatabase` + factories, не полагайтесь на прод-данные.
3. Запускайте `php artisan test` в CI.
4. При росте suite — `--parallel` и `--profile`.

См. также: [Структура проекта](structure.md) · [Eloquent ORM](eloquent.md) · [Security](security.md)
