# Поля

> Документация: [Custom Fields | Nova v5](https://nova.laravel.com/docs/v5/customization/fields)

## Редактирование полей

Основные материалы по работе с полями:

- [Laracasts — Nova Mastery, эпизод 14](https://laracasts.com/series/laravel-nova-mastery/episodes/14)
- [nova-fields.netlify.app](https://nova-fields.netlify.app/#install)
- [novapackages.com](https://novapackages.com/)

## Кастомные поля

```bash
php artisan nova:field MyField
```

**Видео:**
- [Кастомные поля (YouTube)](https://www.youtube.com/watch?v=eWIRI9DaoxA)
- [Кастомные поля — часть 2 (YouTube)](https://www.youtube.com/watch?v=UhB2boC9-J4)

## Trix-редактор

Для rich-text полей Nova использует [Trix Editor](https://trix-editor.org/).

## Проблема с записью изображений

Если загрузка изображений через Trix не работает, проверьте наличие таблиц `nova_pending_field_attachments` и `nova_field_attachments`. Они создаются при `php artisan migrate` после установки Nova.

Также зарегистрируйте ежедневную задачу очистки устаревших вложений в `routes/console.php` (см. [issue #473](https://github.com/laravel/nova-issues/issues/473)).

### Миграции для Trix-вложений

Если таблицы отсутствуют, создайте миграции вручную:

```php
public function up()
{
    Schema::create('nova_pending_trix_attachments', function (Blueprint $table) {
        $table->increments('id');
        $table->string('draft_id')->index();
        $table->string('attachment');
        $table->string('disk');
        $table->timestamps();
    });
}
```

```php
public function up()
{
    Schema::create('nova_trix_attachments', function (Blueprint $table) {
        $table->increments('id');
        $table->string('attachable_type');
        $table->unsignedInteger('attachable_id');
        $table->string('attachment');
        $table->string('disk');
        $table->string('url')->index();
        $table->timestamps();
        $table->index(['attachable_type', 'attachable_id']);
    });
}
```

### Модели

```php
class PendingTrixAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'draft_id',
        'attachment',
        'disk',
    ];
}
```

```php
class TrixAttachments extends Model
{
    use HasFactory;

    protected $fillable = [
        'attachable_type',
        'attachable_id',
        'attachment',
        'disk',
        'url',
    ];
}
```

### Папка для загрузок

Создайте директорию для файлов Nova:

```
storage/app/public/nova
```

Убедитесь, что симлинк `public/storage` настроен:

```bash
php artisan storage:link
```
