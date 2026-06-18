# Миграция с AdminLTE 3

> Официальная документация: [Migration from v3 | AdminLTE 4](https://adminlte.io/themes/v4/docs/migration.html)

AdminLTE 4 — major upgrade: Bootstrap 5, TypeScript, без jQuery.

## Ключевые изменения

| AdminLTE 3 | AdminLTE 4 |
|------------|------------|
| Bootstrap 4 | Bootstrap 5.3 |
| jQuery обязателен | jQuery не нужен |
| `.wrapper` | `.app-wrapper` |
| `.main-header` | `.app-header` |
| `.main-sidebar` | `.app-sidebar` |
| `.content-wrapper` | `.app-main` |
| `.content` | `.app-content` |
| `.main-footer` | `.app-footer` |
| Font Awesome (часто) | Bootstrap Icons |
| `data-widget="treeview"` | `data-lte-toggle="treeview"` |

## Пошаговый план

1. Обновите зависимости: `admin-lte@4`, `bootstrap@5`, уберите jQuery из admin bundle.
2. Замените CSS-классы layout по таблице выше.
3. Обновите data-атрибуты плагинов (`data-lte-toggle` вместо `data-widget`).
4. Замените иконки Font Awesome на Bootstrap Icons (`bi bi-*`).
5. Проверьте кастомный CSS на классы Bootstrap 4 (`.ml-*` → `.ms-*`, `.float-left` → `.float-start`).
6. Прогоните страницы: sidebar, dropdown, modals, forms.

## CDN

Было (v3):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
```

Стало (v4) — см. [Установка](installation.md): Bootstrap 5, Popper, OverlayScrollbars, admin-lte@4.

## Laravel

- Обновите `package.json` и пересоберите Vite.
- Перепишите Blade layout под новую разметку из [Быстрый старт](getting-started.md).
- Плагины на jQuery (старые extensions) замените на Bootstrap 5 native или TS-плагины v4.

## IE11

AdminLTE 4 не поддерживает Internet Explorer. Оставайтесь на AdminLTE 3.2, если нужен IE11.

## Связанные разделы

- [Макет (Layout)](layout.md)
- [JavaScript-плагины](javascript-plugins.md)
- [Решение проблем](troubleshooting.md)
