# Установка

> Источники: [Get Android Studio](https://developer.android.com/studio) · [Metanit — установка](https://metanit.com/java/android/1.1.php)

## Что нужно

| Компонент | Назначение |
|-----------|------------|
| **Android Studio** | IDE: редактор, эмулятор, Profiler, Gemini |
| **Android SDK** | Платформы, build-tools, platform-tools (`adb`) |
| **JDK** | Обычно поставляется с Android Studio (JetBrains Runtime) |
| **Эмулятор или устройство** | Запуск и отладка приложения |

## Установка Android Studio

1. Скачайте установщик: [developer.android.com/studio](https://developer.android.com/studio)
2. Запустите установщик (Windows / macOS / Linux)
3. При первом запуске выберите **Standard** — скачаются SDK, эмулятор и рекомендуемые пакеты
4. Дождитесь завершения Setup Wizard

Проверка `adb`:

```bash
adb version
```

`adb` обычно лежит в:

```
%LOCALAPPDATA%\Android\Sdk\platform-tools   # Windows
~/Library/Android/sdk/platform-tools        # macOS
~/Android/Sdk/platform-tools                # Linux
```

Добавьте `platform-tools` в `PATH`, если команды не находятся.

## SDK Manager

В Android Studio: **Tools → SDK Manager**.

Рекомендуемый минимум:

- **Android SDK Platform** — актуальный API Level (например, API 35+)
- **Android SDK Build-Tools**
- **Android Emulator**
- **Android SDK Platform-Tools**

Путь SDK задаётся в **Settings → Languages & Frameworks → Android SDK**.

## Эмулятор (AVD)

**Tools → Device Manager → Create Device**

1. Выберите устройство (Phone, например Pixel)
2. Скачайте system image (Google APIs / Google Play)
3. Запустите AVD и проверьте, что устройство видно:

```bash
adb devices
```

## Физическое устройство

1. На телефоне: **Параметры → О телефоне** — 7 раз нажмите «Номер сборки» (режим разработчика)
2. Включите **Отладка по USB**
3. Подключите USB и разрешите отладку на экране устройства
4. Проверьте `adb devices`

## Первый проект

1. **File → New → New Project**
2. Шаблон **Empty Activity** (или Empty Compose Activity)
3. Язык: **Kotlin** (предпочтительно) или **Java**
4. Minimum SDK — по требованиям приложения
5. **Finish** → дождитесь синхронизации Gradle
6. **Run ▶** — выбор эмулятора / устройства

Подробнее по Java-стеку: [Java — начало работы](java/introduction.md)  
Подробнее по Kotlin: [Kotlin — введение](kotlin/introduction.md)

## Полезные ссылки

- [Android Studio guide](https://developer.android.com/studio/intro)
- [Write and debug code](https://developer.android.com/studio/debug)
- [Command-line tools](https://developer.android.com/tools)
