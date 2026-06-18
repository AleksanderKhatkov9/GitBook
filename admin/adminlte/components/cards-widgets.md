# Карточки и виджеты

> Официальная документация: [Recipes | AdminLTE 4](https://adminlte.io/themes/v4/docs/recipes.html)

Контент админки обычно строится из карточек Bootstrap и виджетов AdminLTE.

## Card (Bootstrap)

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Заголовок</h3>
    <div class="card-tools">
      <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
        <i class="bi bi-dash"></i>
      </button>
    </div>
  </div>
  <div class="card-body">
    Содержимое карточки.
  </div>
  <div class="card-footer">
    Footer
  </div>
</div>
```

`data-lte-toggle="card-collapse"` — сворачивание через [Card Widget](../plugins/card-widget.md).

## Small Box

Компактный виджет со счётчиком:

```html
<div class="small-box text-bg-primary">
  <div class="inner">
    <h3>150</h3>
    <p>New Orders</p>
  </div>
  <div class="small-box-icon">
    <i class="bi bi-cart-fill"></i>
  </div>
  <a href="#" class="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
    More info <i class="bi bi-link-45deg"></i>
  </a>
</div>
```

Цвета: `text-bg-primary`, `text-bg-success`, `text-bg-warning`, `text-bg-danger`, `text-bg-info`.

## Info Box

```html
<div class="info-box">
  <span class="info-box-icon text-bg-info shadow-sm">
    <i class="bi bi-bookmark-fill"></i>
  </span>
  <div class="info-box-content">
    <span class="info-box-text">Bookmarks</span>
    <span class="info-box-number">41,410</span>
  </div>
</div>
```

## Сетка

Используйте Bootstrap grid:

```html
<div class="row">
  <div class="col-lg-3 col-6">
  </div>
</div>
```

## Связанные разделы

- [Card Widget](../plugins/card-widget.md)
- [Рецепты](../recipes.md)
