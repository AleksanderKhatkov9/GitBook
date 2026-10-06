# GitBook

Раздел о работе с локальной документацией на базе [HonKit](https://github.com/honkit/honkit).

Официальная документация: [@gitbook-ng/gitbook](https://gitbook-ng.github.io/)

## Страницы раздела

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | Локальный запуск и публикация на GitHub Pages |
| [Страницы и меню](pages.md) | Создание страниц, `SUMMARY.md`, сворачиваемые разделы |

## Структура проекта

```
GitBook/
├── README.md              ← главная (введение)
├── SUMMARY.md             ← оглавление (меню слева)
├── book.json              ← плагины и настройки
├── package.json           ← зависимости и команды
│
├── gitbook/               ← этот раздел
├── Backend/               ← PHP, PHP-FPM, Laravel
├── Frontend/              ← JS (Vue, React, Next.js), CSS, HTML, PM2
├── mysql/
├── admin/                 ← Filament, Nova, Moonshine, AdminLTE
├── devops/                ← Docker, Vagrant, Linux, Nginx, Deployer
├── git/
├── rest/                  ← REST API, Postman
├── algorithm/
├── courses/
├── career/
├── seo/
├── ai/
├── english/
│
└── _book/                 ← сгенерированный HTML (не редактировать!)
```

Полное дерево с подпапками — на [главной](../README.md). Меню слева задаётся только в `SUMMARY.md`.

Все страницы пишутся в `.md`, HTML генерируется автоматически командой `npm run serve` или `npm run build`.
