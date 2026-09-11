# Сборка проекта

> Источники: [Configure your build](https://developer.android.com/build) · [Build your app](https://developer.android.com/studio/build) · [App bundles](https://developer.android.com/guide/app-bundle)

Сборка Android-приложения идёт через **Gradle** и Android Gradle Plugin (AGP). В IDE это кнопка **Build**, в терминале — `./gradlew` / `gradlew.bat`.

## Типы артефактов

| Артефакт | Расширение | Когда |
|----------|------------|--------|
| **APK** | `.apk` | Отладка, прямая установка на устройство |
| **Android App Bundle** | `.aab` | Публикация в [Google Play](https://developer.android.com/guide/app-bundle) |

Play генерирует оптимизированные APK из AAB для разных устройств.

## Варианты сборки (build types)

| Тип | Назначение |
|-----|------------|
| **debug** | Подпись debug-ключом, отладка, быстрее |
| **release** | Оптимизации (R8/ProGuard), подпись release-ключом |

Конфигурация — в `app/build.gradle.kts` (или `.gradle`):

```kotlin
android {
    namespace = "com.example.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

## Сборка из Android Studio

| Действие | Меню |
|----------|-------|
| Собрать проект | **Build → Make Project** |
| APK (debug) | **Build → Build Bundle(s) / APK(s) → Build APK(s)** |
| AAB (release) | **Build → Build Bundle(s) / APK(s) → Build Bundle(s)** |
| Подписанный release | **Build → Generate Signed App Bundle or APK** |

Готовые файлы:

```
app/build/outputs/apk/debug/app-debug.apk
app/build/outputs/bundle/release/app-release.aab
```

## Сборка из командной строки

Из корня проекта (рядом с `gradlew`):

```bash
# Windows
gradlew.bat assembleDebug
gradlew.bat assembleRelease
gradlew.bat bundleRelease

# Linux / macOS
./gradlew assembleDebug
./gradlew assembleRelease
./gradlew bundleRelease
```

Полезные задачи:

```bash
gradlew.bat tasks                 # список задач
gradlew.bat clean                 # очистка
gradlew.bat installDebug          # установить debug на подключённое устройство
gradlew.bat :app:assembleDebug    # модуль app явно
```

## Установка APK на устройство

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

`-r` — переустановка с сохранением данных.

## Подпись release

1. Создайте keystore (**Build → Generate Signed…** или `keytool`)
2. Не коммитьте keystore и пароли в git
3. Для CI используйте переменные окружения / секреты

Пример хранения свойств (локально, не в репозитории):

```properties
# keystore.properties (в .gitignore)
storeFile=...
storePassword=...
keyAlias=...
keyPassword=...
```

## Проверка перед релизом

- [ ] `targetSdk` актуален под требования Play
- [ ] Версии `versionCode` / `versionName` увеличены
- [ ] Release подписан правильным ключом
- [ ] Прогнаны тесты: **Build → Run Tests** / `gradlew.bat test`
- [ ] Для Play загружается **AAB**, не сырой debug APK

Подробнее: [Test your app](https://developer.android.com/training/testing) · [Play Console](https://play.google.com/console)

## Сборка платформы (не приложения)

Если нужна сборка самой ОС Android из исходников — это другой процесс (repo, lunch, m). См. [AOSP](aosp.md).
