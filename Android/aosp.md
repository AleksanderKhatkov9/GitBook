# AOSP — Android Open Source Project

> Источник: [Обзор AOSP](https://source.android.com/docs/setup/about?hl=ru)

**AOSP** — открытый исходный код Android. Его используют для сборки и кастомизации ОС под устройства (OEM, SoC, операторы), а не для обычных приложений из Play Store.

## Приложения vs платформа

| | Разработчик приложений (3p) | Разработчик AOSP |
|--|----------------------------|------------------|
| API | Публичный SDK / NDK | Системные API, HAL, framework |
| Документация | [developer.android.com](https://developer.android.com/develop) | [source.android.com](https://source.android.com) |
| Артефакт | APK / AAB | образ системы, прошивка |
| Среда | Android Studio | Linux-хост, `repo`, Soong/`m` |

Если вы пишете обычное приложение — оставайтесь в разделе [Сборка проекта](build.md). Ниже — обзор для тех, кто работает с исходниками ОС.

## Ключевые понятия

| Термин | Смысл |
|--------|--------|
| **AOSP** | Открытый код Android, готовый к порту и кастомизации |
| **CDD** | Compatibility Definition Document — требования к совместимому устройству |
| **CTS** | Compatibility Test Suite — тесты совместимости |
| **GMS** | Google Mobile Services — закрытые приложения/API Google (не часть AOSP) |
| **adb** | Android Debug Bridge — связь ПК с устройством / эмулятором |
| **Cuttlefish** | Виртуальное Android-устройство для облака и локального Linux |

Совместимое с Android устройство должно соответствовать CDD и пройти CTS — иначе нет доступа к экосистеме Play / GMS, даже если код собран из AOSP.

## Философия

AOSP ведёт Google при участии Open Handset Alliance. Цель — **единый продукт**, который производители портируют на железо, а не «дистрибутив из заменяемых кусков». Любой может использовать исходники; участие в общей экосистеме приложений требует программы совместимости.

## Что нужно для сборки AOSP (высокий уровень)

Официальная настройка описана в:

- [Настройка для разработки AOSP (9.0+)](https://source.android.com/docs/setup/start)
- [Загрузка исходного кода](https://source.android.com/docs/setup/download)
- [Сборка Android](https://source.android.com/docs/setup/build)

Типичный поток (упрощённо, на Linux):

```bash
# установка repo и синхронизация манифеста (ветки — по доке AOSP)
repo init -u https://android.googlesource.com/platform/manifest -b android-latest-release
repo sync -c -j$(nproc)

# выбор цели и сборка
source build/envsetup.sh
lunch aosp_cf_x86_64_only_phone-userdebug   # пример цели
m -j$(nproc)
```

С 2026 года исходники в AOSP публикуют во 2-м и 4-м кварталах; для сборки и вклада рекомендуется ветка `android-latest-release` (см. [изменения в AOSP](https://source.android.com/docs/setup/about)).

Требования к машине высокие (десятки ГБ RAM, сотни ГБ диска). Сборка на Windows «из коробки» не предназначена — используют Linux.

## Прошивка и тест

- [Fastboot](https://source.android.com/docs/setup/build/flash)
- [Android Emulator / виртуальные устройства](https://source.android.com/docs/setup/create/avd)
- [Cuttlefish](https://source.android.com/docs/devices/cuttlefish)

```bash
adb devices
fastboot devices
```

## Когда AOSP не нужен

- Создание приложений для телефонов / планшетов / Wear / TV / Auto
- Публикация в Google Play
- Изучение Kotlin / Java UI, Jetpack, Compose

Для этого: [Установка](installation.md) → [Сборка проекта](build.md) → [Kotlin](kotlin/README.md) или [Java](java/README.md).

## Полезные ссылки

- [Обзор AOSP (RU)](https://source.android.com/docs/setup/about?hl=ru)
- [FAQ AOSP](https://source.android.com/docs/setup/about/faqs)
- [Программа совместимости](https://source.android.com/docs/compatibility)
- [Поиск кода Android](https://cs.android.com/)
