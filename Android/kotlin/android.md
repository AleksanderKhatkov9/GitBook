# 7. Kotlin в Android

> Источники: [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html) · [Develop for Android](https://developer.android.com/develop) · [Сборка](../build.md)

## Стек современного приложения

| Слой | Технологии |
|------|------------|
| UI | Jetpack Compose (рекомендуется) или Views + XML |
| Навигация | Navigation Compose / Navigation Component |
| Состояние | ViewModel, `StateFlow` |
| Данные | Room, DataStore, Retrofit / Ktor |
| Фон | WorkManager, корутины |
| DI | Hilt (часто) |

Официальные центры: [UI](https://developer.android.com/develop/ui) · [Architecture](https://developer.android.com/topic/architecture) · [Background work](https://developer.android.com/guide/background)

## Compose (минимум)

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name")
}
```

Compose — declarative UI на Kotlin; не требует XML-layout. Обучение: [Compose for UI](https://developer.android.com/develop/ui/compose).

## KTX

Android KTX добавляет extension-функции к платформенным API (компактнее код с корутинами, bundles, sqlite и т.д.). Подключайте нужные артефакты `androidx.*:*-ktx`.

## Multiplatform

Kotlin Multiplatform позволяет делить логику между Android, iOS, backend, web. Compose Multiplatform — общий UI. Старт: [Create an app with shared logic](https://kotlinlang.org/docs/multiplatform-mobile-getting-started.html).

## Сборка и запуск

```bash
# Windows
gradlew.bat assembleDebug
gradlew.bat installDebug

# подписание и Play — AAB
gradlew.bat bundleRelease
```

Подробно: [Сборка проекта](../build.md) · [Установка](../installation.md)

## Чеклист первого приложения

- [ ] Проект на Kotlin в Android Studio
- [ ] Эмулятор / устройство через `adb devices`
- [ ] UI: Compose *или* XML + Activity
- [ ] Сеть/БД не на Main-потоке (корутины)
- [ ] `assembleDebug` проходит локально
- [ ] Для магазина: `bundleRelease` + подпись

## Java-часть проекта

Смешанные модули допустимы. Для View-системы и учебных примеров на Java см. [Android на Java](../java/README.md).

## Полезные ссылки

- [developer.android.com/develop](https://developer.android.com/develop)
- [Samples](https://developer.android.com/samples)
- [Jetpack libraries](https://developer.android.com/jetpack)
- [Metanit Kotlin](https://metanit.com/kotlin/tutorial/)
