# Android

Документация по разработке под Android: приложения на **Kotlin** и **Java**, сборка в Android Studio / Gradle и обзор [AOSP](https://source.android.com/docs/setup/about?hl=ru).

> Официальный хаб: [Develop for Android](https://developer.android.com/develop)

## Разделы

| Раздел | Описание |
|--------|----------|
| [Установка](installation.md) | Android Studio, SDK, эмулятор |
| [Сборка проекта](build.md) | Gradle, APK / AAB, debug и release |
| [AOSP](aosp.md) | Android Open Source Project: что это и как собирать ОС |
| [Kotlin](kotlin/README.md) | Язык Kotlin и разработка Android (рекомендуемый путь) |
| [Java](java/README.md) | Классическая разработка Android на Java |

## Два пути разработки

| Тип разработчика | Что делать | Документация |
|------------------|------------|--------------|
| **Сторонние приложения (3p)** | SDK / NDK, публикация в Google Play | [developer.android.com](https://developer.android.com/develop) |
| **Платформа / OEM (AOSP)** | Исходники ОС, порты на устройства | [source.android.com](https://source.android.com/docs/setup/about?hl=ru) |

Большинству приложений достаточно SDK. AOSP нужен, если вы собираете или кастомизируете саму ОС.

## Kotlin-first

С Google I/O 2019 Android — **Kotlin-first**: больше половины профессиональных разработчиков используют Kotlin как основной язык. Jetpack Compose и современные Jetpack-библиотеки ориентированы на Kotlin.

Подробнее: [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html)

## Быстрый старт (приложение)

1. Установите [Android Studio](installation.md)
2. Создайте проект (**Empty Activity**, язык Kotlin)
3. Запустите на эмуляторе или устройстве (`Run`)
4. Соберите APK / AAB — см. [Сборка проекта](build.md)

```bash
# из корня проекта Android
./gradlew assembleDebug          # Linux / macOS
gradlew.bat assembleDebug        # Windows
```

## Карта источников

| Источник | Назначение |
|----------|------------|
| [developer.android.com/develop](https://developer.android.com/develop) | Guides, samples, API, Compose, устройства |
| [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html) | Почему Kotlin, Multiplatform, Jetpack |
| [Metanit — Kotlin](https://metanit.com/kotlin/tutorial/) | Руководство по языку Kotlin (RU) |
| [Metanit — Android на Java](https://metanit.com/java/android/) | Классический UI, Activity, SQLite (RU) |
| [AOSP — обзор](https://source.android.com/docs/setup/about?hl=ru) | Исходники ОС, совместимость, сборка платформы |

## Структура папки

```
Android/
├── README.md           ← эта страница
├── installation.md     ← Android Studio и SDK
├── build.md            ← сборка приложения
├── aosp.md             ← AOSP
├── kotlin/             ← Kotlin + Android
└── java/               ← Java + Android
```
