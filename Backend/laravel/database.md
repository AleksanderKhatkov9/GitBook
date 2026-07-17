# Database

> Источники: [Database](https://laravel.com/docs/13.x/database) · [Query Builder](https://laravel.com/docs/13.x/queries) · [MongoDB](https://laravel.com/docs/13.x/mongodb) · [Migrations](migrations.md)

Laravel работает с БД через raw SQL, Query Builder и [Eloquent ORM](eloquent.md).

## Поддерживаемые СУБД

- MariaDB 10.3+
- MySQL 5.7+
- PostgreSQL 10.0+
- SQLite 3.26.0+
- SQL Server 2017+
- **MongoDB** — через пакет `mongodb/laravel-mongodb`

Конфиг: `config/database.php`. Значения обычно берутся из `.env`.

## Конфигурация

### SQLite (по умолчанию)

```ini
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

При создании проекта через Laravel Installer файл `database/database.sqlite` и миграции создаются автоматически.

### MySQL

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### URL подключения

```ini
DB_URL=mysql://root:password@127.0.0.1/forge?charset=UTF-8
```

Формат: `driver://username:password@host:port/database?options`

## Raw SQL через `DB`

```php
use Illuminate\Support\Facades\DB;

$users = DB::select('select * from users where active = ?', [1]);

DB::insert('insert into users (name, email) values (?, ?)', ['Ada', 'ada@example.com']);

$affected = DB::update('update users set votes = 100 where name = ?', ['Ada']);

$deleted = DB::delete('delete from users where votes = 0');

DB::statement('drop table if exists old_posts');
```

Всегда передавайте параметры отдельно (`?`) — защита от SQL-инъекций.

### Несколько подключений

```php
$users = DB::connection('mysql')->select(/* ... */);
```

## Query Builder

Fluent API без Eloquent-моделей:

```php
use Illuminate\Support\Facades\DB;

$users = DB::table('users')
    ->where('active', 1)
    ->orderBy('name')
    ->get();

$user = DB::table('users')->where('id', 1)->first();

$email = DB::table('users')->where('id', 1)->value('email');

$ids = DB::table('users')->pluck('id');

DB::table('users')->insert([
    'name' => 'Ada',
    'email' => 'ada@example.com',
]);

DB::table('users')->where('id', 1)->update(['votes' => 1]);

DB::table('users')->where('votes', 0)->delete();
```

Агрегаты и joins:

```php
$count = DB::table('users')->count();
$max = DB::table('orders')->max('price');

$users = DB::table('users')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'orders.price')
    ->get();
```

## Транзакции

```php
use Illuminate\Support\Facades\DB;

DB::transaction(function () {
    DB::table('users')->where('id', 1)->decrement('votes');
    DB::table('posts')->where('user_id', 1)->update(['active' => 0]);
});
```

При исключении — автоматический rollback. Вручную:

```php
DB::beginTransaction();
try {
    // ...
    DB::commit();
} catch (\Throwable $e) {
    DB::rollBack();
    throw $e;
}
```

## Миграции и схема

Версионирование структуры БД — отдельная глава: **[Миграции](migrations.md)**.

Кратко:

```bash
php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:rollback
```

Добавление колонок в существующую таблицу:

```bash
php artisan make:migration add_meta_seo_columns_to_pages_table --table=pages
```

## Сидеры и фабрики

```bash
php artisan make:seeder UserSeeder
php artisan db:seed
php artisan migrate:fresh --seed
```

```bash
php artisan make:factory PostFactory
```

```php
Post::factory()->count(10)->create();
```

## CLI и инспекция

```bash
php artisan db              # Консоль БД
php artisan db:show         # Инфо о БД
php artisan db:table users  # Структура таблицы
php artisan db:monitor      # Мониторинг
```

## MongoDB

> Источник: [MongoDB | Laravel 13.x](https://laravel.com/docs/13.x/mongodb)

Документная NoSQL БД. Интеграция — пакет [mongodb/laravel-mongodb](https://www.mongodb.com/docs/drivers/php/laravel-mongodb/) (официально поддерживается MongoDB).

### Установка

1. Расширение PHP `mongodb` (в Herd / php.new уже есть):

```bash
pecl install mongodb
```

2. Пакет Laravel:

```bash
composer require mongodb/laravel-mongodb
```

### `.env`

Локально:

```ini
MONGODB_URI="mongodb://localhost:27017"
MONGODB_DATABASE="laravel_app"
```

MongoDB Atlas:

```ini
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
MONGODB_DATABASE="laravel_app"
```

### `config/database.php`

```php
'connections' => [
    'mongodb' => [
        'driver' => 'mongodb',
        'dsn' => env('MONGODB_URI', 'mongodb://localhost:27017'),
        'database' => env('MONGODB_DATABASE', 'laravel_app'),
    ],
],
```

### Возможности пакета

- Eloquent-модели в коллекциях MongoDB (включая embedded relations)
- Query Builder
- Vector / similarity search
- Драйвер кэша с TTL-индексами
- Очереди (`mongodb` queue driver)
- Файлы в GridFS
- Scout full-text search

Дальше: [Quick Start MongoDB + Laravel](https://www.mongodb.com/docs/drivers/php/laravel-mongodb/current/quick-start/).

## Read / Write connections

Для реплик: чтение с replica, запись на primary:

```php
'mysql' => [
    'driver' => 'mysql',
    'read' => [
        'host' => ['192.168.1.1', '192.168.1.2'],
    ],
    'write' => [
        'host' => ['192.168.1.3'],
    ],
    'sticky' => true,
    // остальные опции...
],
```

`sticky: true` — после записи в том же запросе читать с write-хоста.

## Связанные разделы

| Тема | Страница |
|------|----------|
| Миграции, колонки | [Миграции](migrations.md) |
| Модели, CRUD, relations | [Eloquent ORM](eloquent.md) |
| `.env`, MySQL | [Конфигурация](configuration.md) |
| Кэш | [Кэш](cache.md) |
