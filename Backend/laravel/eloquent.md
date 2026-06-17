# Eloquent ORM

> Источник: [Eloquent | Laravel 13.x](https://laravel.com/docs/13.x/eloquent)

Eloquent — ORM Laravel для работы с базой данных через модели.

## Создание модели

```bash
php artisan make:model Post -m
```

`-m` создаёт миграцию.

## Миграция

`database/migrations/xxxx_create_posts_table.php`:

```php
public function up(): void
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('body');
        $table->timestamps();
    });
}
```

```bash
php artisan migrate
```

## Модель

`app/Models/Post.php`:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'body'];
}
```

## CRUD-операции

```php
use App\Models\Post;

// Создать
Post::create(['title' => 'Заголовок', 'body' => 'Текст']);

// Прочитать
$post = Post::find(1);
$posts = Post::all();
$posts = Post::where('title', 'like', '%Laravel%')->get();

// Обновить
$post = Post::find(1);
$post->update(['title' => 'Новый заголовок']);

// Удалить
$post->delete();
```

## Использование в контроллере

```php
public function index()
{
    $posts = Post::latest()->paginate(10);
    return view('posts.index', compact('posts'));
}
```

## Отношения

```php
// У поста много комментариев
public function comments()
{
    return $this->hasMany(Comment::class);
}

// Использование
$post = Post::with('comments')->find(1);
```
