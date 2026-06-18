# Treeview

> Официальная документация: [Treeview | AdminLTE 4](https://adminlte.io/themes/v4/docs/javascript/treeview.html)

Treeview раскрывает вложенные пункты меню в sidebar.

## Разметка

На корневом `<ul>` меню:

```html
<ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">
  <li class="nav-item">
    <a href="#" class="nav-link">
      <i class="nav-icon bi bi-box-seam-fill"></i>
      <p>
        Parent
        <i class="nav-arrow bi bi-chevron-right"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon bi bi-circle"></i>
          <p>Child</p>
        </a>
      </li>
    </ul>
  </li>
</ul>
```

## Классы

| Класс | Назначение |
|-------|------------|
| `nav-treeview` | Вложенный список |
| `menu-open` | Раскрытая ветка (добавляется JS) |
| `nav-arrow` | Стрелка раскрытия |

## Активная ветка

Добавьте `menu-open` на родительский `li`, если дочерний пункт активен — ветка будет раскрыта при загрузке.

## Связанные разделы

- [Компоненты: Sidebar](../components/sidebar.md)
