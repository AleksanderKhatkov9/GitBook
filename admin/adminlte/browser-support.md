# Поддержка браузеров

> Официальная документация: [Browser Support | AdminLTE 4](https://adminlte.io/themes/v4/docs/browser-support.html)

## Поддерживаемые браузеры

AdminLTE 4 ориентирован на **modern evergreen** браузеры:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Не поддерживается

- Internet Explorer 11 и ниже
- Устаревшие мобильные браузеры без поддержки ES6+ и CSS Grid/Flexbox

## Минимальные требования

| Технология | Требование |
|------------|------------|
| ES6+ | Модули, arrow functions, const/let |
| CSS | Flexbox, CSS variables (`data-bs-theme`) |
| Fullscreen API | Опционально, для плагина Fullscreen |

## Проверка перед релизом

1. Откройте админку в Chrome, Firefox, Safari.
2. Проверьте mobile viewport (sidebar overlay, таблицы).
3. Прогоните Lighthouse (Performance, Accessibility).

## Legacy-проекты

Для IE11 используйте [AdminLTE 3.2](https://adminlte.io/docs/3.2).

## Связанные разделы

- [Миграция с v3](migration-v3.md)
- [Деплой](deployment.md)
