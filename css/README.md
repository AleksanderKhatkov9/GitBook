# CSS

Документация по стилям и CSS-фреймворкам.

## Основы CSS

```css
/* Селектор */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

/* Flexbox */
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

/* Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
```

## Популярные фреймворки

| Фреймворк | Ссылка |
|-----------|--------|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Bootstrap](https://getbootstrap.com/) | Компонентный фреймворк |
| [Bulma](https://bulma.io/) | Современный CSS-фреймворк |

## Tailwind в Laravel

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`resources/css/app.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Полезные ссылки

- [MDN CSS](https://developer.mozilla.org/ru/docs/Web/CSS)
- [Can I Use](https://caniuse.com/) — поддержка браузерами
