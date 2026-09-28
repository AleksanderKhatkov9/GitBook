# Тестирование

> Источник: [Testing](https://laravel.com/docs/13.x/testing) · [HTTP Tests](https://laravel.com/docs/13.x/http-tests) · [Database Testing](https://laravel.com/docs/13.x/database-testing)

Laravel из коробки поддерживает [Pest](https://pestphp.com) и [PHPUnit](https://phpunit.de). Есть `phpunit.xml` и хелперы для выразительных тестов.

## Feature vs Unit

| Тип | Каталог | Что проверяет |
|-----|---------|---------------|
| **Feature** | `tests/Feature/` | HTTP, БД, сервисы с Eloquent, взаимодействие компонентов |
| **Unit** | `tests/Unit/` | изолированный метод/класс; приложение Laravel **не** бутится |

Большинство тестов — Feature: они дают уверенность, что система работает целиком. Тесты сервисов с запросами к БД (например `BoardNovaServiceQueryTest`) тоже Feature.

## Окружение

При запуске тестов Laravel ставит `APP_ENV=testing` (из `phpunit.xml`). Session и cache — драйвер `array`.

Опционально — файл `.env.testing` в корне проекта.

Перед тестами с изменённым конфигом:

```bash
php artisan config:clear
```

В `phpunit.xml` обычно задают тестовую БД:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

Или отдельная MySQL/PostgreSQL БД только для тестов — не прод.

---

## Как создать тест

### Команды Artisan

```bash
# Feature-тест (по умолчанию → tests/Feature/)
php artisan make:test BoardNovaServiceQueryTest

# Unit-тест → tests/Unit/
php artisan make:test BoardNovaServiceQueryTest --unit

# Pest вместо PHPUnit
php artisan make:test BoardNovaServiceQueryTest --pest

# Сразу в подпапку
php artisan make:test Services/BoardNovaServiceQueryTest
# → tests/Feature/Services/BoardNovaServiceQueryTest.php
```

### Что получится

Файл `tests/Feature/BoardNovaServiceQueryTest.php`:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BoardNovaServiceQueryTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
```

Дальше заменяете `test_example` на свои методы и логику.

### Правила именования

| Что | Правило | Пример |
|-----|---------|--------|
| Класс | суффикс `Test` | `BoardNovaServiceQueryTest` |
| Метод | `test_` + описание **или** атрибут `#[Test]` | `test_it_filters_boards_by_status` |
| Фильтр Artisan | имя класса **или** метода | `--filter BoardNovaServiceQueryTest` |

PHPUnit находит методы, начинающиеся с `test`, или помеченные `#[Test]` / `@test`.

---

## Как записать тест (пошагово)

1. **Создать файл** — `php artisan make:test ...`
2. **Подключить БД** — `use RefreshDatabase;` если тест трогает таблицы
3. **Подготовить данные** — factories / `Model::create([...])`
4. **Вызвать код** — сервис, HTTP, команду
5. **Проверить результат** — `assert*`, `assertDatabaseHas`, статус ответа

### Пример: тест сервиса с запросом (как BoardNovaServiceQueryTest)

Допустим сервис:

```php
<?php

namespace App\Services;

use App\Models\Board;
use Illuminate\Database\Eloquent\Collection;

class BoardNovaService
{
    public function queryByStatus(?string $status = null): Collection
    {
        return Board::query()
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderBy('id')
            ->get();
    }
}
```

Тест:

```php
<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Services\BoardNovaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BoardNovaServiceQueryTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_all_boards_without_filter(): void
    {
        Board::factory()->count(3)->create();

        $boards = app(BoardNovaService::class)->queryByStatus();

        $this->assertCount(3, $boards);
    }

    public function test_it_filters_boards_by_status(): void
    {
        Board::factory()->create(['status' => 'open']);
        Board::factory()->create(['status' => 'closed']);
        Board::factory()->create(['status' => 'open']);

        $boards = app(BoardNovaService::class)->queryByStatus('open');

        $this->assertCount(2, $boards);
        $this->assertTrue($boards->every(fn (Board $b) => $b->status === 'open'));
    }

    public function test_it_returns_empty_collection_when_no_matches(): void
    {
        Board::factory()->create(['status' => 'open']);

        $boards = app(BoardNovaService::class)->queryByStatus('archived');

        $this->assertCount(0, $boards);
        $this->assertTrue($boards->isEmpty());
    }
}
```

Нужна фабрика:

```bash
php artisan make:factory BoardFactory --model=Board
```

```php
// database/factories/BoardFactory.php
public function definition(): array
{
    return [
        'title' => fake()->sentence(3),
        'status' => 'open',
    ];
}
```

### Пример: HTTP Feature-тест

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

$this->assertDatabaseHas('users', ['email' => 'ada@example.com']);
$this->assertDatabaseMissing('posts', ['title' => 'Draft']);
$this->assertSoftDeleted('posts', ['id' => 1]);
$this->assertCount(2, $collection);
$this->assertTrue($condition);
$this->assertSame('open', $board->status);
```

CSRF в тестах отключён автоматически.

---

## Запуск тестов

### Все тесты

```bash
php artisan test
./vendor/bin/phpunit
./vendor/bin/pest
```

### Один класс / метод — `--filter`

```bash
# весь класс BoardNovaServiceQueryTest
php artisan test --filter BoardNovaServiceQueryTest

# один метод внутри класса
php artisan test --filter test_it_filters_boards_by_status

# класс + кусок имени метода
php artisan test --filter BoardNovaServiceQueryTest::test_it_filters

# путь к файлу
php artisan test tests/Feature/BoardNovaServiceQueryTest.php
```

`--filter` — это regex по имени класса/метода. Удобно при разработке одного сервиса, чтобы не гонять весь suite.

### Suite и остановка на ошибке

```bash
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit
php artisan test --stop-on-failure
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

---

## Pest (кратко)

```bash
php artisan make:test BoardNovaServiceQueryTest --pest
```

```php
<?php

use App\Models\Board;
use App\Services\BoardNovaService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('filters boards by status', function () {
    Board::factory()->create(['status' => 'open']);
    Board::factory()->create(['status' => 'closed']);

    $boards = app(BoardNovaService::class)->queryByStatus('open');

    expect($boards)->toHaveCount(1)
        ->and($boards->first()->status)->toBe('open');
});
```

Запуск тот же: `php artisan test --filter BoardNovaServiceQueryTest`.

---

## Работа с БД в тестах

```php
use Illuminate\Foundation\Testing\RefreshDatabase;

class BoardNovaServiceQueryTest extends TestCase
{
    use RefreshDatabase; // миграции + чистая БД перед каждым тестом
}
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

Если переопределяете `setUp` / `tearDown` — вызывайте `parent::setUp()` / `parent::tearDown()`.

---

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

---

## Чеклист: от нуля до фильтра

```bash
# 1. Создать тест
php artisan make:test BoardNovaServiceQueryTest

# 2. Написать методы test_... + RefreshDatabase + factories

# 3. Запустить только этот класс
php artisan test --filter BoardNovaServiceQueryTest

# 4. Упал один метод — гоняем его
php artisan test --filter test_it_filters_boards_by_status

# 5. Перед PR — весь suite
php artisan test
```

1. Feature-тесты на критичные маршруты и сервисы с запросами.
2. `RefreshDatabase` + factories, не прод-данные.
3. В CI — `php artisan test`.
4. При росте suite — `--parallel` и `--profile`.

См. также: [Структура проекта](structure.md) · [Eloquent ORM](eloquent.md) · [Безопасность](security.md)
