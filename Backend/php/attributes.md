# Атрибуты

> Источник: [Атрибуты | PHP Manual](https://www.php.net/manual/ru/language.attributes.php)

Атрибуты (PHP 8.0+) — структурированные метаданные для классов, методов, свойств, параметров, констант и т.д. Заменяют многие сценарии DocBlock-аннотаций.

## Синтаксис

```php
<?php

#[Attribute]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET',
    ) {}
}

class UserController
{
    #[Route('/users', method: 'GET')]
    public function index(): void {}
}
```

Несколько атрибутов:

```php
<?php

#[Route('/users')]
#[Authorize('admin')]
public function store(): void {}
```

## Объявление класса атрибута

```php
<?php

#[Attribute(Attribute::TARGET_METHOD | Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class Listen
{
    public function __construct(public string $event) {}
}
```

| Флаг `Attribute::` | Назначение |
|--------------------|------------|
| `TARGET_CLASS` | Класс |
| `TARGET_METHOD` | Метод |
| `TARGET_PROPERTY` | Свойство |
| `TARGET_PARAMETER` | Параметр |
| `TARGET_CLASS_CONSTANT` | Константа класса |
| `TARGET_FUNCTION` | Функция |
| `TARGET_ALL` | Везде |
| `IS_REPEATABLE` | Можно несколько раз на одной цели |

Без `#[Attribute]` класс нельзя использовать как атрибут.

## Чтение через Reflection

```php
<?php

$ref = new ReflectionMethod(UserController::class, 'index');
$attrs = $ref->getAttributes(Route::class);

foreach ($attrs as $attr) {
    /** @var Route $route */
    $route = $attr->newInstance();
    echo $route->path; // /users
}
```

| Метод | Описание |
|-------|----------|
| `getAttributes()` | Все атрибуты |
| `getAttributes(Route::class)` | Только указанный |
| `newInstance()` | Создать экземпляр класса атрибута |

## Встроенные атрибуты PHP

> Источник: [Предопределённые атрибуты](https://www.php.net/manual/ru/reserved.attributes.php)

| Атрибут | Назначение |
|---------|------------|
| `#[Attribute]` | Пометить класс как атрибут |
| `#[Override]` | Метод переопределяет родительский (PHP 8.3) |
| `#[Deprecated]` | Пометить устаревшее (PHP 8.4) |
| `#[SensitiveParameter]` | Скрыть параметр в stack traces |
| `#[AllowDynamicProperties]` | Разрешить динамические свойства |
| `#[ReturnTypeWillChange]` | Переходный для смены return type |
| `#[NoDiscard]` | Предупреждение, если результат игнорируют (новые версии) |

```php
<?php

class Child extends ParentClass
{
    #[Override]
    public function save(): void {}
}

function login(
    string $user,
    #[SensitiveParameter] string $password,
): void {}
```

## Где используются

Фреймворки читают атрибуты для маршрутов, валидации, ORM-маппинга, DI. Примеры: Symfony Routing, Laravel (частично), PHPUnit, Doctrine (атрибуты вместо аннотаций).

Связано: [ООП](OOP/README.md), [Функции](functions.md).
