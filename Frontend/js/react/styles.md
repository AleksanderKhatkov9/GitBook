# 8. Стили: className и style

> Источники: [Adding Styles](https://react.dev/learn#adding-styles) · [Metanit — Построение приложения](https://metanit.com/web/react/1.4.php)

React не навязывает способ подключения CSS. В JSX CSS-класс задаётся атрибутом **`className`** (не `class`).

## className

```js
<img className="avatar" />
```

```css
.avatar {
  border-radius: 50%;
}
```

В Vite/CRA стили импортируют в JS:

```js
import './App.css';
import styles from './Button.module.css'; // CSS Modules

function Button() {
  return <button className={styles.primary}>OK</button>;
}
```

## Условные классы

```js
function Panel({ isActive }) {
  return (
    <div className={isActive ? 'panel panel--active' : 'panel'}>
      Content
    </div>
  );
}
```

С несколькими флагами удобны утилиты вроде `clsx` / `classnames`:

```js
import clsx from 'clsx';

<div className={clsx('panel', isActive && 'panel--active', className)} />
```

## Inline style

Атрибут `style` принимает **объект**, ключи — в camelCase:

{% raw %}
```js
const user = { imageSize: 90 };

<img
  style={{
    width: user.imageSize,
    height: user.imageSize,
    borderRadius: '50%'
  }}
/>
```
{% endraw %}

| CSS | React style |
|-----|-------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `z-index` | `zIndex` |

Числа для размеров часто означают пиксели: `width: 90` → `90px`. Строки с единицами: `width: '2rem'`.

Когда стили зависят от JS-переменных, `style` удобен. Для остального предпочтительнее CSS-классы.

## Пример: список с цветом

{% raw %}
```js
<li
  key={product.id}
  style={{
    color: product.isFruit ? 'magenta' : 'darkgreen'
  }}
>
  {product.title}
</li>
```
{% endraw %}

## Другие подходы в экосистеме

| Подход | Пример |
|--------|--------|
| CSS Modules | `Button.module.css` |
| Tailwind | `className="rounded-full px-4"` |
| CSS-in-JS | styled-components, Emotion |

Далее: [Эффекты](effects.md).
