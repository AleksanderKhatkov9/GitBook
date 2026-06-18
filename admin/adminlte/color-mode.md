# Цветовой режим

> Официальная документация: [Color Mode | AdminLTE 4](https://adminlte.io/themes/v4/docs/color-mode.html)

AdminLTE 4 поддерживает три режима: **light**, **dark** и **auto** (по системным настройкам ОС).

## Атрибут data-bs-theme

Режим задаётся на `<html>` или отдельных блоках через Bootstrap 5.3:

```html
<html lang="ru" data-bs-theme="light">
```

```html
<html lang="ru" data-bs-theme="dark">
```

```html
<html lang="ru" data-bs-theme="auto">
```

## Sidebar отдельно от страницы

Sidebar часто оставляют тёмным при светлой теме контента:

```html
<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
```

## Переключатель в header

В демо AdminLTE переключатель темы — dropdown в navbar. Логика: смена `data-bs-theme` на `<html>` и сохранение выбора в `localStorage`.

Пример (упрощённо):

```js
const html = document.documentElement
const saved = localStorage.getItem('theme') || 'auto'
html.setAttribute('data-bs-theme', saved)

document.querySelectorAll('[data-bs-theme-value]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-bs-theme-value')
    html.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  })
})
```

## Связанные разделы

- [Кастомизация](customization.md)
- [Компоненты: Header](components/header.md)
