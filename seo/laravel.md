# 4. SEO в Laravel

> Связано: [Blade Views](../Backend/laravel/views.md) · [Laravel + Next.js](../devops/laravel-next/README.md)

## Layout с meta-тегами

`resources/views/layouts/app.blade.php`:

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', config('app.name'))</title>
    <meta name="description" content="@yield('meta_description', 'Описание по умолчанию')">
    <link rel="canonical" href="@yield('canonical', url()->current())">

    <meta property="og:title" content="@yield('og_title', trim($__env->yieldContent('title')))">
    <meta property="og:description" content="@yield('og_description', trim($__env->yieldContent('meta_description')))">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="@yield('og_type', 'website')">
    @yield('og_image')

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @yield('content')
</body>
</html>
```

Страница статьи:

```html
@extends('layouts.app')

@section('title', $post->title . ' | ' . config('app.name'))
@section('meta_description', Str::limit(strip_tags($post->excerpt), 160))
@section('canonical', route('blog.show', $post->slug))

@section('content')
    <article>
        <h1>{{ $post->title }}</h1>
        {!! $post->body !!}
    </article>
@endsection
```

## SEO-компонент (View Composer)

```php
<?php

namespace App\View\Composers;

use Illuminate\View\View;

class SeoComposer
{
    public function compose(View $view): void
    {
        $view->with([
            'seoTitle'       => config('app.name'),
            'seoDescription' => 'Описание сайта',
            'seoCanonical'   => url()->current(),
        ]);
    }
}
```

`AppServiceProvider`:

```php
use Illuminate\Support\Facades\View;
use App\View\Composers\SeoComposer;

View::composer('layouts.app', SeoComposer::class);
```

## Slug в модели

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body', 'excerpt'];

    protected static function booted(): void
    {
        static::creating(function (Post $post) {
            $post->slug ??= Str::slug($post->title);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
```

Маршрут:

```php
Route::get('/blog/{post:slug}', [PostController::class, 'show'])->name('blog.show');
```

## Sitemap

### Пакет spatie/laravel-sitemap

```bash
composer require spatie/laravel-sitemap
```

```php
<?php

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Post;

Sitemap::create()
    ->add(Url::create('/')->setPriority(1.0))
    ->add(Post::all()->map(fn ($post) =>
        Url::create(route('blog.show', $post))
            ->setLastModificationDate($post->updated_at)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(0.8)
    ))
    ->writeToFile(public_path('sitemap.xml'));
```

Artisan-команда + cron для автогенерации.

### robots.txt в public/

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: {{ config('app.url') }}/sitemap.xml
```

Для Laravel — статический файл `public/robots.txt` или маршрут.

## noindex для служебных страниц

```php
// В контроллере или middleware
return response()
    ->view('admin.dashboard')
    ->header('X-Robots-Tag', 'noindex, nofollow');
```

Или в шаблоне:

```html
@section('meta_robots')
<meta name="robots" content="noindex, nofollow">
@endsection
```

## Pagination и SEO

Laravel paginator — добавьте canonical на первую страницу без `?page=1`:

```html
<link rel="canonical" href="{{ route('blog.index') }}">
```

## Laravel + Inertia / Vue

CSR без SSR — контент рендерится JS. Варианты:

| Решение | Описание |
|---------|----------|
| Inertia SSR | Серверный рендер Vue/React |
| Pre-rendering | Prerender.io, статический HTML для ботов |
| Meta через Inertia | `<Head title="..." />` в Vue |

## Laravel + Next.js

Next.js на фронте, Laravel API на бэке — SSR/SSG из коробки:

- `getStaticProps` / `generateMetadata` для meta
- Sitemap через `next-sitemap`

См. [Laravel + Next.js](../devops/laravel-next/README.md).

## Чеклист Laravel SEO

- [ ] Layout с title, description, canonical, OG
- [ ] Slug в URL вместо id
- [ ] sitemap.xml генерируется автоматически
- [ ] `/admin` — noindex
- [ ] APP_URL в `.env` совпадает с production-доменом

## Следующий шаг

[5. Инструменты](tools.md) — Search Console, Analytics, аудит.
