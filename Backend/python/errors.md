# 5. Исключения

> Источники: [Учебник — ошибки](https://docs.python.org/3/tutorial/errors.html) · [Встроенные исключения](https://docs.python.org/3/library/exceptions.html) · [Metanit — глава 4](https://metanit.com/python/tutorial/)

## Два вида ошибок

**Синтаксическая** ломает разбор файла: не закрыта скобка, сбит отступ. До выполнения код не доходит.

**Исключение** возникает уже во время работы: деление на ноль, нет такого ключа, файл не открылся. Пока его не поймали, оно поднимается по стеку вызовов и завершает программу с трассировкой.

Частые типы:

| Исключение | Когда |
|------------|--------|
| `ValueError` | Верный тип, неверное значение: `int("x")` |
| `TypeError` | Операция не для этого типа: `"a" + 1` |
| `KeyError` | Ключа нет в словаре |
| `IndexError` | Индекс за границей списка |
| `ZeroDivisionError` | Деление на ноль |
| `FileNotFoundError` | Файла нет |

`KeyboardInterrupt` и `SystemExit` наследуют `BaseException`, а не `Exception`. Голый `except:` ловит и их. Обычно пишут `except Exception` — прерывание с клавиатуры тогда по-прежнему останавливает программу.

## try / except / else / finally

```python
try:
    n = int(text)
    print(10 / n)
except ValueError:
    print("это не число")
except ZeroDivisionError:
    print("на ноль делить нельзя")
else:
    print("без ошибок")
finally:
    print("выполняется всегда")
```

| Ветка | Когда выполняется |
|-------|-------------------|
| `except` | В `try` поднялось подходящее исключение |
| `else` | `try` прошёл без исключения |
| `finally` | В любом случае: и после успеха, и после ошибки, и после `return` |

Несколько типов в одном `except` пишут кортежем: `except (ValueError, TypeError)`. В переменную исключение попадает так: `except ValueError as exc`. У объекта есть текст: `str(exc)`.

Порядок веток важен. `except Exception` выше `except ValueError` перехватит всё раньше, и узкая ветка станет мёртвой.

## raise

```python
if n < 0:
    raise ValueError("число должно быть >= 0")
```

Голый `raise` внутри `except` пробрасывает пойманное исключение дальше.

Своя ошибка — подкласс `Exception`, не голого `BaseException`:

```python
class AppError(Exception):
    pass

raise AppError("не хватает данных")
```

Цепочку причин сохраняют через `raise NewError("сбой") from exc`. В трассировке видно и новую ошибку, и исходную.

## with

Для файла и замка нужен гарантированный выход, даже если посередине упало исключение. Менеджер контекста делает это сам:

```python
with open("notes.txt", encoding="utf-8") as fh:
    text = fh.read()
# здесь файл уже закрыт
```

`open` возвращает объект с методами `__enter__` и `__exit__`. `finally` с ручным `close` для того же сценария длиннее и легче забыть.

## Дальше

[Коллекции](collections.md) — списки, кортежи, словари, множества.
