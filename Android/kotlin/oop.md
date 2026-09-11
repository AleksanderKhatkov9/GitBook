# 4. ООП в Kotlin

> Источник: [Metanit — главы 4–6](https://metanit.com/kotlin/tutorial/) · [Classes](https://kotlinlang.org/docs/classes.html)

## Классы и свойства

```kotlin
class User(val id: Int, var name: String) {
    fun greet() = "Hi, $name"
}
```

Первичный конструктор в заголовке класса — обычная практика. Видимость: `public` (по умолчанию), `internal`, `protected`, `private`.

## Наследование и интерфейсы

Классы по умолчанию `final`. Для наследования — `open` / `abstract`:

```kotlin
open class Animal {
    open fun sound() = "?"
}

class Dog : Animal() {
    override fun sound() = "woof"
}

interface Clickable {
    fun click()
}
```

## Data class

```kotlin
data class Point(val x: Int, val y: Int)
```

Автоматически: `equals` / `hashCode` / `toString` / `copy` / componentN. Идеально для моделей UI и DTO.

## Enum, object, companion

```kotlin
enum class Status { Idle, Loading, Error }

object AppConfig {
    const val NAME = "MyApp"
}

class Repo {
    companion object {
        fun create() = Repo()
    }
}
```

## Null-safety

```kotlin
var city: String = "Minsk"
var nickname: String? = null

val len = nickname?.length      // Int?
val safe = nickname ?: "anon"   // Elvis
```

`!!` форсирует non-null — избегайте в продакшен-коде. На Android это главный способ снизить NPE.

## Extensions и scope-функции

```kotlin
fun String.words() = split(" ")

val user = User(1, "Ann").apply {
    name = "Anna"
}
```

`let`, `run`, `with`, `apply`, `also` — см. Metanit гл. 6 и [Scope functions](https://kotlinlang.org/docs/scope-functions.html).

## Дальше

[Коллекции](collections.md) · [Корутины](coroutines.md)
