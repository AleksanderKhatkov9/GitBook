# Миграции

> Источник: [Database: Migrations | Laravel 13.x](https://laravel.com/docs/13.x/migrations)

Миграции — версионирование схемы базы данных. Файлы лежат в `database/migrations/`.

См. также: [Eloquent ORM](eloquent.md) · [Конфигурация](configuration.md)

## Основные команды

```bash
# Создать миграцию
php artisan make:migration create_posts_table

# Применить все миграции
php artisan migrate

# Откатить последнюю партию
php artisan migrate:rollback

# Откатить все и применить заново
php artisan migrate:fresh

# Статус миграций
php artisan migrate:status
```

## Создание таблицы

```bash
php artisan make:migration create_posts_table
```

`database/migrations/xxxx_create_posts_table.php`:

```php
public function up(): void
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('body')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('posts');
}
```

```bash
php artisan migrate
```

## Добавление колонок

Чтобы изменить существующую таблицу (не создавать новую), укажите `--table`:

```bash
php artisan make:migration add_meta_seo_columns_to_pages_table --table=pages
```

Laravel создаст файл вроде `database/migrations/xxxx_add_meta_seo_columns_to_pages_table.php` с заготовкой `Schema::table('pages', ...)`.

### Пример: SEO-колонки для `pages`

```php
public function up(): void
{
    Schema::table('pages', function (Blueprint $table) {
        $table->string('meta_title')->nullable()->after('title');
        $table->string('meta_description', 500)->nullable()->after('meta_title');
        $table->string('meta_keywords')->nullable()->after('meta_description');
    });
}

public function down(): void
{
    Schema::table('pages', function (Blueprint $table) {
        $table->dropColumn(['meta_title', 'meta_description', 'meta_keywords']);
    });
}
```

Применить:

```bash
php artisan migrate
```

После миграции добавьте поля в `$fillable` модели:

```php
protected $fillable = [
    'title',
    'slug',
    'body',
    'meta_title',
    'meta_description',
    'meta_keywords',
];
```

## Частые типы колонок

| Метод | Описание |
|-------|----------|
| `$table->string('name')` | `VARCHAR` |
| `$table->text('body')` | `TEXT` |
| `$table->integer('views')` | Целое число |
| `$table->boolean('is_active')` | `true` / `false` |
| `$table->foreignId('user_id')->constrained()` | FK на `users.id` |
| `$table->timestamps()` | `created_at`, `updated_at` |
| `$table->softDeletes()` | `deleted_at` |

Модификаторы:

```php
$table->string('email')->nullable();
$table->string('slug')->unique();
$table->string('status')->default('draft');
$table->string('meta_title')->after('title'); // после колонки title (MySQL)
```

## Удаление колонок

```bash
php artisan make:migration remove_meta_keywords_from_pages_table --table=pages
```

```php
public function up(): void
{
    Schema::table('pages', function (Blueprint $table) {
        $table->dropColumn('meta_keywords');
    });
}

public function down(): void
{
    Schema::table('pages', function (Blueprint $table) {
        $table->string('meta_keywords')->nullable();
    });
}
```

## Переименование колонки

Нужен пакет `doctrine/dbal` (или встроенные возможности вашей версии Laravel):

```bash
php artisan make:migration rename_body_to_content_on_pages_table --table=pages
```

```php
public function up(): void
{
    Schema::table('pages', function (Blueprint $table) {
        $table->renameColumn('body', 'content');
    });
}
```

## Модель + миграция сразу

```bash
php artisan make:model Page -m
```

`-m` создаёт модель `Page` и миграцию `create_pages_table`.
