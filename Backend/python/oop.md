# 4. Классы

> Источники: [Учебник — классы](https://docs.python.org/3/tutorial/classes.html) · [Справочник — модель данных](https://docs.python.org/3/reference/datamodel.html) · [Metanit — глава 3](https://metanit.com/python/tutorial/)

## Класс и объект

Класс описывает данные и функции, которые с ними работают. Объект — конкретный экземпляр.

```python
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "Привет, " + self.name

anna = User("Анна")
anna.greet()
```

`__init__` вызывается сразу после создания объекта. Первый параметр метода — сам объект. Имя `self` — договорённость, не ключевое слово. При вызове `anna.greet()` интерпретатор подставляет `anna` в `self` сам.

Атрибут, записанный через `self`, принадлежит **этому** объекту. Его можно добавить и снаружи: `anna.city = "Минск"`. Отдельного списка полей, как в Java, язык не требует.

## Инкапсуляция

Жёстких `private` / `public` нет. Договорённости:

| Имя | Смысл |
|-----|--------|
| `name` | Часть интерфейса |
| `_name` | Внутренняя деталь, снаружи не трогать |
| `__name` | Имя переписывается в `_User__name`, случайно не задеть из подкласса |

Одно подчёркивание доступ не закрывает: это пометка для читателя. Два подчёркивания меняют имя атрибута, поэтому `user.__name` снаружи класса не находится — сработает только `_User__name`. Это защита от случайного совпадения в подклассе, а не секретность.

Свойство считает значение при чтении и может проверить его при записи:

```python
class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("баланс не бывает отрицательным")
        self._balance = value
```

Снаружи это выглядит как поле: `account.balance = 10`.

## Наследование

Подкласс получает атрибуты базового и может заменить метод.

```python
class Admin(User):
    def __init__(self, name, level):
        super().__init__(name)
        self.level = level

    def greet(self):
        return super().greet() + ", уровень " + str(self.level)
```

`super()` идёт к следующему классу в цепочке **MRO** (порядок разрешения методов), а не просто «к родителю, которого написали первым». При одном родителе это и есть базовый класс.

Несколько родителей перечисляют в скобках: `class C(A, B)`. Порядок в скобках задаёт, чей метод возьмут при совпадении имён. Проверка: `isinstance(admin, User)` истинна и для подкласса.

## Атрибуты класса и методы

Атрибут, записанный в теле класса, общий для всех объектов, пока его не перекрыли у конкретного экземпляра.

```python
class Point:
    origin = (0, 0)

    def __init__(self, x, y):
        self.x = x
        self.y = y

    @classmethod
    def zero(cls):
        return cls(0, 0)

    @staticmethod
    def distance(a, b):
        return ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5
```

| Метод | Первый аргумент | Когда |
|-------|-----------------|--------|
| обычный | объект (`self`) | Нужны данные этого экземпляра |
| `@classmethod` | класс (`cls`) | Фабрика, которая должна уважать подкласс |
| `@staticmethod` | нет | Функция логически рядом с классом, но объект ей не нужен |

## Строковое представление

```python
class User:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "User(" + repr(self.name) + ")"

    def __str__(self):
        return self.name
```

`__repr__` — для отладки, его показывает REPL. `__str__` — для `print` и `str()`. Если определён только `__repr__`, `print` возьмёт его. Обратное неверно: без `__repr__` отладка покажет адрес объекта.

Все классы неявно наследуют `object`.

## Операторы

`+`, `==`, `len` на своих объектах — это методы со специальными именами.

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __add__(self, other):
        return Money(self.amount + other.amount)

    def __eq__(self, other):
        return self.amount == other.amount
```

`Money(2) + Money(3)` вызывает `__add__`. Полный список имён — в [справочнике модели данных](https://docs.python.org/3/reference/datamodel.html#special-method-names).

## Абстрактный класс

Метод без реализации в базе заставляют потомка определить через модуль `abc`:

```python
from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, item):
        pass

class MemoryStorage(Storage):
    def save(self, item):
        print(item)
```

`Storage()` сам по себе создать нельзя: нечем заполнить `save`. Имеет смысл, когда несколько хранилищ должны отвечать на один и тот же вызов.

## Дальше

[Исключения](errors.md) — как ловить и возбуждать ошибки.
