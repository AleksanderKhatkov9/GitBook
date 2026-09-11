# Android на Java

Классическая разработка Android-приложений на **Java**: XML-layout, Activity, фрагменты, списки, SQLite.

> Руководство: [Metanit — Программирование под Android на Java](https://metanit.com/java/android/)  
> Официально предпочтителен Kotlin: [Kotlin for Android](https://kotlinlang.org/docs/android-overview.html) · раздел [Kotlin](../kotlin/README.md)

Java по-прежнему встречается в легаси-проектах и удобна для изучения View-системы. Новый код Google рекомендует писать на Kotlin (в т.ч. с Compose).

## Разделы

| Глава | Описание |
|-------|----------|
| [1. Введение](introduction.md) | Studio, первый проект, GUI |
| [2. Layout и виджеты](ui-layouts.md) | ConstraintLayout, LinearLayout, элементы |
| [3. Activity и Intent](activity-intent.md) | Жизненный цикл, манифест, передача данных |
| [4. Списки и фрагменты](lists-fragments.md) | RecyclerView, Fragment |
| [5. Данные](data.md) | SharedPreferences, файлы, SQLite |

## Карта курса Metanit (ориентир)

| Блок Metanit | Тема |
|--------------|------|
| Гл. 1–3 | Studio, layout, TextView / Button / и др. |
| Гл. 4–5 | Ресурсы, Activity, Intent |
| Гл. 7, 10 | Адаптеры, RecyclerView, Fragment |
| Гл. 14–16 | Настройки, файлы, SQLite |
| Гл. 11–12, 18 | Потоки, сеть, сервисы |

Полный оглавление: [metanit.com/java/android](https://metanit.com/java/android/)

## Требования

- [Android Studio](../installation.md)
- Базовый Java (классы, наследование, интерфейсы)

## Сборка

См. общий раздел [Сборка проекта](../build.md):

```bash
gradlew.bat assembleDebug
```

## Официальные источники

- [Develop for Android](https://developer.android.com/develop)
- [User interfaces (Views)](https://developer.android.com/guide/topics/ui)
- [App architecture](https://developer.android.com/topic/architecture)
