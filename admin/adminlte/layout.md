# Макет (Layout)

> Официальная документация: [Layout Blueprint | AdminLTE 4](https://adminlte.io/themes/v4/docs/layout.html)

AdminLTE 4 строится вокруг контейнера `app-wrapper` — корневого элемента application shell.

## Структура

```
app-wrapper
├── app-header          (navbar)
├── app-sidebar         (боковое меню)
├── app-main
│   ├── app-content-header   (заголовок страницы, breadcrumbs)
│   └── app-content          (основной контент)
└── app-footer
```

## Основные блоки

### app-header

Верхняя панель: логотип, кнопка sidebar, навигация, уведомления, профиль пользователя.

```html
<nav class="app-header navbar navbar-expand bg-body">
  ...
</nav>
```

### app-sidebar

Боковое меню: бренд, навигация, treeview.

```html
<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
  <div class="sidebar-brand">...</div>
  <div class="sidebar-wrapper">
    <nav>...</nav>
  </div>
</aside>
```

### app-main

Область контента между sidebar и footer.

```html
<main class="app-main">
  <div class="app-content-header">...</div>
  <div class="app-content">...</div>
</main>
```

### app-footer

Нижний колонтитул.

```html
<footer class="app-footer">
  ...
</footer>
```

## Отличия от AdminLTE 3

| AdminLTE 3 | AdminLTE 4 |
|------------|------------|
| `.wrapper` | `.app-wrapper` |
| `.main-header` | `.app-header` |
| `.main-sidebar` | `.app-sidebar` |
| `.content-wrapper` | `.app-main` |
| `.content` | `.app-content` |
| `.main-footer` | `.app-footer` |

При миграции замените классы по таблице. Подробнее — [Миграция с v3](migration-v3.md).

## Варианты раскладки

Классы на `<body>` управляют поведением sidebar и header. См. [Классы раскладки](layout-classes.md).

## Связанные разделы

- [Компоненты: Header](components/header.md)
- [Компоненты: Sidebar](components/sidebar.md)
- [JavaScript: Layout plugin](plugins/layout.md)
