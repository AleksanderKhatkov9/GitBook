# Main Sidebar

> Официальная документация: [Main Sidebar | AdminLTE 4](https://adminlte.io/themes/v4/docs/components/main-sidebar.html)

`app-sidebar` — боковая панель с брендом и навигацией.

## Базовая разметка

```html
<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
  <div class="sidebar-brand">
    <a href="/" class="brand-link">
      <img src="/img/logo.png" alt="Logo" class="brand-image opacity-75 shadow">
      <span class="brand-text fw-light">AdminLTE 4</span>
    </a>
  </div>

  <div class="sidebar-wrapper">
    <nav class="mt-2">
      <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">
        <li class="nav-item">
          <a href="/dashboard" class="nav-link active">
            <i class="nav-icon bi bi-speedometer"></i>
            <p>Dashboard</p>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon bi bi-box-seam-fill"></i>
            <p>
              Layout Options
              <i class="nav-arrow bi bi-chevron-right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon bi bi-circle"></i>
                <p>Top Navigation</p>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</aside>
```

## Ключевые классы

| Класс / атрибут | Назначение |
|-----------------|------------|
| `sidebar-brand` | Логотип и название |
| `sidebar-menu` | Список пунктов меню |
| `nav-icon` | Иконка пункта (Bootstrap Icons) |
| `data-lte-toggle="treeview"` | Вложенное меню |
| `nav-treeview` | Дочерние пункты |
| `menu-open` | Раскрытая ветка (добавляется JS) |

## Активный пункт

Класс `active` на `.nav-link` подсвечивает текущий раздел. В Laravel задавайте через `@if(request()->routeIs(...))`.

## Связанные разделы

- [Treeview](../plugins/treeview.md)
- [PushMenu](../plugins/pushmenu.md)
- [Классы раскладки](../layout-classes.md)
