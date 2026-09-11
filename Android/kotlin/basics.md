# 2. Основы языка

> Источник: [Metanit — глава 2](https://metanit.com/kotlin/tutorial/) · [Kotlin docs — Basic syntax](https://kotlinlang.org/docs/basic-syntax.html)

## Переменные

```kotlin
val name = "Anna"   // неизменяемая ссылка
var age = 20        // изменяемая
age = 21
```

Тип выводится компилятором или указывается явно: `val n: Int = 1`.

## Типы

Числа (`Int`, `Long`, `Double`, …), `Boolean`, `Char`, `String`. Массивы: `arrayOf(1, 2, 3)` — на практике чаще коллекции (см. [Коллекции](collections.md)).

## Ввод / вывод (консоль)

```kotlin
println("Hello")
val line = readln()
```

В Android UI вывод — через виджеты / логи (`Log.d`), не `println` для пользователя.

## Операции и условия

```kotlin
val max = if (a > b) a else b   // if — выражение

when (x) {
    1 -> println("one")
    in 2..5 -> println("few")
    else -> println("other")
}
```

## Циклы и диапазоны

```kotlin
for (i in 1..5) { }          // 1..5 включительно
for (i in 1 until 5) { }     // 1..4
for (i in 5 downTo 1) { }
while (condition) { }
```

## Массивы (кратко)

```kotlin
val nums = arrayOf(1, 2, 3)
println(nums[0])
```

Для списков данных в приложениях используйте `List` / `MutableList`.

## Дальше

[Функции](functions.md) · [ООП и null-safety](oop.md)
