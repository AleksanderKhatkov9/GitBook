# 5. Мультимедиа

> Источники: [metanit.com — Мультимедиа](https://metanit.com/web/html5/10.1.php) · [W3Schools — HTML Media](https://www.w3schools.com/html/html_media.asp) · [htmlbook.ru — video, audio](https://htmlbook.ru/html/video)

## video

```html
<video controls width="640" height="360" poster="preview.jpg" preload="metadata">
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="subs-ru.vtt" srclang="ru" label="Русский" default>
    Ваш браузер не поддерживает видео.
</video>
```

| Атрибут | Описание |
|---------|----------|
| `controls` | Панель управления |
| `autoplay` | Автовоспроизведение (осторожно с UX) |
| `muted` | Без звука (нужен для autoplay в большинстве браузеров) |
| `loop` | Зацикливание |
| `poster` | Превью до воспроизведения |
| `preload` | `none`, `metadata`, `auto` |
| `playsinline` | Воспроизведение inline на iOS |

### Фоновое видео

```html
<video autoplay muted loop playsinline class="hero-video">
    <source src="background.mp4" type="video/mp4">
</video>
```

## audio

```html
<audio controls preload="metadata">
    <source src="podcast.mp3" type="audio/mpeg">
    <source src="podcast.ogg" type="audio/ogg">
    Браузер не поддерживает аудио.
</audio>
```

## Встраивание YouTube

```html
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
```

## picture — адаптивные изображения

```html
<picture>
    <source media="(min-width: 1200px)" srcset="hero-large.webp" type="image/webp">
    <source media="(min-width: 768px)" srcset="hero-medium.webp" type="image/webp">
    <source srcset="hero-small.webp" type="image/webp">
    <img src="hero-small.jpg" alt="Описание баннера" width="800" height="400">
</picture>
```

## canvas

Рисование через JavaScript (графики, игры, анимации):

```html
<canvas id="chart" width="400" height="200">
    Canvas не поддерживается.
</canvas>

<script>
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#336699';
ctx.fillRect(10, 10, 150, 80);
ctx.font = '16px sans-serif';
ctx.fillStyle = '#fff';
ctx.fillText('Hello', 20, 55);
</script>
```

## SVG

Векторная графика — масштабируется без потери качества:

```html
<!-- Встроенный SVG -->
<svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="40" fill="#336699"/>
</svg>

<!-- SVG как файл -->
<img src="icon.svg" alt="Иконка" width="48" height="48">
```

## iframe

```html
<!-- Карта -->
<iframe
    src="https://yandex.ru/map-widget/v1/?um=..."
    title="Карта офиса"
    width="600"
    height="400"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
</iframe>

<!-- Документ -->
<iframe src="/embed/report" title="Отчёт" sandbox="allow-scripts allow-same-origin"></iframe>
```

| Атрибут | Описание |
|---------|----------|
| `sandbox` | Ограничения безопасности для встроенного контента |
| `loading="lazy"` | Отложенная загрузка |
| `referrerpolicy` | Политика referrer |

## Форматы и совместимость

| Тип | Рекомендуемые форматы |
|-----|----------------------|
| Видео | MP4 (H.264), WebM (VP9) |
| Аудио | MP3, OGG, AAC |
| Изображения | WebP, AVIF (с fallback JPG/PNG) |
| Субтитры | WebVTT (`.vtt`) |

Проверка поддержки: [caniuse.com](https://caniuse.com/)

## Оптимизация медиа

```html
<!-- Ленивая загрузка -->
<img src="photo.jpg" alt="Фото" loading="lazy" decoding="async">

<!-- Указание размеров — предотвращает сдвиг layout -->
<img src="banner.jpg" alt="Баннер" width="1200" height="400">

<!-- preload для критичного видео -->
<link rel="preload" as="video" href="hero.mp4">
```

## Laravel: хранение медиа

```php
// Сохранение загруженного файла
$path = $request->file('avatar')->store('avatars', 'public');

// В Blade
<img src="{{ Storage::url($path) }}" alt="Аватар">
```

## Полезные ссылки

- [MDN — video element](https://developer.mozilla.org/ru/docs/Web/HTML/Element/video)
- [MDN — audio element](https://developer.mozilla.org/ru/docs/Web/HTML/Element/audio)
- [MDN — Canvas API](https://developer.mozilla.org/ru/docs/Web/API/Canvas_API)

[← Вернуться к оглавлению](README.md)
