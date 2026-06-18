# Решение проблем

## Проблема с роутом Nova Component

Если запрос не переходит на нужный `id`, проверьте:

1. Папка компонента существует в релизе:
   ```
   /var/www/bzr-mediaspace/releases/1.1.2/nova-components/Order
   ```

2. Правильный URL в Vue-компоненте:

```javascript
const resourceId = currentUrl.replace(
    'http://lgm.loc/admin/resources/order-statistics/',
    ''
)

axios.get(`/nova-vendor/order/order-statistics/` + resourceId)
```

3. Пересоберите assets:

```bash
cd /home/vagrant/bzr-mediaspace/nova-components/Order
npm run dev
```

## Компонент не работает после деплоя

На сервере в папке компонента:

```bash
npm update
npm run prod
```

Убедитесь, что `nova-components/` включена в деплой и `dist/` содержит актуальные файлы.

## Ошибка webpack при сборке nova-components

При `npm run dev` в `nova-components/Client` или `nova-components/Order` может появиться ошибка:

```
Options object for the ProgressPlugin.
* options has an unknown property 'color'
* options has an unknown property 'reporters'
* options has an unknown property 'reporter'
```

**Причина:** несовместимость `webpackbar@5` с `webpack@5`.

**Решение:** примените патч `patch-webpackbar.js` для совместимости webpackbar с webpack 5.

## Загрузка изображений (Trix)

Если изображения не сохраняются:

1. Проверьте таблицы `nova_pending_field_attachments` и `nova_field_attachments`
2. Создайте миграции для Trix (см. [Поля — Trix](fields.md#проблема-с-записью-изображений))
3. Создайте папку `storage/app/public/nova`
4. Выполните `php artisan storage:link`

Подробнее: [GitHub issue #473](https://github.com/laravel/nova-issues/issues/473)

## Разница между nova-api и nova-vendor

| Префикс | Назначение |
|---------|------------|
| `nova-api/` | Встроенные API Nova (ресурсы, фильтры) |
| `nova-vendor/{name}/` | Маршруты кастомных компонентов |

Для кастомных Cards/Tools всегда используйте `nova-vendor/`.

## Чеклист при переносе на тестовый сервер

- [ ] Папка `nova-components/` скопирована в релиз
- [ ] Выполнены `npm update` и `npm run prod` в каждом компоненте
- [ ] URL в Vue-компонентах соответствуют `routes/api.php`
- [ ] `composer install` выполнен с репозиторием `laravelsatis.com` (если используется)
- [ ] `php artisan migrate` выполнен
- [ ] Симлинк `public/storage` создан
