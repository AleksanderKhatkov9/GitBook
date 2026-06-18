# Direct Chat

> Официальная документация: [Direct Chat | AdminLTE 4](https://adminlte.io/themes/v4/docs/javascript/direct-chat.html)

Direct Chat — виджет чата в стиле мессенджера для демо-страниц и внутренних панелей.

## Использование

Разметка виджета есть в [демо AdminLTE](https://adminlte.io/themes/v4/pages/examples/legacy-user-menu.html) и исходниках репозитория. Скопируйте блок `.direct-chat` из нужной demo-страницы.

## Типичная структура

- `.direct-chat` — контейнер;
- `.direct-chat-messages` — список сообщений;
- `.direct-chat-contacts` — список контактов (опционально);
- поле ввода в footer карточки.

## Интеграция с backend

Для реального чата подключите WebSocket или polling (Laravel Echo, Pusher и т.д.) и замените статичную разметку на динамическую.

## Связанные разделы

- [Рецепты](../recipes.md)
- [Компоненты](../components/README.md)
