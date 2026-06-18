# JavaScript-плагины

> Официальная документация: [JavaScript Plugins | AdminLTE 4](https://adminlte.io/themes/v4/docs/javascript/overview.html)

AdminLTE 4 включает TypeScript-плагины для интерактивности shell. jQuery **не требуется**.

## Зависимости

| Пакет | Назначение |
|-------|------------|
| Bootstrap 5 | Dropdown, collapse, modals |
| @popperjs/core | Позиционирование dropdown |
| overlayscrollbars | Скролл в sidebar |
| admin-lte | Плагины layout, pushmenu, treeview и др. |

При импорте `import "admin-lte"` плагины инициализируются по data-атрибутам.

## Data-атрибуты

| Атрибут | Плагин |
|---------|--------|
| `data-lte-toggle="sidebar"` | PushMenu |
| `data-lte-toggle="treeview"` | Treeview |
| `data-lte-toggle="card-collapse"` | Card Widget |
| `data-lte-toggle="card-remove"` | Card Widget (удаление) |
| `data-lte-toggle="fullscreen"` | Fullscreen |

## Разделы

| Плагин | Описание |
|--------|----------|
| [Layout](plugins/layout.md) | Управление классами body |
| [PushMenu](plugins/pushmenu.md) | Сворачивание sidebar |
| [Treeview](plugins/treeview.md) | Вложенное меню |
| [Card Widget](plugins/card-widget.md) | Сворачивание/удаление карточек |
| [Direct Chat](plugins/direct-chat.md) | Виджет чата |
| [Fullscreen](plugins/fullscreen.md) | Полноэкранный режим |
| [Accessibility](plugins/accessibility.md) | A11y |

## Программная инициализация

Обычно достаточно data-атрибутов. Для кастомной логики см. исходники в `src/ts/` репозитория AdminLTE на GitHub.

## Связанные разделы

- [Установка](installation.md)
- [Решение проблем](troubleshooting.md)
