# Решение проблем

Типичные проблемы при работе с AdminLTE 4.

## Sidebar не сворачивается

**Причины:**

- не подключён `adminlte.min.js` или Bootstrap JS;
- нет `@popperjs/core` перед Bootstrap;
- кнопка без `data-lte-toggle="sidebar"`;
- конфликт двух версий Bootstrap.

**Решение:** проверьте порядок скриптов (Popper → Bootstrap → OverlayScrollbars → AdminLTE). См. [Установка](installation.md).

## Treeview не раскрывается

- На `<ul class="sidebar-menu">` должен быть `data-lte-toggle="treeview"`.
- Вложенный список — класс `nav-treeview`.
- Убедитесь, что не остались атрибуты v3: `data-widget="treeview"`.

См. [Treeview](plugins/treeview.md).

## Сломанная вёрстка после обновления с v3

Замените классы layout (`.wrapper` → `.app-wrapper` и т.д.). См. [Миграция с v3](migration-v3.md).

## Стили не применяются (Laravel + Vite)

- Запустите `npm run dev` или `npm run build`.
- Проверьте `@vite` в layout и `input` в `vite.config.js`.
- Очистите кэш: `php artisan view:clear`.

См. [Интеграции](integrations.md).

## Dropdown не открывается

Bootstrap 5 требует Popper и `bootstrap.bundle.min.js` (или отдельный Popper + bootstrap.min.js). Атрибут: `data-bs-toggle="dropdown"` (не `data-toggle`).

## Конфликт с Tailwind / другим CSS

AdminLTE и Bootstrap задают глобальные стили. Не смешивайте с Tailwind на тех же компонентах без `prefix` или отдельного layout. Для Laravel-admin с Moonshine/Nova используйте отдельные layout-ы.

## OverlayScrollbars в sidebar

Если скролл sidebar не работает, подключите CSS и JS OverlayScrollbars из [Установка](installation.md).

## Дополнительно

- [Официальный FAQ](https://adminlte.io/themes/v4/docs/faq.html)
- [GitHub Issues](https://github.com/ColorlibHQ/AdminLTE/issues)
