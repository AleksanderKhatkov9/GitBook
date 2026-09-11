# Android на Kotlin

**Kotlin** — основной язык Android с 2019 года. Меньше кода, меньше типичных крашей, нативная поддержка в Jetpack и Compose, совместимость с Java.

> [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html) · [Metanit — Kotlin](https://metanit.com/kotlin/tutorial/) · [Develop for Android](https://developer.android.com/develop)

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Kotlin-first, Studio, первый экран |
| [2. Основы языка](basics.md) | Переменные, типы, if / when, циклы |
| [3. Функции](functions.md) | Параметры, лямбды, higher-order |
| [4. ООП](oop.md) | Классы, data class, null-safety |
| [5. Коллекции](collections.md) | List / Set / Map, последовательности |
| [6. Корутины](coroutines.md) | async / await, диспетчеры, Flow |
| [7. Kotlin в Android](android.md) | Activity, Compose, Jetpack, сборка |

## Зачем Kotlin для Android

| Преимущество | Суть |
|--------------|------|
| Меньше кода | null-safety, data class, extensions |
| Меньше крашей | по данным Google — заметно ниже риск crash |
| Jetpack | Compose, KTX, корутины в библиотеках |
| Multiplatform | общая логика с iOS / backend / web |
| Java interop | можно смешивать Kotlin и Java в одном модуле |

Статистика и мотивация: [kotlinlang.org — Android overview](https://kotlinlang.org/docs/android-overview.html)

## Карта Metanit (язык)

| Главы | Тема |
|-------|------|
| 1–2 | Введение, основы |
| 3 | Функции и лямбды |
| 4–6 | ООП, generics, null, scope-функции |
| 7 | Коллекции |
| 8–9 | Корутины и Flow |

Полный курс: [metanit.com/kotlin/tutorial](https://metanit.com/kotlin/tutorial/)

## Требования

- [Android Studio](../installation.md)
- Желательно базовый опыт ООП (Java / другой язык)

## Сборка

```bash
gradlew.bat assembleDebug
```

Подробнее: [Сборка проекта](../build.md)

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [Java](../java/README.md) | View-система и легаси на Java |
| [AOSP](../aosp.md) | Сборка ОС, не приложений |
