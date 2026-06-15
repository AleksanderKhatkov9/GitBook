# AdminLTE

> Официальная документация: [adminlte.io](https://adminlte.io/)

AdminLTE — бесплатный шаблон админ-панели на Bootstrap.

## Установка

```bash
npm install admin-lte
```

Или подключите CDN в HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
```

## Структура страницы

```html
<div class="wrapper">
  <nav class="main-header navbar">...</nav>
  <aside class="main-sidebar">...</aside>
  <div class="content-wrapper">
    <section class="content">...</section>
  </div>
  <footer class="main-footer">...</footer>
</div>
```

## С Laravel

Подключите шаблон в `resources/views/layouts/admin.blade.php` и наследуйте его в страницах админки.
