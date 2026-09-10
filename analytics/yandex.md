# Яндекс Метрика

> Сайт: [metrika.yandex.ru](https://metrika.yandex.ru/) · Справка: [yandex.ru/support/metrica](https://yandex.ru/support/metrica/)

**Яндекс Метрика** — бесплатный счётчик веб-аналитики от Яндекса. Удобен для сайтов с аудиторией в России и СНГ: вебвизор, карты кликов, цели, сегменты.

## Регистрация и создание счётчика

1. Войдите на [metrika.yandex.ru](https://metrika.yandex.ru/).
2. **Добавить счётчик** → укажите имя и адрес сайта.
3. Включите нужные опции: вебвизор, карта кликов, точный показатель отказов.
4. Скопируйте код счётчика (или номер `XXXXXXXX`).

## Код счётчика

Вставьте перед закрывающим `</head>` или в конец `<body>` на всех страницах:

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],
        k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(XXXXXXXX, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
</script>
<noscript>
    <div>
        <img src="https://mc.yandex.ru/watch/XXXXXXXX" style="position:absolute; left:-9999px;" alt="" />
    </div>
</noscript>
<!-- /Yandex.Metrika counter -->
```

Замените `XXXXXXXX` на номер вашего счётчика.

## Laravel (Blade)

`resources/views/layouts/app.blade.php`:

```blade
<!DOCTYPE html>
<html lang="ru">
<head>
    {{-- ... --}}
    @if(config('services.metrika.id'))
        @include('partials.metrika')
    @endif
</head>
<body>
    @yield('content')
</body>
</html>
```

`.env`:

```env
YANDEX_METRIKA_ID=XXXXXXXX
```

`config/services.php`:

```php
'metrika' => [
    'id' => env('YANDEX_METRIKA_ID'),
],
```

## Next.js (App Router)

`app/layout.tsx` — через `next/script`:

```tsx
import Script from 'next/script';

const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        {METRIKA_ID && (
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${METRIKA_ID}, "init", {
                clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true
              });
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
```

## Цели

| Тип цели | Пример |
|----------|--------|
| Просмотр URL | `/thank-you`, `/order/success` |
| JavaScript-событие | Клик по кнопке, отправка формы |
| Количество просмотров | N страниц за визит |
| Составная | Цепочка шагов (корзина → оплата) |

### Событие из кода

```js
// После успешной отправки формы
ym(XXXXXXXX, 'reachGoal', 'form_submit');
```

```html
<button onclick="ym(XXXXXXXX, 'reachGoal', 'cta_click')">Заказать</button>
```

## Основные отчёты

| Отчёт | Что смотреть |
|-------|--------------|
| Сводка | Визиты, пользователи, отказы |
| Источники | Откуда пришли (поиск, прямые, реклама) |
| Содержание | Популярные страницы |
| Вебвизор | Записи сессий |
| Карта кликов | Куда кликают |
| Конверсии | Выполнение целей |

## Проверка

1. Откройте сайт в новой вкладке (или инкогнито).
2. В Метрике: **Отчёты → Стандартные → «Онлайн»**.
3. Должен появиться ваш визит в течение минуты.

## Чеклист

- [ ] Счётчик создан, код на всех страницах
- [ ] Вебвизор / карта кликов включены (если нужны)
- [ ] Цели: хотя бы одна ключевая конверсия
- [ ] Сайт добавлен в [Яндекс Вебмастер](https://webmaster.yandex.ru/)
- [ ] ID вынесен в `.env`, не захардкожен в репозитории публично без нужды

## Связанные страницы

| Страница | Связь |
|----------|-------|
| [Google Analytics](google.md) | Параллельный счётчик для мира |
| [Matomo](matomo.md) | Self-hosted альтернатива |
| [SEO — инструменты](../seo/tools.md) | Вебмастер и SEO-метрики |

[← К оглавлению раздела](README.md)
