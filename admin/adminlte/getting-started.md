# Быстрый старт

> Официальная документация: [Getting Started | AdminLTE 4](https://adminlte.io/themes/v4/docs/getting-started.html)

Цель — получить рабочую страницу админки за ~10 минут.

## 1. Подключите зависимости

См. [Установка](installation.md) (CDN или npm). Для CDN достаточно четырёх CSS и четырёх JS-тегов.

## 2. Минимальный layout

```html
<!DOCTYPE html>
<html lang="ru" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AdminLTE 4</title>
  <!-- CSS: bootstrap-icons, overlayscrollbars, adminlte -->
</head>
<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
  <div class="app-wrapper">
    <!-- Header -->
    <nav class="app-header navbar navbar-expand bg-body">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
              <i class="bi bi-list"></i>
            </a>
          </li>
          <li class="nav-item d-none d-md-block">
            <a href="#" class="nav-link">Home</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
      <div class="sidebar-brand">
        <a href="#" class="brand-link">
          <span class="brand-text fw-light">AdminLTE 4</span>
        </a>
      </div>
      <div class="sidebar-wrapper">
        <nav class="mt-2">
          <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">
            <li class="nav-item">
              <a href="#" class="nav-link active">
                <i class="nav-icon bi bi-speedometer"></i>
                <p>Dashboard</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main -->
    <main class="app-main">
      <div class="app-content-header">
        <div class="container-fluid">
          <h3 class="mb-0">Dashboard</h3>
        </div>
      </div>
      <div class="app-content">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              Добро пожаловать в AdminLTE 4.
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="float-end d-none d-sm-inline">v4</div>
      <strong>AdminLTE</strong>
    </footer>
  </div>

  <!-- JS: popper, bootstrap, overlayscrollbars, adminlte -->
</body>
</html>
```

## 3. Ключевые классы body

| Класс | Назначение |
|-------|------------|
| `layout-fixed` | Фиксированный header и sidebar |
| `sidebar-expand-lg` | Sidebar развёрнут на lg+ |
| `bg-body-tertiary` | Фон страницы |

## 4. Проверка

- Кнопка «гамбургер» сворачивает sidebar (PushMenu).
- Меню с вложенностью раскрывается через Treeview (`data-lte-toggle="treeview"`).
- Страница адаптивна на мобильных.

## Дальше

- [Макет (Layout)](layout.md) — подробная структура `app-wrapper`
- [Компоненты](components/README.md) — header, sidebar, карточки
- [Интеграции](integrations.md) — подключение в Laravel
