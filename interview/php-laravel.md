# Подготовка к PHP/Laravel собеседованию

Вопросы с краткими ответами: [PHP Core](php.md) · [MySQL](mysql.md) · [Laravel](laravel.md).

## На основе обратной связи технического специалиста Innovace

### Цели

Основные направления подготовки:

1. PHP Core и фундамент языка.
2. Типизация PHP.
3. Работа с массивами и стандартными функциями.
4. Понимание работы PHP «под капотом».
5. ООП на практике.
6. SOLID и применение принципов.
7. Dependency Injection.
8. Основные паттерны проектирования.
9. SQL и JOIN.
10. Индексы и оптимизация запросов.
11. Transactions и ACID.
12. Умение объяснять архитектурные и технические решения.

---

# 1. PHP Core

## 1.1. Типы данных

PHP — динамически типизированный язык, но современные версии PHP позволяют активно использовать статическую типизацию.

Основные типы:

- `int` — целые числа.
- `float` — числа с плавающей точкой.
- `string` — строки.
- `bool` — `true`/`false`.
- `null` — отсутствие значения.
- `array` — массив.
- `object` — объект.
- `resource` — специальный ресурс.
- `callable` — вызываемое значение.
- `iterable` — значение, которое можно перебрать через `foreach`.

Также существуют специальные типы:

- `mixed`
- `void`
- `never`
- `static`
- `self`
- `parent`

### Пример

```php
function getName(): string
{
    return 'Sasha';
}
```

Тип возвращаемого значения гарантирует контракт функции.

---

# 2. Слабая и строгая типизация

PHP допускает автоматические преобразования типов.

```php
$a = "10";
$b = 10;

var_dump($a == $b);  // true
var_dump($a === $b); // false
```

## `==`

Сравнивает значения с приведением типов.

## `===`

Сравнивает и значение, и тип.

На практике в большинстве случаев предпочтительно использовать `===` и `!==`, чтобы избежать неожиданных преобразований.

---

# 3. Type juggling

Type juggling — автоматическое преобразование одного типа в другой.

Например:

```php
$value = "123";

$number = (int) $value;
```

Явное преобразование называется casting.

```php
(int)
(float)
(string)
(bool)
(array)
(object)
```

Нужно понимать, что PHP может автоматически преобразовывать типы в выражениях, сравнениях и вызовах функций.

---

# 4. `declare(strict_types=1)`

```php
declare(strict_types=1);
```

Включает строгую проверку scalar-типов при передаче аргументов и возврате значений в соответствующем PHP-коде.

Пример:

```php
declare(strict_types=1);

function sum(int $a, int $b): int
{
    return $a + $b;
}
```

При строгой типизации передача строки вместо `int` приводит к `TypeError`, если PHP не может использовать допустимое строгое значение.

Важно понимать, что `strict_types` действует на уровне конкретного PHP-файла и прежде всего влияет на вызовы функций, сделанные из этого файла.

---

# 5. Nullable types

Можно явно указать, что значение может быть `null`.

```php
function findUser(int $id): ?User
{
    // ...
}
```

`?User` означает:

```php
User|null
```

В современных версиях PHP можно писать:

```php
function findUser(int $id): User|null
```

---

# 6. Union types

Union type позволяет указать несколько допустимых типов.

```php
function getValue(int|string $value): int|string
{
    return $value;
}
```

Это полезно, когда функция действительно поддерживает несколько вариантов входных данных.

Но слишком широкие типы могут усложнить понимание кода.

---

# 7. `mixed`

`mixed` означает, что значение может иметь практически любой тип.

```php
function process(mixed $value): mixed
{
    return $value;
}
```

`mixed` полезен на границах системы, например при работе с произвольными данными.

Но злоупотреблять им не стоит.

Если функция ожидает пользователя, лучше:

```php
function process(User $user): void
```

чем:

```php
function process(mixed $user): void
```

Чем точнее контракт, тем легче анализировать и поддерживать код.

---

# 8. `void`

`void` означает, что функция не возвращает значение.

```php
function sendEmail(): void
{
    // ...
}
```

Функция с `void` может использовать `return;`, но не должна возвращать значение.

---

# 9. `never`

`never` используется для функций, которые никогда нормально не завершаются.

Например:

```php
function fail(string $message): never
{
    throw new RuntimeException($message);
}
```

Функция может:

- всегда выбрасывать исключение;
- всегда завершать выполнение процесса.

---

# 10. Arrays

В PHP `array` одновременно используется как:

- обычный массив;
- список;
- ассоциативный массив;
- структура ключ → значение.

```php
$users = [
    ['id' => 1, 'name' => 'Alex'],
    ['id' => 2, 'name' => 'John'],
];
```

PHP-массивы значительно универсальнее классического массива фиксированного типа.

---

# 11. `count`

```php
$count = count($users);
```

Возвращает количество элементов.

---

# 12. `in_array`

```php
in_array(10, $numbers, true);
```

Проверяет наличие значения.

Третий аргумент `true` включает строгую проверку:

```php
in_array(10, ['10'], true); // false
```

Без strict:

```php
in_array(10, ['10']); // true
```

---

# 13. `array_key_exists`

```php
array_key_exists('name', $user);
```

Проверяет существование ключа, даже если его значение `null`.

Это отличается от некоторых проверок через `isset`.

```php
$user = ['name' => null];

isset($user['name']);              // false
array_key_exists('name', $user);   // true
```

---

# 14. `array_keys` и `array_values`

```php
array_keys($array);
array_values($array);
```

`array_keys()` возвращает ключи.

`array_values()` возвращает значения и переиндексирует числовые ключи.

---

# 15. `array_map`

Используется для преобразования каждого элемента.

```php
$result = array_map(
    fn(int $value): int => $value * 2,
    [1, 2, 3]
);
```

Результат:

```php
[2, 4, 6]
```

Обычно `array_map()` не изменяет исходный массив.

---

# 16. `array_filter`

Используется для фильтрации.

```php
$result = array_filter(
    $numbers,
    fn(int $number): bool => $number > 10
);
```

Важная особенность: исходные ключи сохраняются.

Поэтому после фильтрации может получиться:

```php
[
    0 => 20,
    3 => 30,
]
```

Для переиндексации:

```php
$result = array_values($result);
```

---

# 17. `array_reduce`

Используется для последовательного преобразования массива в одно значение.

```php
$total = array_reduce(
    [10, 20, 30],
    fn(int $carry, int $value): int => $carry + $value,
    0
);
```

Результат:

```text
60
```

`$carry` — накопленное значение.

---

# 18. `array_column`

Извлекает один столбец из массива массивов.

```php
$names = array_column($users, 'name');
```

Можно также использовать третий аргумент как ключ:

```php
$usersById = array_column($users, null, 'id');
```

---

# 19. `array_merge`

Объединяет массивы.

Для числовых ключей индексы обычно переиндексируются.

```php
$result = array_merge([1, 2], [3, 4]);
```

Результат:

```php
[1, 2, 3, 4]
```

С ассоциативными строковыми ключами поведение отличается: более поздние значения могут заменить предыдущие.

---

# 20. `array_replace`

Заменяет значения существующих ключей значениями из последующих массивов.

```php
$result = array_replace(
    ['name' => 'Alex'],
    ['name' => 'John']
);
```

---

# 21. `array_slice`

Возвращает часть массива без изменения исходного массива.

```php
$result = array_slice($items, 0, 10);
```

Часто используется для пагинации или получения части списка.

---

# 22. `array_splice`

Удаляет или заменяет часть массива и изменяет исходный массив.

```php
array_splice($items, 2, 1);
```

---

# 23. `array_chunk`

Разбивает массив на части.

```php
$chunks = array_chunk($items, 100);
```

Полезно при пакетной обработке.

---

# 24. `array_unique`

Удаляет повторяющиеся значения.

```php
$unique = array_unique($items);
```

При этом ключи могут сохраниться.

---

# 25. `array_search`

Возвращает ключ найденного элемента или `false`.

```php
$key = array_search('John', $names, true);
```

Важно проверять результат через `=== false`, потому что ключ `0` является валидным результатом:

```php
if ($key === false) {
    // не найден
}
```

---

# 26. Sorting

Основные функции:

```text
sort
rsort
asort
arsort
ksort
krsort
usort
```

Нужно знать, что разные функции отличаются:

- сортировкой по ключу или значению;
- сохранением или изменением ключей;
- направлением сортировки;
- возможностью использовать callback.

---

# 27. Copy-on-write

PHP использует механизм copy-on-write.

```php
$a = [1, 2, 3];
$b = $a;
```

На этом этапе PHP не обязательно сразу создаёт физическую независимую копию всего массива.

Когда одна переменная изменяется:

```php
$b[] = 4;
```

PHP создаёт необходимую отдельную копию.

Это позволяет экономить память.

---

# 28. References

Оператор `&` создаёт ссылочную связь.

```php
$a = 10;
$b =& $a;

$b = 20;
```

Теперь:

```php
$a === 20;
```

потому что `$a` и `$b` ссылаются на одно значение.

Особенно осторожно нужно работать с references в `foreach`.

Опасный пример:

```php
foreach ($array as &$value) {
}
```

После такого цикла reference может продолжать влиять на переменную `$value`.

Часто после такого цикла используют:

```php
unset($value);
```

---

# 29. Memory и Garbage Collection

PHP использует подсчёт ссылок для управления памятью.

Когда объект или значение больше не имеет нужных ссылок, память может быть освобождена.

Garbage Collector дополнительно занимается циклическими ссылками.

Например:

```text
Object A → Object B
Object B → Object A
```

Даже если внешних ссылок уже нет, цикл может существовать. Garbage Collector помогает обнаруживать такие циклы.

---

# 30. Functions

Нужно знать:

```php
function test(): void
{
}
```

Параметры:

```php
function test(string $name, int $age): void
{
}
```

Значения по умолчанию:

```php
function test(string $name = 'Alex'): void
{
}
```

Variadic:

```php
function sum(int ...$numbers): int
{
    return array_sum($numbers);
}
```

---

# 31. Closures

Closure — анонимная функция.

```php
$double = function (int $value): int {
    return $value * 2;
};
```

Можно захватывать переменные:

```php
$multiplier = 2;

$fn = function (int $value) use ($multiplier): int {
    return $value * $multiplier;
};
```

---

# 32. Arrow functions

Короткая форма closure:

```php
$double = fn(int $value): int => $value * 2;
```

Переменные из внешнего scope автоматически доступны для чтения.

---

# 33. Exceptions

Основная структура:

```php
try {
    // risky code
} catch (Throwable $e) {
    // handle
} finally {
    // cleanup
}
```

В PHP есть общий интерфейс:

```text
Throwable
├── Error
└── Exception
```

Можно создавать собственные исключения:

```php
class UserNotFoundException extends RuntimeException
{
}
```

Выброс:

```php
throw new UserNotFoundException();
```

Исключение поднимается вверх по call stack до подходящего `catch`.

---

# 34. OOP

ООП строится вокруг объектов, которые объединяют:

- состояние;
- поведение.

```php
class User
{
    public function __construct(
        private string $name
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }
}
```

---

# 35. Encapsulation

Инкапсуляция означает сокрытие внутреннего состояния объекта и предоставление контролируемого интерфейса.

Плохой вариант:

```php
class BankAccount
{
    public float $balance;
}
```

Любой код может сделать:

```php
$account->balance = -100000;
```

Лучше:

```php
class BankAccount
{
    private float $balance = 0;

    public function deposit(float $amount): void
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException();
        }

        $this->balance += $amount;
    }
}
```

---

# 36. Visibility

```text
public
protected
private
```

`public` доступен отовсюду.

`protected` — внутри класса и наследников.

`private` — только внутри конкретного класса.

---

# 37. Inheritance

```php
class Admin extends User
{
}
```

Наследование позволяет расширять базовый класс.

Но наследование создаёт сильную связь между классами. Поэтому часто предпочтительнее композиция.

---

# 38. Composition

Вместо:

```php
class OrderService extends PaymentService
{
}
```

можно использовать:

```php
class OrderService
{
    public function __construct(
        private PaymentService $paymentService
    ) {
    }
}
```

Композиция обычно позволяет легче менять зависимости и тестировать код.

Практическое правило:

> Prefer composition over inheritance.

---

# 39. Interface

Interface задаёт контракт.

```php
interface PaymentGateway
{
    public function pay(float $amount): bool;
}
```

Реализация:

```php
class StripeGateway implements PaymentGateway
{
    public function pay(float $amount): bool
    {
        // ...
    }
}
```

Главная идея — код может зависеть от абстракции, а не от конкретной реализации.

---

# 40. Abstract class

```php
abstract class Payment
{
    abstract public function pay(float $amount): bool;

    public function log(): void
    {
        // common behavior
    }
}
```

Abstract class может содержать:

- состояние;
- реализованные методы;
- abstract методы.

Interface прежде всего задаёт контракт, хотя современные PHP-интерфейсы также поддерживают некоторые элементы реализации.

---

# 41. Interface vs Abstract class

Interface выбирается, когда важен контракт и разные классы должны поддерживать одинаковое поведение.

Abstract class подходит, когда существует тесная общая концепция и нужно разделить часть реализации или состояния.

Класс может реализовать несколько интерфейсов:

```php
class Payment implements Payable, Loggable
{
}
```

Но не может наследоваться сразу от нескольких классов.

---

# 42. Traits

Trait позволяет переиспользовать реализацию.

```php
trait HasLogging
{
    public function log(string $message): void
    {
        // ...
    }
}

class UserService
{
    use HasLogging;
}
```

Trait не является самостоятельной архитектурной абстракцией вроде interface.

Не стоит использовать traits только ради того, чтобы избежать нормального проектирования зависимостей.

---

# 43. Static

Статические свойства и методы относятся к классу, а не к конкретному объекту.

```php
class Math
{
    public static function sum(int $a, int $b): int
    {
        return $a + $b;
    }
}
```

В объектно-ориентированном бизнес-коде чрезмерное использование static может усложнять тестирование и управление зависимостями.

---

# 44. `final`

`final` запрещает наследование класса:

```php
final class UserService
{
}
```

Или переопределение метода:

```php
final public function save(): void
{
}
```

---

# 45. SOLID

SOLID — пять принципов объектно-ориентированного проектирования.

```text
S — Single Responsibility
O — Open/Closed
L — Liskov Substitution
I — Interface Segregation
D — Dependency Inversion
```

Важно уметь не только расшифровать названия, но и показать проблему на коде.

---

# 46. SRP — Single Responsibility Principle

Класс должен иметь одну ответственность и одну основную причину для изменения.

Плохо:

```php
class UserService
{
    public function createUser()
    {
    }

    public function sendEmail()
    {
    }

    public function generatePdf()
    {
    }
}
```

Лучше разделить:

```text
UserService
EmailService
PdfService
```

SRP не означает «в каждом классе должен быть только один метод».

---

# 47. OCP — Open/Closed Principle

Программные сущности должны быть открыты для расширения, но закрыты для постоянного изменения существующего кода.

Плохой пример:

```php
if ($type === 'stripe') {
    // ...
} elseif ($type === 'paypal') {
    // ...
}
```

При добавлении каждого нового способа оплаты приходится изменять существующий код.

Можно использовать абстракцию:

```php
interface PaymentGateway
{
    public function pay(float $amount): bool;
}
```

И реализации:

```text
StripeGateway
PaypalGateway
```

---

# 48. LSP — Liskov Substitution Principle

Если класс `B` является наследником `A`, объект `B` должен корректно использоваться там, где ожидается `A`.

Наследник не должен ломать контракт родителя.

Пример нарушения:

```php
class Bird
{
    public function fly(): void
    {
    }
}

class Penguin extends Bird
{
    public function fly(): void
    {
        throw new RuntimeException();
    }
}
```

Если базовый контракт обещает, что птица умеет летать, пингвин не должен быть его наследником.

Проблема здесь не в конкретном коде, а в неправильной модели наследования.

---

# 49. ISP — Interface Segregation Principle

Лучше несколько маленьких интерфейсов, чем один огромный.

Плохо:

```php
interface Worker
{
    public function work(): void;
    public function eat(): void;
    public function sleep(): void;
}
```

Если классу нужна только одна функция, он не должен быть вынужден зависеть от остальных.

---

# 50. DIP — Dependency Inversion Principle

Высокоуровневый код не должен зависеть от конкретных низкоуровневых реализаций.

Плохо:

```php
class OrderService
{
    public function __construct(
        private MySqlOrderRepository $repository
    ) {
    }
}
```

Лучше:

```php
class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $repository
    ) {
    }
}
```

Теперь `OrderService` зависит от абстракции.

Это напрямую связано с Dependency Injection и Laravel Service Container.

---

# 51. Dependency Injection

Dependency Injection — передача зависимостей объекту извне вместо самостоятельного создания внутри объекта.

Плохо:

```php
class OrderService
{
    public function __construct()
    {
        $this->repository = new MySqlOrderRepository();
    }
}
```

Лучше:

```php
class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $repository
    ) {
    }
}
```

Преимущества:

- слабая связанность;
- удобнее тестирование;
- проще заменить реализацию;
- легче управлять архитектурой.

---

# 52. Design Patterns

Паттерн — типовое решение распространённой архитектурной проблемы.

Паттерн не нужно использовать автоматически.

Сначала нужно определить проблему, затем выбрать подходящее решение.

---

# 53. Factory

Factory отвечает за создание объектов.

```php
$gateway = PaymentGatewayFactory::make($type);
```

Полезна, когда создание объекта зависит от условий или содержит сложную логику.

---

# 54. Strategy

Strategy позволяет менять алгоритм через общий интерфейс.

Например:

```text
PaymentStrategy
├── CardPayment
├── PaypalPayment
└── BankTransferPayment
```

Код верхнего уровня работает с интерфейсом.

Преимущество — добавление новых алгоритмов без огромного `if/else`.

---

# 55. Adapter

Adapter преобразует интерфейс одного компонента в интерфейс, который ожидает приложение.

Например:

```text
Application
    ↓
PaymentGatewayInterface
    ↓
StripeAdapter
    ↓
Stripe SDK
```

Это особенно полезно при интеграции сторонних API.

---

# 56. Repository

Repository скрывает детали получения и сохранения данных.

```php
interface UserRepository
{
    public function findById(int $id): ?User;
}
```

Реализация:

```php
class EloquentUserRepository implements UserRepository
{
}
```

Repository может быть полезен, когда есть сложная логика доступа к данным или несколько источников данных.

Но не нужно автоматически создавать Repository для каждого Eloquent-моделя.

---

# 57. Observer

Observer позволяет реагировать на события объекта.

В Laravel похожие идеи реализуются через:

- Model Observers;
- Events/Listeners.

Например:

```text
User created
    ↓
Listener
    ↓
Send welcome email
```

---

# 58. Decorator

Decorator позволяет оборачивать объект дополнительным поведением.

```text
RealService
    ↑
CacheDecorator
    ↑
LoggingDecorator
```

Можно добавлять:

- logging;
- caching;
- metrics;
- authorization;

без изменения основного класса.

---

# 59. Singleton

Singleton гарантирует единственный экземпляр объекта в определённом контексте.

В Laravel контейнер может управлять singleton-зависимостями.

Однако глобальное состояние и чрезмерное использование Singleton могут усложнять тестирование.

---

# 60. SQL Fundamentals

Нужно уверенно знать:

```text
SELECT
FROM
WHERE
ORDER BY
GROUP BY
HAVING
LIMIT
JOIN
INSERT
UPDATE
DELETE
```

---

# 61. SELECT

```sql
SELECT id, name
FROM users;
```

Выбирает указанные столбцы.

Не стоит без необходимости использовать:

```sql
SELECT *
```

В production-запросах лучше выбирать только нужные данные.

---

# 62. WHERE

Фильтрует строки до группировки.

```sql
SELECT *
FROM users
WHERE age >= 18;
```

---

# 63. ORDER BY

```sql
SELECT *
FROM users
ORDER BY created_at DESC;
```

---

# 64. GROUP BY

Группирует строки.

```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
```

---

# 65. HAVING

Фильтрует группы после `GROUP BY`.

```sql
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
```

Главное различие:

```text
WHERE  → фильтрация строк
HAVING → фильтрация групп
```

---

# 66. INNER JOIN

Возвращает строки, для которых есть совпадение в обеих таблицах.

```sql
SELECT users.id, orders.id
FROM users
INNER JOIN orders
    ON orders.user_id = users.id;
```

Пользователи без заказов не попадут в результат.

---

# 67. LEFT JOIN

Возвращает все строки левой таблицы и совпавшие строки правой.

```sql
SELECT users.id, orders.id
FROM users
LEFT JOIN orders
    ON orders.user_id = users.id;
```

Пользователь без заказа всё равно попадёт в результат.

Поля `orders` в таком случае будут `NULL`.

---

# 68. RIGHT JOIN

Логически является зеркальным вариантом `LEFT JOIN`.

```sql
A RIGHT JOIN B
```

означает:

> сохранить все строки из B.

На практике `RIGHT JOIN` часто можно заменить перестановкой таблиц и использованием `LEFT JOIN`, поэтому `LEFT JOIN` встречается чаще.

---

# 69. CROSS JOIN

Создаёт декартово произведение.

Если первая таблица имеет 10 строк, а вторая 20, потенциально получится:

```text
10 × 20 = 200 строк
```

Использовать осторожно.

---

# 70. JOIN + WHERE

Важная тонкость.

Смысл:

```sql
LEFT JOIN orders
    ON orders.user_id = users.id
```

отличается от условий, добавленных в `WHERE`.

Например:

```sql
SELECT users.*
FROM users
LEFT JOIN orders
    ON orders.user_id = users.id
WHERE orders.status = 'paid';
```

Такой `WHERE` исключит строки, где `orders.status` равен `NULL`, поэтому результат может фактически потерять смысл `LEFT JOIN`.

Если нужно сохранить пользователей без заказов, условие часто нужно разместить в `ON`:

```sql
SELECT users.*
FROM users
LEFT JOIN orders
    ON orders.user_id = users.id
   AND orders.status = 'paid';
```

---

# 71. NULL

`NULL` означает отсутствие значения.

Это не:

```text
0
''
false
```

Нельзя писать:

```sql
WHERE name = NULL
```

Нужно:

```sql
WHERE name IS NULL
```

или:

```sql
WHERE name IS NOT NULL
```

---

# 72. Subquery

Подзапрос:

```sql
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);
```

Подзапрос может использоваться для:

- фильтрации;
- вычислений;
- проверки существования;
- получения агрегированных данных.

---

# 73. EXISTS

`EXISTS` проверяет существование хотя бы одной подходящей строки.

```sql
SELECT *
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);
```

Это хороший инструмент для запросов вида:

> «Найди пользователей, у которых есть хотя бы один заказ».

---

# 74. Индексы

Индекс — дополнительная структура данных, которая позволяет базе быстрее находить строки по определённым условиям.

Без подходящего индекса база может выполнить полный scan таблицы.

Например:

```sql
SELECT *
FROM users
WHERE email = 'test@example.com';
```

Индекс:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

может значительно ускорить поиск на большой таблице.

---

# 75. Цена индексов

Индексы не бесплатны.

Они:

- занимают место;
- требуют обновления при `INSERT`;
- требуют обновления при `UPDATE`;
- требуют обновления при `DELETE`.

Поэтому нельзя создавать индекс на каждом столбце без анализа запросов.

---

# 76. Primary Key

Primary Key однозначно идентифицирует строку.

```sql
PRIMARY KEY (id)
```

Обычно:

- уникален;
- не должен быть `NULL`;
- используется для идентификации записи.

---

# 77. Unique Index

Гарантирует уникальность значения или комбинации значений.

```sql
UNIQUE(email)
```

Например, два пользователя не смогут иметь одинаковый email, если это запрещено схемой.

---

# 78. Composite Index

Индекс может включать несколько колонок:

```sql
INDEX(user_id, status, created_at)
```

Порядок колонок важен.

Для B-tree индексов важна идея leftmost prefix.

Индекс:

```text
(user_id, status, created_at)
```

хорошо подходит для запросов, начинающихся с `user_id`.

Например:

```sql
WHERE user_id = 10
```

или:

```sql
WHERE user_id = 10
AND status = 'paid'
```

Запрос только по:

```sql
WHERE status = 'paid'
```

не обязательно сможет эффективно использовать этот индекс как поиск по ведущему столбцу.

---

# 79. Selectivity

Selectivity показывает, насколько хорошо значение разделяет строки.

Например, колонка:

```text
gender
```

может иметь небольшое количество различных значений.

Колонка:

```text
email
```

обычно имеет высокую уникальность.

Индекс по высокоселективному условию часто более полезен для поиска конкретных строк.

---

# 80. B-tree

B-tree — распространённая структура для индексов в реляционных БД.

Она эффективна для:

- равенства;
- диапазонов;
- сортировки в подходящих случаях.

Например:

```sql
WHERE age = 30
```

и:

```sql
WHERE age BETWEEN 20 AND 30
```

могут использовать подходящий B-tree индекс.

---

# 81. Когда индекс может не помочь

Индекс не гарантирует ускорение каждого запроса.

Причины:

- таблица маленькая;
- условие возвращает слишком большую часть таблицы;
- нет подходящего индекса;
- неправильный порядок колонок составного индекса;
- функция применяется к индексируемому столбцу;
- выражение делает индекс менее применимым;
- оптимизатор считает полный scan дешевле.

Например:

```sql
WHERE YEAR(created_at) = 2026
```

может быть хуже для индекса, чем диапазон:

```sql
WHERE created_at >= '2026-01-01'
  AND created_at < '2027-01-01'
```

---

# 82. LIKE и индексы

Запрос:

```sql
WHERE name LIKE 'Alex%'
```

может использовать B-tree индекс в подходящих условиях.

Но:

```sql
WHERE name LIKE '%Alex%'
```

обычный B-tree индекс обычно не может эффективно использовать для поиска по началу строки.

---

# 83. EXPLAIN

`EXPLAIN` показывает план выполнения запроса.

```sql
EXPLAIN
SELECT *
FROM users
WHERE email = 'test@example.com';
```

Полезно смотреть:

```text
type
possible_keys
key
rows
Extra
```

В MySQL важно понимать типы доступа, например:

```text
const
eq_ref
ref
range
ALL
```

`ALL` часто означает полный scan.

`range` означает диапазонный доступ.

`ref` часто означает использование индекса по сравнению с неуникальным индексом.

---

# 84. Query Optimization

Алгоритм анализа медленного запроса:

1. Посмотреть сам SQL.
2. Проверить `EXPLAIN`.
3. Посмотреть используемые индексы.
4. Проверить количество обрабатываемых строк.
5. Проверить `JOIN`.
6. Проверить условия `WHERE`.
7. Проверить сортировку и группировку.
8. Проверить, не выбирается ли лишнее количество данных.
9. Проверить наличие N+1 на уровне приложения.
10. После изменения снова проверить план.

---

# 85. Normalization

Нормализация уменьшает дублирование и аномалии данных.

Основная идея:

```text
users
orders
products
```

вместо хранения огромного количества повторяющихся данных в одной таблице.

Нужно знать на базовом уровне:

- 1NF;
- 2NF;
- 3NF.

Необходимо также понимать, что иногда осознанная денормализация используется ради производительности.

---

# 86. Foreign Key

Foreign Key устанавливает связь между таблицами.

```sql
FOREIGN KEY (user_id)
REFERENCES users(id)
```

Помогает поддерживать ссылочную целостность.

Например, нельзя создать заказ для несуществующего пользователя, если ограничения схемы запрещают это.

---

# 87. Transactions

Transaction объединяет несколько операций в одну логическую единицу.

Пример:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

Если вторая операция не может быть выполнена, приложение может выполнить:

```sql
ROLLBACK;
```

---

# 88. ACID

ACID:

```text
A — Atomicity
C — Consistency
I — Isolation
D — Durability
```

## Atomicity

Все операции транзакции выполняются целиком или отменяются.

## Consistency

После транзакции база остаётся в корректном состоянии с точки зрения её ограничений.

## Isolation

Параллельные транзакции не должны неконтролируемо видеть промежуточные состояния друг друга.

## Durability

После успешного `COMMIT` изменения должны сохраняться даже при сбое системы, в пределах гарантий конкретной СУБД.

---

# 89. Isolation Levels

Основные уровни:

```text
READ UNCOMMITTED
READ COMMITTED
REPEATABLE READ
SERIALIZABLE
```

Чем выше изоляция, тем строже требования к видимости параллельных изменений, но потенциально выше стоимость блокировок и конкуренции.

---

# 90. Dirty Read

Одна транзакция читает изменения другой транзакции, которые ещё не были закоммичены.

Если первая транзакция сделает rollback, прочитанное значение никогда не станет постоянным.

---

# 91. Non-Repeatable Read

Одна транзакция дважды читает одну строку и получает разные значения, потому что другая транзакция изменила и зафиксировала эту строку между чтениями.

---

# 92. Phantom Read

Одна транзакция повторяет запрос диапазона и получает дополнительные или исчезнувшие строки из-за изменений другой транзакции.

---

# 93. Locks

База может блокировать строки или другие ресурсы, чтобы обеспечить корректность конкурентных операций.

В MySQL/InnoDB можно встретить:

```sql
SELECT ...
FOR UPDATE;
```

Такой запрос используется в транзакции для блокировки подходящих строк с целью последующего изменения.

---

# 94. Deadlock

Deadlock возникает, когда транзакции ждут ресурсы друг друга.

Пример:

```text
Transaction A:
lock row 1
wait row 2

Transaction B:
lock row 2
wait row 1
```

Обе транзакции не могут продолжить.

База обычно обнаруживает deadlock и прерывает одну из транзакций.

Способы уменьшения риска:

- одинаковый порядок блокировки;
- короткие транзакции;
- минимизация времени удержания lock;
- retry на уровне приложения.

---

# 95. Что отвечать на вопрос «Как оптимизировать SQL?»

Хороший ответ должен быть последовательным:

> Сначала я воспроизведу медленный запрос и посмотрю его `EXPLAIN`. Затем проверю, какие индексы используются, сколько строк обрабатывается, как построены JOIN и фильтры. После этого проверю составные индексы, порядок колонок, сортировку и группировку. Затем сравню новый план со старым и измерю результат.

Такой ответ показывает процесс мышления, а не просто знание слова «индекс».

---

# 96. Как объяснять техническое решение

На собеседовании полезно использовать структуру:

```text
1. Проблема
2. Решение
3. Почему выбрал его
4. Альтернативы
5. Минусы
6. Результат
```

Пример с Queue:

> Нужно было отправлять email после действия пользователя.

> Я вынес отправку email в Laravel Queue.

> Причина — отправка письма не должна блокировать HTTP-запрос.

> Альтернативой была синхронная отправка, но она увеличивала время ответа.

> При использовании очереди появляется необходимость контролировать failed jobs и повторные попытки.

> В результате пользователь быстрее получает HTTP-ответ, а тяжёлая операция выполняется worker'ом.

---

# 97. Как рассказывать о своём проекте

Используй структуру:

```text
Что за проект?
↓
Какая была моя роль?
↓
Какие задачи решал?
↓
Какая архитектура?
↓
Какие технологии?
↓
Какие сложные проблемы?
↓
Какие решения принимал лично?
↓
Почему выбрал эти решения?
↓
Какие компромиссы были?
↓
Что бы улучшил сейчас?
```

Особенно важно говорить:

> «Я выбрал X, потому что Y».

А не просто:

> «Мы использовали X».

---

# 98. Типичные вопросы по PHP Core

Нужно уметь ответить своими словами:

1. Чем `==` отличается от `===`?
2. Что такое type juggling?
3. Что делает `strict_types`?
4. Что такое `mixed`?
5. Что такое union type?
6. Что такое nullable type?
7. Что такое `void`?
8. Что такое `never`?
9. Что такое closure?
10. Чем closure отличается от arrow function?
11. Что такое reference?
12. Что такое copy-on-write?
13. Как PHP управляет памятью?
14. Что такое garbage collection?
15. Как работает `foreach`?
16. Чем `array_map` отличается от `array_filter`?
17. Чем `array_filter` отличается от `foreach`?
18. Почему после `array_filter` могут остаться старые ключи?
19. Чем `array_merge` отличается от `array_replace`?
20. Почему нужно использовать `=== false` после `array_search`?

---

# 99. Типичные вопросы по ООП

1. Что такое encapsulation?
2. Что такое inheritance?
3. Что такое polymorphism?
4. Что такое abstraction?
5. Interface vs abstract class?
6. Когда использовать composition?
7. Почему composition часто лучше inheritance?
8. Что такое trait?
9. Чем trait отличается от inheritance?
10. Что такое dependency injection?
11. Что такое dependency inversion?
12. Что такое SOLID?
13. Приведи пример нарушения SRP.
14. Приведи пример нарушения OCP.
15. Объясни LSP на примере.
16. Что такое ISP?
17. Что такое DIP?
18. Как SOLID связан с Laravel?

---

# 100. Типичные вопросы по SQL

1. INNER JOIN vs LEFT JOIN?
2. Когда использовать LEFT JOIN?
3. Что произойдёт с пользователем без заказа?
4. Чем WHERE отличается от HAVING?
5. Что такое NULL?
6. Как проверить NULL?
7. Что такое индекс?
8. Зачем нужен индекс?
9. Почему индекс может замедлять INSERT?
10. Что такое composite index?
11. Почему порядок колонок в composite index важен?
12. Что такое selectivity?
13. Что такое B-tree?
14. Почему `LIKE '%text%'` плохо использует B-tree?
15. Что такое EXPLAIN?
16. Что означает `type = ALL`?
17. Что такое primary key?
18. Что такое foreign key?
19. Что такое unique index?
20. Что такое transaction?
21. Что такое ACID?
22. Что такое isolation level?
23. Что такое dirty read?
24. Что такое non-repeatable read?
25. Что такое phantom read?
26. Что такое deadlock?
27. Как уменьшить вероятность deadlock?
28. Как искать причину медленного SQL?

---

# 101. Минимальный уровень перед следующим техническим собеседованием

Перед собеседованием нужно не просто прочитать этот документ.

Для каждой темы нужно уметь сделать три вещи:

### Уровень 1 — объяснить

Например:

> Что такое Dependency Injection?

### Уровень 2 — написать

Например:

```php
class UserService
{
    public function __construct(
        private UserRepositoryInterface $repository
    ) {
    }
}
```

### Уровень 3 — применить

Например:

> Почему здесь лучше зависеть от интерфейса, а не от `EloquentUserRepository`?

И объяснить:

> Потому что сервису нужен контракт, а не конкретная реализация. Это уменьшает связанность и позволяет заменить реализацию или использовать mock/fake в тестах.

---

# 102. Приоритет подготовки

## Критический приоритет

```text
PHP types
strict_types
mixed
type juggling
arrays
array_map
array_filter
array_reduce
OOP
interface
abstract class
composition
SOLID
Dependency Injection
JOIN
INNER JOIN
LEFT JOIN
indexes
composite indexes
EXPLAIN
transactions
ACID
```

## Второй приоритет

```text
copy-on-write
references
garbage collection
closures
traits
design patterns
subqueries
EXISTS
isolation levels
locks
deadlocks
normalization
```

## Третий приоритет

```text
never
Decorator
Singleton
тонкости PHP internals
сложные планы SQL
глубокая оптимизация БД
```

---

# 103. Главная задача подготовки

Цель — не выучить определения.

На собеседовании нужно демонстрировать цепочку:

```text
Проблема
   ↓
Анализ
   ↓
Варианты
   ↓
Выбор
   ↓
Почему этот вариант
   ↓
Компромиссы
   ↓
Результат
```

Именно поэтому после изучения каждой темы полезно отвечать на вопрос:

> «Представь, что это реальная задача на проекте. Где ты применишь это и почему?»

Это особенно важно для SOLID, паттернов, индексов, JOIN и транзакций.
