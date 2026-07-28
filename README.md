# Введение

Локальная документация по веб-разработке, собранная с помощью [HonKit](https://github.com/honkit/honkit).

Официальная документация GitBook: [@gitbook-ng/gitbook](https://gitbook-ng.github.io/)

Все страницы пишутся в **Markdown** (`.md`). HTML в папке `_book/` генерируется автоматически — **не редактируйте** её вручную.

## Быстрый старт

```bash
npm install
npm run serve
```

Книга откроется: **http://localhost:4000**

Подробнее: [Установка GitBook](gitbook/installation.md)

---

## Разделы документации

| Раздел | Описание |
|--------|----------|
| [GitBook](gitbook/README.md) | Установка, создание страниц, меню |
| [Backend](Backend/README.md) | [PHP](Backend/php/README.md) → [Laravel](Backend/laravel/README.md), [Frontend](Frontend/README.md) (JS, CSS) |
| [MySQL](mysql/README.md) | База данных MySQL |
| [Admin](admin/README.md) | [Nova](admin/nova/README.md), [Moonshine](admin/moonshine/README.md), [AdminLTE](admin/adminlte/README.md) |
| [DevOps](devops/README.md) | Docker, [Laravel Compose](devops/docker/laravel-compose/README.md), Vagrant, Nginx, Deployer, [Laravel + Next.js](devops/laravel-next/README.md) |
| [Git](git/README.md) | Git, GitHub, ветки, команды |
| [REST](rest/README.md) | REST API, [Postman](rest/postman/README.md) — запросы, коллекции, тесты |
| [Курсы](courses/README.md) | [Бесплатные](courses/free/README.md), [Платные](courses/paid/README.md) |
| [English Grammar](english/README.md) | Грамматика английского: времена, части речи, модальные |

---

## Развёртывание Laravel + Next.js

Fullstack-проекты (Laravel API + Next.js frontend) на одном домене:

| Компонент | Роль |
|-----------|------|
| **Next.js** | Frontend, точка входа (`/`) |
| **Laravel** | Backend, REST API (`/api`) |
| **Nginx** | Прокси на Next.js + PHP-FPM для Laravel |
| **PM2** | Запуск и перезапуск Next.js на сервере |

Примеры проектов: `markitect.by`, `marketis.by`, `marketis.site`.

Полная документация: **[Laravel + Next.js](devops/laravel-next/README.md)** — архитектура, `.env`, Nginx, PM2, сборка, Docker.

---

## Структура проекта

```
GitBook/
├── README.md              ← эта страница
├── SUMMARY.md             ← оглавление (меню слева)
├── book.json              ← плагины
├── package.json           ← зависимости и команды
│
├── gitbook/               ← как работать с этой книгой
├── Backend/               ← PHP, Laravel
│   ├── php/
│   └── laravel/
├── Frontend/              ← JavaScript и CSS
│   ├── js/
│   │   ├── vue/
│   │   ├── react/
│   │   └── next/
│   └── css/
├── mysql/
├── admin/
│   ├── nova/
│   ├── moonshine/
│   └── adminlte/
├── devops/
│   ├── docker/
│   │   └── laravel-compose/  ← Laravel + Nginx + MySQL + phpMyAdmin
│   ├── vagrant/
│   ├── linux/
│   ├── nginx/
│   ├── deployer/
│   └── laravel-next/      ← Laravel + Next.js на одном домене
├── git/
├── rest/                  ← REST API
│   └── postman/           ← Postman: установка, запросы, тесты
├── courses/               ← курсы
│   ├── free/              ← бесплатные (RS School, Stepik)
│   └── paid/              ← платные (TeachMeSkills, Stepik)
├── english/               ← грамматика английского языка
│
└── _book/                 ← сгенерированный HTML (не трогать!)
```

---

## Как добавить страницу

1. Создайте `.md` файл, например `Backend/laravel/middleware.md`
2. Добавьте ссылку в `SUMMARY.md`
3. Сохраните — при `npm run serve` страница обновится автоматически

Подробнее: [Страницы и меню](gitbook/pages.md)

---

## Полезные команды

| Команда | Описание |
|---------|----------|
| `npm run serve` | Локальный просмотр с автообновлением |
| `npm run build` | Сборка сайта в `_book/` для публикации |
