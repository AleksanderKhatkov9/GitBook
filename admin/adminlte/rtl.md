# RTL

> Официальная документация: [RTL Support | AdminLTE 4](https://adminlte.io/themes/v4/docs/rtl.html)

AdminLTE 4 поддерживает RTL (right-to-left) для языков с письмом справа налево (арабский, иврит и др.).

## Включение RTL

Установите направление на `<html>`:

```html
<html lang="ar" dir="rtl" data-bs-theme="light">
```

Bootstrap 5 и AdminLTE адаптируют отступы, выравнивание и позицию sidebar.

## Что учитывать

- Иконки-стрелки в меню могут потребовать зеркалирования.
- Проверьте кастомный CSS на жёсткие `margin-left` / `padding-right`.
- Шрифты для RTL-языков подключайте отдельно.

## Тестирование

Переключите `dir="rtl"` на существующей странице и проверьте:

- sidebar (слева/справа);
- dropdown и navbar;
- таблицы и формы;
- модальные окна Bootstrap.

## Связанные разделы

- [Макет (Layout)](layout.md)
- [Кастомизация](customization.md)
