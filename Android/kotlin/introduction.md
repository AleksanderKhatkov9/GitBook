# 1. Введение

> Источники: [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html) · [Metanit — гл. 1](https://metanit.com/kotlin/tutorial/) · [Hello world](https://developer.android.com/develop)

## Kotlin-first

Google рекомендует Kotlin для новых Android-приложений. Android Studio создаёт Kotlin-проекты по умолчанию; Jetpack Compose пишется на Kotlin DSL UI.

Можно постепенно переносить Java-код: языки совместимы на уровне байткода JVM / ART.

## Первая программа (консоль)

В IntelliJ / онлайн-playground:

```kotlin
fun main() {
    println("Hello, Kotlin")
}
```

Metanit: установка JDK + IntelliJ — удобно учить язык отдельно от Android. Для мобильной разработки достаточно Android Studio.

## Первый Android-проект

1. **New Project → Empty Activity** (или Empty Compose Activity)
2. Language: **Kotlin**
3. **Run ▶** на эмуляторе

Пример Activity (Views):

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<TextView>(R.id.title).text = "Hello, Kotlin"
    }
}
```

Пример Compose:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text("Hello, Compose")
        }
    }
}
```

## Чему учиться дальше

1. [Основы языка](basics.md) — синтаксис
2. [Функции](functions.md) и [ООП](oop.md)
3. [Корутины](coroutines.md) — асинхронность на Android
4. [Kotlin в Android](android.md) — Jetpack, сборка, UI

Официальный трек: [Create your first app](https://developer.android.com/courses) · [Compose for UI](https://developer.android.com/develop/ui/compose)
