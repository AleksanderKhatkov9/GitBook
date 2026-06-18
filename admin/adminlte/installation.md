# Установка

> Официальная документация: [Installation | AdminLTE 4](https://adminlte.io/themes/v4/docs/introduction.html)

Выберите способ установки в зависимости от проекта:

| Способ | Когда использовать | Время |
|--------|-------------------|-------|
| CDN | Прототипы, демо, простые сайты | ~1 мин |
| npm + bundler | Production, Laravel/Vite, фреймворки | ~5 мин |
| Build from source | Кастомизация SCSS-переменных | ~10 мин |
| Composer | PHP-проекты без npm | ~2 мин |

## Требования

| | Минимум | Рекомендуется |
|---|---------|---------------|
| Bootstrap | 5.3.0 | 5.3.8 |
| Node.js | 18 LTS | 22 LTS |
| Браузер | Modern evergreen | Chrome/Firefox/Safari/Edge (latest) |

## CDN

Подключите CSS в `<head>` и JS перед `</body>`:

```html
<!-- В <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.11.0/styles/overlayscrollbars.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@4.0.0/dist/css/adminlte.min.css" />

<!-- Перед </body> -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.11.0/browser/overlayscrollbars.browser.es6.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/admin-lte@4.0.0/dist/js/adminlte.min.js"></script>
```

Скопируйте HTML из [демо-страниц](https://adminlte.io/themes/v4) и адаптируйте под свой проект.

## npm + bundler

Требуется Node.js 18+ и bundler (Vite, Webpack, Rollup, esbuild):

```bash
npm install admin-lte@4
```

Импорт в точке входа:

```js
// CSS
import "admin-lte/dist/css/adminlte.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "overlayscrollbars/styles/overlayscrollbars.css"

// JS
import "bootstrap"
import "admin-lte"
```

Yarn и pnpm работают аналогично: `yarn add admin-lte@4` или `pnpm add admin-lte@4`.

## Сборка из исходников

Для кастомизации SCSS (ширина sidebar, breakpoints, цвета бренда):

```bash
git clone https://github.com/ColorlibHQ/AdminLTE.git
cd AdminLTE
npm install
npm run dev          # dev-сервер с hot-reload
npm run production   # production-сборка
```

Результат — в `dist/`. Переменные: `src/scss/_variables.scss`, `src/scss/_bootstrap-variables.scss`. Подробнее — [Кастомизация](customization.md).

## Composer (PHP)

```bash
composer require "almasaeed2010/adminlte=4.0.0"
```

Пакет содержит готовую папку `dist/` для подключения в PHP-проектах.

## Следующий шаг

[Быстрый старт](getting-started.md) — рабочий dashboard за 10 минут.
