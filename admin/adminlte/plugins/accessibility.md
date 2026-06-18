# Accessibility

> Официальная документация: [Accessibility | AdminLTE 4](https://adminlte.io/themes/v4/docs/javascript/accessibility.html)

AdminLTE 4 улучшает доступность shell: клавиатурная навигация, ARIA-атрибуты, фокус в меню.

## Рекомендации

| Область | Практика |
|---------|----------|
| Sidebar | `role="menu"` на списке, осмысленные `aria-label` на кнопках |
| Кнопка sidebar | `role="button"`, не пустой `href="#"` без обработки |
| Dropdown | Использовать стандартные компоненты Bootstrap 5 |
| Иконки | `aria-hidden="true"` на декоративных `<i>`, текст рядом или `sr-only` |
| Контраст | Проверять light/dark темы на WCAG |

## Клавиатура

- Tab — переход по интерактивным элементам;
- Enter/Space — активация кнопок меню;
- Escape — закрытие overlay sidebar на мобильном (зависит от версии).

## Тестирование

- Lighthouse Accessibility audit;
- навигация только с клавиатуры;
- screen reader (NVDA, VoiceOver).

## Связанные разделы

- [Компоненты: Sidebar](../components/sidebar.md)
- [PushMenu](pushmenu.md)
