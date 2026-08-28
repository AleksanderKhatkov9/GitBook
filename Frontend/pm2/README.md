# PM2

> Официальная документация: [Process Management](https://pm2.keymetrics.io/docs/usage/process-management/) · [Quick Start](https://pm2.keymetrics.io/docs/usage/quick-start/) · [pm2.keymetrics.io](https://pm2.keymetrics.io/)

PM2 — менеджер процессов для Node.js. Держит приложение запущенным в фоне, перезапускает при падении, пишет логи и позволяет управлять несколькими процессами с одной машины.

На production Next.js обычно запускают через PM2, а снаружи ставят [Nginx](../../devops/nginx/README.md) как reverse proxy. Полный стек Laravel + Next.js: [Laravel + Next.js](../../devops/laravel-next/README.md).

Связанные разделы: [Next.js](../js/next/README.md), [Linux](../../devops/linux/README.md), [Nginx](../../devops/nginx/README.md).

## Когда использовать

| Инструмент | Роль |
|------------|------|
| `npm run dev` | Локальная разработка |
| **PM2** | Production: Next.js (и любой Node.js) на VPS |
| Nginx | Прокси с 80/443 на порт PM2 (`3000`, `3001`, …) |

PM2 нужен, когда процесс должен:

- работать в фоне после закрытия SSH;
- перезапускаться после падения;
- подниматься после перезагрузки сервера;
- иметь имя, логи и мониторинг CPU/памяти.

---

## Установка

Глобально (на сервере):

```bash
npm install pm2 -g
pm2 -v
```

Проверка:

```bash
which pm2
pm2 ping
```

---

## Управление процессами

С PM2 приложение запускают, останавливают, перезапускают и удаляют из списка — процесс продолжает жить в фоне, пока его не остановили.

### Start

Запуск приложения:

```bash
pm2 start api.js
```

Можно запускать любой скрипт, бинарник или команду:

```bash
pm2 start "npm run start"
pm2 start "ls -la"
pm2 start app.py
```

Типичный запуск Next.js на сервере:

```bash
cd /var/www/BZRMarketis/frontend
pm2 start npm --name marketis.by -- run start
```

| Флаг | Назначение |
|------|------------|
| `--name` | Имя процесса в `pm2 list` (иначе будет `npm` или имя файла) |
| `-- run start` | Аргументы для `npm`: выполнится `npm run start` |

#### Старт с потоком логов

Чтобы сразу видеть логи:

```bash
pm2 start api.js --attach
```

`Ctrl-C` закрывает поток логов, приложение **остаётся** в фоне.

#### Аргументы приложения

Всё после `--` передаётся в само приложение:

```bash
pm2 start api.js -- arg1 arg2
```

#### Несколько приложений — конфигурационный файл

Если процессов несколько или опций много — используйте `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: "limit worker",
    script: "./worker.js",
    args: "limit"
  }, {
    name: "rotate worker",
    script: "./worker.js",
    args: "rotate"
  }]
}
```

Запуск обоих:

```bash
pm2 start ecosystem.config.js
```

Подробнее — раздел [ecosystem.config.js](#ecosystemconfigjs) ниже.

### Restart

Перезапуск одного приложения:

```bash
pm2 restart api
```

Всех:

```bash
pm2 restart all
```

Нескольких сразу:

```bash
pm2 restart app1 app3 app4
```

После `npm run build` на frontend:

```bash
pm2 restart marketis.xyz
# или
pm2 restart all
```

#### Обновление переменных окружения

Чтобы подхватить новые env или опции PM2, нужен `--update-env`:

```bash
NODE_ENV=production pm2 restart web-interface --update-env
```

Без этого флага процесс перезапустится со **старыми** переменными.

### Stop

Остановить процесс (остаётся в списке PM2):

```bash
pm2 stop api
pm2 stop [process_id]
```

Все:

```bash
pm2 stop all
```

Несколько:

```bash
pm2 stop app1 app3 app4
```

`stop` не удаляет приложение из списка. Чтобы убрать полностью — `delete`.

### Delete

Остановить и удалить из списка PM2:

```bash
pm2 delete api
pm2 delete 3
```

Все:

```bash
pm2 delete all
```

---

## Список приложений

```bash
pm2 list
# то же самое:
pm2 ls
pm2 l
pm2 status
```

Пример вывода:

```
┌────┬────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name           │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ frontend       │ fork     │ 61   │ online    │ 0%       │ 63.8mb   │
│ 7  │ marketis.xyz   │ fork     │ 1    │ online    │ 0%       │ 64.2mb   │
└────┴────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

| Колонка | Смысл |
|---------|--------|
| `id` | Номер процесса (`pm2 restart 0`, `pm2 delete 7`) |
| `name` | Имя из `--name` или `ecosystem.config.js` |
| `mode` | `fork` (один процесс) или `cluster` |
| `↺` | Сколько раз процесс уже перезапускался |
| `status` | `online`, `stopped`, `errored` |
| `cpu` / `memory` | Нагрузка |

Сортировка:

```bash
pm2 list --sort name:desc
pm2 list --sort [name|id|pid|memory|cpu|status|uptime][:asc|desc]
```

### Терминальный дашборд

CPU и память в реальном времени:

```bash
pm2 monit
```

### Метаданные приложения

```bash
pm2 show api
pm2 show marketis.by
```

Показывает путь, pid, логи, uptime, количество рестартов.

### Сброс счётчика рестартов

```bash
pm2 reset all
```

---

## ecosystem.config.js

Конфиг удобен, когда на одном сервере несколько Next.js или нужны разные окружения.

| Файл | Окружение |
|------|-----------|
| `ecosystem.dev.config.js` | develop |
| `ecosystem.prod.config.js` | production |

```bash
cd /var/www/BZRMarketisSite/frontend

pm2 start ecosystem.prod.config.js
pm2 start ecosystem.dev.config.js
```

> На production используйте `ecosystem.prod.config.js`. Без него главная страница Next.js может «пропадать» при долгой загрузке API. См. [Laravel + Next.js](../../devops/laravel-next/README.md).

Пример для Next.js:

```javascript
module.exports = {
  apps: [{
    name: "marketis.by",
    cwd: "/var/www/BZRMarketis/frontend",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
```

Несколько приложений на разных портах:

```javascript
module.exports = {
  apps: [
    {
      name: "marketis.by",
      cwd: "/var/www/BZRMarketis/frontend",
      script: "npm",
      args: "run start",
      env: { PORT: 3000 }
    },
    {
      name: "marketis.site",
      cwd: "/var/www/BZRMarketisSite/frontend",
      script: "npm",
      args: "run start",
      env: { PORT: 3001 }
    }
  ]
}
```

Частые поля:

| Поле | Назначение |
|------|------------|
| `name` | Имя в `pm2 list` |
| `script` | Файл или команда (`npm`, `node`, `./server.js`) |
| `args` | Аргументы (`run start`) |
| `cwd` | Рабочая директория |
| `instances` | Число инстансов (`max` = все ядра) |
| `exec_mode` | `fork` или `cluster` |
| `max_memory_restart` | Рестарт при превышении памяти (`500M`) |
| `env` | Переменные окружения |

После правки конфига безопаснее удалить процесс и запустить заново (или `restart --update-env`):

```bash
pm2 delete marketis.by
pm2 start ecosystem.prod.config.js
```

---

## Логи

```bash
pm2 logs
pm2 logs marketis.by
pm2 logs --lines 200
```

Файлы по умолчанию: `~/.pm2/logs/`.

```bash
pm2 flush
```

очищает логи всех процессов.

---

## Автозапуск после перезагрузки сервера

PM2 сам по себе не стартует после reboot, пока не зарегистрирован в systemd.

```bash
pm2 startup
```

Команда выведет строку вида `sudo env PATH=... pm2 startup systemd -u USER --hp /home/USER` — её нужно выполнить.

Затем сохранить текущий список процессов:

```bash
pm2 save
```

После изменений списка (`start` / `delete`) снова `pm2 save`, иначе после reboot поднимется старый набор.

Проверка:

```bash
pm2 unstartup    # снять автозапуск (если нужно)
```

---

## Cluster и zero-downtime reload

Cluster размазывает Node.js по ядрам CPU. Приложение должно быть **stateless** (сессии не в памяти процесса).

```bash
pm2 start app.js -i 4
pm2 start app.js -i max
```

Для Next.js на одном порту чаще оставляют **fork** (один процесс): кластер усложняет работу с портом `next start`.

`reload` перезапускает без простоя (по одному инстансу), `restart` — с кратким даунтаймом:

```bash
pm2 reload app
pm2 restart app
```

---

## Next.js на сервере

Типичный цикл после деплоя frontend:

```bash
cd /var/www/BZRMarketis/frontend
npm run build
pm2 restart marketis.by
```

Если порт 3000 занят — другой порт в `package.json` и в Nginx:

```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

```bash
pm2 start npm --name marketis.site -- run start
```

Nginx проксирует на этот порт — см. [Laravel + Next.js](../../devops/laravel-next/README.md).

---

## Шпаргалка

| Команда | Действие |
|---------|----------|
| `pm2 start app.js` | Запустить и добавить в список |
| `pm2 start npm --name app -- run start` | Next.js / npm-скрипт |
| `pm2 start ecosystem.config.js` | Запуск из конфига |
| `pm2 stop app` | Остановить (остаётся в списке) |
| `pm2 restart app` | Перезапуск |
| `pm2 restart app --update-env` | Перезапуск с новыми env |
| `pm2 reload app` | Рестарт без простоя (cluster) |
| `pm2 delete app` | Остановить и убрать из списка |
| `pm2 list` / `pm2 status` | Список процессов |
| `pm2 show app` | Метаданные |
| `pm2 logs` | Логи в реальном времени |
| `pm2 monit` | CPU / память |
| `pm2 reset all` | Сбросить счётчик рестартов |
| `pm2 save` | Сохранить список |
| `pm2 startup` | Автозапуск после reboot |
| `pm2 ping` | Проверить, что демон жив |

Идентификатор процесса — **имя** (`marketis.by`) или **id** (`0`, `7`).

---

## Источники

| Ресурс | Ссылка |
|--------|--------|
| Process Management | [pm2.keymetrics.io/docs/usage/process-management](https://pm2.keymetrics.io/docs/usage/process-management/) |
| Quick Start | [pm2.keymetrics.io/docs/usage/quick-start](https://pm2.keymetrics.io/docs/usage/quick-start/) |
| Configuration File | [pm2.keymetrics.io/docs/usage/application-declaration](https://pm2.keymetrics.io/docs/usage/application-declaration/) |
| Persistent Application | [pm2.keymetrics.io/docs/usage/startup](https://pm2.keymetrics.io/docs/usage/startup/) |
| CLI Reference | [pm2.keymetrics.io/docs/usage/pm2-doc-single-page](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) |
| Гайд на русском | [nodejsdev.ru/guides/webdraftt/pm2](https://nodejsdev.ru/guides/webdraftt/pm2/) |
