# PushMenu

> Официальная документация: [PushMenu | AdminLTE 4](https://adminlte.io/themes/v4/docs/javascript/pushmenu.html)

PushMenu сворачивает и разворачивает sidebar по клику на кнопку в header.

## Разметка

Кнопка в navbar:

```html
<a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
  <i class="bi bi-list"></i>
</a>
```

## Поведение

| Экран | Действие |
|-------|----------|
| Desktop | Переключает `sidebar-collapse` / `sidebar-mini` |
| Mobile | Открывает overlay (`sidebar-open`) |

## Классы

- `sidebar-collapse` — sidebar свёрнут
- `sidebar-mini` — узкий режим (иконки)
- `sidebar-open` — открыт на мобильном

## Связанные разделы

- [Компоненты: Header](../components/header.md)
- [Классы раскладки](../layout-classes.md)
