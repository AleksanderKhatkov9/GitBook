# Eloquent ORM

> Источник: [Eloquent | Laravel 13.x](https://laravel.com/docs/13.x/eloquent) · [Relationships](https://laravel.com/docs/13.x/eloquent-relationships)

Eloquent — ORM Laravel (ActiveRecord): каждой таблице соответствует модель. Ускоряет CRUD, защищает от SQL-инъекций через bindings.

См. также: [Database](database.md) · [Миграции](migrations.md)

## Создание модели

```bash
php artisan make:model Post
php artisan make:model Post -m          # + миграция
php artisan make:model Post -mfsc       # + migration, factory, seeder, controller
php artisan make:model Post --all       # почти всё сразу
php artisan model:show Post             # обзор атрибутов и связей
```

## Конвенции

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // таблица: posts (мн. число, snake_case)
    // PK: id
    // timestamps: created_at, updated_at
}
```

Переопределение:

```php
protected $table = 'my_posts';
protected $primaryKey = 'post_id';
public $timestamps = false;
protected $connection = 'mysql';

protected $attributes = [
    'status' => 'draft',
];
```

## `$fillable` и mass assignment

```php
protected $fillable = ['title', 'body', 'user_id'];

// или запретить конкретные поля
protected $guarded = ['id', 'is_admin'];
```

## CRUD

```php
use App\Models\Post;

// Создать
$post = Post::create(['title' => 'Заголовок', 'body' => 'Текст']);

$post = new Post;
$post->title = 'Заголовок';
$post->save();

// Читать
$post = Post::find(1);
$post = Post::findOrFail(1);
$posts = Post::all();
$posts = Post::where('title', 'like', '%Laravel%')->get();
$post = Post::where('slug', 'hello')->first();

// Обновить
$post->update(['title' => 'Новый заголовок']);
Post::where('status', 'draft')->update(['status' => 'published']);

// Удалить
$post->delete();
Post::destroy(1, 2, 3);
```

### firstOrCreate / updateOrCreate

```php
$post = Post::firstOrCreate(
    ['slug' => 'hello'],
    ['title' => 'Hello', 'body' => '...']
);

$post = Post::updateOrCreate(
    ['slug' => 'hello'],
    ['title' => 'Hello Updated']
);
```

## Запросы и коллекции

```php
$posts = Post::where('active', 1)
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();

$titles = Post::pluck('title');
$count = Post::where('active', 1)->count();
$avg = Post::avg('views');
```

Чанками (большие таблицы):

```php
Post::chunk(200, function ($posts) {
    foreach ($posts as $post) {
        // ...
    }
});

foreach (Post::cursor() as $post) {
    // один ряд за раз, мало памяти
}
```

## Soft Deletes

```bash
php artisan make:migration add_soft_deletes_to_posts_table --table=posts
```

```php
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
}
```

```php
$post->delete();              // deleted_at
$post->restore();
$post->forceDelete();         // навсегда
Post::withTrashed()->get();
Post::onlyTrashed()->get();
```

## Отношения

```php
// Post belongs to User
public function user()
{
    return $this->belongsTo(User::class);
}

// User has many Posts
public function posts()
{
    return $this->hasMany(Post::class);
}

// Post has many Comments
public function comments()
{
    return $this->hasMany(Comment::class);
}

// Many-to-many
public function tags()
{
    return $this->belongsToMany(Tag::class);
}
```

Использование и eager loading (избегает N+1):

```php
$post = Post::with('comments', 'user')->find(1);
$posts = Post::with(['comments' => fn ($q) => $q->latest()])->get();

$user->posts;           // коллекция
$post->user->name;
$post->tags()->attach($tagId);
$post->tags()->sync([1, 2, 3]);
```

## Scopes

```php
// Local scope
public function scopePublished($query)
{
    return $query->where('status', 'published');
}

Post::published()->latest()->get();
```

## Accessors / Mutators / Casts

```php
use Illuminate\Database\Eloquent\Casts\Attribute;

protected function title(): Attribute
{
    return Attribute::make(
        get: fn (string $value) => ucfirst($value),
        set: fn (string $value) => strtolower($value),
    );
}

protected function casts(): array
{
    return [
        'published_at' => 'datetime',
        'is_active' => 'boolean',
        'meta' => 'array',
    ];
}
```

## В контроллере

```php
public function index()
{
    $posts = Post::with('user')
        ->latest()
        ->paginate(10);

    return view('posts.index', compact('posts'));
}

public function store(StorePostRequest $request)
{
    $post = $request->user()->posts()->create($request->validated());

    return redirect()->route('posts.show', $post);
}
```

## События модели

```php
protected static function booted(): void
{
    static::creating(function (Post $post) {
        $post->slug ??= \Illuminate\Support\Str::slug($post->title);
    });
}
```

Или Observer:

```bash
php artisan make:observer PostObserver --model=Post
```

## MongoDB + Eloquent

При подключении [MongoDB](database.md#mongodb) модели могут храниться в коллекциях. Пакет добавляет embedded relationships и доступ к драйверу MongoDB. См. [Eloquent Models (MongoDB)](https://www.mongodb.com/docs/drivers/php/laravel-mongodb/current/eloquent-models/).
