# Google Analytics (GA4)

> Сайт: [analytics.google.com](https://analytics.google.com/) · Справка: [support.google.com/analytics](https://support.google.com/analytics/)

**Google Analytics 4 (GA4)** — актуальная версия аналитики Google. Событийная модель: всё — события (`page_view`, `purchase`, кастомные). Универсальная Analytics (UA) отключена.

## Регистрация и property

1. Откройте [analytics.google.com](https://analytics.google.com/).
2. **Admin → Create property** (или аккаунт + property).
3. Создайте **Web data stream** → укажите URL сайта.
4. Скопируйте **Measurement ID**: `G-XXXXXXXXXX`.

## Код gtag.js

Вставьте в `<head>` на всех страницах:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Laravel (Blade)

```blade
{{-- resources/views/partials/ga.blade.php --}}
@if(config('services.google.analytics_id'))
<script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google.analytics_id') }}"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{ config('services.google.analytics_id') }}');
</script>
@endif
```

`.env`:

```env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

`config/services.php`:

```php
'google' => [
    'analytics_id' => env('GOOGLE_ANALYTICS_ID'),
],
```

## Next.js (App Router)

Пакет `@next/third-parties` (официальный):

```bash
npm install @next/third-parties
```

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
```

Или через `next/script` вручную — аналогично [Яндекс Метрике](yandex.md).

## События

GA4 автоматически собирает часть событий (enhanced measurement). Кастомные:

```js
// Клик / конверсия
gtag('event', 'generate_lead', {
    event_category: 'form',
    event_label: 'contact'
});

// Покупка (e-commerce)
gtag('event', 'purchase', {
    transaction_id: 'T123',
    value: 99.99,
    currency: 'USD',
    items: [{ item_id: 'SKU1', item_name: 'Product', price: 99.99 }]
});
```

В Laravel / SPA вызывайте `gtag('event', ...)` после успешного действия на клиенте.

## Google Tag Manager (GTM)

Альтернатива прямому gtag: один контейнер GTM, теги GA4 / рекламы настраиваются в UI без деплоя.

```html
<!-- В <head> -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

| Подход | Когда |
|--------|-------|
| **gtag.js** | Простой сайт, один счётчик |
| **GTM** | Много тегов, маркетинг меняет теги без разработчиков |

Не ставьте **и** прямой gtag GA4, **и** тот же GA4 через GTM — будет двойной учёт.

## Основные отчёты

| Отчёт | Что смотреть |
|-------|--------------|
| Realtime | Проверка установки |
| Acquisition | Источники трафика |
| Engagement → Pages | Популярные страницы |
| Engagement → Events | События и конверсии |
| Monetization | E-commerce (если настроено) |

Свяжите property с [Google Search Console](https://search.google.com/search-console) в Admin → Product links.

## Debug

1. Расширение [Google Analytics Debugger](https://chrome.google.com/webstore) или режим отладки.
2. В GA4: **Admin → DebugView** — события в реальном времени при `debug_mode`.
3. Или временно:

```js
gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
```

## Чеклист

- [ ] Property GA4 + Web stream, Measurement ID `G-...`
- [ ] Код на всех страницах (layout)
- [ ] Realtime показывает визит
- [ ] Ключевые события помечены как conversions
- [ ] Связь с Search Console
- [ ] Cookie consent для EU (если применимо)
- [ ] ID в `.env` (`NEXT_PUBLIC_` / `GOOGLE_ANALYTICS_ID`)

## Связанные страницы

| Страница | Связь |
|----------|-------|
| [Яндекс Метрика](yandex.md) | RU-аудитория |
| [Matomo](matomo.md) | Self-hosted / GDPR |
| [SEO — инструменты](../seo/tools.md) | Search Console, Lighthouse |

[← К оглавлению раздела](README.md)
