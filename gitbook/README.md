# GitBook

Раздел о работе с локальной документацией на базе [HonKit](https://github.com/honkit/honkit).

Официальная документация: [@gitbook-ng/gitbook](https://gitbook-ng.github.io/)

## Страницы раздела

| Страница | Описание |
|----------|----------|
| [Установка](installation.md) | Установка на локальную машину, первый запуск |
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
├── Backend/               ← PHP, Laravel
├── Frontend/              ← JS (Vue, React, Next.js), CSS
├── mysql/                 ← MySQL
├── admin/                 ← Nova, Moonshine, AdminLTE
├── devops/                ← Docker, Vagrant, Nginx, Deployer
├── git/                   ← Git
│
└── _book/                 ← сгенерированный HTML (не редактировать!)
```

Все страницы пишутся в `.md`, HTML генерируется автоматически командой `npm run serve` или `npm run build`.
