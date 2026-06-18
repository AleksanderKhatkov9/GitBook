# Классы раскладки

> Официальная документация: [Layout Classes | AdminLTE 4](https://adminlte.io/themes/v4/docs/layout-classes.html)

Классы на элементе `<body>` управляют поведением макета AdminLTE.

## Основные классы

| Класс | Описание |
|-------|----------|
| `layout-fixed` | Фиксированные header и sidebar |
| `layout-navbar-fixed` | Только navbar зафиксирован |
| `layout-footer-fixed` | Footer зафиксирован внизу |
| `sidebar-expand-lg` | Sidebar развёрнут на экранах lg и выше |
| `sidebar-expand-md` | Sidebar развёрнут на md и выше |
| `sidebar-collapse` | Sidebar свёрнут |
| `sidebar-mini` | Узкий sidebar (только иконки) |
| `sidebar-open` | Sidebar открыт (мобильный overlay) |

## Пример

```html
<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
```

## Комбинации

Типичные варианты:

```html
<!-- Стандартная админка -->
<body class="layout-fixed sidebar-expand-lg">

<!-- Свёрнутый sidebar по умолчанию -->
<body class="layout-fixed sidebar-mini sidebar-collapse">

<!-- Фиксированный footer -->
<body class="layout-fixed layout-footer-fixed sidebar-expand-lg">
```

## Responsive

На мобильных sidebar скрывается и открывается по кнопке (PushMenu). Класс `sidebar-open` добавляется при открытии overlay-меню.

## Связанные разделы

- [Макет (Layout)](layout.md)
- [PushMenu](plugins/pushmenu.md)
- [JavaScript: Layout](plugins/layout.md)
