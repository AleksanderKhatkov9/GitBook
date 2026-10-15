# 9. Сопоставление с образцом

> Источники: [Учебник — match](https://docs.python.org/3/tutorial/controlflow.html#match-statements) · [PEP 634](https://peps.python.org/pep-0634/) · [Metanit — глава 8](https://metanit.com/python/tutorial/)

Конструкция `match` есть с **Python 3.10**. Она сравнивает одно значение с набором образцов сверху вниз и выполняет первый подходящий блок.

Это не оператор `switch` по константам. Образец может разобрать последовательность, словарь или объект и сразу связать куски с именами.

## Константы

```python
def label(code):
    match code:
        case 200:
            return "ok"
        case 404:
            return "нет"
        case 500 | 502 | 503:
            return "сбой сервера"
        case _:
            return "другое"
```

`|` — «или» внутри одного образца. `_` ни с чем не связывается и подходит чему угодно. Его ставят последним: нижние ветки после него недостижимы.

Имена в образце — это **присваивание**, а не сравнение с внешней переменной. `case 200` сравнивает с числом, потому что литерал. `case status` поймает любое значение и запишет его в `status`.

## Последовательности

Список и кортеж разбираются одним и тем же образцом последовательности.

```python
def point(value):
    match value:
        case (0, 0):
            return "начало"
        case (0, y):
            return "на оси Y: " + str(y)
        case (x, 0):
            return "на оси X: " + str(x)
        case (x, y):
            return str(x) + ", " + str(y)
        case _:
            return "не точка"
```

Звёздочка забирает хвост, как в распаковке: `case [first, *rest]`.

## Словари

Образец словаря требует перечисленные ключи. Лишние ключи не мешают.

```python
def city_of(user):
    match user:
        case {"name": name, "city": city}:
            return name + " из " + city
        case {"name": name}:
            return name
        case _:
            return "пусто"
```

Чтобы забрать остальные пары, пишут `case {"name": name, **rest}`.

## Классы

Образец класса вызывает сопоставление по атрибутам. Порядок имён можно задать через `__match_args__`.

```python
class Point:
    __match_args__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

def describe(p):
    match p:
        case Point(0, 0):
            return "начало"
        case Point(x, y):
            return f"{x}, {y}"
        case _:
            return "не точка"
```

Без `__match_args__` остаются ключевые поля: `case Point(x=0, y=y)`.

## Ограничение и псевдоним

Условие после образца — **guard**. Образец сначала должен совпасть, потом проверяется `if`.

```python
match score:
    case n if n >= 90:
        print("отлично")
    case n if n >= 60:
        print("зачёт")
    case _:
        print("ещё раз")
```

`as` даёт имя всему куску, который уже совпал:

```python
match value:
    case (x, y) as pair if x == y:
        print(pair)
```

`pair` — исходная пара целиком, `x` и `y` — её элементы.

## Когда хватает if

Две-три проверки одного числа проще читаются через `if` / `elif`. `match` окупается, когда значение — структура, и вы одновременно проверяете форму и достаёте поля. Для всего остального отдельная ветка `if` короче.
