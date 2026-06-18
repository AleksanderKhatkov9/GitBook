# Main Header

> Официальная документация: [Main Header | AdminLTE 4](https://adminlte.io/themes/v4/docs/components/main-header.html)

`app-header` — верхняя navbar с кнопкой sidebar, ссылками, уведомлениями и меню пользователя.

## Базовая разметка

```html
<nav class="app-header navbar navbar-expand bg-body">
  <div class="container-fluid">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
          <i class="bi bi-list"></i>
        </a>
      </li>
      <li class="nav-item d-none d-md-block">
        <a href="/" class="nav-link">Home</a>
      </li>
    </ul>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-bs-toggle="dropdown" href="#">
          <i class="bi bi-bell-fill"></i>
          <span class="navbar-badge badge text-bg-warning">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
          <span class="dropdown-item dropdown-header">3 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">New message</a>
        </div>
      </li>
      <li class="nav-item dropdown user-menu">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <img src="/img/user.jpg" class="user-image rounded-circle shadow" alt="User">
          <span class="d-none d-md-inline">Alexander Pierce</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
          <li class="user-header text-bg-primary">
            <img src="/img/user.jpg" class="rounded-circle shadow" alt="User">
            <p>Alexander Pierce - Web Developer</p>
          </li>
          <li class="user-footer">
            <a href="#" class="btn btn-default btn-flat">Profile</a>
            <a href="#" class="btn btn-default btn-flat float-end">Sign out</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
```

## Элементы

| Элемент | Назначение |
|---------|------------|
| `data-lte-toggle="sidebar"` | Кнопка PushMenu |
| `navbar-badge` | Счётчик уведомлений |
| `user-menu` | Dropdown профиля |
| `data-bs-toggle="dropdown"` | Bootstrap dropdown |

## Цветовой режим

Переключатель light/dark/auto обычно размещают в правой части navbar. См. [Цветовой режим](../color-mode.md).

## Связанные разделы

- [PushMenu](../plugins/pushmenu.md)
- [Макет (Layout)](../layout.md)
