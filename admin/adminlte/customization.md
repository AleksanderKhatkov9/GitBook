# Кастомизация и тема

> Официальная документация: [Customization | AdminLTE 4](https://adminlte.io/themes/v4/docs/customization.html)

AdminLTE можно настроить через SCSS-переменные или CSS-переопределения.

## SCSS-переменные

При сборке из исходников редактируйте:

| Файл | Что настраивать |
|------|-----------------|
| `src/scss/_variables.scss` | Ширина sidebar, отступы, цвета бренда AdminLTE |
| `src/scss/_bootstrap-variables.scss` | Переменные Bootstrap (primary, border-radius и др.) |

```bash
git clone https://github.com/ColorlibHQ/AdminLTE.git
cd AdminLTE
npm install
# правки в src/scss/
npm run production
```

Скомпилированные файлы — в `dist/`.

## Частые настройки

- ширина sidebar;
- цвет бренда в sidebar;
- breakpoints для сворачивания меню;
- отступы content-области.

## CSS без сборки

Для CDN/npm без fork репозитория переопределяйте CSS после `adminlte.min.css`:

```css
:root {
  --lte-sidebar-width: 280px;
}
```

Точные CSS-переменные см. в официальной документации и исходниках `src/scss/`.

## Брендинг

- Логотип — в блоке `.sidebar-brand` / `.brand-link`
- Favicon и title — в `<head>`
- Цвет sidebar — `data-bs-theme="dark"` на `.app-sidebar` или свои классы Bootstrap

## Связанные разделы

- [Цветовой режим](color-mode.md)
- [RTL](rtl.md)
- [Установка: сборка из исходников](installation.md)
