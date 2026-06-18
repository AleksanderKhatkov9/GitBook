# AdminLTE

> Официальная документация: [adminlte.io/themes/v4/docs](https://adminlte.io/themes/v4/docs/introduction.html)

AdminLTE — бесплатный MIT-шаблон админ-панели на **Bootstrap 5.3** с vanilla TypeScript (без jQuery). Это **шаблон**, а не CRUD-панель: вы вставляете разметку в свой проект и настраиваете нужные части.

## Разделы

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | CDN, npm, Composer, сборка из исходников |
| [Документация и ресурсы](documentation.md) | Официальные ссылки, демо, changelog |
| [Быстрый старт](getting-started.md) | Минимальный dashboard за 10 минут |
| [Макет (Layout)](layout.md) | Структура `app-wrapper` |
| [Классы раскладки](layout-classes.md) | `sidebar-mini`, `layout-fixed` и др. |
| [Кастомизация и тема](customization.md) | SCSS-переменные, брендинг |
| [Цветовой режим](color-mode.md) | Light / Dark / Auto |
| [RTL](rtl.md) | Поддержка RTL-раскладки |
| [Компоненты](components/README.md) | Header, Sidebar, карточки |
| [JavaScript-плагины](javascript-plugins.md) | PushMenu, Treeview и др. |
| [Рецепты](recipes.md) | Dashboard, таблицы, формы |
| [Интеграции](integrations.md) | Laravel, Vite, Blade |
| [Деплой](deployment.md) | Prod-сборка, CDN vs bundle |
| [Миграция с v3](migration-v3.md) | Обновление с AdminLTE 3 |
| [Поддержка браузеров](browser-support.md) | Evergreen browsers |
| [Решение проблем](troubleshooting.md) | Типичные ошибки |

## Быстрый старт

```bash
npm install admin-lte@4
```

Минимальная структура страницы:

```html
<div class="app-wrapper">
  <nav class="app-header navbar">...</nav>
  <aside class="app-sidebar">...</aside>
  <main class="app-main">
    <div class="app-content">...</div>
  </main>
  <footer class="app-footer">...</footer>
</div>
```

Подробнее — в разделе [Быстрый старт](getting-started.md).

## С Laravel

Создайте layout `resources/views/layouts/admin.blade.php`, подключите assets через Vite или CDN и наследуйте layout в страницах админки. См. [Интеграции](integrations.md).
