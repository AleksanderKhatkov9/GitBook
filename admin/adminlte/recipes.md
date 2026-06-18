# Рецепты

> Официальная документация: [Recipes | AdminLTE 4](https://adminlte.io/themes/v4/docs/recipes.html)

Готовые паттерны страниц на базе AdminLTE и Bootstrap 5.

## Dashboard

Комбинация small-box, info-box и карточек с графиками:

```html
<div class="app-content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-6">
        <div class="small-box text-bg-primary">...</div>
      </div>
      <!-- ещё 3 виджета -->
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="card">Chart</div>
      </div>
      <div class="col-md-4">
        <div class="card">Recent activity</div>
      </div>
    </div>
  </div>
</div>
```

Демо: [Dashboard v3](https://adminlte.io/themes/v4/index3.html) в live preview.

## Таблица данных

Bootstrap table внутри card:

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Пользователи</h3>
  </div>
  <div class="card-body table-responsive p-0">
    <table class="table table-striped table-hover">
      <thead>...</thead>
      <tbody>...</tbody>
    </table>
  </div>
  <div class="card-footer clearfix">
    {{ $users->links() }}
  </div>
</div>
```

Для сортировки/фильтров подключите DataTables, Livewire или Alpine по необходимости.

## Форма

```html
<div class="card card-primary card-outline">
  <div class="card-header">
    <h3 class="card-title">Создать запись</h3>
  </div>
  <form action="/posts" method="post">
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Заголовок</label>
      <input type="text" class="form-control" name="title">
    </div>
  </div>
  <div class="card-footer">
    <button type="submit" class="btn btn-primary">Сохранить</button>
  </div>
  </form>
</div>
```

## Страница входа

Отдельный layout без sidebar — `login-page` в демо. Скопируйте из [Login v2](https://adminlte.io/themes/v4/examples/login-v2.html).

## Откуда брать примеры

1. [Live preview](https://adminlte.io/themes/v4) — готовые страницы.
2. Репозиторий GitHub — `src/html/pages/`.
3. [Recipes](https://adminlte.io/themes/v4/docs/recipes.html) в официальной документации.

## Связанные разделы

- [Компоненты](components/README.md)
- [Интеграции](integrations.md)
