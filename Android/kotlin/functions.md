# 3. Функции

> Источник: [Metanit — глава 3](https://metanit.com/kotlin/tutorial/) · [Functions](https://kotlinlang.org/docs/functions.html)

## Объявление

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}

fun sum2(a: Int, b: Int) = a + b   // однострочная
```

Параметры по умолчанию и именованные аргументы:

```kotlin
fun greet(name: String = "Guest") = "Hi, $name"
greet(name = "Bob")
```

`vararg` — переменное число аргументов:

```kotlin
fun log(vararg messages: String) {
    messages.forEach { println(it) }
}
```

## Функции как значения

```kotlin
val op: (Int, Int) -> Int = { x, y -> x + y }
fun apply(a: Int, b: Int, f: (Int, Int) -> Int) = f(a, b)
apply(2, 3, op)
```

## Лямбды

```kotlin
val numbers = listOf(1, 2, 3, 4)
val even = numbers.filter { it % 2 == 0 }
val doubled = numbers.map { it * 2 }
```

Последняя лямбда может выноситься за скобки — идиома Kotlin и основа DSL (Compose, Gradle Kotlin DSL).

## Замыкания

Лямбда захватывает переменные из внешней области — удобно в колбэках UI, но следите за утечками `Activity` / `Fragment` (используйте lifecycle-aware API).

## На Android

- Обработчики: `button.setOnClickListener { ... }`
- Коллекции и Flow: трансформации через `map` / `filter`
- Корутины: `suspend`-функции — см. [Корутины](coroutines.md)
