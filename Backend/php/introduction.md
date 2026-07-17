# Введение в PHP

> Источник: [Введение | PHP Manual](https://www.php.net/manual/ru/intro-whatis.php) · [Простой учебник](https://www.php.net/manual/ru/tutorial.php)

PHP (PHP: Hypertext Preprocessor) — скриптовый язык общего назначения, созданный для веб-разработки. Код выполняется на сервере и обычно отдаёт HTML, JSON или другой ответ клиенту.

## Что умеет PHP

| Область | Возможности |
|---------|-------------|
| Веб | Формы, cookies, сессии, загрузка файлов, HTTP |
| Базы данных | MySQL, PostgreSQL, SQLite, MongoDB и др. |
| Текст и данные | XML, JSON, регулярные выражения |
| Система | Файлы, процессы, CLI |
| Расширения | Изображения, шифрование, кэш, очереди |

Большинство современных PHP-проектов строятся на фреймворках ([Laravel](../laravel/README.md), Symfony) и Composer.

## Минимальный пример

```php
<?php

echo "Привет, мир!";
```

PHP-код вставляется в HTML через теги `<?php ... ?>`:

```php
<!DOCTYPE html>
<html>
<body>
  <h1><?php echo "Заголовок"; ?></h1>
</body>
</html>
```

## Версии

| Версия | Статус (ориентир) |
|--------|-------------------|
| PHP 8.2+ | Рекомендуемый минимум для новых проектов |
| PHP 8.3 / 8.4 / 8.5 | Актуальные ветки с новыми возможностями |
| PHP 7.x | Устарели — не использовать |

Проверка версии:

```bash
php -v
```

## Документация

Полное официальное руководство: [php.net/manual/ru](https://www.php.net/manual/ru/index.php).

В этом разделе GitBook — сжатый справочник языка на основе официального manual:

| Раздел | Тема |
|--------|------|
| [Синтаксис](syntax.md) | Теги, инструкции, комментарии |
| [Типы](types.md) | Scalar, array, object, union types |
| [Переменные](variables.md) | Область видимости, суперглобальные |
| [Константы](constants.md) | `const`, `define`, магические |
| [Операторы](operators.md) | Арифметика, сравнение, логика |
| [Управляющие конструкции](control-structures.md) | if, циклы, match, include |
| [Функции](functions.md) | Параметры, return, closures |
| [ООП](OOP/README.md) | Классы и объекты |
| [Пространства имён](namespaces.md) | `namespace`, `use` |
| [Перечисления](enumerations.md) | `enum` |
| [Ошибки и исключения](errors-exceptions.md) | Error, Exception, try/catch |
| [Генераторы](generators.md) | `yield` |
| [Атрибуты](attributes.md) | `#[Attribute]` |
| [Безопасность](security.md) | Ввод, сессии, БД |
| [Особенности](features.md) | Cookies, сессии, загрузки, CLI |

Связанные разделы: [ООП](OOP/README.md), [SOLID](SOLID/README.md), [Laravel](../laravel/README.md).
