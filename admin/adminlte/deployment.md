# Деплой

> Официальная документация: [Deployment | AdminLTE 4](https://adminlte.io/themes/v4/docs/deployment.html)

## CDN vs self-hosted

| | CDN | Self-hosted (npm/Vite) |
|---|-----|------------------------|
| Скорость внедрения | Высокая | Средняя |
| Кэш браузера | Общий CDN | Свой домен |
| Версионирование | Фиксируйте версию в URL | `package-lock.json` |
| Production | Подходит для простых проектов | Рекомендуется для Laravel/Vite |

## Laravel + Vite (production)

```bash
npm run build
```

Vite соберёт `admin.css` и `admin.js` в `public/build/`. Убедитесь, что `@vite` в layout указывает на production manifest.

## Оптимизация

- Минифицированные файлы: `adminlte.min.css`, `adminlte.min.js`.
- Не подключайте лишние demo-скрипты (Chart.js и т.д.), если не используете.
- Включите gzip/brotli на nginx (см. раздел DevOps → Nginx).

## Сборка из исходников

```bash
npm run production
```

Скопируйте `dist/` на сервер статики или в `public/vendor/adminlte/`.

## Кэширование

Для self-hosted задайте long cache на hashed-файлы Vite. При обновлении AdminLTE пересоберите assets и сбросьте CDN cache, если используете внешний CDN.

## Связанные разделы

- [Установка](installation.md)
- [Интеграции](integrations.md)
